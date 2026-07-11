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

| Bagian | Lokasi |
|--------|--------|
| Projek / karya | **Google Sheet** tab `Portfolio` + gambar `public/portfolio/<slug>/cover.jpg` |
| Teks Home & About (subjudul, deskripsi, angka pengalaman) | **Google Sheet** tab `Teks` |
| Qualification / pengalaman | **Google Sheet** tab `Kualifikasi` |
| Testimoni | **Google Sheet** tab `Testimoni` + foto `public/testimonials/` |
| Services | **Google Sheet** tab `Services` |
| Skills | `src/components/skills/` |
| Kontak (form) | `src/components/contact/Contact.jsx` |
| CV (file PDF) | `src/assets/CV_*.pdf` |
| Foto profil | `src/assets/profile-1.jpeg` |
| Foto About | `src/assets/about.jpeg` |

> Semua yang bertanda **Google Sheet** diedit langsung dari Sheet — lihat bagian 6.
> Yang lain tetap diedit di file, lalu commit + push.

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

## 6. Konten via Google Sheet

Hampir semua **teks konten** situs dikendalikan dari **satu Google Sheet** dengan
beberapa tab — bisa diubah dari mana saja (termasuk HP) **tanpa push & tanpa terminal**:

| Tab Sheet | Mengendalikan |
|-----------|---------------|
| `Portfolio` | Kartu projek: judul, kategori, urutan, tampil/sembunyi, link |
| `Teks` | Teks tunggal: subjudul & deskripsi Home, deskripsi & angka-angka About |
| `Kualifikasi` | Timeline Education & Experience |
| `Testimoni` | Nama, isi testimoni, foto |
| `Services` | Kartu layanan: judul, deskripsi, daftar poin, ikon |
| `CV` | Link Google Docs CV mana yang aktif di tombol "Download CV" |

Gambar tetap di repo (`public/portfolio/`, `public/testimonials/`), jadi aman & cepat.
Konfigurasi `SHEET_ID` ada di [src/lib/sheet.js](src/lib/sheet.js).

> Perubahan di Sheet muncul di situs dengan jeda ±5 menit (cache Google). Wajar.
> Kalau `SHEET_ID` dikosongkan, satu tab dihapus, atau Google tak bisa diakses,
> situs otomatis pakai data cadangan di kode — tidak pernah blank.

### Setup sekali (aktifkan Sheet)

1. Buat Google Sheet baru, lalu import tiap file template di bawah:
   `File > Import > Upload` → **Insert new sheet(s)** (sekali import satu file).
   Ganti nama tiap tab (klik kanan tab di kiri bawah) **persis** seperti ini:

   | File template | Nama tab |
   |---------------|----------|
   | [portfolio-sheet-template.csv](sheet-templates/portfolio-sheet-template.csv) | `Portfolio` |
   | [sheet-template-teks.csv](sheet-templates/sheet-template-teks.csv) | `Teks` |
   | [sheet-template-kualifikasi.csv](sheet-templates/sheet-template-kualifikasi.csv) | `Kualifikasi` |
   | [sheet-template-testimoni.csv](sheet-templates/sheet-template-testimoni.csv) | `Testimoni` |
   | [sheet-template-services.csv](sheet-templates/sheet-template-services.csv) | `Services` |
   | [sheet-template-cv.csv](sheet-templates/sheet-template-cv.csv) | `CV` |

2. Ubah kolom **Tampilkan** jadi checkbox: pilih kolomnya → `Insert > Checkbox`
   (di semua tab yang punya kolom itu).
3. `Share` → **Anyone with the link: Viewer**.
4. Salin **ID** dari URL sheet: `docs.google.com/spreadsheets/d/`**`<ID INI>`**`/edit`
   → tempel ke `SHEET_ID` di [src/lib/sheet.js](src/lib/sheet.js),
   lalu commit + push sekali. Setelah ini konten cukup diedit dari Sheet.

> Kalau Sheet lama (tab `Portfolio`) sudah jalan, cukup lakukan langkah 1–2 untuk
> tab-tab baru di Sheet yang sama — `SHEET_ID` tidak berubah.

### Kolom per tab

**`Portfolio`**

