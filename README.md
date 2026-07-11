# Portfolio — Panduan Update

Website portfolio pribadi. Dibangun dengan **React + Vite**, di-deploy otomatis ke **Vercel**.

- Live: https://zen-rofiqy-portfolio.vercel.app
- Repo: https://github.com/Zen-Rofiqy/portfolio

> Catatan penting: ini **bukan** HTML statis biasa — perlu Node.js untuk preview & build.
> Deploy otomatis: **setiap `git push` ke branch `main`, Vercel langsung build & publish.**

---

## 1. Setup awal (sekali saja per komputer)

Kalau Node.js belum terpasang, cukup jalankan script ini di PowerShell dari folder repo:

```powershell
./setup.ps1
```

Script otomatis: install Node.js (via winget) → refresh PATH → `npm install`.

> Kalau setelah install `node` belum kebaca, **tutup & buka lagi terminal**, lalu jalankan `./setup.ps1` sekali lagi.

Alternatif manual (kalau tidak mau pakai script): install Node.js LTS dari https://nodejs.org/en , lalu jalankan `npm install`.

---

## 2. Alur update rutin

```powershell
npm run dev
```

Buka **http://localhost:5173** — perubahan langsung tampil realtime tiap kali file disimpan (HMR).

Edit konten (lihat "Peta konten" di bawah), lalu cek build tidak error:

```powershell
npm run build
```

Terakhir, push — Vercel akan auto-deploy (±1 menit):

```powershell
git add -A
git commit -m "update portfolio"
git push
```

---

## 3. Peta konten — mau ubah apa, edit di mana

| Bagian | Lokasi file |
|--------|-------------|
| Projek / karya | **Google Sheet** (lihat bagian 6) + gambar `public/portfolio/<slug>/cover.jpg` |
| Testimoni | `src/components/testimonials/Data.jsx` + `src/assets/testimonial*.png` |
| Home / intro | `src/components/home/` |
| About | `src/components/about/` + `src/assets/about.jpeg` |
| Skills | `src/components/skills/` |
| Qualification / pengalaman | `src/components/qualification/Qualification.jsx` |
| Services | `src/components/services/Services.jsx` |
| Kontak (form) | `src/components/contact/Contact.jsx` |
| CV (file PDF) | `src/assets/CV_*.pdf` |
| Foto profil | `src/assets/profile-1.jpeg` |

> Ganti gambar: taruh file di `src/assets/`, lalu sesuaikan `import` di komponen terkait.
> Jangan lupa nama file rapi (hindari ekstensi ganda seperti `.jpg.jpeg`).

---

## 4. Perintah npm

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Preview lokal (localhost:5173), auto-reload |
| `npm run build` | Build produksi ke folder `dist/` (cek error) |
| `npm run preview` | Preview hasil build produksi |
| `npm run lint` | Cek kualitas kode (ESLint) |

---

## 6. Portfolio via Google Sheet

Bagian **Portfolio** dikendalikan dari Google Sheet — teks, urutan, dan tampil/sembunyi
kartu bisa Anda ubah dari mana saja (termasuk HP) **tanpa push & tanpa terminal**.
Gambar tetap di repo (`public/portfolio/`), jadi aman & cepat.

### Setup sekali (aktifkan Sheet)

1. Buka [portfolio-sheet-template.csv](portfolio-sheet-template.csv) → buat Google Sheet
   baru → `File > Import > Upload` file itu → **Replace current sheet**.
2. Ganti nama tab (di kiri bawah) menjadi **`Portfolio`** (harus persis).
3. Ubah kolom **Tampilkan** jadi checkbox: pilih kolomnya → `Insert > Checkbox`.
4. `Share` → **Anyone with the link: Viewer**.
5. Salin **ID** dari URL sheet: `docs.google.com/spreadsheets/d/`**`<ID INI>`**`/edit`
   → tempel ke `SHEET_ID` di [src/components/work/Data.jsx](src/components/work/Data.jsx),
   lalu commit + push sekali. Setelah ini konten cukup diedit dari Sheet.

> Perubahan di Sheet muncul di situs dengan jeda ±5 menit (cache Google). Wajar.
> Kalau `SHEET_ID` dikosongkan atau Google tak bisa diakses, situs otomatis pakai
> data cadangan di `Data.jsx` — tidak pernah blank.

### Kolom Sheet

| Kolom | Isi |
|-------|-----|
| Tampilkan | Checkbox. Dicentang = kartu muncul, kosong = disembunyikan |
| Judul | Judul kartu |
| Kategori | `statistics` / `machine learning` / `design` (bebas tambah baru) |
| Folder | Nama folder di `public/portfolio/` (slug), mis. `surveyor-ipm-bandung` |
| Urutan | Angka urutan tampil (kecil = duluan) |
| Link | (Opsional) URL tujuan tombol "Details" |

### Menambah proyek baru

1. Buat folder `public/portfolio/<slug-baru>/` dan taruh **`cover.jpg`** di dalamnya
   (boleh juga `01.jpg`, `02.jpg`, … untuk galeri Details nanti). Commit + push.
2. Tambah 1 baris di Sheet: centang Tampilkan, isi Judul/Kategori/`Folder` = slug tadi/Urutan.

> Filter kategori (All/Statistics/…) muncul otomatis dari data — tak perlu edit kode.

## 7. Referensi

- Video setup awal: https://youtu.be/xvKe4vFNnVg
- Node.js: https://nodejs.org/en
- Vite: https://vite.dev/guide/
- Swiper (slider): https://swiperjs.com/get-started
- EmailJS (form kontak): https://www.emailjs.com/docs/sdk/installation/
