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

Dim watcherInstanceId, connectionGeneration, watcherSessionId, nextDocumentToken
Dim previousDocs(), previousTokens(), previousDocCount
Dim currentDocs(), currentTokens(), currentDocCount
Randomize
watcherInstanceId = CStr(Year(Now)) & Right("0" & CStr(Month(Now)), 2) & _
  Right("0" & CStr(Day(Now)), 2) & "-" & CStr(Int(Timer * 1000)) & _
  "-" & CStr(Int(Rnd * 1000000))
connectionGeneration = 0
watcherSessionId = ""
nextDocumentToken = 0
previousDocCount = 0
currentDocCount = 0
ReDim previousDocs(0)
ReDim previousTokens(0)
ReDim currentDocs(0)
ReDim currentTokens(0)

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

Function JsonBool(value)
  If CBool(value) Then JsonBool = "true" Else JsonBool = "false"
End Function

Sub ResetDocumentRegistry()
  Dim i
  For i = 0 To previousDocCount - 1
    Set previousDocs(i) = Nothing
  Next
  For i = 0 To currentDocCount - 1
    Set currentDocs(i) = Nothing
  Next
  previousDocCount = 0
  currentDocCount = 0
  nextDocumentToken = 0
  ReDim previousDocs(0)
  ReDim previousTokens(0)
  ReDim currentDocs(0)
  ReDim currentTokens(0)
End Sub

Sub BeginDocumentRegistrySample()
  Dim i
  For i = 0 To currentDocCount - 1
    Set currentDocs(i) = Nothing
  Next
  currentDocCount = 0
  ReDim currentDocs(0)
  ReDim currentTokens(0)
End Sub

Function DocumentTokenFor(doc)
  Dim i, token
  token = ""
  If doc Is Nothing Then DocumentTokenFor = token : Exit Function

  For i = 0 To currentDocCount - 1
    If doc Is currentDocs(i) Then DocumentTokenFor = currentTokens(i) : Exit Function
  Next
  For i = 0 To previousDocCount - 1
    If doc Is previousDocs(i) Then token = previousTokens(i) : Exit For
  Next
  If Len(token) = 0 Then
    nextDocumentToken = nextDocumentToken + 1
    token = "d" & CStr(nextDocumentToken)
  End If

  If currentDocCount > 0 Then
    ReDim Preserve currentDocs(currentDocCount)
    ReDim Preserve currentTokens(currentDocCount)
  End If
  Set currentDocs(currentDocCount) = doc
  currentTokens(currentDocCount) = token
  currentDocCount = currentDocCount + 1
  DocumentTokenFor = token
End Function

Sub CommitDocumentRegistrySample()
  Dim i
  For i = 0 To previousDocCount - 1
    Set previousDocs(i) = Nothing
  Next
  previousDocCount = currentDocCount
  If previousDocCount > 0 Then
    ReDim previousDocs(previousDocCount - 1)
    ReDim previousTokens(previousDocCount - 1)
    For i = 0 To previousDocCount - 1
      Set previousDocs(i) = currentDocs(i)
      previousTokens(i) = currentTokens(i)
      Set currentDocs(i) = Nothing
    Next
  Else
    ReDim previousDocs(0)
    ReDim previousTokens(0)
  End If
  currentDocCount = 0
  ReDim currentDocs(0)
  ReDim currentTokens(0)
End Sub

