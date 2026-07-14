# set-ecoqos.ps1 — tag a process with Windows EcoQoS (PROCESS_POWER_THROTTLING
# EXECUTION_SPEED). This asks the scheduler to treat the process as "efficiency"
# work, which on hybrid Intel CPUs (P/E cores) biases it onto the E-cores.
# Used by Excelsis Helper to keep its own process tree and helper workers off
# the performance cores. Best-effort: silently no-ops on pre-2004 Windows.
param(
  [int]$TargetPid,
  [switch]$IncludeChildren
)

$ErrorActionPreference = 'SilentlyContinue'
if (-not $TargetPid -or $TargetPid -le 0) { exit 0 }

$code = @'
using System;
using System.Runtime.InteropServices;
public static class EcoQoS {
  [StructLayout(LayoutKind.Sequential)]
  struct PROCESS_POWER_THROTTLING_STATE {
    public uint Version;
    public uint ControlMask;
    public uint StateMask;
  }
  [DllImport("kernel32.dll", SetLastError = true)]
  static extern bool SetProcessInformation(IntPtr hProcess, int ProcessInformationClass,
    ref PROCESS_POWER_THROTTLING_STATE ProcessInformation, uint ProcessInformationSize);
  [DllImport("kernel32.dll", SetLastError = true)]
  static extern IntPtr OpenProcess(uint dwDesiredAccess, bool bInheritHandle, uint dwProcessId);
  [DllImport("kernel32.dll")]
  static extern bool CloseHandle(IntPtr hObject);

  const int ProcessPowerThrottling = 4;                              // PROCESS_INFORMATION_CLASS
  const uint EXECUTION_SPEED = 0x1;                                  // PROCESS_POWER_THROTTLING_EXECUTION_SPEED
  const uint CURRENT_VERSION = 1;                                    // PROCESS_POWER_THROTTLING_CURRENT_VERSION
  const uint PROCESS_SET_INFORMATION = 0x0200;

  public static void Throttle(uint pid) {
    IntPtr h = OpenProcess(PROCESS_SET_INFORMATION, false, pid);
    if (h == IntPtr.Zero) return;
    try {
      var s = new PROCESS_POWER_THROTTLING_STATE();
      s.Version = CURRENT_VERSION;
      s.ControlMask = EXECUTION_SPEED;
      s.StateMask = EXECUTION_SPEED;
      SetProcessInformation(h, ProcessPowerThrottling, ref s,
        (uint)Marshal.SizeOf(typeof(PROCESS_POWER_THROTTLING_STATE)));
    } finally {
      CloseHandle(h);
    }
  }
}
'@

try { Add-Type -TypeDefinition $code -ErrorAction Stop } catch { exit 0 }

function Get-EcoQosTargetPids {
  param([int]$RootPid)
  if (-not $IncludeChildren) { return @($RootPid) }
  $targets = New-Object System.Collections.Generic.List[int]
  $queue = New-Object System.Collections.Generic.Queue[int]
  $seen = @{}
  $queue.Enqueue($RootPid)

  $processes = @(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
    Select-Object ProcessId, ParentProcessId)
  if (-not $processes -or $processes.Count -eq 0) { return @($RootPid) }

  while ($queue.Count -gt 0) {
    $pid = [int]$queue.Dequeue()
    if ($seen.ContainsKey($pid)) { continue }
    $seen[$pid] = $true
    $targets.Add($pid) | Out-Null
    foreach ($child in $processes) {
      if ([int]$child.ParentProcessId -eq $pid -and -not $seen.ContainsKey([int]$child.ProcessId)) {
        $queue.Enqueue([int]$child.ProcessId)
      }
    }
  }
  return @($targets.ToArray())
}

foreach ($pid in (Get-EcoQosTargetPids -RootPid $TargetPid)) {
  try { (Get-Process -Id $pid -ErrorAction Stop).PriorityClass = 'Normal' } catch {}
  try { [EcoQoS]::Throttle([uint32]$pid) } catch {}
}
exit 0
