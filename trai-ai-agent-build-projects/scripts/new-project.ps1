param(
  [Parameter(Mandatory=$true)][string]$ProjectName,
  [Parameter(Mandatory=$true)][ValidateSet("architecture","task")][string]$Type,
  [string]$Author = "Unknown",
  [string]$Owner,
  [string]$Repository = "N/A",
  [string]$Version = "1.0.0"
)
$domain = $env:USERDOMAIN
if (-not $domain) { $domain = $env:COMPUTERNAME }
if (-not $Owner) { $Owner = "$domain\$($env:USERNAME)" }
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$rootPath = Join-Path (Join-Path $PSScriptRoot "..") "Projects"
$null = New-Item -ItemType Directory -Force -Path $rootPath
$projectFolderName = "{0}_{1}" -f $ProjectName,$timestamp
$projectPath = Join-Path $rootPath $projectFolderName
$null = New-Item -ItemType Directory -Force -Path $projectPath
$templatesPath = Join-Path (Join-Path $PSScriptRoot "..") "templates"
if ($Type -eq "architecture") {
  $templateFile = Join-Path $templatesPath "architecture.template.md"
  $targetFile = Join-Path $projectPath "architecture.md"
} else {
  $templateFile = Join-Path $templatesPath "task.template.md"
  $targetFile = Join-Path $projectPath "task.md"
}
$content = Get-Content -Raw -Path $templateFile
$updated = $content.Replace("{{project_name}}",$ProjectName).Replace("{{author}}",$Author).Replace("{{owner}}",$Owner).Replace("{{version}}",$Version).Replace("{{repository}}",$Repository).Replace("{{last_updated}}",(Get-Date).ToString("yyyy-MM-dd HH:mm:ss"))
Set-Content -Path $targetFile -Value $updated -Encoding UTF8
icacls $projectPath /inheritance:r | Out-Null
icacls $projectPath /grant "${Owner}:(F)" | Out-Null
icacls $projectPath /grant "Administrators:(F)" | Out-Null
icacls $projectPath /grant "Users:(RX)" | Out-Null
$projectPath
