import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/components/portfolio/data";

const AI_AGENTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"];

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = SITE_URL;
        const ai = AI_AGENTS.map((a) => `User-agent: ${a}\nAllow: /\n`).join("\n");
        return new Response(`User-agent: *\nAllow: /\n\n${ai}\nSitemap: ${origin}/sitemap.xml\n`, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
