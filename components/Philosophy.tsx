"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { philosophyWords } from "@/data/content";

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const layout = (rot: number) => {
      const orbit = orbitRef.current;
      if (!orbit) return;
      const R = orbit.offsetWidth / 2;
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const angle = (i / philosophyWords.length) * Math.PI * 2 + rot;
        const x = Math.cos(angle) * R;
        const y = Math.sin(angle) * R * 0.55;
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      });
    };

    layout(0);

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        layout(progress * Math.PI * 2);
        const activeIdx = Math.floor(progress * philosophyWords.length) % philosophyWords.length;
        wordRefs.current.forEach((el, i) => {
          if (!el) return;
          const isActive = i === activeIdx;
          el.style.opacity = isActive ? "1" : "0.28";
          el.style.color = isActive ? "#F35634" : "#842318";
          el.style.fontSize = isActive ? "1.85rem" : "1.5rem";
        });
      }
    });

    const onResize = () => layout(0);
    window.addEventListener("resize", onResize);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative h-[280vh]">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        <p className="eyebrow center absolute top-[110px] left-1/2 -translate-x-1/2 justify-center">
          <span>The Saturn Philosophy</span>
        </p>
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dark/30 max-md:h-[340px] max-md:w-[340px]" />
        <div
          ref={orbitRef}
          className="absolute left-1/2 top-1/2 z-[3] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 max-md:h-[400px] max-md:w-[400px]"
        >
          {philosophyWords.map((w, i) => (
            <div
              key={w}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 whitespace-nowrap font-display text-2xl font-semibold text-dark opacity-30 transition-[opacity,color,font-size] duration-300 max-md:text-base"
            >
              {w}
            </div>
          ))}
        </div>
        <div
          className="relative z-[2] h-[180px] w-[180px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 34% 30%, #ffb199, #F35634 45%, #842318 100%)",
            boxShadow: "0 0 100px rgba(243,86,52,0.4)"
          }}
        />
      </div>
    </section>
  );
}
