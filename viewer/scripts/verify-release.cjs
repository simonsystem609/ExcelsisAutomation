const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const skippedDirectories = new Set([".git", "node_modules", "dist", "release", "audit"]);
const textExtensions = new Set([".cjs", ".css", ".html", ".js", ".json", ".md", ".txt", ".yml", ".yaml"]);

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
  /[a-z]:\\(?:e_viewer|e_helper|e_cad|github)(?:\\|$)/i,
  /\\users\\(?:peter|macska)(?:\\|$)/i,
];

for (const filePath of allFiles) {
  if (!textExtensions.has(path.extname(filePath).toLowerCase())) continue;
  const text = fs.readFileSync(filePath, "utf8");
  const match = sensitivePatterns.find((pattern) => pattern.test(text));
  if (match) fail(`Sensitive marker found in ${path.relative(root, filePath)}.`);
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
if (manifest.version !== "0.6.6") fail("Unexpected application version.");
if (manifest.private !== true) fail("The npm package must remain private.");
if (manifest.license !== "GPL-3.0-only") fail("Unexpected project license identifier.");
if (manifest.build?.fileAssociations?.length !== 1) fail("Exactly one file association is required.");
if (manifest.build.fileAssociations[0].ext !== "dxf") fail("Only the DXF association is allowed.");
const expectedScriptPolicy = {
  "esbuild@0.28.1": true,
  "electron-winstaller@5.4.0": false,
};
if (JSON.stringify(manifest.allowScripts) !== JSON.stringify(expectedScriptPolicy)) {
  fail("Unexpected dependency install-script policy.");
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

const csp = fs.readFileSync(path.join(root, "modules", "dxf", "index.html"), "utf8");
if (!csp.includes("Content-Security-Policy") || !csp.includes("connect-src 'none'")) {
  fail("The DXF renderer is missing its local-only content policy.");
}

for (const relativePath of ["main.cjs", "preload.cjs", "scripts/after-pack.cjs", "scripts/build-vendor.cjs", "scripts/collect-licenses.cjs"]) {
  execFileSync(process.execPath, ["--check", path.join(root, relativePath)], { stdio: "inherit" });
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
if (!fs.existsSync(licenseDirectory) || fs.readdirSync(licenseDirectory).length < 9) {
  fail("Third-party license files have not been collected.");
}

console.log(`Release verification passed (${relativeFiles.length} source files checked).`);
