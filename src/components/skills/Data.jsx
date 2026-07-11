// ============================================================
//  SKILLS via Google Sheet — tab "Skills"
//  ------------------------------------------------------------
//  Kolom tab: Tampilkan | Kategori | Nama | Level | Icon | Urutan
//  - Kategori : data science / data analysis / data viz / database /
//               design / frontend (bebas nambah kategori baru).
//  - Icon     : key ikon, lihat daftar & tambah ikon baru di icons.jsx.
//  - Urutan   : urutan dalam kategorinya (kecil = paling atas).
// ============================================================
import { isTruthy, useSheetList } from "../../lib/sheet";

const SHEET_NAME = "Skills";

// Urutan & judul tampil kategori (tak lewat Sheet — jarang berubah).
export const CATEGORIES = [
  { key: "data science", title: "Data Science" },
  { key: "data analysis", title: "Data Analysis" },
  { key: "data viz", title: "Data Visualization" },
  { key: "database", title: "Database & Query Language" },
  { key: "design", title: "Design & Editing" },
  { key: "frontend", title: "Frontend developer" },
];

// Data cadangan — dipakai saat Sheet tak terjangkau / tab belum ada.
export const fallbackSkills = [
  { category: "data science", name: "Python", level: "Advanced", icon: "python", order: 1 },
  { category: "data science", name: "Machine Learning", level: "Intermediate", icon: "python", order: 2 },
  { category: "data science", name: "R", level: "Advanced", icon: "r", order: 3 },
  { category: "data science", name: "SAS", level: "Basic", icon: "sas", order: 4 },

  { category: "data analysis", name: "Microsoft Excel", level: "Advanced", icon: "excel", order: 1 },
  { category: "data analysis", name: "Minitab", level: "Basic", icon: "minitab", order: 2 },
  { category: "data analysis", name: "SPSS", level: "Basic", icon: "spss", order: 3 },
  { category: "data analysis", name: "SmartPLS", level: "Basic", icon: "smartpls", order: 4 },

  { category: "data viz", name: "Tableau", level: "Intermediate", icon: "tableau", order: 1 },
  { category: "data viz", name: "Tableau Prep Builder", level: "Basic", icon: "tableau", order: 2 },
  { category: "data viz", name: "R Studio", level: "Advanced", icon: "rstudio", order: 3 },
  { category: "data viz", name: "Python", level: "Intermediate", icon: "python", order: 4 },

  { category: "database", name: "SQL", level: "Intermediate", icon: "sql", order: 1 },
  { category: "database", name: "DBeaver", level: "Intermediate", icon: "dbeaver", order: 2 },
  { category: "database", name: "MySQL", level: "Intermediate", icon: "mysql", order: 3 },
  { category: "database", name: "Oracle", level: "Basic", icon: "oracle", order: 4 },
  { category: "database", name: "MariaDB", level: "Basic", icon: "mariadb", order: 5 },
  { category: "database", name: "PostgreSQL", level: "Basic", icon: "postgresql", order: 6 },

  { category: "design", name: "Adobe Illustrator", level: "Advanced", icon: "illustrator", order: 1 },
  { category: "design", name: "Adobe Photoshop", level: "Intermediate", icon: "photoshop", order: 2 },
  { category: "design", name: "Adobe Premiere Pro", level: "Basic", icon: "premiere", order: 3 },
  { category: "design", name: "Figma", level: "Basic", icon: "figma", order: 4 },
  { category: "design", name: "Adobe Lightroom", level: "Basic", icon: "lightroom", order: 5 },
  { category: "design", name: "Adobe After Effect", level: "Basic", icon: "after-effects", order: 6 },

  { category: "frontend", name: "HTML", level: "Basic", icon: "html5", order: 1 },
  { category: "frontend", name: "CSS", level: "Advanced", icon: "css3", order: 2 },
  { category: "frontend", name: "JavaScript", level: "Intermediate", icon: "javascript", order: 3 },
  { category: "frontend", name: "Bootstrap", level: "Intermediate", icon: "bootstrap", order: 4 },
  { category: "frontend", name: "Git", level: "Advanced", icon: "git", order: 5 },
  { category: "frontend", name: "React", level: "Intermediate", icon: "react", order: 6 },
];

const mapRow = (r) =>
  isTruthy(r.tampilkan) && r.nama
    ? {
        category: String(r.kategori || "").trim().toLowerCase(),
        name: r.nama,
        level: r.level || "",
        icon: (r.icon || "").trim().toLowerCase(),
        order: Number(r.urutan) || 0,
      }
    : null;

export function useSkills() {
  return useSheetList(SHEET_NAME, mapRow, fallbackSkills);
}
