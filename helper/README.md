# Excelsis Helper 1.3.1-public.1

Windows Electron tray application for SOLIDWORKS and SolidCAM workflows:
recent documents, macro launching, document search, work logging, thumbnails,
global hotkeys, and CAM folder tools.

This public source variant uses generic editable defaults. Its bundled install
preset is intentionally empty, so it contains no private deployment settings,
logs, caches, customer data, user branding, or local build history.

## Security and privacy

The renderer is sandboxed and context-isolated, uses a restrictive Content
Security Policy, denies navigation, new windows, and permission requests, and
can call privileged IPC only from the bundled main frame. Macro execution is
limited to the app's user macro folder, with bounded VBA identifiers. Recent
and search-result opens accept only supported document extensions from the
app-managed lists or configured search roots. SolidCAM load and unload
operations are limited to the DLL and CLSID pair verified in the SOLIDWORKS
add-in registry.

Production fuses disable RunAsNode, NODE_OPTIONS, command-line inspection, and
legacy file-protocol privileges. The app loads only its integrity-checked ASAR.
Document indexing and embedded-preview extraction use isolated utility
processes, preserving background EcoQoS behavior and thumbnail support.

Background scripts never terminate SOLIDWORKS based on window-title guesses.
The only process-termination command is the visible **Kill SW** action, which is
enabled only after a fresh unhealthy-session check and asks for confirmation.

The embedded SOLIDWORKS preview extractor is independently implemented,
read-only interoperability code. Thumbnail batches, manifests, decompression,
image dimensions, decoded pixels, DWG payloads, and DXF parsing all have
explicit resource caps. The extractor and its fallbacks remain included.

CrawlScrews_v1 is an opt-in local diagnostic capture. The macro itself requires
affirmative confirmation before accessing the active document, even when run
directly or under a different filename. It discloses screenshots, absolute CAD
paths, configurations, and feature names. The app does not upload that bundle.

## Installation and data

Interactive installs launch the de-elevated app once so a deployment preset can
fill missing settings. Silent installs never launch it. Existing settings
always win.

Per-machine NSIS installers do not write through the elevated $DOCUMENTS
alias. On first startup for each app version, the logged-in app copies bundled
.swb source macros into Documents\Excelsis Helper\Macros. A differing
existing macro is backed up under
Documents\Excelsis Helper\macrobackup\bundle-deploy before replacement.

Uninstall preserves Electron user data and Documents\Excelsis Helper,
including settings, work logs, caches, macro backups, and diagnostics.
Diagnostics are written only after sustained Explorer CPU incidents, retain at
most 20 files, and can contain local paths and process metadata. Remove the
preserved folder manually only when that retained data is no longer needed.

The local candidate installer is not Authenticode-signed. Windows can therefore
show an unknown-publisher warning. Production distributors should sign the
installer, app executable, and elevation helper with their own trusted
certificate.

## Configuration

Deployment paths, project root names, project prefixes, ERP locations, CAM
roots, macro defaults, hotkeys, pasted-text templates, BOM language, and UI
language are editable in Settings. Operational paths are mandatory absolute
paths. Project prefixes are optional; root-based project detection still works
when the prefix list is empty. The public BOM language default is English.

Settings can be exported to or imported from JSON. Imports overlay only the
fields they contain, and the current settings file is backed up first. A
deployment can replace install-settings-preset.json; preset values fill only
missing settings.

## Build

The audited build uses Windows, Node.js 24.18.0, npm 11.16.0, Electron 42.6.1,
and electron-builder 26.15.3.

~~~powershell
npm ci
npm test
npm run audit:licenses
npm run dist
node tools\audit-packaged-runtime.cjs "dist\win-unpacked\Excelsis Helper.exe"
~~~

Building and inspection do not require launching the application. See
docs/BUILDING.md for the non-launching verification flow.

## License

Excelsis-owned source, scripts, macros, and artwork are licensed under
GPL-3.0-only; see LICENSE. Third-party components keep their own terms; see
THIRD_PARTY_NOTICES.md, licenses\, and docs/DEPENDENCY_LICENSES.md.

SOLIDWORKS and SolidCAM are third-party trademarks. This independent project is
not endorsed by their vendors and includes no vendor program files or SDK
binaries.
