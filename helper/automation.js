const api = window.excelsisAutomation;

const ui = {
  killSolidWorksBtn: document.getElementById("killSolidWorksBtn"),
  copyDocLocationBtn: document.getElementById("copyDocLocationBtn"),
  createCamFolderBtn: document.getElementById("createCamFolderBtn"),
  solidCamLoadStatus: document.getElementById("solidCamLoadStatus"),
  swStatus: document.getElementById("swStatus"),
  swHealthStatus: document.getElementById("swHealthStatus"),
  activeDoc: document.getElementById("activeDoc"),
  navButtons: document.querySelectorAll(".nav-item"),
  views: document.querySelectorAll(".view"),
  refreshMacroTilesBtn: document.getElementById("refreshMacroTilesBtn"),
  openMacroFolderBtn: document.getElementById("openMacroFolderBtn"),
  convertSwbMacrosBtn: document.getElementById("convertSwbMacrosBtn"),
  macroFolderState: document.getElementById("macroFolderState"),
  macroTileGrid: document.getElementById("macroTileGrid"),

  clearLogBtn: document.getElementById("clearLogBtn"),
  logOutput: document.getElementById("logOutput"),
  appVersion: document.getElementById("appVersion"),
  sidebarBottom: document.getElementById("sidebarBottom"),
  sidebarBottomImage: document.getElementById("sidebarBottomImage"),
  recentDocsList: document.getElementById("recentDocsList"),
  recentDocsFilter: document.getElementById("recentDocsFilter"),
  recentDocsSearch: document.getElementById("recentDocsSearch"),
  refreshRecentDocsBtn: document.getElementById("refreshRecentDocsBtn"),
  retryThumbnailsBtn: document.getElementById("retryThumbnailsBtn"),
  workLoggerCountingStatus: document.getElementById("workLoggerCountingStatus"),
  workLoggerState: document.getElementById("workLoggerState"),
  workLoggerAutoExport: document.getElementById("workLoggerAutoExport"),
  worklogAutoExportSkip: document.getElementById("worklogAutoExportSkip"),
  workLoggerList: document.getElementById("workLoggerList"),
  refreshWorkLoggerBtn: document.getElementById("refreshWorkLoggerBtn"),
  resetWorkLoggerBtn: document.getElementById("resetWorkLoggerBtn"),
  exportWorkLoggerBtn: document.getElementById("exportWorkLoggerBtn"),
  worklogExportDialog: document.getElementById("worklogExportDialog"),
  worklogExportForm: document.getElementById("worklogExportForm"),
  closeWorklogExportBtn: document.getElementById("closeWorklogExportBtn"),
  cancelWorklogExportBtn: document.getElementById("cancelWorklogExportBtn"),
  confirmWorklogExportBtn: document.getElementById("confirmWorklogExportBtn"),
  worklogExportCutoffMinutes: document.getElementById("worklogExportCutoffMinutes"),
  worklogExportMultiplier: document.getElementById("worklogExportMultiplier"),
  worklogExportRoundToMinutes: document.getElementById("worklogExportRoundToMinutes"),
  worklogExportDefaultWorkType: document.getElementById("worklogExportDefaultWorkType"),
  worklogExportSecondWorkTypeWrap: document.getElementById("worklogExportSecondWorkTypeWrap"),
  worklogExportSecondWorkType: document.getElementById("worklogExportSecondWorkType"),
  worklogExportPerProjectWorkTypes: document.getElementById("worklogExportPerProjectWorkTypes"),
  worklogExportSplitByWorkType: document.getElementById("worklogExportSplitByWorkType"),
  worklogExportProjectWorkTypes: document.getElementById("worklogExportProjectWorkTypes"),
  worklogExportSummary: document.getElementById("worklogExportSummary"),
  worklogExportState: document.getElementById("worklogExportState"),
  worklogExportTitle: document.getElementById("worklogExportTitle"),
  exportLastDayWorkLoggerBtn: document.getElementById("exportLastDayWorkLoggerBtn"),
  setWorklogExportBtn: document.getElementById("setWorklogExportBtn"),
  worklogExportTargetHoursMode: document.getElementById("worklogExportTargetHoursMode"),
  worklogExportTargetHours: document.getElementById("worklogExportTargetHours"),
  worklogExportTargetHoursWrap: document.getElementById("worklogExportTargetHoursWrap"),
  docSearchInput: document.getElementById("docSearchInput"),
  docSearchTypeFilter: document.getElementById("docSearchTypeFilter"),
  docSearchState: document.getElementById("docSearchState"),
  docSearchList: document.getElementById("docSearchList"),
  docSearchPager: document.getElementById("docSearchPager"),
  docSearchPrevPageBtn: document.getElementById("docSearchPrevPageBtn"),
  docSearchNextPageBtn: document.getElementById("docSearchNextPageBtn"),
  gcodeState: document.getElementById("gcodeState"),
  gcodeFileList: document.getElementById("gcodeFileList"),
  gcodeAnalyzePanel: document.getElementById("gcodeAnalyzePanel"),
  gcodeSelectedFile: document.getElementById("gcodeSelectedFile"),
  gcodeChangeFileBtn: document.getElementById("gcodeChangeFileBtn"),
  gcodeMaterialInput: document.getElementById("gcodeMaterialInput"),
  gcodeMaterialOptions: document.getElementById("gcodeMaterialOptions"),
  gcodeToolTypeInput: document.getElementById("gcodeToolTypeInput"),
  gcodeToolTypeOptions: document.getElementById("gcodeToolTypeOptions"),
  gcodeAnalyzeBtn: document.getElementById("gcodeAnalyzeBtn"),
  gcodeAnalyzeState: document.getElementById("gcodeAnalyzeState"),
  gcodeResults: document.getElementById("gcodeResults"),
  gcodeHistory: document.getElementById("gcodeHistory"),
  refreshGcodeBtn: document.getElementById("refreshGcodeBtn"),
  gcodeOpenChecksFolderBtn: document.getElementById("gcodeOpenChecksFolderBtn"),
  settingsGcodeSearchRoot: document.getElementById("settingsGcodeSearchRoot"),
  settingsGcodeMaterials: document.getElementById("settingsGcodeMaterials"),
  settingsGcodeToolTypes: document.getElementById("settingsGcodeToolTypes"),
  settingsUiLanguage: document.getElementById("settingsUiLanguage"),
  settingsBomLanguage: document.getElementById("settingsBomLanguage"),
  settingsHotkeysEnabled: document.getElementById("settingsHotkeysEnabled"),
  settingsPasteProjectDateHotkey: document.getElementById("settingsPasteProjectDateHotkey"),
  settingsCopyPathHotkey: document.getElementById("settingsCopyPathHotkey"),
  settingsProjectDateTemplate: document.getElementById("settingsProjectDateTemplate"),
  settingsGroupResetButtons: document.querySelectorAll("[data-settings-reset]"),
  settingsSolidWorksIdlePauseMinutes: document.getElementById("settingsSolidWorksIdlePauseMinutes"),
  settingsErpWorklogInbox: document.getElementById("settingsErpWorklogInbox"),
  settingsErpWorklogWorktypes: document.getElementById("settingsErpWorklogWorktypes"),
  settingsErpWorklogDocMinMinutes: document.getElementById("settingsErpWorklogDocMinMinutes"),
  settingsCamOutputRoot: document.getElementById("settingsCamOutputRoot"),
  settingsCamFolderMode: document.getElementById("settingsCamFolderMode"),
  settingsCamSearchRoots: document.getElementById("settingsCamSearchRoots"),
  settingsLocationsProjectRoots: document.getElementById("settingsLocationsProjectRoots"),
  settingsLocationsProjectPrefixes: document.getElementById("settingsLocationsProjectPrefixes"),
  settingsLocationsSearchRoots: document.getElementById("settingsLocationsSearchRoots"),
  settingsLocationsExclusions: document.getElementById("settingsLocationsExclusions"),
  settingsMacroDrawingTemplate: document.getElementById("settingsMacroDrawingTemplate"),
  settingsMacroDxfOutputPrefix: document.getElementById("settingsMacroDxfOutputPrefix"),
  settingsMacroDefaultMaterial: document.getElementById("settingsMacroDefaultMaterial"),
  searchCamAddinsBtn: document.getElementById("searchCamAddinsBtn"),
  camAddinsList: document.getElementById("camAddinsList"),
  camSelectionState: document.getElementById("camSelectionState"),
  deleteDocSearchCacheBtn: document.getElementById("deleteDocSearchCacheBtn"),
  startCamBtn: document.getElementById("startCamBtn"),
  reloadCamDocBtn: document.getElementById("reloadCamDocBtn"),
  stopCamBtn: document.getElementById("stopCamBtn"),
  settingsSaveBtn: document.getElementById("settingsSaveBtn"),
  settingsResetBtn: document.getElementById("settingsResetBtn"),
  settingsImportBtn: document.getElementById("settingsImportBtn"),
  settingsExportBtn: document.getElementById("settingsExportBtn"),
  settingsState: document.getElementById("settingsState"),
  settingsCacheState: document.getElementById("settingsCacheState"),
};

const state = {
  macroTiles: [],
  macroRoot: "",
  solidWorksStatusInFlight: false,
  killSolidWorksInFlight: false,
  lastSolidWorksHealth: null,
  lastSolidWorksHealthSignature: "",
  lastSolidWorksDocument: null,
  settings: null,
  defaults: null,
  settingsPath: "",
  solidCamSettings: { selectedDllPath: "", selectedTitle: "", selectedClsid: "" },
  solidCamAddins: [],
  solidCamStatusInFlight: false,
  solidCamLoaded: null,
  lastSolidCamHealth: null,
  docSearchInFlight: false,
  docSearchRequestSeq: 0,
  docSearchPage: 0,
  docSearchHasMore: false,
  docSearchLastKey: "",
  docSearchLastSignature: "",
  docSearchPollTimer: null,
  gcodeFiles: [],
  gcodeSelectedPath: "",
  gcodeAnalyzeInFlight: false,
  gcodeListInFlight: false,
  // After a file is picked the list collapses so the analyze form sits at the
  // top without scrolling; "Select different MPF" reopens it.
  gcodeListCollapsed: false,
};

const SOLIDWORKS_STATUS_INTERVAL_MS = 3000;
const SOLIDCAM_STATUS_INTERVAL_MS = 15000;

function log(message, payload = null) {
  const time = new Date().toLocaleTimeString();
  const detail = payload ? `\n${JSON.stringify(payload, null, 2)}` : "";
  ui.logOutput.textContent = `[${time}] ${message}${detail}\n\n${ui.logOutput.textContent}`.trim();
  ui.logOutput.scrollTop = 0;
}

function setActiveDocText(text) {
  ui.activeDoc.textContent = text;
  ui.activeDoc.title = String(text || "").replace(/\s*\n\s*/g, " ");
}

function setActiveDocHtml(html) {
  ui.activeDoc.innerHTML = html;
  ui.activeDoc.title = ui.activeDoc.textContent.replace(/\s+/g, " ").trim();
}

function updateSolidWorksKillButton(health) {
  if (!ui.killSolidWorksBtn) return;
  const canKill = Boolean(health?.canKill);
  ui.killSolidWorksBtn.disabled = state.killSolidWorksInFlight || !canKill;
  ui.killSolidWorksBtn.title = canKill
    ? "Kill all SLDWORKS.exe processes for the unhealthy session"
    : "Enabled only when Excelsis detects an unhealthy SOLIDWORKS session";
}

function renderSolidWorksHealth(result) {
  const health = result?.solidWorksHealth || null;
  state.lastSolidWorksHealth = health;
  updateSolidWorksKillButton(health);
  if (!ui.swHealthStatus) return;

  const stateKey = ["healthy", "stopped", "loading", "unhealthy"].includes(health?.state)
    ? health.state
    : "unknown";
  ui.swHealthStatus.classList.remove("healthy", "stopped", "loading", "unhealthy", "unknown");
  ui.swHealthStatus.classList.add(stateKey);
  ui.swHealthStatus.textContent = health?.label || "SW health: checking...";
  const reasons = Array.isArray(health?.reasons) ? health.reasons.filter(Boolean) : [];
  ui.swHealthStatus.title = [health?.message || "", ...reasons].filter(Boolean).join("\n");
}

function maybeLogSolidWorksHealthIssue(result) {
  const health = result?.solidWorksHealth;
  if (!health || health.state !== "unhealthy") {
    state.lastSolidWorksHealthSignature = "";
    return;
  }
  const signature = health.signature || JSON.stringify({
    state: health.state,
    reasons: health.reasons || [],
    processCount: health.processCount || 0,
    error: result?.error || "",
  });
  if (signature === state.lastSolidWorksHealthSignature) return;
  state.lastSolidWorksHealthSignature = signature;
  log("SOLIDWORKS health issue detected.", {
    message: health.message,
    reasons: health.reasons || [],
    processCount: health.processCount || 0,
    processes: health.processes || [],
    bridgeError: result?.error || "",
    reconcileInfo: result?.reconcileInfo || null,
  });
}

const driveMap = new Map();

async function refreshDriveMapFromMain() {
  try {
    const result = await api.getDriveMap();
    driveMap.clear();
    if (result && result.entries) {
      for (const [unc, letter] of result.entries) driveMap.set(unc, letter);
    }
  } catch {}
}

function displayPathOf(p) {
  if (!p) return "";
  const s = String(p);
  if (!s.startsWith("\\\\")) return s;
  if (driveMap.size === 0) return s;
  const after = s.substring(2);
  const slash1 = after.indexOf("\\");
  if (slash1 < 0) return s;
  const slash2 = after.indexOf("\\", slash1 + 1);
  const shareRoot = "\\\\" + (slash2 < 0 ? after : after.substring(0, slash2));
  const mapped = driveMap.get(shareRoot.toLowerCase());
  if (!mapped) return s;
  const remainder = slash2 < 0 ? "" : s.substring(2 + slash2);
  return mapped + remainder;
}

function basenameOf(p) {
  return String(p || "").split(/[\\/]/).pop() || "";
}

function extOf(p) {
  const name = basenameOf(p).toLowerCase();
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot) : "";
}

function fileTypeForPath(p) {
  const ext = extOf(p);
  if (ext === ".sldprt") return { key: "part", label: "Part" };
  if (ext === ".sldasm") return { key: "assembly", label: "Assy" };
  if (ext === ".slddrw") return { key: "drawing", label: "Drw" };
  if (ext === ".prz" || ext === ".prt") return { key: "solidcam", label: "CAM" };
  if (ext === ".dxf") return { key: "dxf", label: "DXF" };
  if (ext === ".dwg") return { key: "dwg", label: "DWG" };
  if (ext === ".pdf") return { key: "pdf", label: "PDF" };
  if (ext === ".mpf") return { key: "code", label: "MPF" };
  if (ext === ".txt") return { key: "text", label: "TXT" };
  return { key: "other", label: "File" };
}

function activeSolidWorksSeedPath() {
  const doc = state.lastSolidWorksDocument;
  if (!doc?.hasActiveDocument) return "";
  const candidate = doc.path || doc.title || "";
  return [".sldprt", ".sldasm", ".slddrw"].includes(extOf(candidate)) ? candidate : "";
}

function setStatus(result) {
  renderSolidWorksHealth(result);
  maybeLogSolidWorksHealthIssue(result);
  ui.swStatus.classList.remove("ok", "error", "idle");
  if (!result) {
    ui.swStatus.textContent = "Not checked";
    ui.swStatus.classList.add("idle");
    setActiveDocText("No active document loaded.");
    return;
  }
  if (result.ok && result.connected) {
    ui.swStatus.textContent = result.solidWorksBusy ? "Busy" : (result.startedSolidWorks ? "Started" : "Connected");
    ui.swStatus.classList.add("ok");
  } else {
    ui.swStatus.textContent = "Disconnected";
    ui.swStatus.classList.add("error");
  }
  const doc = result.activeDocument;
  if (doc?.hasActiveDocument) {
    const previousDocPath = state.lastSolidWorksDocument?.path || "";
    state.lastSolidWorksDocument = doc;
    if (
      previousDocPath !== (doc.path || "") &&
      ui.docSearchList &&
      document.getElementById("docSearchView")?.classList.contains("active") &&
      !ui.docSearchInput?.value?.trim()
    ) {
      scheduleDocSearchRefresh(250);
    }
    if (doc.path) {
      const full = displayPathOf(doc.path);
      setActiveDocHtml(`<span class="active-doc-title">${escapeHtml(doc.title)}</span><span class="active-doc-root">${escapeHtml(full)}</span>`);
    } else {
      const source = doc.inferred ? "window" : "active";
      setActiveDocText(`${doc.title} (${source})`);
    }
    return;
  }
  if (result.solidWorksBusy && state.lastSolidWorksDocument) {
    const last = state.lastSolidWorksDocument;
    const full = displayPathOf(last.path);
    setActiveDocText(`SOLIDWORKS busy. Last seen: ${last.title}${full ? `  ${full}` : ""}`);
    return;
  }
  setActiveDocText(result.connected
    ? "Connected, but no foreground SOLIDWORKS document was found."
    : "No active document loaded.");
}

function switchView(viewName) {
  for (const button of ui.navButtons) button.classList.toggle("active", button.dataset.view === viewName);
  for (const view of ui.views) view.classList.toggle("active", view.id === `${viewName}View`);
  if (viewName === "docSearch") scheduleDocSearchRefresh(0);
  if (viewName === "workLogger") refreshWorkLoggerList().catch(() => {});
  if (viewName === "gcode") refreshGcodeView().catch(() => {});
  if (viewName === "settings") refreshCacheStats().catch(() => {});
}

function defaultNamesFor(filePath) {
  return String(filePath || "").toLowerCase().endsWith(".dll")
    ? { moduleName: "", procedureName: "Main" }
    : { moduleName: "", procedureName: "main" };
}

function renderMacroTiles() {
  ui.macroTileGrid.innerHTML = "";
  ui.macroFolderState.textContent = state.macroRoot
    ? `Macro folder: ${state.macroRoot}`
    : "Macro folder: Documents\\Excelsis\\Macros";
  if (!state.macroTiles.length) {
    const empty = document.createElement("div");
    empty.className = "response-preview muted";
    empty.textContent = "No SOLIDWORKS macros found in the macro folder.";
    ui.macroTileGrid.appendChild(empty);
    return;
  }
  for (const tile of state.macroTiles) {
    const card = document.createElement("div");
    card.className = "macro-tile";
    card.tabIndex = 0;
    card.role = "button";
    card.innerHTML = `
      <div>
        <div class="macro-tile-title">${escapeHtml(tile.displayName || tile.name)}</div>
        <textarea class="macro-desc-edit" data-description="${escapeHtml(tile.id)}" rows="3" spellcheck="true">${escapeHtml(tile.description || "")}</textarea>
      </div>
      <div>
        <div class="macro-tile-path">${escapeHtml(tile.relativePath || tile.filePath)}</div>
        <div class="macro-tile-actions">
          <button type="button" class="run" data-run="${escapeHtml(tile.id)}">Run</button>
          <button type="button" data-save-description="${escapeHtml(tile.id)}">Save Description</button>
        </div>
      </div>
    `;
    card.addEventListener("click", (event) => {
      const runId = event.target?.dataset?.run;
      const saveId = event.target?.dataset?.saveDescription;
      if (runId) {
        event.stopPropagation();
        runMacroTile(tile);
        return;
      }
      if (saveId) {
        event.stopPropagation();
        const textarea = card.querySelector("[data-description]");
        saveMacroDescription(tile, textarea?.value || "");
        return;
      }
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target?.tagName === "TEXTAREA") return;
      event.preventDefault();
      runMacroTile(tile);
    });
    ui.macroTileGrid.appendChild(card);
  }
}

