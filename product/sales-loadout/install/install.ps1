# LOADOUT auto-installer (Windows / PowerShell)
# Installs a kit's skills + slash commands + plugins into Claude Code.
# Driven by manifest.json. Generic across kits -- no kit-specific logic here.
#
# Usage (the LOADOUT installer agent calls this for you):
#   Project install (recommended):  .\install.ps1 -Mode project -Target "C:\path\to\your\project"
#   Global install:                 .\install.ps1 -Mode global
#   (testing)                       .\install.ps1 -Mode global -HomeOverride "C:\temp\fakehome"
#
# Emits a machine-readable summary between [LOADOUT-RESULT] ... [/LOADOUT-RESULT]
# so the agent can report accurately, plus a human-readable log.

param(
  [ValidateSet('project','global')][string]$Mode = 'project',
  [string]$Target,
  [string]$HomeOverride,
  [string]$KitRoot = (Split-Path $PSScriptRoot -Parent)
)

$ErrorActionPreference = 'Stop'
$script:warnings = @()
$script:errors   = @()
$script:logLines = @()

function Write-Log { param([string]$m) $script:logLines += ("{0}  {1}" -f (Get-Date).ToString('HH:mm:ss'), $m); Write-Host $m }

# --- Load manifest -----------------------------------------------------------
$manifestPath = Join-Path $PSScriptRoot 'manifest.json'
if (-not (Test-Path $manifestPath)) { throw ("manifest.json not found next to install.ps1: " + $manifestPath) }
$manifest = Get-Content -Raw -Path $manifestPath | ConvertFrom-Json
$kit = $manifest.kit
Write-Log ("LOADOUT installer - {0} ({1})" -f $manifest.displayName, $manifest.version)

