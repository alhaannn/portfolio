import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system";
import { CAREER_PROOF } from "./data";

const RING = "SYSTEMS LEGIBLE UNDER LOAD • EVERY STATE TYPED • EVERY FAILURE PATH NAMED • ";

export function PersonaSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const spin = useTransform(p, [0, 1], [0, reduce ? 0 : 540]);
  const spinBack = useTransform(spin, (v) => -v * 1.5);
  const coreScale = useTransform(p, [0, 0.2, 1], [0.6, 1, 1.15]);
  const wordX = useTransform(p, [0, 1], ["10%", "-60%"]);
  const wordX2 = useTransform(p, [0, 1], ["-60%", "10%"]);
  const quoteBlur = useTransform(p, [0, 0.12], ["blur(12px)", "blur(0px)"]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(mx, { stiffness: 60, damping: 15 });
  const glowY = useSpring(my, { stiffness: 60, damping: 15 });
  const tiltX = useTransform(glowY, [-400, 400], [12, -12]);
  const tiltY = useTransform(glowX, [-600, 600], [-12, 12]);

  return (
    <section ref={ref} id="about" className="relative h-[300vh]">
      <div
        className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden py-12"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left - r.width / 2);
          my.set(e.clientY - r.top - r.height / 2);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        {/* cursor spotlight */}
        <motion.div
          aria-hidden
          style={{ x: glowX, y: glowY }}
          className="pointer-events-none absolute size-96 rounded-full bg-accent opacity-20 blur-3xl"
        />

        {/* giant drifting words */}
        <motion.p
          aria-hidden
          style={{ x: wordX }}
          className="pointer-events-none absolute top-6 font-serif text-9xl whitespace-nowrap text-secondary italic select-none"
        >
          Persona — Rigor — Persona — Rigor —
        </motion.p>
        <motion.p
          aria-hidden
          style={{ x: wordX2 }}
          className="pointer-events-none absolute bottom-6 font-mono text-8xl whitespace-nowrap text-secondary select-none"
        >
          O(clarity) &gt; O(cleverness) O(clarity) &gt; O(cleverness)
        </motion.p>

        <div className="relative z-10 grid w-full max-w-7xl items-center gap-4 px-6 sm:gap-8 md:grid-cols-2 md:px-10">
          {/* spinning core */}
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY, scale: coreScale }} className="relative mx-auto aspect-square w-full max-w-48 lg:max-w-md [perspective:var(--container-7xl)]">
            <motion.svg style={{ rotate: spin }} viewBox="0 0 200 200" className="absolute inset-0 size-full text-accent" aria-hidden>
              <defs>
                <path id="persona-ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
              </defs>
              <text className="fill-current font-mono" fontSize="8.5" letterSpacing="2">
                <textPath href="#persona-ring">{RING}</textPath>
              </text>
            </motion.svg>
            <motion.svg style={{ rotate: spinBack }} viewBox="0 0 200 200" className="absolute inset-0 size-full text-primary" aria-hidden>
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="2 6" />
              <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="30 10" />
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <circle key={a} cx={(100 + 70 * Math.cos((a * Math.PI) / 180)).toFixed(6)} cy={(100 + 70 * Math.sin((a * Math.PI) / 180)).toFixed(6)} r="3" className="fill-accent" />
              ))}
            </motion.svg>
            <div className="absolute inset-[30%] flex items-center justify-center rounded-full bg-accent shadow-elevated">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-30" />
              <span className="font-serif text-5xl text-accent-foreground italic">MA</span>
            </div>
          </motion.div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <Badge variant="outline" pulse>§05</Badge>
              <span className="font-mono text-xs tracking-widest text-accent">ENGINEERING PERSONA</span>
            </div>
            <motion.p style={{ filter: quoteBlur }} className="font-serif text-2xl leading-tight text-primary italic sm:text-3xl lg:text-4xl xl:text-5xl">
              “Systems should be <span className="text-accent">legible under load</span> — every state typed, every failure path named.”
            </motion.p>
            <Tabs defaultValue={CAREER_PROOF[0].id} className="mt-4 w-full sm:mt-8">
              <TabsList aria-label="Career proof" className="grid h-auto w-full grid-cols-2 sm:grid-cols-4">
                {CAREER_PROOF.map((item) => (
                  <TabsTrigger key={item.id} value={item.id}>{item.label}</TabsTrigger>
                ))}
              </TabsList>
              {CAREER_PROOF.map((item) => (
                <TabsContent key={item.id} value={item.id}>
                  <motion.article
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel relative rounded-2xl border border-border p-4 shadow-elevated sm:min-h-56 sm:p-6"
                  >
                    <span className="font-mono text-xs text-accent">{item.k} / {item.label.toUpperCase()}</span>
                    {item.lead ? (
                      <div className="mt-3 border-b border-border pb-3">
                        <h4 className="font-serif text-base leading-tight text-primary italic lg:text-lg">{item.lead.title}</h4>
                        <p className="mt-1 font-mono text-xs text-muted-foreground">{item.lead.meta}</p>
                        <p className="mt-2 hidden text-xs leading-relaxed text-muted-foreground sm:block">{item.lead.body}</p>
                      </div>
                    ) : null}
                     <h3 className="mt-2 font-serif text-xl text-primary italic lg:text-2xl">{item.title}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{item.meta}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">{item.body}</p>
                    {item.links ? (
                      <div className="mt-3 border-t border-border pt-3">
                        <span className="font-mono text-xs text-muted-foreground">Verify online</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.links.map((link) => (
                            <Button key={link.url} asChild variant="outline" size="sm">
                              <a href={link.url} target="_blank" rel="noreferrer noopener">
                                {link.label}
                                <ArrowUpRight aria-hidden className="size-3" />
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </motion.article>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
