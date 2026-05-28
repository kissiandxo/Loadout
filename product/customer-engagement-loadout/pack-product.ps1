# pack-product.ps1
# Build the deliverable zips for The Customer Engagement Loadout — Standard tier and Standard+Vault tier.

param(
  [string]$Source = $PSScriptRoot,
  [string]$DistDir = "$PSScriptRoot\dist",
  [string]$Version = 'v1'
)

$ErrorActionPreference = 'Stop'

$StandardName  = "the-customer-engagement-loadout-$Version"
$VaultName     = "the-customer-engagement-loadout-with-vault-$Version"
$StandardStage = Join-Path $DistDir $StandardName
$VaultStage    = Join-Path $DistDir $VaultName
$StandardZip   = Join-Path $DistDir "$StandardName.zip"
$VaultZip      = Join-Path $DistDir "$VaultName.zip"

Write-Host "Source : $Source"
Write-Host "Output : $DistDir"
Write-Host ""

$Include = @(
  'README.md',
  'SETUP-GUIDE.md',
  'PROMPT-CHEAT-SHEET.md',
  'skills',
  'plugins',
  '.claude',
  'dfy-templates'
)

$VaultOnly = @('VAULT-SCRIPTS.md')

$Exclude = @(
  'dist','pack-product.ps1','.git','.DS_Store','Thumbs.db','*.bak','*.tmp','*.local.*'
)

function Build-Stage {
  param([string]$StageDir, [string[]]$Items)
  if (Test-Path $StageDir) { Remove-Item -Recurse -Force $StageDir }
  New-Item -ItemType Directory -Path $StageDir -Force | Out-Null

  foreach ($item in $Items) {
    $src = Join-Path $Source $item
    if (-not (Test-Path $src)) {
      Write-Host "  skip (missing): $item" -ForegroundColor Yellow
      continue
    }
    $dst = Join-Path $StageDir $item
    if ((Get-Item $src).PSIsContainer) {
      Copy-Item -Path $src -Destination $dst -Recurse -Force
      foreach ($pat in $Exclude) {
        Get-ChildItem -Path $dst -Recurse -Force -Filter $pat -ErrorAction SilentlyContinue |
          ForEach-Object { Remove-Item -Recurse -Force $_.FullName }
      }
      Write-Host "  copied dir : $item"
    } else {
      Copy-Item -Path $src -Destination $dst -Force
      Write-Host "  copied file: $item"
    }
  }
}

function Scan-PersonalDataLeaks {
  param([string]$Dir, [string]$TierName)
  $leakPatterns = @(
    'phoenix\.jennings@gateway1\.com\.au',
    'phoenixjennings69',
    '0426\s?779\s?557',
    'gatewaykia\.com\.au',
    'gatewaymitsubishi\.com\.au',
    'Phoenix Jennings',
    'Fairy Meadow',
    'appY5Pmt4thK5T2yL',
    'ntn_207091537267'
  )
  $leaks = @()
  foreach ($p in $leakPatterns) {
    $hits = Get-ChildItem -Path $Dir -Recurse -File | Select-String -Pattern $p -ErrorAction SilentlyContinue
    if ($hits) { $leaks += $hits }
  }
  if ($leaks.Count -gt 0) {
    Write-Host ""
    Write-Host "ABORT: personal-data leak in $TierName staging:" -ForegroundColor Red
    $leaks | ForEach-Object { Write-Host ("  {0}:{1}: {2}" -f $_.Path, $_.LineNumber, $_.Line) -ForegroundColor Red }
    throw "Personal data found in $TierName bundle. Fix or update the exclude list."
  }
}

function Build-Zip {
  param([string]$StageDir, [string]$ZipPath)
  if (Test-Path $ZipPath) { Remove-Item $ZipPath -Force }
  Compress-Archive -Path "$StageDir\*" -DestinationPath $ZipPath -CompressionLevel Optimal
}

Write-Host "=== Building Standard tier ===" -ForegroundColor Cyan
Build-Stage -StageDir $StandardStage -Items $Include
Scan-PersonalDataLeaks -Dir $StandardStage -TierName 'Standard'
Build-Zip -StageDir $StandardStage -ZipPath $StandardZip
$stdSize = [math]::Round((Get-Item $StandardZip).Length / 1KB, 1)
Write-Host "  -> $StandardZip ($stdSize KB)" -ForegroundColor Green
Write-Host ""

Write-Host "=== Building Standard + Vault tier ===" -ForegroundColor Cyan
Build-Stage -StageDir $VaultStage -Items ($Include + $VaultOnly)
Scan-PersonalDataLeaks -Dir $VaultStage -TierName 'Standard+Vault'
Build-Zip -StageDir $VaultStage -ZipPath $VaultZip
$vaultSize = [math]::Round((Get-Item $VaultZip).Length / 1KB, 1)
Write-Host "  -> $VaultZip ($vaultSize KB)" -ForegroundColor Green
Write-Host ""

Write-Host "=== Done ===" -ForegroundColor Green
Write-Host "Standard tier:        $StandardZip ($stdSize KB)"
Write-Host "Standard + Vault:     $VaultZip ($vaultSize KB)"
