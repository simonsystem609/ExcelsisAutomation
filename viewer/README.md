# ExcelsisView

ExcelsisView is a local Windows desktop application for viewing and editing DXF drawings. This public release contains the DXF application only.

## Included functionality

- Open drawings from Windows file association, command line, or drag and drop.
- Navigate neighboring drawings in the same folder.
- Use multiple windows while protecting a file from simultaneous writes. The first window is writable; additional windows showing the same file are read-only until the writer closes or moves away.
- Inspect, select, measure, repair, scale, and mirror drawing geometry with the in-app tools.
- Generate sibling copies without modifying the source drawing.

The application processes files locally and does not require a network connection. Its Electron renderer uses context isolation, sandboxing, a narrow preload bridge, blocked navigation, denied permission requests, and a local-only content policy.

## Source and license

The project is licensed under GPL-3.0-only. Complete corresponding source, pinned dependency metadata, build instructions, and third-party notices are included here and in the release archive. See [BUILDING.md](BUILDING.md), [SOURCE.md](SOURCE.md), and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The Windows installer is currently unsigned. Verify its SHA-256 value against the checksum file shipped beside it in the release archive.
