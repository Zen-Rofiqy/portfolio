import React, { useEffect, useMemo, useState } from "react";
import { fallbackProjects, fetchProjects } from "./Data";
import { useDetails } from "./details";
import WorkItems from "./WorkItems";
import WorkDetail from "./WorkDetail";

// Berapa kartu yang tampil di awal & penambahan tiap klik "Show more".
const PAGE_SIZE = 6;

const Works = () => {
  // Mulai dengan data cadangan supaya kartu langsung tampil,
  // lalu ditimpa data Google Sheet begitu selesai di-fetch.
  const [allProjects, setAllProjects] = useState(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState("all");
  // Proyek yang modal detailnya sedang terbuka (null = tertutup).
  const [activeDetail, setActiveDetail] = useState(null);
  // Jumlah kartu yang sedang ditampilkan (bertambah lewat "Show more").
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    let alive = true;
    fetchProjects()
      .then((list) => {
        if (alive && list && list.length) setAllProjects(list);
      })
      .catch((err) =>
        console.warn("Portfolio: gagal ambil Google Sheet, pakai data cadangan.", err)
      );
    return () => {
      alive = false;
    };
  }, []);

  // Filter kategori diturunkan otomatis dari data (tak perlu hardcode).
  const categories = useMemo(() => {
    const uniq = [];
    allProjects.forEach((p) => {
      if (p.category && !uniq.includes(p.category)) uniq.push(p.category);
    });
    return ["all", ...uniq];
  }, [allProjects]);

  // Peta detail (dari Sheet, fallback ke kode) untuk modal "Details".
  const details = useDetails();

  // Lampirkan konten detail (kalau ada) ke tiap proyek berdasarkan folder.
  const withDetail = useMemo(
    () => allProjects.map((p) => ({ ...p, detail: details[p.folder] || null })),
    [allProjects, details]
  );

  const projects = useMemo(
    () =>
      activeCategory === "all"
        ? withDetail
        : withDetail.filter((p) => p.category === activeCategory),
    [withDetail, activeCategory]
  );

  // Ganti kategori → mulai lagi dari halaman pertama.
  const selectCategory = (cat) => {
    setActiveCategory(cat);
    setVisible(PAGE_SIZE);
  };

  const shown = projects.slice(0, visible);
  const hasMore = visible < projects.length;

  return (
    <div>
      <div className="work__filters">
        {categories.map((cat) => (
          <span
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`${activeCategory === cat ? "active-work" : ""} work__item`}
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="work__container container grid">
        {shown.map((item) => (
          <WorkItems
            item={item}
            key={item.folder}
            onOpenDetail={setActiveDetail}
          />
        ))}
      </div>

      {hasMore && (
        <div className="work__more">
          <button
            className="button button--flex"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Show more
            <i className="uil uil-arrow-down button__icon"></i>
          </button>
        </div>
      )}

      {activeDetail && (
        <WorkDetail
          project={activeDetail}
          detail={activeDetail.detail}
          onClose={() => setActiveDetail(null)}
        />
      )}
    </div>
  );
};

export default Works;
