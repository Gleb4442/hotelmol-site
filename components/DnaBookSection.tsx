"use client";

import { useTranslation } from "@/lib/TranslationContext";

export default function DnaBookSection() {
  const { t } = useTranslation();

  return (
    <section
      className="dna-book-section"
      aria-labelledby="dna-section-heading"
    >
      {/* Left: editorial label + heading */}
      <div className="dna-book-intro">
        <span className="dna-eyebrow">{t("about.dna.label")}</span>
        <h2 id="dna-section-heading" className="dna-main-heading">
          {t("about.dna.title")}
        </h2>
      </div>

      {/* Right: the open book */}
      <div className="dna-book-stage" aria-hidden="false">
        <div className="dna-book" role="img" aria-label={t("about.dna.title")}>
          {/* Left page — partially visible, compositional support */}
          <div className="dna-page dna-page-left">
            <div className="dna-page-inner">
              <div className="dna-left-decoration">
                <div className="dna-left-rule" />
                <div className="dna-left-line" />
                <div className="dna-left-line dna-left-line--short" />
                <div className="dna-left-line" />
                <div className="dna-left-line dna-left-line--medium" />
                <div className="dna-left-line" />
                <div className="dna-left-line dna-left-line--short" />
                <div className="dna-page-number dna-page-number--left">12</div>
              </div>
            </div>
            {/* Left page inner shadow near spine */}
            <div className="dna-page-gutter-shadow dna-page-gutter-shadow--left" />
          </div>

          {/* Spine / gutter */}
          <div className="dna-spine">
            <div className="dna-spine-inner" />
          </div>

          {/* Right page — main content surface */}
          <div className="dna-page dna-page-right">
            <div className="dna-page-inner dna-page-inner--right">
              {/* Subtle ruled lines behind the text */}
              <div className="dna-ruled-lines" aria-hidden="true">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="dna-ruled-line" />
                ))}
              </div>

              {/* Book typography */}
              <div className="dna-book-content">
                <p className="dna-book-para">{t("about.dna.description1")}</p>
                <p className="dna-book-para">{t("about.dna.description2")}</p>
                <p className="dna-book-para">{t("about.dna.description3")}</p>
                <p className="dna-book-para dna-book-para--last">
                  {t("about.dna.description4")}
                </p>
              </div>

              <div className="dna-page-number dna-page-number--right">13</div>
            </div>
            {/* Right page inner shadow near spine */}
            <div className="dna-page-gutter-shadow dna-page-gutter-shadow--right" />
            {/* Right page outer drop shadow */}
            <div className="dna-page-edge-shadow" />
          </div>
        </div>
      </div>

      <style>{`
        /* ─── Section wrapper ──────────────────────────────────────── */
        .dna-book-section {
          position: relative;
          background-color: #F7F5F1;
          overflow: hidden;
          display: flex;
          align-items: center;
          min-height: 640px;
          padding: 80px 0 80px 0;
        }

        /* ─── Left intro column ────────────────────────────────────── */
        .dna-book-intro {
          position: relative;
          z-index: 2;
          padding-left: max(24px, calc((100vw - 1152px) / 2 + 24px));
          padding-right: 48px;
          max-width: 420px;
          flex-shrink: 0;
        }

        .dna-eyebrow {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0752A0;
          margin-bottom: 16px;
        }

        .dna-main-heading {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700;
          line-height: 1.2;
          color: #1a1a1a;
          margin: 0;
        }

        /* ─── Book stage (perspective container) ──────────────────── */
        .dna-book-stage {
          position: absolute;
          right: -60px;
          top: 50%;
          transform: translateY(-50%);
          perspective: 1400px;
          perspective-origin: 30% 50%;
          /* Allow book to overflow right edge */
          overflow: visible;
          z-index: 1;
        }

        /* ─── Book wrapper (3-D tilt) ──────────────────────────────── */
        .dna-book {
          display: flex;
          align-items: stretch;
          transform:
            rotateY(-12deg)
            rotateZ(-1.5deg)
            translateX(0);
          transform-style: preserve-3d;
          filter: drop-shadow(0 24px 48px rgba(0,0,0,0.18)) drop-shadow(0 6px 16px rgba(0,0,0,0.10));
          transition: filter 0.5s ease;
          will-change: transform;
        }

        .dna-book:hover {
          filter: drop-shadow(0 28px 56px rgba(0,0,0,0.22)) drop-shadow(0 8px 20px rgba(0,0,0,0.12));
        }

        /* ─── Shared page styles ───────────────────────────────────── */
        .dna-page {
          position: relative;
          background: #FAF8F4;
          overflow: hidden;
        }

        /* Subtle paper texture via noise */
        .dna-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          background-repeat: repeat;
          pointer-events: none;
          z-index: 0;
          mix-blend-mode: multiply;
          opacity: 0.5;
        }

        /* ─── Left page ────────────────────────────────────────────── */
        .dna-page-left {
          width: 240px;
          min-height: 500px;
          border-radius: 3px 0 0 3px;
          /* A very slight inward curve illusion via skew */
          transform: skewY(0.3deg);
          background: linear-gradient(
            to right,
            #F0EDE7 0%,
            #F7F5F1 60%,
            #FAF8F4 100%
          );
        }

        .dna-page-inner {
          position: relative;
          z-index: 1;
          padding: 40px 28px 36px 32px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Left page decorative ruled lines to mimic printed text */
        .dna-left-decoration {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-top: 8px;
        }

        .dna-left-rule {
          width: 60px;
          height: 2px;
          background: rgba(7, 82, 160, 0.25);
          margin-bottom: 20px;
          border-radius: 1px;
        }

        .dna-left-line {
          height: 1px;
          background: rgba(30, 30, 30, 0.08);
          border-radius: 1px;
          margin-bottom: 15px;
          width: 100%;
        }
        .dna-left-line--short { width: 55%; }
        .dna-left-line--medium { width: 75%; }

        /* ─── Spine / gutter ───────────────────────────────────────── */
        .dna-spine {
          width: 14px;
          flex-shrink: 0;
          position: relative;
          background: linear-gradient(
            to right,
            #C8C2B8 0%,
            #B8B2A8 30%,
            #C8C2B8 55%,
            #D4CFC8 100%
          );
          box-shadow:
            inset -3px 0 8px rgba(0,0,0,0.12),
            inset 3px 0 6px rgba(0,0,0,0.08);
          transform: scaleX(1.05);
        }

        .dna-spine-inner {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.1) 0%,
            transparent 40%,
            rgba(255,255,255,0.1) 70%,
            transparent 100%
          );
        }

        /* ─── Right page ───────────────────────────────────────────── */
        .dna-page-right {
          width: 360px;
          border-radius: 0 3px 3px 0;
          transform: skewY(-0.3deg);
          background: linear-gradient(
            to right,
            #FAF8F4 0%,
            #FDFCF9 70%,
            #FEFEFE 100%
          );
        }

        .dna-page-inner--right {
          padding: 40px 36px 36px 28px;
          position: relative;
        }

        /* Subtle ruled lines in background */
        .dna-ruled-lines {
          position: absolute;
          inset: 40px 36px 36px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: none;
          z-index: 0;
        }

        .dna-ruled-line {
          height: 1px;
          background: rgba(30, 30, 30, 0.045);
          width: 100%;
        }

        /* ─── Book content typography ──────────────────────────────── */
        .dna-book-content {
          position: relative;
          z-index: 1;
        }

        .dna-book-para {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 0.78rem;
          line-height: 1.75;
          color: #2C2A27;
          margin: 0 0 14px 0;
          text-align: justify;
          hyphens: auto;
          /* First line indent for each paragraph */
          text-indent: 1.2em;
        }

        .dna-book-para:first-child {
          text-indent: 0;
        }

        .dna-book-para--last {
          margin-bottom: 0;
        }

        /* ─── Page numbers ─────────────────────────────────────────── */
        .dna-page-number {
          font-family: 'Georgia', serif;
          font-size: 0.62rem;
          color: rgba(44, 42, 39, 0.35);
          letter-spacing: 0.04em;
          margin-top: auto;
          padding-top: 16px;
        }

        .dna-page-number--left { text-align: left; }
        .dna-page-number--right { text-align: right; }

        /* ─── Gutter shadow overlays ───────────────────────────────── */
        .dna-page-gutter-shadow {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 28px;
          pointer-events: none;
          z-index: 2;
        }

        .dna-page-gutter-shadow--left {
          right: 0;
          background: linear-gradient(
            to left,
            rgba(0,0,0,0.07) 0%,
            transparent 100%
          );
        }

        .dna-page-gutter-shadow--right {
          left: 0;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.09) 0%,
            transparent 100%
          );
        }

        /* Right page outer edge shadow */
        .dna-page-edge-shadow {
          position: absolute;
          top: 4px;
          right: -6px;
          bottom: 4px;
          width: 8px;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.06) 0%,
            transparent 100%
          );
          border-radius: 0 2px 2px 0;
          pointer-events: none;
        }

        /* ─── Page-bottom edge illusion (stacked pages) ────────────── */
        .dna-page-left::after,
        .dna-page-right::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 2px;
          right: 2px;
          height: 6px;
          background: linear-gradient(to bottom, #E8E4DC, #DDD9D0);
          border-radius: 0 0 2px 2px;
          z-index: 0;
        }

        /* ─── Responsive ───────────────────────────────────────────── */

        /* Large desktop: book is fully visible + slightly larger */
        @media (min-width: 1200px) {
          .dna-book-stage {
            right: -80px;
          }
          .dna-page-left { width: 260px; }
          .dna-page-right { width: 380px; }
          .dna-book {
            rotateY(-10deg);
          }
        }

        /* Tablet */
        @media (max-width: 1024px) and (min-width: 641px) {
          .dna-book-section {
            flex-direction: column;
            align-items: flex-start;
            padding: 64px 0 200px 0;
            min-height: unset;
          }

          .dna-book-intro {
            max-width: 100%;
            padding-left: 24px;
            padding-right: 24px;
            margin-bottom: 0;
          }

          .dna-book-stage {
            position: absolute;
            right: -40px;
            bottom: 16px;
            top: auto;
            transform: none;
            perspective: 1000px;
          }

          .dna-book {
            transform:
              rotateY(-14deg)
              rotateZ(-2deg);
          }

          .dna-page-left { width: 160px; min-height: 380px; }
          .dna-page-right { width: 280px; }
          .dna-book-para { font-size: 0.72rem; }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .dna-book-section {
            flex-direction: column;
            padding: 56px 0 56px 0;
            min-height: unset;
            overflow: visible;
          }

          .dna-book-intro {
            padding-left: 24px;
            padding-right: 24px;
            max-width: 100%;
            margin-bottom: 32px;
          }

          .dna-book-stage {
            position: relative;
            right: auto;
            top: auto;
            transform: none;
            perspective: 900px;
            width: 100%;
            display: flex;
            justify-content: center;
            overflow: hidden;
          }

          /* On mobile: collapse to just right page, no tilt */
          .dna-page-left {
            display: none;
          }

          .dna-spine {
            display: none;
          }

          .dna-book {
            transform: none;
            filter: drop-shadow(0 8px 24px rgba(0,0,0,0.14));
            border-radius: 6px;
            overflow: hidden;
          }

          .dna-page-right {
            width: 100%;
            max-width: 380px;
            border-radius: 6px;
            background: #FAF8F4;
          }

          .dna-page-inner--right {
            padding: 32px 24px 28px 24px;
          }

          .dna-book-para {
            font-size: 0.8rem;
            text-align: left;
            text-indent: 0;
          }

          .dna-page-gutter-shadow--right {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
