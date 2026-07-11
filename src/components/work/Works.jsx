import React, { useEffect, useMemo, useState } from "react";
import { fallbackProjects, fetchProjects } from "./Data";
import WorkItems from "./WorkItems";

const Works = () => {
  // Mulai dengan data cadangan supaya kartu langsung tampil,
  // lalu ditimpa data Google Sheet begitu selesai di-fetch.
  const [allProjects, setAllProjects] = useState(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState("all");

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

  const projects = useMemo(
    () =>
      activeCategory === "all"
        ? allProjects
        : allProjects.filter((p) => p.category === activeCategory),
    [allProjects, activeCategory]
  );

  return (
    <div>
      <div className="work__filters">
        {categories.map((cat) => (
          <span
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${activeCategory === cat ? "active-work" : ""} work__item`}
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="work__container container grid">
        {projects.map((item) => (
          <WorkItems item={item} key={item.folder} />
        ))}
      </div>
    </div>
  );
};

export default Works;
