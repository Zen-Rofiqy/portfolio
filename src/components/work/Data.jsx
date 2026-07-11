// ============================================================
//  KONFIGURASI GOOGLE SHEET
//  ------------------------------------------------------------
//  Tempel ID Google Sheet Anda di antara tanda kutip SHEET_ID.
//  ID = bagian di URL sheet:
//    docs.google.com/spreadsheets/d/<INI_ID_NYA>/edit
//  Syarat: sheet di-Share "Anyone with the link: Viewer".
//
//  Biarkan SHEET_ID kosong ("") kalau belum pakai Sheet —
//  situs otomatis pakai DATA CADANGAN di bawah.
// ============================================================
export const SHEET_ID = "1_7JeW0bu3MT4yDStz5rliGLlHOGeOBt77_koY7vb3Oc";
export const SHEET_NAME = "Portfolio"; // nama tab di dalam Google Sheet

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
  { order: 1,  folder: "surveyor-ipm-bandung",           title: "Surveyor - IPM Bandung",            category: "statistics",       link: "" },
  { order: 2,  folder: "works-kknt-ipb",                 title: "Works of KKNT IPB",                 category: "statistics",       link: "" },
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

// ============================================================
//  AMBIL DATA DARI GOOGLE SHEET (runtime)
//  ------------------------------------------------------------
//  Tidak perlu diubah. Mengembalikan array proyek yang sudah
//  difilter (Tampilkan == TRUE) & diurutkan (Urutan). Kalau
//  SHEET_ID kosong -> null (pakai fallback).
// ============================================================

// Nilai kolom "Tampilkan" yang dianggap TRUE (case-insensitive)
const TRUTHY = ["true", "1", "ya", "yes", "y", "✓", "checked"];

// Parser CSV mini (mendukung koma & tanda kutip di dalam sel — RFC 4180)
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export async function fetchProjects() {
  if (!SHEET_ID) return null;

  const url =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}` +
    `/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Sheet HTTP ${res.status}`);

  const rows = parseCSV(await res.text());
  if (rows.length < 2) return null;

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (name) => header.indexOf(name);
  const iShow = col("tampilkan");
  const iTitle = col("judul");
  const iCat = col("kategori");
  const iFolder = col("folder");
  const iOrder = col("urutan");
  const iLink = col("link");
  const cell = (r, i) => (i >= 0 && i < r.length ? r[i].trim() : "");

  return rows
    .slice(1)
    .map((r) => ({
      show: TRUTHY.includes(cell(r, iShow).toLowerCase()),
      title: cell(r, iTitle),
      category: cell(r, iCat).toLowerCase(),
      folder: cell(r, iFolder),
      order: Number(cell(r, iOrder)) || 0,
      link: cell(r, iLink),
    }))
    .filter((p) => p.show && p.folder && p.title)
    .sort((a, b) => a.order - b.order);
}