async function refreshMacroTiles() {
  const result = await api.listMacroTiles();
  state.macroTiles = result.tiles || [];
  state.macroRoot = result.root || state.macroRoot;
  renderMacroTiles();
}

async function saveMacroDescription(tile, description) {
  const result = await api.saveMacroTile({
    filePath: tile.filePath,
    description,
  });
  if (!result.ok) {
    log("Macro description was not saved.", result);
    return;
  }
  state.macroTiles = result.tiles || state.macroTiles;
  state.macroRoot = result.root || state.macroRoot;
  renderMacroTiles();
  log("Macro description saved.");
}

async function openMacroFolder() {
  const result = await api.openMacroFolder();
  if (result.root) state.macroRoot = result.root;
  renderMacroTiles();
  if (!result.ok) log("Could not open macro folder.", result);
}

async function runMacroTile(tile) {
  log(`Running ${tile.name}...`);
  const result = await api.runMacro({
    filePath: tile.filePath,
    moduleName: tile.moduleName || defaultNamesFor(tile.filePath).moduleName,
    procedureName: tile.procedureName || defaultNamesFor(tile.filePath).procedureName,
  });
  setStatus(result);
  log(result.ok ? "Macro finished." : "Macro failed.", result);
}

async function convertSwbMacros() {
  const ok = window.confirm([
    "Convert every .swb macro in the macro folder to .swp?",
    "",
    "Make sure SOLIDWORKS is open first.",
    "Excelsis drives the Edit Macro dialog for each .swb in turn.",
    "When it's done, close the VBA editor manually.",
  ].join("\n"));
  if (!ok) return;

  if (!ui.convertSwbMacrosBtn) return;
  ui.convertSwbMacrosBtn.disabled = true;
  ui.convertSwbMacrosBtn.textContent = "Converting...";
  log("Converting SWB macros to SWP...");
  try {
    const result = await api.convertSwbMacros();
    log(result.ok ? "SWB conversion finished." : "SWB conversion had problems.", {
      macroRoot: result.macroRoot,
      converted: result.converted,
      failed: result.failed,
      error: result.error,
      message: result.message,
    });
    await refreshMacroTiles();
  } catch (error) {
    log("SWB conversion failed.", { error: error.message });
  } finally {
    ui.convertSwbMacrosBtn.disabled = false;
    ui.convertSwbMacrosBtn.textContent = "Convert SWB to SWP";
  }
}

async function refreshSolidWorksStatus({ writeLog = false } = {}) {
  if (state.solidWorksStatusInFlight) return;
  state.solidWorksStatusInFlight = true;
  try {
    const result = await api.solidWorksStatus();
    setStatus(result);
    if (writeLog) log(result.ok ? "SOLIDWORKS status updated." : "SOLIDWORKS connection failed.", result);
    refreshRecentDocsList().catch(() => {});
    if (document.getElementById("workLoggerView")?.classList.contains("active")) {
      refreshWorkLoggerList().catch(() => {});
    }
  } catch (error) {
    setStatus({ ok: false, connected: false });
    if (writeLog) log("SOLIDWORKS connection failed.", { error: error.message });
  } finally {
    state.solidWorksStatusInFlight = false;
  }
}

async function copyCurrentDocLocation() {
  if (!ui.copyDocLocationBtn) return;
  const originalLabel = ui.copyDocLocationBtn.textContent;
  ui.copyDocLocationBtn.disabled = true;
  ui.copyDocLocationBtn.textContent = "Copying...";
  try {
    const result = await api.copyCurrentDocLocation();
    if (result?.status) setStatus(result.status);
    if (!result?.ok) throw new Error(result?.error || "Could not copy the active document folder.");
    log("Current document folder copied to clipboard.", {
      documentPath: result.documentPath,
      folderPath: result.folderPath,
    });
    ui.copyDocLocationBtn.textContent = "Copied";
    setTimeout(() => {
      if (!ui.copyDocLocationBtn.disabled) ui.copyDocLocationBtn.textContent = originalLabel;
    }, 900);
  } catch (error) {
    log("Copy current document folder failed.", { error: error.message });
    ui.copyDocLocationBtn.textContent = "Copy Failed";
    setTimeout(() => {
      if (!ui.copyDocLocationBtn.disabled) ui.copyDocLocationBtn.textContent = originalLabel;
    }, 1200);
  } finally {
    ui.copyDocLocationBtn.disabled = false;
    if (ui.copyDocLocationBtn.textContent === "Copying...") ui.copyDocLocationBtn.textContent = originalLabel;
  }
}

const recentDocsState = {
  filter: "all",
  search: "",
  lastSignature: "",
  contextMenu: null,
  contextEntry: null,
  filteredEntries: [],
  renderedCount: 0,
  resetRender: false,
};

const RECENT_DOCS_RENDER_BATCH_SIZE = 60;
const WORKLOG_RENDER_BATCH_SIZE = 80;
const DEFAULT_WORKLOG_EXPORT_RULES = {
  cutoffMinutes: 9,
  multiplier: 2,
  roundToMinutes: 30,
};
const DEFAULT_WORKLOG_EXPORT_WORKTYPE = "Rajzk\u00e9sz\u00edt\u00e9s/CAM programoz\u00e1s";

const workLoggerState = {
  entries: [],
  path: "",
  activeDate: "",
  counterStatus: null,
  lastSignature: "",
  renderedCount: 0,
  workTypes: [DEFAULT_WORKLOG_EXPORT_WORKTYPE],
  defaultWorkType: DEFAULT_WORKLOG_EXPORT_WORKTYPE,
  workTypesCatalog: null,
  projectWorkTypes: {},
  lastDayMode: false,
  lastDayProjects: [],
  lastDayBackup: null,
};

function recentDocsScrollContainer() {
  return document.querySelector(".content") || document.scrollingElement || document.documentElement;
}

function workLoggerIsActive() {
  return document.getElementById("workLoggerView")?.classList.contains("active");
}

async function refreshRecentDocsList() {
  if (!ui.recentDocsList) return;
  try {
    const result = await api.listRecentDocs();
    if (!result || !result.ok) return;
    renderRecentDocs(result.entries || []);
  } catch {}
}

function hideRecentDocContextMenu() {
  if (!recentDocsState.contextMenu) return;
  recentDocsState.contextMenu.remove();
  recentDocsState.contextMenu = null;
  recentDocsState.contextEntry = null;
}

async function deleteRecentDoc(entry) {
  if (!entry?.path) return;
  hideRecentDocContextMenu();
  try {
    const result = await api.deleteRecentDoc(entry.path);
    if (!result?.ok) {
      log("Could not delete recent document tile.", result);
      return;
    }
    recentDocsState.lastSignature = "";
    log("Recent SOLIDWORKS tile removed.", { path: entry.path, deleted: result.deleted });
    await refreshRecentDocsList();
  } catch (error) {
    log("Could not delete recent document tile.", { error: error.message, path: entry.path });
  }
}

async function retryRecentDocThumbnail(entry, { renderOnly = false } = {}) {
  if (!entry?.path) return;
  hideRecentDocContextMenu();
  try {
    let result;
    if (typeof api.retryRecentDocThumbnail === "function") {
      // Regular retry: shell -> sw-api. "SW render retry": force the
      // view-reorienting SOLIDWORKS render (renderOnly).
      result = await api.retryRecentDocThumbnail(entry.path, { renderOnly });
    } else {
      log("Per-document thumbnail retry needs the updated app core. Rebuild/install or restart after updating the core files.", { path: entry.path });
      return;
    }
    if (!result?.ok) {
      log("Could not retry thumbnail.", result);
      return;
    }
    recentDocsState.lastSignature = "";
    log(renderOnly ? "SW render retry for document (opens/reorients in SOLIDWORKS)." : "Deleted and retrying thumbnail for document.", {
      path: entry.path,
      deletedThumbnail: result.deletedThumbnail,
      renderOnly: result.renderOnly,
    });
    for (const delay of [1200, 4000, 9000, 16000, 28000]) {
      setTimeout(() => {
        recentDocsState.lastSignature = "";
        refreshRecentDocsList().catch(() => {});
        state.docSearchLastSignature = "";
        if (document.getElementById("docSearchView")?.classList.contains("active")) {
          refreshDocSearch({ page: state.docSearchPage }).catch(() => {});
        }
      }, delay);
    }
    await refreshRecentDocsList();
  } catch (error) {
    log("Could not retry thumbnail.", { error: error.message, path: entry.path });
  }
}

// Doc Search → "Add to recent (as opened)": inject the doc at the top of the
// Recent SOLIDWORKS list with a current timestamp, as if it had just been opened.
async function addDocToRecent(entry) {
  if (!entry?.path) return;
  hideRecentDocContextMenu();
  try {
    if (typeof api.addRecentDoc !== "function") {
      log("Add-to-recent needs the updated app core. Rebuild/install or restart after updating the core files.", { path: entry.path });
      return;
    }
    const result = await api.addRecentDoc(entry.path);
    if (!result?.ok) {
      log("Could not add document to recent.", result);
      return;
    }
    recentDocsState.lastSignature = "";
    log("Added document to the top of Recent SOLIDWORKS docs.", { path: entry.path });
    await refreshRecentDocsList();
    // Refresh again as the thumbnail generates in the background.
    for (const delay of [1500, 5000, 12000, 20000]) {
      setTimeout(() => {
        recentDocsState.lastSignature = "";
        refreshRecentDocsList().catch(() => {});
      }, delay);
    }
  } catch (error) {
    log("Could not add document to recent.", { error: error.message, path: entry.path });
  }
}

async function openContainingFolderForEntry(entry) {
  if (!entry?.path) return;
  hideRecentDocContextMenu();
  try {
    const result = await api.openContainingFolder(entry.path);
    if (!result?.ok) {
      log("Could not open containing folder.", result);
      return;
    }
    log(result.selected ? "Opened folder and selected document." : "Opened containing folder.", {
      path: entry.path,
      folder: result.folder,
    });
  } catch (error) {
    log("Could not open containing folder.", { error: error.message, path: entry.path });
  }
}

function showRecentDocContextMenu(event, entry) {
  event.preventDefault();
  event.stopPropagation();
  hideRecentDocContextMenu();

  const menu = document.createElement("div");
  menu.className = "recent-docs-context-menu";
  menu.style.left = `${event.clientX}px`;
  menu.style.top = `${event.clientY}px`;
  menu.innerHTML = `
    <button type="button" data-action="open-folder">Open folder</button>
    <button type="button" data-action="retry-thumbnail">Delete + retry thumbnail</button>
    <button type="button" data-action="render-retry">SW render retry</button>
    <button type="button" data-action="delete">Delete from recent</button>
  `;
  menu.addEventListener("click", (clickEvent) => {
    clickEvent.stopPropagation();
    const action = clickEvent.target?.dataset?.action;
    if (action === "open-folder") openContainingFolderForEntry(entry);
    if (action === "retry-thumbnail") retryRecentDocThumbnail(entry);
    if (action === "render-retry") retryRecentDocThumbnail(entry, { renderOnly: true });
    if (action === "delete") deleteRecentDoc(entry);
  });
  document.body.appendChild(menu);
  const rect = menu.getBoundingClientRect();
  const pad = 8;
  const left = Math.min(event.clientX, window.innerWidth - rect.width - pad);
  const top = Math.min(event.clientY, window.innerHeight - rect.height - pad);
  menu.style.left = `${Math.max(pad, left)}px`;
  menu.style.top = `${Math.max(pad, top)}px`;
  recentDocsState.contextMenu = menu;
  recentDocsState.contextEntry = entry;
}

function showDocSearchContextMenu(event, entry) {
  event.preventDefault();
  event.stopPropagation();
  hideRecentDocContextMenu();

  const menu = document.createElement("div");
  menu.className = "recent-docs-context-menu";
  menu.style.left = `${event.clientX}px`;
  menu.style.top = `${event.clientY}px`;
  menu.innerHTML = `
    <button type="button" data-action="add-recent">Add to recent (as opened)</button>
    <button type="button" data-action="open-folder">Open folder</button>
    <button type="button" data-action="retry-thumbnail">Delete + retry thumbnail</button>
    <button type="button" data-action="render-retry">SW render retry</button>
  `;
  menu.addEventListener("click", (clickEvent) => {
    clickEvent.stopPropagation();
    const action = clickEvent.target?.dataset?.action;
    if (action === "add-recent") addDocToRecent(entry);
    if (action === "open-folder") openContainingFolderForEntry(entry);
    if (action === "retry-thumbnail") retryRecentDocThumbnail(entry);
    if (action === "render-retry") retryRecentDocThumbnail(entry, { renderOnly: true });
  });
  document.body.appendChild(menu);
  const rect = menu.getBoundingClientRect();
  const pad = 8;
  const left = Math.min(event.clientX, window.innerWidth - rect.width - pad);
  const top = Math.min(event.clientY, window.innerHeight - rect.height - pad);
  menu.style.left = `${Math.max(pad, left)}px`;
  menu.style.top = `${Math.max(pad, top)}px`;
  recentDocsState.contextMenu = menu;
  recentDocsState.contextEntry = entry;
}

function filterRecentDocs(entries) {
  let filtered = recentDocsState.filter === "all"
    ? entries
    : entries.filter((e) => String(e.type || "").toLowerCase() === recentDocsState.filter);
  const query = recentDocsState.search.trim().toLowerCase();
  if (query) {
    const tokens = query.split(/\s+/).filter(Boolean);
    const matchesAll = (value) => tokens.every((tok) => String(value || "").toLowerCase().includes(tok));
    const filenameMatches = filtered.filter((e) => {
      const filename = e.title || basenameOf(e.path || "");
      return matchesAll(filename);
    });
    if (filenameMatches.length) return filenameMatches;
    filtered = filtered.filter((e) => matchesAll(`${e.displayPath || ""} ${e.path || ""}`));
  }
  return filtered;
}

function formatProjectActivity(summary) {
  const minutes = Math.max(0, Math.round(Number(summary?.minutes || 0)));
  const hours = Number(summary?.hours || 0).toFixed(1);
  return `${minutes} min (${hours} h)`;
}

function formatShortDuration(ms) {
  const value = Number(ms);
  if (!Number.isFinite(value) || value < 0) return "";
  const minutes = value / 60000;
  if (minutes < 1) return "<1 min";
  if (minutes < 10) return `${minutes.toFixed(1)} min`;
  return `${Math.round(minutes)} min`;
}

function worklogWorkTypeOptions() {
  const seen = new Set();
  const result = [];
  for (const item of workLoggerState.workTypes || []) {
    const text = String(item || "").trim();
    const key = text.toLowerCase();
    if (!text || seen.has(key)) continue;
    seen.add(key);
    result.push(text);
  }
  return result.length ? result : [DEFAULT_WORKLOG_EXPORT_WORKTYPE];
}

function pickWorklogWorkType(value, fallback = DEFAULT_WORKLOG_EXPORT_WORKTYPE) {
  const options = worklogWorkTypeOptions();
  const requested = String(value || "").trim();
  if (requested && options.includes(requested)) return requested;
  if (fallback && options.includes(fallback)) return fallback;
  if (workLoggerState.defaultWorkType && options.includes(workLoggerState.defaultWorkType)) {
    return workLoggerState.defaultWorkType;
  }
  return options[0] || DEFAULT_WORKLOG_EXPORT_WORKTYPE;
}

function defaultWorklogWorkType() {
  return pickWorklogWorkType(workLoggerState.defaultWorkType, DEFAULT_WORKLOG_EXPORT_WORKTYPE);
}

function populateWorklogWorkTypeSelect(select, selected) {
  if (!select) return;
  const chosen = pickWorklogWorkType(selected, defaultWorklogWorkType());
  const fragment = document.createDocumentFragment();
  for (const workType of worklogWorkTypeOptions()) {
    const option = document.createElement("option");
    option.value = workType;
    option.textContent = workType;
    fragment.appendChild(option);
  }
  select.replaceChildren(fragment);
  select.value = chosen;
}

async function loadWorklogWorkTypes() {
  const fallback = {
    ok: false,
    defaultWorkType: DEFAULT_WORKLOG_EXPORT_WORKTYPE,
    workTypes: [DEFAULT_WORKLOG_EXPORT_WORKTYPE],
  };
  let result = fallback;
  if (typeof api.listWorklogWorktypes === "function") {
    try {
      result = await api.listWorklogWorktypes();
    } catch (error) {
      result = { ...fallback, error: error.message };
    }
  }
  const types = Array.isArray(result?.workTypes)
    ? result.workTypes.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  workLoggerState.workTypes = types.length ? types : [DEFAULT_WORKLOG_EXPORT_WORKTYPE];
  workLoggerState.defaultWorkType = pickWorklogWorkType(result?.defaultWorkType, DEFAULT_WORKLOG_EXPORT_WORKTYPE);
  workLoggerState.workTypesCatalog = result;
  populateWorklogWorkTypeSelect(ui.worklogExportDefaultWorkType, workLoggerState.defaultWorkType);
  populateWorklogWorkTypeSelect(ui.worklogExportSecondWorkType, workLoggerState.defaultWorkType);
  return result;
}

function worklogProjectExportKey(entry) {
  return String(entry?.key || entry?.name || "unknown project").trim().toLowerCase();
}

function syncWorklogProjectWorkTypeState() {
  if (!ui.worklogExportProjectWorkTypes) return;
  const selects = ui.worklogExportProjectWorkTypes.querySelectorAll("select[data-worklog-project-key]");
  const next = { ...workLoggerState.projectWorkTypes };
  for (const select of selects) {
    const key = String(select.dataset.worklogProjectKey || "").trim();
    if (!key) continue;
    const index = select.dataset.worklogWorkTypeSlot === "secondary" ? 1 : 0;
    const current = Array.isArray(next[key]) ? next[key].slice(0, 2) : [];
    current[index] = select.value;
    next[key] = current;
  }
  workLoggerState.projectWorkTypes = next;
}

function readWorklogExportRules(options = {}) {
  if (!options.skipProjectSync) syncWorklogProjectWorkTypeState();
  const cutoffMinutes = Math.max(0, Math.min(1440, Math.round(
    Number(ui.worklogExportCutoffMinutes?.value || DEFAULT_WORKLOG_EXPORT_RULES.cutoffMinutes),
  )));
  const multiplierValue = Number(ui.worklogExportMultiplier?.value || DEFAULT_WORKLOG_EXPORT_RULES.multiplier);
  const multiplier = Number((Number.isFinite(multiplierValue)
    ? Math.max(0.01, Math.min(24, multiplierValue))
    : DEFAULT_WORKLOG_EXPORT_RULES.multiplier).toFixed(3));
  const roundToMinutesValue = Number(ui.worklogExportRoundToMinutes?.value || DEFAULT_WORKLOG_EXPORT_RULES.roundToMinutes);
  const roundToMinutes = [5, 10, 15, 30, 60].includes(roundToMinutesValue)
    ? roundToMinutesValue
    : DEFAULT_WORKLOG_EXPORT_RULES.roundToMinutes;
  const defaultWorkType = pickWorklogWorkType(ui.worklogExportDefaultWorkType?.value, defaultWorklogWorkType());
  const splitByWorkType = Boolean(ui.worklogExportSplitByWorkType?.checked);
  const splitWorkTypes = [
    defaultWorkType,
    pickWorklogWorkType(ui.worklogExportSecondWorkType?.value, defaultWorkType),
  ];
  const targetHoursMode = Boolean(ui.worklogExportTargetHoursMode?.checked);
  const targetHoursValue = Number(ui.worklogExportTargetHours?.value || 8);
  const targetHours = Math.max(0.5, Math.round((Number.isFinite(targetHoursValue) ? targetHoursValue : 8) * 2) / 2);
  return {
    cutoffMinutes,
    multiplier,
    roundToMinutes,
    defaultWorkType,
    splitByWorkType,
    splitWorkTypes,
    perProjectWorkTypes: Boolean(ui.worklogExportPerProjectWorkTypes?.checked),
    projectWorkTypes: { ...workLoggerState.projectWorkTypes },
    targetHoursMode,
    targetHours,
  };
}

