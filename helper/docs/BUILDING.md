# Reproducible Build and Inspection

## Audited environment

- Windows 11
- Node.js 24.18.0
- npm 11.16.0
- Electron 42.6.1
- electron-builder 26.15.3, resolved by package-lock.json

Electron was updated only within major version 42. The public candidate does
not take an Electron 43 migration.

## Build

From a clean source checkout:

~~~powershell
npm ci
npm test
npm run audit:licenses
node --check main.cjs
node --check preload.cjs
node --check automation.js
node --check scripts\doc-search-worker.cjs
node --check scripts\extract-embedded-preview.cjs
npm run dist
~~~

npm ci and electron-builder fetch exact archives from the npm registry,
Electron releases, and electron-builder binary releases. The lockfile and
upstream checksums verify those inputs. Electron 42.6.1 has no npm lifecycle
install script; electron-builder fetches its checked runtime archive during
packaging. The unrelated electron-winstaller lifecycle script is not required
for this NSIS build and remains unapproved.

Do not launch the application merely to inspect a package. The build creates
one universal, preset-free installer:

- dist\Excelsis Helper-Setup-1.3.9.exe
- dist\Excelsis Helper-Setup-1.3.9.exe.blockmap
- dist\win-unpacked\

An optional `ExcelsisHelper-settings.json` beside the setup EXE uses the same
schema as Settings > Import/Export. The installer stages it for first startup;
without that sidecar, generic application defaults remain in effect. The
sidecar is never embedded in the setup EXE.

## Non-launching verification

~~~powershell
Get-FileHash -Algorithm SHA256 '.\dist\Excelsis Helper-Setup-1.3.9.exe'
Get-AuthenticodeSignature '.\dist\Excelsis Helper-Setup-1.3.9.exe'
node -e "const a=require('@electron/asar'); const p=JSON.parse(a.extractFile('dist/win-unpacked/resources/app.asar','package.json')); console.log(p.version)"
node tools\audit-packaged-runtime.cjs "dist\win-unpacked\Excelsis Helper.exe"
~~~

The packaged-runtime audit verifies all nine Electron fuse slots and recomputes
the embedded SHA-256 hash of the app.asar header. WasmTrapHandlers remains
enabled for its lower compile-time, code-size, and runtime overhead. The
file-protocol privilege fuse is enabled because `BrowserWindow.loadFile()`
loads the packaged renderer from `app.asar`; an isolated packaged smoke test
confirmed that disabling it fails with `ERR_FILE_NOT_FOUND`. CSP, sandboxing,
context isolation, navigation denial, and trusted IPC remain enforced.

The unpacked runtime should contain only en-US.pak and hu.pak under locales.
Hardware acceleration is disabled, and the after-pack hook removes the five
unused GPU runtime files listed in scripts/after-pack.cjs.

The package must retain LICENSE.electron.txt, LICENSES.chromium.html,
resources\LICENSE.txt, resources\THIRD_PARTY_NOTICES.md, and
resources\licenses\.

The NSIS installer is per-machine. It preserves app data on uninstall, launches
only after an interactive install, and does not launch during silent installs.
The de-elevated app performs logged-in-user macro deployment with backups.

The audited local candidate is unsigned unless the distributor supplies a
trusted code-signing certificate. Installer bytes can differ across rebuilds
because PE resources and NSIS output contain build metadata. Reproducibility
means exact source, lockfile, tool versions, upstream checksums, packaged-file
inventory, and recorded artifact hashes, not guaranteed byte-for-byte NSIS
output.
