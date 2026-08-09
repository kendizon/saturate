"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { processSteps } from "@/data/content";

export default function Process() {
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
          scrollTrigger: { trigger: el, start: "top 88%" }
        }
      );
    });

    const line = sectionRef.current?.querySelector(".process-line");
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: ".process-track",
            start: "top 70%",
            end: "bottom 80%",
            scrub: true
          }
        }
      );
    }
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="overflow-hidden bg-dark px-[6vw] py-[150px] pb-[170px] text-cream"
    >
      <div className="mx-auto max-w-[1360px]">
        <p className="eyebrow eyebrow-gold reveal">
          <span>How We Work</span>
        </p>
        <h2 className="heading reveal mb-20 text-[clamp(2.6rem,5.6vw,5.4rem)] text-cream">
          From discovery
          <br />
          to orbit.
        </h2>
        <div className="process-track relative mx-auto max-w-[900px]">
          <div className="process-line absolute bottom-3.5 left-[29px] top-3.5 w-px bg-gradient-to-b from-orange to-orange/10" />
          {processSteps.map((s) => (
            <div key={s.n} className="reveal relative flex gap-8 py-8">
              <div className="relative z-[2] flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full border border-orange bg-dark font-display font-semibold">
                {s.n}
              </div>
              <div>
                <h4 className="mb-2 font-serif text-[1.7rem] text-cream">{s.t}</h4>
                <p className="max-w-[50ch] text-[0.95rem] text-cream/70">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