function resetWorklogExportRuleInputs() {
  if (ui.worklogExportCutoffMinutes) ui.worklogExportCutoffMinutes.value = String(DEFAULT_WORKLOG_EXPORT_RULES.cutoffMinutes);
  if (ui.worklogExportMultiplier) ui.worklogExportMultiplier.value = String(DEFAULT_WORKLOG_EXPORT_RULES.multiplier);
  if (ui.worklogExportRoundToMinutes) ui.worklogExportRoundToMinutes.value = String(DEFAULT_WORKLOG_EXPORT_RULES.roundToMinutes);
  workLoggerState.projectWorkTypes = {};
  const defaultType = defaultWorklogWorkType();
  populateWorklogWorkTypeSelect(ui.worklogExportDefaultWorkType, defaultType);
  populateWorklogWorkTypeSelect(ui.worklogExportSecondWorkType, defaultType);
  if (ui.worklogExportPerProjectWorkTypes) ui.worklogExportPerProjectWorkTypes.checked = false;
  if (ui.worklogExportSplitByWorkType) ui.worklogExportSplitByWorkType.checked = false;
  if (ui.worklogExportSecondWorkTypeWrap) ui.worklogExportSecondWorkTypeWrap.classList.add("hidden");
  if (ui.worklogExportProjectWorkTypes) {
    ui.worklogExportProjectWorkTypes.classList.add("hidden");
    ui.worklogExportProjectWorkTypes.replaceChildren();
  }
  if (ui.worklogExportTargetHoursMode) ui.worklogExportTargetHoursMode.checked = false;
  if (ui.worklogExportTargetHours) ui.worklogExportTargetHours.value = "8";
}

// Load a saved/remembered rules object into the dialog inputs.
function applyWorklogExportRules(rules) {
  const r = rules || {};
  if (ui.worklogExportCutoffMinutes) ui.worklogExportCutoffMinutes.value = String(r.cutoffMinutes ?? DEFAULT_WORKLOG_EXPORT_RULES.cutoffMinutes);
  if (ui.worklogExportMultiplier) ui.worklogExportMultiplier.value = String(r.multiplier ?? DEFAULT_WORKLOG_EXPORT_RULES.multiplier);
  const roundTo = [5, 10, 15, 30, 60].includes(Number(r.roundToMinutes)) ? Number(r.roundToMinutes) : DEFAULT_WORKLOG_EXPORT_RULES.roundToMinutes;
  if (ui.worklogExportRoundToMinutes) ui.worklogExportRoundToMinutes.value = String(roundTo);
  workLoggerState.projectWorkTypes = (r.projectWorkTypes && typeof r.projectWorkTypes === "object") ? { ...r.projectWorkTypes } : {};
  const defaultType = pickWorklogWorkType(r.defaultWorkType, defaultWorklogWorkType());
  populateWorklogWorkTypeSelect(ui.worklogExportDefaultWorkType, defaultType);
  const secondType = pickWorklogWorkType(Array.isArray(r.splitWorkTypes) ? r.splitWorkTypes[1] : undefined, defaultType);
  populateWorklogWorkTypeSelect(ui.worklogExportSecondWorkType, secondType);
  if (ui.worklogExportPerProjectWorkTypes) ui.worklogExportPerProjectWorkTypes.checked = Boolean(r.perProjectWorkTypes);
  if (ui.worklogExportSplitByWorkType) ui.worklogExportSplitByWorkType.checked = Boolean(r.splitByWorkType);
  if (ui.worklogExportSecondWorkTypeWrap) ui.worklogExportSecondWorkTypeWrap.classList.toggle("hidden", !r.splitByWorkType);
  if (ui.worklogExportTargetHoursMode) ui.worklogExportTargetHoursMode.checked = Boolean(r.targetHoursMode);
  if (ui.worklogExportTargetHours) ui.worklogExportTargetHours.value = String(r.targetHours ?? 8);
  if (ui.worklogExportProjectWorkTypes) {
    ui.worklogExportProjectWorkTypes.classList.toggle("hidden", !r.perProjectWorkTypes);
    if (!r.perProjectWorkTypes) ui.worklogExportProjectWorkTypes.replaceChildren();
  }
}

// Show the target input and grey out multiplier/round-up when target mode owns
// the totals.
function syncWorklogTargetHoursUi() {
  const on = Boolean(ui.worklogExportTargetHoursMode?.checked);
  if (ui.worklogExportTargetHoursWrap) ui.worklogExportTargetHoursWrap.classList.toggle("hidden", !on);
  for (const el of [ui.worklogExportMultiplier, ui.worklogExportRoundToMinutes]) {
    if (!el) continue;
    el.disabled = on;
    const label = el.closest("label");
    if (label) label.classList.toggle("worklog-export-disabled", on);
  }
}

// The dialog previews/exports today's live list, or the recovered last-day
// backup when opened via "Export last day".
function worklogExportSourceEntries() {
  return workLoggerState.lastDayMode ? (workLoggerState.lastDayProjects || []) : (workLoggerState.entries || []);
}

// Mirror of the backend allocateTargetHoursMinutes so the preview matches the
// actual export. Returns Map(projectKey -> minutes) in 0.5 h (30 min) blocks.
function allocateTargetHoursMinutesJs(entries, rules) {
  const result = new Map();
  const qualifying = (entries || []).filter((e) => {
    const minutes = Math.max(0, Number(e?.totalMs || 0) / 60000);
    return Number(e?.totalMs || 0) > 0 && minutes + 1e-9 >= rules.cutoffMinutes;
  });
  if (!qualifying.length) return result;
  const targetBlocks = Math.round((rules.targetHours * 60) / 30);
  const totalBlocks = Math.max(qualifying.length, targetBlocks);
  const blocks = new Map(qualifying.map((e) => [worklogProjectExportKey(e), 1]));
  let remaining = totalBlocks - qualifying.length;
  if (remaining > 0) {
    const totalMs = qualifying.reduce((sum, e) => sum + Math.max(0, Number(e?.totalMs || 0)), 0) || 1;
    const shares = qualifying.map((e) => {
      const key = worklogProjectExportKey(e);
      const exact = remaining * (Math.max(0, Number(e?.totalMs || 0)) / totalMs);
      const floor = Math.floor(exact);
      return { key, floor, frac: exact - floor };
    });
    for (const share of shares) { blocks.set(share.key, blocks.get(share.key) + share.floor); remaining -= share.floor; }
    shares.sort((a, b) => b.frac - a.frac);
    for (let i = 0; i < shares.length && remaining > 0; i++) { blocks.set(shares[i].key, blocks.get(shares[i].key) + 1); remaining -= 1; }
  }
  for (const entry of qualifying) {
    const key = worklogProjectExportKey(entry);
    result.set(key, blocks.get(key) * 30);
  }
  return result;
}

function previewWorklogExport(entries, rules) {
  const result = {
    exported: 0,
    entryCount: 0,
    skipped: 0,
    exportedMinutes: 0,
    overLimit: 0,
    exportableEntries: [],
  };
  const maxMinutes = rules.splitByWorkType ? 48 * 60 : 24 * 60;
  if (rules.targetHoursMode) {
    const allocation = allocateTargetHoursMinutesJs(entries, rules);
    for (const entry of entries || []) {
      const originalMinutes = Math.max(0, Number(entry?.totalMs || 0) / 60000);
      const key = worklogProjectExportKey(entry);
      if (!allocation.has(key)) {
        result.skipped++;
        continue;
      }
      const roundedMinutes = allocation.get(key);
      if (roundedMinutes > maxMinutes) {
        result.skipped++;
        result.overLimit++;
        continue;
      }
      result.exported++;
      result.entryCount += rules.splitByWorkType ? 2 : 1;
      result.exportedMinutes += roundedMinutes;
      result.exportableEntries.push({ ...entry, originalMinutes, roundedMinutes });
    }
    return result;
  }
  for (const entry of entries || []) {
    const originalMinutes = Math.max(0, Number(entry?.totalMs || 0) / 60000);
    if (originalMinutes + 1e-9 < rules.cutoffMinutes) {
      result.skipped++;
      continue;
    }
    const roundedMinutes = Math.ceil((originalMinutes * rules.multiplier) / rules.roundToMinutes) * rules.roundToMinutes;
    if (!Number.isFinite(roundedMinutes) || roundedMinutes <= 0) {
      result.skipped++;
      continue;
    }
    if (roundedMinutes > maxMinutes) {
      result.skipped++;
      result.overLimit++;
      continue;
    }
    result.exported++;
    result.entryCount += rules.splitByWorkType ? 2 : 1;
    result.exportedMinutes += roundedMinutes;
    result.exportableEntries.push({ ...entry, originalMinutes, roundedMinutes });
  }
  return result;
}

function createWorklogProjectWorkTypeSelect(projectKey, slot, selected) {
  const select = document.createElement("select");
  select.dataset.worklogProjectKey = projectKey;
  select.dataset.worklogWorkTypeSlot = slot;
  select.title = slot === "secondary" ? "Second worktype" : "Worktype";
  populateWorklogWorkTypeSelect(select, selected);
  select.addEventListener("change", () => {
    syncWorklogProjectWorkTypeState();
    updateWorklogExportPreview();
  });
  return select;
}

function renderWorklogExportProjectWorkTypes() {
  syncWorklogProjectWorkTypeState();
  const split = Boolean(ui.worklogExportSplitByWorkType?.checked);
  if (ui.worklogExportSecondWorkTypeWrap) ui.worklogExportSecondWorkTypeWrap.classList.toggle("hidden", !split);
  if (!ui.worklogExportProjectWorkTypes) return;
  const perProject = Boolean(ui.worklogExportPerProjectWorkTypes?.checked);
  ui.worklogExportProjectWorkTypes.classList.toggle("hidden", !perProject);
  if (!perProject) {
    ui.worklogExportProjectWorkTypes.replaceChildren();
    return;
  }

  const rules = readWorklogExportRules({ skipProjectSync: true });
  const preview = previewWorklogExport(worklogExportSourceEntries(), rules);
  const fragment = document.createDocumentFragment();
  for (const entry of preview.exportableEntries) {
    const key = worklogProjectExportKey(entry);
    const saved = Array.isArray(workLoggerState.projectWorkTypes[key])
      ? workLoggerState.projectWorkTypes[key]
      : [];
    const row = document.createElement("div");
    row.className = `worklog-export-project-type-row${split ? " split" : ""}`;
    const info = document.createElement("div");
    info.className = "worklog-export-project-name";
    info.innerHTML = `
      <span>Project</span>
      <strong title="${escapeAttr(entry.name || "")}">${escapeHtml(entry.name || "Unknown project")}</strong>
      <small>${escapeHtml(`${formatProjectActivity(entry)} -> ${entry.roundedMinutes} min`)}</small>
    `;
    row.appendChild(info);
    row.appendChild(createWorklogProjectWorkTypeSelect(key, "primary", saved[0] || rules.defaultWorkType));
    if (split) {
      row.appendChild(createWorklogProjectWorkTypeSelect(key, "secondary", saved[1] || rules.splitWorkTypes[1]));
    }
    fragment.appendChild(row);
  }
  ui.worklogExportProjectWorkTypes.replaceChildren(fragment);
}

function updateWorklogExportPreview() {
  if (!ui.worklogExportSummary) return;
  const rules = readWorklogExportRules();
  const preview = previewWorklogExport(worklogExportSourceEntries(), rules);
  const hours = (preview.exportedMinutes / 60).toFixed(2);
  const skippedText = preview.skipped ? ` Skipped: ${preview.skipped}.` : "";
  const overLimitText = preview.overLimit ? ` Over 24 h limit: ${preview.overLimit}.` : "";
  ui.worklogExportSummary.textContent = preview.exported
    ? `Ready: ${preview.exported} project(s), ${preview.entryCount} log(s), ${hours} h.${skippedText}${overLimitText}`
    : `No projects meet these rules.${skippedText}${overLimitText}`;
  if (ui.confirmWorklogExportBtn) ui.confirmWorklogExportBtn.disabled = preview.exported <= 0;
}

function updateWorklogExportControls() {
  syncWorklogTargetHoursUi();
  renderWorklogExportProjectWorkTypes();
  updateWorklogExportPreview();
}

function setWorklogExportDialogOpen(open) {
  if (!ui.worklogExportDialog) return;
  ui.worklogExportDialog.classList.toggle("hidden", !open);
  if (!open) {
    workLoggerState.lastDayMode = false;
    return;
  }
  if (ui.worklogExportTitle) {
    ui.worklogExportTitle.textContent = workLoggerState.lastDayMode ? "Export last day (recovered)" : "Export Work Logs";
  }
  if (ui.confirmWorklogExportBtn) {
    ui.confirmWorklogExportBtn.textContent = workLoggerState.lastDayMode ? "Export last day" : "Export";
  }
  if (ui.worklogExportState) {
    const backup = workLoggerState.lastDayBackup;
    if (workLoggerState.lastDayMode && backup) {
      const when = backup.activeDate || "the last reset";
      ui.worklogExportState.textContent = `Recovering ${backup.count} project(s) from ${when}${backup.reason ? ` (${backup.reason})` : ""}. Today's running totals are untouched.`;
      ui.worklogExportState.classList.remove("muted");
    } else {
      ui.worklogExportState.textContent = "";
      ui.worklogExportState.classList.add("muted");
    }
  }
  updateWorklogExportControls();
  requestAnimationFrame(() => ui.worklogExportCutoffMinutes?.focus());
}

async function openWorklogExportDialog(options = {}) {
  workLoggerState.lastDayMode = Boolean(options.lastDay);
  await loadWorklogWorkTypes();
  // Restore the last-used settings (from a previous export or the Set button),
  // falling back to defaults the first time.
  let savedRules = null;
  if (typeof api.getWorklogExportRules === "function") {
    try {
      const res = await api.getWorklogExportRules();
      if (res?.ok && res.rules) savedRules = res.rules;
    } catch {}
  }
  if (savedRules) applyWorklogExportRules(savedRules);
  else resetWorklogExportRuleInputs();
  if (workLoggerState.lastDayMode) {
    workLoggerState.lastDayProjects = Array.isArray(options.projects)
      ? options.projects
      : (workLoggerState.lastDayBackup?.projects || []);
  } else {
    await refreshWorkLoggerList();
  }
  setWorklogExportDialogOpen(true);
}

function createRecentDocTile(entry) {
  const tile = document.createElement("button");
  tile.type = "button";
  tile.className = `recent-docs-tile${entry.missing ? " missing" : ""}`;
  tile.dataset.path = entry.path;
  tile.title = `${entry.path}${entry.missing ? "\n(file missing)" : ""}`;
  const typeKey = String(entry.type || "other");
  const typeLabel = typeKey === "part" ? "Part"
    : typeKey === "assembly" ? "Assy"
    : typeKey === "drawing" ? "Drw"
    : typeKey === "solidcam" ? "CAM"
    : "?";
  const filename = entry.title || entry.path.split(/[\\/]/).pop();
  const fullPath = entry.displayPath || displayPathOf(entry.path);
  const thumbHtml = entry.thumbnail
    ? `<img class="recent-docs-tile-image" src="${escapeAttr(entry.thumbnail)}" alt="" loading="lazy">`
    : `<div class="recent-docs-tile-thumb type-${typeKey}">${escapeHtml(typeLabel)}</div>`;
  tile.innerHTML = `
    ${thumbHtml}
    <div class="recent-docs-tile-name">${escapeHtml(filename)}</div>
    <div class="recent-docs-tile-path" title="${escapeAttr(fullPath)}">${escapeHtml(fullPath)}</div>
  `;
  tile.addEventListener("click", () => {
    hideRecentDocContextMenu();
    if (entry.missing) return;
    api.openRecentDoc(entry.path).then((r) => {
      if (!r.ok) log("Failed to open recent document.", r);
      else if (r.thumbnailRetryScheduled) {
        log("Opened recent document. Retrying thumbnail after SOLIDWORKS loads it.", { path: entry.path });
        setTimeout(() => {
          recentDocsState.lastSignature = "";
          refreshRecentDocsList().catch(() => {});
        }, 3500);
        setTimeout(() => {
          recentDocsState.lastSignature = "";
          refreshRecentDocsList().catch(() => {});
        }, 8000);
        setTimeout(() => {
          recentDocsState.lastSignature = "";
          refreshRecentDocsList().catch(() => {});
        }, 15000);
      }
    });
  });
  tile.addEventListener("contextmenu", (event) => showRecentDocContextMenu(event, entry));
  return tile;
}

function appendRecentDocsBatch(batchSize = RECENT_DOCS_RENDER_BATCH_SIZE) {
  if (!ui.recentDocsList) return;
  const start = recentDocsState.renderedCount;
  const end = Math.min(recentDocsState.filteredEntries.length, start + batchSize);
  if (end <= start) return;
  const fragment = document.createDocumentFragment();
  for (let i = start; i < end; i++) {
    fragment.appendChild(createRecentDocTile(recentDocsState.filteredEntries[i]));
  }
  ui.recentDocsList.appendChild(fragment);
  recentDocsState.renderedCount = end;
}

function maybeLoadMoreRecentDocs() {
  if (!ui.recentDocsList) return;
  if (!document.getElementById("recentDocsView")?.classList.contains("active")) return;
  if (recentDocsState.renderedCount >= recentDocsState.filteredEntries.length) return;
  const scroller = recentDocsScrollContainer();
  if (!scroller) return;
  const remaining = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
  if (remaining < 900) appendRecentDocsBatch();
}

function renderRecentDocs(entries) {
  if (!ui.recentDocsList) return;
  const filtered = filterRecentDocs(entries);
  const query = recentDocsState.search.trim().toLowerCase();
  const signature = `${recentDocsState.filter}::${query}::` + filtered.map((e) =>
    `${e.path}|${e.missing ? 1 : 0}|${e.thumbnail || ""}|${e.displayPath || ""}`
  ).join(";");
  if (signature === recentDocsState.lastSignature) return;
  const previouslyRendered = recentDocsState.renderedCount || RECENT_DOCS_RENDER_BATCH_SIZE;
  recentDocsState.lastSignature = signature;
  recentDocsState.filteredEntries = filtered;
  const scroller = recentDocsScrollContainer();
  const scrollTop = scroller ? scroller.scrollTop : 0;
  ui.recentDocsList.replaceChildren();
  recentDocsState.renderedCount = 0;
  const targetCount = recentDocsState.resetRender
    ? RECENT_DOCS_RENDER_BATCH_SIZE
    : Math.max(RECENT_DOCS_RENDER_BATCH_SIZE, previouslyRendered);
  recentDocsState.resetRender = false;
  appendRecentDocsBatch(targetCount);
  if (scroller && scrollTop > 0) {
    requestAnimationFrame(() => {
      scroller.scrollTop = scrollTop;
      maybeLoadMoreRecentDocs();
    });
  }
}

function formatWorklogDate(value) {
  const ts = Number(value || 0);
  if (!ts) return "never";
  return new Date(ts).toLocaleString();
}

// One active +/- gesture at a time (single pointer). Module-scope so a global
// pointer-release net can always stop a runaway repeat, and so the list can be
// frozen from re-rendering while a gesture (and its pending backend flush) runs
// - otherwise the held button gets detached and the display lags.
const worklogAdjust = { holdTimer: null, repeatTimer: null, flushTimer: null, holding: false, busy: false };

