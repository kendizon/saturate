"use client";

import MagneticButton from "@/components/MagneticButton";

const links = [
  { href: "#about", label: "Studio" },
  { href: "#orbit-services", label: "Orbit" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" }
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-[800] flex w-full items-center justify-between px-[6vw] py-6">
      <div className="font-display text-2xl font-bold text-orange">saturate</div>
      <nav className="hidden gap-9 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group relative pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.08em]"
          >
            {l.label}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-ink transition-all duration-300 ease-orbit group-hover:w-full" />
          </a>
        ))}
      </nav>
      <MagneticButton href="#contact" variant="solid">
        Start Your Growth
      </MagneticButton>
    </header>
  );
}
