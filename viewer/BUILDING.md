# Building ExcelsisView

## Requirements

- Windows 10 or Windows 11
- Node.js 24 or newer
- npm 11 or newer
- Zig 0.16.0 for the native x64 Explorer thumbnail provider

Set `EXCELSIS_ZIG` to the absolute path of `zig.exe`, or put Zig 0.16.0 on
`PATH`. Use the official Windows x86_64 archive from
<https://ziglang.org/download/> and verify it against Zig's published SHA-256
value before extraction.

The pinned Windows x86_64 Zig 0.16.0 archive is `97,217,739` bytes with
SHA-256 `68659eb5f1e4eb1437a722f1dd889c5a322c9954607f5edcf337bc3684a75a7e`.

The dependency graph is pinned by `package-lock.json`. The browser geometry bundle is rebuilt from its npm source during every package build.

## Commands

```powershell
npm ci
npm run test:shell
npm run verify
npm run dist
npm run audit:runtime -- "dist/win-unpacked/ExcelsisView.exe"
```

`npm run dist` first runs Electron's official checksummed runtime installer, rebuilds the vendored browser bundle, collects dependency license files, compiles and tests the native thumbnail provider, runs the release checks, and then creates the NSIS installer in `dist`. The runtime audit reads the final executable's fuse wire, verifies the embedded `app.asar` integrity hash, and audits the packaged provider without launching the application.

The thumbnail build uses a project-local Zig cache under the ignored
`shell/thumbnail-provider/obj` directory. The generated DLL is written to the
ignored `shell/thumbnail-provider/bin` directory and is copied into the final
application resources by electron-builder.

For an unpacked packaging check without creating an installer:

```powershell
npm run pack
```

The installer is not code-signed. Release checksums must be generated from the final installer and distributed with it. Build timestamps and installer metadata mean independent builds are not expected to be byte-for-byte identical, but all application source and exact dependency versions are present.

Do not launch the unpacked application as a release test. Install the candidate and test that installed build before publishing it.