// holding = button currently pressed; cleared on ANY release/cancel/blur so the
// +10/0.5s ramp can never loop forever.
function stopWorklogHold() {
  if (worklogAdjust.holdTimer) { clearTimeout(worklogAdjust.holdTimer); worklogAdjust.holdTimer = null; }
  if (worklogAdjust.repeatTimer) { clearInterval(worklogAdjust.repeatTimer); worklogAdjust.repeatTimer = null; }
  worklogAdjust.holding = false;
}
window.addEventListener("pointerup", stopWorklogHold, true);
window.addEventListener("pointercancel", stopWorklogHold, true);
window.addEventListener("blur", stopWorklogHold);

// Instant, purely-optimistic display update on every click/tick. The backend is
// NOT touched here - we only accumulate the net delta and flush once per burst,
// so the visible number changes immediately with zero round-trip latency.
function bumpWorklogEntry(entry, strongEl, deltaMinutes) {
  if (!entry) return;
  worklogAdjust.busy = true;
  entry.totalMs = Math.max(0, Number(entry.totalMs || 0) + deltaMinutes * 60000);
  // formatProjectActivity reads minutes/hours, not totalMs - keep them in sync so
  // the optimistic update is actually visible.
  entry.minutes = Math.round(entry.totalMs / 60000);
  entry.hours = Number((entry.totalMs / 3600000).toFixed(1));
  entry._pendingAdjust = Number(entry._pendingAdjust || 0) + deltaMinutes;
  if (strongEl) strongEl.textContent = formatProjectActivity(entry);
  scheduleWorklogFlush(entry);
}

// Debounced: once the gesture settles (button released, ~0.45s idle), send the
// accumulated delta to the backend in ONE call, then refresh for server truth +
// re-sort and unfreeze rendering. A 5s hold or a burst of clicks = one round trip.
function scheduleWorklogFlush(entry) {
  if (worklogAdjust.flushTimer) clearTimeout(worklogAdjust.flushTimer);
  worklogAdjust.flushTimer = setTimeout(async () => {
    worklogAdjust.flushTimer = null;
    if (worklogAdjust.holding) { scheduleWorklogFlush(entry); return; } // still pressed - wait
    const delta = Number(entry?._pendingAdjust || 0);
    entry._pendingAdjust = 0;
    if (delta && entry?.key && typeof api.adjustWorklogProject === "function") {
      try { await api.adjustWorklogProject(entry.key, delta); } catch {}
    }
    worklogAdjust.busy = false;
    refreshWorkLoggerList().catch(() => {});
  }, 450);
}

