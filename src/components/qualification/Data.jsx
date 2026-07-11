// ============================================================
//  KUALIFIKASI via Google Sheet — tab "Kualifikasi"
//  ------------------------------------------------------------
//  Kolom tab: Tampilkan | Tab | Judul | Institusi | Periode | Urutan
//  Kolom "Tab" diisi Education atau Experience (boleh juga
//  Pendidikan/Pengalaman). Urutan dihitung per tab.
// ============================================================
import { isTruthy, useSheetList } from "../../lib/sheet";

const SHEET_NAME = "Kualifikasi";

// Data cadangan — dipakai saat Sheet tak terjangkau / tab belum ada.
export const fallbackQualifications = [
  { tab: "education",  title: "Statistics & Data Science", place: "IPB University",  period: "Aug 2021 - Aug 2025", order: 1 },
  { tab: "education",  title: "Natural Science",           place: "SMAN 1 Cibadak",  period: "Jan 2018 - Apr 2021", order: 2 },
  { tab: "education",  title: "Middle School",             place: "SMPIT Al-Ummah",  period: "Aug 2015 - Aug 2018", order: 3 },
  { tab: "education",  title: "Elementary School",         place: "SDN 2 Cibadak",   period: "Jan 2009 - Apr 2015", order: 4 },
  { tab: "experience", title: "Data Analyst",              place: "PT.ASDP Indonesia Ferry (Persero)", period: "Sep 2024 - Des 2024", order: 1 },
  { tab: "experience", title: "Surveyor IPM Bandung",      place: "IPB University",  period: "Aug 2024",            order: 2 },
  { tab: "experience", title: "Media and Branding",        place: "KKN-T IPB 2024 | Sukawening Village", period: "Jun 2024 - Aug 2024", order: 3 },
  { tab: "experience", title: "Machine Learning Cohort",   place: "Bangkit Academy", period: "Feb 2024 - Jul 2024", order: 4 },
  { tab: "experience", title: "Secretary",                 place: "Chess Unity of Agriculture IPB", period: "Feb 2023 - Feb 2024", order: 5 },
  { tab: "experience", title: "Graphic Designer and Data Analyst", place: "Big Data Agrotourism PKM-RSH IPB University", period: "Jan 2023 - Feb 2024", order: 6 },
  { tab: "experience", title: "Staff of Documentation Decoration Design division", place: "PORSTAT IPB 2022", period: "Nov 2022 - Feb 2023", order: 7 },
  { tab: "experience", title: "Media Branding Department", place: "Gamma Sigma Beta IPB", period: "Sep 2022 - Dec 2022", order: 8 },
  { tab: "experience", title: "Staff of Branding Decor Design Division", place: "SPIRIT FMIPA IPB", period: "Mar 2022 - Sep 2022", order: 9 },
];

// "Education"/"Pendidikan" -> education, selain itu -> experience
const normalizeTab = (v) => {
  const s = String(v).trim().toLowerCase();
  return s.startsWith("edu") || s.startsWith("pend") ? "education" : "experience";
};

const mapRow = (r) =>
  isTruthy(r.tampilkan) && r.judul
    ? {
        tab: normalizeTab(r.tab),
        title: r.judul,
        place: r.institusi || "",
        period: r.periode || "",
        order: Number(r.urutan) || 0,
      }
    : null;

export function useQualifications() {
  return useSheetList(SHEET_NAME, mapRow, fallbackQualifications);
}
