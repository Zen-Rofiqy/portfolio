// ============================================================
//  PORTFOLIO via Google Sheet — tab "Portfolio"
//  ------------------------------------------------------------
//  Konfigurasi SHEET_ID ada di src/lib/sheet.js (dipakai
//  bersama semua section). Kolom tab: Tampilkan | Judul |
//  Kategori | Folder | Urutan | Link.
//
//  KATEGORI bisa lebih dari satu per karya: pisahkan dengan
//  koma (mis. "statistics, dashboard") supaya karya yang sama
//  muncul di beberapa tab filter sekaligus.
// ============================================================
import { fetchSheetRows, isTruthy } from "../../lib/sheet";

export const SHEET_NAME = "Portfolio"; // nama tab di dalam Google Sheet

// Pecah nilai kolom Kategori jadi daftar tag (dipisah koma/titik-koma),
// di-lowercase & dibuang yang kosong. "statistics, Dashboard" → ["statistics","dashboard"].
export const splitCategories = (v) =>
  String(v || "")
    .split(/[,;]/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

// Nama file cover di tiap folder proyek (public/portfolio/<folder>/cover.jpg)
const COVER_FILE = "cover.jpg";

// Bangun path gambar cover dari nama folder proyek.
export const coverUrl = (folder) =>
  `${import.meta.env.BASE_URL}portfolio/${folder}/${COVER_FILE}`;

// ============================================================
//  DATA CADANGAN (fallback)
//  ------------------------------------------------------------
//  Dipakai saat SHEET_ID kosong / Google tak bisa diakses,
//  supaya bagian Portfolio tidak pernah kosong.
//  Kolomnya sama persis dengan kolom di Google Sheet.
// ============================================================
export const fallbackProjects = [
  { order: 1,  folder: "data-analyst-asdp",              title: "Data Analyst - ASDP Indonesia Ferry", category: "statistics, dashboard", link: "" },
  { order: 1,  folder: "surveyor-ipm-bandung",           title: "Surveyor - IPM Bandung",            category: "statistics",       link: "" },
  { order: 2,  folder: "marketing-specialist-statify",   title: "Marketing Specialist - Statify",    category: "statistics, dashboard", link: "" },
  { order: 3,  folder: "works-kknt-ipb",                 title: "Works of KKNT IPB",                 category: "statistics",       link: "" },
  { order: 3,  folder: "tancap-app-bangkit-academy",     title: "Tancap App - Bangkit Academy",      category: "machine learning", link: "" },
  { order: 4,  folder: "works-pkm-rsh",                  title: "Works of PKM RSH",                  category: "statistics",       link: "" },
  { order: 5,  folder: "porstat-2022-instagram-feeds",   title: "Porstat 2022 Instagram Feeds",      category: "design",           link: "" },
  { order: 6,  folder: "spirit-fmipa-2022-instagram-feeds", title: "Spirit FMIPA 2022 Instagram Feeds", category: "design",        link: "" },
  { order: 7,  folder: "bayesian-neural-network",        title: "Bayesian Neural Network",           category: "machine learning", link: "" },
  { order: 8,  folder: "clustering-kmeans-fcm-gmm",      title: "Clustering: K-Means, FCM, and GMM", category: "statistics",       link: "" },
  { order: 9,  folder: "data-challenge-final-project",   title: "Data Challenge Final Project",      category: "statistics",       link: "" },
  { order: 10, folder: "arch-garch-forecasting",         title: "ARCH-GARCH Forecasting",            category: "statistics",       link: "" },
  { order: 11, folder: "spatial-regression-final-project", title: "Spatial Regression Final Project", category: "statistics",      link: "" },
  { order: 12, folder: "clustering-gaussian-mixture-model", title: "Clusering: Gaussian Mixture Model", category: "statistics",    link: "" },
  { order: 13, folder: "gatot-kaca-design-poster",       title: "Gatot Kaca Design Poster",          category: "design",           link: "" },
  { order: 14, folder: "ipb-statistics-jersey",          title: "IPB Statistics Jersey",             category: "design",           link: "" },
  { order: 15, folder: "ipb-statistics-tshirt",          title: "IPB Statistics T-shirt",            category: "design",           link: "" },
];

// Ambil & susun data proyek dari Sheet: difilter (Tampilkan
// dicentang) dan diurutkan (Urutan). null = pakai fallback.
export async function fetchProjects() {
  const rows = await fetchSheetRows(SHEET_NAME);
  if (!rows) return null;

  return rows
    .map((r) => ({
      show: isTruthy(r.tampilkan),
      title: r.judul || "",
      category: (r.kategori || "").toLowerCase(),
      folder: r.folder || "",
      order: Number(r.urutan) || 0,
      link: r.link || "",
    }))
    .filter((p) => p.show && p.folder && p.title)
    .sort((a, b) => a.order - b.order);
}
