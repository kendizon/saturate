"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { services } from "@/data/content";

export default function ServicesOrbit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const moonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 820);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return;
    const system = systemRef.current;
    if (!system) return;
    const size = system.offsetWidth;
    const cx = size / 2;
    const cy = size / 2;
    services.forEach((_, i) => {
      const m = moonRefs.current[i];
      if (!m) return;
      const R = i % 2 === 0 ? 240 : 340;
      const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * R - 44;
      const y = cy + Math.sin(angle) * R * 0.72 - 44;
      m.style.position = "absolute";
      m.style.left = x + "px";
      m.style.top = y + "px";
    });
  }, [isMobile]);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    els.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 46 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });
  }, []);

  const active = services[activeIdx];

  return (
    <section id="orbit-services" ref={sectionRef} className="px-[6vw] py-[170px] pb-[140px]">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-[70px] text-center">
          <p className="eyebrow center reveal justify-center">
            <span>Our Services</span>
          </p>
          <h2 className="heading reveal text-[clamp(2.6rem,5.6vw,5.4rem)]">
            The Digital Orbit
          </h2>
        </div>

        <div
          ref={systemRef}
          className={
            isMobile
              ? "mx-auto flex max-w-[420px] flex-col items-center"
              : "relative mx-auto h-[760px] w-full max-w-[760px]"
          }
        >
          {!isMobile && (
            <>
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dark/20" />
              <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dark/20" />
              <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dark/20" />
            </>
          )}

          <div
            className={
              isMobile
                ? "relative z-[5] mb-8 flex h-[150px] w-[150px] items-center justify-center rounded-full text-center"
                : "absolute left-1/2 top-1/2 z-[5] flex h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center"
            }
            style={{
              background:
                "radial-gradient(circle at 34% 30%, #ffb199, #F35634 45%, #842318 100%)",
              boxShadow: "0 0 80px rgba(243,86,52,0.35)"
            }}
          >
            <span className="font-display text-sm font-bold leading-tight text-cream">
              The
              <br />
              Digital
              <br />
              Orbit
            </span>
          </div>

          <div className={isMobile ? "flex flex-wrap justify-center gap-3" : "contents"}>
            {services.map((s, i) => (
              <button
                key={s.name}
                ref={(el) => {
                  moonRefs.current[i] = el;
                }}
                onClick={() => setActiveIdx(i)}
                className={`z-[6] flex h-[88px] w-[88px] items-center justify-center rounded-full border p-2 text-center transition-[transform,background,border-color,box-shadow] duration-300 ease-orbit ${
                  activeIdx === i
                    ? "scale-[1.12] border-orange bg-orange shadow-[0_8px_30px_rgba(243,86,52,0.4)]"
                    : "border-dark/35 bg-cream hover:scale-[1.12] hover:border-orange hover:bg-orange"
                }`}
              >
                <span
                  className={`font-body text-[0.68rem] font-semibold uppercase tracking-[0.02em] ${
                    activeIdx === i ? "text-cream" : "text-ink"
                  }`}
                >
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-[60px] min-h-[150px] max-w-[640px] text-center">
          <p className="eyebrow center justify-center">
            <span>Service 0{activeIdx + 1}</span>
          </p>
          <h3 className="my-3.5 font-serif text-[2.3rem]" style={{ transform: "scaleX(.95)" }}>
            {active.name}
          </h3>
          <p className="text-[1rem] text-[#3a3a3a]">{active.desc}</p>
        </div>
      </div>
    </section>
  );
}
