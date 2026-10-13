import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Sparkles } from "lucide-react";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design-system";
import { CONTACT } from "./data";
import { ThemeToggle } from "./Theme";

const EASE = [0.85, 0, 0.15, 1] as const;

export function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"tick" | "mark" | "open">("tick");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const done = setTimeout(onDone, 0);
      return () => clearTimeout(done);
    }
    const start = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const a = setTimeout(() => setPhase("mark"), 1400);
    const b = setTimeout(() => setPhase("open"), 1900);
    const c = setTimeout(onDone, 2700);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      [a, b, c].forEach(clearTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [onDone]);

  const open = phase === "open";
  return (
    <div data-testid="portfolio-startup" className="fixed inset-0 z-50" aria-hidden>
      <div className="absolute inset-0 grid grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <motion.div key={index} className="relative border-r border-border bg-background"
            animate={{ y: open ? (index % 2 ? "100%" : "-100%") : 0 }}
            transition={{ duration: 0.7, delay: index * 0.035, ease: EASE }}>
            <motion.div className="absolute inset-x-0 top-0 h-1 bg-accent" initial={{ y: "-100%" }}
              animate={{ top: ["0%", "100%"] }} transition={{ duration: 1.4, delay: index * 0.08, ease: "easeInOut" }} />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-6 text-foreground md:p-10"
        animate={{ opacity: open ? 0 : 1, scale: open ? 1.08 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <span>ALHAN / PORTFOLIO</span><span className="text-accent">2026 · AI SYSTEMS</span>
        </div>
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex overflow-hidden font-serif text-8xl italic leading-none text-primary md:text-9xl">
            {"MAB".split("").map((letter, index) => <motion.span key={letter}
              initial={{ y: "110%", rotate: 12 }} animate={{ y: 0, rotate: 0 }}
              transition={{ delay: 0.15 + index * 0.12, duration: 0.8, ease: EASE }}>{letter}</motion.span>)}
          </div>
          <motion.div className="h-px w-24 origin-left bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.6 }} />
          <div className="min-h-16">
            <AnimatePresence mode="wait">
              <motion.p key={phase === "tick" ? "loading" : "name"}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                className="font-serif text-2xl italic text-primary sm:text-3xl">
                {phase === "tick" ? "From first principles." : "Mohammad Alhan Bellary"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-end justify-between gap-4">
            <span className="font-mono text-xs text-muted-foreground">{pct < 40 ? "FOUNDATIONS" : pct < 80 ? "CONNECTING SYSTEMS" : "READY TO BUILD"}</span>
            <span className="font-mono text-4xl text-primary">{String(pct).padStart(3, "0")}<span className="text-sm text-accent">%</span></span>
          </div>
          <div className="h-1 overflow-hidden bg-secondary"><motion.div className="h-full origin-left bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: "easeInOut" }} /></div>
        </div>
      </motion.div>
    </div>
  );
}

const NOTICE_KEY = "mab-desktop-notice";

export function DesktopNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const smallScreen = window.matchMedia("(max-width: 1023px)").matches;
    let seen = false;
    try {
      seen = window.localStorage.getItem(NOTICE_KEY) === "1";
    } catch { /* storage unavailable */ }
    if (smallScreen && !seen) setOpen(true);
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(NOTICE_KEY, "1");
    } catch { /* storage unavailable */ }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) dismiss(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Best experienced on a laptop</DialogTitle>
          <DialogDescription>
            The 3D factory, works wheel and scroll scenes shine on a bigger screen — but everything here still works on this device.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="sm" onClick={dismiss}>Continue on mobile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const LINES = [
  "IIT DHARWAD SCHOLAR • COHORT 2026–27",
  "NEETCODE 150 STREAK • [ ?? / 150 SOLVED ]",
  "LIVE TELEMETRY • SYSTEMS NOMINAL",
];

function useIST() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function Beacon() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const time = useIST();
  const reduce = useReducedMotion();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tilt = useSpring(0, { stiffness: 200, damping: 22 });
  const lift = useSpring(0, { stiffness: 200, damping: 22 });
  const enter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const leave = () => {
    tilt.set(0);
    lift.set(0);
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % LINES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { setCopied(false); }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <ThemeToggle />
      <div onMouseEnter={enter} onMouseLeave={leave}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm"
            aria-label="About Mohammad — profile card"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full motion-safe:animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="relative hidden h-4 w-72 overflow-hidden md:block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={i}
                  className="absolute inset-0 truncate text-left"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                >
                  {LINES[i]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-muted-foreground">IST {time || "--:--:--"}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" onMouseEnter={enter} onMouseLeave={leave}>
          <motion.div style={reduce ? undefined : { rotate: tilt, y: lift }}
            onPointerMove={(event) => {
              if (reduce || event.pointerType !== "mouse") return;
              const rect = event.currentTarget.getBoundingClientRect();
              tilt.set(((event.clientX - rect.left) / rect.width - 0.5) * 5);
              lift.set(((event.clientY - rect.top) / rect.height - 0.5) * -6);
            }}>
          <motion.div initial={reduce ? false : "hidden"} animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <motion.div className="relative mb-4 flex items-center justify-between overflow-hidden border-b border-border pb-4"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
            <div className="relative flex size-16 items-center justify-center">
              <motion.span aria-hidden className="absolute inset-0 rounded-full border border-dashed border-accent"
                animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
              <span className="font-serif text-3xl italic text-primary">MA</span>
            </div>
            <div className="text-right"><p className="font-mono text-xs text-accent">PROFILE // 001</p><p className="mt-2 font-mono text-xs text-muted-foreground">IDEAS → SYSTEMS</p></div>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
          <p className="font-serif text-2xl italic text-primary">Mohammad Alhan Bellary</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Early-career engineer targeting Agentic AI, backend Python, MLOps, and AI/ML roles · IIT Dharwad NSQF L5.0 AI Technocrat cohort.
          </p>
          <p className="mt-2 font-mono text-xs text-accent">{CONTACT.location}</p>
          </motion.div>
          <motion.div className="mt-4 flex flex-wrap gap-2" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            {["Python", "FastAPI", "LangGraph", "PyTorch"].map((skill) => <Badge key={skill} variant="secondary">{skill}</Badge>)}
          </motion.div>
          <motion.a href={CONTACT.github} target="_blank" rel="noreferrer"
            className="mt-4 flex items-center justify-between gap-2 border-y border-border py-3 text-sm text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <span className="flex items-center gap-2"><Sparkles className="size-4 text-accent" /> Building with intent</span><ArrowUpRight className="size-4" />
          </motion.a>
          <div className="mt-4 flex flex-col gap-2">
            {CONTACT.resume ? (
              <Button asChild size="sm">
                <a href={CONTACT.resume} download>
                  <Download /> Download general resume
                </a>
              </Button>
            ) : (
              <Button size="sm" disabled>
                <Download /> General resume coming soon
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={copy}>
              {copied ? <Check /> : <Copy />} {copied ? "Email copied" : "Copy email"}
            </Button>
          </div>
          </motion.div>
          </motion.div>
        </PopoverContent>
      </Popover>
      </div>
    </div>
  );
}

