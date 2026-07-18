const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { NtExecutable, NtExecutableResource } = require("resedit");
const { readAsarHeader } = require("app-builder-lib/out/asar/asar");

const FUSE_SENTINEL = Buffer.from("dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX", "ascii");
const FUSE_NAMES = [
  "RunAsNode",
  "EnableCookieEncryption",
  "EnableNodeOptionsEnvironmentVariable",
  "EnableNodeCliInspectArguments",
  "EnableEmbeddedAsarIntegrityValidation",
  "OnlyLoadAppFromAsar",
  "LoadBrowserProcessSpecificV8Snapshot",
  "GrantFileProtocolExtraPrivileges",
  "WasmTrapHandlers",
];
const EXPECTED_FUSES = ["0", "0", "0", "0", "1", "1", "0", "1", "1"];

function readFuseWire(executable) {
  const sentinelAt = executable.indexOf(FUSE_SENTINEL);
  assert.notEqual(sentinelAt, -1, "Electron fuse sentinel is missing.");
  const wireAt = sentinelAt + FUSE_SENTINEL.length;
  const version = executable[wireAt];
  const length = executable[wireAt + 1];
  assert.equal(version, 1, "Unexpected Electron fuse wire version.");
  assert.ok(length >= FUSE_NAMES.length, "Electron fuse wire is missing expected slots.");
  return Array.from(
    executable.subarray(wireAt + 2, wireAt + 2 + length),
    (byte) => String.fromCharCode(byte),
  );
}

function readIntegrityResource(executable) {
  const parsed = NtExecutable.from(executable);
  const resources = NtExecutableResource.from(parsed);
  const entry = resources.entries.find((candidate) => (
    String(candidate.type).toUpperCase() === "INTEGRITY"
    && String(candidate.id).toUpperCase() === "ELECTRONASAR"
  ));
  assert.ok(entry, "Embedded ASAR integrity resource is missing.");
  const value = JSON.parse(Buffer.from(entry.bin).toString("utf8"));
  assert.ok(Array.isArray(value), "Embedded ASAR integrity resource is invalid.");
  return value;
}

async function main() {
  const projectRoot = path.resolve(__dirname, "..");
  const executablePath = path.resolve(
    process.argv[2] || path.join(projectRoot, "dist", "win-unpacked", "ExcelsisView.exe"),
  );
  assert.ok(fs.statSync(executablePath).isFile(), "Pass a packaged ExcelsisView executable.");
  const executable = fs.readFileSync(executablePath);
  const fuseWire = readFuseWire(executable);
  for (let i = 0; i < EXPECTED_FUSES.length; i++) {
    assert.equal(fuseWire[i], EXPECTED_FUSES[i], `${FUSE_NAMES[i]} fuse has an unexpected state.`);
  }

  const asarPath = path.join(path.dirname(executablePath), "resources", "app.asar");
  assert.ok(fs.statSync(asarPath).isFile(), "Packaged app.asar is missing.");
  const integrity = readIntegrityResource(executable);
  const appIntegrity = integrity.find((entry) => String(entry.file || "").toLowerCase().endsWith("resources\\app.asar"));
  assert.ok(appIntegrity, "app.asar is absent from the integrity resource.");
  assert.equal(String(appIntegrity.alg || "").toUpperCase(), "SHA256", "Unexpected ASAR integrity algorithm.");
  const { header } = await readAsarHeader(asarPath);
  const actualHash = crypto.createHash("sha256").update(header).digest("hex");
  assert.equal(
    String(appIntegrity.value || "").toLowerCase(),
    actualHash,
    "Embedded app.asar header hash does not match.",
  );

  const packagedProviderPath = path.join(
    path.dirname(executablePath),
    "resources",
    "shell",
    "ExcelsisDxfThumbnailProvider.dll",
  );
  assert.ok(fs.statSync(packagedProviderPath).isFile(), "Packaged Explorer thumbnail provider is missing.");
  const sourceProviderPath = path.join(
    projectRoot,
    "shell",
    "thumbnail-provider",
    "bin",
    "x64",
    "ExcelsisDxfThumbnailProvider.dll",
  );
  assert.equal(
    crypto.createHash("sha256").update(fs.readFileSync(packagedProviderPath)).digest("hex"),
    crypto.createHash("sha256").update(fs.readFileSync(sourceProviderPath)).digest("hex"),
    "Packaged thumbnail provider differs from the tested build output.",
  );
  execFileSync(process.execPath, [
    path.join(projectRoot, "scripts", "audit-thumbnail-provider.cjs"),
    packagedProviderPath,
  ], { stdio: "inherit" });

  console.log(JSON.stringify({
    executablePath,
    fuses: Object.fromEntries(FUSE_NAMES.map((name, index) => [name, fuseWire[index]])),
    asarIntegrity: { algorithm: "SHA256", hash: actualHash },
  }, null, 2));
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
