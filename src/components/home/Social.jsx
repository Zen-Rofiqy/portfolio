import React from "react";
import { useSocials, inSide, SocialIcon } from "../../lib/socials";

const Social = () => {
  const socials = useSocials().filter(inSide);

  return (
    <div className="home__social">
      {socials.map((s) => (
        <a
          key={s.name + s.link}
          href={s.link}
          className="home__social-icon"
          target="_blank"
          rel="noopener noreferrer"
          title={s.name}
          aria-label={s.name}
        >
          <SocialIcon icon={s.icon} />
        </a>
      ))}
    </div>
  );
};

export default Social;
