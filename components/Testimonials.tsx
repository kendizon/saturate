"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef } from "react";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: { trigger: el, start: "top 90%" }
        }
      );
    });
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="px-[6vw] py-[150px]">
      <div className="mx-auto max-w-[1360px]">
        <p className="eyebrow reveal">
          <span>Kind Words</span>
        </p>
        <h2 className="heading reveal mb-[60px] text-[clamp(2.6rem,5.6vw,5.4rem)]">
          Why brands
          <br />
          choose Saturate
        </h2>
        <div className="scrollbar-none flex gap-6 overflow-x-auto pb-5" style={{ scrollSnapType: "x proximity" }}>
          {testimonials.map((t) => (
            <div
              key={t.n}
              className="reveal flex-[0_0_380px] rounded-[22px] border border-dark/25 bg-cream p-9 shadow-[0_20px_40px_rgba(17,17,17,0.05)]"
              style={{ scrollSnapAlign: "start" }}
            >
              <p
                className="mb-6 font-serif text-[1.35rem] leading-snug"
                style={{ transform: "scaleX(.96)", transformOrigin: "left" }}
              >
                &ldquo;{t.q}&rdquo;
              </p>
              <div className="text-[0.85rem] font-semibold">{t.n}</div>
              <div className="text-[0.75rem] text-dark">{t.r}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
