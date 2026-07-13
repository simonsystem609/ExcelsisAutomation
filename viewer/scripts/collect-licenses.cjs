const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "third_party", "licenses");
const packageNames = [
  "electron",
  "concaveman",
  "point-in-polygon",
  "rbush",
  "robust-predicates",
  "tinyqueue",
  "esbuild",
  "electron-builder",
  "resedit",
];

function findPackageRoot(packageName) {
  let current = path.dirname(require.resolve(packageName, { paths: [projectRoot] }));
  while (current !== path.dirname(current)) {
    const manifestPath = path.join(current, "package.json");
    if (fsSync.existsSync(manifestPath)) {
      const manifest = JSON.parse(fsSync.readFileSync(manifestPath, "utf8"));
      if (manifest.name === packageName) return { root: current, manifest };
    }
    current = path.dirname(current);
  }
  throw new Error(`Could not locate package root for ${packageName}.`);
}

async function collectPackageLicense(packageName) {
  const { root, manifest } = findPackageRoot(packageName);
  const entries = await fs.readdir(root, { withFileTypes: true });
  const licenseFiles = entries
    .filter((entry) => entry.isFile() && /^(licen[cs]e|copying)(\.|$)/i.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  if (licenseFiles.length === 0) throw new Error(`No license file found for ${packageName}.`);

  const safeName = packageName.replace(/^@/, "").replace(/[\\/]/g, "-");
  for (const fileName of licenseFiles) {
    const extension = path.extname(fileName) || ".txt";
    const destination = path.join(outputDir, `${safeName}-${manifest.version}${extension}`);
    await fs.copyFile(path.join(root, fileName), destination);
  }
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  for (const packageName of packageNames) await collectPackageLicense(packageName);
  console.log(`Collected licenses for ${packageNames.length} packages.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
