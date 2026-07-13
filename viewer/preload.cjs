const { contextBridge, ipcRenderer, webUtils } = require("electron");

function onAppChannel(channel, callback) {
  if (typeof callback !== "function") throw new TypeError("A callback is required.");
  const listener = (_event, state) => callback(state);
  ipcRenderer.on(channel, listener);
  return () => ipcRenderer.removeListener(channel, listener);
}

contextBridge.exposeInMainWorld("dxfApp", {
  isDesktop: true,
  getAppVersion: () => ipcRenderer.invoke("app:get-version"),
  getInitialFileSet: () => ipcRenderer.invoke("app:get-initial-file-set"),
  claimFile: (filePath) => ipcRenderer.invoke("fs:claim-dxf", filePath),
  releaseFile: () => ipcRenderer.invoke("fs:release-dxf"),
  readFile: (filePath) => ipcRenderer.invoke("fs:read-dxf", filePath),
  writeFile: (filePath, text) => ipcRenderer.invoke("fs:write-dxf", filePath, text),
  writeFixedCopy: (filePath, text) => {
    return ipcRenderer.invoke("fs:write-dxf-fixed-copy", filePath, text);
  },
  writeFixedALCopy: (filePath, text) => {
    return ipcRenderer.invoke("fs:write-dxf-fixed-al-copy", filePath, text);
  },
  writeMirrorCopy: (filePath, text) => {
    return ipcRenderer.invoke("fs:write-dxf-mirror-copy", filePath, text);
  },
  writeScaleCopy: (filePath, text) => {
    return ipcRenderer.invoke("fs:write-dxf-scale-copy", filePath, text);
  },
  listDxfFolder: (filePath) => ipcRenderer.invoke("fs:list-dxf-folder", filePath),
  isFileOpenElsewhere: (filePath) => {
    return ipcRenderer.invoke("fs:is-file-open-elsewhere", filePath);
  },
  openFileInWindow: (filePath) => ipcRenderer.invoke("app:open-file-in-window", filePath),
  getPathForFile: (file) => webUtils.getPathForFile(file),
  onFileState: (callback) => onAppChannel("app:file-state", callback),
  onFileSaved: (callback) => onAppChannel("app:file-saved", callback),
});
