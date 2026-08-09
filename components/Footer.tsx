"use client";

export default function Footer() {
  return (
    <footer className="border-t border-dark/25 px-[6vw] pb-10 pt-[90px]">
      <div className="mb-[70px] flex flex-wrap items-start justify-between gap-10">
        <div>
          <div className="font-display text-[2.6rem] font-bold text-orange">
            saturate
          </div>
          <div
            className="mt-2.5 font-serif text-[1.1rem] text-dark"
            style={{ transform: "scaleX(.95)", transformOrigin: "left" }}
          >
            Where brands find their orbit.
          </div>
        </div>
        <div className="flex flex-wrap gap-[70px]">
          <div>
            <h5 className="mb-4 text-[0.7rem] uppercase tracking-[0.12em] text-dark">
              Studio
            </h5>
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#orbit-services">Services</FooterLink>
            <FooterLink href="#work">Work</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
          </div>
          <div>
            <h5 className="mb-4 text-[0.7rem] uppercase tracking-[0.12em] text-dark">
              Connect
            </h5>
            <FooterLink href="#">Facebook</FooterLink>
            <FooterLink href="#">Instagram</FooterLink>
            <FooterLink href="#">LinkedIn</FooterLink>
            <FooterLink href="#">Behance</FooterLink>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-5 text-[0.75rem] text-dark">
        <span>© 2026 The Saturate PH. All rights reserved.</span>
        <div className="relative h-[34px] w-[34px] rounded-full border border-dark">
          <span
            className="absolute left-1/2 top-[-2px] h-[5px] w-[5px] -translate-x-1/2 animate-[spin-orbit_6s_linear_infinite] rounded-full bg-orange"
            style={{ transformOrigin: "2.5px 19px" }}
          />
        </div>
        <span>thesaturateph@gmail.com</span>
      </div>
      <style jsx global>{`
        @keyframes spin-orbit {
          from {
            transform: rotate(0deg) translateY(0) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateY(0) rotate(-360deg);
          }
        }
      `}</style>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="mb-2.5 block text-[0.9rem] hover:text-orange">
      {children}
    </a>
  );
}
