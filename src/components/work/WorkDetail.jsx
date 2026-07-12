import React, { useEffect, useState, useCallback } from "react";
import "./workDetail.css";
import { coverUrl } from "./Data";
import { mediaUrl, orgLogoUrl } from "./details";

// Jenis media ditentukan dari field yang diisi.
const kindOf = (m) => (m.img ? "image" : m.file ? "file" : "link");

// Thumbnail dengan fallback ke ikon kalau gambar tak ada / gagal dimuat.
const MediaThumb = ({ src, alt, kind }) => {
  const [broken, setBroken] = useState(false);
  if (!src || broken) {
    const icon = kind === "link" ? "uil-link" : "uil-file-alt";
    return (
      <span className="wd__media-thumb wd__media-thumb--icon">
        <i className={`uil ${icon}`}></i>
      </span>
    );
  }
  return (
    <span className="wd__media-thumb">
      <img src={src} alt={alt} loading="lazy" onError={() => setBroken(true)} />
    </span>
  );
};

// Modal detail proyek (ala LinkedIn): deskripsi + galeri media + skill.
// Dipasang sekali di Works.jsx; `project` & `detail` di-set saat kartu dibuka.
const WorkDetail = ({ project, detail, onClose }) => {
  // index media yang sedang dilihat besar (lightbox); null = tertutup.
  const [lightbox, setLightbox] = useState(null);

  const media = detail?.media || [];
  const folder = project?.folder;

  // Hanya gambar yang bisa dibuka besar (lightbox). PDF/link buka tab baru.
  const viewable = media.filter((m) => kindOf(m) === "image");

  const thumbSrc = (m) => {
    if (m.thumb) return mediaUrl(folder, m.thumb);
    if (m.img) return mediaUrl(folder, m.img);
    return null; // → ikon placeholder
  };

  const hintOf = (m) => {
    const kind = kindOf(m);
    if (kind === "image") return { label: "View", icon: "uil-search-plus" };
    if (kind === "file")
      return {
        label: /\.pdf$/i.test(m.file) ? "Open PDF" : "Open file",
        icon: "uil-import",
      };
    return { label: "Open link", icon: "uil-external-link-alt" };
  };

  const openMedia = (m) => {
    const kind = kindOf(m);
    if (kind === "image") {
      const idx = viewable.indexOf(m);
      setLightbox(idx >= 0 ? idx : 0);
    } else if (kind === "file") {
      window.open(mediaUrl(folder, m.file), "_blank", "noreferrer");
    } else {
      window.open(m.link, "_blank", "noreferrer");
    }
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextMedia = useCallback(
    () => setLightbox((i) => (i + 1) % viewable.length),
    [viewable.length]
  );
  const prevMedia = useCallback(
    () => setLightbox((i) => (i - 1 + viewable.length) % viewable.length),
    [viewable.length]
  );

  // Esc menutup (lightbox dulu, lalu modal) + panah untuk navigasi lightbox.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        lightbox !== null ? closeLightbox() : onClose();
      } else if (lightbox !== null && e.key === "ArrowRight") {
        nextMedia();
      } else if (lightbox !== null && e.key === "ArrowLeft") {
        prevMedia();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, onClose, closeLightbox, nextMedia, prevMedia]);

  // Kunci scroll body selama modal terbuka.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!project || !detail) return null;

  return (
    <div className="wd__overlay" onClick={onClose}>
      <div
        className="wd__content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <button className="wd__close" onClick={onClose} aria-label="Close">
          <i className="uil uil-times"></i>
        </button>

        <div className="wd__banner">
          <img src={coverUrl(project.folder)} alt={project.title} />
        </div>

        <div className="wd__body">
          <div className="wd__head">
            {detail.org?.logo &&
              (detail.org.link ? (
                <a
                  className="wd__org-logo"
                  href={detail.org.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={detail.org.name}
                >
                  <img src={orgLogoUrl(detail.org.logo)} alt={detail.org.name} />
                </a>
              ) : (
                <span className="wd__org-logo">
                  <img src={orgLogoUrl(detail.org.logo)} alt={detail.org.name} />
                </span>
              ))}

            <div className="wd__head-text">
              <h3 className="wd__title">{project.title}</h3>
              {detail.org?.name &&
                (detail.org.link ? (
                  <a
                    className="wd__org-name"
                    href={detail.org.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {detail.org.name}
                    <i className="uil uil-external-link-alt"></i>
                  </a>
                ) : (
                  <span className="wd__org-name">{detail.org.name}</span>
                ))}
              {detail.subtitle && (
                <p className="wd__subtitle">{detail.subtitle}</p>
              )}
            </div>
          </div>

          {detail.meta?.length > 0 && (
            <ul className="wd__meta">
              {detail.meta.map((m, i) => (
                <li className="wd__meta-item" key={i}>
                  {m}
                </li>
              ))}
            </ul>
          )}

          {detail.description?.length > 0 && (
            <ul className="wd__desc">
              {detail.description.map((d, i) => (
                <li className="wd__desc-item" key={i}>
                  {d}
                </li>
              ))}
            </ul>
          )}

          {media.length > 0 && (
            <div className="wd__section">
              <h4 className="wd__section-title">
                Media <span className="wd__count">({media.length})</span>
              </h4>
              <div className="wd__media-list">
                {media.map((m, i) => {
                  const hint = hintOf(m);
                  return (
                    <button
                      className="wd__media"
                      key={i}
                      onClick={() => openMedia(m)}
                      title={m.title}
                    >
                      <MediaThumb
                        src={thumbSrc(m)}
                        alt={m.title}
                        kind={kindOf(m)}
                      />
                      <span className="wd__media-info">
                        <span className="wd__media-title">{m.title}</span>
                        <span className="wd__media-hint">
                          {hint.label}
                          <i className={`uil ${hint.icon}`}></i>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {detail.skills?.length > 0 && (
            <div className="wd__section">
              <h4 className="wd__section-title">Skills</h4>
              <div className="wd__skills">
                {detail.skills.map((s, i) => (
                  <span className="wd__skill" key={i}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox gambar besar */}
      {lightbox !== null && viewable[lightbox] && (
        <div
          className="wd__lightbox"
          onClick={(e) => {
            e.stopPropagation();
            closeLightbox();
          }}
        >
          <button
            className="wd__lb-close"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close image"
          >
            <i className="uil uil-times"></i>
          </button>

          {viewable.length > 1 && (
            <button
              className="wd__lb-nav wd__lb-prev"
              onClick={(e) => {
                e.stopPropagation();
                prevMedia();
              }}
              aria-label="Previous"
            >
              <i className="uil uil-angle-left"></i>
            </button>
          )}

          <figure
            className="wd__lb-figure"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={mediaUrl(folder, viewable[lightbox].img)}
              alt={viewable[lightbox].title}
            />
            <figcaption className="wd__lb-caption">
              {viewable[lightbox].title}
              {viewable.length > 1 && (
                <span className="wd__lb-count">
                  {lightbox + 1} / {viewable.length}
                </span>
              )}
            </figcaption>
          </figure>

          {viewable.length > 1 && (
            <button
              className="wd__lb-nav wd__lb-next"
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              aria-label="Next"
            >
              <i className="uil uil-angle-right"></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkDetail;
