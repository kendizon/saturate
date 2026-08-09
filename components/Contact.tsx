"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import MagneticButton from "@/components/MagneticButton";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const DESTINATION_EMAIL = "thesaturateph@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);

    // Preferred path: EmailJS, if credentials are configured (see README).
    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      setStatus("sending");
      try {
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
          publicKey: PUBLIC_KEY
        });
        setStatus("sent");
        formRef.current.reset();
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
      return;
    }

    // Fallback: open the user's email client pre-filled, no backend required.
    const body = [
      `Name: ${data.get("name")}`,
      `Business: ${data.get("business")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Budget: ${data.get("budget")}`,
      `Project Type: ${data.get("type")}`,
      "",
      "Message:",
      `${data.get("message")}`
    ].join("\n");
    const subject = `New Orbit Inquiry — ${data.get("business") || data.get("name")}`;
    window.location.href = `mailto:${DESTINATION_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative px-[6vw] py-[160px] pb-[120px] text-center"
    >
      <div className="pointer-events-none absolute left-1/2 top-[50px] h-[120px] w-[120px] -translate-x-1/2 rounded-full border border-dashed border-dark/30" />
      <div className="mx-auto max-w-[1360px]">
        <p className="eyebrow center reveal justify-center">
          <span>Get In Touch</span>
        </p>
        <h2 className="heading reveal mx-auto mb-5 max-w-[16ch] text-[clamp(2.8rem,7vw,6rem)]">
          Let&apos;s build your
          <br />
          brand&apos;s orbit.
        </h2>
        <p className="reveal mx-auto mb-16 max-w-[480px] text-[#3a3a3a]">
          Tell us where your brand is now — we&apos;ll map out where it
          should be headed.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="reveal mx-auto max-w-[760px] text-left"
        >
          <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
            <Field label="Name" name="name" type="text" required />
            <Field label="Business Name" name="business" type="text" />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
            <SelectField
              label="Budget"
              name="budget"
              options={[
                "Under ₱50,000",
                "₱50,000 – ₱150,000",
                "₱150,000 – ₱500,000",
                "₱500,000+"
              ]}
            />
            <SelectField
              label="Project Type"
              name="type"
              options={[
                "Brand Strategy",
                "Website Development",
                "Social Media Management",
                "Full Digital Ecosystem",
                "Something Else"
              ]}
            />
            <div className="col-span-full mb-5">
              <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-dark">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full resize-y border-b border-ink/30 bg-transparent py-2.5 font-body text-base text-ink outline-none transition-colors focus:border-orange"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <MagneticButton type="submit" variant="solid">
              {status === "sending" ? "Launching…" : "Launch My Brand"}
            </MagneticButton>
            <p
              className={`mt-4 text-[0.75rem] text-dark transition-opacity duration-300 ${
                status === "sent" || status === "error" ? "opacity-100" : "opacity-0"
              }`}
            >
              {status === "sent" &&
                `🚀 Your message is on its way to ${DESTINATION_EMAIL}.`}
              {status === "error" &&
                "Something went wrong — please email us directly instead."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-dark">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-ink/30 bg-transparent py-2.5 font-body text-base text-ink outline-none transition-colors focus:border-orange"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-dark">
        {label}
      </label>
      <select
        name={name}
        className="w-full border-b border-ink/30 bg-transparent py-2.5 font-body text-base text-ink outline-none transition-colors focus:border-orange"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
