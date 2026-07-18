# Windows Explorer DXF Thumbnails

ExcelsisView includes an x64 `IThumbnailProvider` COM server for Windows
Explorer. The provider is native and runs inside Windows' thumbnail-host
process; it does not start Electron or the desktop application while a folder
is being viewed.

The provider renders black linework on the same light warm background used by
the DXF viewport. It supports common ASCII DXF model-space geometry, including
lines, lightweight and legacy polylines, bulged segments, circles, arcs,
ellipses, spline control or fit paths, solids, block inserts, and insert arrays.
Unsupported entities are ignored. Binary DXF files fall back to the normal
file icon.

## Resource ceilings

- Input stream: 32 MiB
- Code/value pairs: 250,000
- Parsed entities: 30,000
- Combined flattened entity visits and expanded INSERT instances: 200,000
- Render paths: 30,000
- Render points: 200,000
- Blocks: 5,000
- Nested block depth: 8
- Thumbnail dimension: 2,048 pixels per side

Malformed files and files that exceed a ceiling fail without returning a
partial thumbnail. The provider performs no network access, writes no document
data, and does not log filenames or geometry.

## Registration

The NSIS installer calls the provider's `DllRegisterServer` export after the
application files are installed. Registration is per user under `HKCU`, so it
does not replace a machine-wide provider. An existing per-user DXF thumbnail
provider is recorded before Excelsis takes the association. Uninstall restores
that provider when the association still points to Excelsis, then notifies
Explorer that the association changed.

The generated DLL is intentionally excluded from source control. Build and
test it with `npm run test:shell`; packaging rebuilds it from the C++ source.
