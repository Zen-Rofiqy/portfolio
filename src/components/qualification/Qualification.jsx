import React from "react";
import "./qualification.css";

const Qualification = () => {
  return (
    <section className="qualification section">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personel journey</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div className="qualification__button qualification__active button--flex">
            <i className="uil uil-graduation-cap qualification__icon"></i>
            Education
          </div>

          <div className="qualification__button button--flex">
            <i className="uil uil-briefcase-alt qualification__icon"></i>
            Experience
          </div>
        </div>

        <div className="qualification__sections">
          <div className="qualification__content qualification__content-active">
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">
                  Statistics & Data Science
                </h3>
                <span className="qualification__subtitle">IPB University</span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> Aug 2021 - Aug 2025
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">
                  Machine Learning Cohort
                </h3>
                <span className="qualification__subtitle">Bangkit Academy</span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> Feb 2024 - Jul 2024
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">Natural Science</h3>
                <span className="qualification__subtitle">SMAN 1 Cibadak</span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> Jan 2018 - Apr 2021
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">Nah</h3>
                <span className="qualification__subtitle">
                  Institut Pertanian Bogor
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> 2021 - Present
                </div>
              </div>
            </div>
          </div>

          <div className="qualification__content">
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Data Analyst</h3>
                <span className="qualification__subtitle">
                  PT.ASDP Indonesia Ferry (Persero)
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> Sep 2024 - Des 2024
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">
                  Machine Learning Cohort
                </h3>
                <span className="qualification__subtitle">Bangkit Academy</span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> Feb 2024 - Jul 2024
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">Secretary</h3>
                <span className="qualification__subtitle">
                  Chess Unity of Agriculture IPB
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> Feb 2023 - Feb 2024
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>

              <div>
                <h3 className="qualification__title">
                  Graphic Designer and Data Analyst
                </h3>
                <span className="qualification__subtitle">
                  Big Data Agrotourism PKM-RSH IPB University
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"></i> Jan 2023 - Feb 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
