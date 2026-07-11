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

  Home -. berisi .-> HomeSub["Data.jsx · Social.jsx · ScrollDown.jsx"]
  About -. berisi .-> AboutSub["Info.jsx"]
  Skills -. berisi .-> SkillsSub["Frontend · Database · Design<br/>DataAnalysis · DataScience · DataViz"]
  Work -. berisi .-> WorkSub["Works.jsx · WorkItems.jsx"]
  WorkSub -. fetch runtime .-> Sheet["Google Sheet<br/>(data live)"]
  WorkSub -. cadangan .-> WorkData["Data.jsx<br/>(SHEET_ID + fallback)"]
  Testimonials -. berisi .-> TestiSub["Data.jsx"]

  classDef sub fill:#eee,stroke:#bbb,color:#333,font-size:11px;
  classDef ext fill:#d9ead3,stroke:#93c47d,color:#274e13,font-size:11px;
  class HomeSub,AboutSub,SkillsSub,WorkSub,WorkData,TestiSub sub;
  class Sheet ext;
```

## Mana yang punya data konten terpisah

Kalau mau ubah **isi/teks/daftar**, cari `Data.jsx` dulu; kalau mau ubah **tampilan**, edit `<Nama>.jsx`/`.css`.

| Section | File konten | Sub-komponen |
|---------|-------------|--------------|
| Home | `home/Data.jsx` | `Social.jsx`, `ScrollDown.jsx` |
| About | — | `Info.jsx` |
| Skills | — | 6 kartu skill (`Frontend.jsx`, `Database.jsx`, dst) |
| Work | **Google Sheet** (runtime) + `work/Data.jsx` (config `SHEET_ID` & data cadangan) | `Works.jsx`, `WorkItems.jsx` |
| Testimonials | `testimonials/Data.jsx` | — |
| Services, Qualification, Contact, Header, Footer, ScrollUp | — (langsung di `.jsx`) | — |

## Peta folder

```
public/
└── portfolio/          # gambar Portfolio, 1 folder per proyek: <slug>/cover.jpg (+ galeri Details)
src/
├── main.jsx            # entry — mount <App> ke #root
├── App.jsx             # susun semua section berurutan
├── index.css           # style global + variabel
├── App.css             # style layout utama
├── assets/             # gambar, ikon SVG, CV PDF
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
- **Google Sheet** jadi sumber data bagian Portfolio: `Works.jsx` men-`fetch` CSV Sheet saat
  runtime (lihat `work/Data.jsx`), difilter kolom `Tampilkan` & diurutkan `Urutan`; kalau
  gagal/ID kosong, jatuh ke data cadangan di `Data.jsx` supaya tak pernah blank.

> Diagram Mermaid tampil otomatis di GitHub & preview Markdown VSCode.
