import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/design-system";

/** Blur-to-focus scrub as the element travels from 85% to 50% of the viewport. */
export function Scrub({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "h2" | "p" }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.5"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.18, 1]);
  const filter = useTransform(scrollYProgress, (v) => `blur(${(1 - v) * 4}px)`);
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp ref={ref as never} className={className} style={reduce ? undefined : { opacity, filter }}>
      {children}
    </Comp>
  );
}

/** Coral highlight that sweeps in behind a phrase when scrolled into view. */
export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-block", className)}>
      <motion.span
        aria-hidden
        className="absolute inset-0 -z-10 origin-left rounded-sm bg-accent-soft"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
      />
      {children}
    </span>
  );
}

export function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
      <span className="text-accent">{n}</span>
      <span className="h-px w-10 bg-border" />
      {children}
    </div>
  );
}
