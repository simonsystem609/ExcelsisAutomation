' solidworks-watcher.vbs (0.8.4, item A2-full)
' Long-lived COM holder for the Doc/Work-logger status path. Connects ONCE to a
' user-started SOLIDWORKS (never launches one) and, on a self-paced loop, writes
' the active document + open documents as UTF-8 JSON to an output file. The
' Electron main process reads that file spawn-free, so polling SOLIDWORKS no
' longer costs a powershell+cscript spawn per tick. COM reads stay in VBScript
' because PowerShell late binding cannot read the SOLIDWORKS document model.
'
' Args: 0 = output file path, 1 = interval ms (optional, default 1500)
Option Explicit
On Error Resume Next

Dim outPath, intervalMs
outPath = WScript.Arguments(0)
If WScript.Arguments.Count > 1 Then
  intervalMs = CLng(WScript.Arguments(1))
Else
  intervalMs = 1500
End If
If intervalMs < 250 Then intervalMs = 250

Function JsonEscape(value)
  Dim text
  text = CStr(value)
  text = Replace(text, "\", "\\")
  text = Replace(text, """", "\""")
  text = Replace(text, vbCrLf, "\n")
  text = Replace(text, vbCr, "\n")
  text = Replace(text, vbLf, "\n")
  text = Replace(text, vbTab, "\t")
  JsonEscape = text
End Function

Function JsonString(value)
  JsonString = """" & JsonEscape(value) & """"
End Function

' Mirrors GetActiveDocumentJsonCore in solidworks-bridge.ps1 (ActiveDoc, then
' IActiveDoc2, then optional GetFirstDocument fallback).
Function GetActiveDocumentJson(sw)
  Dim doc, title, pathName, docType, source
  title = "" : pathName = "" : docType = "" : source = "ActiveDoc"

  Err.Clear
  Set doc = sw.ActiveDoc
  If Err.Number <> 0 Then Err.Clear : Set doc = Nothing
  If doc Is Nothing Then
    Err.Clear
    Set doc = sw.IActiveDoc2
    source = "IActiveDoc2"
    If Err.Number <> 0 Then Err.Clear : Set doc = Nothing
  End If
  If doc Is Nothing Then
    Err.Clear
    Set doc = sw.GetFirstDocument()
    If Err.Number = 0 And Not doc Is Nothing Then
      source = "GetFirstDocument"
    Else
      Err.Clear : Set doc = Nothing
    End If
  End If

  If doc Is Nothing Then
    GetActiveDocumentJson = "{""hasActiveDocument"":false,""title"":"""",""path"":"""",""type"":"""",""source"":""none""}"
    Exit Function
  End If

  Err.Clear : title = CStr(doc.GetTitle()) : If Err.Number <> 0 Then title = "" : Err.Clear
  Err.Clear : pathName = CStr(doc.GetPathName()) : If Err.Number <> 0 Then pathName = "" : Err.Clear
  Err.Clear : docType = CStr(doc.GetType()) : If Err.Number <> 0 Then docType = "" : Err.Clear

  GetActiveDocumentJson = "{""hasActiveDocument"":true,""title"":" & JsonString(title) & _
    ",""path"":" & JsonString(pathName) & ",""type"":" & JsonString(docType) & _
    ",""source"":" & JsonString(source) & "}"
End Function

' Mirrors GetOpenDocumentsJson in solidworks-bridge.ps1.
Function GetOpenDocumentsJson(sw)
  Dim candidate, title, pathName, docType, json, first
  json = "[" : first = True

  Err.Clear
  Set candidate = sw.GetFirstDocument()
  If Err.Number <> 0 Then Err.Clear : GetOpenDocumentsJson = "[]" : Exit Function

  Do While Not candidate Is Nothing
    title = "" : pathName = "" : docType = ""
    Err.Clear : title = CStr(candidate.GetTitle()) : If Err.Number <> 0 Then title = "" : Err.Clear
    Err.Clear : pathName = CStr(candidate.GetPathName()) : If Err.Number <> 0 Then pathName = "" : Err.Clear
    Err.Clear : docType = CStr(candidate.GetType()) : If Err.Number <> 0 Then docType = "" : Err.Clear

    If Len(Trim(pathName)) > 0 Then
      If Not first Then json = json & ","
      json = json & "{""hasActiveDocument"":true,""title"":" & JsonString(title) & _
        ",""path"":" & JsonString(pathName) & ",""type"":" & JsonString(docType) & _
        ",""source"":""GetFirstDocument""}"
      first = False
    End If

    Err.Clear : Set candidate = candidate.GetNext() : If Err.Number <> 0 Then Err.Clear : Exit Do
  Loop

  json = json & "]"
  GetOpenDocumentsJson = json
End Function

' UTF-8 atomic-ish write (ADODB.Stream, overwrite). Paths can contain non-ASCII.
Sub WriteStatus(targetPath, text)
  Dim stream
  Err.Clear
  Set stream = CreateObject("ADODB.Stream")
  If Err.Number <> 0 Then Err.Clear : Exit Sub
  stream.Type = 2
  stream.Charset = "utf-8"
  stream.Open
  stream.WriteText text
  stream.SaveToFile targetPath, 2   ' adSaveCreateOverWrite
  stream.Close
  If Err.Number <> 0 Then Err.Clear
End Sub

Dim sw, probe, payload, adoc, odocs
Set sw = Nothing

Do
  ' Liveness probe: a cheap property read fails if the held instance is gone
  ' (SOLIDWORKS closed/restarted) — drop the reference so we reconnect.
  If Not sw Is Nothing Then
    Err.Clear
    probe = sw.Visible
    If Err.Number <> 0 Then Err.Clear : Set sw = Nothing
  End If

  If sw Is Nothing Then
    Err.Clear
    Set sw = GetObject(, "SldWorks.Application")
    If Err.Number <> 0 Then Err.Clear : Set sw = Nothing
  End If

  If sw Is Nothing Then
    payload = "{""ok"":true,""connected"":false,""activeDocument"":{""hasActiveDocument"":false,""title"":"""",""path"":"""",""source"":""none""},""openDocuments"":[]}"
  Else
    adoc = GetActiveDocumentJson(sw)
    odocs = GetOpenDocumentsJson(sw)
    payload = "{""ok"":true,""connected"":true,""activeDocument"":" & adoc & ",""openDocuments"":" & odocs & "}"
  End If

  WriteStatus outPath, payload
  WScript.Sleep intervalMs
Loop