# --- State + logs ------------------------------------------------------------
$homeDir  = if ($HomeOverride) { $HomeOverride } else { $env:USERPROFILE }
$stateDir = Join-Path $homeDir ("loadout\" + $kit)
$logDir   = Join-Path $stateDir 'logs'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$logFile  = Join-Path $logDir ("install-" + (Get-Date -Format 'yyyyMMdd-HHmmss') + ".log")

# --- Resolve destinations ----------------------------------------------------
if ($Mode -eq 'project') {
  if (-not $Target) { throw "Project mode needs -Target pointing at your project folder" }
  $dest       = $Target
  $skillsDst  = Join-Path $dest 'skills'
  $pluginsDst = Join-Path $dest 'plugins'
  $cmdDst     = Join-Path $dest '.claude\commands'
} else {
  $dest       = Join-Path $homeDir '.claude'
  $skillsDst  = Join-Path $dest 'skills'
  $pluginsDst = Join-Path $dest 'loadout-plugins'
  $cmdDst     = Join-Path $dest 'commands'
}
New-Item -ItemType Directory -Force -Path $dest, $skillsDst, $pluginsDst, $cmdDst | Out-Null
Write-Log ("Mode: {0}   Target: {1}" -f $Mode, $dest)

# --- Copy helpers ------------------------------------------------------------
function Copy-Subfolders {
  param([string]$SrcDir, [string]$DstDir, [string]$Label)
  $copied = 0
  if (-not (Test-Path $SrcDir)) { $script:warnings += ("Source '{0}' missing: {1}" -f $Label, $SrcDir); Write-Log ("  ! {0} source missing - skipped" -f $Label); return 0 }
  Get-ChildItem -Path $SrcDir -Directory | ForEach-Object {
    try {
      $d = Join-Path $DstDir $_.Name
      if (Test-Path $d) { Remove-Item -Recurse -Force $d }
      Copy-Item -Path $_.FullName -Destination $d -Recurse -Force
      $copied++
    } catch { $script:errors += ("Failed copying {0} '{1}': {2}" -f $Label, $_.Name, $_.Exception.Message) }
  }
  Write-Log ("  {0} installed: {1}" -f $Label, $copied)
  return $copied
}

function Copy-CommandFiles {
  param([string]$SrcDir, [string]$DstDir)
  $copied = 0; $names = @()
  if (-not (Test-Path $SrcDir)) { $script:warnings += ("Commands source missing: " + $SrcDir); Write-Log "  ! commands source missing - skipped"; return @{ count = 0; names = @() } }
  Get-ChildItem -Path $SrcDir -Filter '*.md' | ForEach-Object {
    try {
      Copy-Item -Path $_.FullName -Destination (Join-Path $DstDir $_.Name) -Force
      $copied++; $names += $_.BaseName
    } catch { $script:errors += ("Failed copying command '{0}': {1}" -f $_.Name, $_.Exception.Message) }
  }
  Write-Log ("  commands installed: {0}" -f $copied)
  return @{ count = $copied; names = $names }
}

# --- Do the install ----------------------------------------------------------
$skillsN  = Copy-Subfolders -SrcDir (Join-Path $KitRoot $manifest.source.skills)  -DstDir $skillsDst  -Label 'skills'
$pluginsN = Copy-Subfolders -SrcDir (Join-Path $KitRoot $manifest.source.plugins) -DstDir $pluginsDst -Label 'plugins'
$cmdRes   = Copy-CommandFiles -SrcDir (Join-Path $KitRoot ($manifest.source.commands -replace '/', '\')) -DstDir $cmdDst

# Don't count the installer's own command as a "product" command
$productCmdNames = @($cmdRes.names | Where-Object { $_ -ne $manifest.installerCommand })
$cmdN = $productCmdNames.Count

# --- Global mode: rewrite relative @skills refs to absolute ------------------
$rewrites = 0
if ($Mode -eq 'global') {
  $absSkills = ($skillsDst -replace '\\', '/')
  Get-ChildItem -Path $cmdDst -Filter '*.md' | ForEach-Object {
    $c = Get-Content -Raw -Path $_.FullName
    $new = $c -replace '@skills/', ("@" + $absSkills + "/")
    if ($new -ne $c) { Set-Content -Path $_.FullName -Value $new -Encoding UTF8; $rewrites++ }
  }
  Write-Log ("  global path rewrites: {0} command file(s)" -f $rewrites)
}

# --- Verify ------------------------------------------------------------------
$exp = $manifest.expectedCounts
$verifyOk = ($skillsN -ge $exp.skills) -and ($cmdN -ge $exp.commands) -and ($pluginsN -ge $exp.plugins)
$sampleCmdPath = Join-Path $cmdDst ($manifest.sampleCommand + '.md')
$sampleOk = Test-Path $sampleCmdPath

# --- Write state -------------------------------------------------------------
if ($script:errors.Count -gt 0) { $status = 'completed-with-errors' }
elseif (-not $verifyOk)         { $status = 'incomplete' }
else                            { $status = 'completed' }

$state = [ordered]@{
  kit          = $kit
  version      = $manifest.version
  mode         = $Mode
  target       = $dest
  installedAt  = (Get-Date).ToString('o')
  counts       = [ordered]@{ skills = $skillsN; commands = $cmdN; plugins = $pluginsN }
  expected     = [ordered]@{ skills = $exp.skills; commands = $exp.commands; plugins = $exp.plugins }
  pathRewrites = $rewrites
  requiredKeys = @($manifest.requiredKeys)
  verifyOk     = [bool]$verifyOk
  sampleCommandPresent = [bool]$sampleOk
  warnings     = @($script:warnings)
  errors       = @($script:errors)
  status       = $status
}
$stateFile = Join-Path $stateDir '.setup-state.json'
($state | ConvertTo-Json -Depth 6) | Set-Content -Path $stateFile -Encoding UTF8
$script:logLines | Set-Content -Path $logFile -Encoding UTF8

# --- Emit machine-readable result for the agent ------------------------------
Write-Host ""
Write-Host "[LOADOUT-RESULT]"
Write-Host ($state | ConvertTo-Json -Depth 6 -Compress)
Write-Host "[/LOADOUT-RESULT]"
Write-Host ""
Write-Host ("State : {0}" -f $stateFile)
Write-Host ("Log   : {0}" -f $logFile)
if ($script:errors.Count -gt 0) { exit 2 } elseif (-not $verifyOk) { exit 1 } else { exit 0 }
