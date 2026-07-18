param(
  [switch]$RunTests
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$root = Split-Path -Parent $PSScriptRoot
$providerRoot = Join-Path $root 'shell\thumbnail-provider'
$sourceRoot = Join-Path $providerRoot 'src'
$testRoot = Join-Path $providerRoot 'tests'
$binRoot = Join-Path $providerRoot 'bin\x64'
$objectRoot = Join-Path $providerRoot 'obj\x64'

$zig = $env:EXCELSIS_ZIG
if ([string]::IsNullOrWhiteSpace($zig)) {
  $zigCommand = Get-Command zig.exe -ErrorAction SilentlyContinue
  if ($null -ne $zigCommand) {
    $zig = $zigCommand.Source
  }
}
if ([string]::IsNullOrWhiteSpace($zig) -or -not (Test-Path -LiteralPath $zig -PathType Leaf)) {
  throw 'Zig 0.16.0 is required. Set EXCELSIS_ZIG to the absolute path of zig.exe.'
}
$zigVersion = (& $zig version).Trim()
if ($LASTEXITCODE -ne 0 -or $zigVersion -ne '0.16.0') {
  throw "Expected Zig 0.16.0, found '$zigVersion'."
}

New-Item -ItemType Directory -Path $binRoot -Force | Out-Null
New-Item -ItemType Directory -Path $objectRoot -Force | Out-Null
$env:ZIG_GLOBAL_CACHE_DIR = Join-Path $objectRoot 'zig-global-cache'
$env:ZIG_LOCAL_CACHE_DIR = Join-Path $objectRoot 'zig-local-cache'
New-Item -ItemType Directory -Path $env:ZIG_GLOBAL_CACHE_DIR -Force | Out-Null
New-Item -ItemType Directory -Path $env:ZIG_LOCAL_CACHE_DIR -Force | Out-Null

$common = @(
  'c++',
  '-target', 'x86_64-windows-gnu',
  '-std=c++20',
  '-O2',
  '-static',
  '-DUNICODE',
  '-D_UNICODE',
  '-DWIN32_LEAN_AND_MEAN',
  '-DNOMINMAX',
  '-fstack-protector-strong',
  '-Wall',
  '-Wextra',
  '-Wpedantic',
  '-Wno-nullability-completeness',
  '-Wno-dll-attribute-on-redeclaration'
)
$libraries = @('-lole32', '-lgdi32', '-lshell32', '-ladvapi32', '-luuid')
$providerPath = Join-Path $binRoot 'ExcelsisDxfThumbnailProvider.dll'
$providerArguments = $common + @(
  '-shared',
  '-s',
  '-o', $providerPath,
  (Join-Path $sourceRoot 'dxf_thumbnail_core.cpp'),
  (Join-Path $sourceRoot 'thumbnail_provider.cpp')
) + $libraries
& $zig @providerArguments
if ($LASTEXITCODE -ne 0) {
  throw "Thumbnail provider compilation failed with exit code $LASTEXITCODE."
}
if (-not (Test-Path -LiteralPath $providerPath -PathType Leaf)) {
  throw 'Thumbnail provider output is missing.'
}
& (Get-Command node.exe -ErrorAction Stop).Source (Join-Path $PSScriptRoot 'stamp-thumbnail-provider.cjs') $providerPath
if ($LASTEXITCODE -ne 0) {
  throw "Thumbnail provider metadata stamping failed with exit code $LASTEXITCODE."
}

if ($RunTests) {
  $testPath = Join-Path $objectRoot 'thumbnail_provider_tests.exe'
  $testArguments = $common + @(
    '-municode',
    '-s',
    '-o', $testPath,
    (Join-Path $testRoot 'thumbnail_provider_tests.cpp')
  ) + $libraries
  & $zig @testArguments
  if ($LASTEXITCODE -ne 0) {
    throw "Thumbnail test compilation failed with exit code $LASTEXITCODE."
  }
  $smokeBitmap = Join-Path $objectRoot 'thumbnail-smoke.bmp'
  & $testPath $providerPath $smokeBitmap
  if ($LASTEXITCODE -ne 0) {
    throw "Thumbnail provider tests failed with exit code $LASTEXITCODE."
  }
}

$hash = (Get-FileHash -LiteralPath $providerPath -Algorithm SHA256).Hash
Write-Host "Thumbnail provider: $providerPath"
Write-Host "SHA-256: $hash"
