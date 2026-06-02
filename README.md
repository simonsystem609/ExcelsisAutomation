# ExcelsisAutomation GitHub Page

Static one-page GitHub Pages site for ExcelsisAutomation and ExcelsisView.

## Focus

- SOLIDWORKS-connected recent documents.
- Macro runner for `Documents\ExcelsisAutomation\Macros`, with migration from the older `Documents\Excelsis\Macros` folder.
- Doc Search, CAM folder helpers, SolidCAM add-in controls, and safe thumbnail/index refresh tools.
- Short macro descriptions for the public-facing macro set.
- Separate ExcelsisView DXF viewer/editor for selection, offsets, measurement, mirror, outer-contour repair, and feature review.
- Compact Excelsis3D planning/dev-help section on the same scroll page.
- Current release ZIPs:
  - `downloads/ExcelsisAutomation-0.5.76-release.zip`
  - `downloads/ExcelsisView-0.5.62-release.zip`
- Excelsis3D development Discord invite: `https://discord.gg/uJrSBQm68`.
- Support link: `https://buymeacoffee.com/lakatos`.
- GPL-3.0 license text in `LICENSE`.

The Automation ZIP contains the setup EXE, `macros/`, and
`app-modules/automation/`. The DXF ZIP contains the setup EXE and
`app-modules/dxf/`. The page links to the ZIPs through GitHub raw URLs because
large ZIPs are tracked by Git LFS and GitHub Pages does not serve LFS files
directly.

## Files

- `index.html` - page content.
- `styles.css` - responsive styling.
- `script.js` - tiny header behavior.
- `assets/excelsis-recent-documents.png` - recent documents screenshot.
- `assets/excelsis-doc-search.png` - Doc Search screenshot.
- `assets/excelsis-macro-runner.png` - macro runner screenshot.
- `assets/excelsis-dxf-viewer.png` - DXF viewer screenshot.
- `downloads/ExcelsisAutomation-0.5.76-release.zip` - Automation installer folder ZIP.
- `downloads/ExcelsisView-0.5.62-release.zip` - DXF viewer installer folder ZIP.
- `.gitattributes` - tracks release ZIPs with Git LFS.
- `.nojekyll` - tells GitHub Pages to publish the static files as-is.

## Publish

Put the contents of this folder at the root of a GitHub Pages repository, or in
`/docs` if the repository is configured to publish from that folder.
