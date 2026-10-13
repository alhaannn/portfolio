import { PersonaSection } from "./PersonaSection";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import MurmurationWordmark from "@/components/ui/murmuration-wordmark";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FeaturedProjects } from "./FeaturedProjects";
import MorphOrb from "@/components/ui/morph-orb";
import { RobotMascot } from "./RobotMascot";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { FactoryProcess } from "./FactoryProcess";
import { QuantifiedSignal } from "./QuantifiedSignal";
import SiteFooter from "@/components/ui/site-footer";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import TextRevealFaqs from "@/components/ui/text-reveal-faqs";
import {
  Badge,
  Button,
  Card,
  Marquee,
  Metric,
} from "@/design-system";
import { CONTACT, FAQS, METRICS, STACK, TESTIMONIALS } from "./data";
import { askOrb } from "./ask-orb.functions";
import { Highlight, SectionLabel } from "./motion";
import { usePortfolioTheme } from "./Theme";
import { ROLE_PROFILES } from "./role-profiles";

const wrap = "mx-auto w-full max-w-7xl px-6 md:px-10";

/* ---------------- Hero ---------------- */
// Reads the live theme tokens (hex values) so the canvas flock matches both themes.
function useFlockPalette(theme: string) {
  const [palette, setPalette] = useState<{ skyTop: string; skyLow: string; sun: string; ink: string } | null>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const s = getComputedStyle(document.documentElement);
      const v = (n: string) => s.getPropertyValue(n).trim();
      setPalette({
        skyTop: v("--background"),
        skyLow: v("--background"),
        sun: v("--accent"),
        ink: theme === "dark" ? v("--foreground") : v("--primary"),
      });
    });
    return () => cancelAnimationFrame(id);
  }, [theme]);
  return palette;
}

function HeroBackdrop({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const { theme } = usePortfolioTheme();
  const palette = useFlockPalette(theme);
  const hostRef = useRef<HTMLDivElement>(null);
  // The flock listens on its own root; forward pointer moves from the whole hero
  // so the hawk works even over text, buttons and the mascot.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const target = () => hostRef.current?.querySelector(".mmw-root");
    const move = (e: PointerEvent) =>
      target()?.dispatchEvent(new PointerEvent("pointermove", { clientX: e.clientX, clientY: e.clientY }));
    const leave = () => target()?.dispatchEvent(new PointerEvent("pointerleave"));
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, [sectionRef]);
  return (
    <div ref={hostRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {palette && (
        <MurmurationWordmark
          word="ALHAN"
          reeds={false}
          palette={palette}
          fontFamily='"Plus Jakarta Sans", system-ui, sans-serif'
          // Host is absolutely inset, so 100% resolves to the hero height.
          height="100%"
          className="opacity-80"
        />
      )}
      {/* Soft scrim keeps text crisp over passing birds. Below desktop the column
          spans the full width, so the wash covers the hero vertically; from lg the
          horizontal falloff keeps the flock visible beside the headline. */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/85 lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-background/80 via-background/30 to-transparent lg:block" />
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const item = (d: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });
  // The ask box measures the cartoon's spot once, on mount. A sliding (y) entrance
  // would move that spot mid-animation and leave the box parked at the stale place,
  // so the cartoon's column fades in without a transform.
  const fade = (d: number) => ({
    initial: { opacity: 0 },
    animate: ready ? { opacity: 1 } : {},
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section ref={sectionRef} id="home" className="relative isolate min-h-screen overflow-hidden">
      <HeroBackdrop sectionRef={sectionRef} />
      <div className={`${wrap} relative grid min-h-screen items-center gap-10 pt-32 pb-28 lg:pt-16 lg:pb-8 lg:grid-cols-12`}>
      <div className="min-w-0 lg:col-span-7">
        <motion.div {...item(0)}>
          <Badge variant="outline" pulse className="font-mono">
            In Progress · IIT Dharwad & NSQF L5.0 AI Technocrat • Cohort 2026–2027
          </Badge>
        </motion.div>
        <motion.h1 {...item(0.1)} className="mt-5 text-balance">
          <span className="block font-sans text-sm font-semibold tracking-widest text-foreground uppercase md:text-base">
            Architecting
          </span>
          <span className="mt-3 block font-serif text-5xl leading-none tracking-tight text-primary italic md:text-7xl">
            Resilient Backend Pipelines & Production-Grade <Highlight>Multi-Agent Systems</Highlight>
          </span>
        </motion.h1>
        <motion.p {...item(0.2)} className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground">
          Early-career Software & AI Systems Engineer building five in-progress systems across agentic AI, asynchronous
          Python backends, production MLOps, computer vision, and self-correcting analytics.
        </motion.p>
        <motion.ul {...item(0.25)} className="mt-3 flex max-w-2xl flex-wrap gap-1 lg:flex-nowrap" aria-label="Target roles">
          {ROLE_PROFILES.map((profile) => (
            <li key={profile.slug} className="whitespace-nowrap">
              <Link to="/roles/$slug" params={{ slug: profile.slug }} className="outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <ShinyButton as="span">{profile.role}</ShinyButton>
              </Link>
            </li>
          ))}
        </motion.ul>
        <motion.div {...item(0.3)} className="mt-4 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#projects">View Production Systems <ArrowDown /></a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub & Commit Activity <ArrowUpRight /></a>
          </Button>
        </motion.div>
      </div>
      <motion.div {...fade(0.4)} className="min-w-0 overflow-x-clip lg:col-span-5">
        <div className="mx-auto w-full max-w-lg">
          <RobotMascot />
          <div className="mx-auto w-72 max-w-full md:w-80">
          {/* The orb's resting anchor is the slot's bottom edge minus the pill's
              height and its centre offset (80 - 48 - 24 = 8px of air above the pill),
              so this slot height is what sets the gap under the cartoon. */}
          <div className="relative h-20 w-full">
            <MorphOrb
              onSubmit={async (question) => askOrb({ data: { question } })}
            />
          </div>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Metrics ---------------- */
function Drift({ children, dir, p }: { children: React.ReactNode; dir: 1 | -1; p: MotionValue<number> }) {
  const y = useTransform(p, [0, 1], [-20 * dir, 20 * dir]);
  return <motion.div style={{ y }}>{children}</motion.div>;
}

export function Metrics() {
  return <QuantifiedSignal />;
}

/* ---------------- Projects ---------------- */
export function Projects() {
  return <FeaturedProjects />;
}

/* ---------------- About ---------------- */
export function About() {
  return <PersonaSection />;
}

/* ---------------- Process ---------------- */
export function Process() {
  return <FactoryProcess />;
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  return (
    <section id="reviews" className="py-24">
      <div className={wrap}><SectionLabel n="§07">Endorsements</SectionLabel></div>
      <StaggerTestimonials testimonials={TESTIMONIALS} />
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  return (
    <section className={`${wrap} flex min-h-screen flex-col justify-center gap-6 py-12`}>
      <SectionLabel n="§08">FAQs</SectionLabel>
      <TextRevealFaqs
        items={FAQS}
        title="About me, answered."
        subtitle="Who I am, how I build AI systems, and the tools I reach for."
        contactLabel="get in touch"
        contactHref="#contact"
      />
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return <SiteFooter />;
}
