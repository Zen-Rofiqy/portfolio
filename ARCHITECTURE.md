# Struktur Proyek

Peta cepat supaya langsung paham repo ini. Lihat juga [README.md](README.md) untuk peta konten & alur update.

## Pola inti (paham ini = paham semuanya)

Setiap **section halaman = satu folder** di `src/components/<nama>/`, berisi:

- `<Nama>.jsx` → tampilan & logika komponen
- `<nama>.css` → style khusus komponen itu
- `Data.jsx` (sebagian folder) → **data konten** (array projek, testimoni) dipisah dari tampilan
- sub-komponen bila perlu (mis. `WorkItems.jsx`, `Info.jsx`, `Social.jsx`)

Urutan komponen di `App.jsx` = urutan section dari atas ke bawah di web.

## Pohon render

Urutan node = urutan section di `App.jsx` = urutan tampil di halaman (atas ke bawah).

```mermaid
graph LR
  main["main.jsx<br/>(entry point)"] --> App["App.jsx<br/>(rangkai semua section)"]

  App --> Header
  App --> Home
  App --> About
  App --> Skills
  App --> Services
  App --> Qualification
  App --> Work
  App --> Testimonials
  App --> Contact
  App --> Footer
  App --> ScrollUp

  Home --> HomeSub["Data.jsx · Social.jsx · ScrollDown.jsx"]
  About --> AboutSub["Info.jsx"]
  Skills --> SkillsSub["Frontend · Database · Design<br/>DataAnalysis · DataScience · DataViz"]
  Work --> WorkSub["Works.jsx · WorkItems.jsx"]
  Testimonials --> TestiSub["Data.jsx"]

  classDef sub fill:#eee,stroke:#bbb,color:#333,font-size:11px;
  class HomeSub,AboutSub,SkillsSub,WorkSub,TestiSub sub;
```

## Alur data (Google Sheet)

6 dari 11 section ambil konten dari Google Sheet lewat `src/lib/sheet.js` saat runtime;
kalau fetch gagal, tiap section jatuh ke `Data.jsx`/fallback bawaannya sendiri.

```mermaid
graph LR
  Sheet["Google Sheet<br/>(data live)"] -->|"tab Teks · Portfolio · Kualifikasi<br/>Testimoni · Services"| Lib["src/lib/sheet.js<br/>(SHEET_ID + fetch CSV)"]

  Lib --> Home
  Lib --> About
  Lib --> Services
  Lib --> Qualification
  Lib --> Work
  Lib --> Testimonials

  classDef ext fill:#d9ead3,stroke:#93c47d,color:#274e13,font-size:11px;
  classDef sub fill:#eee,stroke:#bbb,color:#333,font-size:11px;
  class Sheet ext;
  class Lib sub;
```

## Mana yang punya data konten terpisah

Kalau mau ubah **isi/teks/daftar**, cari `Data.jsx` dulu; kalau mau ubah **tampilan**, edit `<Nama>.jsx`/`.css`.

| Section | File konten | Sub-komponen |
|---------|-------------|--------------|
| Home | **Sheet tab `Teks`** (subjudul & deskripsi) via `lib/texts.js` | `Data.jsx`, `Social.jsx`, `ScrollDown.jsx` |
| About | **Sheet tab `Teks`** (deskripsi & info box) via `lib/texts.js` | `Info.jsx` |
| Skills | — | 6 kartu skill (`Frontend.jsx`, `Database.jsx`, dst) |
| Services | **Sheet tab `Services`** + `services/Data.jsx` (fallback) | — |
| Qualification | **Sheet tab `Kualifikasi`** + `qualification/Data.jsx` (fallback) | — |
| Work | **Sheet tab `Portfolio`** + `work/Data.jsx` (fallback) | `Works.jsx`, `WorkItems.jsx` |
| Testimonials | **Sheet tab `Testimoni`** + `testimonials/Data.jsx` (fallback) | — |
| Contact, Header, Footer, ScrollUp | — (langsung di `.jsx`) | — |

Konfigurasi `SHEET_ID`, parser CSV, dan hook `useSheetList` dipakai bersama di
`src/lib/sheet.js`; teks tunggal (kunci–nilai) lewat `src/lib/texts.js`.

## Peta folder

```
public/
├── portfolio/          # gambar Portfolio, 1 folder per proyek: <slug>/cover.jpg (+ galeri Details)
└── testimonials/       # foto testimoni (dirujuk kolom Foto di Sheet tab Testimoni)
src/
├── main.jsx            # entry — mount <App> ke #root
├── App.jsx             # susun semua section berurutan
├── index.css           # style global + variabel
├── App.css             # style layout utama
├── assets/             # gambar, ikon SVG, CV PDF
├── lib/
│   ├── sheet.js        # SHEET_ID + fetch/parser CSV + hook useSheetList (dipakai semua section)
│   └── texts.js        # tab "Teks" (kunci–nilai) + teks cadangan
└── components/
    ├── header/         # navbar
    ├── home/           # hero + sosial + scroll indicator
    ├── about/          # tentang + info
    ├── skills/         # kumpulan kartu skill
    ├── services/       # layanan
    ├── qualification/  # pendidikan/pengalaman
    ├── work/           # portfolio projek (data dari Google Sheet; gambar di public/portfolio/)
    ├── testimonials/   # testimoni (pakai Data.jsx, slider Swiper)
    ├── contact/        # form kontak (EmailJS)
    ├── footer/         # footer
    └── scrollup/       # tombol scroll-to-top
```

## Aliran teknologi

- **React** merender komponen → **Vite** yang bundling & serve (dev) / build (produksi).
- **Swiper** dipakai untuk slider (testimoni).
- **EmailJS** menangani pengiriman form kontak tanpa backend.
- **Google Sheet** jadi sumber konten teks: satu spreadsheet dengan tab `Portfolio`,
  `Teks`, `Kualifikasi`, `Testimoni`, `Services`. Tiap section men-`fetch` CSV tab-nya
  saat runtime lewat `src/lib/sheet.js` (difilter `Tampilkan`, diurutkan `Urutan`);
  kalau gagal/ID kosong, jatuh ke data cadangan di kode supaya tak pernah blank.

> Diagram Mermaid tampil otomatis di GitHub & preview Markdown VSCode.
