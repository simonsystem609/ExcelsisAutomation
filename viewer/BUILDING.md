# Building ExcelsisView

## Requirements

- Windows 10 or Windows 11
- Node.js 24 or newer
- npm 11 or newer

The dependency graph is pinned by `package-lock.json`. The browser geometry bundle is rebuilt from its npm source during every package build.

## Commands

```powershell
npm ci
npm run verify
npm run dist
```

`npm run dist` first runs Electron's official checksummed runtime installer, rebuilds the vendored browser bundle, collects dependency license files, runs the release checks, and then creates the NSIS installer in `dist`.

For an unpacked packaging check without creating an installer:

```powershell
npm run pack
```

The installer is not code-signed. Release checksums must be generated from the final installer and distributed with it. Build timestamps and installer metadata mean independent builds are not expected to be byte-for-byte identical, but all application source and exact dependency versions are present.
