import { ArrowUpRight, Download, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/design-system";
import { Link } from "@tanstack/react-router";
import { CONTACT } from "@/components/portfolio/data";
import { ROLE_PROFILES } from "@/components/portfolio/role-profiles";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import { usePortfolioTheme } from "@/components/portfolio/Theme";

const links = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects-mobile" },
  { name: "GitHub activity", href: "#activity" },
  { name: "About me", href: "#about" },
  { name: "How I work", href: "#process" },
];

export default function SiteFooter() {
  const { theme } = usePortfolioTheme();
  return (
    <HalftoneWordmarkFooter
      id="contact"
      wordmark="alhan"
      height="auto"
      backToTop={false}
      crop={0.35}
      // Colours resolve through the theme tokens, so the printed word follows
      // night/day automatically; `revision` re-prints it when the theme flips.
      palette={{ background: "var(--background)", ink: "var(--foreground)", warm: "var(--accent)" }}
      revision={theme}
      fontFamily={`"Plus Jakarta Sans", "Inter", system-ui, sans-serif`}
      className="pt-2"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-6 md:px-10 md:pt-10">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          <div className="col-span-2 space-y-2 lg:col-span-1">
            <p className="font-mono text-xs text-accent">LET’S CONNECT</p>
            <h2 className="font-serif text-xl text-primary italic md:text-2xl">Build something resilient.</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">Backend engineering, multi-agent AI, and thoughtful collaboration.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <a href={`mailto:${CONTACT.email}`}><Mail /> Send an email</a>
              </Button>
              {CONTACT.resume ? (
                <Button asChild size="sm" variant="outline">
                  <a href={CONTACT.resume} download><Download /> Download resume</a>
                </Button>
              ) : (
                <Button variant="outline" disabled><Download /> Resume coming soon</Button>
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Explore</h3>
            <nav aria-label="Footer navigation" className="flex flex-col items-start gap-1">
              {links.map((link) => (
                <Button key={link.href} variant="link" size="sm" asChild>
                  <a href={link.href}>{link.name}</a>
                </Button>
              ))}
            </nav>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Get in touch</h3>
            <address className="space-y-2 text-sm not-italic">
              <p className="font-semibold">Mohammad Alhan Bellary</p>
              <p className="text-muted-foreground">Software & AI Systems Engineer</p>
              <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="size-4 text-accent" /> {CONTACT.location}</p>
              <a href={`mailto:${CONTACT.email}`} className="block break-all text-primary underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring">{CONTACT.email}</a>
            </address>
          </div>
          <div className="col-span-2 space-y-2 lg:col-span-1">
            <h3 className="text-lg font-semibold">Around the web</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={CONTACT.github} target="_blank" rel="noreferrer"><Github /> GitHub <ArrowUpRight /></a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={CONTACT.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn <ArrowUpRight /></a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={CONTACT.instagram} target="_blank" rel="noreferrer"><Instagram /> Instagram <ArrowUpRight /></a>
              </Button>
            </div>
            <p className="font-mono text-xs text-muted-foreground">@alhaannn</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-between gap-2 border-t border-border py-3 text-sm text-muted-foreground md:flex-row md:mt-6">
          <p>© {new Date().getFullYear()} Mohammad Alhan Bellary</p>
          <nav aria-label="Career profiles" className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {ROLE_PROFILES.map((r) => (
              <Link key={r.slug} to="/roles/$slug" params={{ slug: r.slug }} className="underline-offset-4 hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring">{r.role}</Link>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="underline-offset-4 hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              Back to top ↑
            </button>
          </nav>
        </div>
        {/* Empty band reserved for the cropped halftone wordmark. Width-aware:
            the word scales with the screen, so the band grows with it. */}
        <div aria-hidden="true" className="pb-20 md:pb-40 lg:pb-56 xl:pb-72 2xl:pb-80" />
      </div>
    </HalftoneWordmarkFooter>
  );
}
