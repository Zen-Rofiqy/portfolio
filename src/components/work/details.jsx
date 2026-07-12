// ============================================================
//  DETAIL PORTFOLIO (modal "Details" ala LinkedIn)
//  ------------------------------------------------------------
//  Konten kaya per proyek (deskripsi, media, link). Di-keyed
//  berdasarkan `Folder` (slug) yang sama dengan tab Portfolio.
//
//  SUMBER DATA: dua tab Google Sheet, digabung lewat useDetails():
//    - tab "Details"     : 1 baris = 1 folder. Kolom:
//        Folder | Org | Logo | LinkOrg | Subtitle | Meta |
//        Deskripsi | Skills
//        (Meta/Deskripsi/Skills = multi-baris dalam 1 sel,
//         pakai Alt+Enter; tiap baris jadi 1 item.)
//    - tab "DetailMedia" : 1 baris = 1 item media. Kolom:
//        Folder | Urutan | Judul | Tipe | Nilai | Thumb
//        (Tipe: img = gambar/lightbox, file = buka tab baru,
//         link = URL luar. Nilai = nama file di folder / URL.)
//  `projectDetails` di bawah = DATA CADANGAN, dipakai kalau
//  Sheet tak terjangkau / tab belum dibuat. Sebaiknya ikut
//  disinkronkan saat konten di Sheet berubah permanen.
//
//  Cara menambah / mengubah:
//    1. Taruh file media di public/portfolio/<folder>/
//       (foto .jpg, dokumen .pdf, dll). Cover tetap cover.jpg.
//    2. Isi baris di tab "Details" & "DetailMedia" (key = folder).
//
//  Struktur satu entri (dan bentuk hasil dari Sheet):
//    org      : (opsional) organisasi terkait — { name, logo, link }
//               - name : nama org (mis. "IPB University")
//               - logo : nama file logo di public/orgs/ (mis. "ipb-university.jpg")
//               - link : (opsional) URL profil org (mis. LinkedIn) → nama & logo
//                        jadi bisa diklik untuk kredibilitas
//    subtitle : teks kecil di bawah nama org (mis. jenis/peran)
//    meta     : baris info singkat (tanggal, lokasi, dll) — array
//    description : paragraf/bullet deskripsi — array of string
//    media    : array item media. Tiap item PUNYA SALAH SATU dari:
//               - img  : nama file gambar → klik buka gambar besar (lightbox)
//               - file : nama file lokal (mis. .pdf) → klik buka di tab baru
//               - link : URL luar → klik buka di tab baru
//               Field bersama:
//               - title : judul media (wajib)
//               - thumb : (opsional) nama file gambar untuk thumbnail.
//                         Wajib untuk file/link kalau mau ada preview
//                         (mis. screenshot halaman-1 PDF). Kalau kosong,
//                         thumbnail jadi ikon placeholder.
//    skills   : (opsional) daftar tag skill — array of string
// ============================================================
import { useEffect, useState } from "react";
import { fetchSheetRows } from "../../lib/sheet";

// Bangun path media: kalau berupa URL penuh dipakai apa adanya,
// selain itu diambil dari folder proyek di public/portfolio/.
export const mediaUrl = (folder, file) =>
  /^https?:\/\//i.test(file)
    ? file
    : // encodeURI supaya nama file berspasi (mis. "Day 1 Survey.jpg",
      // PDF sertifikat) tetap aman saat dibuka di tab baru / <img>.
      encodeURI(`${import.meta.env.BASE_URL}portfolio/${folder}/${file}`);

// Logo organisasi disimpan bersama di public/orgs/ (bisa dipakai
// ulang lintas proyek, mis. IPB di beberapa proyek).
export const orgLogoUrl = (file) =>
  /^https?:\/\//i.test(file)
    ? file
    : encodeURI(`${import.meta.env.BASE_URL}orgs/${file}`);

