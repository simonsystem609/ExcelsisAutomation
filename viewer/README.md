# ExcelsisView

ExcelsisView is a local Windows desktop application for viewing and editing DXF drawings. This public source tree contains the DXF application only and is the complete corresponding source for the 0.6.7 public release.

## Included functionality

- Open drawings from Windows file association, command line, or drag and drop.
- See bounded geometry thumbnails for supported ASCII DXF drawings in Windows Explorer without starting the desktop application.
- Navigate neighboring drawings in the same folder.
- Use multiple windows while protecting a file from simultaneous writes. The first window is writable; additional windows showing the same file are read-only until the writer closes or moves away.
- Inspect, select, measure, repair, scale, and mirror drawing geometry with the in-app tools.
- Generate sibling copies without modifying the source drawing.

The application processes files locally and does not require a network connection. Its Electron renderer uses context isolation, sandboxing, a narrow preload bridge with trusted-main-frame validation, blocked navigation, denied permission requests, a local-only content policy, production fuses, ASAR integrity validation, and conservative DXF resource ceilings.

Version 0.6.7 accepts DXF inputs up to 64 MiB, 500,000 logical lines, 250,000 code/value pairs, 50,000 parsed or expanded entities, 250,000 geometry points, and 5,000 disconnected features. Generated DXF text is capped at 96 MiB. Files over a ceiling fail closed with a clear error instead of being partially loaded or saved.

The native x64 Explorer thumbnail provider has a separate, tighter 32 MiB input ceiling, with limits of 250,000 code/value pairs, 30,000 parsed entities, 200,000 combined flattened entity visits and expanded INSERT instances, and 200,000 rendered points. It processes files read-only inside Windows' thumbnail host, does not launch Electron, and falls back to the normal icon for unsupported binary DXF files. See [shell/thumbnail-provider/README.md](shell/thumbnail-provider/README.md).

## Source and license

The project is licensed under GPL-3.0-only. Complete corresponding source, pinned dependency metadata, build instructions, and third-party notices are included here and in the tagged 0.6.7 source archive. See [BUILDING.md](BUILDING.md), [SOURCE.md](SOURCE.md), and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The 0.6.7 installer is unsigned, so Windows may show an unknown-publisher warning. Installer, exact source, blockmap, and checksums are published on the immutable `excelsis-view-v0.6.7` GitHub Release.
