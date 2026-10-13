import { createFileRoute } from "@tanstack/react-router";
import { CONTACT, FAQS, SITE_URL } from "@/components/portfolio/data";
import { ROLE_PROFILES } from "@/components/portfolio/role-profiles";
import { PROJECT_DETAILS } from "@/components/portfolio/project-details";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const o = SITE_URL;
        const faqs = (FAQS as readonly { q?: string; question?: string; a?: string; answer?: string }[])
          .map((f) => `### ${f.q ?? f.question}\n${f.a ?? f.answer}`).join("\n\n");
        const body = `# Mohammad Alhan Bellary

> Software and AI systems engineer in ${CONTACT.location}, targeting GenAI / Agentic AI, Backend, MLOps and AI/ML engineering roles. Former Junior Software Developer intern at Heagl Technologies (production Django). BCA in Information Technology (IBMR Business School, completed); now studying Artificial Intelligence full-time at IIT Dharwad (NSQF Level 5.0 A.I – Technocrat). All portfolio projects are in progress; numbers attached to them are targets, not measured results.

## Contact
- Email: ${CONTACT.email}
- GitHub: ${CONTACT.github}
- LinkedIn: ${CONTACT.linkedin}
- Instagram: ${CONTACT.instagram}

## Role profiles
${ROLE_PROFILES.map((r) => `- [${r.role}](${o}/roles/${r.slug}): ${r.seoDescription}`).join("\n")}

## Projects (in progress)
${PROJECT_DETAILS.map((p) => `- [${p.name}](${o}/projects/${p.slug}): ${p.desc}`).join("\n")}

## FAQ
${faqs}
`;
        return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
