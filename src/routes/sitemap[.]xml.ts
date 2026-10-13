import { createFileRoute } from "@tanstack/react-router";
import { ROLE_PROFILES } from "@/components/portfolio/role-profiles";
import { PROJECT_DETAILS } from "@/components/portfolio/project-details";
import { SITE_URL } from "@/components/portfolio/data";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = SITE_URL;
        const paths = [
          "/",
          ...ROLE_PROFILES.map((r) => `/roles/${r.slug}`),
          ...PROJECT_DETAILS.map((p) => `/projects/${p.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${origin}${p}</loc><priority>${p === "/" ? "1.0" : p.startsWith("/roles") ? "0.9" : "0.7"}</priority></url>`)
          .join("\n")}\n</urlset>\n`;
        return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
