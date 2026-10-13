import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import PullLamp from "@/components/ui/pull-lamp";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} });
const STORAGE_KEY = "alhan-portfolio-theme";

export function PortfolioThemeProvider({ children }: { children: ReactNode }) {
  // Night mode is the default; a saved visitor preference (either theme) wins.
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") setTheme(stored);
    } catch { /* Storage may be unavailable in private browsing. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* Switching still works without storage. */ }
  }, [theme, ready]);

  return <ThemeContext.Provider value={{ theme, toggle: () => setTheme((current) => current === "light" ? "dark" : "light") }}>{children}</ThemeContext.Provider>;
}

export function usePortfolioTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle() {
  const { theme, toggle } = usePortfolioTheme();
  // The pull lamp replaces the old icon button at the same 40×40 footprint:
  // lamp lit = day mode, lamp unlit = night mode.
  return (
    // Fixed 40×40 slot (the old icon-button footprint); the lamp fills it and
    // its SVG art letterboxes inside, so layout never stretches on wide headers.
    <span className="inline-flex size-10 shrink-0">
      <PullLamp
        on={theme === "light"}
        // The lamp only emits themechange on real user activation, and toggle()
        // uses a functional update, so no stale-state guard is needed.
        onThemeChange={() => toggle()}
        className="h-full w-full"
      />
    </span>
  );
}