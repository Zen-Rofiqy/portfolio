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
| Projek / karya | `src/components/work/Data.jsx` + gambar `src/assets/work_*.jpg` |
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

## 5. Referensi

- Video setup awal: https://youtu.be/xvKe4vFNnVg
- Node.js: https://nodejs.org/en
- Vite: https://vite.dev/guide/
- Swiper (slider): https://swiperjs.com/get-started
- EmailJS (form kontak): https://www.emailjs.com/docs/sdk/installation/
