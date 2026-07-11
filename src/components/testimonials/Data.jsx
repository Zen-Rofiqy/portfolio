// ============================================================
//  TESTIMONI via Google Sheet — tab "Testimoni"
//  ------------------------------------------------------------
//  Kolom tab: Tampilkan | Nama | Deskripsi | Foto | Urutan
//  Kolom "Foto" = nama file di public/testimonials/,
//  mis. testimonial1.png (file baru tetap lewat commit+push).
// ============================================================
import { isTruthy, useSheetList } from "../../lib/sheet";
import Image1 from "../../assets/testimonial1.png";
import Image2 from "../../assets/testimonial2.png";
import Image3 from "../../assets/testimonial3.png";

const SHEET_NAME = "Testimoni";

// Bangun path foto dari nama file di public/testimonials/.
const photoUrl = (file) =>
  `${import.meta.env.BASE_URL}testimonials/${file}`;

// Data cadangan — dipakai saat Sheet tak terjangkau / tab belum ada.
export const fallbackTestimonials = [
  {
    image: Image1,
    title: "Jhon Doe",
    description:
      "A really good job, all aspects of the project were followed step by step and with good results.",
    order: 1,
  },
  {
    image: Image2,
    title: "Harry Clinton",
    description:
      "A really good job, all aspects of the project were followed step by step and with good results.",
    order: 2,
  },
  {
    image: Image3,
    title: "Sara Cill",
    description:
      "A really good job, all aspects of the project were followed step by step and with good results.",
    order: 3,
  },
];

const mapRow = (r) =>
  isTruthy(r.tampilkan) && r.nama
    ? {
        image: r.foto ? photoUrl(r.foto) : "",
        title: r.nama,
        description: r.deskripsi || "",
        order: Number(r.urutan) || 0,
      }
    : null;

export function useTestimonials() {
  return useSheetList(SHEET_NAME, mapRow, fallbackTestimonials);
}
