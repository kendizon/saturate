"use client";

import { useEffect, useRef, useState } from "react";

const CIRC = 2 * Math.PI * 26;

export default function OrbitNav() {
  const progressRef = useRef<SVGCircleElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const pct = scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = String(CIRC - pct * CIRC);
      }
      setShow(scrollTop > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-7 right-7 z-[900] h-16 w-16 transition-opacity duration-500 ease-orbit ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full">
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="rgba(132,35,24,0.25)"
          strokeWidth={1}
        />
        <circle
          ref={progressRef}
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="#F35634"
          strokeWidth={2}
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC}
          strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "32px 32px" }}
        />
        <circle cx="32" cy="32" r="8" fill="#F35634" />
      </svg>
    </div>
  );
}
