// ============================================================
//  CV AKTIF via Google Sheet — tab "CV"
//  ------------------------------------------------------------
//  Kolom tab: Aktif | Nama | Link
//  - Aktif : checkbox. Centang SATU baris = itu yang dipakai
//            tombol "Download CV" (kalau lebih dari satu dicentang,
//            yang paling atas yang dipakai).
//  - Nama  : label bebas untuk Anda sendiri (mis. "CV ATS - Data Analyst").
//  - Link  : link share/edit Google Docs-nya (bukan link export).
//            Kode otomatis ubah jadi link download PDF.
// ============================================================
import { isTruthy, useSheetList } from "../../lib/sheet";

const SHEET_NAME = "CV";

// Dipakai kalau Sheet tak terjangkau / tab "CV" belum ada.
const FALLBACK_DOC_ID = "1E-Y7gq9F4ryDm4nMZ8aTC9hcna8jMwFqt3OsKqKUQgY";

export const fallbackCV = [{ url: exportUrl(FALLBACK_DOC_ID), order: 1 }];

// Ambil ID dari link Google Docs (docs.google.com/document/d/<ID>/edit...),
// atau anggap seluruh isi sel sudah berupa ID kalau tak match.
function extractDocId(link) {
  const m = String(link).match(/\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : String(link).trim();
}

function exportUrl(docId) {
  return `https://docs.google.com/document/d/${docId}/export?format=pdf`;
}

const mapRow = (r) =>
  isTruthy(r.aktif) && r.link
    ? { url: exportUrl(extractDocId(r.link)), order: 1 }
    : null;

export function useCVUrl() {
  const list = useSheetList(SHEET_NAME, mapRow, fallbackCV);
  return list[0]?.url || fallbackCV[0].url;
}
