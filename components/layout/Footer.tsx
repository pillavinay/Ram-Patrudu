import Link from "next/link";
import { site } from "@/content/site";
import { ventures, ventureHref } from "@/content/ventures";

export function Footer() {
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="relative overflow-hidden border-t border-line pt-24">
      <div className="container-x">
        <p className="font-display text-[clamp(3.5rem,13vw,12rem)] uppercase leading-[0.82]">
          Dreams to <span className="accent-word">Ventures.</span>
        </p>

        <div className="mt-16 grid gap-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-3xl uppercase">Ram Patrudu</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{site.designation.join(" · ")}</p>
          </div>
          <FooterCol title="Explore">
            <FooterLink href="/#about">About</FooterLink>
            <FooterLink href="/#ventures">Ventures</FooterLink>
            <FooterLink href="/#journey">Journey</FooterLink>
            <FooterLink href="/#contact">Contact</FooterLink>
          </FooterCol>
          <FooterCol title="Ventures">
            {ventures.map((v) => (
              <FooterLink key={v.slug} href={ventureHref(v.slug)}>
                {v.name}
              </FooterLink>
            ))}
          </FooterCol>
          <FooterCol title="Follow">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="text-sm text-muted hover:text-accent">
                  {site.email}
                </a>
              </li>
            )}
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line py-8 text-xs text-muted sm:flex-row sm:items-center">
          <p className="mono-label">
            {site.name} · {site.location} · © {new Date().getFullYear()}
          </p>
          <a href="#top" className="mono-label hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mono-label mb-4 text-accent">{title}</p>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-muted transition-colors hover:text-fg">
        {children}
      </Link>
    </li>
  );
}
