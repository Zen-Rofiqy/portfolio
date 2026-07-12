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
| Isi modal "Details" (deskripsi, media, skill — dipakai Portfolio & Qualification) | **Google Sheet** tab `Details` + `DetailMedia`; file media di `public/portfolio/<slug>/` |
| Teks Home & About (subjudul, deskripsi, angka pengalaman) | **Google Sheet** tab `Teks` |
| Qualification / pengalaman | **Google Sheet** tab `Kualifikasi` (kolom `Folder` menyambung ke modal Details) |
| Testimoni | **Google Sheet** tab `Testimoni` + foto `public/testimonials/` |
| Services | **Google Sheet** tab `Services` |
| CV (tombol Download CV) | **Google Sheet** tab `CV` |
| Skills | **Google Sheet** tab `Skills` (ikon baru: `src/components/skills/icons.jsx`) |
| Ikon sosial (samping Home & footer) | **Google Sheet** tab `Sosial` (ikon custom: `public/social/`) |
| Kontak — kartu "Talk to me" (email/WA/IG) | **Google Sheet** tab `Kontak` |
| Kontak — form kirim pesan | `src/components/contact/Contact.jsx` (EmailJS) |
| Copyright footer | `src/components/footer/Footer.jsx` (tetap `Crypticalcoder` — atribusi template) |
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
| `Skills` | Kartu skill per kategori: nama, level, ikon, urutan |
| `Sosial` | Ikon link sosial di samping Home & footer (LinkedIn, GitHub, Tableau, dst) |
| `Kontak` | Kartu "Talk to me": Email, Whatsapp, Instagram, dst |
| `Details` | Isi modal "Details" per proyek: org, subtitle, meta, deskripsi, skill (1 baris/folder) |
| `DetailMedia` | Daftar media di modal "Details": gambar/PDF/link (1 baris/media) |

Gambar tetap di repo (`public/portfolio/`, `public/testimonials/`, `public/social/`), jadi aman & cepat.
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
   | [sheet-template-portfolio.csv](sheet-templates/sheet-template-portfolio.csv) | `Portfolio` |
   | [sheet-template-teks.csv](sheet-templates/sheet-template-teks.csv) | `Teks` |
   | [sheet-template-kualifikasi.csv](sheet-templates/sheet-template-kualifikasi.csv) | `Kualifikasi` |
   | [sheet-template-testimoni.csv](sheet-templates/sheet-template-testimoni.csv) | `Testimoni` |
   | [sheet-template-services.csv](sheet-templates/sheet-template-services.csv) | `Services` |
   | [sheet-template-cv.csv](sheet-templates/sheet-template-cv.csv) | `CV` |
   | [sheet-template-skills.csv](sheet-templates/sheet-template-skills.csv) | `Skills` |
   | [sheet-template-sosial.csv](sheet-templates/sheet-template-sosial.csv) | `Sosial` |
   | [sheet-template-kontak.csv](sheet-templates/sheet-template-kontak.csv) | `Kontak` |
   | [sheet-template-details.csv](sheet-templates/sheet-template-details.csv) | `Details` |
   | [sheet-template-detailmedia.csv](sheet-templates/sheet-template-detailmedia.csv) | `DetailMedia` |

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
| Folder | (Opsional) slug proyek yang sama dengan tab `Portfolio`/`Details`. Diisi = baris Experience jadi bisa diklik "Details" (buka modal yang sama dengan Portfolio). Kosongkan untuk peran tanpa karya |

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

**`Skills`**

| Kolom | Isi |
|-------|-----|
| Tampilkan | Checkbox tampil/sembunyi |
| Kategori | Nama kategori kartu, mis. `Data Science`, `Database` (bebas tambah baru) |
| Nama | Nama skill, mis. `Python` |
| Level | Teks bebas, mis. `Advanced` / `Intermediate` / `Basic` |
| Icon | Key ikon — **harus** salah satu key yang sudah didaftarkan di [icons.jsx](src/components/skills/icons.jsx) |
| Urutan | Urutan dalam kategorinya (kecil = paling atas) |

> Kategori baru otomatis tampil sebagai kartu baru — tapi urutan **kartu kategori**
> (Data Science duluan, lalu Data Analysis, dst) diatur di `CATEGORIES` pada
> [Data.jsx](src/components/skills/Data.jsx), bukan dari Sheet.

**`Sosial`** — ikon link sosial (samping Home & footer, satu daftar untuk dua tempat)

| Kolom | Isi |
|-------|-----|
| Tampilkan | Checkbox tampil/sembunyi |
| Nama | Label sosial, mis. `LinkedIn` (dipakai untuk tooltip) |
| Ikon | Nama **font-icon** atau **file gambar** — lihat catatan di bawah |
| Link | URL tujuan, mis. `https://github.com/Zen-Rofiqy` |
| Lokasi | `samping` (cuma Home), `footer` (cuma footer), atau `keduanya` |
| Urutan | Urutan tampil (kecil = duluan) |

