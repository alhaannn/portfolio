import { queryOptions } from "@tanstack/react-query";
import type { ContributionDay } from "@/components/ui/contribution-skyline";

export const GH_USER = "alhaannn";
export const GH_URL = `https://github.com/${GH_USER}`;

/** Public mirror of the GitHub contributions calendar (same shape GitHub renders). */
const ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`;

async function fetchContributions(): Promise<ContributionDay[]> {
  const res = await fetch(ENDPOINT, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`GitHub activity unavailable (${res.status})`);
  const json = (await res.json()) as { contributions?: { date: string; count: number }[] };
  return (json.contributions ?? []).map((d) => ({ date: d.date, count: d.count }));
}

export const contributionsQueryOptions = queryOptions({
  queryKey: ["github-contributions", GH_USER],
  queryFn: fetchContributions,
  staleTime: 1000 * 60 * 60,
  retry: 1,
});

/** Public repository list — used for the live star total on the GitHub CTA. */
const REPOS_ENDPOINT = `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`;

async function fetchStars(): Promise<number> {
  const res = await fetch(REPOS_ENDPOINT, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`GitHub stars unavailable (${res.status})`);
  const json = (await res.json()) as { stargazers_count?: number }[];
  return json.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);
}

export const starsQueryOptions = queryOptions({
  queryKey: ["github-stars", GH_USER],
  queryFn: fetchStars,
  staleTime: 1000 * 60 * 60,
  retry: 1,
});
