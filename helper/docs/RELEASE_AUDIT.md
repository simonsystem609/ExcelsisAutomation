# Release Audit: 1.3.3-public.1

Status: final local candidate; not published. User installation and behavioral
testing remain pending. The application and installer were not launched during
the build or audit. The last user-confirmed working installed version is
`1.2.5`; installed `1.3.2` opened with a black renderer and is not a trusted
runtime baseline.

## Source and release model

- Private product version: `1.3.3`; public package label:
  `1.3.3-public.1`.
- The private and public packages use byte-identical common application code.
  All 41 compared app, script, macro, icon, installer-hook, and test files
  matched. The private package adds a separate ten-group operational preset;
  the public preset contains an empty `settings` object.
- Corresponding public source includes the lockfile, build configuration,
  installer hook, app code, scripts, macros, tests, GPL-3.0-only text,
  provenance, notices, and exact dependency-license inventory.
- Required deployment locations are validated as absolute paths. Project-code
  and DXF filename prefixes are configurable and may be empty where the
  workflow can identify projects from configured roots.

## 1.3.3 renderer recovery and thumbnail containment

- The `1.3.2` black window was reproduced in an isolated packaged Electron
  smoke app. With Electron `42.6.1`, ASAR integrity and only-load-from-ASAR
  enabled, setting `GrantFileProtocolExtraPrivileges` off made
  `BrowserWindow.loadFile()` reject the packaged HTML with
  `ERR_FILE_NOT_FOUND`. An otherwise identical package with that fuse enabled
  loaded sandboxed preload, CSP-protected local CSS and module JavaScript, and
  rendered correctly. The production fuse is therefore enabled again; all
  other renderer and IPC hardening remains in place.
- Runtime inspection also found embedded-preview utility children retaining
  native zlib allocations across multi-file batches and reaching gigabyte-scale
  working sets. Preview functionality and every fallback tier remain present,
  but each CAD file now runs in a fresh utility child with a 192 MB V8 heap
  ceiling, a 25-second item timeout, and the existing 120-second batch ceiling.
  This releases process-local allocations between files without touching the
  source CAD document or the live SOLIDWORKS session.
- The exact private `1.3.2` installer/source and persisted settings/activity
  files were backed up before the common-code repair. The `1.3.3` installer
  continues to preserve application data on upgrade and uninstall.

## Retained 1.3.2 Work Logger changes

- Active time on a new unsaved SOLIDWORKS document is held only in memory. A
  watcher-session and COM-document token tie that time to the same live
  document across a Save/Save As. Saving to a non-excluded real path promotes
  the full provisional duration only after at least 60 seconds; shorter work is
  discarded. Multiple unsaved documents, switching, pause/resume, ineligible
  paths, fallback samples, reconnects, and resets have regression coverage.
- Identity is fail-closed. The spawn-per-call fallback cannot promote pending
  time, watcher reconnects cannot reuse it, and disconnect/app restart/day reset
  clears it rather than assigning work to a possibly different document. No new
  process, COM scan, polling cadence, or persistent data file was added.
- The recursive settings-layer merge now builds entries through `Map` and
  `Object.fromEntries` instead of dynamic property assignment. Blocked keys are
  rejected recursively, including inside arrays. This removes the local source
  pattern behind the outstanding CodeQL alert; remote closure still requires a
  future published scan.
- `THIRD_PARTY_NOTICES.md` now accurately says that macro and icon provenance is
  recorded, without claiming that `docs/PROVENANCE.md` contains hashes.
- The neutral `configured-root-search` diagnostic label from `1.3.1` remains in
  place with unchanged configured-root traversal and fallback behavior.

- Electron remains at `42.6.1`; this release does not add an Electron migration.
- Document indexing and embedded-preview extraction now use Electron utility
  processes. Neither job depends on RunAsNode, and thumbnail extraction remains
  present with its existing bounds, timeout, and EcoQoS scheduling.
- Production fuses disable RunAsNode, NODE_OPTIONS, and command-line
  inspection. Embedded ASAR integrity and only-load-from-ASAR are enabled. The
  file-protocol privilege fuse remains enabled because the application loads
  its trusted packaged renderer through `loadFile()`. The ninth
  WasmTrapHandlers fuse remains enabled after explicit review because guard
  pages avoid the code-size and runtime overhead of explicit WebAssembly bounds
  checks.
- Recent-document opens require supported SOLIDWORKS/SolidCAM extensions and
  app-managed recent membership. Search opens require supported indexed
  extensions plus index membership or a canonical configured search root.
  Link targets are canonicalized and rechecked. VBA module/procedure values are
  bounded identifiers before they reach the bridge.
- Both BrowserWindows use renderer sandboxing, context isolation, restrictive
  CSPs, navigation/window-open denial, and denied permission requests.
- Every privileged renderer IPC registration uses a trusted wrapper that
  accepts only the bundled main page and its main frame.
- Macro execution is restricted to real files below the logged-in user's
  Helper macro directory, including canonical-path checks against link escape.
  SolidCAM load/unload requests must match a registry-discovered DLL/CLSID pair.
- Weak title/document heuristics no longer terminate SOLIDWORKS. The only
  retained termination action is the explicit, confirmed, freshly
  health-gated full-session command.
