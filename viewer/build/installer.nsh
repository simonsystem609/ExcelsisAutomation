!include "LogicLib.nsh"
!include "x64.nsh"

!macro customInstall
  ${IfNot} ${RunningX64}
    MessageBox MB_ICONSTOP "ExcelsisView requires 64-bit Windows."
    Abort
  ${EndIf}

  ${If} ${FileExists} "$WINDIR\Sysnative\regsvr32.exe"
    StrCpy $R1 "$WINDIR\Sysnative\regsvr32.exe"
  ${Else}
    StrCpy $R1 "$SYSDIR\regsvr32.exe"
  ${EndIf}
  ExecWait '"$R1" /s "$INSTDIR\resources\shell\ExcelsisDxfThumbnailProvider.dll"' $R0
  ${If} $R0 != 0
    MessageBox MB_ICONSTOP "Windows Explorer thumbnail registration failed (code $R0)."
    Abort
  ${EndIf}
!macroend

!macro customUnInstall
  ${If} ${RunningX64}
    ${If} ${FileExists} "$WINDIR\Sysnative\regsvr32.exe"
      StrCpy $R1 "$WINDIR\Sysnative\regsvr32.exe"
    ${Else}
      StrCpy $R1 "$SYSDIR\regsvr32.exe"
    ${EndIf}
    ExecWait '"$R1" /u /s "$INSTDIR\resources\shell\ExcelsisDxfThumbnailProvider.dll"' $R0
  ${EndIf}
!macroend
