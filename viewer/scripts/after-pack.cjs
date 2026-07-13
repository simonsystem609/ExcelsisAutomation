const fs = require("node:fs/promises");
const path = require("node:path");
const ResEdit = require("resedit");

exports.default = async function afterPack(context) {
  if (context.electronPlatformName !== "win32") return;

  const exeName = `${context.packager.appInfo.productFilename}.exe`;
  const exePath = path.join(context.appOutDir, exeName);
  const iconPath = path.join(context.packager.projectDir, "build", "icon-dxf.ico");
  const exeData = await fs.readFile(exePath);
  const exe = ResEdit.NtExecutable.from(exeData, { ignoreCert: true });
  const resources = ResEdit.NtExecutableResource.from(exe);
  const iconFile = ResEdit.Data.IconFile.from(await fs.readFile(iconPath));
  const iconGroups = ResEdit.Resource.IconGroupEntry.fromEntries(resources.entries);
  const groupId = iconGroups[0]?.id ?? 1;
  const lang = iconGroups[0]?.lang ?? 1033;

  ResEdit.Resource.IconGroupEntry.replaceIconsForResource(
    resources.entries,
    groupId,
    lang,
    iconFile.icons.map((item) => item.data),
  );
  resources.outputResource(exe);
  await fs.writeFile(exePath, Buffer.from(exe.generate()));
};
