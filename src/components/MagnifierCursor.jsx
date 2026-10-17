import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const blobRef = useRef(null);
  const mouse = useRef({ x: -300, y: -300 });
  const ringXY = useRef({ x: -300, y: -300 });
  const blobXY = useRef({ x: -300, y: -300 });
  const raf = useRef(null);
  const [hoverType, setHoverType] = useState("none");
  const lastMagEl = useRef(null);

  useEffect(() => {
    document.documentElement.style.cursor = "none";

    /* ── Mouse tracker ─────────────────────────────────── */
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    /* ── Lag animation loop ─────────────────────────────── */
    const tick = () => {
      const m = mouse.current;
      ringXY.current.x += (m.x - ringXY.current.x) * 0.13;
      ringXY.current.y += (m.y - ringXY.current.y) * 0.13;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringXY.current.x}px, ${ringXY.current.y}px)`;

      blobXY.current.x += (m.x - blobXY.current.x) * 0.055;
      blobXY.current.y += (m.y - blobXY.current.y) * 0.055;
      if (blobRef.current)
        blobRef.current.style.transform = `translate(${blobXY.current.x}px, ${blobXY.current.y}px)`;

      raf.current = requestAnimationFrame(tick);
    };

    /* ── Click ripple ───────────────────────────────────── */
    const onClick = () => {
      ringRef.current?.classList.add("ring-click");
      setTimeout(() => ringRef.current?.classList.remove("ring-click"), 400);
    };

    /* ── Magnify helpers ────────────────────────────────── */
    const MAG_ICON  = "mag-icon";
    const MAG_TEXT  = "mag-text";
    const MAG_LINK  = "mag-link";

    const applyMag = (el, cls) => {
      if (lastMagEl.current && lastMagEl.current !== el) {
        lastMagEl.current.classList.remove(MAG_ICON, MAG_TEXT, MAG_LINK);
      }
      lastMagEl.current = el;
      el.classList.add(cls);
    };

    const clearMag = (el) => {
      el.classList.remove(MAG_ICON, MAG_TEXT, MAG_LINK);
      lastMagEl.current = null;
    };

    /* ── Determine if an <a>/<button> is icon-only ──────── */
    const isIconEl = (el) => {
      const svg = el.querySelector("svg");
      const text = el.innerText?.trim();
      return !!svg && (!text || text.length === 0);
    };

    /* ── Bind all interactive + text elements ───────────── */
    const bound = new WeakSet();

    const bind = () => {
      /* 1. Links & buttons */
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        if (bound.has(el) || el.hasAttribute("data-no-magnify")) return;
        bound.add(el);
        const type = isIconEl(el) ? "icon" : "link";
        const cls  = type === "icon" ? MAG_ICON : MAG_LINK;
        el.addEventListener("mouseenter", () => { setHoverType(type); applyMag(el, cls); });
        el.addEventListener("mouseleave", () => { setHoverType("none"); clearMag(el); });
      });

      /* 2. Standalone SVGs / imgs not inside a link — skip large images */
      document.querySelectorAll("svg, img").forEach((el) => {
        if (
          bound.has(el) ||
          el.closest("a, button") ||
          el.hasAttribute("data-no-magnify")
        ) return;
        bound.add(el);
        el.addEventListener("mouseenter", () => { setHoverType("icon"); applyMag(el, MAG_ICON); });
        el.addEventListener("mouseleave", () => { setHoverType("none"); clearMag(el); });
      });

      /* 3. Text nodes — skip those inside clickable parents */
      document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,li").forEach((el) => {
        if (bound.has(el) || el.closest("a, button") || el.hasAttribute("data-no-magnify")) return;
        bound.add(el);
        el.addEventListener("mouseenter", () => { setHoverType("text"); applyMag(el, MAG_TEXT); });
        el.addEventListener("mouseleave", () => { setHoverType("none"); clearMag(el); });
      });
    };

    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    bind();
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      obs.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const isHovering = hoverType !== "none";
  const isIcon     = hoverType === "icon";
  const isText     = hoverType === "text";

  return (
    <>
      {/* Layer 3 — dreamy glow blob */}
      <div
        ref={blobRef}
        className={`c-blob${isHovering ? " c-blob--on" : ""}${isIcon ? " c-blob--icon" : ""}`}
        aria-hidden="true"
      />

      {/* Layer 2 — trailing ring */}
      <div
        ref={ringRef}
        className={`c-ring${isHovering ? " c-ring--on" : ""}${isIcon ? " c-ring--icon" : ""}${isText ? " c-ring--text" : ""}`}
        aria-hidden="true"
      >
        {isIcon && <span className="c-sym">⊕</span>}
        {isText  && <span className="c-sym c-sym--t">T</span>}
      </div>

      {/* Layer 1 — instant dot */}
      <div
        ref={dotRef}
        className={`c-dot${isHovering ? " c-dot--off" : ""}`}
        aria-hidden="true"
      />

      <style>{`
        *, *::before, *::after { cursor: none !important; }

        /* ─── Shared ──────────────────────────────────── */
        .c-dot, .c-ring, .c-blob {
          position: fixed; top: 0; left: 0;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
        }

        /* ─── Dot ─────────────────────────────────────── */
        .c-dot {
          z-index: 100001;
          width: 7px; height: 7px;
          margin-left: -3.5px; margin-top: -3.5px;
          background: #fff;
          mix-blend-mode: difference;
          transition: opacity 0.2s ease;
        }
        .c-dot--off { opacity: 0; }

        /* ─── Ring ────────────────────────────────────── */
        .c-ring {
          z-index: 100000;
          width: 38px; height: 38px;
          margin-left: -19px; margin-top: -19px;
          border: 1.5px solid rgba(216,180,254,0.6);
          display: flex; align-items: center; justify-content: center;
          transition:
            width  0.45s cubic-bezier(0.16,1,0.3,1),
            height 0.45s cubic-bezier(0.16,1,0.3,1),
            margin 0.45s cubic-bezier(0.16,1,0.3,1),
            background  0.3s ease,
            border-color 0.3s ease,
            box-shadow  0.3s ease;
        }
        /* generic hover (links) */
        .c-ring--on {
          width: 64px; height: 64px;
          margin-left: -32px; margin-top: -32px;
          background: rgba(139,92,246,0.09);
          border-color: rgba(249,168,212,0.7);
          box-shadow: 0 0 16px rgba(168,85,247,0.22);
        }
        /* icon hover */
        .c-ring--icon {
          width: 60px; height: 60px;
          margin-left: -30px; margin-top: -30px;
          background: rgba(192,132,252,0.1);
          border: 2px solid rgba(216,180,254,0.9);
          box-shadow:
            0 0 0 1px rgba(216,180,254,0.12),
            0 0 22px rgba(168,85,247,0.35);
        }
        /* text hover */
        .c-ring--text {
          width: 54px; height: 54px;
          margin-left: -27px; margin-top: -27px;
          background: rgba(139,92,246,0.06);
          border-color: rgba(249,168,212,0.5);
          box-shadow: 0 0 14px rgba(236,72,153,0.18);
        }
        /* click burst */
        @keyframes ripple {
          0%   { box-shadow: 0 0 0 0   rgba(192,132,252,0.6); }
          100% { box-shadow: 0 0 0 24px rgba(192,132,252,0);  }
        }
        .c-ring.ring-click { animation: ripple 0.4s ease-out forwards; }

        /* symbol inside ring */
        .c-sym {
          font-size: 14px; font-weight: 300;
          color: rgba(216,180,254,0.9);
          opacity: 0;
          transition: opacity 0.2s ease 0.12s;
          user-select: none; line-height: 1;
        }
        .c-sym--t {
          font-family: serif; font-style: italic;
          font-size: 16px;
          color: rgba(249,168,212,0.9);
        }
        .c-ring--icon .c-sym,
        .c-ring--text .c-sym { opacity: 1; }

        /* ─── Blob ────────────────────────────────────── */
        .c-blob {
          z-index: 99998;
          width: 300px; height: 300px;
          margin-left: -150px; margin-top: -150px;
          background: radial-gradient(circle,
            rgba(139,92,246,0.16) 0%, rgba(168,85,247,0.07) 42%, transparent 70%);
          filter: blur(30px);
          opacity: 0.6;
          transition: opacity 0.5s ease, background 0.5s ease;
        }
        .c-blob--on {
          opacity: 1;
          background: radial-gradient(circle,
            rgba(236,72,153,0.18) 0%, rgba(139,92,246,0.1) 45%, transparent 70%);
        }
        .c-blob--icon {
          background: radial-gradient(circle,
            rgba(192,132,252,0.22) 0%, rgba(139,92,246,0.1) 40%, transparent 70%);
        }

        /* ══════════════════════════════════════════════
           MAGNIFY — applied to the hovered element itself
        ══════════════════════════════════════════════ */

        /* Base transition for EVERY element that can be magnified */
        h1, h2, h3, h4, h5, h6,
        p, span, li,
        a, button,
        svg, img {
          transition:
            transform   0.35s cubic-bezier(0.34,1.56,0.64,1),
            filter      0.35s ease,
            text-shadow 0.35s ease !important;
          transform-origin: center center;
          display: inline-block;
        }
        /* block-level exceptions */
        p, li, h1, h2, h3, h4, h5, h6 { display: block; }

        /* ── Icon magnify (links with SVG / standalone SVG) ── */
        .mag-icon {
          transform: scale(1.45) !important;
          filter:
            drop-shadow(0 0 8px  rgba(192,132,252,0.85))
            drop-shadow(0 0 18px rgba(168,85,247,0.5))  !important;
        }
        /* Make the SVG inside an icon-link also scale */
        .mag-icon svg {
          transform: scale(1.45) !important;
          filter:
            drop-shadow(0 0 8px  rgba(192,132,252,0.85))
            drop-shadow(0 0 18px rgba(168,85,247,0.5))  !important;
        }

        /* ── Text magnify ──────────────────────────────────── */
        .mag-text {
          transform: scale(1.07) !important;
          text-shadow:
            0 0 18px rgba(192,132,252,0.4),
            0 0 36px rgba(168,85,247,0.2) !important;
        }
        h1.mag-text, h2.mag-text, h3.mag-text {
          transform: scale(1.04) !important;
          text-shadow:
            0 0 24px rgba(249,168,212,0.35),
            0 0 50px rgba(168,85,247,0.2) !important;
        }

        /* ── Link (text link) magnify ──────────────────────── */
        .mag-link {
          transform: scale(1.1) !important;
          filter: drop-shadow(0 0 6px rgba(192,132,252,0.45)) !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
