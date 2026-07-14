; NSIS hooks for Excelsis Helper.
;
; User Documents paths are intentionally handled by the de-elevated app, not
; this per-machine installer. On first startup for each app version, main.cjs
; copies bundled source macros into the logged-in user's Documents folder and
; backs up differing existing macros before replacement.

!macro customInstall
  ; Interactive installs launch once so a bundled settings preset can fill only
  ; missing values. Existing settings always win. Silent installs never launch
  ; the app, which keeps managed deployment non-interactive.
  ${IfNot} ${Silent}
    ${StdUtils.ExecShellAsUser} $0 "$launchLink" "open" ""
  ${EndIf}
!macroend

!macro customUnInstall
  ; Preserve Documents\Excelsis Helper and Electron userData on uninstall so
  ; settings, work logs, caches, diagnostics, and macro backups survive repair
  ; installs and upgrades.
!macroend
