import React, { useState } from "react";
import "./qualification.css";
import { useQualifications } from "./Data";

// Satu baris timeline; posisi kiri/kanan berselang-seling (zig-zag).
const TimelineItem = ({ item, left }) => {
  const content = (
    <div>
      <h3 className="qualification__title">{item.title}</h3>
      <span className="qualification__subtitle">{item.place}</span>
      <div className="qualification__calendar">
        <i className="uil uil-calendar-alt"></i> {item.period}
      </div>
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

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);
  const items = useQualifications();

  const toggleTab = (index) => {
    setToggleState(index);
  };

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
            <i className="uil uil-graduation-cap qualification__icon"></i>
            Education
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i>
            Experience
          </div>
        </div>

        <div className="qualification__sections">
          <div /* Education */
            className={
              toggleState === 1
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {education.map((item, idx) => (
              <TimelineItem
                key={`${item.title}-${idx}`}
                item={item}
                left={idx % 2 === 0}
              />
            ))}
          </div>

          <div /* Experience */
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {experience.map((item, idx) => (
              <TimelineItem
                key={`${item.title}-${idx}`}
                item={item}
                left={idx % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