- Independently authored, read-only SOLIDWORKS embedded-preview extraction was
  preserved and given strict input, expansion, attempt, image, dimension,
  pixel, batch, and path limits. DWG/DXF thumbnail parsing has corresponding
  allocation and complexity caps.
- Private operational topology and historical test wording were removed from
  packaged runtime files. `CrawlScrews_v1.swb` remains opt-in and local; the
  macro itself requires affirmative confirmation before document access, even
  when run directly or renamed, and discloses screenshots, absolute CAD paths,
  configurations, and feature names.
- Dependency notices now distinguish lockfile SPDX metadata from standalone
  package license files. No known redistributed runtime notice is missing.
- The missing add-in-dialog script reference was removed. The installer no
  longer writes macros through a per-machine `$DOCUMENTS` path. The app deploys
  versioned bundled macros for the logged-in user and backs up differing files.
- Interactive installs may start the app after de-elevation so a preset can be
  imported. Silent installs do not launch it. Settings, diagnostics, and other
  application data are preserved on upgrade and uninstall. Diagnostics are
  capped at 20 files and may contain local paths and process metadata; this is
  disclosed in the README.

## Packaging and audit gates

- The public preset is `public-generic`, uses fallback-only merge behavior, and
  has zero setting groups. No private preset, machine path, credential,
  company/customer value, branding directory, screenshot, vendor binary, or
  3D PDF/PRC implementation was found in source or packaged project bytes.
- Public project images are limited to the project-owned app icon: root PNG,
  build PNG, and build ICO. The package contains the renderer PNG plus the two
  build icon formats.
- Runtime footprint is constrained to `en-US` and `hu` locale packs. Five
  unused GPU/Vulkan files are removed after packaging, application files are in
  ASAR, and there are no runtime npm modules.
- All 50 files extracted from the final NSIS installer matched
  `dist/win-unpacked` byte-for-byte. `app.asar` contains exactly nine files.
  Eight application files matched source byte-for-byte; electron-builder made
  only its expected `package.json` transformation by removing build scripts and
  development dependencies while preserving identity, version, main, license,
  and private fields. All 33 external project resources matched source.
- All nine fuse slots and the embedded ASAR resource were read from the final
  executable. The recomputed app.asar header hash matched the embedded SHA-256
  value `eb34362e214fd00148c303899ec1176b9a31152721d5f0bc1b924f23b41bfc14`.
- The two BOM macros contain `BOM_EXPORT_LANGUAGE`. The thumbnail extractor
  passed a functional synthetic-image test and resource-cap rejection tests.
- Source and packaged project-resource scans found no credentials, private
  machine paths, company prefixes, prohibited historical wording, or internal
  workflow identifiers. Nineteen values unique to the private deployment preset
  were checked directly against public source and packaged project bytes; none
  occurred. The public preset has zero setting groups.
- DwgThumbnailReader origin, exact commit, translated file, copyright, and MIT
  notice are preserved. Electron/Chromium, NSIS, Elevate, electron-builder, and
  ResEdit notices are included. The lockfile and generated inventory contain
  286 dependency entries. `npm ci` audited 287 packages including the root and
  reported zero known vulnerabilities.
- JavaScript syntax checks (13 files), PowerShell parsing (11 files), settings
  layering, recursive blocked-key rejection, required-path validation,
  optional-prefix behavior, macro sync, unsaved-document identity/promotion,
  CAM project detection, preview extraction, IPC/renderer hardening, process
  safety, and installer hardening tests passed.
- The corresponding-source tree contains 59 files and excludes `node_modules`,
  `dist`, Git metadata, generated backups, logs, caches, branding, vendor
  binaries, and 3D PDF/PRC material. Its independently extracted archive must
  match those 59 files byte-for-byte; the archive hash is recorded externally
  because a ZIP cannot contain its own final checksum.

## Final artifacts

- Installer: `Excelsis Helper-Setup-1.3.3-public.1.exe`
- Size: `85205013` bytes
- SHA-256:
  `6EEA737C8915EAE46C50C5B6A7F539D4591A00E64E054560AC15AB02AA50493C`
- Installer Authenticode: `NotSigned`
- Blockmap: `Excelsis Helper-Setup-1.3.3-public.1.exe.blockmap`
- Blockmap size: `91214` bytes
- Blockmap SHA-256:
  `99393CA9E3E49BB2F7B4DA5F15F47E89CF0298DBAA00C25DD205D6100439683C`
- Packaged app executable: `232785408` bytes; Authenticode `NotSigned`
- Packaged app SHA-256:
  `B1A9C81F07FFF450F9DF57D1916D21C60F9FF4588925E401257198A6A3EF2265`
- Packaged `elevate.exe` SHA-256:
  `9B1FBF0C11C520AE714AF8AA9AF12CFD48503EEDECD7398D8992EE94D1B4DC37`
- Build environment: Windows `10.0.26200.0`, Node.js `24.18.0`, npm
  `11.16.0`, Electron `42.6.1`, electron-builder `26.15.3`.

Unsigned status is explicit and is not treated as signing success. Authenticode
signing remains recommended before broad public distribution.
