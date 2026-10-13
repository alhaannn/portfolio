import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { OrbitSpotlightGallery } from "@/components/ui/orbit-spotlight-gallery";
import { Badge, Button } from "@/design-system";
import { PROJECT_DETAILS } from "./project-details";
import { SectionLabel } from "./motion";

const works = PROJECT_DETAILS.map(project => ({ title: project.name, src: project.cover, alt: `${project.name} project cover`, meta: `${project.tag} · ${project.status}`, description: project.desc }));

export function FeaturedProjects() {
  const [active, setActive] = useState<number | null>(null);
  const project = active === null ? undefined : PROJECT_DETAILS[active];
  return (
    <section id="projects" className="flex h-screen flex-col overflow-hidden border-b border-border pt-16 pb-4">
      <div id="projects-mobile" className="mx-auto w-full max-w-7xl shrink-0 px-6 md:px-10"><SectionLabel n="§03">Featured Projects</SectionLabel></div>
      <div className="mx-auto min-h-0 w-full max-w-7xl flex-1"><OrbitSpotlightGallery items={works} selected={active} onSelectedChange={setActive} title="Featured Projects" autoplay /></div>
      <div data-project-information className="min-h-0 w-full flex-1 border-t border-border md:overflow-y-auto" aria-label="Selected project information">
        {project ? <div className="mx-auto grid w-full max-w-7xl gap-1 px-3 py-0 text-xs leading-none md:grid-cols-2 md:gap-6 md:px-10 md:py-4 md:leading-tight" aria-live="polite" aria-atomic="true">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1 md:gap-2"><p className="font-mono text-xs text-accent">{project.n} / {project.tag}</p><span className="text-muted-foreground md:hidden">· {project.status}</span><span className="hidden md:inline-flex"><Badge variant="outline">{project.status}</Badge></span></div>
            <h3 className="mt-1 font-serif text-base leading-none text-primary md:mt-2 md:text-3xl md:leading-tight">{project.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground md:font-mono">Target role · {project.targetRole}</p>
            <p className="mt-1 text-xs leading-none text-foreground md:mt-2 md:text-sm md:leading-relaxed">{project.desc}</p>
          </div>
          <div className="flex min-w-0 flex-col justify-between gap-1 md:gap-3">
            <p className="text-xs text-foreground md:hidden">{project.stack.join(" · ")}</p>
            <div className="hidden flex-wrap gap-1 md:flex">{project.stack.map(technology => <Badge key={technology} variant="secondary">{technology}</Badge>)}</div>
            <ul className="grid gap-0 text-xs text-muted-foreground md:gap-1 md:font-mono">{project.metrics.map(metric => <li key={metric}>{metric}</li>)}</ul>
            <div><Button asChild variant="outline" size="sm"><Link to="/projects/$slug" params={{ slug: project.slug }}>View project <ArrowUpRight /></Link></Button></div>
          </div>
        </div> : <div className="flex h-full items-center justify-center px-6 text-center" aria-live="polite"><p className="max-w-lg font-serif text-2xl text-muted-foreground">Scroll above or select a project to view its details and links.</p></div>}
      </div>
    </section>
  );
}
