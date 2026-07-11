# CLAUDE.md

Panduan untuk Claude saat bekerja di repo ini.

## Tentang proyek

Website portfolio pribadi (Angga Fathan Rofiqy / Zen-Rofiqy). Stack **React + Vite**.
Deploy otomatis ke **Vercel**: setiap `git push` ke branch `main`, Vercel build & publish.
- Live: https://zen-rofiqy-portfolio.vercel.app

## Cara kerja & update

Detail lengkap ada di [README.md](README.md) — baca itu dulu untuk alur setup, update, dan **peta konten** (tabel "mau ubah apa, edit di mana"). Ringkasnya:

- Setup awal komputer baru: `./setup.ps1` (install Node via winget → `npm install`).
- Preview lokal: `npm run dev` (http://localhost:5173).
- Konten biasanya diedit di file `src/components/*/Data.jsx` + gambar di `src/assets/`.
- Deploy = commit + push ke `main` (bukan perintah Vercel manual).

## Konvensi kerja

- **Bahasa:** balas dalam Bahasa Indonesia.
- **Konfirmasi dulu** sebelum aksi yang install software atau men-deploy (push ke `main`
  memicu deploy publik) — jangan lakukan tanpa persetujuan eksplisit.
- **Sebelum push**, jalankan `npm run build` untuk memastikan tidak ada error build.
- **Aset:** taruh gambar/PDF baru di `src/assets/`, lalu sesuaikan `import` di komponen.
  Hindari nama file dengan ekstensi ganda (mis. `.jpg.jpeg`).

## Lingkungan

- Windows 11, PowerShell. `winget` tersedia. Node.js dipasang via `setup.ps1`.
- Setelah winget meng-install Node, PATH kadang perlu restart terminal agar `node` kebaca.
