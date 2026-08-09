# The Saturate PH — Website

A premium, orbit-themed portfolio site for The Saturate PH, a digital growth
studio. Built with Next.js 15, TypeScript, Tailwind CSS, GSAP + ScrollTrigger,
and Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx        Root layout, fonts, providers
  page.tsx           Assembles all sections
  globals.css         Design tokens + base styles
components/
  Hero.tsx            Cinematic animated-Saturn hero
  About.tsx
  Philosophy.tsx      Pinned "Saturn Philosophy" scroll section
  ServicesOrbit.tsx   Clickable orbiting "moons" (services)
  Work.tsx            Featured projects
  Process.tsx         Discovery → Optimization journey
  Testimonials.tsx    Horizontal scroll-snap cards
  FAQ.tsx             Accordion
  Contact.tsx         Lead form ("Launch My Brand")
  Footer.tsx
  Header.tsx, OrbitNav.tsx, CustomCursor.tsx, MagneticButton.tsx
lib/
  SmoothScrollProvider.tsx   Lenis + GSAP ScrollTrigger wiring
  gsap.ts                     Central place GSAP plugins are registered
data/
  content.ts          Services, projects, testimonials, FAQ, process copy
```

## Contact form

The form in `components/Contact.tsx` is wired for **EmailJS**:

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Create an Email Service and a Template with fields matching the form's
   `name` attributes: `name`, `business`, `email`, `phone`, `budget`, `type`,
   `message`.
3. Copy `.env.local.example` to `.env.local` and fill in your
   `SERVICE_ID`, `TEMPLATE_ID`, and `PUBLIC_KEY`.

If you skip EmailJS setup entirely, the form still works — it falls back to
opening the visitor's email client with a message pre-addressed to
`thesaturateph@gmail.com`. Swap in Resend or Formspree instead if you prefer
a server-side handler.

## Content to customize before launch

- `data/content.ts` — replace placeholder projects and testimonials with real
  client work.
- Social links in `components/Footer.tsx` (currently `#` placeholders).
- `app/layout.tsx` — update `metadataBase` to your real production domain.
- Swap the wordmark in `Header.tsx` / `Footer.tsx` for the actual logo file if
  you'd rather use an image than the type-set version.

## Notes on the brand system

- Colors, type (Bricolage Grotesque / condensed serif / Inter), and the
  orbit/Saturn visual language all follow the brand guidelines directly.
- "Times New Roman MT Condensed" isn't a web font, so headings use Times New
  Roman with a horizontal scale transform (`.heading` class in
  `globals.css`) to approximate the condensed editorial look — swap in a
  licensed condensed serif if you have one.
- Reduced-motion users automatically get simplified/instant transitions
  (see the `prefers-reduced-motion` block in `globals.css`).