// Wire one +/- button: a plain click steps by 1 min; press-and-hold ramps by
// 10 min every 0.5 s. The display updates instantly on every tick; the list is
// frozen from re-rendering while holding/flushing (see renderWorkLogger) so the
// button can't be detached mid-gesture, and pointer capture keeps events here.
function attachWorklogAdjuster(entry, strongEl, btn, sign) {
  if (!btn || !entry) return;
  let didRepeat = false;
  btn.addEventListener("pointerdown", (event) => {
    if (event.button && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    stopWorklogHold();
    didRepeat = false;
    worklogAdjust.holding = true;
    try { btn.setPointerCapture(event.pointerId); } catch {}
    worklogAdjust.holdTimer = setTimeout(() => {
      worklogAdjust.holdTimer = null;
      didRepeat = true;
      bumpWorklogEntry(entry, strongEl, sign * 10);
      worklogAdjust.repeatTimer = setInterval(() => bumpWorklogEntry(entry, strongEl, sign * 10), 500);
    }, 450);
  });
  btn.addEventListener("pointerup", (event) => {
    event.stopPropagation();
    const wasRepeating = didRepeat;
    stopWorklogHold();
    if (!wasRepeating) bumpWorklogEntry(entry, strongEl, sign * 1);
    didRepeat = false;
  });
}

function createWorklogRow(entry) {
  const row = document.createElement("div");
  row.className = "worklog-row";
  row.role = "listitem";
  row.title = entry.lastDocPath || entry.name || "";
  const name = entry.name || "Unknown project";
  const lastDoc = entry.lastDocPath || "";
  row.innerHTML = `
    <div class="worklog-main">
      <div class="worklog-name">${escapeHtml(name)}</div>
      <div class="worklog-meta">${escapeHtml(lastDoc ? `Last file: ${displayPathOf(lastDoc)}` : "No last file recorded.")}</div>
    </div>
    <div class="worklog-adjust" role="group" aria-label="Adjust logged time">
      <button class="worklog-adjust-btn worklog-adjust-minus" type="button" title="Subtract time (click -1 min, hold for -10 min/0.5s)">&minus;</button>
      <button class="worklog-adjust-btn worklog-adjust-plus" type="button" title="Add time (click +1 min, hold for +10 min/0.5s)">+</button>
    </div>
    <div class="worklog-time">
      <strong>${escapeHtml(formatProjectActivity(entry))}</strong>
      <span>${escapeHtml(formatWorklogDate(entry.lastActiveAt))}</span>
    </div>
    <button class="worklog-delete" type="button" title="Delete only this project's work log">Delete</button>
  `;
  const strongEl = row.querySelector(".worklog-time strong");
  attachWorklogAdjuster(entry, strongEl, row.querySelector(".worklog-adjust-minus"), -1);
  attachWorklogAdjuster(entry, strongEl, row.querySelector(".worklog-adjust-plus"), 1);
  const deleteBtn = row.querySelector(".worklog-delete");
  deleteBtn?.addEventListener("click", async (event) => {
    event.stopPropagation();
    const ok = window.confirm(`Delete work log for ${name}? CAD files and recent documents are not deleted.`);
    if (!ok) return;
    deleteBtn.disabled = true;
    deleteBtn.textContent = "Deleting...";
    try {
      const result = await api.deleteWorklogProject(entry.key);
      if (!result?.ok || !result.deleted) {
        log("Work log was not deleted.", { project: name, result });
      } else {
        log("Deleted project work log.", {
          project: result.name || name,
          minutes: Math.round(Number(result.totalMs || 0) / 60000),
        });
      }
      workLoggerState.lastSignature = `deleted:${Date.now()}`;
      await refreshWorkLoggerList();
    } catch (error) {
      log("Could not delete project work log.", { project: name, error: error.message });
      deleteBtn.disabled = false;
      deleteBtn.textContent = "Delete";
    }
  });
  return row;
}

function appendWorklogBatch(batchSize = WORKLOG_RENDER_BATCH_SIZE) {
  if (!ui.workLoggerList) return;
  const start = workLoggerState.renderedCount;
  const end = Math.min(workLoggerState.entries.length, start + batchSize);
  if (end <= start) return;
  const fragment = document.createDocumentFragment();
  for (let i = start; i < end; i++) {
    fragment.appendChild(createWorklogRow(workLoggerState.entries[i]));
  }
  ui.workLoggerList.appendChild(fragment);
  workLoggerState.renderedCount = end;
  updateWorkLoggerStateText();
}

function renderWorkLoggerCountingStatus(counter = null) {
  if (!ui.workLoggerCountingStatus) return;
  const status = counter || workLoggerState.counterStatus || {};
  const isCounting = Boolean(status.isCounting);
  let headline = status.headline || (isCounting ? "Counting now" : "Nothing is being counted");
  let message = status.message || (isCounting
    ? "Counting the active SOLIDWORKS document."
    : "Nothing is being counted. Waiting for SOLIDWORKS activity.");
  if (status.code === "counting-unsaved") {
    headline = t("Tracking unsaved document");
    message = t("Time is held provisionally and will be added after this document is saved.");
  } else if (status.code === "unsaved-paused") {
    headline = t("Unsaved document paused");
    message = t("Pending time is preserved, but activity is currently paused.");
  } else if (status.code === "unsaved-waiting") {
    headline = t("Unsaved document waiting");
    message = t("Waiting for a trusted SOLIDWORKS watcher sample before holding time.");
  }
  const meta = [];
  if (status.projectName) meta.push(`Project: ${status.projectName}`);
  if (status.docTitle) meta.push(`Document: ${status.docTitle}`);
  if (status.provisional) {
    meta.push(`${t("Pending")}: ${formatShortDuration(status.pendingUnsavedMs)}`);
    meta.push(`${t("Save threshold")}: ${formatShortDuration(status.promotionMinMs)}`);
  }
  if (!isCounting && status.pauseMinutes) meta.push(`Grace: ${status.pauseMinutes} min`);
  if (status.idleMs != null && !isCounting) {
    const idleText = formatShortDuration(status.idleMs);
    if (idleText) meta.push(`Idle: ${idleText}`);
  }
  if (status.docPath) meta.push(displayPathOf(status.docPath));
  ui.workLoggerCountingStatus.className = `worklog-current-status ${isCounting ? "counting" : "paused"}`;
  ui.workLoggerCountingStatus.innerHTML = `
    <div class="worklog-current-dot" aria-hidden="true"></div>
    <div class="worklog-current-copy">
      <strong>${escapeHtml(headline)}</strong>
      <span>${escapeHtml(message)}</span>
      ${meta.length ? `<small>${escapeHtml(meta.join(" | "))}</small>` : ""}
    </div>
  `;
}

function updateWorkLoggerStateText(result = null) {
  if (!ui.workLoggerState) return;
  if (result?.path) workLoggerState.path = result.path;
  if (result?.activeDate) workLoggerState.activeDate = result.activeDate;
  const entries = workLoggerState.entries || [];
  const dateText = workLoggerState.activeDate ? `Today: ${workLoggerState.activeDate}. ` : "";
  if (!entries.length) {
    ui.workLoggerState.textContent = `${dateText}No project work logs yet. Open a SOLIDWORKS document and work with SOLIDWORKS foreground to start counting.`;
    return;
  }
  const shown = Math.min(workLoggerState.renderedCount, entries.length);
  const pathText = workLoggerState.path ? `\nLog file: ${workLoggerState.path}` : "";
  ui.workLoggerState.textContent = `${dateText}Projects: ${entries.length}. Sorted by last work done. Showing ${shown}/${entries.length}.${pathText}`;
}

function maybeLoadMoreWorklogs() {
  if (!ui.workLoggerList || !workLoggerIsActive()) return;
  if (workLoggerState.renderedCount >= workLoggerState.entries.length) return;
  const scroller = recentDocsScrollContainer();
  if (!scroller) return;
  const remaining = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
  if (remaining < 900) appendWorklogBatch();
}

function renderWorkLogger(projects, result = {}) {
  if (!ui.workLoggerList) return;
  // Never rebuild rows mid +/- gesture (or during its pending flush) - it would
  // detach the held button and wipe the optimistic display.
  if (worklogAdjust.holding || worklogAdjust.busy) return;
  const entries = Array.isArray(projects) ? projects : [];
  if (result.path) workLoggerState.path = result.path;
  if (result.activeDate) workLoggerState.activeDate = result.activeDate;
  if (result.counterStatus) workLoggerState.counterStatus = result.counterStatus;
  renderWorkLoggerCountingStatus(workLoggerState.counterStatus);
  const signature = entries.map((entry) =>
    `${entry.key}|${entry.totalMs}|${entry.lastActiveAt}|${entry.lastDocPath || ""}`
  ).join(";");
  const staleEmptyList = entries.length === 0 && ui.workLoggerList.childElementCount > 0;
  if (signature !== workLoggerState.lastSignature || staleEmptyList) {
    workLoggerState.lastSignature = signature;
    workLoggerState.entries = entries;
    workLoggerState.renderedCount = 0;
    ui.workLoggerList.replaceChildren();
    appendWorklogBatch();
  }
  if (ui.workLoggerState) {
    updateWorkLoggerStateText(result);
  }
  renderAutoExportStatus(result.autoExport);
  if (ui.worklogExportDialog && !ui.worklogExportDialog.classList.contains("hidden")) {
    updateWorklogExportControls();
  }
}

// Reassuring one-liner about the nightly auto-export: last outcome + next run.
function renderAutoExportStatus(ax) {
  if (!ui.workLoggerAutoExport) return;
  const el = ui.workLoggerAutoExport;
  if (!ax || !ax.enabled) {
    el.textContent = "Auto-export: off.";
    el.className = "worklog-autoexport muted";
    return;
  }
  if (ui.worklogAutoExportSkip) ui.worklogAutoExportSkip.checked = Boolean(ax.skippedToday);
  if (ax.skippedToday) {
    el.textContent = "Auto-export is OFF for tonight (skipped). It re-enables automatically tomorrow.";
    el.className = "worklog-autoexport warn";
    return;
  }
  const nextStr = ax.nextRunAt ? new Date(ax.nextRunAt).toLocaleString() : (ax.startLabel || "23:50");
  let head;
  let cls = "worklog-autoexport";
  if (!ax.lastAttemptAt) {
    head = `Auto-export armed for ${ax.startLabel || "23:50"} nightly (retries every min to ${ax.endLabel || "23:58"}). Not run yet.`;
    cls += " pending";
  } else {
    const when = new Date(ax.lastAttemptAt).toLocaleString();
    if (ax.lastOutcome === "success") {
      head = `Auto-export OK ✓ ${when} — ${ax.projectCount || 0} log(s), ${ax.hours || 0} h.`;
      cls += " ok";
    } else if (ax.lastOutcome === "nothing") {
      head = `Auto-export — nothing to export on ${ax.lastDate || when}.`;
      cls += " pending";
    } else if (ax.lastOutcome === "retrying") {
      head = `Auto-export retrying… last error: ${ax.error || "failed"}.`;
      cls += " warn";
    } else if (ax.lastOutcome === "skipped") {
      head = `Auto-export was skipped on ${ax.lastDate || when}.`;
      cls += " pending";
    } else {
      head = `Auto-export FAILED ✗ ${when} — ${ax.error || "unknown error"}.`;
      cls += " warn";
    }
  }
  el.textContent = `${head} Next run: ${nextStr}.`;
  el.className = cls;
}

// Enable/disable the "Export last day" button based on whether a recoverable
// reset backup exists, and cache it for the dialog.
async function refreshLastDayAvailability() {
  if (!ui.exportLastDayWorkLoggerBtn || typeof api.getLastWorklogBackup !== "function") return;
  try {
    const backup = await api.getLastWorklogBackup();
    const available = Boolean(backup?.ok && backup.available && (backup.projects || []).length);
    workLoggerState.lastDayBackup = available ? backup : null;
    ui.exportLastDayWorkLoggerBtn.disabled = !available;
    ui.exportLastDayWorkLoggerBtn.title = available
      ? `Recover and export ${backup.count} project(s) from ${backup.activeDate || "the last reset"}${backup.reason ? ` (${backup.reason})` : ""}`
      : "No reset day is available to recover yet";
  } catch {
    ui.exportLastDayWorkLoggerBtn.disabled = true;
  }
}

async function refreshWorkLoggerList() {
  if (!ui.workLoggerList || typeof api.listWorklogs !== "function") return;
  try {
    const result = await api.listWorklogs();
    if (!result?.ok) return;
    renderWorkLogger(result.projects || [], result);
    refreshLastDayAvailability().catch(() => {});
  } catch (error) {
    if (ui.workLoggerState) ui.workLoggerState.textContent = `Work Logger failed: ${error.message}`;
  }
}

function docSearchStatusText(result) {
  const idx = result?.index || {};
  const scan = idx.scan || {};
  const bits = [];
  if (result?.mode === "latest") bits.push("Newest indexed files.");
  else if (result?.mode === "active-part") bits.push(`Similar files for ${basenameOf(result.seedPath)}.`);
  else if (result?.mode === "type-recent") bits.push(`Newest ${result.fileTypeLabel || "matching"} files.`);
  else if (result?.query) bits.push(result?.matchSource === "path"
    ? `Path search: ${result.query}`
    : `Search: ${result.query}`);
  if (result?.fileTypeLabel && result?.mode !== "type-recent") bits.push(`Type filter: ${result.fileTypeLabel}`);
  if (idx.targetScan?.roots?.length) {
    const limitText = idx.targetScan.limited ? " (limited)" : "";
    const runningText = idx.targetScan.scanning ? " running" : "";
    bits.push(`Target scan${runningText}: ${idx.targetScan.entries?.length || 0} files matched from ${idx.targetScan.dirs || 0} nearby folders${limitText}.`);
  } else if (idx.targetScan?.scanning) {
    bits.push("Target scan running near the active SOLIDWORKS document.");
  }
  if (idx.scanning) bits.push(`Indexing ${scan.mode || ""}: ${scan.entries || 0} files, ${scan.directoriesScanned || 0} folders scanned.`);
  else if (idx.count != null) bits.push(`Indexed ${idx.count} files.`);
  if (result?.pageSize) bits.push(`Showing page ${(result.page || 0) + 1}; ${result.entries?.length || 0}/${result.pageSize} loaded${result.hasMore ? ", more available" : ""}.`);
  if (idx.cacheRoot) bits.push(`Cache: ${idx.cacheRoot}`);
  return bits.filter(Boolean).join("\n");
}

function setDocSearchPager(result, loading = false) {
  if (!ui.docSearchPager || !ui.docSearchPrevPageBtn || !ui.docSearchNextPageBtn) return;
  const page = Math.max(0, Number(result?.page || 0) || 0);
  const hasPrevious = page > 0;
  const hasMore = !!result?.hasMore;
  ui.docSearchPager.classList.toggle("hidden", !hasPrevious && !hasMore);
  ui.docSearchPrevPageBtn.disabled = loading || !hasPrevious;
  ui.docSearchNextPageBtn.disabled = loading || !hasMore;
  ui.docSearchPrevPageBtn.textContent = loading ? "Loading..." : "Previous page";
  ui.docSearchNextPageBtn.textContent = loading ? "Loading..." : "Next page";
}

function clearDocSearchTiles(message = "Loading...") {
  state.docSearchLastSignature = "";
  state.docSearchPage = 0;
  state.docSearchHasMore = false;
  if (ui.docSearchList) ui.docSearchList.replaceChildren();
  if (ui.docSearchState) ui.docSearchState.textContent = message;
  setDocSearchPager(null);
}

function renderDocSearchResults(result) {
  if (!ui.docSearchList) return;
  const entries = result?.entries || [];
  const signature = `${result?.page || 0}|${result?.query || ""}|${result?.seedPath || ""}|${result?.fileType || ""}|${result?.mode || ""}|${result?.index?.count || 0}|${result?.index?.scanning ? 1 : 0}|` + entries.map((entry) =>
    `${entry.path}|${entry.thumbnail || ""}|${entry.score || ""}`
  ).join(";");
  if (signature === state.docSearchLastSignature) {
    if (ui.docSearchState) ui.docSearchState.textContent = docSearchStatusText(result);
    setDocSearchPager(result);
    return;
  }
  state.docSearchLastSignature = signature;
  if (ui.docSearchState) ui.docSearchState.textContent = docSearchStatusText(result);

  const fragment = document.createDocumentFragment();
  for (const entry of entries) {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "recent-docs-tile";
    tile.dataset.path = entry.path;
    const fileType = fileTypeForPath(entry.path);
    const filename = entry.name || basenameOf(entry.path);
    const fullPath = entry.displayPath || displayPathOf(entry.path);
    const thumbHtml = entry.thumbnail
      ? `<img class="recent-docs-tile-image" src="${escapeAttr(entry.thumbnail)}" alt="" loading="lazy">`
      : `<div class="recent-docs-tile-thumb type-${fileType.key}">${escapeHtml(fileType.label)}</div>`;
    tile.title = fullPath;
    tile.innerHTML = `
      <div class="doc-search-thumb-wrap">
        ${thumbHtml}
        <span class="doc-search-type-badge type-${escapeAttr(fileType.key)}">${escapeHtml(fileType.label)}</span>
      </div>
      <div class="recent-docs-tile-name">${escapeHtml(filename)}</div>
      <div class="recent-docs-tile-path" title="${escapeAttr(fullPath)}">${escapeHtml(fullPath)}</div>
    `;
    tile.addEventListener("click", () => {
      api.openDocSearchResult(entry.path).then((r) => {
        if (!r?.ok) log("Failed to open document-search result.", r);
      }).catch((error) => log("Failed to open document-search result.", { error: error.message, path: entry.path }));
    });
    tile.addEventListener("contextmenu", (event) => showDocSearchContextMenu(event, entry));
    fragment.appendChild(tile);
  }
  ui.docSearchList.replaceChildren(fragment);
  state.docSearchPage = result?.page || 0;
  state.docSearchHasMore = !!result?.hasMore;
  setDocSearchPager(result);
}

function scheduleDocSearchRefresh(delay = 250, options = {}) {
  if (state.docSearchPollTimer) clearTimeout(state.docSearchPollTimer);
  state.docSearchPollTimer = setTimeout(() => {
    state.docSearchPollTimer = null;
    refreshDocSearch(options).catch(() => {});
  }, delay);
}

async function refreshDocSearch(options = {}) {
  if (!ui.docSearchList) return;
  const query = ui.docSearchInput?.value?.trim() || "";
  const fileType = ui.docSearchTypeFilter?.value || "all";
  const useActiveSeed = !query && fileType === "all";
  let seedPath = useActiveSeed ? activeSolidWorksSeedPath() : "";
  const page = Math.max(0, Number(options.page || 0) || 0);
  const requestKey = `${query}|${fileType}|${seedPath}|${page}`;
  const requestSeq = ++state.docSearchRequestSeq;
  state.docSearchInFlight = true;
  setDocSearchPager({ page, hasMore: state.docSearchHasMore }, true);
  try {
    if (useActiveSeed && !seedPath) {
      const status = await api.solidWorksStatus();
      if (requestSeq !== state.docSearchRequestSeq) return;
      setStatus(status);
      seedPath = activeSolidWorksSeedPath();
    }
    const result = await api.docSearch({
      query,
      seedPath,
      fileType,
      page,
      pageSize: 40,
    });
    if (requestSeq !== state.docSearchRequestSeq) return;
    if (!result?.ok) {
      if (ui.docSearchState) ui.docSearchState.textContent = result?.error || "Doc Search failed.";
      return;
    }
    state.docSearchLastKey = requestKey;
    renderDocSearchResults(result);
    if (result.index?.scanning || result.index?.targetScan?.scanning) scheduleDocSearchRefresh(2500, { page });
    else if ((result.entries || []).some((entry) => entry.thumbnailEligible && !entry.thumbnail)) scheduleDocSearchRefresh(3500, { page });
  } catch (error) {
    if (requestSeq === state.docSearchRequestSeq && ui.docSearchState) ui.docSearchState.textContent = `Doc Search failed: ${error.message}`;
  } finally {
    if (requestSeq === state.docSearchRequestSeq) {
      state.docSearchInFlight = false;
      setDocSearchPager({ page: state.docSearchPage, hasMore: state.docSearchHasMore }, false);
    }
  }
}

function escapeAttr(value) {
  return String(value).replace(/["&<>]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}

async function killSolidWorks() {
  if (!ui.killSolidWorksBtn) return;
  if (!state.lastSolidWorksHealth?.canKill) {
    log("Kill SW is disabled because SOLIDWORKS is not marked unhealthy.", state.lastSolidWorksHealth || {});
    refreshSolidWorksStatus().catch(() => {});
    return;
  }
  const confirmed = window.confirm("Kill all SLDWORKS.exe processes for the unhealthy session? Unsaved SOLIDWORKS work may be lost.");
  if (!confirmed) return;
  state.killSolidWorksInFlight = true;
  ui.killSolidWorksBtn.disabled = true;
  const originalLabel = ui.killSolidWorksBtn.textContent;
  ui.killSolidWorksBtn.textContent = "Killing...";
  try {
    const result = await api.killSolidWorks();
    if (result && result.ok) {
      const total = Number(result.totalInstances ?? result.orphansFound ?? 0) || 0;
      const killed = result.killed?.length || 0;
      if (total === 0) {
        log("No SLDWORKS.exe processes found to kill.", result);
      } else {
        log(`Killed ${killed}/${total} SLDWORKS.exe processes.`, result);
        for (const killedProcess of result.killed || []) {
          log(`  SLDWORKS PID ${killedProcess.id} killed`, {
            reason: killedProcess.reason,
            startTime: killedProcess.startTime,
            parentPid: killedProcess.parentProcessId,
            parentName: killedProcess.parentProcessName,
            parentPath: killedProcess.parentProcessPath,
            commandLine: killedProcess.commandLine,
            workingSetMb: killedProcess.workingSetMb,
          });
        }
        for (const failure of result.failed || []) {
          log(`  SLDWORKS PID ${failure.id} could NOT be killed: ${failure.error}`, failure.hint);
        }
      }
    } else {
      log("Kill SW failed.", result);
    }
  } catch (error) {
    log("Kill SW failed.", { error: error.message });
  } finally {
    state.killSolidWorksInFlight = false;
    ui.killSolidWorksBtn.textContent = originalLabel;
    await refreshSolidWorksStatus().catch(() => {});
    updateSolidWorksKillButton(state.lastSolidWorksHealth);
  }
}

async function createCamFolder() {
  ui.createCamFolderBtn.disabled = true;
  ui.createCamFolderBtn.textContent = "Creating...";
  try {
    const result = await api.createCamFolder();
    if (result.ok) {
      log(result.createdPartFolder ? "CAM folder created." : "CAM folder already exists.", {
        sourcePath: result.sourcePath,
        camPartFolder: result.camPartFolder,
        copiedToClipboard: result.copiedToClipboard,
        projectName: result.projectName,
        partFolderName: result.partFolderName,
      });
    } else {
      log("CAM folder creation failed.", result);
    }
    await refreshSolidWorksStatus();
  } catch (error) {
    log("CAM folder creation failed.", { error: error.message });
  } finally {
    ui.createCamFolderBtn.disabled = false;
    ui.createCamFolderBtn.textContent = "Create CAM Folder";
  }
}

// --- UI localization (en/hu) ------------------------------------------------
// Static-UI translation table keyed by the English text. applyUiLanguage swaps
// the text of leaf elements (and placeholders/titles) that have an entry, and
// can revert to English. Dynamic status text is localized separately.
const I18N_HU = {
  // Header + sidebar
  "SOLIDWORKS workflow helper": "SOLIDWORKS munkafolyamat-segéd",
  "Copy Doc Location": "Dok. hely másolása",
  "Kill SW": "SW leállítása",
  "Recent SW Docs": "Legutóbbi SW dok.",
  "Macro Runner": "Makró futtató",
  "Doc Search": "Dokumentumkeresés",
  "Work Logger": "Munkaidő-napló",
  // G-code checker
  "G-code Check": "G-kód ellenőrzés",
  "Open Checks Folder": "Ellenőrzések mappája",
  "Newest .MPF programs from the CNC drive.": "A legújabb .MPF programok a CNC meghajtóról.",
  "Analyze program": "Program elemzése",
  "Material": "Anyag",
  "Tool type": "Szerszámtípus",
  "Analyze + Create AI Prompt": "Elemzés + AI prompt készítése",
  "Select different MPF": "Másik MPF választása",
  "Recent checks": "Legutóbbi ellenőrzések",
  "Last 10 generated prompts - click one to open it": "Az utolsó 10 generált prompt - kattints rá a megnyitáshoz",
  "G-code Checker": "G-kód ellenőrző",
  "MPF search root": "MPF keresési gyökér",
  "Remembered materials (one per line)": "Megjegyzett anyagok (soronként egy)",
  "Remembered tool types (one per line)": "Megjegyzett szerszámtípusok (soronként egy)",
  "Recent .MPF scan root and the remembered analyze inputs": "MPF keresési hely és a megjegyzett elemzési adatok",
  // G-code checker dynamic statuses (used via t(), not the DOM sweep)
  "Scanning for recent .MPF programs...": "Friss .MPF programok keresése...",
  "Refreshing list...": "Lista frissítése...",
  "No .MPF files found yet. Check the search root in Settings.": "Még nincs .MPF fájl. Ellenőrizd a keresési gyökeret a Beállításokban.",
  "newest .MPF under": "legújabb .MPF itt:",
  "(scan budget hit - deep folders may be missing)": "(keresési korlát elérve - mély mappák hiányozhatnak)",
  "Scan failed:": "A keresés nem sikerült:",
  "Select a .MPF file from the list first.": "Először válassz egy .MPF fájlt a listából.",
  "Analyzing program...": "Program elemzése...",
  "Analyze failed:": "Az elemzés nem sikerült:",
  "tool(s) found.": "szerszám található a programban.",
  "Give the saved prompt file to an AI for recommendations.": "Add oda a mentett prompt fájlt egy AI-nak a javaslatokért.",
  "Prompt saved:": "Prompt mentve:",
  "No checks generated yet.": "Még nem készült ellenőrzés.",
  "Settings": "Beállítások",
  "Start CAM": "CAM indítása",
  "CAM Reload": "CAM újratöltés",
  "Stop CAM": "CAM leállítása",
  "Create CAM Folder": "CAM mappa létrehozása",
  // Common buttons
  "Refresh": "Frissítés",
  "Export": "Exportálás",
  "Cancel": "Mégse",
  "Close": "Bezárás",
  "Set": "Beállítás",
  "Reset": "Visszaállítás",
  "Clear": "Törlés",
  "All": "Mind",
  "Type:": "Típus:",
  "Filter:": "Szűrő:",
  // Macro view
  "Open Macro Folder": "Makró mappa megnyitása",
  "Convert SWB to SWP": "SWB átalakítása SWP-vé",
  "Open SOLIDWORKS first, then click Convert SWB to SWP. Excelsis drives the Edit Macro dialog for every .swb at once - SOLIDWORKS writes a fresh .swp alongside each .swb. The VBA editor stays open at the end with all converted macros loaded; close it manually when done.":
    "Először nyisd meg a SOLIDWORKS-öt, majd kattints az SWB átalakítása SWP-vé gombra. Az Excelsis egyszerre vezérli az összes .swb Makró szerkesztése ablakát - a SOLIDWORKS minden .swb mellé friss .swp-t ír. A végén a VBA szerkesztő nyitva marad az összes átalakított makróval; zárd be kézzel, ha végeztél.",
  // Doc Search
  "Parts": "Alkatrészek",
  "Assemblies": "Összeállítások",
  "Drawings": "Rajzok",
  "Open a SOLIDWORKS document or type a search.": "Nyiss meg egy SOLIDWORKS dokumentumot, vagy írj be keresést.",
  "Previous page": "Előző oldal",
  "Next page": "Következő oldal",
  // Work Logger
  "Export last day": "Előző nap exportálása",
  "Reset Today": "Mai nap nullázása",
  "Waiting for SOLIDWORKS activity status.": "Várakozás a SOLIDWORKS aktivitási állapotra.",
  "Project time is counted while SOLIDWORKS is active, using the Settings grace period.":
    "A projektidő számolása a SOLIDWORKS aktív állapotában történik, a Beállítások türelmi idejét használva.",
  "Tracking unsaved document": "Nem mentett dokumentum követése",
  "Unsaved document paused": "A nem mentett dokumentum követése szünetel",
  "Unsaved document waiting": "A nem mentett dokumentum várakozik",
  "Time is held provisionally and will be added after this document is saved.":
    "Az idő ideiglenesen gyűlik, és a dokumentum mentése után kerül hozzáadásra.",
  "Pending time is preserved, but activity is currently paused.":
    "A függő idő megmarad, de az aktivitás követése jelenleg szünetel.",
  "Waiting for a trusted SOLIDWORKS watcher sample before holding time.":
    "Várakozás megbízható SOLIDWORKS figyelőmintára az idő gyűjtése előtt.",
  "Pending": "Függő",
  "Save threshold": "Mentési küszöb",
  "Skip tonight": "Ma este kihagyása",
  // Export dialog
  "Export Work Logs": "Munkaidő-naplók exportálása",
  "Cutoff minutes": "Levágási percek",
  "Multiplier": "Szorzó",
  "Round to nearest": "Kerekítés a legközelebbire",
  "Half hour": "Fél óra",
  "Whole hour": "Egész óra",
  "Quarter hour": "Negyed óra",
  "10 minutes": "10 perc",
  "5 minutes": "5 perc",
  "Target hours mode": "Cél óra mód",
  "Target hours": "Cél órák",
  "Fills the target across projects in 0.5 h blocks; the cutoff still applies. Overrides multiplier and rounding.":
    "A cél órákat 0,5 órás blokkokban osztja szét a projektek között; a levágás továbbra is érvényes. Felülírja a szorzót és a kerekítést.",
  "Default worktype": "Alapértelmezett munkatípus",
  "Second worktype": "Második munkatípus",
  "Per project": "Projektenként",
  "Split into 2 work logs": "Felosztás 2 naplóra",
  // Recent docs
  "Recent SOLIDWORKS Documents": "Legutóbbi SOLIDWORKS dokumentumok",
  "Retry Missing Thumbnails": "Hiányzó bélyegképek újra",
  "Newest first. Documents opened in SOLIDWORKS while Excelsis is running.":
    "Legújabb elöl. A SOLIDWORKS-ben megnyitott dokumentumok, amíg az Excelsis fut.",
  // Settings
  "Import": "Importálás",
  "Reset Defaults": "Alapértékek visszaállítása",
  "Save Settings": "Beállítások mentése",
  "Language": "Nyelv",
  "Defaults: app and BOM Excel English": "Alapértékek: a felület és a BOM Excel angol",
  "UI language": "Felület nyelve",
  "BOM Excel language": "BOM Excel nyelve",
  "English": "Angol",
  "Hungarian": "Magyar",
  "Hotkeys": "Gyorsbillentyűk",
  "Active while Excelsis Helper is running": "Aktív, amíg az Excelsis Helper fut",
  "Enable helper hotkeys": "Segéd gyorsbillentyűk bekapcsolása",
  "Paste project/date text": "Projekt/dátum szöveg beillesztése",
  "Copy Explorer selection path": "Explorer kijelölés útvonalának másolása",
  "Pasted text template": "Beillesztett szöveg sablon",
  "SOLIDWORKS Activity": "SOLIDWORKS aktivitás",
  "Default pauses after 3 minutes away from SOLIDWORKS": "Alapból 3 perc SOLIDWORKS-távollét után szünetel",
  "Pause automatic SW/project counting after": "Automatikus SW/projekt számolás szüneteltetése ennyi után",
  "Recent SOLIDWORKS activity and project time are only refreshed while SOLIDWORKS is foreground, or during this short grace period after leaving it. If Windows input is idle past this value, counting pauses too.":
    "A legutóbbi SOLIDWORKS aktivitás és a projektidő csak akkor frissül, amíg a SOLIDWORKS előtérben van, vagy az utána következő rövid türelmi idő alatt. Ha a Windows bevitel ennél tovább tétlen, a számolás is szünetel.",
  "ERP Worklog Export": "ERP munkaidő-export",
  "Where Work Logger exports drop files and read work types (per shop / drive)":
    "Hova írja a Munkaidő-napló az exportot, és honnan olvassa a munkatípusokat (cégenként / meghajtónként)",
  "Worklog drop folder (inbox)": "Munkaidő-napló célmappa (bejövő)",
  "Work types file": "Munkatípusok fájl",
  "Min. minutes per doc to list in export": "Min. perc dokumentumonként az exportban",
  "Work Logger exports write JSON into the inbox folder for the ERP to import, and read the valid work types from the work types file. Both paths are required. A document only appears in an export line's description once it has been worked on for at least this many minutes (0 = list every document worked on).":
    "A Munkaidő-napló exportja JSON-t ír a bejövő mappába az ERP importjához, és a munkatípus-fájlból olvassa az érvényes munkatípusokat. Mindkét útvonal kötelező. Egy dokumentum csak akkor jelenik meg egy export sor leírásában, ha legalább ennyi percet dolgoztak rajta (0 = minden dokumentum listázása).",
  "CAM Folder": "CAM mappa",
  "Destination and source locations are configurable per shop": "A cél- és forráshelyek cégenként beállíthatók",
  "CAM destination root": "CAM célmappa gyökér",
  "Created folder structure": "Létrehozott mappaszerkezet",
  "Project folder + part folder": "Projekt mappa + alkatrész mappa",
  "Project folder + source subfolders + part folder": "Projekt mappa + forrás almappák + alkatrész mappa",
  "CAM source folders (Create CAM folder lookup)": "CAM forrásmappák (CAM mappa létrehozása kereséshez)",
  "Search locations": "Keresési helyek",
  "Which drives/folders the document search crawls, and what to skip":
    "Mely meghajtókat és mappákat járja be a dokumentumkeresés, és mit hagyjon ki",
  "Search locations (one drive or folder per line)": "Keresési helyek (soronként egy meghajtó vagy mappa)",
  "Excluded locations (one drive or folder per line)": "Kizárt helyek (soronként egy meghajtó vagy mappa)",
  "Project code prefixes (optional; e.g. PRJ, JOB)": "Projektkód-előtagok (opcionális; pl. PRJ, JOB)",
  "Macro defaults": "Makró alapértékek",
  "Values synchronized into the bundled CNCDXF and DXF macros": "A csomagolt CNCDXF és DXF makrókba szinkronizált értékek",
  "Drawing template path": "Rajzsablon útvonala",
  "DXF filename prefix": "DXF fájlnév előtag",
  "Default DXF material": "Alapértelmezett DXF anyag",
  "CNCDXF uses the CAM destination root and project-code prefixes configured above.":
    "A CNCDXF a fent beállított CAM célgyökeret és projektkód-előtagokat használja.",
  "Pick which SolidCAM build the sidebar Start/Stop CAM buttons toggle":
    "Válaszd ki, melyik SolidCAM build-et kapcsolják az oldalsáv Start/Stop CAM gombjai",
  "Search for SolidCAM Add-ins": "SolidCAM bővítmények keresése",
  "Searches HKLM/HKCU for SOLIDWORKS add-ins matching \"solidcam\".":
    "A HKLM/HKCU kulcsokban keres \"solidcam\" nevű SOLIDWORKS bővítményeket.",
  "No SolidCAM add-in selected.": "Nincs kiválasztott SolidCAM bővítmény.",
  "Doc Search Index": "Dokumentumkeresési index",
  "Cache lives beside the Automation app and can be rebuilt safely":
    "A gyorsítótár az alkalmazás mellett van, és biztonságosan újraépíthető",
  "Delete Index Cache": "Indexgyorsítótár törlése",
  "Deletes only Excelsis Helper's own document-search cache, never source files.":
    "Csak az Excelsis Helper saját dokumentumkeresési gyorsítótárát törli, a forrásfájlokat soha.",
  "Cache size not checked yet.": "A gyorsítótár mérete még nincs ellenőrizve.",
  "Settings not loaded yet.": "A beállítások még nincsenek betöltve.",
  "Log": "Napló",
};
const I18N_HU_ATTR = {
  "Search filename or path...": "Keresés fájlnév vagy útvonal szerint...",
  "Search filename snippets...": "Keresés fájlnévrészletek szerint...",
  "e.g. 1.2312 steel / AlMgSi1": "pl. 1.2312 acél / AlMgSi1",
  "e.g. carbide endmill": "pl. keményfém szármaró",
  "Leave blank to use the SOLIDWORKS default": "Hagyd üresen a SOLIDWORKS alapértékéhez",
  "Open the folder holding the generated AI prompt files": "A generált AI prompt fájlok mappájának megnyitása",
};

function normalizeI18nText(value) {
  return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
}

// Reverse maps (hu -> en) for stateless reverting.
const I18N_EN = Object.fromEntries(Object.entries(I18N_HU).map(([en, hu]) => [hu, en]));
const I18N_EN_ATTR = Object.fromEntries(Object.entries(I18N_HU_ATTR).map(([en, hu]) => [hu, en]));

let currentUiLanguage = "en";

// Translate a DYNAMIC string (one assigned from JS at runtime, which the
// static applyUiLanguage() DOM sweep can never see). Same en-keyed table as
// the static UI; falls back to the English text when no entry exists. Use for
// status lines etc.: ui.x.textContent = t("Scanning...").
function t(text) {
  if (currentUiLanguage !== "hu") return text;
  return I18N_HU[normalizeI18nText(text)] || text;
}

// Stateless: translate by matching the CURRENT text against the en->hu map (when
// going to Hungarian) or the hu->en map (when reverting). Elements whose text was
// replaced dynamically by JS (not in either map) are left untouched, so toggling
// language can never clobber live status text.
function applyUiLanguage(lang) {
  currentUiLanguage = lang === "hu" ? "hu" : "en";
  const hu = currentUiLanguage === "hu";
  document.documentElement.lang = hu ? "hu" : "en";
  document.querySelectorAll("button, h1, h2, h3, h4, span, small, option, a, legend, p, div, label").forEach((el) => {
    if (el.children.length > 0) return; // leaf text only
    const cur = normalizeI18nText(el.textContent);
    if (!cur) return;
    const next = hu ? I18N_HU[cur] : I18N_EN[cur];
    if (next && next !== el.textContent) el.textContent = next;
  });
  document.querySelectorAll("[placeholder], [title]").forEach((el) => {
    for (const attr of ["placeholder", "title"]) {
      if (!el.hasAttribute(attr)) continue;
      const cur = normalizeI18nText(el.getAttribute(attr));
      if (!cur) continue;
      const next = hu ? I18N_HU_ATTR[cur] : I18N_EN_ATTR[cur];
      if (next) el.setAttribute(attr, next);
    }
  });
}

// --- G-code (MPF) checker view -------------------------------------------

function formatGcodeWhen(mtimeMs) {
  const when = new Date(Number(mtimeMs || 0));
  if (Number.isNaN(when.getTime()) || !mtimeMs) return "";
  return when.toLocaleString(undefined, {
    month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  });
}

function fillGcodeDatalists(gcode) {
  const fill = (listEl, values) => {
    if (!listEl) return;
    listEl.innerHTML = "";
    for (const value of Array.isArray(values) ? values : []) {
      const option = document.createElement("option");
      option.value = value;
      listEl.appendChild(option);
    }
  };
  fill(ui.gcodeMaterialOptions, gcode?.materials);
  fill(ui.gcodeToolTypeOptions, gcode?.toolTypes);
}

function renderGcodeFileList() {
  if (!ui.gcodeFileList) return;
  ui.gcodeFileList.innerHTML = "";
  if (!state.gcodeFiles.length) {
    const empty = document.createElement("div");
    empty.className = "response-preview muted";
    empty.textContent = t("No .MPF files found yet. Check the search root in Settings.");
    ui.gcodeFileList.appendChild(empty);
    return;
  }
  for (const file of state.gcodeFiles) {
    const row = document.createElement("div");
    row.className = "gcode-file";
    row.tabIndex = 0;
    row.role = "listitem";
    row.classList.toggle("selected", file.path === state.gcodeSelectedPath);
    row.innerHTML = `
      <div class="gcode-file-name">${escapeHtml(file.name)}</div>
      <div class="gcode-file-meta">
        <span class="gcode-file-when">${escapeHtml(formatGcodeWhen(file.mtimeMs))}</span>
        <span class="gcode-file-folder" title="${escapeHtml(file.folder)}">${escapeHtml(file.folder)}</span>
      </div>`;
    const select = () => selectGcodeFile(file);
    row.addEventListener("click", select);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(); }
    });
    ui.gcodeFileList.appendChild(row);
  }
}

// Collapse/expand the file list around the analyze form. Collapsed = list and
// scan-state line hidden, "Select different MPF" button shown in the panel.
function applyGcodeListVisibility() {
  const collapsed = state.gcodeListCollapsed && !!state.gcodeSelectedPath;
  if (ui.gcodeFileList) ui.gcodeFileList.classList.toggle("hidden", collapsed);
  if (ui.gcodeState) ui.gcodeState.classList.toggle("hidden", collapsed);
  if (ui.gcodeChangeFileBtn) ui.gcodeChangeFileBtn.classList.toggle("hidden", !collapsed);
}

function selectGcodeFile(file) {
  state.gcodeSelectedPath = file.path;
  state.gcodeListCollapsed = true;
  if (ui.gcodeAnalyzePanel) ui.gcodeAnalyzePanel.classList.remove("hidden");
  if (ui.gcodeSelectedFile) {
    ui.gcodeSelectedFile.textContent = file.name;
    ui.gcodeSelectedFile.title = file.path;
  }
  if (ui.gcodeAnalyzeState) ui.gcodeAnalyzeState.textContent = "";
  if (ui.gcodeResults) ui.gcodeResults.innerHTML = "";
  renderGcodeFileList();
  applyGcodeListVisibility();
}

function renderGcodeResults(analysis, promptPath) {
  if (!ui.gcodeResults) return;
  ui.gcodeResults.innerHTML = "";
  const fmt = (v, unit = "") => (v === null || v === undefined ? "-" : `${v}${unit}`);
  for (const tool of analysis?.tools || []) {
    const feeds = (tool.feeds || []).map((f) => f.feed).join(", ") || "-";
    const plunge = (tool.plungeFeeds || []).map((f) => f.feed).join(", ") || "-";
    const entries = Object.entries(tool.entries || {}).filter(([, n]) => n > 0)
      .map(([kind, n]) => `${kind}:${n}`).join(" ") || "-";
    const card = document.createElement("div");
    card.className = "gcode-tool-card";
    card.innerHTML = `
      <div class="gcode-tool-title">${escapeHtml(tool.label)}${tool.diameterMm ? ` <span class="muted">~D${escapeHtml(String(tool.diameterMm))}</span>` : ""}</div>
      <div class="gcode-tool-grid">
        <span>RPM</span><b>${escapeHtml((tool.rpms || []).join(", ") || "-")}</b>
        <span>Feed</span><b>${escapeHtml(feeds)}</b>
        <span>Plunge F</span><b>${escapeHtml(plunge)}</b>
        <span>DOC</span><b>${escapeHtml(fmt(tool.stepDownTypical, " mm"))}</b>
        <span>Stepover</span><b>${escapeHtml(fmt(tool.stepoverEstimate, " mm"))}</b>
        <span>Min Z</span><b>${escapeHtml(fmt(tool.minZ, " mm"))}</b>
        <span>Lead-in</span><b>${escapeHtml(entries)}</b>
        <span>Cycles</span><b>${escapeHtml((tool.cycles || []).join(", ") || "-")}</b>
      </div>`;
    ui.gcodeResults.appendChild(card);
  }
  if (promptPath) {
    const note = document.createElement("div");
    note.className = "response-preview muted";
    note.textContent = `${t("Prompt saved:")} ${promptPath}`;
    ui.gcodeResults.appendChild(note);
  }
}

async function refreshGcodeHistory() {
  if (!ui.gcodeHistory) return;
  const result = await api.gcodeListChecks().catch(() => null);
  ui.gcodeHistory.innerHTML = "";
  const files = result?.files || [];
  if (!files.length) {
    const empty = document.createElement("div");
    empty.className = "response-preview muted";
    empty.textContent = t("No checks generated yet.");
    ui.gcodeHistory.appendChild(empty);
    return;
  }
  for (const file of files) {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "gcode-history-item";
    row.title = file.path;
    row.textContent = `${formatGcodeWhen(file.mtimeMs)}  ${file.name}`;
    row.addEventListener("click", async () => {
      const opened = await api.gcodeOpenCheck(file.path).catch(() => null);
      if (!opened?.ok) log(`Could not open check: ${opened?.error || "unknown error"}`);
    });
    ui.gcodeHistory.appendChild(row);
  }
}

async function refreshGcodeView() {
  fillGcodeDatalists(state.settings?.gcode);
  refreshGcodeHistory().catch(() => {});
  applyGcodeListVisibility();
  if (state.gcodeListInFlight) return;
  state.gcodeListInFlight = true;
  // Paint the previous scan's list immediately so switching to the view is
  // instant; the fresh scan replaces it when it lands (bounded ~4s worst case).
  renderGcodeFileList();
  if (ui.gcodeState) {
    ui.gcodeState.textContent = state.gcodeFiles.length
      ? t("Refreshing list...")
      : t("Scanning for recent .MPF programs...");
  }
  try {
    const result = await api.gcodeListRecent();
    if (result?.ok) {
      state.gcodeFiles = result.files || [];
      const truncatedNote = result.truncated ? ` ${t("(scan budget hit - deep folders may be missing)")}` : "";
      if (ui.gcodeState) {
        ui.gcodeState.textContent = `${state.gcodeFiles.length} ${t("newest .MPF under")} ${result.root}${truncatedNote}`;
      }
    } else if (ui.gcodeState) {
      state.gcodeFiles = result?.files || [];
      ui.gcodeState.textContent = `${t("Scan failed:")} ${result?.error || "unknown error"}`;
    }
    renderGcodeFileList();
  } finally {
    state.gcodeListInFlight = false;
  }
}

async function runGcodeAnalyze() {
  if (state.gcodeAnalyzeInFlight) return;
  if (!state.gcodeSelectedPath) {
    if (ui.gcodeAnalyzeState) ui.gcodeAnalyzeState.textContent = t("Select a .MPF file from the list first.");
    return;
  }
  state.gcodeAnalyzeInFlight = true;
  if (ui.gcodeAnalyzeBtn) ui.gcodeAnalyzeBtn.disabled = true;
  if (ui.gcodeAnalyzeState) ui.gcodeAnalyzeState.textContent = t("Analyzing program...");
  try {
    const result = await api.gcodeAnalyze({
      mpfPath: state.gcodeSelectedPath,
      material: ui.gcodeMaterialInput?.value || "",
      toolType: ui.gcodeToolTypeInput?.value || "",
    });
    if (!result?.ok) {
      if (ui.gcodeAnalyzeState) ui.gcodeAnalyzeState.textContent = `${t("Analyze failed:")} ${result?.error || "unknown error"}`;
      return;
    }
    const toolCount = result.analysis?.tools?.length || 0;
    if (ui.gcodeAnalyzeState) {
      ui.gcodeAnalyzeState.textContent = `${toolCount} ${t("tool(s) found.")} ${t("Give the saved prompt file to an AI for recommendations.")}`;
    }
    renderGcodeResults(result.analysis, result.promptPath);
    // Backend remembered the material/tooltype - refresh dropdowns + settings.
    if (result.gcode) {
      if (state.settings) state.settings.gcode = result.gcode;
      fillGcodeDatalists(result.gcode);
      if (ui.settingsGcodeMaterials) ui.settingsGcodeMaterials.value = (result.gcode.materials || []).join("\n");
      if (ui.settingsGcodeToolTypes) ui.settingsGcodeToolTypes.value = (result.gcode.toolTypes || []).join("\n");
    }
    refreshGcodeHistory().catch(() => {});
    log(`G-code check saved: ${result.promptPath}`);
  } finally {
    state.gcodeAnalyzeInFlight = false;
    if (ui.gcodeAnalyzeBtn) ui.gcodeAnalyzeBtn.disabled = false;
  }
}

function renderSettings(settings) {
  if (!settings) return;
  ui.settingsUiLanguage.value = settings.uiLanguage || "en";
  ui.settingsBomLanguage.value = settings.bomExportLanguage || "en";
  if (ui.settingsHotkeysEnabled) ui.settingsHotkeysEnabled.checked = settings.hotkeys?.enabled !== false;
  if (ui.settingsPasteProjectDateHotkey) {
    ui.settingsPasteProjectDateHotkey.value = settings.hotkeys?.pasteProjectDate || "Ctrl+Space";
  }
  if (ui.settingsCopyPathHotkey) ui.settingsCopyPathHotkey.value = settings.hotkeys?.copyExplorerPath || "F7,F7";
  if (ui.settingsProjectDateTemplate) {
    ui.settingsProjectDateTemplate.value = settings.hotkeys?.projectDateTemplate || "PRJ-[currentdate]";
  }
  applyUiLanguage(settings.uiLanguage || "en");
  if (ui.settingsSolidWorksIdlePauseMinutes) {
    ui.settingsSolidWorksIdlePauseMinutes.value = settings.activity?.solidWorksIdlePauseMinutes || 3;
  }
  if (ui.settingsErpWorklogInbox) ui.settingsErpWorklogInbox.value = settings.erp?.worklogInbox || "";
  if (ui.settingsErpWorklogWorktypes) ui.settingsErpWorklogWorktypes.value = settings.erp?.worklogWorktypes || "";
  if (ui.settingsErpWorklogDocMinMinutes) ui.settingsErpWorklogDocMinMinutes.value = settings.erp?.worklogDocMinMinutes ?? 5;
  ui.settingsCamOutputRoot.value = settings.cam?.outputRoot || "C:\\CAM";
  ui.settingsCamFolderMode.value = settings.cam?.folderMode || "project-part";
  ui.settingsCamSearchRoots.value = (settings.cam?.searchRoots || []).join("\n");
  if (ui.settingsLocationsProjectRoots) ui.settingsLocationsProjectRoots.value = (settings.locations?.projectRootNames || []).join("\n");
  if (ui.settingsLocationsProjectPrefixes) ui.settingsLocationsProjectPrefixes.value = (settings.locations?.projectCodePrefixes || []).join("\n");
  if (ui.settingsLocationsSearchRoots) ui.settingsLocationsSearchRoots.value = (settings.locations?.searchRoots || []).join("\n");
  if (ui.settingsLocationsExclusions) ui.settingsLocationsExclusions.value = (settings.locations?.exclusions || []).join("\n");
  if (ui.settingsMacroDrawingTemplate) ui.settingsMacroDrawingTemplate.value = settings.macros?.drawingTemplate || "";
  if (ui.settingsMacroDxfOutputPrefix) ui.settingsMacroDxfOutputPrefix.value = settings.macros?.dxfOutputPrefix ?? "PLATE";
  if (ui.settingsMacroDefaultMaterial) ui.settingsMacroDefaultMaterial.value = settings.macros?.defaultMaterial || "MATERIAL";
  if (ui.settingsGcodeSearchRoot) ui.settingsGcodeSearchRoot.value = settings.gcode?.searchRoot || "C:\\CAM";
  if (ui.settingsGcodeMaterials) ui.settingsGcodeMaterials.value = (settings.gcode?.materials || []).join("\n");
  if (ui.settingsGcodeToolTypes) ui.settingsGcodeToolTypes.value = (settings.gcode?.toolTypes || []).join("\n");
  fillGcodeDatalists(settings.gcode);
  state.solidCamSettings = settings.solidCam || { selectedDllPath: "", selectedTitle: "", selectedClsid: "" };
  renderCamSelectionState();
  renderCamAddinsList(state.solidCamAddins || []);
}

function readSettingsForm() {
  return {
    uiLanguage: ui.settingsUiLanguage.value,
    bomExportLanguage: ui.settingsBomLanguage.value,
    hotkeys: {
      enabled: ui.settingsHotkeysEnabled?.checked !== false,
      pasteProjectDate: (ui.settingsPasteProjectDateHotkey?.value || "Ctrl+Space").trim(),
      copyExplorerPath: (ui.settingsCopyPathHotkey?.value || "F7,F7").trim(),
      projectPrefix: state.settings?.hotkeys?.projectPrefix || "PRJ-",
      projectDateTemplate: (ui.settingsProjectDateTemplate?.value || "PRJ-[currentdate]").trim(),
      projectDateFormat: state.settings?.hotkeys?.projectDateFormat || "yyyy.MM.dd",
    },
    erp: {
      worklogInbox: (ui.settingsErpWorklogInbox?.value || "").trim(),
      worklogWorktypes: (ui.settingsErpWorklogWorktypes?.value || "").trim(),
      worklogDocMinMinutes: Number(ui.settingsErpWorklogDocMinMinutes?.value ?? 5),
    },
    activity: {
      solidWorksIdlePauseMinutes: Number(ui.settingsSolidWorksIdlePauseMinutes?.value) || 3,
    },
    cam: {
      outputRoot: ui.settingsCamOutputRoot.value,
      folderMode: ui.settingsCamFolderMode.value,
      searchRoots: ui.settingsCamSearchRoots.value
        .split(/\r?\n|;/)
        .map((item) => item.trim())
        .filter(Boolean),
    },
    macros: {
      drawingTemplate: (ui.settingsMacroDrawingTemplate?.value || "").trim(),
      dxfOutputPrefix: (ui.settingsMacroDxfOutputPrefix?.value || "").trim(),
      defaultMaterial: (ui.settingsMacroDefaultMaterial?.value || "MATERIAL").trim(),
    },
    solidCam: state.solidCamSettings || { selectedDllPath: "", selectedTitle: "", selectedClsid: "" },
    locations: {
      projectRootNames: (ui.settingsLocationsProjectRoots?.value || "")
        .split(/\r?\n|;/).map((item) => item.trim()).filter(Boolean),
      projectCodePrefixes: (ui.settingsLocationsProjectPrefixes?.value || "")
        .split(/[\s,;]+/).map((item) => item.trim()).filter(Boolean),
      searchRoots: (ui.settingsLocationsSearchRoots?.value || "")
        .split(/\r?\n|;/).map((item) => item.trim()).filter(Boolean),
      exclusions: (ui.settingsLocationsExclusions?.value || "")
        .split(/\r?\n|;/).map((item) => item.trim()).filter(Boolean),
    },
    gcode: {
      searchRoot: (ui.settingsGcodeSearchRoot?.value || "C:\\CAM").trim(),
      materials: (ui.settingsGcodeMaterials?.value || "")
        .split(/\r?\n|;/).map((item) => item.trim()).filter(Boolean),
      toolTypes: (ui.settingsGcodeToolTypes?.value || "")
        .split(/\r?\n|;/).map((item) => item.trim()).filter(Boolean),
    },
  };
}

function validateRequiredSettingsPaths(settings) {
  const missing = [];
  if (!settings.erp?.worklogInbox) missing.push("ERP worklog inbox");
  if (!settings.erp?.worklogWorktypes) missing.push("ERP work types file");
  if (!settings.cam?.outputRoot) missing.push("CAM destination root");
  if (!settings.cam?.searchRoots?.length) missing.push("CAM source folders");
  if (!settings.locations?.searchRoots?.length) missing.push("document search locations");
  if (!settings.gcode?.searchRoot) missing.push("MPF search root");
  if (missing.length) throw new Error(`Required path setting(s): ${missing.join(", ")}.`);
  const isAbsolutePath = (value) => /^(?:[A-Za-z]:[\\/]|\\\\)/.test(String(value || "").trim());
  const paths = [
    ["ERP worklog inbox", settings.erp.worklogInbox],
    ["ERP work types file", settings.erp.worklogWorktypes],
    ["CAM destination root", settings.cam.outputRoot],
    ["MPF search root", settings.gcode.searchRoot],
    ...settings.cam.searchRoots.map((value) => ["CAM source folder", value]),
    ...settings.locations.searchRoots.map((value) => ["Document search location", value]),
    ...settings.locations.exclusions.map((value) => ["Document-search exclusion", value]),
  ];
  if (settings.macros?.drawingTemplate) paths.push(["Drawing template", settings.macros.drawingTemplate]);
  for (const [label, value] of paths) {
    if (!isAbsolutePath(value)) throw new Error(`${label} must be an absolute path.`);
  }
  return settings;
}

function applySettingsGroupDefaults(group) {
  const defaults = state.defaults || {};
  switch (group) {
    case "language":
      if (ui.settingsUiLanguage) ui.settingsUiLanguage.value = defaults.uiLanguage || "en";
      if (ui.settingsBomLanguage) ui.settingsBomLanguage.value = defaults.bomExportLanguage || "en";
      applyUiLanguage(ui.settingsUiLanguage?.value || "en");
      return true;
    case "hotkeys": {
      const hotkeys = defaults.hotkeys || {};
      if (ui.settingsHotkeysEnabled) ui.settingsHotkeysEnabled.checked = hotkeys.enabled !== false;
      if (ui.settingsPasteProjectDateHotkey) {
        ui.settingsPasteProjectDateHotkey.value = hotkeys.pasteProjectDate || "Ctrl+Space";
      }
      if (ui.settingsCopyPathHotkey) ui.settingsCopyPathHotkey.value = hotkeys.copyExplorerPath || "F7,F7";
      if (ui.settingsProjectDateTemplate) {
        ui.settingsProjectDateTemplate.value = hotkeys.projectDateTemplate || "PRJ-[currentdate]";
      }
      return true;
    }
    case "activity":
      if (ui.settingsSolidWorksIdlePauseMinutes) {
        ui.settingsSolidWorksIdlePauseMinutes.value = defaults.activity?.solidWorksIdlePauseMinutes || 3;
      }
      return true;
    case "erp":
      if (ui.settingsErpWorklogInbox) ui.settingsErpWorklogInbox.value = defaults.erp?.worklogInbox || "";
      if (ui.settingsErpWorklogWorktypes) ui.settingsErpWorklogWorktypes.value = defaults.erp?.worklogWorktypes || "";
      if (ui.settingsErpWorklogDocMinMinutes) ui.settingsErpWorklogDocMinMinutes.value = defaults.erp?.worklogDocMinMinutes ?? 5;
      return true;
    case "cam":
      if (ui.settingsCamOutputRoot) ui.settingsCamOutputRoot.value = defaults.cam?.outputRoot || "C:\\CAM";
      if (ui.settingsCamFolderMode) ui.settingsCamFolderMode.value = defaults.cam?.folderMode || "project-part";
      if (ui.settingsCamSearchRoots) ui.settingsCamSearchRoots.value = (defaults.cam?.searchRoots || []).join("\n");
      return true;
    case "search-locations":
      if (ui.settingsLocationsSearchRoots) ui.settingsLocationsSearchRoots.value = (defaults.locations?.searchRoots || []).join("\n");
      if (ui.settingsLocationsExclusions) ui.settingsLocationsExclusions.value = (defaults.locations?.exclusions || []).join("\n");
      return true;
    case "project-locations":
      if (ui.settingsLocationsProjectRoots) ui.settingsLocationsProjectRoots.value = (defaults.locations?.projectRootNames || []).join("\n");
      if (ui.settingsLocationsProjectPrefixes) ui.settingsLocationsProjectPrefixes.value = (defaults.locations?.projectCodePrefixes || []).join("\n");
      return true;
    case "macros":
      if (ui.settingsMacroDrawingTemplate) ui.settingsMacroDrawingTemplate.value = defaults.macros?.drawingTemplate || "";
      if (ui.settingsMacroDxfOutputPrefix) ui.settingsMacroDxfOutputPrefix.value = defaults.macros?.dxfOutputPrefix ?? "PLATE";
      if (ui.settingsMacroDefaultMaterial) ui.settingsMacroDefaultMaterial.value = defaults.macros?.defaultMaterial || "MATERIAL";
      return true;
    case "solidcam":
      state.solidCamSettings = defaults.solidCam || { selectedDllPath: "", selectedTitle: "", selectedClsid: "" };
      renderCamSelectionState();
      renderCamAddinsList(state.solidCamAddins || []);
      return true;
    case "gcode":
      if (ui.settingsGcodeSearchRoot) ui.settingsGcodeSearchRoot.value = defaults.gcode?.searchRoot || "C:\\CAM";
      if (ui.settingsGcodeMaterials) ui.settingsGcodeMaterials.value = (defaults.gcode?.materials || []).join("\n");
      if (ui.settingsGcodeToolTypes) ui.settingsGcodeToolTypes.value = (defaults.gcode?.toolTypes || []).join("\n");
      return true;
    default:
      return false;
  }
}

function renderCamSelectionState() {
  if (!ui.camSelectionState) return;
  const cam = state.solidCamSettings || {};
  if (cam.selectedDllPath) {
    ui.camSelectionState.textContent = `Selected: ${cam.selectedTitle || "(no title)"} → ${cam.selectedDllPath}`;
    ui.camSelectionState.classList.remove("muted");
  } else {
    ui.camSelectionState.textContent = "No SolidCAM add-in selected.";
    ui.camSelectionState.classList.add("muted");
  }
}

function setSolidCamLoadStatus(text, statusClass = "unknown", title = "") {
  if (!ui.solidCamLoadStatus) return;
  ui.solidCamLoadStatus.classList.remove("loaded", "not-loaded", "loading", "stuck", "crashed", "unknown");
  ui.solidCamLoadStatus.classList.add(statusClass);
  ui.solidCamLoadStatus.textContent = text;
  ui.solidCamLoadStatus.title = title || text;
  state.solidCamLoaded = statusClass === "loaded" ? true : (statusClass === "not-loaded" ? false : null);
  if (ui.startCamBtn) ui.startCamBtn.classList.toggle("cam-glow-running", state.solidCamLoaded === true);
  if (ui.stopCamBtn) ui.stopCamBtn.classList.toggle("cam-glow-stopped", state.solidCamLoaded === false);
}

function renderSolidCamHealth(result) {
  const health = result?.solidCamHealth || null;
  state.lastSolidCamHealth = health;
  if (!health) return false;
  const stateKey = ["loaded", "not-loaded", "loading", "stuck", "crashed", "not-running"].includes(health.state)
    ? health.state
    : "unknown";
  const statusClass = stateKey === "not-running" ? "unknown" : stateKey;
  const reasons = Array.isArray(health.reasons) ? health.reasons.filter(Boolean) : [];
  setSolidCamLoadStatus(
    health.label || "SolidCAM: checking",
    statusClass,
    [health.message || "", ...reasons].filter(Boolean).join("\n"),
  );
  return true;
}

async function refreshSolidCamLoadStatus({ force = false } = {}) {
  if (!ui.solidCamLoadStatus) return;
  if (state.solidCamStatusInFlight && !force) return;
  const cam = state.solidCamSettings || {};
  if (!cam.selectedDllPath && !cam.selectedClsid) {
    setSolidCamLoadStatus("SolidCAM: not selected", "unknown");
    return;
  }
  state.solidCamStatusInFlight = true;
  try {
    const result = await api.camAddinStatus();
    if (renderSolidCamHealth(result)) {
      return;
    }
    if (!result?.configured) {
      setSolidCamLoadStatus("SolidCAM: not selected", "unknown");
    } else if (!result?.ok) {
      setSolidCamLoadStatus("SolidCAM: status error", "unknown");
    } else if (result.loaded === true) {
      setSolidCamLoadStatus("SolidCAM: loaded", "loaded");
    } else if (result.loaded === false) {
      setSolidCamLoadStatus("SolidCAM: not loaded", "not-loaded");
    } else if (result.connected === false) {
      setSolidCamLoadStatus("SolidCAM: SW not running", "unknown");
    } else {
      setSolidCamLoadStatus("SolidCAM: unknown", "unknown");
    }
  } catch {
    setSolidCamLoadStatus("SolidCAM: status error", "unknown");
  } finally {
    state.solidCamStatusInFlight = false;
  }
}

function renderCamAddinsList(addins) {
  if (!ui.camAddinsList) return;
  ui.camAddinsList.innerHTML = "";
  if (!addins || !addins.length) {
    const empty = document.createElement("div");
    empty.className = "response-preview muted";
    empty.textContent = "Click Search to enumerate SolidCAM add-ins registered with SOLIDWORKS.";
    ui.camAddinsList.appendChild(empty);
    return;
  }
  const cam = state.solidCamSettings || {};
  for (const addin of addins) {
    const id = `cam-addin-${addin.clsid?.replace(/[^A-Za-z0-9]/g, "") || Math.random().toString(36).slice(2)}`;
    const isSelected = (cam.selectedDllPath || "").toLowerCase() === (addin.dllPath || "").toLowerCase();
    const row = document.createElement("label");
    row.className = "cam-addin-row" + (isSelected ? " selected" : "");
    row.setAttribute("for", id);
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "cam-addin";
    radio.id = id;
    radio.value = addin.dllPath || "";
    radio.checked = isSelected;
    radio.addEventListener("change", () => {
      state.solidCamSettings = {
        selectedDllPath: addin.dllPath || "",
        selectedTitle: addin.title || "",
        selectedClsid: addin.clsid || "",
      };
      renderCamSelectionState();
      refreshSolidCamLoadStatus({ force: true });
      renderCamAddinsList(state.solidCamAddins || []);
      api.saveSettings(readSettingsForm()).then((r) => {
        if (r?.ok) state.settings = r.settings;
      }).catch(() => {});
    });
    const meta = document.createElement("div");
    meta.className = "cam-addin-meta";
    const titleText = addin.title || "(no title)";
    const pathText = addin.dllPath || "(no DLL path)";
    const title = document.createElement("span");
    title.className = "cam-addin-title";
    title.textContent = titleText;
    title.title = titleText;
    const pathRow = document.createElement("span");
    pathRow.className = "cam-addin-path";
    pathRow.textContent = pathText;
    pathRow.title = pathText;
    meta.appendChild(title);
    meta.appendChild(pathRow);
    // Whole-row tooltip too - lets the user inspect both title + path
    // by hovering anywhere on the row.
    row.title = `${titleText}\n${pathText}`;
    row.appendChild(radio);
    row.appendChild(meta);
    ui.camAddinsList.appendChild(row);
  }
}

async function searchCamAddins() {
  if (!ui.searchCamAddinsBtn) return;
  ui.searchCamAddinsBtn.disabled = true;
  const originalLabel = ui.searchCamAddinsBtn.textContent;
  ui.searchCamAddinsBtn.textContent = "Searching...";
  try {
    const result = await api.findSwAddins("solidcam");
    state.solidCamAddins = result?.addins || [];
    renderCamAddinsList(state.solidCamAddins);
    if (!result?.ok) {
      log("SolidCAM add-in search had problems.", result);
    } else if (state.solidCamAddins.length === 0) {
      log("No SolidCAM add-ins found in registry.", result);
    } else {
      log(`Found ${state.solidCamAddins.length} SolidCAM add-in(s).`, result);
    }
  } catch (error) {
    log("SolidCAM add-in search failed.", { error: error.message });
  } finally {
    ui.searchCamAddinsBtn.disabled = false;
    ui.searchCamAddinsBtn.textContent = originalLabel;
  }
}

async function startCamAddin() {
  if (!ui.startCamBtn) return;
  const cam = state.solidCamSettings || {};
  if (!cam.selectedDllPath) {
    log("No SolidCAM add-in selected. Open Settings > SolidCAM and pick one.");
    return;
  }
  ui.startCamBtn.disabled = true;
  const originalLabel = ui.startCamBtn.textContent;
  ui.startCamBtn.textContent = "Loading...";
  try {
    const result = await api.camAddinLoad();
    log(result?.ok ? "Loaded SolidCAM add-in." : "Loading SolidCAM add-in failed.", result);
    await refreshSolidCamLoadStatus({ force: true });
  } catch (error) {
    log("Loading SolidCAM add-in failed.", { error: error.message });
  } finally {
    ui.startCamBtn.disabled = false;
    ui.startCamBtn.textContent = originalLabel;
  }
}

async function reloadCurrentCamDoc() {
  if (!ui.reloadCamDocBtn) return;
  const originalLabel = ui.reloadCamDocBtn.textContent;
  ui.reloadCamDocBtn.disabled = true;
  ui.reloadCamDocBtn.textContent = "Reloading...";
  try {
    const result = await api.reloadCurrentDoc();
    setStatus(result);
    const loadedFirst = result?.solidCamLoadBeforeReload?.safeLoadMode
      && result.solidCamLoadBeforeReload.safeLoadMode !== "already-loaded";
    log(result?.ok
      ? (loadedFirst ? "Loaded SolidCAM and reloaded current SOLIDWORKS document." : "Reloaded current SOLIDWORKS document.")
      : "CAM reload failed.", result);
    await refreshSolidWorksStatus();
    await refreshSolidCamLoadStatus({ force: true });
  } catch (error) {
    log("CAM reload failed.", { error: error.message });
  } finally {
    ui.reloadCamDocBtn.disabled = false;
    ui.reloadCamDocBtn.textContent = originalLabel;
  }
}

async function stopCamAddin() {
  if (!ui.stopCamBtn) return;
  const cam = state.solidCamSettings || {};
  if (!cam.selectedDllPath) {
    log("No SolidCAM add-in selected. Open Settings > SolidCAM and pick one.");
    return;
  }
  ui.stopCamBtn.disabled = true;
  const originalLabel = ui.stopCamBtn.textContent;
  ui.stopCamBtn.textContent = "Saving...";
  try {
    const closeResult = await api.camSaveCloseDocs();
    log(closeResult?.ok ? "Saved and closed CAM documents before unload." : "CAM document save/close failed; unload skipped.", closeResult);
    if (!closeResult?.ok) return;
    ui.stopCamBtn.textContent = "Unloading...";
    const result = await api.camAddinUnload();
    log(result?.ok ? "Unloaded SolidCAM add-in." : "Unloading SolidCAM add-in failed.", result);
    await refreshSolidCamLoadStatus({ force: true });
  } catch (error) {
    log("Stopping SolidCAM failed.", { error: error.message });
  } finally {
    ui.stopCamBtn.disabled = false;
    ui.stopCamBtn.textContent = originalLabel;
  }
}

function renderSettingsState(result, action = "loaded") {
  const settingsPath = result?.path || state.settingsPath || "Documents\\Excelsis Helper\\settings.json";
  const macro = result?.macroSettings || result?.macroLanguage;
  const macroLine = macro
    ? `\nMacro settings synchronized; updated ${macro.updated?.length || 0} macro file(s).`
    : "";
  const warningLine = macro?.warnings?.length
    ? `\nWarnings:\n${macro.warnings.join("\n")}`
    : "";
  ui.settingsState.textContent = `Settings ${action}.\nSettings file: ${settingsPath}${macroLine}${warningLine}`;
  ui.settingsState.classList.toggle("muted", !warningLine);
}

function renderCacheStats(result) {
  if (!ui.settingsCacheState) return;
  if (!result?.ok) {
    ui.settingsCacheState.textContent = `Cache size check failed: ${result?.error || "unknown error"}`;
    ui.settingsCacheState.classList.remove("muted");
    return;
  }
  const doc = result.docSearch || {};
  const thumbs = result.recentThumbnails || {};
  const updated = doc.updatedAt ? new Date(doc.updatedAt).toLocaleString() : "never";
  ui.settingsCacheState.textContent = [
    `Total cache: ${result.formattedTotalBytes || "0 B"}`,
    `Doc Search: ${doc.formattedBytes || "0 B"}; ${doc.entries || 0} indexed files; updated ${updated}`,
    `Recent thumbnails: ${thumbs.formattedBytes || "0 B"}; ${thumbs.files || 0} files`,
    `Background workers: ${result.workers?.active ?? 0}/${result.workers?.max ?? 3} active; ${result.workers?.queued ?? 0} queued`,
    `Doc Search path: ${doc.root || ""}`,
  ].join("\n");
  ui.settingsCacheState.classList.add("muted");
}

async function refreshCacheStats() {
  if (!ui.settingsCacheState || typeof api.cacheStats !== "function") return;
  try {
    const result = await api.cacheStats();
    renderCacheStats(result);
  } catch (error) {
    renderCacheStats({ ok: false, error: error.message });
  }
}

async function loadSettings() {
  try {
    const result = await api.getSettings();
    if (!result.ok) throw new Error(result.error || "Settings load failed.");
    state.settings = result.settings;
    state.defaults = result.defaults || null;
    state.settingsPath = result.path || "";
    renderSettings(state.settings);
    refreshSolidCamLoadStatus({ force: true });
    renderSettingsState(result, "loaded");
    refreshCacheStats().catch(() => {});
  } catch (error) {
    ui.settingsState.textContent = `Settings load failed: ${error.message}`;
    ui.settingsState.classList.remove("muted");
  }
}

async function saveSettings() {
  ui.settingsSaveBtn.disabled = true;
  try {
    const result = await api.saveSettings(validateRequiredSettingsPaths(readSettingsForm()));
    if (!result.ok) throw new Error(result.error || "Settings save failed.");
    state.settings = result.settings;
    state.defaults = result.defaults || state.defaults;
    state.settingsPath = result.path || "";
    renderSettings(state.settings);
    renderSettingsState(result, "saved");
    log("Settings saved.", {
      settingsPath: result.path,
      bomExportLanguage: result.settings?.bomExportLanguage,
      hotkeys: result.settings?.hotkeys,
      activity: result.settings?.activity,
      cam: result.settings?.cam,
      macroSettings: result.macroSettings || result.macroLanguage,
    });
  } catch (error) {
    ui.settingsState.textContent = `Settings save failed: ${error.message}`;
    ui.settingsState.classList.remove("muted");
    log("Settings save failed.", { error: error.message });
  } finally {
    ui.settingsSaveBtn.disabled = false;
  }
}

async function importSettings() {
  if (!ui.settingsImportBtn) return;
  ui.settingsImportBtn.disabled = true;
  try {
    const result = await api.importSettings();
    if (result?.canceled) {
      ui.settingsState.textContent = "Settings import canceled.";
      ui.settingsState.classList.add("muted");
      return;
    }
    if (!result?.ok) throw new Error(result?.error || "Settings import failed.");
    state.settings = result.settings;
    state.defaults = result.defaults || state.defaults;
    state.settingsPath = result.path || state.settingsPath;
    renderSettings(state.settings);
    renderSettingsState(result, "imported");
    log("Settings imported.", {
      importedFrom: result.importedFrom,
      backupPath: result.backupPath,
    });
  } catch (error) {
    ui.settingsState.textContent = `Settings import failed: ${error.message}`;
    ui.settingsState.classList.remove("muted");
    log("Settings import failed.", { error: error.message });
  } finally {
    ui.settingsImportBtn.disabled = false;
  }
}

async function exportSettings() {
  if (!ui.settingsExportBtn) return;
  ui.settingsExportBtn.disabled = true;
  try {
    const result = await api.exportSettings();
    if (result?.canceled) {
      ui.settingsState.textContent = "Settings export canceled.";
      ui.settingsState.classList.add("muted");
      return;
    }
    if (!result?.ok) throw new Error(result?.error || "Settings export failed.");
    ui.settingsState.textContent = `Settings exported.\nFile: ${result.exportedTo}`;
    ui.settingsState.classList.add("muted");
    log("Settings exported.", { exportedTo: result.exportedTo });
  } catch (error) {
    ui.settingsState.textContent = `Settings export failed: ${error.message}`;
    ui.settingsState.classList.remove("muted");
    log("Settings export failed.", { error: error.message });
  } finally {
    ui.settingsExportBtn.disabled = false;
  }
}

async function resetSettingsGroup(group, button = null) {
  if (!applySettingsGroupDefaults(group)) return;
  if (button) button.disabled = true;
  if (ui.settingsSaveBtn) ui.settingsSaveBtn.disabled = true;
  try {
    const result = await api.saveSettings(validateRequiredSettingsPaths(readSettingsForm()));
    if (!result.ok) throw new Error(result.error || "Settings save failed.");
    state.settings = result.settings;
    state.defaults = result.defaults || state.defaults;
    state.settingsPath = result.path || "";
    renderSettings(state.settings);
    renderSettingsState(result, `${group} reset`);
    log("Settings group reset.", { group, settingsPath: result.path, hotkeys: result.settings?.hotkeys });
  } catch (error) {
    ui.settingsState.textContent = `Settings group reset failed: ${error.message}`;
    ui.settingsState.classList.remove("muted");
    log("Settings group reset failed.", { group, error: error.message });
  } finally {
    if (button) button.disabled = false;
    if (ui.settingsSaveBtn) ui.settingsSaveBtn.disabled = false;
  }
}

async function resetSettings() {
  ui.settingsResetBtn.disabled = true;
  try {
    const result = await api.resetSettings();
    if (!result.ok) throw new Error(result.error || "Settings reset failed.");
    state.settings = result.settings;
    state.defaults = result.defaults || state.defaults;
    state.settingsPath = result.path || "";
    renderSettings(state.settings);
    renderSettingsState(result, "reset to defaults");
    log("Settings reset to defaults.", {
      settingsPath: result.path,
      settings: result.settings,
      macroSettings: result.macroSettings || result.macroLanguage,
    });
  } catch (error) {
    ui.settingsState.textContent = `Settings reset failed: ${error.message}`;
    ui.settingsState.classList.remove("muted");
    log("Settings reset failed.", { error: error.message });
  } finally {
    ui.settingsResetBtn.disabled = false;
  }
}

// ---------- Boot ----------

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

setStatus(null);
refreshDriveMapFromMain();
refreshSolidWorksStatus();
refreshSolidCamLoadStatus();
// Poll costs (updated 1.1.0): work-logger time tracking lives in the MAIN
// process heartbeat since 0.8.2/0.8.4 (persistent watcher), so the renderer's
// SOLIDWORKS status poll and the drive-map poll are cheap cached IPC reads and
// can stay unconditional (they also keep the header status fresh the moment the
// window is shown). The SolidCAM status poll is different: it spawns a
// PowerShell (sw-addin-status.ps1) per tick and paints a purely cosmetic badge,
// so it IS gated on visibility — hidden tray window means no spawn churn. The
// visibilitychange handler below refreshes it immediately on show. (Historical
// Never gate a poll that accrues time while the window is hidden.)
setInterval(() => refreshSolidWorksStatus(), SOLIDWORKS_STATUS_INTERVAL_MS);
setInterval(() => { if (!document.hidden) refreshSolidCamLoadStatus(); }, SOLIDCAM_STATUS_INTERVAL_MS);
setInterval(() => refreshDriveMapFromMain(), 60000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) refreshSolidCamLoadStatus();
});
document.addEventListener("click", hideRecentDocContextMenu);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideRecentDocContextMenu();
    setWorklogExportDialogOpen(false);
  }
});
window.addEventListener("scroll", hideRecentDocContextMenu, true);
const recentDocsScroller = recentDocsScrollContainer();
if (recentDocsScroller) {
  recentDocsScroller.addEventListener("scroll", maybeLoadMoreRecentDocs, { passive: true });
  recentDocsScroller.addEventListener("scroll", maybeLoadMoreWorklogs, { passive: true });
}
window.addEventListener("resize", maybeLoadMoreRecentDocs);
window.addEventListener("resize", maybeLoadMoreWorklogs);

