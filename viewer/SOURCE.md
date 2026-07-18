# Complete Corresponding Source

This directory is the complete corresponding source for ExcelsisView 0.6.7. The release archive also includes an exact copy under its `source` directory.

Public source location:

https://github.com/simonsystem609/ExcelsisAutomation/tree/main/viewer

Use the pinned dependency graph and commands in `BUILDING.md` to rebuild the application. The generated browser bundle is intentionally included for direct source correspondence and can be recreated with `npm run build:vendor`. The Explorer thumbnail DLL is rebuilt from `shell/thumbnail-provider/src` with pinned Zig 0.16.0 and is intentionally not stored in source control.
