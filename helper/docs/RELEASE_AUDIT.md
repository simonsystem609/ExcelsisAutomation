# Release Audit: 1.4.1-public.1

Status: final local candidate; not published. The application and installer
were not launched during the build or audit. User installation and behavioral
testing remain pending.

## Release model

- Application version: `1.4.1`; public artifact label: `1.4.1-public.1`.
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

- The AI-prompt generator includes only the MPF basename by default, never the
  full source path. Header comments are excluded by default. Including them
  requires an explicit warning-dialog confirmation because comments may carry
  customer or project data.
- Every untrusted prompt field is Markdown-escaped. Header comments are
  normalized and rendered as untrusted indented text; backtick and tilde fence
  sequences are neutralized. Regression tests cover existing backslashes,
  table delimiters, newlines, and attempted code-fence closure.
- The localhost renderer harness returns only generic 404 or 500 responses,
  with detailed exceptions confined to the local terminal. Responses are
  marked `no-store`.
- Recent SW and Doc Search thumbnail tiles share compact top-right `PRT`, `ASS`,
  and `DRW` document-type badges without changing thumbnail extraction.
- Unsaved SOLIDWORKS work remains tracked in memory by watcher session and
  document identity. Save/Save As promotion still requires at least 60,000 ms
  and an eligible real path; ambiguous identity transitions fail closed.
- Work Logger export adjustments, the local milling/face-milling/drilling/
  tapping engine, automatic MPF geometry extraction, editable proposals,
  time estimates, and verified `_optimized` copy writing remain present.
- Electron remains at `42.6.1`. Helper-owned processes continue to request
  EcoQoS while retaining normal priority. Thumbnail extraction remains present.

## Security and packaging

- Both BrowserWindows use sandboxing, context isolation, restrictive CSPs,
  navigation/window-open denial, denied permission requests, and trusted
  renderer/main-frame IPC wrappers.
- Production fuses disable RunAsNode, NODE_OPTIONS, and command-line inspection.
  Embedded ASAR integrity and only-load-from-ASAR are enabled. The recomputed
  ASAR header hash matches the executable's embedded SHA-256 value
  `23f58e83ab8ff8db2543017c820031fc77354f5bc3ed0466de203530dcb9f0a3`.
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
- Public source, extracted ASAR, and packaged resource scans found no private
  settings, user/company path, customer identifier, operational prefix,
  credential pattern, downloaded machining corpus, research sample, PDF, PRC,
  sample MPF, or vendor binary. The installer and ASAR contain none of the 13
  sensitive values selected from the external private preset.
- License and provenance files cover the application, Electron/Chromium, NSIS,
  Elevate, electron-builder, ResEdit, DwgThumbnailReader, and cited machining
  references. The generated dependency inventory contains 286 entries.
- A clean offline dependency install succeeded. Offline full and production
  `npm audit` checks report zero known vulnerabilities. Node syntax checks
  passed for 45 source files and PowerShell parsing passed for 11 scripts.
- The complete test suite passed in the canonical public tree, private tree,
  and isolated public staging tree. Coverage includes settings, Work Logger,
  G-code prompt privacy, all machining modules, optimized-copy writing,
  embedded previews, renderer/IPC/process constraints, installer behavior,
  and thumbnail badges.

## Corresponding source

- The public source tree contains 98 files before archiving and excludes
  `node_modules`, `dist`, Git metadata, private presets, backups, logs, caches,
  downloaded machining material, and private branding.
- The exact source ZIP must extract to those same files byte-for-byte. Its hash
  is recorded in the external checksum file because an archive cannot contain
  its own final checksum.

## Final artifacts

- Installer: `ExcelsisHelper-1.4.1-public.1-Setup.exe`
- Installer size: `85293852` bytes
- Installer SHA-256:
  `536B44419FF86777A23D1850D74FDC6D94128E989A2AB47ABA1431A36D68FA13`
- Blockmap: `ExcelsisHelper-1.4.1-public.1-Setup.exe.blockmap`
- Blockmap size: `91290` bytes
- Blockmap SHA-256:
  `D7E137DFA9D5E0239858E52BE3D061539BCCEF2A07E566EE26BF18E314858F6F`
- Packaged app executable: `232785408` bytes
- Packaged app SHA-256:
  `59857A435DFF809223C2FA67543467DCEAE0F8C543238DC4683846C2C98E637C`
- Packaged `app.asar`: `695566` bytes
- Packaged `app.asar` SHA-256:
  `BAD3347C1E5659F2DB39FB8A7A47707329485A2C44F5AFBE7247B13D66EE09E6`
- Packaged `elevate.exe`: `107520` bytes
- Packaged `elevate.exe` SHA-256:
  `9B1FBF0C11C520AE714AF8AA9AF12CFD48503EEDECD7398D8992EE94D1B4DC37`
- Installer, packaged app, and `elevate.exe` Authenticode: `NotSigned`.
- Build environment: Windows `10.0.26200.0`, Node.js `24.18.0`, npm
  `11.16.0`, Electron `42.6.1`, electron-builder `26.15.3`.

Unsigned status is explicit and is not treated as signing success. Authenticode
signing remains recommended before broad public distribution.
