import React from "react";
import "./skills.css";
import { CATEGORIES, useSkills } from "./Data";
import { ICONS } from "./icons";

const SkillItem = ({ skill }) => (
  <div className="skills__data">
    {ICONS[skill.icon] || null}
    <div>
      <h3 className="skills__name">{skill.name}</h3>
      <span className="skills__level">{skill.level}</span>
    </div>
  </div>
);

const SkillCategory = ({ title, skills }) => {
  if (!skills.length) return null;

  const half = Math.ceil(skills.length / 2);
  const columns = [skills.slice(0, half), skills.slice(half)];

  return (
    <div className="skills__content">
      <h3 className="skills__title">{title}</h3>

      <div className="skills__box">
        {columns.map(
          (column, i) =>
            column.length > 0 && (
              <div className="skills__group" key={i}>
                {column.map((skill, idx) => (
                  <SkillItem key={`${skill.name}-${idx}`} skill={skill} />
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};

const Skills = () => {
  const items = useSkills();

  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">My technical level</span>

      <div className="skills__container container grid">
        {CATEGORIES.map((cat) => (
          <SkillCategory
            key={cat.key}
            title={cat.title}
            skills={items.filter((s) => s.category === cat.key)}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
