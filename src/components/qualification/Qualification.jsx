import React, { useState } from "react";
import "./qualification.css";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

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
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">
                  Statistics & Data Science
                </h3>
                <span className="qualification__subtitle">IPB University</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Aug 2021 - Aug 2025
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
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Jan 2018 - Apr 2021
                </div>
              </div>
            </div>
          </div>

          <div /* Experience */
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Data Analyst</h3>
                <span className="qualification__subtitle">
                  PT.ASDP Indonesia Ferry (Persero)
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Sep 2024 - Des 2024
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
                <h3 className="qualification__title">Surveyor</h3>
                <span className="qualification__subtitle">IPB University</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Aug 2024
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Media and Branding</h3>
                <span className="qualification__subtitle">
                  KKN-T IPB 2024 | Sukawening Village
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Jun 2024 - Aug 2024
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
                <h3 className="qualification__title">
                  Machine Learning Cohort
                </h3>
                <span className="qualification__subtitle">Bangkit Academy</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Feb 2024 - Jul 2024
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Secretary</h3>
                <span className="qualification__subtitle">
                  Chess Unity of Agriculture IPB
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Feb 2023 - Feb 2024
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
                <h3 className="qualification__title">
                  Graphic Designer and Data Analyst
                </h3>
                <span className="qualification__subtitle">
                  Big Data Agrotourism PKM-RSH IPB University
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Jan 2023 - Feb 2024
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">
                  Staff of Documentation Decoration Design division
                </h3>
                <span className="qualification__subtitle">
                  PORSTAT IPB 2022
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Nov 2022 - Feb 2023
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
                <h3 className="qualification__title">
                  Media Branding Department
                </h3>
                <span className="qualification__subtitle">
                  Gamma Sigma Beta IPB
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Sep 2022 - Dec 2022
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">
                  Staff of Branding Decor Design Division
                </h3>
                <span className="qualification__subtitle">
                  SPIRIT FMIPA IPB
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Mar 2022 - Sep 2022
                </div>
              </div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
