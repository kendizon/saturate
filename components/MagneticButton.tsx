"use client";

import { useRef, MouseEvent } from "react";
import clsx from "clsx";

export default function MagneticButton({
  href,
  onClick,
  children,
  variant = "solid",
  type = "button",
  className
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  type?: "button" | "submit";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.5}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const classes = clsx(
    "magnetic inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border px-6 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.06em] transition-[transform,background,color,border-color] duration-300 ease-orbit",
    variant === "solid"
      ? "border-orange bg-orange text-cream hover:bg-dark hover:border-dark"
      : "border-ink hover:bg-ink hover:text-cream",
    className
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as unknown as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={classes}
      onMouseMove={handleMove as unknown as (e: MouseEvent<HTMLButtonElement>) => void}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}
