import React from "react";
import { useTexts } from "../../lib/texts";

const Info = () => {
  const t = useTexts();

  return (
    <div className="about__info grid">
      <div className="about__box">
        <i class="bx bx-award about__icon"></i>

        <h3 className="about__title">Experience</h3>
        <span className="about__subtitle">{t.about_pengalaman}</span>
      </div>

      <div className="about__box">
        <i class="bx bx-briefcase-alt about__icon"></i>

        <h3 className="about__title">Completed</h3>
        <span className="about__subtitle">{t.about_proyek}</span>
      </div>

      <div className="about__box">
        <i class="bx bx-support about__icon"></i>

        <h3 className="about__title">Support</h3>
        <span className="about__subtitle">{t.about_support}</span>
      </div>
    </div>
  );
};

export default Info;
