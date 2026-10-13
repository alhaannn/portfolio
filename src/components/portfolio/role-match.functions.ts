import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PROJECTS, STACK } from "./data";
import { PROJECT_DETAILS } from "./project-details";

export const TARGET_ROLES = [
  "GenAI / Agentic AI Engineer",
  "Software Engineer (Backend)",
  "MLOps Engineer",
  "AI/ML Engineer",
] as const;

export type RoleMatch = {
  summary: string;
  projects: { slug: string; title: string; reason: string }[];
  skills: string[];
};

export type RoleMatchResult = { ok: true; match: RoleMatch } | { ok: false; error: string };

const SKILLS = Array.from(new Set([...STACK, ...PROJECTS.flatMap((p) => p.stack)]));

export const matchRole = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ role: z.enum(TARGET_ROLES) }).parse(input))
  .handler(async ({ data }): Promise<RoleMatchResult> => {
    const groqKey = process.env.GROQ_API_KEY;
    const googleKey = process.env.GOOGLE_API_KEY;

    if (!groqKey && !googleKey) {
      return { ok: false, error: "Role matching isn't configured yet. Add GROQ_API_KEY or GOOGLE_API_KEY." };
    }

    const catalog = PROJECT_DETAILS.map((p) => ({
      slug: p.slug,
      title: p.title,
      area: p.tag,
      status: p.status,
      problem: p.problem,
      description: p.desc,
      stack: p.stack,
      targets: p.metrics,
    }));

    const systemPrompt =
      "You recommend portfolio work by Mohammad Alhan Bellary, an early-career Software & AI Systems Engineer, to a visitor evaluating him for a role. Use ONLY the provided projects and skills. Pick the 2-3 most relevant projects ordered by relevance, each with one concise sentence explaining the fit. Pick 6-10 of the most relevant skills. All projects are in progress: describe numbers only as targets, never achieved results. The summary is 1-2 sentences, third person, professional, no hype. You must output valid JSON matching this schema: {\"summary\": string, \"projects\": [{\"slug\": string, \"reason\": string}], \"skills\": [string]}";

    const userInput = `Role: ${data.role}\n\nProjects:\n${JSON.stringify(catalog)}\n\nVerified skills:\n${JSON.stringify(SKILLS)}`;

    let text: string | undefined;

    // 1. Try Groq first for speed
    if (groqKey) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userInput },
            ],
            temperature: 0.2,
          }),
        });

        if (res.ok) {
          const json = (await res.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          text = json.choices?.[0]?.message?.content?.trim();
        }
      } catch {
        /* try fallback */
      }
    }

    // 2. Try Gemini backup
    if (!text && googleKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${googleKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemPrompt }] },
              contents: [{ role: "user", parts: [{ text: userInput }] }],
              generationConfig: {
                responseMimeType: "application/json",
              },
            }),
          },
        );

        if (res.ok) {
          const json = (await res.json()) as {
            candidates?: { content?: { parts?: { text?: string }[] } }[];
          };
          text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        }
      } catch {
        /* failed */
      }
    }

    if (!text) {
      return { ok: false, error: "Couldn't generate a match. Please try again in a moment." };
    }

    try {
      const parsed = JSON.parse(text) as {
        summary: string;
        projects: { slug: string; reason: string }[];
        skills: string[];
      };

      const projects = (parsed.projects ?? [])
        .map((p) => {
          const d = PROJECT_DETAILS.find((x) => x.slug === p.slug);
          return d ? { slug: d.slug, title: d.title, reason: p.reason } : null;
        })
        .filter((p): p is NonNullable<typeof p> => !!p)
        .slice(0, 3);

      const skills = Array.from(new Set((parsed.skills ?? []).filter((s) => SKILLS.includes(s)))).slice(0, 10);

      if (!parsed.summary) {
        return { ok: false, error: "Couldn't generate a match for this role." };
      }

      return { ok: true, match: { summary: parsed.summary, projects, skills } };
    } catch {
      return { ok: false, error: "Couldn't read the match result. Please try again." };
    }
  });
