const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const skippedDirectories = new Set([".git", "node_modules", "dist", "release", "audit", "bin", "obj"]);
const textExtensions = new Set([
  ".cjs", ".cpp", ".css", ".h", ".html", ".js", ".json", ".md", ".nsh", ".ps1", ".txt", ".yml", ".yaml",
]);

function fail(message) {
  throw new Error(message);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function walk(directory, output = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, output);
    else output.push(fullPath);
  }
  return output;
}

const allFiles = walk(root);
const relativeFiles = allFiles.map((filePath) => path.relative(root, filePath).replace(/\\/g, "/"));
const lowerPaths = relativeFiles.map((filePath) => filePath.toLowerCase());
const blockedDirectory = ["laun", "cher"].join("");
if (lowerPaths.some((filePath) => filePath.split("/").includes(blockedDirectory))) {
  fail("A non-DXF application directory is present.");
}

const moduleDirectories = fs.readdirSync(path.join(root, "modules"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
if (moduleDirectories.length !== 1 || moduleDirectories[0] !== "dxf") {
  fail(`Unexpected module set: ${moduleDirectories.join(", ")}`);
}

const sensitivePatterns = [
  new RegExp(["github", "pat"].join("_") + "_[a-z0-9_]{20,}", "i"),
  /gh[pousr]_[a-z0-9]{20,}/i,
  new RegExp("\\b[a-z]:" + "\\\\" + "(?:users|documents and settings)" + "\\\\", "i"),
];
const configuredPrivateMarkers = String(process.env.PUBLIC_RELEASE_PRIVATE_MARKERS || "")
  .split(";")
  .map((marker) => marker.trim().toLowerCase())
  .filter(Boolean);

for (const filePath of allFiles) {
  if (!textExtensions.has(path.extname(filePath).toLowerCase())) continue;
  const text = fs.readFileSync(filePath, "utf8");
  const match = sensitivePatterns.find((pattern) => pattern.test(text));
  if (match) fail(`Sensitive marker found in ${path.relative(root, filePath)}.`);
  const lowered = text.toLowerCase();
  if (configuredPrivateMarkers.some((marker) => lowered.includes(marker))) {
    fail(`Configured private marker found in ${path.relative(root, filePath)}.`);
  }
}

const publishSurface = [
  "main.cjs",
  "preload.cjs",
  "package.json",
  "README.md",
  "BUILDING.md",
  "SOURCE.md",
  "modules/dxf/index.html",
  "modules/dxf/app.js",
  "build/installer.nsh",
  "scripts/build-thumbnail-provider.ps1",
  "shell/thumbnail-provider/src/dxf_thumbnail_core.cpp",
  "shell/thumbnail-provider/src/thumbnail_provider.cpp",
  "shell/thumbnail-provider/tests/thumbnail_provider_tests.cpp",
];
const restrictedPatterns = [
  new RegExp(["3d", "pdf"].join(""), "i"),
  new RegExp("\\." + ["p", "d", "f"].join(""), "i"),
  new RegExp("\\b" + ["p", "r", "c"].join("") + "\\b", "i"),
  new RegExp(["ado", "be"].join(""), "i"),
  new RegExp(["acro", "bat"].join(""), "i"),
  new RegExp(["pdf", "app"].join(""), "i"),
];
for (const relativePath of publishSurface) {
  const text = fs.readFileSync(path.join(root, relativePath), "utf8");
  const match = restrictedPatterns.find((pattern) => pattern.test(text));
  if (match) fail(`Restricted feature marker found in ${relativePath}.`);
}

const manifest = readJson("package.json");
if (manifest.version !== "0.6.7") fail("Unexpected application version.");
if (manifest.private !== true) fail("The npm package must remain private.");
if (manifest.license !== "GPL-3.0-only") fail("Unexpected project license identifier.");
if (manifest.build?.fileAssociations?.length !== 1) fail("Exactly one file association is required.");
if (manifest.build.fileAssociations[0].ext !== "dxf") fail("Only the DXF association is allowed.");
if (manifest.build?.nsis?.include !== "build/installer.nsh") fail("Thumbnail registration installer hook is missing.");
if (!String(manifest.scripts?.["test:shell"] || "").includes("-RunTests")) {
  fail("Native thumbnail tests are missing from the package scripts.");
}
if (!String(manifest.scripts?.verify || "").includes("audit:shell")) {
  fail("Native thumbnail audit is missing from release verification.");
}
const shellResource = manifest.build?.extraResources?.find((entry) => (
  entry.to === "shell/ExcelsisDxfThumbnailProvider.dll"
));
if (shellResource?.from !== "shell/thumbnail-provider/bin/x64/ExcelsisDxfThumbnailProvider.dll") {
  fail("Packaged thumbnail provider resource is missing or unexpected.");
}
const expectedScriptPolicy = {
  "esbuild@0.28.1": true,
  "electron-winstaller@5.4.0": false,
};
if (JSON.stringify(manifest.allowScripts) !== JSON.stringify(expectedScriptPolicy)) {
  fail("Unexpected dependency install-script policy.");
}
const expectedFuses = {
  runAsNode: false,
  enableCookieEncryption: false,
  enableNodeOptionsEnvironmentVariable: false,
  enableNodeCliInspectArguments: false,
  enableEmbeddedAsarIntegrityValidation: true,
  onlyLoadAppFromAsar: true,
  loadBrowserProcessSpecificV8Snapshot: false,
  grantFileProtocolExtraPrivileges: true,
};
if (JSON.stringify(manifest.build?.electronFuses) !== JSON.stringify(expectedFuses)) {
  fail("Unexpected Electron production fuse policy.");
}

const lock = readJson("package-lock.json");
if (lock.packages?.[""]?.version !== manifest.version) fail("Lockfile version does not match package.json.");
for (const [dependency, version] of Object.entries(manifest.devDependencies)) {
  const lockEntry = lock.packages?.[`node_modules/${dependency}`];
  if (!lockEntry || lockEntry.version !== version) {
    fail(`Lockfile does not pin ${dependency}@${version}.`);
  }
}

const notices = fs.readFileSync(path.join(root, "THIRD_PARTY_NOTICES.md"), "utf8").toLowerCase();
for (const dependency of [
  "electron",
  "concaveman",
  "point-in-polygon",
  "rbush",
  "robust-predicates",
  "tinyqueue",
  "electron-builder",
  "esbuild",
  "resedit",
]) {
  const version = lock.packages?.[`node_modules/${dependency}`]?.version;
  if (!version || !notices.includes(`| ${dependency} | ${version} |`)) {
    fail(`Third-party notice version is missing or stale for ${dependency}.`);
  }
}
if (!notices.includes("| nsis | 3.0.4.1 |") || !notices.includes("elevate 1.0")) {
  fail("NSIS or Elevate notice metadata is missing.");
}

const csp = fs.readFileSync(path.join(root, "modules", "dxf", "index.html"), "utf8");
if (!csp.includes("Content-Security-Policy") || !csp.includes("connect-src 'none'")) {
  fail("The DXF renderer is missing its local-only content policy.");
}
if (!csp.includes("./resource-limits.js") || csp.indexOf("./resource-limits.js") > csp.indexOf("./app.js")) {
  fail("The renderer must load resource guards before its application module.");
}

for (const relativePath of [
  "main.cjs",
  "preload.cjs",
  "modules/dxf/resource-limits.js",
  "scripts/after-pack.cjs",
  "scripts/audit-packaged-runtime.cjs",
  "scripts/audit-thumbnail-provider.cjs",
  "scripts/build-vendor.cjs",
  "scripts/collect-licenses.cjs",
  "scripts/stamp-thumbnail-provider.cjs",
  "scripts/test-renderer-parser.cjs",
  "scripts/test-resource-limits.cjs",
]) {
  execFileSync(process.execPath, ["--check", path.join(root, relativePath)], { stdio: "inherit" });
}

const mainSource = fs.readFileSync(path.join(root, "main.cjs"), "utf8");
const appSource = fs.readFileSync(path.join(root, "modules", "dxf", "app.js"), "utf8");
const thumbnailCoreSource = [
  "dxf_thumbnail_core.h",
  "dxf_thumbnail_core.cpp",
].map((fileName) => fs.readFileSync(
  path.join(root, "shell", "thumbnail-provider", "src", fileName),
  "utf8",
)).join("\n");
const thumbnailProviderSource = fs.readFileSync(
  path.join(root, "shell", "thumbnail-provider", "src", "thumbnail_provider.cpp"),
  "utf8",
);
const thumbnailBuildSource = fs.readFileSync(path.join(root, "scripts", "build-thumbnail-provider.ps1"), "utf8");
const installerSource = fs.readFileSync(path.join(root, "build", "installer.nsh"), "utf8");
if ((mainSource.match(/ipcMain\.handle\(/g) || []).length !== 1) {
  fail("Privileged IPC handlers must be registered only through the trusted wrapper.");
}
if ((mainSource.match(/trustedIpcHandle\(/g) || []).length !== 14) {
  fail("One or more privileged IPC channels bypass trusted-main-frame validation.");
}
for (const requiredMainGuard of [
  "frame !== sender.mainFrame",
  "fileURLToPath(senderUrl)",
  "dxfLimits.assertFileBytes",
  "dxfLimits.assertOutputBytes",
]) {
  if (!mainSource.includes(requiredMainGuard)) fail(`Main-process guard is missing: ${requiredMainGuard}`);
}
for (const requiredRendererGuard of [
  "resourceLimits.assertInputText(text)",
  "resourceLimits.assertPairFieldLengths",
  "resourceLimits.createParseBudget()",
  "resourceLimits.claimEntity",
  "resourceLimits.claimPoints",
  "resourceLimits.createComparisonBudget()",
  "resourceLimits.claimEndpointComparisons",
  "resourceLimits.assertFeatureCount",
  "resourceLimits.createOutputBudget()",
  "resourceLimits.LIMITS.MAX_UNDO_CHARS",
]) {
  if (!appSource.includes(requiredRendererGuard)) fail(`Renderer resource guard is missing: ${requiredRendererGuard}`);
}
for (const requiredThumbnailGuard of [
  "kMaxInputBytes = 32u * 1024u * 1024u",
  "kMaxPairs = 250000u",
  "kMaxEntities = 30000u",
  "kMaxRenderPoints = 200000u",
  "ERROR_FILE_TOO_LARGE",
  "scene.limitExceeded",
]) {
  if (!thumbnailCoreSource.includes(requiredThumbnailGuard)) {
    fail(`Thumbnail resource guard is missing: ${requiredThumbnailGuard}`);
  }
}
for (const requiredProviderMarker of [
  "IInitializeWithStream",
  "IThumbnailProvider",
  "HKEY_CURRENT_USER",
  "SystemFileAssociations\\\\.dxf",
  "PreviousThumbnailProvider",
  "DllRegisterServer",
  "DllUnregisterServer",
]) {
  if (!thumbnailProviderSource.includes(requiredProviderMarker)) {
    fail(`Thumbnail provider integration is missing: ${requiredProviderMarker}`);
  }
}
if (!thumbnailBuildSource.includes("$zigVersion -ne '0.16.0'") ||
    !thumbnailBuildSource.includes("-fstack-protector-strong") ||
    thumbnailBuildSource.includes("Invoke-WebRequest")) {
  fail("Thumbnail build must require pinned Zig 0.16.0 without downloading tools.");
}
if (!installerSource.includes("regsvr32.exe") || !installerSource.includes("customUnInstall")) {
  fail("Installer does not register and unregister the thumbnail provider.");
}

const vendorSource = fs.readFileSync(
  path.join(root, "modules", "dxf", "vendor", "concaveman.global.js"),
  "utf8",
);
if (!vendorSource.startsWith("/* concaveman 2.0.0")) fail("The geometry bundle was not reproducibly rebuilt.");
const context = {};
vm.createContext(context);
vm.runInContext(vendorSource, context, { timeout: 2000 });
const hullFunction = context.Concaveman?.default || context.Concaveman;
if (typeof hullFunction !== "function") fail("The geometry bundle does not expose the expected API.");
const hull = hullFunction([[0, 0], [2, 0], [2, 2], [1, 1], [0, 2]]);
if (!Array.isArray(hull) || hull.length < 4) fail("The geometry bundle failed its smoke test.");

const licenseDirectory = path.join(root, "third_party", "licenses");
if (!fs.existsSync(licenseDirectory) || fs.readdirSync(licenseDirectory).length < 11) {
  fail("Third-party license files have not been collected.");
}
for (const fileName of [
  "Elevate-MIT.txt",
  "NSIS-COPYING.txt",
  "concaveman-2.0.0.txt",
  "electron-43.1.1.txt",
  "electron-builder-26.15.3.txt",
  "esbuild-0.28.1.md",
  "point-in-polygon-1.1.0.txt",
  "rbush-4.0.1.txt",
  "resedit-3.0.2.txt",
  "robust-predicates-3.0.3.txt",
  "tinyqueue-3.0.0.txt",
  "zig-0.16.0.txt",
  "mingw-w64-runtime.txt",
  "llvm-libcxx.txt",
  "llvm-libcxxabi.txt",
  "llvm-libunwind.txt",
]) {
  if (!fs.existsSync(path.join(licenseDirectory, fileName))) fail(`Required license file is missing: ${fileName}`);
}

const expectedNoticeHashes = new Map([
  ["Elevate-MIT.txt", "74bfd22c73b51e52d841df15b2a2110a8d1b6874723ef9ca6fc2ecc95973a508"],
  ["NSIS-COPYING.txt", "3c8de989f6504d52f5f8dfafedb6668cd47201f5d01f1319570727c091425dd6"],
  ["zig-0.16.0.txt", "5c537d6853e005298a285d508cff9ac7192cea23576c840d485b2b586a7ff177"],
  ["mingw-w64-runtime.txt", "99a69660981156c21336fdb5661f89341b013c94e4bf9e1c7467b4745718397f"],
  ["llvm-libcxx.txt", "539dd7aed86e8a4f12cbdd0e6c50c189c7d74847e4fecc64ce2c6ee3a01da38b"],
  ["llvm-libcxxabi.txt", "e2b35be49f7284a45b7baca8fc7b3ab7440e7902392b2528a457816b5bb2a15c"],
  ["llvm-libunwind.txt", "b5efebcaca80879234098e52d1725e6d9eb8fb96a19fce625d39184b705f7b6d"],
]);
for (const [fileName, expectedHash] of expectedNoticeHashes) {
  const actualHash = crypto.createHash("sha256")
    .update(fs.readFileSync(path.join(licenseDirectory, fileName)))
    .digest("hex");
  if (actualHash !== expectedHash) fail(`Preserved installer notice changed unexpectedly: ${fileName}`);
}

const supplementalNotice = fs.readFileSync(path.join(root, "NOTICE-0.6.6-SUPPLEMENT.md"), "utf8");
if (!supplementalNotice.includes("does not replace, modify, or relabel")) {
  fail("The 0.6.6 notice supplement must preserve the original artifact identity.");
}

console.log(`Release verification passed (${relativeFiles.length} source files checked).`);
