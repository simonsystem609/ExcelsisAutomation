# Release Audit: 1.3.9-public.1

Status: final local candidate; not published. The application and installer
were not launched during the build or audit. User installation and behavioral
testing remain pending.

## Release model

- Application version: `1.3.9`; public artifact label: `1.3.9-public.1`.
- One installer was built once from the isolated, sanitized public staging
  tree. The private and public installer files are byte-identical copies of
  that build.
- No settings preset is embedded in the source tree, installer, `app.asar`, or
  unpacked resources. A private deployment can place
  `ExcelsisHelper-settings.json` beside the installer. The NSIS hook copies that
  optional file into the installed resources; an install without the sidecar
  remains public and generic.
- The sidecar uses the application's existing Settings export document format:
  `excelsis-helper-settings`, format version 1, with a `settings` object. On
  upgrade, existing AppData settings take precedence. Fresh private installs
  receive sidecar defaults. Existing settings are backed up before a changed
  preset is written.
- Installer upgrade and uninstall behavior preserves settings, activity logs,
  diagnostics, and other application data. Silent installation does not launch
  the app. Interactive post-install launch remains de-elevated.

## Included repairs

- Unsaved SOLIDWORKS work is tracked in memory by watcher session and document
  identity. A Save/Save As to an eligible real path can relink a changed COM
  identity and transfer the provisional duration to the saved document.
- Promotion requires at least 60,000 ms. A 59,999 ms provisional session is
  discarded. Ambiguous identity, a different open document, stale transitions,
  fallback samples without watcher evidence, reconnects, and document-type
  mismatches fail closed.
- The Work Logger export dialog keeps transient per-project half-hour edits and
  deletions for the current export only. A manual export skips that night's
  automatic export by default.
- The machining engine and packaged worker include local milling, indexable face
  milling, drilling, and tapping analysis; material group/search fallback;
  automatic MPF geometry extraction with operator correction; quantized RPM and
  feed proposals; manual per-tool overrides; time estimates; stale-source
  checks; and verified `_optimized` copy writing.
- The neutral `configured-root-search` diagnostic label is retained with no
  behavior change.
- Electron remains at `42.6.1`. Document indexing and embedded-preview work stay
  in bounded utility processes with EcoQoS and normal priority. Thumbnail
  extraction remains present.

## Security and packaging

- Both BrowserWindows use sandboxing, context isolation, restrictive CSPs,
  navigation/window-open denial, denied permission requests, and trusted
  renderer/main-frame IPC wrappers.
- Production fuses disable RunAsNode, NODE_OPTIONS, and command-line inspection.
  Embedded ASAR integrity and only-load-from-ASAR are enabled. The recomputed
  ASAR header hash matches the executable's embedded SHA-256 value
  `d59f81434c6e8444d4a9e1fc7c164a4066709e12d434ea875baf5e3dd5bf0e1f`.
- The installer contains 67 files, exactly matching `dist/win-unpacked` with no
  missing, extra, or hash-mismatched file. `app.asar` contains 27 files: all 26
  non-package source files match source byte-for-byte, and the generated
  `package.json` preserves name, version, main, license, and private status
  while omitting scripts and development dependencies.
- All 50 external project resources match source byte-for-byte. The packaged
  machining worker independently passed compaction, rewrite, transfer, and
  source-hash tests. The packaged Work Logger tracker independently passed the
  60-second promotion, 59,999 ms rejection, relink, and wrong-document tests.
- Runtime footprint is restricted to `en-US` and `hu` locale packs. Unused
  GPU/Vulkan files are stripped, application files use ASAR, and there are no
  runtime npm modules.
- Public source and packaged project-resource scans found no private settings,
  user or company path, company/customer identifier, operational prefix,
  credential pattern, downloaded machining corpus, research sample, PDF, or
  vendor binary. Public image assets are limited to the project app icon in
  PNG/ICO forms.
- License and provenance files cover the application, Electron/Chromium, NSIS,
  Elevate, electron-builder, ResEdit, DwgThumbnailReader, and cited machining
  references. The generated dependency inventory contains 286 entries.
- Offline full and production `npm audit` checks report zero known
  vulnerabilities. Node syntax checks passed for 45 source files and
  PowerShell parsing passed for 11 scripts.
- The complete test suite passed: settings layering and import format, required
  paths and optional prefixes, macro synchronization, Work Logger identity and
  export behavior, G-code parsing and Explorer reveal, all machining modules,
  optimized-copy writing, embedded previews, renderer/IPC/process constraints,
  installer behavior, privacy, and thumbnail hardening.

## Corresponding source

- The public source tree contains 98 files before archiving and excludes
  `node_modules`, `dist`, Git metadata, private presets, backups, logs, caches,
  downloaded machining material, and private branding.
- The exact source ZIP must extract to those same files byte-for-byte. Its hash
  is recorded in the external checksum file because an archive cannot contain
  its own final checksum.

## Final artifacts

- Installer: `Excelsis Helper-Setup-1.3.9-public.1.exe`
- Installer size: `85293398` bytes
- Installer SHA-256:
  `B8DD531F4C28FE4A8AD44FBDA3C2E4788C65969F5F1DADC448F8F54DE860E869`
- Blockmap: `Excelsis Helper-Setup-1.3.9-public.1.exe.blockmap`
- Blockmap size: `91380` bytes
- Blockmap SHA-256:
  `B3206F8E74F0D09E487D12C18FD27391CFB711FEC537ECE4C4A63640ED17A02D`
- Packaged app executable: `232785408` bytes
- Packaged app SHA-256:
  `54350711E2D471A1DEF4709F59926DFC3D8EAC205B9FC0E7CE5109FB9DE54728`
- Packaged `app.asar`: `692478` bytes
- Packaged `app.asar` SHA-256:
  `340C67A58F7F18C8AB0B75E14F0DF17074B69035F17F0F7B8E05241DB1EA7B52`
- Packaged `elevate.exe`: `107520` bytes
- Packaged `elevate.exe` SHA-256:
  `9B1FBF0C11C520AE714AF8AA9AF12CFD48503EEDECD7398D8992EE94D1B4DC37`
- Installer, packaged app, and `elevate.exe` Authenticode: `NotSigned`.
- Build environment: Windows `10.0.26200.0`, Node.js `24.18.0`, npm
  `11.16.0`, Electron `42.6.1`, electron-builder `26.15.3`.

Unsigned status is explicit and is not treated as signing success. Authenticode
signing remains recommended before broad public distribution.
