# Complete Corresponding Source

This directory is the complete corresponding source for the public ExcelsisView 0.6.7 DXF-only release. The immutable `excelsis-view-v0.6.7` GitHub Release publishes the installer, blockmap, checksums, and a source ZIP generated from the tagged `viewer/` tree.

Public source location:

https://github.com/simonsystem609/ExcelsisAutomation/tree/excelsis-view-v0.6.7/viewer

Use the pinned dependency graph and commands in `BUILDING.md` to rebuild the application. The generated browser bundle is intentionally included for direct source correspondence and can be recreated with `npm run build:vendor`. The Explorer thumbnail DLL is rebuilt from `shell/thumbnail-provider/src` with pinned Zig 0.16.0 and is intentionally not stored in source control.
