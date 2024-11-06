import React from "react";
import "./skills.css";
import Frontend from "./Frontend";
import Design from "./Design";
import DataScience from "./DataScience";
import DataAnalysis from "./DataAnalysis";
import DataViz from "./DataViz";
import Database from "./Database";

const Skills = () => {
  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">My technical level</span>

      <div className="skills__container container grid">
        <DataScience />
        <DataAnalysis />
        <DataViz />
        <Database />
        <Design />
        <Frontend />
      </div>
    </section>
  );
};

export default Skills;
