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
  - `downloads/ExcelsisHelper-1.4.1-public.1-Setup.exe`
  - `downloads/ExcelsisHelper-1.4.1-public.1-source.zip`
  - `ExcelsisView-Setup-0.6.7.exe` on the tagged Viewer GitHub Release
  - `ExcelsisView-0.6.7-source.zip` on the same immutable Release
- Excelsis3D development Discord invite: `https://discord.gg/uJrSBQm68`.
- Support link: `https://buymeacoffee.com/lakatos`.
- GPL-3.0 license text in `LICENSE`.

The Helper download is a sanitized public build with generic, editable defaults
and no embedded deployment preset. A shop may place a Settings-export JSON file
beside the same installer for a private deployment; that external file is not
part of the public release. The setup EXE bundles the public SWB macros. Its
exact corresponding source, pinned dependency lockfile, build scripts, tests,
provenance, and license notices are published in `helper/` and in the source
ZIP. The installer is not Authenticode-signed, so Windows may show an
unknown-publisher warning. The DXF-only `0.6.7` release likewise publishes its
unsigned setup EXE, blockmap, checksums, and exact corresponding source. The
`viewer/` tree contains that tagged source. The page links both current apps to
versioned GitHub Release assets rather than mutable branch downloads.

## Files

- `index.html` - page content.
- `styles.css` - responsive styling.
- `script.js` - tiny header behavior.
- `assets/excelsis-recent-documents.png` - recent documents screenshot.
- `assets/excelsis-doc-search.png` - Doc Search screenshot.
- `assets/excelsis-macro-runner.png` - macro runner screenshot.
- `ASSET_PROVENANCE.md` - source, capture method, and hashes for public images.
- `assets/excelsis-dxf-viewer.png` - DXF viewer screenshot.
- `downloads/ExcelsisHelper-1.4.1-public.1-Setup.exe` - sanitized public Helper installer.
- `downloads/ExcelsisHelper-1.4.1-public.1-Setup.exe.blockmap` - installer update blockmap.
- `downloads/ExcelsisHelper-1.4.1-public.1-source.zip` - exact corresponding Helper source.
- `downloads/ExcelsisHelper-1.4.1-public.1-SHA256SUMS.txt` - Helper artifact checksums.
- `downloads/ExcelsisView-0.6.6-dxf-release.zip` - preserved historical 0.6.6 DXF-only release.
- `downloads/ExcelsisView-0.6.6-dxf-release.zip.sha256` - historical 0.6.6 checksum.
- `helper/` - exact Excelsis Helper 1.4.1-public.1 source and build documentation.
- `viewer/` - exact ExcelsisView 0.6.7 DXF-only source and build documentation.
- `.gitattributes` - tracks release ZIPs and the Helper installer EXE with Git LFS.
- `.nojekyll` - tells GitHub Pages to publish the static files as-is.

## Publish

Put the contents of this folder at the root of a GitHub Pages repository, or in
`/docs` if the repository is configured to publish from that folder.
