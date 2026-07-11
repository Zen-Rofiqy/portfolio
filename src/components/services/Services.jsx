import React, { useState } from "react";
import "./services.css";
import { useServices } from "./Data";

// Judul kartu boleh 2 baris (dipisah Enter di sel Sheet).
const MultilineTitle = ({ text }) =>
  text.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </React.Fragment>
  ));

const Services = () => {
  const services = useServices();
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section className="service section" id="services">
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">What i offer</span>

      <div className="services__container container grid">
        {services.map((service, idx) => (
          <div className="services__content" key={`${service.title}-${idx}`}>
            <div>
              <i className={`uil ${service.icon} services__icon`}></i>
              <h3 className="services__title">
                <MultilineTitle text={service.title} />
              </h3>
            </div>

            <span className="services__button" onClick={() => toggleTab(idx + 1)}>
              View More
              <i className="uil uil-arrow-right services__button-icon"></i>
            </span>

            <div
              className={
                toggleState === idx + 1
                  ? "services__modal active-modal"
                  : "services__modal"
              }
            >
              <div className="services__modal-content">
                <i
                  onClick={() => toggleTab(0)}
                  className="uil uil-times services__modal-close"
                ></i>

                <h3 className="services__modal-title">
                  {service.title.replace(/\n/g, " ")}
                </h3>
                <p className="services__modal-description">
                  {service.description}
                </p>

                <ul className="services__modal-services grid">
                  {service.items.map((info, i) => (
                    <li className="services__modal-service" key={i}>
                      <i className="uil uil-check-circle services__modal-icon"></i>
                      <p className="services__modal-info">{info}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
