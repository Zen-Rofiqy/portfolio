// ============================================================
//  SOSIAL (ikon link) via Google Sheet — tab "Sosial"
//  ------------------------------------------------------------
//  Satu daftar mengatur DUA tempat sekaligus: ikon di samping
//  Home dan ikon di Footer. Kolom "Lokasi" menentukan di mana
//  tiap item tampil.
//
//  Kolom tab: Tampilkan | Nama | Ikon | Link | Lokasi | Urutan
//  - Nama   : label (dipakai untuk tooltip/aksesibilitas).
//  - Ikon   : nama font-icon ATAU nama file gambar.
//             • Font ikon: "uil-linkedin" (Unicons) atau
//               "bxl-instagram" / "bx-mail-send" (Boxicons).
//               Daftar: iconscout.com/unicons & boxicons.com
//             • Gambar   : "tableau.svg" → diambil dari
//               public/social/. Untuk logo yang tak ada di font
//               (Tableau, Kaggle, RPubs). Gambar ikut warna teks.
//  - Lokasi : "samping" (cuma di Home), "footer" (cuma di Footer),
//             atau "keduanya". Kosong dianggap "keduanya".
//  - Urutan : angka; makin kecil makin awal.
// ============================================================
import { isTruthy, useSheetList } from "./sheet";
import "./socials.css";

const SHEET_NAME = "Sosial";

// Data cadangan — dipakai saat Sheet tak terjangkau / tab belum ada.
// Samping = highlight (LinkedIn, GitHub, Tableau). Footer = semua.
export const fallbackSocials = [
  {
    name: "LinkedIn",
    icon: "uil-linkedin",
    link: "https://www.linkedin.com/in/angga-fathan-rofiqy/",
    lokasi: "keduanya",
    order: 1,
  },
  {
    name: "GitHub",
    icon: "uil-github-alt",
    link: "https://github.com/Zen-Rofiqy",
    lokasi: "keduanya",
    order: 2,
  },
  {
    name: "Tableau",
    icon: "tableau.svg",
    link: "https://public.tableau.com/app/profile/zen.rofiqy/vizzes",
    lokasi: "keduanya",
    order: 3,
  },
  {
    name: "Instagram",
    icon: "uil-instagram",
    link: "https://www.instagram.com/function_runing/",
    lokasi: "footer",
    order: 4,
  },
  {
    name: "X",
    icon: "x.svg",
    link: "https://x.com/f_rofiqy",
    lokasi: "footer",
    order: 5,
  },
  {
    name: "Kaggle",
    icon: "kaggle.svg",
    link: "https://www.kaggle.com/zenrofiqy",
    lokasi: "footer",
    order: 6,
  },
  {
    name: "RPubs",
    icon: "rpubs.svg",
    link: "https://rpubs.com/ZenR_Prog",
    lokasi: "footer",
    order: 7,
  },
];

const mapRow = (r) =>
  isTruthy(r.tampilkan) && r.link
    ? {
        name: r.nama || "",
        icon: r.ikon || "",
        link: r.link,
        lokasi: (r.lokasi || "keduanya").toLowerCase(),
        order: Number(r.urutan) || 0,
      }
    : null;

export function useSocials() {
  return useSheetList(SHEET_NAME, mapRow, fallbackSocials);
}

// Filter lokasi
export const inSide = (s) => s.lokasi === "samping" || s.lokasi === "keduanya";
export const inFooter = (s) => s.lokasi === "footer" || s.lokasi === "keduanya";

// ============================================================
//  Renderer ikon: otomatis bedakan font-icon vs gambar.
//  - Berakhiran .svg/.png/.jpg/.webp → dirender sebagai gambar
//    (mask, mewarisi color & font-size elemen induk).
//  - Selain itu → font-icon: "uil-…" (Unicons) / "bx…" (Boxicons).
//  className diteruskan ke elemennya (mis. "contact__card-icon").
// ============================================================
export function SocialIcon({ icon, className = "" }) {
  if (/\.(svg|png|jpe?g|webp)$/i.test(icon)) {
    const src = icon.includes("/") ? icon : `/social/${icon}`;
    return (
      <span
        className={`social__img-icon ${className}`.trim()}
        style={{ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }}
        aria-hidden="true"
      />
    );
  }
  const family = icon.startsWith("uil-") ? "uil" : "bx";
  return <i className={`${family} ${icon} ${className}`.trim()} aria-hidden="true"></i>;
}
