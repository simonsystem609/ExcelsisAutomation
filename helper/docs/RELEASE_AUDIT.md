# Release Audit: 1.3.1-public.1

Status: final local candidate; not published. User installation and behavioral
testing remain pending. The application and installer were not launched during
the build or audit.

## Source and release model

- Private product version: `1.3.1`; public package label:
  `1.3.1-public.1`.
- The private and public packages use byte-identical common application code.
  All 39 compared app, script, macro, icon, installer-hook, and test files
  matched. The private package adds a separate ten-group operational preset;
  the public preset contains an empty `settings` object.
- Corresponding public source includes the lockfile, build configuration,
  installer hook, app code, scripts, macros, tests, GPL-3.0-only text,
  provenance, notices, and exact dependency-license inventory.
- Required deployment locations are validated as absolute paths. Project-code
  and DXF filename prefixes are configurable and may be empty where the
  workflow can identify projects from configured roots.

## 1.3.1 final replacement repair

- The unpublished `1.3.0-public.1` candidate retained one drive-specific
  candidate-source diagnostic label. This replacement changes only that label
  to `configured-root-search`; path selection, configured-root traversal,
  fallback order, returned fields, and every user-visible feature are
  unchanged. A positive regression assertion covers the neutral label.

- Electron remains at `42.6.1`; this release does not add a major-version
  migration to the final wording repair.
- Document indexing and embedded-preview extraction now use Electron utility
  processes. Neither job depends on RunAsNode, and thumbnail extraction remains
  present with its existing bounds, timeout, and EcoQoS scheduling.
- Production fuses disable RunAsNode, NODE_OPTIONS, command-line inspection,
  and legacy file-protocol privileges. Embedded ASAR integrity and
  only-load-from-ASAR are enabled. The ninth WasmTrapHandlers fuse remains
  enabled after explicit review because guard pages avoid the code-size and
  runtime overhead of explicit WebAssembly bounds checks.
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
  `dist/win-unpacked` byte-for-byte. `app.asar` contains exactly eight files.
  Seven application files matched source byte-for-byte; electron-builder made
  only its expected `package.json` transformation by removing build scripts and
  development dependencies while preserving identity, version, main, license,
  and private fields. All 33 external project resources matched source.
- All nine fuse slots and the embedded ASAR resource were read from the final
  executable. The recomputed app.asar header hash matched the embedded SHA-256
  value `ed817fd5276e00bce307efd5b4b3260f594d84bbabd6907049d9d792d3fc1ca6`.
- The two BOM macros contain `BOM_EXPORT_LANGUAGE`. The thumbnail extractor
  passed a functional synthetic-image test and resource-cap rejection tests.
- Source and packaged project-resource scans found no credentials, private
  machine paths, company prefixes, prohibited historical wording, or internal
  workflow identifiers. The superseded drive-specific label is absent from
  source, unpacked resources, and the independently extracted installer
  payload; `configured-root-search` occurs once in the intended script.
- DwgThumbnailReader origin, exact commit, translated file, copyright, and MIT
  notice are preserved. Electron/Chromium, NSIS, Elevate, electron-builder, and
  ResEdit notices are included. The lockfile and generated inventory contain
  286 dependency entries. `npm ci` audited 287 packages including the root and
  reported zero known vulnerabilities.
- JavaScript syntax checks (11 files), PowerShell parsing (11 files), settings
  layering, required-path validation, optional-prefix behavior, macro sync,
  CAM project detection, preview extraction, IPC/renderer hardening, process
  safety, and installer hardening tests passed.
- The corresponding-source tree contains 57 files and excludes `node_modules`,
  `dist`, Git metadata, generated backups, logs, caches, branding, vendor
  binaries, and 3D PDF/PRC material. Its independently extracted archive must
  match those 57 files byte-for-byte; the archive hash is recorded externally
  because a ZIP cannot contain its own final checksum.

## Final artifacts

- Installer: `Excelsis Helper-Setup-1.3.1-public.1.exe`
- Size: `85201213` bytes
- SHA-256:
  `73949A216C70ABB0A52DBF17F5571E8DC25CFA2544F9CDB74691220A76C3B85F`
- Installer Authenticode: `NotSigned`
- Blockmap: `Excelsis Helper-Setup-1.3.1-public.1.exe.blockmap`
- Blockmap size: `91261` bytes
- Blockmap SHA-256:
  `7C131A92C92733B5AA9E4DFA03EE7EF866486E8C5822C033BD05061478840B67`
- Packaged app executable: `232785408` bytes; Authenticode `NotSigned`
- Packaged app SHA-256:
  `8A9F0576B54A848688B56136DE7ED73EE4D161F1E2D99914F1128C722651FE4A`
- Packaged `elevate.exe` SHA-256:
  `9B1FBF0C11C520AE714AF8AA9AF12CFD48503EEDECD7398D8992EE94D1B4DC37`
- Build environment: Windows `10.0.26200.0`, Node.js `24.18.0`, npm
  `11.16.0`, Electron `42.6.1`, electron-builder `26.15.3`.

Unsigned status is explicit and is not treated as signing success. Authenticode
signing remains recommended before broad public distribution.
