import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/design-system";
import { GithubStarButton } from "@/components/ui/github-star-button";
import { contributionsQueryOptions, GH_URL, GH_USER, starsQueryOptions } from "./contributions";
import { Scrub, SectionLabel } from "./motion";

const ContributionSkyline = lazy(() => import("@/components/ui/contribution-skyline"));

const wrap = "mx-auto w-full max-w-7xl px-6 md:px-10";

/**
 * Heat levels read straight from the design-system tokens, so the chart inherits
 * the palette instead of carrying its own: soft blue → editorial blue → deep blue,
 * with coral reserved for the busiest days.
 */
const TOKENS = ["--muted-foreground", "--primary", "--primary-hover", "--accent"];

type Day = { date: string; count: number };

function useTokenPalette() {
  const [palette, setPalette] = useState<string[] | undefined>(undefined);
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const levels = TOKENS.map((t) => cs.getPropertyValue(t).trim()).filter(Boolean);
    if (levels.length === TOKENS.length) setPalette(levels);
  }, []);
  return palette;
}

function summarize(days: Day[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let run = 0;
  let longest = 0;
  for (const d of sorted) {
    run = d.count > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }
  return {
    total: sorted.reduce((s, d) => s + d.count, 0),
    active: sorted.filter((d) => d.count > 0).length,
    longest,
    busiest: sorted.reduce<Day | undefined>((best, d) => (!best || d.count > best.count ? d : best), undefined),
    first: sorted[0]?.date,
    last: sorted[sorted.length - 1]?.date,
  };
}

export function Contribution() {
  const { data, isPending, isError } = useQuery(contributionsQueryOptions);
  const { data: stars, isPending: starsPending } = useQuery(starsQueryOptions);
  const palette = useTokenPalette();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [stageHeight, setStageHeight] = useState<number>();

  // Mount the 3D skyline only when the section nears the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
    }, { rootMargin: "100%" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const ready = mounted && !isPending && !isError && !!data?.length && !!palette;
  const s = data?.length ? summarize(data) : null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const canvas = section.querySelector("canvas");
        const stage = canvas?.parentElement;
        if (!stage) return;
        const spacing = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--spacing")) || 4;
        const overhead = section.getBoundingClientRect().height - stage.getBoundingClientRect().height;
        const available = Math.floor(window.innerHeight - overhead - spacing * 8);
        setStageHeight(Math.max(spacing * 24, available));
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ready]);

  return (
    <section id="activity" ref={sectionRef} className={`${wrap} py-4`}>
      <div className="mx-auto w-full">
      <SectionLabel n="§04">Commit Telemetry</SectionLabel>
      <Scrub as="h2" className="font-serif text-3xl text-primary md:text-4xl">
        A year of commits, <em>folded</em> into a skyline.
      </Scrub>
      <p className="mt-2 text-sm text-muted-foreground">
        <span className="font-mono text-primary">{GH_URL.replace("https://", "")}</span> · Last 12 months
      </p>

      <div className="mx-auto mt-3 w-full">
        {ready ? (
          <Suspense fallback={<Skeleton className="h-80 w-full rounded-xl" />}>
            <ContributionSkyline data={data} palette={palette} stageHeight={stageHeight} showStats={false} footer={null} />
          </Suspense>
        ) : isError ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="font-mono text-xs text-muted-foreground uppercase">Activity feed unavailable</p>
            <p className="mt-3 text-foreground">
              The commit calendar could not be reached right now — the profile itself is still live.
            </p>
          </div>
        ) : (
          <Skeleton className="h-80 w-full rounded-xl" />
        )}
      </div>

      {s ? (
        <dl className="mx-auto mt-4 grid w-full max-w-xl grid-cols-4 gap-3">
          {[
            ["Contributions", String(s.total)],
            ["Longest streak", `${s.longest} days`],
            ["Busiest day", String(s.busiest?.count ?? 0)],
            ["Active days", String(s.active)],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-1 font-mono text-xl text-accent">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <GithubStarButton
          href={GH_URL}
          ariaLabel={`Open ${GH_USER} on GitHub`}
          stars={stars}
          isPending={starsPending}
        />
        <span className="font-mono text-xs text-muted-foreground">
          {isPending ? "SYNCING LAST 12 MONTHS…" : "LAST 12 MONTHS · UTC"}
        </span>
      </div>
      </div>
    </section>
  );
}
