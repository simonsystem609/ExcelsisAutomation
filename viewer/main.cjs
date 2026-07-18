const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const fs = require("node:fs/promises");
const path = require("node:path");
const { fileURLToPath } = require("node:url");
const dxfLimits = require("./modules/dxf/resource-limits.js");

const APP_ID = "local.excelsis.view";
const APP_NAME = "ExcelsisView";
const pendingFileSets = new Map();
const activeClaims = new Map();
let claimSeq = 1;

app.setName(APP_NAME);
app.setPath("userData", path.join(app.getPath("appData"), APP_NAME));
app.setAppUserModelId(APP_ID);

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();

function assetPath(...parts) {
  return app.isPackaged
    ? path.join(process.resourcesPath, ...parts)
    : path.join(__dirname, ...parts);
}

function isDxfPath(filePath) {
  return typeof filePath === "string"
    && filePath.trim().length > 0
    && path.extname(filePath).toLowerCase() === ".dxf";
}

function resolveDxfPath(filePath) {
  if (!isDxfPath(filePath)) throw new TypeError("Only DXF files are supported.");
  return path.resolve(filePath);
}

function normalizeFsPath(filePath) {
  const normalized = path.normalize(path.resolve(filePath));
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

function normalizePath(filePath) {
  return normalizeFsPath(resolveDxfPath(filePath));
}

function dxfEntryPath() {
  return path.join(__dirname, "modules", "dxf", "index.html");
}

function isTrustedDxfIpc(event) {
  const sender = event?.sender;
  const frame = event?.senderFrame;
  if (!sender || sender.isDestroyed() || !frame || frame !== sender.mainFrame) return false;
  try {
    const senderUrl = new URL(frame.url);
    if (senderUrl.protocol !== "file:") return false;
    senderUrl.search = "";
    senderUrl.hash = "";
    return normalizeFsPath(fileURLToPath(senderUrl)) === normalizeFsPath(dxfEntryPath());
  } catch {
    return false;
  }
}

function trustedIpcHandle(channel, handler) {
  ipcMain.handle(channel, (event, ...args) => {
    if (!isTrustedDxfIpc(event)) throw new Error(`Blocked untrusted IPC request: ${channel}`);
    return handler(event, ...args);
  });
}

function assertDxfOutputText(text) {
  dxfLimits.assertOutputText(text);
  dxfLimits.assertOutputBytes(Buffer.byteLength(text, "utf8"));
}

async function readDxfText(filePath) {
  const resolved = resolveDxfPath(filePath);
  const stat = await fs.stat(resolved);
  if (!stat.isFile()) throw new Error("DXF path is not a file.");
  dxfLimits.assertFileBytes(stat.size);
  const data = await fs.readFile(resolved);
  dxfLimits.assertFileBytes(data.byteLength);
  const text = data.toString("utf8");
  dxfLimits.assertInputText(text);
  return text;
}

async function pathIsFile(filePath) {
  try {
    return (await fs.stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function findOpenArg(argv) {
  for (const arg of argv) {
    if (!arg || arg.startsWith("--") || !isDxfPath(arg)) continue;
    const resolved = resolveDxfPath(arg);
    if (await pathIsFile(resolved)) return resolved;
  }
  return null;
}

async function dxfFilesInFolder(folderPath) {
  const files = [];
  const directory = await fs.opendir(folderPath);
  for await (const entry of directory) {
    if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== ".dxf") continue;
    dxfLimits.assertFolderFileCount(files.length + 1);
    files.push({
      name: entry.name,
      path: path.join(folderPath, entry.name),
    });
  }
  return files.sort((a, b) => a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    }));
}

async function fileSetForFile(filePath) {
  const resolved = resolveDxfPath(filePath);
  const files = await dxfFilesInFolder(path.dirname(resolved));
  const index = Math.max(
    0,
    files.findIndex((file) => normalizePath(file.path) === normalizePath(resolved)),
  );
  return { path: resolved, files, index };
}

function ownerForPath(normalizedPath) {
  for (const claim of activeClaims.values()) {
    if (claim.normalizedPath === normalizedPath) return claim;
  }
  return null;
}

function lockStateFor(webContentsId, filePath) {
  const resolved = resolveDxfPath(filePath);
  const owner = ownerForPath(normalizePath(resolved));
  if (!owner || owner.webContentsId === webContentsId) {
    return { path: resolved, readOnly: false, owner: null };
  }
  return {
    path: resolved,
    readOnly: true,
    owner: {
      token: owner.token,
      filePath: owner.path,
      windowTitle: owner.windowTitle,
    },
  };
}

function broadcastLockStates() {
  for (const win of BrowserWindow.getAllWindows()) {
    const claim = activeClaims.get(win.webContents.id);
    if (!claim) continue;
    win.webContents.send("app:file-state", lockStateFor(win.webContents.id, claim.path));
  }
}

function broadcastFileSaved(filePath, writerWebContentsId) {
  const normalizedPath = normalizePath(filePath);
  for (const win of BrowserWindow.getAllWindows()) {
    if (win.webContents.id === writerWebContentsId) continue;
    const claim = activeClaims.get(win.webContents.id);
    if (claim?.normalizedPath === normalizedPath) {
      win.webContents.send("app:file-saved", { path: claim.path });
    }
  }
}

function requireWriteClaim(webContentsId, filePath) {
  const normalizedPath = normalizePath(filePath);
  const claim = activeClaims.get(webContentsId);
  const owner = ownerForPath(normalizedPath);
  if (!claim || claim.normalizedPath !== normalizedPath || owner?.webContentsId !== webContentsId) {
    throw new Error("This file is read-only because it is open in another window.");
  }
}

function requireAvailableOutput(webContentsId, filePath) {
  const owner = ownerForPath(normalizePath(filePath));
  if (owner && owner.webContentsId !== webContentsId) {
    throw new Error("The output file is open in another window.");
  }
}

async function writeDxfSiblingCopy(webContentsId, filePath, text, suffix) {
  const resolved = resolveDxfPath(filePath);
  assertDxfOutputText(text);
  const parsed = path.parse(resolved);
  const outPath = path.join(parsed.dir, `${parsed.name}${suffix}.dxf`);
  requireAvailableOutput(webContentsId, outPath);
  await fs.writeFile(outPath, text, "utf8");
  const files = await dxfFilesInFolder(parsed.dir);
  const index = Math.max(
    0,
    files.findIndex((file) => normalizePath(file.path) === normalizePath(outPath)),
  );
  return { path: outPath, name: path.basename(outPath), files, index };
}

function windowForWebContentsId(webContentsId) {
  return BrowserWindow.getAllWindows()
    .find((win) => win.webContents.id === webContentsId) || null;
}

function claimFileForWebContents(webContentsId, filePath) {
  const resolved = resolveDxfPath(filePath);
  const normalizedPath = normalizePath(resolved);
  const state = lockStateFor(webContentsId, resolved);
  activeClaims.set(webContentsId, {
    token: claimSeq++,
    webContentsId,
    path: resolved,
    normalizedPath,
    windowTitle: windowForWebContentsId(webContentsId)?.getTitle() || APP_NAME,
  });
  broadcastLockStates();
  return state;
}

function releaseFileForWebContents(webContentsId) {
  activeClaims.delete(webContentsId);
  broadcastLockStates();
  return { ok: true };
}

function createDxfWindow(fileSet = null) {
  const entryPath = dxfEntryPath();
  const win = new BrowserWindow({
    title: APP_NAME,
    width: 1240,
    height: 820,
    minWidth: 900,
    minHeight: 620,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#050607",
    icon: assetPath("build", "icon-dxf-256.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
    },
  });

  win.setMenu(null);
  if (process.platform === "win32" && typeof win.setAppDetails === "function") {
    win.setAppDetails({
      appId: APP_ID,
      appIconPath: assetPath("build", "icon-dxf.ico"),
      appIconIndex: 0,
      relaunchDisplayName: APP_NAME,
    });
  }

  win.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  win.webContents.on("will-navigate", (event) => event.preventDefault());
  win.webContents.on("will-attach-webview", (event) => event.preventDefault());
  win.webContents.session.setPermissionRequestHandler((_webContents, _permission, callback) => {
    callback(false);
  });

  const webContentsId = win.webContents.id;
  if (fileSet) pendingFileSets.set(webContentsId, fileSet);
  win.on("closed", () => {
    activeClaims.delete(webContentsId);
    pendingFileSets.delete(webContentsId);
    broadcastLockStates();
  });
  win.once("ready-to-show", () => win.show());
  win.loadFile(entryPath);
  return win;
}

async function openDxfInWindow(filePath) {
  const resolved = resolveDxfPath(filePath);
  return createDxfWindow(await fileSetForFile(resolved));
}

trustedIpcHandle("app:get-version", () => app.getVersion());
trustedIpcHandle("app:get-initial-file-set", (event) => {
  return pendingFileSets.get(event.sender.id) || null;
});

trustedIpcHandle("fs:claim-dxf", (event, filePath) => {
  return claimFileForWebContents(event.sender.id, filePath);
});

trustedIpcHandle("fs:release-dxf", (event) => {
  return releaseFileForWebContents(event.sender.id);
});

trustedIpcHandle("fs:is-file-open-elsewhere", (event, filePath) => {
  return lockStateFor(event.sender.id, filePath).readOnly;
});

trustedIpcHandle("app:open-file-in-window", async (_event, filePath) => {
  if (!isDxfPath(filePath)) return { ok: false, error: "Only DXF files are supported." };
  const resolved = resolveDxfPath(filePath);
  if (!(await pathIsFile(resolved))) return { ok: false, error: "File not found." };
  await openDxfInWindow(resolved);
  return { ok: true };
});

trustedIpcHandle("fs:read-dxf", async (_event, filePath) => {
  return readDxfText(filePath);
});

trustedIpcHandle("fs:list-dxf-folder", async (_event, filePath) => {
  return fileSetForFile(resolveDxfPath(filePath));
});

trustedIpcHandle("fs:write-dxf", async (event, filePath, text) => {
  const resolved = resolveDxfPath(filePath);
  assertDxfOutputText(text);
  requireWriteClaim(event.sender.id, resolved);
  await fs.writeFile(resolved, text, "utf8");
  broadcastFileSaved(resolved, event.sender.id);
  return { ok: true };
});

trustedIpcHandle("fs:write-dxf-fixed-copy", (event, filePath, text) => {
  return writeDxfSiblingCopy(event.sender.id, filePath, text, "_fixed");
});

trustedIpcHandle("fs:write-dxf-fixed-al-copy", (event, filePath, text) => {
  return writeDxfSiblingCopy(event.sender.id, filePath, text, "_fixedAL");
});

trustedIpcHandle("fs:write-dxf-scale-copy", (event, filePath, text) => {
  return writeDxfSiblingCopy(event.sender.id, filePath, text, "_scaled");
});

trustedIpcHandle("fs:write-dxf-mirror-copy", (event, filePath, text) => {
  return writeDxfSiblingCopy(event.sender.id, filePath, text, "_mirror");
});

if (gotLock) {
  app.whenReady().then(async () => {
    Menu.setApplicationMenu(null);
    const openArg = await findOpenArg(process.argv.slice(1));
    if (openArg) await openDxfInWindow(openArg);
    else createDxfWindow();
  });

  app.on("second-instance", async (_event, argv) => {
    const openArg = await findOpenArg(argv);
    if (openArg) await openDxfInWindow(openArg);
    else createDxfWindow();
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createDxfWindow();
});
