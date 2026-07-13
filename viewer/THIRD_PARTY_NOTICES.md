# Third-Party Notices

ExcelsisView is distributed under GPL-3.0-only. It also incorporates or is built with the software below. Exact license texts copied from the installed npm packages are in `third_party/licenses`.

## Distributed runtime and browser bundle

| Component | Version | License | Use |
| --- | ---: | --- | --- |
| Electron | 43.1.0 | MIT | Desktop runtime |
| concaveman | 2.0.0 | ISC | Browser geometry bundle |
| point-in-polygon | 1.1.0 | MIT | Dependency embedded in the geometry bundle |
| rbush | 4.0.1 | MIT | Dependency embedded in the geometry bundle |
| robust-predicates | 3.0.3 | Unlicense | Dependency embedded in the geometry bundle |
| tinyqueue | 3.0.0 | ISC | Dependency embedded in the geometry bundle |

Electron packages its own `LICENSE.electron.txt` and `LICENSES.chromium.html` files beside the application runtime. Those files contain the Electron license and Chromium component notices for the exact packaged runtime.

## Build tools

| Component | Version | License | Use |
| --- | ---: | --- | --- |
| electron-builder | 26.15.3 | MIT | Windows application and installer packaging |
| esbuild | 0.28.1 | MIT | Reproducible browser bundle generation |
| ResEdit | 3.0.2 | MIT | Windows executable icon resource update |
| NSIS | Packager-managed | zlib/libpng | Windows installer generation |

The NSIS installer can include the `elevate.exe` helper distributed by electron-builder. That helper is from the open-source `win-elevate` project and is licensed under MIT. The packaged binary and all packager-generated runtime notices are checked during release auditing.

The application icons are original Excelsis project artwork and are distributed under the project license.
