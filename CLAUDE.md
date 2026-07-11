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
- **Hampir semua teks konten digerakkan Google Sheet** (satu spreadsheet, banyak tab):
  `Portfolio`, `Teks` (Home/About), `Kualifikasi`, `Testimoni`, `Services`, `Skills`, `CV`,
  `Sosial` (ikon sosial samping & footer), `Kontak` (kartu "Talk to me") — diedit
  dari Sheet, bukan file. `SHEET_ID` + utilitas fetch ada di `src/lib/sheet.js`; tiap section
  punya data cadangan di kode (dipakai kalau Sheet tak terjangkau) yang sebaiknya ikut
  disinkronkan saat konten berubah permanen. Detail kolom per tab di README bagian 6.
- Tab `CV` cuma berisi **link** ke Google Docs (bukan file PDF) — kolom `Aktif` menentukan
  versi CV mana yang dipakai tombol "Download CV". Dokumen Gdocs-nya wajib di-share
  "Anyone with the link: Viewer" biar link export PDF-nya bisa diakses publik.
- Konten yang tidak lewat Sheet (nav Header, form kirim pesan EmailJS, dll) diedit di file
  komponen + gambar di `src/assets/`. Foto testimoni di `public/testimonials/`, dan ikon
  sosial custom (Tableau/Kaggle/RPubs/X — yang tak ada di font ikon) di `public/social/`
  sebagai `.svg`, dirujuk kolom `Foto`/`Ikon` di Sheet. Modul sosial (samping + footer)
  dipakai bersama lewat `src/lib/socials.jsx`.
- Deploy = commit + push ke `main` (bukan perintah Vercel manual).

## Konvensi kerja

- **Bahasa:** balas dalam Bahasa Indonesia.
- **Konfirmasi dulu** sebelum aksi yang install software atau men-deploy (push ke `main`
  memicu deploy publik) — jangan lakukan tanpa persetujuan eksplisit.
- **Sebelum push**, jalankan `npm run build` untuk memastikan tidak ada error build.
- **Aset:** taruh gambar/PDF baru di `src/assets/`, lalu sesuaikan `import` di komponen.
  Hindari nama file dengan ekstensi ganda (mis. `.jpg.jpeg`).
  Khusus gambar Portfolio: taruh di `public/portfolio/<slug>/` (cover wajib `cover.jpg`),
  tidak perlu `import` — dirujuk lewat kolom `Folder` di Sheet.

## Lingkungan

- Windows 11, PowerShell. `winget` tersedia. Node.js dipasang via `setup.ps1`.
- Setelah winget meng-install Node, PATH kadang perlu restart terminal agar `node` kebaca.