| Kolom | Isi |
|-------|-----|
| Tampilkan | Checkbox. Dicentang = kartu muncul, kosong = disembunyikan |
| Judul | Judul kartu |
| Kategori | `statistics` / `machine learning` / `design` (bebas tambah baru) |
| Folder | Nama folder di `public/portfolio/` (slug), mis. `surveyor-ipm-bandung` |
| Urutan | Angka urutan tampil (kecil = duluan) |
| Link | (Opsional) URL tujuan tombol "Details" |

**`Teks`** — format kunci–nilai

| Kolom | Isi |
|-------|-----|
| Kunci | Jangan diubah — pengenal teks di kode (mis. `home_subjudul`) |
| Teks | Isi teks yang tampil di situs — **ini yang Anda edit** |
| Keterangan | Catatan bebas untuk Anda sendiri, tidak dibaca situs |

Kunci yang tersedia: `home_subjudul`, `home_deskripsi`, `about_deskripsi`,
`about_pengalaman`, `about_proyek`, `about_support`.

**`Kualifikasi`**

| Kolom | Isi |
|-------|-----|
| Tampilkan | Checkbox tampil/sembunyi |
| Tab | `Education` atau `Experience` |
| Judul | Nama jurusan / posisi |
| Institusi | Nama sekolah / organisasi / perusahaan |
| Periode | Teks bebas, mis. `Aug 2021 - Aug 2025` |
| Urutan | Urutan dalam tab-nya (kecil = paling atas) |

**`Testimoni`**

| Kolom | Isi |
|-------|-----|
| Tampilkan | Checkbox tampil/sembunyi |
| Nama | Nama pemberi testimoni |
| Deskripsi | Isi testimoni |
| Foto | Nama file di `public/testimonials/`, mis. `testimonial1.png` |
| Urutan | Urutan slide (kecil = duluan) |

**`Services`**

| Kolom | Isi |
|-------|-----|
| Tampilkan | Checkbox tampil/sembunyi |
| Judul | Judul kartu. Untuk 2 baris, tekan **Alt+Enter** di dalam sel |
| Deskripsi | Paragraf di modal "View More" |
| Poin | Daftar layanan, **satu poin per baris** dalam satu sel (Alt+Enter) |
| Ikon | (Opsional) nama ikon [Unicons](https://iconscout.com/unicons), mis. `uil-web-grid` |
| Urutan | Urutan kartu (kecil = duluan) |

**`CV`**

| Kolom | Isi |
|-------|-----|
| Aktif | Checkbox. Centang **satu** baris = itu yang dipakai tombol "Download CV" (kalau lebih dari satu dicentang, yang paling atas dipakai) |
| Nama | Label bebas untuk Anda sendiri, mis. `CV ATS - Data Analyst` (tidak dibaca situs) |
| Link | Link **share/edit** Google Docs-nya (bukan link export) — situs otomatis ubah jadi link download PDF |

> Dokumen di Link wajib `Share` → **Anyone with the link: Viewer**, kalau tidak
> pengunjung situs akan diarahkan ke halaman login Google alih-alih dapat PDF.

### Ganti CV per lamaran (ATS)

Punya beberapa versi CV (mis. disesuaikan ATS per perusahaan)? Upload tiap versi
sebagai Google Docs terpisah, tambah 1 baris per versi di tab `CV` (kolom Nama diisi
bebas untuk penanda), lalu centang **Aktif** di versi yang mau dipakai — cukup
pindah centang, tak perlu commit ataupun push.

### Menambah proyek baru (Portfolio)

1. Buat folder `public/portfolio/<slug-baru>/` dan taruh **`cover.jpg`** di dalamnya
   (boleh juga `01.jpg`, `02.jpg`, … untuk galeri Details nanti). Commit + push.
2. Tambah 1 baris di tab `Portfolio`: centang Tampilkan, isi Judul/Kategori/`Folder` = slug tadi/Urutan.

> Filter kategori (All/Statistics/…) muncul otomatis dari data — tak perlu edit kode.

### Menambah foto testimoni baru

Taruh file foto di `public/testimonials/` (commit + push sekali), lalu tulis nama
filenya di kolom `Foto` tab `Testimoni`.

## 7. Referensi

- Video setup awal: https://youtu.be/xvKe4vFNnVg
- Node.js: https://nodejs.org/en
- Vite: https://vite.dev/guide/
- Swiper (slider): https://swiperjs.com/get-started
- EmailJS (form kontak): https://www.emailjs.com/docs/sdk/installation/
