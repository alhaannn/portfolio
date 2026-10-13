import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Box, Layers, Scissors, Play, Pause, RotateCcw, ScanLine } from "lucide-react";
import { Button, Tabs, TabsList, TabsTrigger } from "@/design-system";
import type { MachineMode, StationId } from "@/components/ui/agentic-factory-3d";
import { PROCESS } from "./data";
import { Highlight, Scrub, SectionLabel } from "./motion";
import { usePortfolioTheme } from "./Theme";

const Factory = lazy(() => import("@/components/ui/agentic-factory-3d"));
const stages: { id: StationId; label: string; title: string; body: string }[] = [
  { id: "cabinet", label: "Data", ...PROCESS[0] },
  { id: "engine", label: "Build", ...PROCESS[1] },
  { id: "admin", label: "Validate", ...PROCESS[2] },
  { id: "storefront", label: "Observe", ...PROCESS[3] },
  { id: "cashdesk", label: "Deploy", title: "Containerized Deployment", body: "Optimized service images, CI pipelines, Kubernetes delivery, health checks, and rollback paths." },
];
const modes: { id: MachineMode; label: string; icon: typeof Box }[] = [
  { id: "assembled", label: "Assembled", icon: Box },
  { id: "cutaway", label: "Cutaway", icon: Scissors },
  { id: "stations", label: "Stations", icon: Layers },
  { id: "order", label: "One workflow", icon: Play },
];

export function FactoryProcess() {
  const { theme } = usePortfolioTheme();
  const section = useRef<HTMLElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const footer = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<StationId>("cabinet");
  const [mode, setMode] = useState<MachineMode>("assembled");
  const [playing, setPlaying] = useState(true);
  const [stageHeight, setStageHeight] = useState<number>();
  const active = stages.find((s) => s.id === selected) ?? stages[0];

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    setPlaying(!matchMedia("(prefers-reduced-motion: reduce)").matches);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
    }, { rootMargin: "100%" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function measure() {
      const overhead = (header.current?.offsetHeight ?? 0) + (footer.current?.offsetHeight ?? 0);
      setStageHeight(Math.max(240, window.innerHeight - overhead - 32));
    }
    measure();
    const observer = new ResizeObserver(measure);
    if (header.current) observer.observe(header.current);
    if (footer.current) observer.observe(footer.current);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  function focus(id: StationId) {
    setSelected(id);
    setMode("assembled");
    window.__machine?.focusStation(id);
  }

  return (
    <section ref={section} id="process" className="flex h-screen flex-col border-y border-border bg-secondary py-4 overflow-hidden">
      <div ref={header} className="mx-auto w-full max-w-7xl shrink-0 px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <SectionLabel n="§06">Engineering Process</SectionLabel>
            <Scrub as="h2" className="max-w-3xl font-serif text-3xl text-primary md:text-4xl">
              From raw signal to <Highlight><em>observable system</em></Highlight>.
            </Scrub>
          </div>
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">05 STATIONS / 01 WORKFLOW</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <Tabs value={mode} onValueChange={(value) => {
            const next = modes.find((m) => m.id === value);
            if (!next) return;
            setMode(next.id);
            window.__machine?.setMode(next.id);
            if (next.id === "order") setPlaying(true);
          }}>
            <TabsList aria-label="Factory view">
              {modes.map(({ id, label, icon: Icon }) => <TabsTrigger key={id} value={id} disabled={!ready} title={label} aria-label={label}>
                <Icon className="size-4" /><span className="ml-2 hidden sm:inline">{label}</span>
              </TabsTrigger>)}
            </TabsList>
          </Tabs>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" disabled={!ready} title="Top view" aria-label="Top view" onClick={() => { window.__machine?.setCamera("top"); setMode("assembled"); }}><ScanLine /></Button>
            <Button variant="ghost" size="icon" disabled={!ready} title="Reset view" aria-label="Reset view" onClick={() => { window.__machine?.setMode("assembled"); window.__machine?.setCamera("overview"); setMode("assembled"); }}><RotateCcw /></Button>
            <Button variant="ghost" size="icon" disabled={!ready} title={playing ? "Pause animation" : "Resume animation"} aria-label={playing ? "Pause animation" : "Resume animation"} onClick={() => {
              if (playing) window.__machine?.pause(); else window.__machine?.play();
              setPlaying(!playing);
            }}>{playing ? <Pause /> : <Play />}</Button>
          </div>
        </div>
      </div>
      <div className="w-full min-h-0 flex-1" style={stageHeight ? { height: stageHeight, flex: "none" } : undefined}>
        {mounted && <Suspense fallback={<div className="flex h-full items-center justify-center font-mono text-sm text-muted-foreground">Assembling engineering workflow…</div>}>
          <Factory key={theme} embed onReady={() => { setReady(true); window.__machine?.setMode(mode); if (!playing) window.__machine?.pause(); }} onStation={(id) => { setSelected(id); setMode("assembled"); }} />
        </Suspense>}
      </div>
      <div ref={footer} className="mx-auto w-full max-w-7xl shrink-0 px-6 md:px-10">
        <div className="flex flex-wrap gap-2 border-t border-border pt-3" aria-label="Engineering stages">
          {stages.map((stage, i) => <Button key={stage.id} variant={selected === stage.id ? "primary" : "outline"} size="sm" disabled={!ready} aria-pressed={selected === stage.id} onClick={() => focus(stage.id)}>
            <span className="font-mono">0{i + 1}</span>{stage.label}
          </Button>)}
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-2" aria-live="polite">
          <h3 className="font-serif text-xl text-primary md:text-2xl">{active.title}</h3>
          <p className="text-sm text-foreground leading-relaxed line-clamp-2 md:line-clamp-none">{active.body}</p>
        </div>
      </div>
    </section>
  );
}
