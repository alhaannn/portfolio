import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge, Button } from "@/design-system";
import { PROJECT_DETAILS } from "@/components/portfolio/project-details";
import { SITE_URL } from "@/components/portfolio/data";
import { ThemeToggle } from "@/components/portfolio/Theme";
import { NotFound } from "@/components/ui/ghost-404-page";

export const Route = createFileRoute("/projects/$slug")({
  beforeLoad: ({ params }) => {
    if (!PROJECT_DETAILS.some((project) => project.slug === params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const project = PROJECT_DETAILS.find((item) => item.slug === params.slug);
    const title = project ? `${project.name} — Mohammad Alhan Bellary` : "Project not found — Mohammad Alhan Bellary";
    const description = project?.desc ?? "The requested portfolio project could not be found.";
    const image = project?.cover;
    const path = `/projects/${params.slug}`;
    const url = `${SITE_URL}${path}`;
    const scripts = project ? [{
      type: "application/ld+json",
      children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "SoftwareSourceCode", name: project.name, description, creativeWorkStatus: "In progress",
          author: { "@type": "Person", name: "Mohammad Alhan Bellary", url: SITE_URL }, codeRepository: "https://github.com/alhaannn" },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ] },
      ]),
    }] : [];
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
      ...(project ? [{ property: "og:url", content: url }] : [{ name: "robots", content: "noindex" }]),
      ...(image?.startsWith("https://") ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
    ], links: project ? [{ rel: "canonical", href: url }] : [], scripts };
  },
  component: ProjectPage,
  notFoundComponent: () => <NotFound />,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = PROJECT_DETAILS.find((item) => item.slug === slug);
  if (!project) return null;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)] items-center gap-4 px-6 py-6 sm:flex sm:justify-between md:px-10">
        <div className="shrink-0"><Button asChild variant="ghost" size="sm"><Link to="/" hash="projects"><ArrowLeft /> All projects</Link></Button></div>
        <Link to="/" className="min-w-0 truncate font-serif text-lg text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">Mohammad Alhan Bellary</Link>
        <ThemeToggle />
      </header>
      <article>
        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-2 md:items-center md:px-10 md:py-16">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2"><p className="font-mono text-xs text-accent">{project.n} / {project.tag}</p><Badge variant="outline">{project.status}</Badge></div>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-primary md:text-4xl lg:text-5xl">{project.title}</h1>
            <p className="mt-3 font-mono text-sm text-muted-foreground">Target role · {project.targetRole}</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">{project.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2">{project.stack.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}</div>
          </div>
          <figure className="min-w-0"><img src={project.cover} alt={`${project.name} project cover`} width={1200} height={800} fetchPriority="high" decoding="async" className="aspect-video w-full rounded-md object-cover shadow-paper" /><figcaption className="mt-2 font-mono text-xs text-muted-foreground">Concept cover · project in progress</figcaption></figure>
        </section>
        <section className="border-y border-border bg-secondary">
          <ul className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-2 md:px-10">{project.metrics.map((metric) => <li key={metric} className="font-mono text-lg text-primary">{metric}</li>)}</ul>
        </section>
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <section className="grid gap-6 border-b border-border pb-10 md:grid-cols-3">
            <h2 className="font-serif text-3xl text-primary">Problem & direction</h2>
            <div className="grid gap-4 md:col-span-2"><p className="leading-relaxed"><strong>Core problem:</strong> {project.problem}</p><p className="leading-relaxed">{project.overview}</p></div>
          </section>
          <section className="grid gap-6 border-b border-border py-10 md:grid-cols-3">
            <h2 className="font-serif text-3xl text-primary">How it works</h2>
            <ol className="grid gap-6 md:col-span-2">{project.stages?.map((stage, index) => <li key={stage} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4"><span className="font-mono text-sm text-accent">0{index + 1}</span><p>{stage}</p></li>)}</ol>
          </section>
          <section className="grid gap-6 py-10 md:grid-cols-3">
            <h2 className="font-serif text-3xl text-primary">Engineering details</h2>
            <div className="grid gap-8 md:col-span-2">{project.features?.map((feature) => <div key={feature.title}><h3 className="text-lg font-semibold text-primary">{feature.title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{feature.body}</p></div>)}</div>
          </section>
          <nav aria-label="Other projects" className="flex flex-wrap gap-3 border-t border-border pt-8">{PROJECT_DETAILS.filter((item) => item.slug !== slug).map((item) => <Button key={item.n} asChild variant="outline"><Link to="/projects/$slug" params={{ slug: item.slug }}>{item.name}<ArrowUpRight /></Link></Button>)}</nav>
        </div>
      </article>
    </main>
  );
}