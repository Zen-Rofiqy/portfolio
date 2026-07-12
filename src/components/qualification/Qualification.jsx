import React, { useState } from "react";
import "./qualification.css";
import { useQualifications } from "./Data";
import { useDetails } from "../work/details";
import WorkDetail from "../work/WorkDetail";

// Satu baris timeline; posisi kiri/kanan berselang-seling (zig-zag).
// Kalau item punya `detail` (dari kolom Folder yang match di details.jsx),
// blok kontennya bisa diklik untuk membuka modal Details.
const TimelineItem = ({ item, left, detail, onOpen }) => {
  const clickable = Boolean(detail);
  const open = () => onOpen(item, detail);

  const content = (
    <div
      className={
        clickable
          ? "qualification__block qualification__block--link"
          : "qualification__block"
      }
      onClick={clickable ? open : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open();
              }
            }
          : undefined
      }
    >
      <h3 className="qualification__title">{item.title}</h3>
      <span className="qualification__subtitle">{item.place}</span>
      <div className="qualification__calendar">
        <i className="uil uil-calendar-alt"></i> {item.period}
      </div>
      {clickable && (
        <span className="qualification__details">
          Details <i className="uil uil-arrow-right"></i>
        </span>
      )}
    </div>
  );

  const marker = (
    <div>
      <span className="qualification__rounder"></span>
      <span className="qualification__line"></span>
    </div>
  );

  return (
    <div className="qualification__data">
      {left ? (
        <>
          {content}
          {marker}
        </>
      ) : (
        <>
          <div></div>
          {marker}
          {content}
        </>
      )}
    </div>
  );
};

// Entri awal yang tampil per tab; sisanya di balik "Show more".
const PAGE_SIZE = 5;

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);
  // Modal Details yang sedang terbuka: { project, detail } | null.
  const [active, setActive] = useState(null);
  // Batas entri yang ditampilkan per tab (bertambah lewat "Show more").
  const [expVisible, setExpVisible] = useState(PAGE_SIZE);
  const [eduVisible, setEduVisible] = useState(PAGE_SIZE);
  const items = useQualifications();
  // Peta detail (dari Sheet, fallback ke kode) untuk modal "Details".
  const details = useDetails();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  // Buka modal Details untuk satu entri timeline. `project` dibentuk
  // seperlunya (folder + title) agar cocok dengan WorkDetail.
  const openDetail = (item, detail) =>
    setActive({ project: { folder: item.folder, title: item.title }, detail });
  const closeDetail = () => setActive(null);

  // Detail hanya ada bila kolom Folder terisi & slug-nya dikenal.
  const detailFor = (item) => (item.folder ? details[item.folder] || null : null);

  const education = items.filter((q) => q.tab === "education");
  const experience = items.filter((q) => q.tab === "experience");

  return (
    <section className="qualification section">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personel journey</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className={
              toggleState === 1
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i>
            Experience
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i>
            Education
          </div>
        </div>

        <div className="qualification__sections">
          <div /* Experience */
            className={
              toggleState === 1
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {experience.slice(0, expVisible).map((item, idx) => (
              <TimelineItem
                key={`${item.title}-${idx}`}
                item={item}
                left={idx % 2 === 0}
                detail={detailFor(item)}
                onOpen={openDetail}
              />
            ))}
            {expVisible < experience.length && (
              <div className="qualification__more">
                <button
                  className="button button--flex"
                  onClick={() => setExpVisible((v) => v + PAGE_SIZE)}
                >
                  Show more
                  <i className="uil uil-arrow-down button__icon"></i>
                </button>
              </div>
            )}
          </div>

          <div /* Education */
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {education.slice(0, eduVisible).map((item, idx) => (
              <TimelineItem
                key={`${item.title}-${idx}`}
                item={item}
                left={idx % 2 === 0}
                detail={detailFor(item)}
                onOpen={openDetail}
              />
            ))}
            {eduVisible < education.length && (
              <div className="qualification__more">
                <button
                  className="button button--flex"
                  onClick={() => setEduVisible((v) => v + PAGE_SIZE)}
                >
                  Show more
                  <i className="uil uil-arrow-down button__icon"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {active && (
        <WorkDetail
          project={active.project}
          detail={active.detail}
          onClose={closeDetail}
        />
      )}
    </section>
  );
};

export default Qualification;
