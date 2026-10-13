import { useEffect, useRef, useState } from "react";
import { Activity, GraduationCap, Timer, ShieldCheck, Boxes, Braces, Grip, RotateCcw } from "lucide-react";
import { Button, Badge } from "@/design-system";
import { DraggableWidgetGrid, type WidgetItem } from "@/components/ui/draggable-widget-grid";
import { SectionLabel } from "./motion";

const items: WidgetItem[] = [
  { id: "systems", size: "wide", label: "Five engineering projects" },
  { id: "latency", size: "sm", label: "Gateway latency" },
  { id: "quality", size: "sm", label: "Answer faithfulness" },
  { id: "skills", size: "wide", label: "Engineering toolkit" },
  { id: "learning", size: "sm", label: "AI Technocrat training" },
  { id: "testing", size: "sm", label: "Gateway test coverage" },
];

const signals = {
  latency: { icon: Timer, label: "Gateway target", value: "<50", unit: "ms", note: "Target queue latency", detail: "250+ concurrent requests · planned benchmark" },
  quality: { icon: ShieldCheck, label: "Research target", value: "-34%", unit: "", note: "Target context hallucination", detail: "Ragas or DeepEval regression gates" },
  learning: { icon: GraduationCap, label: "Learning track", value: "L5.0", unit: "", note: "NSQF AI Technocrat", detail: "In progress · IIT Dharwad collaboration" },
  testing: { icon: Activity, label: "Vision targets", value: "42", unit: " FPS", note: "Target edge inference", detail: "Target 94.2% mAP · five categories" },
};

export function QuantifiedSignal() {
  const available = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState({ height: 0, columns: 4, cell: 0, gap: 0 });
  const [version, setVersion] = useState(0);
  const [editable, setEditable] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const compact = geometry.height / (8 / geometry.columns) < geometry.gap * 14;
  useEffect(() => {
    const el = available.current;
    if (!el) return;
    const measure = () => {
      const style = getComputedStyle(el);
      const gap = parseFloat(style.columnGap) || 0;
      const width = el.clientWidth;
      const columns = width >= el.clientHeight ? 4 : 2;
      setGeometry({ height: el.clientHeight, columns, cell: width / columns, gap });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, []);
  return (
    <section id="highlights" className="flex h-screen flex-col border-y border-border bg-background px-6 pt-28 pb-4 sm:px-10 sm:pt-24 landscape:pt-16">
      <div className="mx-auto flex w-full max-w-7xl min-h-0 flex-1 flex-col gap-4">
        <div><SectionLabel n="§02">Quantified Signal</SectionLabel></div>
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <h2 className="font-serif text-xl leading-tight text-primary sm:text-4xl landscape:text-xl">Built with rigor. <span className="italic text-muted-foreground">Measured against targets.</span></h2>
          </div>
          <div className="flex shrink-0 gap-1">
            <Button variant={editable ? "primary" : "outline"} size="icon" aria-label={editable ? "Lock widget layout" : "Unlock widget layout"} title={editable ? "Lock layout" : "Rearrange layout"} aria-pressed={editable} onClick={() => setEditable((value) => !value)}><Grip /></Button>
            <Button variant="ghost" size="icon" aria-label="Reset widget layout" title="Reset layout" onClick={() => { setVersion((value) => value + 1); setAnnouncement("Original layout restored"); }}><RotateCcw /></Button>
          </div>
        </header>
        <div ref={available} className="min-h-0 flex-1 gap-3">
          {geometry.height > 0 && <DraggableWidgetGrid key={version} items={items} editable={editable} maxColumns={geometry.columns} cellSize={geometry.cell} gap={geometry.gap} stageHeight={geometry.height} onChange={() => setAnnouncement("Widget layout updated")} renderItem={(item) => {
            if (item.id === "systems") return (
              <div className="flex h-full min-w-0 flex-col justify-between gap-2 bg-primary p-3 text-primary-foreground sm:p-5 landscape:p-3">
                <div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold">Systems portfolio</p><Boxes className="size-4 shrink-0" /></div>
                <div className="flex items-baseline gap-3"><span className={compact ? "font-serif text-2xl" : "font-serif text-4xl sm:text-6xl landscape:text-3xl"}>05</span><h3 className={compact ? "font-serif text-sm leading-tight" : "font-serif text-lg leading-tight sm:text-2xl landscape:text-lg"}>{compact ? "Agents · Backend · MLOps · Vision · BI" : <>Five systems.<br />One production mindset.</>}</h3></div>
                {!compact && <ul className="grid grid-cols-5 gap-2 font-mono text-xs"><li>Research<br />Agentic RAG</li><li>Gateway<br />Async Python</li><li>Detection<br />MLOps</li><li>Inspection<br />Edge vision</li><li>Analytics<br />Text-to-SQL</li></ul>}
              </div>
            );
            if (item.id === "skills") return (
              <div className="flex h-full flex-col justify-between gap-2 p-3 sm:p-5 landscape:p-3">
                <div className="flex items-center justify-between gap-2"><h3 className="text-xs font-semibold text-primary">Engineering toolkit</h3><Braces className="size-4 shrink-0 text-accent" /></div>
                {compact ? <p className="text-xs">Python · FastAPI · LangGraph · PyTorch<br />PostgreSQL · Docker · Kubernetes</p> : <div className="grid grid-cols-3 gap-2 text-xs"><div><p className="font-mono text-accent">AI / ML</p><p className="mt-1">LangGraph · Qdrant<br />PyTorch · YOLO</p></div><div><p className="font-mono text-accent">Backend</p><p className="mt-1">FastAPI · Celery<br />Redis · PostgreSQL</p></div><div><p className="font-mono text-accent">Delivery</p><p className="mt-1">Docker · K8s<br />MLflow · Grafana</p></div></div>}
                {!compact && <p className="font-mono text-xs text-muted-foreground">NeetCode 150 · Trees / Graphs / DP</p>}
              </div>
            );
            const signal = signals[item.id as keyof typeof signals];
            if (!signal) return null;
            const Icon = signal.icon;
            return <div className={compact ? "flex h-full min-w-0 flex-col justify-between gap-0 p-2" : "flex h-full min-w-0 flex-col justify-between gap-1 p-3 sm:p-5 landscape:p-3"}>
              <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-1"><h3 className="min-w-0 text-xs font-semibold text-primary">{signal.label}</h3><Icon className="size-4 shrink-0 text-accent" /></header>
              <p className={compact ? "font-mono text-lg leading-tight text-primary" : "font-mono text-2xl text-primary sm:text-4xl landscape:text-2xl"}>{signal.value}<span className="text-xs text-muted-foreground">{signal.unit}</span></p>
              <div><p className="text-xs text-foreground">{signal.note}</p>{!compact && <p className="mt-1 text-xs text-muted-foreground">{signal.detail}</p>}</div>
            </div>;
          }} />}
        </div>
        <footer className="flex shrink-0 flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground"><span className="font-mono">All five builds are in progress · benchmarks are targets</span><Badge variant="outline">120-hour deployment training track</Badge></footer>
        <p className="sr-only" aria-live="polite">{announcement}</p>
      </div>
    </section>
  );
}