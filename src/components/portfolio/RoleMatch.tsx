import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Badge, Button, Card, CardContent, Skeleton, Alert, AlertDescription } from "@/design-system";
import { matchRole, TARGET_ROLES, type RoleMatch as Match } from "./role-match.functions";
import { getRoleSlug } from "./role-profiles";
import { SectionLabel } from "./motion";

export function RoleMatch() {
  const [role, setRole] = useState<(typeof TARGET_ROLES)[number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<Match | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function choose(next: (typeof TARGET_ROLES)[number]) {
    if (loading) return;
    setRole(next);
    setLoading(true);
    setError(null);
    setMatch(null);
    try {
      const res = await matchRole({ data: { role: next } });
      if (res.ok) setMatch(res.match);
      else setError(res.error);
    } catch {
      setError("Couldn't generate a match. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="role-match" className="mx-auto max-w-6xl px-6 py-20">
      <SectionLabel n="§03.5">Role Match</SectionLabel>
      <h2 className="font-serif text-4xl italic text-primary sm:text-5xl">Hiring for a role? Start here.</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Pick the role you're evaluating me for and AI will surface the most relevant projects and skills from this portfolio.
      </p>

      <div role="group" aria-label="Target role" className="mt-8 flex flex-wrap gap-3">
        {TARGET_ROLES.map((r) => {
          const slug = getRoleSlug(r);
          return (
            <div key={r} className="flex items-center gap-2">
              <Button variant={role === r ? "primary" : "outline"} onClick={() => choose(r)} disabled={loading} aria-pressed={role === r}>
                {r}
              </Button>
              {slug ? <Button asChild variant="ghost" size="icon"><Link to="/roles/$slug" params={{ slug }} aria-label={`View ${r} career profile`}><ArrowUpRight /></Link></Button> : null}
            </div>
          );
        })}
      </div>

      <div className="mt-8" aria-live="polite">
        {loading && (
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" />
          </div>
        )}
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
        {match && (
          <div className="space-y-6">
            <p className="font-serif text-xl italic text-foreground">{match.summary}</p>
            {role && getRoleSlug(role) ? (
              <Button asChild variant="accent">
                <Link to="/roles/$slug" params={{ slug: getRoleSlug(role) ?? "" }}>View the full {role} profile <ArrowUpRight /></Link>
              </Button>
            ) : null}
            <div className="grid gap-4 md:grid-cols-3">
              {match.projects.map((p, i) => (
                <Card key={p.slug}>
                  <CardContent className="flex h-full flex-col gap-3">
                    <span className="font-mono text-xs text-accent">MATCH {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-serif text-lg text-primary">{p.title}</h3>
                    <p className="flex-1 text-sm text-muted-foreground">{p.reason}</p>
                    <Link to="/projects/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      View project <ArrowUpRight className="size-3" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-muted-foreground">Relevant skills</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {match.skills.map((s) => <li key={s}><Badge variant="secondary">{s}</Badge></li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
