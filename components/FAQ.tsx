"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";
import { faqs } from "@/data/content";

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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
    <section
      id="faq"
      ref={sectionRef}
      className="mx-auto max-w-[900px] px-[6vw] py-[150px]"
    >
      <p className="eyebrow reveal">
        <span>Good to Know</span>
      </p>
      <h2 className="heading reveal mb-[50px] text-[clamp(2.6rem,5.6vw,5.4rem)]">
        Frequently asked
      </h2>
      <div>
        {faqs.map((f, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={f.q}
              className={`reveal border-t border-dark/25 ${
                i === faqs.length - 1 ? "border-b" : ""
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="flex w-full items-center justify-between py-7 text-left font-display text-[1.15rem] font-semibold"
              >
                <span>{f.q}</span>
                <span
                  className={`text-[1.4rem] text-orange transition-transform duration-300 ease-orbit ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-500 ease-orbit"
                style={{ maxHeight: isOpen ? "300px" : "0px" }}
              >
                <p className="max-w-[60ch] pb-7 text-[#3a3a3a]">{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
