import React from "react";
import "./footer.css";
import { useSocials, inFooter, SocialIcon } from "../../lib/socials";

const Footer = () => {
  const socials = useSocials().filter(inFooter);

  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Zen Rofiqy</h1>

        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>

          <li>
            <a href="#portfolio" className="footer__link">
              Projects
            </a>
          </li>

          <li>
            <a href="#testimonials" className="footer__link">
              Testimonials
            </a>
          </li>
        </ul>

        <div className="footer__social">
          {socials.map((s) => (
            <a
              key={s.name + s.link}
              href={s.link}
              className="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              aria-label={s.name}
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>

        <span className="footer__copy">
          &#169; Crypticalcoder. All rigths reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
