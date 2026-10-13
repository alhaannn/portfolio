import * as React from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/design-system";

export interface NavigationItem {
  name: string;
  href: string;
}

/** Supplied animated navigation, with accessible controls and portfolio-owned links. */
export function AnimatedNavFramer({ items }: { items: NavigationItem[] }) {
  const [isExpanded, setExpanded] = React.useState(true);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (!isExpanded && (latest < 80 || (latest < previous && scrollPositionOnCollapse.current - latest > 80))) {
      setExpanded(true);
    }
    lastScrollY.current = latest;
  });

  return (
    <div
      className={`pointer-events-none fixed left-4 z-40 flex justify-start ${
        isExpanded ? "top-16 sm:top-4" : "top-4"
      }`}
    >
      <motion.nav
        aria-label="Main navigation"
        layout={!reduce}
        initial={false}
        animate={{ x: 0, opacity: 1 }}
        transition={reduce ? { duration: 0 } : { type: "spring", damping: 20, stiffness: 300 }}
        className="pointer-events-auto"
      >
        {isExpanded ? (
          <motion.div
            id="portfolio-navigation-links"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel flex w-fit items-center gap-0 rounded-xl border border-border p-1 shadow-paper"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setExpanded(false);
                scrollPositionOnCollapse.current = scrollY.get();
                requestAnimationFrame(() => document.getElementById("portfolio-menu-toggle")?.focus());
              }
            }}
          >
            {items.map((item) => (
              <Button key={item.name} variant="ghost" size="sm" asChild>
                <a href={item.href} onClick={(event) => {
                  const mobileProjects = document.getElementById("projects-mobile");
                  if (item.href === "#projects" && mobileProjects && mobileProjects.getClientRects().length > 0) {
                    event.preventDefault();
                    mobileProjects.scrollIntoView({ behavior: reduce ? "instant" : "smooth" });
                    window.history.replaceState(null, "", "#projects-mobile");
                  }
                }}>{item.name}</a>
              </Button>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={reduce ? false : { scale: 0.8 }} animate={{ scale: 1 }}>
            <Button
              id="portfolio-menu-toggle"
              variant="outline"
              size="icon"
              aria-label="Open navigation menu"
              aria-expanded={false}
              aria-controls="portfolio-navigation-links"
              title="Open navigation menu"
              onClick={() => {
                setExpanded(true);
                requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#portfolio-navigation-links a")?.focus());
              }}
            ><Menu /></Button>
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
}