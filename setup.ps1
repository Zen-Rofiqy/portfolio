# ============================================================
#  Setup portfolio - jalankan sekali di komputer baru / fresh
#  Cara pakai:  klik kanan file ini > "Run with PowerShell"
#               atau di terminal:  ./setup.ps1
# ============================================================

Write-Host "== Setup portfolio ==" -ForegroundColor Cyan

# 1. Pastikan Node.js ada. Kalau belum, install lewat winget.
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host ("[OK] Node.js sudah terpasang: " + (node -v)) -ForegroundColor Green
} else {
    Write-Host "[..] Node.js belum ada. Menginstall lewat winget..." -ForegroundColor Yellow
    winget install --id OpenJS.NodeJS.LTS -e --accept-source-agreements --accept-package-agreements

    # Refresh PATH di sesi ini supaya 'node' langsung kebaca tanpa restart
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
                [System.Environment]::GetEnvironmentVariable("Path", "User")

    if (Get-Command node -ErrorAction SilentlyContinue) {
        Write-Host ("[OK] Node.js terpasang: " + (node -v)) -ForegroundColor Green
    } else {
        Write-Host "[!!] Node terinstall tapi belum kebaca. Tutup & buka lagi terminal, lalu jalankan './setup.ps1' sekali lagi." -ForegroundColor Red
        exit 1
    }
}

# 2. Install semua dependency (react, vite, dll) dari package.json
Write-Host "[..] Menjalankan npm install..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "== Selesai! ==" -ForegroundColor Cyan
Write-Host "Jalankan 'npm run dev' untuk preview di http://localhost:5173" -ForegroundColor Green
