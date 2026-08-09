"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef } from "react";

export default function About() {
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
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });
  }, []);

  return (
    <section id="about" ref={sectionRef} className="px-[6vw] py-[190px] pb-[160px]">
      <div className="relative mx-auto grid max-w-[1360px] grid-cols-1 items-start gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow reveal">
            <span>About Saturate</span>
          </p>
          <h2 className="heading reveal text-[clamp(2.6rem,5.4vw,5rem)]">
            Visibility isn&apos;t
            <br />
            luck. It&apos;s built.
          </h2>
        </div>
        <div className="reveal pt-3.5">
          <p className="mb-5 max-w-[46ch] text-[1.05rem] text-[#333]">
            Every successful brand earns attention through consistency. Our
            role is to build the systems that create that consistency — the
            strategy underneath the content, and the structure underneath the
            strategy.
          </p>
          <p className="max-w-[46ch] text-[1.05rem] text-[#333]">
            We don&apos;t create content. We create presence. Every website,
            campaign, and brand system becomes another orbit around your
            customer&apos;s mind — until recognition becomes trust, and trust
            becomes growth.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-[2%] -top-16 hidden h-[220px] w-[220px] animate-[float_8s_ease-in-out_infinite] rounded-full border border-dark/30 md:block" />
        <div className="pointer-events-none absolute -bottom-10 left-[44%] hidden h-[90px] w-[90px] animate-[float_8s_ease-in-out_infinite] rounded-full border border-dark/30 md:block" />
      </div>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-18px);
          }
        }
      `}</style>
    </section>
  );
}
