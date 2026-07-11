// ============================================================
//  KONFIGURASI GOOGLE SHEET (dipakai semua section)
//  ------------------------------------------------------------
//  Satu Google Sheet, banyak tab: "Portfolio", "Teks",
//  "Kualifikasi", "Testimoni", "Services".
//
//  ID = bagian di URL sheet:
//    docs.google.com/spreadsheets/d/<INI_ID_NYA>/edit
//  Syarat: sheet di-Share "Anyone with the link: Viewer".
//
//  Biarkan SHEET_ID kosong ("") kalau belum pakai Sheet —
//  semua section otomatis pakai data cadangan di kodenya.
// ============================================================
import { useEffect, useState } from "react";

export const SHEET_ID = "1_7JeW0bu3MT4yDStz5rliGLlHOGeOBt77_koY7vb3Oc";

// Nilai kolom "Tampilkan" yang dianggap TRUE (case-insensitive)
const TRUTHY = ["true", "1", "ya", "yes", "y", "✓", "checked"];

export const isTruthy = (v) => TRUTHY.includes(String(v).trim().toLowerCase());

// Parser CSV mini (mendukung koma & tanda kutip di dalam sel — RFC 4180)
export function parseCSV(text) {
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

// Satu tab hanya di-fetch sekali per kunjungan halaman,
// walau dipakai beberapa komponen sekaligus.
const cache = {};

// Ambil satu tab sebagai array objek {namakolom: nilai}.
// Nama kolom di-lowercase-kan; nilai sudah di-trim.
// Mengembalikan null kalau SHEET_ID kosong / tab kosong.
export async function fetchSheetRows(sheetName) {
  if (!SHEET_ID) return null;

  if (!cache[sheetName]) {
    cache[sheetName] = (async () => {
      const url =
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}` +
        `/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Google Sheet HTTP ${res.status}`);

      const rows = parseCSV(await res.text());
      if (rows.length < 2) return null;

      const header = rows[0].map((h) => h.trim().toLowerCase());
      return rows.slice(1).map((r) => {
        const obj = {};
        header.forEach((h, i) => {
          if (h) obj[h] = (r[i] || "").trim();
        });
        return obj;
      });
    })().catch((err) => {
      delete cache[sheetName]; // biar bisa dicoba lagi nanti
      throw err;
    });
  }
  return cache[sheetName];
}

// ============================================================
//  Hook generik untuk tab berbentuk daftar (baris = item)
//  ------------------------------------------------------------
//  mapRow(row) mengubah 1 baris jadi item (atau null untuk
//  baris yang disembunyikan/tidak valid). Hasil diurutkan
//  berdasarkan properti `order`. Mulai dari `fallback` dulu
//  supaya tampilan langsung terisi, lalu ditimpa data Sheet.
// ============================================================
export function useSheetList(sheetName, mapRow, fallback) {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    let alive = true;
    fetchSheetRows(sheetName)
      .then((rows) => {
        if (!alive || !rows) return;
        const list = rows
          .map(mapRow)
          .filter(Boolean)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        if (list.length) setItems(list);
      })
      .catch((err) =>
        console.warn(`Sheet "${sheetName}": gagal diambil, pakai data cadangan.`, err)
      );
    return () => {
      alive = false;
    };
    // mapRow & fallback dideklarasikan di level modul (stabil)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetName]);

  return items;
}
