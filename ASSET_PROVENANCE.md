# Public Asset Provenance

This record covers the project-owned screenshots served by the repository root.

## Excelsis Helper screenshots

The following PNG files are project-owned captures generated on 2026-07-18
from the Excelsis Helper 1.3.9 public source staging tree:

| File | SHA-256 |
|---|---|
| `assets/excelsis-recent-documents.png` | `D3D3289230D502F7C0C81068D22A152DCB5D54245F5B51FCEF4329A863BEAAF8` |
| `assets/excelsis-doc-search.png` | `62C3F6923DB522387BFEE65F1050B11C2422B902D1A5959159E7A74ED6D9B229` |
| `assets/excelsis-macro-runner.png` | `3FF0A8F8FF6BC415CD277D98C100DC4C4EFD508B0562436382EE27FA410F4AEB` |

They render the real project HTML, CSS, and JavaScript through the project-owned
static harness at `helper/tools/renderer-harness/`. The harness supplies only
generic `C:\Demo` document paths, generic fixture names, and project-authored
macro descriptions. Chromium captured each view at 1180 by 760 pixels from a
localhost server. Electron, SOLIDWORKS, customer files, private settings, and
user branding folders were not opened or used.

The visible Helper icon is the same project-owned icon distributed in the
public Helper source and documented in `helper/docs/PROVENANCE.md`. No stock
photo, third-party logo, Om artwork, fleur-de-lis artwork, or generated artwork
appears in these replacement screenshots.

The capture source and mock data are included in corresponding source, so the
screens can be regenerated and reviewed without an installed Helper instance.

## ExcelsisView screenshot

`assets/excelsis-dxf-viewer.png` is a project-owned application screenshot
captured and supplied by the repository owner. The owner also created the board
geometry shown in the viewport and authorizes redistribution with this project
under GPL-3.0-only. File and path labels were obscured before publication; no
customer drawing or third-party visual asset is distributed with the image.

The PNG is 1,230 by 817 pixels and has SHA-256
`312E9102D2DCD277FBA733BA8F796B1E4A71F45CE812AA0F587F25646C184641`.
It was first committed on 2026-07-12 in commit `506c084`. The original DXF is
not part of the repository and is not required to build or use ExcelsisView.
