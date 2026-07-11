import React from "react";
import { coverUrl } from "./Data";

const WorkItems = ({ item }) => {
  const hasLink = item.link && item.link !== "#";

  return (
    <div className="work__card">
      <img src={coverUrl(item.folder)} alt={item.title} className="work__img" />
      <h3 className="work__title">{item.title}</h3>
      <a
        href={hasLink ? item.link : "#"}
        className="work__button"
        {...(hasLink ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        Details <i className="bx bx-right-arrow-alt work__button-icon"></i>
      </a>
    </div>
  );
};

export default WorkItems;
