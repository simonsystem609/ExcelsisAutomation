# Third-Party Notices

ExcelsisView is distributed under GPL-3.0-only. It also incorporates or is built with the software below. Exact npm, native-runtime, and installer license texts are in `third_party/licenses`.

## Distributed runtime and browser bundle

| Component | Version | License | Use |
| --- | ---: | --- | --- |
| Electron | 43.1.1 | MIT | Desktop runtime |
| concaveman | 2.0.0 | ISC | Browser geometry bundle |
| point-in-polygon | 1.1.0 | MIT | Dependency embedded in the geometry bundle |
| rbush | 4.0.1 | MIT | Dependency embedded in the geometry bundle |
| robust-predicates | 3.0.3 | Unlicense | Dependency embedded in the geometry bundle |
| tinyqueue | 3.0.0 | ISC | Dependency embedded in the geometry bundle |

Electron packages its own `LICENSE.electron.txt` and `LICENSES.chromium.html` files beside the application runtime. Those files contain the Electron license and Chromium component notices for the exact packaged runtime.

## Native Explorer thumbnail provider

| Component | Version | License | Use |
| --- | ---: | --- | --- |
| Zig | 0.16.0 | MIT | Compiler and compiler runtime support |
| LLVM libc++ | Zig 0.16.0 bundled revision | Apache-2.0 WITH LLVM-exception | Statically linked C++ standard library support |
| LLVM libc++abi | Zig 0.16.0 bundled revision | Apache-2.0 WITH LLVM-exception | Statically linked C++ ABI support |
| LLVM libunwind | Zig 0.16.0 bundled revision | Apache-2.0 WITH LLVM-exception | Statically linked exception support |
| MinGW-w64 runtime | Zig 0.16.0 bundled revision | ZPL-2.1 and file-specific terms | Windows native runtime and headers |

The exact notices copied from the verified Zig 0.16.0 distribution are
`zig-0.16.0.txt`, `llvm-libcxx.txt`, `llvm-libcxxabi.txt`,
`llvm-libunwind.txt`, and `mingw-w64-runtime.txt`. Zig itself is a build tool;
the notices are included because runtime and standard-library support code can
be present in the distributed native DLL.

## Build tools

| Component | Version | License | Use |
| --- | ---: | --- | --- |
| electron-builder | 26.15.3 | MIT | Windows application and installer packaging |
| esbuild | 0.28.1 | MIT | Reproducible browser bundle generation |
| ResEdit | 3.0.2 | MIT | Windows executable icon resource update |
| NSIS | 3.0.4.1 | zlib/libpng and bundled-module terms | Windows installer generation |

The complete NSIS and bundled compression-module terms are preserved in
`third_party/licenses/NSIS-COPYING.txt`.

The Windows installer can include `elevate.exe`, copied automatically by
electron-builder from its pinned NSIS bundle:

- Program: Elevate 1.0 by Johannes Passing
- Upstream: https://github.com/jpassing/elevate
- Release: https://github.com/jpassing/elevate/releases/tag/1.0
- Release commit: `d5cfc93`
- License: MIT
- Executable metadata: Copyright (C) 2007, Johannes Passing
- electron-builder bundle archive: `nsis-3.0.4.1.7z`
- Bundle archive SHA-256 pinned by electron-builder 26.15.3:
  `9877df902530f96357d13a7a31ae2b9df67f48b11ffc9a1700a7c961574ec5fa`

The bundle's `elevate.exe` is not byte-identical to either executable in the
author's standalone 1.0 release archive, but its product/version/copyright
metadata identifies the same Elevate 1.0 codebase. The upstream MIT notice and
this qualification are preserved in
`third_party/licenses/Elevate-MIT.txt`.

The application icons are original Excelsis project artwork and are distributed under the project license.
