# ============================================================
#  DoceGestar — Mobile Preview Launcher
# ============================================================

$ChromePath  = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$NpmPath     = "C:\Program Files\nodejs\npm.cmd"
$NodePath    = "C:\Program Files\nodejs\node.exe"
$ProjectDir  = "C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto"
$LoadingUrl  = "file:///C:/Users/USUARIO/Desktop/GESTANTE/meu-projeto/loading.html"
$PreviewUrl  = "file:///C:/Users/USUARIO/Desktop/GESTANTE/meu-projeto/mobile-preview.html"
$Port        = 8081

Add-Type -AssemblyName System.Windows.Forms

# ── Verifica dependências ────────────────────────────────────
if (-not (Test-Path $ChromePath)) {
    [System.Windows.Forms.MessageBox]::Show(
        "Chrome não encontrado.`nInstale o Google Chrome e tente novamente.",
        "DoceGestar Preview",
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Error
    )
    exit 1
}

if (-not (Test-Path $NodePath)) {
    [System.Windows.Forms.MessageBox]::Show(
        "Node.js não encontrado.`nInstale o Node.js e tente novamente.",
        "DoceGestar Preview",
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Error
    )
    exit 1
}

# ── Checa se servidor já está rodando ───────────────────────
$portEmUso = netstat -ano | Select-String ":$Port\s"

if ($portEmUso) {
    # Servidor já rodando — abre preview direto
    Start-Process $ChromePath -ArgumentList `
        "--new-window", "--window-size=900,820", "--window-position=100,0", `
        "`"$PreviewUrl`""
    exit 0
}

# ── Abre loading page IMEDIATAMENTE no Chrome ────────────────
Start-Process $ChromePath -ArgumentList `
    "--new-window", "--window-size=900,820", "--window-position=100,0", `
    "`"$LoadingUrl`""

# ── Inicia servidor em janela minimizada ────────────────────
$logFile = Join-Path $ProjectDir "launch-preview.log"

$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName         = "cmd.exe"
$psi.Arguments        = "/c `"$NpmPath`" run web >> `"$logFile`" 2>&1"
$psi.WorkingDirectory = $ProjectDir
$psi.WindowStyle      = [System.Diagnostics.ProcessWindowStyle]::Minimized
$psi.UseShellExecute  = $true

[System.Diagnostics.Process]::Start($psi) | Out-Null

# Script termina aqui — o loading.html faz o polling e redireciona sozinho