if (ui.recentDocsFilter) {
  ui.recentDocsFilter.addEventListener("change", () => {
    recentDocsState.filter = ui.recentDocsFilter.value;
    recentDocsState.lastSignature = "";
    recentDocsState.resetRender = true;
    refreshRecentDocsList();
  });
}
if (ui.recentDocsSearch) {
  let searchDebounce = null;
  ui.recentDocsSearch.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      recentDocsState.search = ui.recentDocsSearch.value;
      recentDocsState.lastSignature = "";
      recentDocsState.resetRender = true;
      refreshRecentDocsList();
    }, 90);
  });
}
if (ui.refreshRecentDocsBtn) {
  ui.refreshRecentDocsBtn.addEventListener("click", () => {
    recentDocsState.lastSignature = "";
    recentDocsState.resetRender = true;
    refreshRecentDocsList();
  });
}
if (ui.retryThumbnailsBtn) {
  ui.retryThumbnailsBtn.addEventListener("click", async () => {
    ui.retryThumbnailsBtn.disabled = true;
    const originalLabel = ui.retryThumbnailsBtn.textContent;
    ui.retryThumbnailsBtn.textContent = "Retrying...";
    try {
      const result = await api.retryRecentDocThumbnails();
      const blankNote = result?.blankRegenerated ? ` (incl. ${result.blankRegenerated} blank)` : "";
      log(`Retrying ${result?.queued || 0} missing/blank thumbnails${blankNote}. Kept ${result?.cachedKept || 0} cached thumbnails.`);
      recentDocsState.lastSignature = "";
      recentDocsState.resetRender = true;
      await refreshRecentDocsList();
    } catch (error) {
      log("Retry thumbnails failed.", { error: error.message });
    } finally {
      ui.retryThumbnailsBtn.disabled = false;
      ui.retryThumbnailsBtn.textContent = originalLabel;
    }
  });
}
refreshRecentDocsList();