' Mirrors GetActiveDocumentJsonCore in solidworks-bridge.ps1 (ActiveDoc, then
' IActiveDoc2, then optional GetFirstDocument fallback).
Function GetActiveDocumentJson(sw, ByRef activeDoc, ByRef activeToken)
  Dim doc, title, pathName, docType, source, identityTrusted
  title = "" : pathName = "" : docType = "" : source = "ActiveDoc"
  activeToken = ""
  Set activeDoc = Nothing

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
    GetActiveDocumentJson = "{""hasActiveDocument"":false,""title"":"""",""path"":"""",""type"":"""",""source"":""none"",""documentToken"":"""",""identityTrusted"":false}"
    Exit Function
  End If

  Set activeDoc = doc
  activeToken = DocumentTokenFor(doc)
  identityTrusted = (source = "ActiveDoc" Or source = "IActiveDoc2")
  Err.Clear : title = CStr(doc.GetTitle()) : If Err.Number <> 0 Then title = "" : Err.Clear
  Err.Clear : pathName = CStr(doc.GetPathName()) : If Err.Number <> 0 Then pathName = "" : Err.Clear
  Err.Clear : docType = CStr(doc.GetType()) : If Err.Number <> 0 Then docType = "" : Err.Clear

  GetActiveDocumentJson = "{""hasActiveDocument"":true,""title"":" & JsonString(title) & _
    ",""path"":" & JsonString(pathName) & ",""type"":" & JsonString(docType) & _
    ",""source"":" & JsonString(source) & ",""documentToken"":" & JsonString(activeToken) & _
    ",""identityTrusted"":" & JsonBool(identityTrusted) & "}"
End Function

' Mirrors GetOpenDocumentsJson in solidworks-bridge.ps1.
Function GetOpenDocumentsJson(sw)
  Dim candidate, title, pathName, docType, docToken, json, first
  json = "[" : first = True

  Err.Clear
  Set candidate = sw.GetFirstDocument()
  If Err.Number <> 0 Then Err.Clear : GetOpenDocumentsJson = "[]" : Exit Function

  Do While Not candidate Is Nothing
    title = "" : pathName = "" : docType = ""
    docToken = DocumentTokenFor(candidate)
    Err.Clear : title = CStr(candidate.GetTitle()) : If Err.Number <> 0 Then title = "" : Err.Clear
    Err.Clear : pathName = CStr(candidate.GetPathName()) : If Err.Number <> 0 Then pathName = "" : Err.Clear
    Err.Clear : docType = CStr(candidate.GetType()) : If Err.Number <> 0 Then docType = "" : Err.Clear

    If Len(Trim(pathName)) > 0 Then
      If Not first Then json = json & ","
      json = json & "{""hasActiveDocument"":true,""title"":" & JsonString(title) & _
        ",""path"":" & JsonString(pathName) & ",""type"":" & JsonString(docType) & _
        ",""source"":""GetFirstDocument"",""documentToken"":" & JsonString(docToken) & "}"
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

Dim sw, probe, payload, adoc, odocs, activeDoc, activeToken
Set sw = Nothing
Set activeDoc = Nothing

Do
  ' Liveness probe: a cheap property read fails if the held instance is gone
  ' (SOLIDWORKS closed/restarted) — drop the reference so we reconnect.
  If Not sw Is Nothing Then
    Err.Clear
    probe = sw.Visible
    If Err.Number <> 0 Then
      Err.Clear
      Set sw = Nothing
      watcherSessionId = ""
      ResetDocumentRegistry
    End If
  End If

  If sw Is Nothing Then
    Err.Clear
    Set sw = GetObject(, "SldWorks.Application")
    If Err.Number <> 0 Then Err.Clear : Set sw = Nothing
    If Not sw Is Nothing Then
      connectionGeneration = connectionGeneration + 1
      watcherSessionId = watcherInstanceId & "-c" & CStr(connectionGeneration)
      ResetDocumentRegistry
    End If
  End If

  If sw Is Nothing Then
    payload = "{""ok"":true,""connected"":false,""watcherSessionId"":"""",""activeDocument"":{""hasActiveDocument"":false,""title"":"""",""path"":"""",""source"":""none"",""documentToken"":"""",""identityTrusted"":false},""openDocuments"":[]}"
  Else
    BeginDocumentRegistrySample
    adoc = GetActiveDocumentJson(sw, activeDoc, activeToken)
    odocs = GetOpenDocumentsJson(sw)
    CommitDocumentRegistrySample
    payload = "{""ok"":true,""connected"":true,""watcherSessionId"":" & JsonString(watcherSessionId) & ",""activeDocument"":" & adoc & ",""openDocuments"":" & odocs & "}"
  End If

  WriteStatus outPath, payload
  WScript.Sleep intervalMs
Loop