export const projectDetails = {
  "surveyor-ipm-bandung": {
    org: {
      name: "IPB University",
      logo: "ipb-university.jpg",
      link: "https://www.linkedin.com/school/ipbuniversityindonesia/",
    },
    subtitle: "Part-time · On-site",
    meta: ["Aug 2024 · 1 mo", "Bandung, West Java, Indonesia"],
    description: [
      "Conducted socio-economic surveys with 25 respondents per enumerator across diverse economic groups.",
      "Surveyed multiple villages/subdistricts over 5 days with a team of 31 IPB Statistics students.",
      "Supported data collection for human development analysis.",
    ],
    media: [
      {
        title: "Certificate of Appreciation",
        file: "Sertifikat Surveyor_IPM Bandung_Angga Fathan Rofiqy.pdf",
        // Taruh screenshot halaman-1 sertifikat sebagai Sertifikat.jpg
        // di folder ini. Kalau belum ada, thumbnail otomatis jadi ikon PDF.
        thumb: "Sertifikat.jpg",
      },
      { title: "Departing for Survey", img: "Departing for Survey.jpg" },
      { title: "Day 1 Survey", img: "Day 1 Survey.jpg" },
      { title: "Day 2 Survey", img: "Day 2 Survey.jpg" },
      { title: "Day 3 Survey", img: "Day 3 Survey.jpg" },
    ],
    skills: [
      "Effective Communication and Public Relations",
      "Data Collection",
    ],
  },

  "marketing-specialist-statify": {
    org: {
      name: "Statify",
      logo: "statify.jpg",
      link: "https://www.linkedin.com/company/statifyipb/",
    },
    subtitle: "Full-time · On-site",
    meta: ["Feb 2025 - Present · 1 yr 6 mos", "Indonesia"],
    description: [
      "Designed cross-platform branding assets (Instagram, LinkedIn, presentations) using Figma, Illustrator, and Photoshop.",
      "Independently built monthly Tableau performance dashboard post, from raw data preparation to final design and publication.",
      "Provided statistical consulting for client projects on path analysis (SPSS) and panel data (EViews).",
    ],
    // Contoh media tipe LINK (buka tab baru). Belum ada gambar
    // preview, jadi thumbnail otomatis jadi ikon link. Tambahkan
    // field `thumb: "namafile.jpg"` bila mau ada preview.
    media: [
      {
        title: "Statify Website",
        link: "https://statifyipb.wixsite.com/profile",
      },
      {
        title: "STATify (@statify.id) · Instagram profile",
        link: "https://www.instagram.com/statify.id/",
      },
    ],
    skills: ["Project Management", "Graphic Design", "Statistical Consulting"],
  },
};

// Ambil detail satu proyek berdasarkan slug folder (atau null).
// Dipakai untuk data CADANGAN; untuk data hidup pakai useDetails().
export const getDetail = (folder) => projectDetails[folder] || null;

// ============================================================
//  DETAIL via Google Sheet — tab "Details" + "DetailMedia"
//  ------------------------------------------------------------
//  Dua tab digabung (join) lewat kolom "Folder" jadi satu peta
//  { [folder]: entri } berbentuk sama dengan projectDetails.
// ============================================================
const TAB_DETAILS = "Details";
const TAB_MEDIA = "DetailMedia";

// Pecah sel multi-baris (Alt+Enter) jadi array item, buang kosong.
const splitLines = (v) =>
  String(v || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

// Ubah 1 baris tab DetailMedia jadi item media { title, img|file|link, thumb }.
const buildMediaItem = (r) => {
  const item = { title: r.judul };
  const tipe = String(r.tipe || "").trim().toLowerCase();
  const val = r.nilai || "";
  if (tipe === "img" || tipe === "image") item.img = val;
  else if (tipe === "link" || tipe === "url") item.link = val;
  else if (tipe === "file") item.file = val;
  // Tanpa Tipe: tebak dari nilainya (URL → link, ekstensi gambar → img, sisanya file).
  else if (/^https?:\/\//i.test(val)) item.link = val;
  else if (/\.(jpe?g|png|webp|gif|avif|svg)$/i.test(val)) item.img = val;
  else item.file = val;
  if (r.thumb) item.thumb = r.thumb;
  return item;
};

// Gabung baris kedua tab jadi peta detail.
const buildDetails = (detailRows, mediaRows) => {
  const map = {};

  (detailRows || []).forEach((r) => {
    if (!r.folder) return;
    const entry = { media: [] };
    if (r.org) entry.org = { name: r.org, logo: r.logo || "", link: r.linkorg || "" };
    if (r.subtitle) entry.subtitle = r.subtitle;
    const meta = splitLines(r.meta);
    if (meta.length) entry.meta = meta;
    const desc = splitLines(r.deskripsi);
    if (desc.length) entry.description = desc;
    const skills = splitLines(r.skills);
    if (skills.length) entry.skills = skills;
    map[r.folder] = entry;
  });

  // Kelompokkan media per folder, urutkan, lalu tempel.
  const byFolder = {};
  (mediaRows || []).forEach((r) => {
    if (!r.folder || !r.judul) return;
    (byFolder[r.folder] = byFolder[r.folder] || []).push(r);
  });
  Object.keys(byFolder).forEach((folder) => {
    const list = byFolder[folder]
      .sort((a, b) => (Number(a.urutan) || 0) - (Number(b.urutan) || 0))
      .map(buildMediaItem);
    if (map[folder]) map[folder].media = list;
    else map[folder] = { media: list }; // media saja, tanpa baris Details
  });

  return map;
};

// Hook: mulai dari data cadangan, lalu ditimpa hasil join dari Sheet.
// Mengembalikan peta { [folder]: entri }; lookup dengan details[folder].
export function useDetails() {
  const [details, setDetails] = useState(projectDetails);

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetchSheetRows(TAB_DETAILS).catch(() => null),
      fetchSheetRows(TAB_MEDIA).catch(() => null),
    ])
      .then(([dRows, mRows]) => {
        if (!alive) return;
        if (!dRows && !mRows) return; // Sheet kosong / tab belum ada → cadangan
        const map = buildDetails(dRows, mRows);
        if (Object.keys(map).length) setDetails(map);
      })
      .catch((err) =>
        console.warn("Details: gagal ambil Google Sheet, pakai data cadangan.", err)
      );
    return () => {
      alive = false;
    };
  }, []);

  return details;
}
