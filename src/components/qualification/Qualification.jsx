import React from "react";
import "./qualification.css";

const Qualification = () => {
  return (
    <section className="qualification section">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personel journey</span>

      <div className="qualification__container cointainer">
        <div className="qualification__tabs">
          <div className="qualification__button qualification__active button--flex">
            <i className="uil uil-graduation-cap qualification__icon">
              Education
            </i>
          </div>

          <div className="qualification__button button--flex">
            <i className="uil uil-briefcase-alt qualification__icon">
              Experience
            </i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