if (ui.refreshWorkLoggerBtn) {
  ui.refreshWorkLoggerBtn.addEventListener("click", () => {
    workLoggerState.lastSignature = `refresh:${Date.now()}`;
    refreshWorkLoggerList().catch(() => {});
  });
}
if (ui.exportWorkLoggerBtn) {
  ui.exportWorkLoggerBtn.addEventListener("click", () => {
    openWorklogExportDialog().catch((error) => {
      log("Work Logger export dialog failed.", { error: error.message });
    });
  });
}
if (ui.exportLastDayWorkLoggerBtn) {
  ui.exportLastDayWorkLoggerBtn.addEventListener("click", async () => {
    if (typeof api.getLastWorklogBackup !== "function") return;
    ui.exportLastDayWorkLoggerBtn.disabled = true;
    try {
      const backup = await api.getLastWorklogBackup();
      if (!backup?.ok || !backup.available || !(backup.projects || []).length) {
        workLoggerState.lastDayBackup = null;
        log("No recoverable last-day work log was found.", backup || {});
        return;
      }
      workLoggerState.lastDayBackup = backup;
      await openWorklogExportDialog({ lastDay: true, projects: backup.projects });
    } catch (error) {
      log("Export last day failed to open.", { error: error.message });
    } finally {
      refreshLastDayAvailability().catch(() => {});
    }
  });
}
if (ui.setWorklogExportBtn) {
  ui.setWorklogExportBtn.addEventListener("click", async () => {
    if (typeof api.saveWorklogExportRules !== "function") return;
    const rules = readWorklogExportRules();
    ui.setWorklogExportBtn.disabled = true;
    try {
      const result = await api.saveWorklogExportRules(rules);
      if (ui.worklogExportState) {
        ui.worklogExportState.textContent = result?.ok
          ? "Settings saved. They'll load for the next export."
          : `Could not save settings: ${result?.error || "unknown error"}.`;
        ui.worklogExportState.classList.remove("muted");
      }
      log("Saved Work Logger export settings.", { ok: result?.ok, rules: result?.rules });
    } catch (error) {
      log("Saving export settings failed.", { error: error.message });
    } finally {
      ui.setWorklogExportBtn.disabled = false;
    }
  });
}
if (ui.closeWorklogExportBtn) {
  ui.closeWorklogExportBtn.addEventListener("click", () => setWorklogExportDialogOpen(false));
}
if (ui.cancelWorklogExportBtn) {
  ui.cancelWorklogExportBtn.addEventListener("click", () => setWorklogExportDialogOpen(false));
}
if (ui.worklogExportDialog) {
  ui.worklogExportDialog.addEventListener("click", (event) => {
    if (event.target === ui.worklogExportDialog) setWorklogExportDialogOpen(false);
  });
}
for (const input of [ui.worklogExportCutoffMinutes, ui.worklogExportMultiplier, ui.worklogExportRoundToMinutes, ui.worklogExportTargetHoursMode, ui.worklogExportTargetHours]) {
  input?.addEventListener("input", updateWorklogExportControls);
  input?.addEventListener("change", updateWorklogExportControls);
}
for (const input of [ui.worklogExportDefaultWorkType, ui.worklogExportSecondWorkType]) {
  input?.addEventListener("change", () => {
    if (input === ui.worklogExportDefaultWorkType && !ui.worklogExportSplitByWorkType?.checked) {
      populateWorklogWorkTypeSelect(ui.worklogExportSecondWorkType, ui.worklogExportDefaultWorkType.value);
    }
    updateWorklogExportControls();
  });
}
for (const input of [ui.worklogExportPerProjectWorkTypes, ui.worklogExportSplitByWorkType]) {
  input?.addEventListener("change", () => {
    if (input === ui.worklogExportSplitByWorkType && ui.worklogExportSplitByWorkType.checked && ui.worklogExportSecondWorkType) {
      populateWorklogWorkTypeSelect(ui.worklogExportSecondWorkType, ui.worklogExportSecondWorkType.value || ui.worklogExportDefaultWorkType?.value);
    }
    updateWorklogExportControls();
  });
}
if (ui.worklogExportForm) {
  ui.worklogExportForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const lastDay = workLoggerState.lastDayMode;
    const exporter = lastDay ? api.exportLastDayWorklogs : api.exportWorklogs;
    if (typeof exporter !== "function") {
      if (ui.worklogExportState) {
        ui.worklogExportState.textContent = "Export needs the updated app preload. Restart Excelsis Helper.";
        ui.worklogExportState.classList.remove("muted");
      }
      return;
    }
    const rules = readWorklogExportRules();
    const originalLabel = ui.confirmWorklogExportBtn?.textContent || "Export";
    if (ui.confirmWorklogExportBtn) {
      ui.confirmWorklogExportBtn.disabled = true;
      ui.confirmWorklogExportBtn.textContent = "Exporting...";
    }
    if (ui.worklogExportState) {
      ui.worklogExportState.textContent = "";
      ui.worklogExportState.classList.add("muted");
    }
    try {
      const result = await exporter(rules);
      if (!result?.ok) {
        if (ui.worklogExportState) {
          ui.worklogExportState.textContent = result?.error || "Nothing was exported.";
          ui.worklogExportState.classList.remove("muted");
        }
        log("Work Logger export was not written.", result);
        updateWorklogExportControls();
        return;
      }
      setWorklogExportDialogOpen(false);
      log(lastDay ? "Exported recovered last-day work logs." : "Exported Work Logger batch.", {
        path: result.path,
        entries: result.count,
        skipped: result.skippedCount,
        hours: result.exportedHours,
        recovered: Boolean(result.recovered),
        rules: result.rules,
      });
      workLoggerState.lastSignature = `export:${Date.now()}`;
      await refreshWorkLoggerList();
      await refreshLastDayAvailability().catch(() => {});
    } catch (error) {
      if (ui.worklogExportState) {
        ui.worklogExportState.textContent = `Export failed: ${error.message}`;
        ui.worklogExportState.classList.remove("muted");
      }
      log("Work Logger export failed.", { error: error.message });
    } finally {
      if (ui.confirmWorklogExportBtn) {
        ui.confirmWorklogExportBtn.disabled = false;
        ui.confirmWorklogExportBtn.textContent = originalLabel;
      }
      updateWorklogExportControls();
    }
  });
}
if (ui.resetWorkLoggerBtn) {
  ui.resetWorkLoggerBtn.addEventListener("click", async () => {
    const ok = window.confirm("Reset today's Work Logger totals? CAD files and recent documents are not deleted.");
    if (!ok) return;
    const originalLabel = ui.resetWorkLoggerBtn.textContent;
    ui.resetWorkLoggerBtn.disabled = true;
    ui.resetWorkLoggerBtn.textContent = "Resetting...";
    try {
      const result = await api.resetWorklogsToday();
      workLoggerState.lastSignature = `reset:${Date.now()}`;
      workLoggerState.entries = [];
      workLoggerState.renderedCount = 0;
      workLoggerState.path = result?.path || workLoggerState.path;
      workLoggerState.activeDate = result?.activeDate || workLoggerState.activeDate;
      if (ui.workLoggerList) ui.workLoggerList.replaceChildren();
      renderWorkLogger([], result || {});
      log("Reset today's Work Logger totals.", {
        removedProjects: result?.removedProjects || 0,
        removedMinutes: Math.round(Number(result?.removedMs || 0) / 60000),
        activeDate: result?.activeDate,
      });
    } catch (error) {
      log("Work Logger reset failed.", { error: error.message });
    } finally {
      ui.resetWorkLoggerBtn.disabled = false;
      ui.resetWorkLoggerBtn.textContent = originalLabel;
    }
  });
}
if (typeof api.onAutoExportLog === "function") {
  api.onAutoExportLog((payload) => {
    if (!payload) return;
    log(`[Auto-export] ${payload.message}`, payload.data || undefined);
    if (document.getElementById("workLoggerView")?.classList.contains("active")) {
      refreshWorkLoggerList().catch(() => {});
    }
  });
}
if (ui.worklogAutoExportSkip) {
  ui.worklogAutoExportSkip.addEventListener("change", async () => {
    if (typeof api.setAutoExportSkip !== "function") return;
    const skip = ui.worklogAutoExportSkip.checked;
    ui.worklogAutoExportSkip.disabled = true;
    try {
      const result = await api.setAutoExportSkip(skip);
      if (result?.autoExport) renderAutoExportStatus(result.autoExport);
      log(skip ? "Auto-export skipped for tonight." : "Auto-export re-enabled for tonight.");
    } catch (error) {
      log("Could not change auto-export skip.", { error: error.message });
    } finally {
      ui.worklogAutoExportSkip.disabled = false;
    }
  });
}

