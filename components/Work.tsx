"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef } from "react";
import { projects } from "@/data/content";

export default function Work() {
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
  }, []);

  return (
    <section id="work" ref={sectionRef} className="px-[6vw] py-[150px]">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-[70px] flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow reveal">
              <span>Selected Work</span>
            </p>
            <h2 className="heading reveal text-[clamp(2.6rem,5.6vw,5.4rem)]">
              Featured
              <br />
              Projects
            </h2>
          </div>
          <p className="reveal max-w-[34ch] text-[#3a3a3a]">
            A small selection of the ecosystems we&apos;ve built for brands
            finding their orbit.
          </p>
        </div>

        {projects.map((p, i) => (
          <div
            key={p.name}
            className={`reveal grid grid-cols-1 items-center gap-12 border-t border-dark/20 py-[60px] md:grid-cols-2 md:gap-[50px] ${
              i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[22px] bg-gradient-to-br from-pale to-gold transition-transform duration-500 ease-orbit hover:scale-[1.02]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(243,86,52,0.35),transparent_60%)]" />
              <div className="absolute left-[15%] top-[15%] h-[70%] w-[70%] rounded-full border border-dark/35" />
              <div className="absolute left-[30%] top-[30%] h-[40%] w-[40%] rounded-full border border-dark/35" />
              <div className="relative z-[2] font-display text-2xl font-bold text-dark">
                {p.tag}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-4">
                <span>{p.industry}</span>
              </p>
              <h3
                className="mb-4 font-serif text-[2.4rem] leading-tight"
                style={{ transform: "scaleX(.95)", transformOrigin: "left" }}
              >
                {p.name}
              </h3>
              <p className="mb-6 max-w-[44ch] text-[#3a3a3a]">
                A digital ecosystem designed to bring {p.name} into
                consistent view of the right audience — building recognition
                into trust.
              </p>
              <div className="flex flex-wrap gap-9">
                <div className="text-[0.78rem]">
                  <b className="mb-1 block text-[0.65rem] uppercase tracking-[0.08em] text-dark">
                    Services
                  </b>
                  {p.servicesUsed}
                </div>
                <div className="text-[0.78rem]">
                  <b className="mb-1 block text-[0.65rem] uppercase tracking-[0.08em] text-dark">
                    Website
                  </b>
                  {p.site}
                </div>
                <div className="text-[0.78rem]">
                  <b className="mb-1 block text-[0.65rem] uppercase tracking-[0.08em] text-dark">
                    Result
                  </b>
                  {p.result}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
