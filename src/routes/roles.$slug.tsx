import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Download, FileText } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system";
import { getRoleProfile, getRoleProjects, ROLE_PROFILES } from "@/components/portfolio/role-profiles";
import { SITE_URL } from "@/components/portfolio/data";
import { ThemeToggle } from "@/components/portfolio/Theme";
import { NotFound } from "@/components/ui/ghost-404-page";
import { shareImageMeta } from "@/components/portfolio/share-images";

export const Route = createFileRoute("/roles/$slug")({
  beforeLoad: ({ params }) => {
    if (!getRoleProfile(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const profile = getRoleProfile(params.slug);
    if (!profile) {
      return { meta: [{ title: "Role profile not found — Mohammad Alhan Bellary" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${profile.role} — Mohammad Alhan Bellary`;
    const description = profile.seoDescription;
    const path = `/roles/${profile.slug}`;
    const url = `${SITE_URL}${path}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...shareImageMeta(profile.slug),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: title,
          description,
          mainEntity: {
            "@type": "Person",
            name: "Mohammad Alhan Bellary",
            jobTitle: profile.role,
            address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
            sameAs: ["https://github.com/alhaannn", "https://www.linkedin.com/in/alhan-bellary", "https://www.instagram.com/alhaaannnn"],
            knowsAbout: profile.skills,
          },
        }),
      }, {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Roles", item: `${SITE_URL}/#role-match` },
            { "@type": "ListItem", position: 3, name: profile.role, item: url },
          ],
        }),
      }],
    };
  },
  component: RolePage,
  notFoundComponent: () => <NotFound />,
});

function RolePage() {
  const { slug } = Route.useParams();
  const profile = getRoleProfile(slug);
  if (!profile) return null;
  const projects = getRoleProjects(profile);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-10">
        <Button asChild variant="ghost" size="sm"><Link to="/" hash="role-match"><ArrowLeft /> Role Match</Link></Button>
        <Link to="/" className="hidden font-serif text-lg text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring sm:block">Mohammad Alhan Bellary</Link>
        <ThemeToggle />
      </header>

      <article>
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
          <Badge variant="accent">Target role · career profile</Badge>
          <p className="mt-6 font-mono text-sm text-accent">{profile.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl font-serif text-4xl leading-tight text-primary italic sm:text-5xl lg:text-7xl">{profile.role}</h1>
          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-foreground">{profile.story}</p>
          <div className="mt-10 grid gap-6 border-y border-border py-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div><p className="font-mono text-xs uppercase text-muted-foreground">Why this direction fits</p><p className="mt-3 leading-relaxed">{profile.fit}</p></div>
            <div><p className="font-mono text-xs uppercase text-muted-foreground">Current evidence</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{profile.evidence}</p></div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
            <p className="font-mono text-xs text-accent">01 / CAPABILITY MAP</p>
            <h2 className="mt-3 font-serif text-3xl text-primary italic sm:text-4xl">How I would contribute</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {profile.capabilities.map((capability) => (
                <Card key={capability.title} variant="glass">
                  <CardHeader><CardTitle>{capability.title}</CardTitle><CardDescription>{capability.body}</CardDescription></CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
          <p className="font-mono text-xs text-accent">02 / VERIFIED SKILLS</p>
          <h2 className="mt-3 font-serif text-3xl text-primary italic sm:text-4xl">Role-aligned toolkit</h2>
          <ul className="mt-7 flex flex-wrap gap-2">{profile.skills.map((skill) => <li key={skill}><Badge variant="secondary">{skill}</Badge></li>)}</ul>
        </section>

        <section className="border-y border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
            <p className="font-mono text-xs text-accent">03 / SELECTED WORK</p>
            <h2 className="mt-3 font-serif text-3xl text-primary italic sm:text-4xl">Evidence for this role</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.slug}>
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2"><Badge variant="outline">{project.status}</Badge><span className="font-mono text-xs text-accent">{project.n}</span></div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-5 grid gap-2">{project.metrics.map((metric) => <li key={metric} className="font-mono text-xs text-muted-foreground">{metric}</li>)}</ul>
                    <Button asChild variant="outline" size="sm"><Link to="/projects/$slug" params={{ slug: project.slug }}>View case study <ArrowUpRight /></Link></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:px-10">
          <div>
            <p className="font-mono text-xs text-accent">04 / TAILORED RESUME</p>
            <h2 className="mt-3 font-serif text-3xl text-primary italic sm:text-4xl">Resume for this role</h2>
          </div>
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center gap-3"><FileText className="size-5 text-accent" /><CardTitle>{profile.role}</CardTitle></div>
              <CardDescription>This version will foreground the experience and project evidence most relevant to this hiring path.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 grid gap-3">{profile.resumeHighlights.map((item) => <li key={item} className="flex gap-3"><span className="font-mono text-xs text-accent">—</span><span>{item}</span></li>)}</ul>
              {profile.resumeUrl ? (
                <Button asChild><a href={profile.resumeUrl} download><Download /> Download tailored resume</a></Button>
              ) : (
                <div className="flex items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground"><Download className="size-4" /><span>Tailored PDF will be available here once supplied.</span></div>
              )}
            </CardContent>
          </Card>
        </section>

        <nav aria-label="Other target roles" className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
            <p className="font-mono text-xs uppercase text-muted-foreground">Explore another role</p>
            <div className="mt-4 flex flex-wrap gap-3">{ROLE_PROFILES.filter((item) => item.slug !== profile.slug).map((item) => <Button key={item.slug} asChild variant="outline"><Link to="/roles/$slug" params={{ slug: item.slug }}>{item.role}<ArrowUpRight /></Link></Button>)}</div>
          </div>
        </nav>
      </article>
    </main>
  );
}