# Excelsis Helper GitHub Page

Static one-page GitHub Pages site for Excelsis Helper, a SOLIDWORKS workflow helper, and ExcelsisView.

## Focus

- SOLIDWORKS workflow helper for recent documents, Work Logger, Doc Search, macros, CAM folders, and SolidCAM controls.
- Macro runner for `Documents\ExcelsisAutomation\Macros`, with migration from the older `Documents\Excelsis\Macros` folder.
- Doc Search, CAM folder helpers, SolidCAM add-in controls, and safe thumbnail/index refresh tools.
- Short macro descriptions for the public-facing macro set.
- Final public ExcelsisView DXF-only viewer/editor for selection, offsets, measurement, mirror, outer-contour repair, and feature review.
- Compact Excelsis3D planning/dev-help section on the same scroll page.
- Current releases:
  - `downloads/ExcelsisHelper-1.2.5-public.1-Setup.exe`
  - `downloads/ExcelsisView-0.6.6-dxf-release.zip`
- Excelsis3D development Discord invite: `https://discord.gg/uJrSBQm68`.
- Support link: `https://buymeacoffee.com/lakatos`.
- GPL-3.0 license text in `LICENSE`.

The Helper download is a sanitized public build with generic, editable example
paths and project prefixes. It is a single self-contained per-machine setup EXE
with bundled SWB macros. The DXF ZIP contains the setup EXE and
the exact corresponding source, pinned dependency lockfile, build scripts,
license notices, and checksums. The same source is published in `viewer/`.
The page links to both downloads through GitHub raw URLs because
the large files are tracked by Git LFS and GitHub Pages does not serve LFS
files directly.

## Files

- `index.html` - page content.
- `styles.css` - responsive styling.
- `script.js` - tiny header behavior.
- `assets/excelsis-recent-documents.png` - recent documents screenshot.
- `assets/excelsis-doc-search.png` - Doc Search screenshot.
- `assets/excelsis-macro-runner.png` - macro runner screenshot.
- `assets/excelsis-dxf-viewer.png` - DXF viewer screenshot.
- `downloads/ExcelsisHelper-1.2.5-public.1-Setup.exe` - sanitized public Helper installer.
- `downloads/ExcelsisView-0.6.6-dxf-release.zip` - source-complete DXF-only viewer release.
- `downloads/ExcelsisView-0.6.6-dxf-release.zip.sha256` - public release checksum.
- `viewer/` - exact ExcelsisView 0.6.6 source and build documentation.
- `.gitattributes` - tracks release ZIPs and the Helper installer EXE with Git LFS.
- `.nojekyll` - tells GitHub Pages to publish the static files as-is.

## Publish

Put the contents of this folder at the root of a GitHub Pages repository, or in
`/docs` if the repository is configured to publish from that folder.
