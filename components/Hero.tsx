"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef } from "react";
import MagneticButton from "@/components/MagneticButton";

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // twinkling stars
    const stage = stageRef.current;
    if (stage) {
      for (let i = 0; i < 40; i++) {
        const s = document.createElement("div");
        s.className = "star";
        const size = Math.random() * 3 + 1;
        s.style.width = size + "px";
        s.style.height = size + "px";
        s.style.top = Math.random() * 100 + "%";
        s.style.left = Math.random() * 100 + "%";
        s.style.animationDelay = Math.random() * 3 + "s";
        stage.appendChild(s);
      }
    }

    // mouse parallax
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      gsap.to(wrapRef.current, { x, y, duration: 0.6, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);

    // scroll zoom + fade
    const st = gsap.to(wrapRef.current, {
      scale: 1.4,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-32"
    >
      <div
        ref={stageRef}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div ref={wrapRef} className="relative h-[560px] w-[560px]">
          {/* abstract orbit path — brand motif, independent of Saturn's own rings */}
          <div
            className="absolute left-1/2 top-1/2 h-[540px] w-[540px] rounded-full border border-dashed border-dark/20"
            style={{
              transform: "translate(-50%,-50%)",
              animation: "spin-flat 120s linear infinite"
            }}
          />

          {/* soft ambient glow */}
          <div
            className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(243,86,52,0.35), transparent 70%)",
              filter: "blur(12px)"
            }}
          />

          {/* ring — back half, passes behind the globe */}
          <div
            className="absolute left-1/2 top-1/2 h-[132px] w-[470px] rounded-[50%]"
            style={{
              transform: "translate(-50%,-50%) rotate(-16deg)",
              background:
                "radial-gradient(ellipse, transparent 0%, transparent 40%, #F3DE92 45%, #F35634 53%, #842318 60%, #F35634 70%, #F3DE92 82%, transparent 95%)",
              opacity: 0.9,
              zIndex: 1
            }}
          />

          {/* globe — banded texture + directional shading, slowly drifting to feel alive */}
          <div
            className="absolute left-1/2 top-1/2 h-[220px] w-[220px] overflow-hidden rounded-full"
            style={{
              transform: "translate(-50%,-50%) rotate(-9deg)",
              zIndex: 2,
              backgroundImage:
                "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.55), transparent 46%), repeating-linear-gradient(178deg, #F8E2B0 0px, #F8E2B0 12px, #F3DE92 12px, #F3DE92 26px, #F0A15F 26px, #F0A15F 40px, #F35634 40px, #F35634 52px, #C2481F 52px, #C2481F 62px, #842318 62px, #842318 70px)",
              backgroundSize: "100% 340%",
              backgroundPosition: "30% 26%, 0 0",
              boxShadow:
                "inset -36px -22px 60px rgba(17,17,17,0.4), inset 22px 14px 40px rgba(255,255,255,0.25), 0 0 90px rgba(243,86,52,0.35)",
              animation: "band-drift 46s linear infinite"
            }}
          />

          {/* ring — front crescent, clipped so only the near arc passes in front of the globe */}
          <div
            className="absolute left-1/2 top-1/2 h-[132px] w-[470px] rounded-[50%]"
            style={{
              transform: "translate(-50%,-50%) rotate(-16deg)",
              clipPath: "inset(52% 0 0 0)",
              background:
                "radial-gradient(ellipse, transparent 0%, transparent 40%, #F3DE92 45%, #F35634 53%, #842318 60%, #F35634 70%, #F3DE92 82%, transparent 95%)",
              opacity: 0.96,
              zIndex: 3
            }}
          />
        </div>
      </div>

      <div className="relative z-[2] mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow center justify-center">
          <span>The Saturate PH — Digital Growth Studio</span>
        </p>
        <h1 className="heading mx-auto my-5 max-w-[16ch] text-[clamp(3.2rem,9vw,8.2rem)] text-ink">
          Where brands
          <br />
          find their <span className="text-orange">orbit.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-lg text-[1.05rem] text-[#3a3a3a]">
          We build digital ecosystems — strategy, design, websites and
          marketing — that help businesses become visible, memorable, and
          impossible to ignore.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <MagneticButton href="#orbit-services" variant="ghost">
            Explore Our Orbit
          </MagneticButton>
          <MagneticButton href="#contact" variant="solid">
            Start Your Growth
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.2em] text-dark">
        <span className="relative h-9 w-px overflow-hidden bg-dark">
          <span className="absolute left-0 top-[-100%] h-full w-full bg-orange [animation:cue-drop_2s_ease-in-out_infinite]" />
        </span>
        Scroll
      </div>

      <style jsx global>{`
        @keyframes cue-drop {
          0% {
            top: -100%;
          }
          60% {
            top: 100%;
          }
          100% {
            top: 100%;
          }
        }
        @keyframes band-drift {
          from {
            background-position:
              30% 26%,
              0 0;
          }
          to {
            background-position:
              30% 26%,
              0 -340px;
          }
        }
        @keyframes spin-flat {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
