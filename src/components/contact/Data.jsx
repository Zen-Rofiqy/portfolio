// ============================================================
//  KONTAK ("Talk to me") via Google Sheet — tab "Kontak"
//  ------------------------------------------------------------
//  Kartu kontak di section "Get in touch".
//
//  Kolom tab: Tampilkan | Judul | Ikon | Data | Link | Urutan
//  - Judul  : judul kartu, mis. "Email", "Whatsapp".
//  - Ikon   : font-icon (Boxicons "bx-mail-send"/"bxl-whatsapp",
//             atau Unicons "uil-…") ATAU nama file gambar
//             (mis. "telegram.svg" dari public/social/).
//  - Data   : teks yang ditampilkan (email, nomor, username).
//  - Link   : tujuan tombol "Write me" (mailto:, https://wa.me/…, dst).
//  - Urutan : angka; makin kecil makin awal.
// ============================================================
import { isTruthy, useSheetList } from "../../lib/sheet";

const SHEET_NAME = "Kontak";
const DEFAULT_ICON = "bx-message-rounded-dots";

// Data cadangan — dipakai saat Sheet tak terjangkau / tab belum ada.
export const fallbackContacts = [
  {
    title: "Email",
    icon: "bx-mail-send",
    data: "fathan.rofiqy@gmail.com",
    link: "mailto:fathan.rofiqy@gmail.com",
    order: 1,
  },
  {
    title: "Whatsapp",
    icon: "bxl-whatsapp",
    data: "+62 812-1091-7432",
    link: "https://wa.me/6281210917432",
    order: 2,
  },
  {
    title: "Instagram",
    icon: "bxl-instagram",
    data: "@function_runing",
    link: "https://www.instagram.com/function_runing/",
    order: 3,
  },
];

const mapRow = (r) =>
  isTruthy(r.tampilkan) && r.judul
    ? {
        title: r.judul,
        icon: r.ikon || DEFAULT_ICON,
        data: r.data || "",
        link: r.link || "#",
        order: Number(r.urutan) || 0,
      }
    : null;

export function useContacts() {
  return useSheetList(SHEET_NAME, mapRow, fallbackContacts);
}
