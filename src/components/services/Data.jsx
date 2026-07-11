// ============================================================
//  SERVICES via Google Sheet — tab "Services"
//  ------------------------------------------------------------
//  Kolom tab: Tampilkan | Judul | Deskripsi | Poin | Ikon | Urutan
//  - Judul  : boleh 2 baris — pisahkan dengan Enter di dalam sel
//             (Alt+Enter di Google Sheets), mis. "Product⏎Designer".
//  - Poin   : daftar layanan, satu poin per baris di dalam sel
//             (Alt+Enter di Google Sheets).
//  - Ikon   : (opsional) nama ikon Unicons, mis. uil-web-grid.
//             Daftar: https://iconscout.com/unicons
// ============================================================
import { isTruthy, useSheetList } from "../../lib/sheet";

const SHEET_NAME = "Services";
const DEFAULT_ICON = "uil-arrow";

// Data cadangan — dipakai saat Sheet tak terjangkau / tab belum ada.
export const fallbackServices = [
  {
    title: "Product\nDesigner",
    icon: "uil-web-grid",
    description:
      "Service with more than 3 years of experience. Providing quality work to clients and companies.",
    items: [
      "I develop the user interface.",
      "Web page development.",
      "I create ux element interactions.",
      "I position your company brand.",
      "Design and mockups or products for companies.",
    ],
    order: 1,
  },
  {
    title: "Ui/Ux\nDesigner",
    icon: "uil-arrow",
    description:
      "Service with more than 3 years of experience. Providing quality work to clients and companies.",
    items: [
      "I develop the user interface.",
      "Web page development.",
      "I create ux element interactions.",
      "I position your company brand.",
      "Design and mockups or products for companies.",
    ],
    order: 2,
  },
  {
    title: "Visual\nDesigner",
    icon: "uil-edit",
    description:
      "Service with more than 3 years of experience. Providing quality work to clients and companies.",
    items: [
      "I develop the user interface.",
      "Web page development.",
      "I create ux element interactions.",
      "I position your company brand.",
      "Design and mockups or products for companies.",
    ],
    order: 3,
  },
];

const mapRow = (r) =>
  isTruthy(r.tampilkan) && r.judul
    ? {
        title: r.judul,
        icon: r.ikon || DEFAULT_ICON,
        description: r.deskripsi || "",
        items: (r.poin || "")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        order: Number(r.urutan) || 0,
      }
    : null;

export function useServices() {
  return useSheetList(SHEET_NAME, mapRow, fallbackServices);
}
