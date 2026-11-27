import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CountUp, Highlight, SectionTitle } from "@/components/ui/Bits";

export function About() {
  const { about } = site;
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionTitle label={about.heading} title="About" />

        {/* Stat counters */}
        <dl className="grid grid-cols-1 border-b border-line sm:grid-cols-3">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className={`py-8 sm:px-6 sm:py-10 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
              <dd className="font-display text-[clamp(3.6rem,7vw,6.5rem)] leading-none">
                <CountUp value={s.value} />
              </dd>
              <dt className="mt-3 text-sm text-muted">{s.label}</dt>
            </Reveal>
          ))}
        </dl>

        {/* Portrait + story */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-4">
            <div aria-hidden className="absolute bottom-0 left-0 h-2/3 w-2/3 rounded-full bg-accent/25 blur-[80px]" />
            <Parallax offset={30}>
              <ImageSlot
                src={site.images.about1}
                alt="Ram Patrudu"
                label="About — portrait"
                className="aspect-[4/5] bg-transparent [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
                imgClassName="grayscale"
              />
            </Parallax>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[clamp(1.6rem,2.9vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.015em]">
                <Highlight text={about.statement} phrase={about.highlight} />
              </p>
            </Reveal>
            <div className="mt-10 space-y-5 text-base leading-relaxed text-muted md:text-lg">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <h3 className="mt-14 text-4xl uppercase">Principles</h3>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                {about.pillars.map((p, i) => (
                  <li key={p.title} className="group bg-bg p-6 transition-colors duration-500 hover:bg-surface">
                    <span className="mono-label text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-4 font-display text-2xl uppercase">{p.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
