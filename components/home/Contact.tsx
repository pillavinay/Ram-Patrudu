"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { getVenture } from "@/content/ventures";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/Bits";

/**
 * Contact form.
 * Sends messages through Web3Forms (free, works on static hosting like GitHub Pages).
 * Set NEXT_PUBLIC_WEB3FORMS_KEY — see README.md → "Contact form".
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

type Fields = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,18}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.phone.trim() && !PHONE_RE.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (f.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

export function Contact() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [venture, setVenture] = useState("");

  // Pre-fill when arriving from a company page: /?enquiry=redcrabs#contact
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("enquiry");
    const v = slug ? getVenture(slug) : undefined;
    if (v) {
      setVenture(v.name);
      setFields((f) => (f.message ? f : { ...f, message: `Hi, I'd like to know more about ${v.name}.` }));
    }
  }, []);

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [key]: e.target.value };
    setFields(next);
    if (touched[key]) setErrors(validate(next));
  };
  const blur = (key: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(fields));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(errs).length) {
      setStatus("error");
      setFeedback("Please fix the highlighted fields.");
      return;
    }
    // Honeypot field — bots fill it, humans don't see it
    const bot = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (bot) return;

    if (!ACCESS_KEY) {
      console.warn("Contact form: NEXT_PUBLIC_WEB3FORMS_KEY is not set. See README.md.");
      setStatus("error");
      setFeedback(`The contact form isn't connected yet. Please reach out on Instagram ${site.instagram.handle}.`);
      return;
    }

    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New enquiry from rampatrudu.com${venture ? ` — ${venture}` : ""}`,
          from_name: "rampatrudu.com",
          name: fields.name,
          email: fields.email,
          phone: fields.phone || "—",
          venture: venture || "General",
          message: fields.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFeedback("Thank you! Your message has been sent. We'll get back to you soon.");
        setFields({ name: "", email: "", phone: "", message: "" });
        setTouched({});
      } else throw new Error(data.message);
    } catch {
      setStatus("error");
      setFeedback("Something went wrong while sending. Please try again, or message on Instagram.");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute bottom-0 left-0 h-[480px] w-[480px] rounded-full bg-accent/[0.08] blur-[140px]" />
      <div className="container-x relative">
        <p className="mono-label text-accent">Contact</p>
        <AnimatedHeading text={site.contact.heading} accent={site.contact.accent} className="mt-4 text-[clamp(3.4rem,10vw,9.5rem)] uppercase leading-[0.85]" />
      </div>
      <div className="container-x relative mt-14 grid gap-14 border-t border-line pt-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-muted">{site.contact.text}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-10 border-t border-line">
              {site.email && <ContactRow label="Email" value={site.email} href={`mailto:${site.email}`} copy />}
              {site.phone && <ContactRow label="Phone" value={site.phone} href={`tel:${site.phone.replace(/\s/g, "")}`} copy />}
              <ContactRow label="Instagram" value={`${site.instagram.handle}`} href={site.instagram.url} external />
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {site.email && (
                <Button href={`mailto:${site.email}`} external={false}>
                  Email me
                </Button>
              )}
              {site.whatsapp && (
                <Button href={`https://wa.me/${site.whatsapp}`} external variant="outline">
                  WhatsApp
                </Button>
              )}
              <Button href={`https://ig.me/m/${site.instagram.handle.replace("@", "")}`} external variant={site.email ? "outline" : "solid"}>
                Message on Instagram
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {site.socials
                .filter((s) => s.href)
                .map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="mono-label text-muted transition-colors hover:text-accent">
                    {s.label} ↗
                  </a>
                ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form noValidate onSubmit={onSubmit} className="rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur md:p-10" aria-describedby="form-feedback">
            {venture && (
              <p className="mb-6 inline-flex rounded-full border border-accent/40 px-4 py-1.5 text-xs text-accent">Enquiry about {venture}</p>
            )}
            <div className="grid gap-6 md:grid-cols-2">
              <Field id="name" label="Name" required value={fields.name} error={touched.name ? errors.name : undefined} onChange={update("name")} onBlur={blur("name")} autoComplete="name" />
              <Field id="email" label="Email" type="email" required value={fields.email} error={touched.email ? errors.email : undefined} onChange={update("email")} onBlur={blur("email")} autoComplete="email" />
              <Field id="phone" label="Phone (optional)" type="tel" value={fields.phone} error={touched.phone ? errors.phone : undefined} onChange={update("phone")} onBlur={blur("phone")} autoComplete="tel" className="md:col-span-2" />
              <Field id="message" label="Message" textarea required value={fields.message} error={touched.message ? errors.message : undefined} onChange={update("message")} onBlur={blur("message")} className="md:col-span-2" />
            </div>
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" arrow disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send Message"}
              </Button>
              <AnimatePresence mode="wait">
                {feedback && (
                  <motion.p
                    key={feedback}
                    id="form-feedback"
                    role={status === "error" ? "alert" : "status"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`max-w-sm text-sm ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}
                  >
                    {feedback}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href, external, copy }: { label: string; value: string; href: string; external?: boolean; copy?: boolean }) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-line py-5">
      <div>
        <span className="mono-label block text-muted">{label}</span>
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-1 block font-display text-3xl uppercase transition-colors hover:text-accent">
          {value}
          {external && " ↗"}
        </a>
      </div>
      {copy && <CopyButton value={value} label={label} />}
    </li>
  );
}

function Field({
  id,
  label,
  error,
  textarea,
  className = "",
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  textarea?: boolean;
  className?: string;
  value: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
}) {
  const base = `peer w-full rounded-2xl border bg-surface-2/60 px-5 pb-3 pt-7 text-fg outline-none transition-colors placeholder-transparent focus:border-accent ${
    error ? "border-rose-400/70" : "border-line"
  }`;
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className={`relative ${className}`}>
      {textarea ? (
        <textarea id={id} name={id} rows={5} placeholder={label} aria-invalid={!!error} aria-describedby={describedBy} className={`${base} resize-none`} {...props} />
      ) : (
        <input id={id} name={id} placeholder={label} aria-invalid={!!error} aria-describedby={describedBy} className={base} {...props} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2.5 peer-focus:font-mono peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-accent"
      >
        {label}
        {props.required && <span className="text-accent"> *</span>}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
