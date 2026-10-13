import { Link, useLocation } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import ghost from "@/assets/ghost-404.webp";
import { FlowButton } from "./flow-button";
import { ThemeToggle } from "@/components/portfolio/Theme";
import { ROLE_PROFILES } from "@/components/portfolio/role-profiles";

const EASE = [0.43, 0.13, 0.23, 0.96] as const;
const container: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delayChildren: 0.1, staggerChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const number: Variants = {
  hidden: (d: number) => ({ opacity: 0, x: d * 40, y: 15, rotate: d * 5 }),
  visible: { opacity: 0.8, x: 0, y: 0, rotate: 0, transition: { duration: 0.8, ease: EASE } },
};
const ghostV: Variants = {
  hidden: { scale: 0.8, opacity: 0, y: 15, rotate: -5 },
  visible: { scale: 1, opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: EASE } },
  hover: { scale: 1.1, y: -10, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.8, ease: "easeInOut", rotate: { duration: 2, ease: "linear", repeat: Infinity, repeatType: "reverse" } } },
  floating: { y: [-5, 5], transition: { y: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" } } },
};
const digit = "select-none font-serif text-8xl font-medium text-primary md:text-9xl";

export function NotFound() {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const initial = reduce ? false : "hidden";
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-10">
        <Link to="/" className="truncate font-serif text-lg text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">Mohammad Alhan Bellary</Link>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-16">
        <motion.div className="text-center" variants={container} initial={initial} animate="visible">
          <div className="mb-8 flex items-center justify-center gap-4 md:mb-12 md:gap-6" aria-label="404">
            <motion.span aria-hidden className={digit} variants={number} custom={-1}>4</motion.span>
            <motion.div variants={ghostV} whileHover={reduce ? undefined : "hover"} animate={reduce ? "visible" : ["visible", "floating"]}>
              <img src={ghost} alt="" width={96} height={120} draggable={false} className="h-20 w-auto select-none object-contain drop-shadow-lg md:h-28 dark:drop-shadow-[0_0_1.25rem_var(--accent)]" />
            </motion.div>
            <motion.span aria-hidden className={digit} variants={number} custom={1}>4</motion.span>
          </div>
          <motion.h1 variants={item} className="mb-4 font-serif text-3xl text-primary md:mb-6 md:text-5xl">Boo! Page missing!</motion.h1>
          <motion.p variants={item} className="mb-3 text-lg text-muted-foreground md:text-xl">Whoops! This page must be a ghost — it's not here!</motion.p>
          <motion.p variants={item} className="mb-8 break-all font-mono text-xs text-muted-foreground md:mb-12">{pathname}</motion.p>
          <motion.div variants={item}>
            <FlowButton><Link to="/">Find shelter</Link></FlowButton>
          </motion.div>
          <motion.div variants={item} className="mt-8">
            <Link to="/" hash="projects" className="text-muted-foreground underline underline-offset-4 outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-ring">See my projects</Link>
          </motion.div>
          <motion.nav variants={item} aria-label="Role profiles" className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs">
            {ROLE_PROFILES.map((p) => (
              <Link key={p.slug} to="/roles/$slug" params={{ slug: p.slug }} className="text-muted-foreground outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-ring">{p.role}</Link>
            ))}
          </motion.nav>
        </motion.div>
      </main>
    </div>
  );
}
