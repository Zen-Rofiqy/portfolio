// ============================================================
//  TEKS SITUS via Google Sheet — tab "Teks"
//  ------------------------------------------------------------
//  Tab berformat kunci–nilai. Kolom: Kunci | Teks | Keterangan
//  (Keterangan hanya catatan untuk manusia, tidak dibaca kode).
//
//  TEXT_FALLBACK = teks cadangan sekaligus daftar kunci yang
//  dikenal situs. Menambah kunci baru = tambah di sini + pakai
//  di komponennya; baris Sheet dengan kunci tak dikenal
//  diabaikan tanpa error.
// ============================================================
import { useEffect, useState } from "react";
import { fetchSheetRows } from "./sheet";

const SHEET_NAME = "Teks";

export const TEXT_FALLBACK = {
  home_subjudul: "Data Science Enthusiast & Analyst",
  home_deskripsi:
    "I'm a Data Science enthusiast skilled in R, Python, SAS, and SQL, eager to collaborate on ML and data projects.",
  about_deskripsi:
    "Angga Fathan Rofiqy is a data science student specializing in machine learning and statistical analysis. With a foundation in Statistics from Bogor Agricultural University, he ranked in the top 10% of Bangkit Academy 2024's Machine Learning Path. Angga combines technical skills with systematic thinking to deliver efficient, data-driven solutions.",
  about_pengalaman: "3+ Years in Statistics",
  about_proyek: "20+ Projects",
  about_support: "Online 9 to 5",
};

export function useTexts() {
  const [texts, setTexts] = useState(TEXT_FALLBACK);

  useEffect(() => {
    let alive = true;
    fetchSheetRows(SHEET_NAME)
      .then((rows) => {
        if (!alive || !rows) return;
        const map = {};
        rows.forEach((r) => {
          if (r.kunci && r.teks) map[r.kunci] = r.teks;
        });
        if (Object.keys(map).length) setTexts({ ...TEXT_FALLBACK, ...map });
      })
      .catch((err) =>
        console.warn('Sheet "Teks": gagal diambil, pakai teks cadangan.', err)
      );
    return () => {
      alive = false;
    };
  }, []);

  return texts;
}