if (ui.docSearchInput) {
  ui.docSearchInput.addEventListener("input", () => {
    state.docSearchRequestSeq++;
    clearDocSearchTiles("Searching...");
    scheduleDocSearchRefresh(250);
  });
}

if (ui.docSearchTypeFilter) {
  ui.docSearchTypeFilter.addEventListener("change", () => {
    state.docSearchRequestSeq++;
    clearDocSearchTiles("Loading filtered results...");
    scheduleDocSearchRefresh(0);
  });
}

if (ui.docSearchPrevPageBtn) {
  ui.docSearchPrevPageBtn.addEventListener("click", () => {
    if (state.docSearchPage <= 0 || state.docSearchInFlight) return;
    refreshDocSearch({ page: state.docSearchPage - 1 }).catch(() => {});
  });
}

if (ui.docSearchNextPageBtn) {
  ui.docSearchNextPageBtn.addEventListener("click", () => {
    if (!state.docSearchHasMore || state.docSearchInFlight) return;
    refreshDocSearch({ page: state.docSearchPage + 1 }).catch(() => {});
  });
}

ui.navButtons.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));

if (ui.refreshGcodeBtn) ui.refreshGcodeBtn.addEventListener("click", () => refreshGcodeView().catch(() => {}));
if (ui.gcodeChangeFileBtn) {
  ui.gcodeChangeFileBtn.addEventListener("click", () => {
    state.gcodeListCollapsed = false;
    applyGcodeListVisibility();
    refreshGcodeView().catch(() => {});
  });
}
if (ui.gcodeAnalyzeBtn) ui.gcodeAnalyzeBtn.addEventListener("click", () => runGcodeAnalyze().catch(() => {}));
if (ui.gcodeOpenChecksFolderBtn) {
  ui.gcodeOpenChecksFolderBtn.addEventListener("click", async () => {
    const result = await api.gcodeOpenChecksFolder().catch(() => null);
    if (!result?.ok) log(`Could not open checks folder: ${result?.error || "unknown error"}`);
  });
}
if (ui.killSolidWorksBtn) ui.killSolidWorksBtn.addEventListener("click", killSolidWorks);
if (ui.copyDocLocationBtn) ui.copyDocLocationBtn.addEventListener("click", copyCurrentDocLocation);
if (ui.createCamFolderBtn) ui.createCamFolderBtn.addEventListener("click", createCamFolder);
ui.refreshMacroTilesBtn.addEventListener("click", refreshMacroTiles);
ui.openMacroFolderBtn.addEventListener("click", openMacroFolder);
if (ui.convertSwbMacrosBtn) ui.convertSwbMacrosBtn.addEventListener("click", convertSwbMacros);

ui.settingsSaveBtn.addEventListener("click", saveSettings);
ui.settingsResetBtn.addEventListener("click", resetSettings);
if (ui.settingsImportBtn) ui.settingsImportBtn.addEventListener("click", importSettings);
if (ui.settingsExportBtn) ui.settingsExportBtn.addEventListener("click", exportSettings);
ui.settingsGroupResetButtons.forEach((button) => {
  button.addEventListener("click", () => resetSettingsGroup(button.dataset.settingsReset, button));
});
if (ui.settingsUiLanguage) {
  // Live-preview the UI language as soon as it's changed (before Save).
  ui.settingsUiLanguage.addEventListener("change", () => applyUiLanguage(ui.settingsUiLanguage.value));
}

if (ui.searchCamAddinsBtn) ui.searchCamAddinsBtn.addEventListener("click", searchCamAddins);
if (ui.startCamBtn) ui.startCamBtn.addEventListener("click", startCamAddin);
if (ui.reloadCamDocBtn) ui.reloadCamDocBtn.addEventListener("click", reloadCurrentCamDoc);
if (ui.stopCamBtn) ui.stopCamBtn.addEventListener("click", stopCamAddin);
if (ui.deleteDocSearchCacheBtn) {
  ui.deleteDocSearchCacheBtn.addEventListener("click", async () => {
    const ok = window.confirm("Delete only the Excelsis Helper Doc Search index cache? Source files are not touched.");
    if (!ok) return;
    const originalLabel = ui.deleteDocSearchCacheBtn.textContent;
    ui.deleteDocSearchCacheBtn.disabled = true;
    ui.deleteDocSearchCacheBtn.textContent = "Deleting...";
    try {
      const result = await api.deleteDocSearchCache();
      log(result?.ok ? "Doc Search index cache deleted." : "Doc Search cache delete failed.", result);
      state.docSearchLastSignature = "";
      if (ui.docSearchList) ui.docSearchList.replaceChildren();
      if (ui.docSearchState) ui.docSearchState.textContent = "Index cache deleted. Background indexing will rebuild it automatically.";
      refreshCacheStats().catch(() => {});
    } catch (error) {
      log("Doc Search cache delete failed.", { error: error.message });
    } finally {
      ui.deleteDocSearchCacheBtn.disabled = false;
      ui.deleteDocSearchCacheBtn.textContent = originalLabel;
    }
  });
}

ui.clearLogBtn.addEventListener("click", () => {
  ui.logOutput.textContent = "";
});

async function applySidebarImage() {
  try {
    const result = await api.pickSidebarImage();
    if (result?.ok && result.url) {
      ui.sidebarBottomImage.src = result.url;
      ui.sidebarBottom.classList.add("has-image");
      return;
    }
  } catch {}
  ui.sidebarBottom.classList.remove("has-image");
  ui.sidebarBottomImage.removeAttribute("src");
}

async function renderAppVersion() {
  if (!ui.appVersion) return;
  try {
    const version = await api.getAppVersion?.();
    ui.appVersion.textContent = version ? `v${version}` : "";
  } catch {
    ui.appVersion.textContent = "";
  }
}

refreshMacroTiles();
loadSettings();
applySidebarImage();
renderAppVersion();