> **Kolom Ikon** menerima dua bentuk:
> - **Font-icon** kalau logonya tersedia: `uil-linkedin` ([Unicons](https://iconscout.com/unicons))
>   atau `bxl-instagram` / `bx-mail-send` ([Boxicons](https://boxicons.com)).
> - **File gambar** untuk logo yang tak ada di font (Tableau, Kaggle, RPubs, X): taruh `.svg`
>   di `public/social/` lalu tulis nama filenya, mis. `tableau.svg`. Gambar otomatis ikut
>   warna & ukuran seperti ikon font.

**`Kontak`** — kartu "Talk to me" di section Get in touch

| Kolom | Isi |
|-------|-----|
| Tampilkan | Checkbox tampil/sembunyi |
| Judul | Judul kartu, mis. `Email`, `Whatsapp` |
| Ikon | Font-icon atau file gambar (sama seperti tab `Sosial` di atas) |
| Data | Teks yang tampil (email, nomor, username) |
| Link | Tujuan tombol "Write me", mis. `mailto:...`, `https://wa.me/...` |
| Urutan | Urutan kartu (kecil = duluan) |

**`Details`** — isi modal "Details" (1 baris = 1 proyek/folder)

| Kolom | Isi |
|-------|-----|
| Folder | Slug proyek — **wajib sama persis** dengan `Folder` di tab `Portfolio` & nama folder `public/portfolio/<slug>/`. Ini kunci penghubungnya |
| Org | (Opsional) nama organisasi, mis. `IPB University`. Kosong = blok org tak tampil |
| Logo | (Opsional) nama file logo di `public/orgs/` (atau URL penuh), mis. `ipb-university.jpg` |
| LinkOrg | (Opsional) URL profil org (mis. LinkedIn) — nama & logo jadi bisa diklik |
| Subtitle | (Opsional) teks kecil di bawah nama org, mis. `Part-time · On-site` |
| Meta | (Opsional) baris info (tanggal/lokasi), **satu item per baris** dalam satu sel (Alt+Enter) |
| Deskripsi | (Opsional) poin deskripsi, **satu poin per baris** dalam satu sel (Alt+Enter) |
| Skills | (Opsional) tag skill, **satu skill per baris** dalam satu sel (Alt+Enter) |

**`DetailMedia`** — daftar media di modal "Details" (1 baris = 1 media)

| Kolom | Isi |
|-------|-----|
| Folder | Slug proyek — sama dengan kolom `Folder` di tab `Details`. Menyambungkan media ke proyeknya |
| Urutan | Angka urutan media dalam satu proyek (kecil = duluan) |
| Judul | Judul media (wajib), mis. `Certificate of Appreciation` |
| Tipe | `img` (gambar → buka besar/lightbox), `file` (buka tab baru, mis. PDF), atau `link` (URL luar). Kosong = ditebak otomatis dari `Nilai` |
| Nilai | Untuk `img`/`file`: nama file di `public/portfolio/<folder>/`. Untuk `link`: URL penuh |
| Thumb | (Opsional) nama file gambar untuk thumbnail (mis. screenshot halaman-1 PDF). Kosong = ikon placeholder |

> File gambar/PDF tetap ditaruh manual di `public/portfolio/<slug>/` (commit + push);
> Sheet hanya menyimpan *nama file*-nya. Logo org di `public/orgs/`.

### Menambah detail portfolio (modal "Details")

1. Taruh file media (gambar `.jpg`, PDF, dll) di `public/portfolio/<slug>/`, dan logo org
   (kalau ada) di `public/orgs/`. Commit + push.
2. Tambah 1 baris di tab `Details` dengan `Folder` = slug proyek, isi org/deskripsi/skill
   seperlunya (semua opsional kecuali `Folder`).
3. Tambah 1 baris **per media** di tab `DetailMedia` dengan `Folder` yang sama.
4. (Opsional) untuk memunculkan "Details" di Experience, isi kolom `Folder` di tab
   `Kualifikasi` dengan slug yang sama.

> Slug `Folder` dipakai bersama Portfolio & Qualification — satu folder = satu sumber
> konten, muncul di dua tempat tanpa digandakan.

### Menambah sosial / kontak baru

- Kalau **logonya ada di font ikon** (Boxicons/Unicons): cukup tambah 1 baris di tab
  `Sosial`/`Kontak` dan tulis nama ikonnya — tak perlu commit/push.
- Kalau **logonya belum ada** (mis. platform baru): taruh file `.svg` di `public/social/`
  (commit + push sekali), lalu tulis nama filenya di kolom `Ikon`.

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

### Menambah skill baru

- Kalau **ikonnya sudah ada** di [icons.jsx](src/components/skills/icons.jsx): cukup tambah
  1 baris di tab `Skills` (Kategori/Nama/Level/Icon/Urutan) — tak perlu commit/push.
- Kalau **ikonnya belum ada**: perlu commit + push sekali untuk menambah SVG-nya
  sebagai entry baru di `icons.jsx` (key baru, mis. `matlab`), baru key itu dipakai
  di kolom `Icon` tab `Skills`.

## 7. Referensi

- Video setup awal: https://youtu.be/xvKe4vFNnVg
- Node.js: https://nodejs.org/en
- Vite: https://vite.dev/guide/
- Swiper (slider): https://swiperjs.com/get-started
- EmailJS (form kontak): https://www.emailjs.com/docs/sdk/installation/
