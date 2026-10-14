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

export type TargetRole = (typeof TARGET_ROLES)[number];

export type RoleMatch = {
  summary: string;
  projects: { slug: string; title: string; reason: string }[];
  skills: string[];
};

export type RoleMatchResult = { ok: true; match: RoleMatch } | { ok: false; error: string };

const SKILLS = Array.from(new Set([...STACK, ...PROJECTS.flatMap((p) => p.stack)]));

export const DETERMINISTIC_ROLE_MATCHES: Record<TargetRole, RoleMatch> = {
  "GenAI / Agentic AI Engineer": {
    summary:
      "Mohammad Alhan Bellary specializes in production-grade agentic AI architectures, cyclic multi-agent workflows, and hybrid RAG systems.",
    projects: [
      {
        slug: "research-assistant",
        title: "Enterprise Multi-Agent Knowledge & Research Assistant",
        reason:
          "Cyclic multi-agent orchestration with LangGraph, hybrid vector search via Qdrant, and target 34% lower hallucination.",
      },
      {
        slug: "ai-gateway",
        title: "High-Throughput Asynchronous AI Gateway & Task Engine",
        reason:
          "Asynchronous task execution with Celery and Redis, token-bucket traffic limits, and LiteLLM provider fallback.",
      },
      {
        slug: "self-healing-sql-agent",
        title: "Self-Healing BI & SQL Analytics Agent",
        reason:
          "Read-only schema-aware SQL generation with bounded self-correction loops and human review.",
      },
    ],
    skills: [
      "Python 3.13",
      "LangGraph",
      "LangChain v1",
      "FastAPI",
      "Qdrant",
      "BM25",
      "LiteLLM",
      "Redis",
      "Celery",
      "PostgreSQL",
    ],
  },
  "Software Engineer (Backend)": {
    summary:
      "Mohammad Alhan Bellary builds high-throughput distributed backends, resilient asynchronous task queues, and schema-enforced relational services.",
    projects: [
      {
        slug: "ai-gateway",
        title: "High-Throughput Asynchronous AI Gateway & Task Engine",
        reason:
          "Distributed task engine with Celery, Redis queuing, PostgreSQL telemetry, and target 250+ concurrent requests.",
      },
      {
        slug: "research-assistant",
        title: "Enterprise Multi-Agent Knowledge & Research Assistant",
        reason:
          "FastAPI SSE streaming services, typed Pydantic contracts, and containerized Docker orchestration.",
      },
      {
        slug: "self-healing-sql-agent",
        title: "Self-Healing BI & SQL Analytics Agent",
        reason:
          "Robust database interactions with SQLAlchemy, PostgreSQL schema validation, and retry containment.",
      },
    ],
    skills: [
      "Python 3.13",
      "FastAPI",
      "Celery",
      "Redis",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
    ],
  },
  "MLOps Engineer": {
    summary:
      "Mohammad Alhan Bellary designs end-to-end machine learning lifecycles, versioned data pipelines, and telemetry-backed container deployments.",
    projects: [
      {
        slug: "anomaly-detection",
        title: "Production MLOps Anomaly Detection & Deployment System",
        reason:
          "Full-lifecycle MLOps with DVC dataset versioning, MLflow experiment tracking, and Kubernetes HPA deployments.",
      },
      {
        slug: "ai-gateway",
        title: "High-Throughput Asynchronous AI Gateway & Task Engine",
        reason:
          "Traffic management, provider fallback resilience, and Prometheus/Grafana operational metrics.",
      },
      {
        slug: "multimodal-inspection",
        title: "Multimodal Defect & Threat Inspection System",
        reason:
          "Edge deployment and model quantization with ONNX Runtime, packaged within Docker containers.",
      },
    ],
    skills: [
      "Python 3.13",
      "MLflow",
      "DVC",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "FastAPI",
      "XGBoost",
      "PyTorch",
    ],
  },
  "AI/ML Engineer": {
    summary:
      "Mohammad Alhan Bellary focuses on applied computer vision, tabular anomaly modeling, and edge inference optimization.",
    projects: [
      {
        slug: "multimodal-inspection",
        title: "Multimodal Defect & Threat Inspection System",
        reason:
          "Multimodal vision pipelines combining YOLOv8 backbones, OpenCV preprocessing, and ONNX Runtime targeting 42 FPS.",
      },
      {
        slug: "anomaly-detection",
        title: "Production MLOps Anomaly Detection & Deployment System",
        reason:
          "XGBoost and Isolation Forest anomaly baselines with continuous distribution drift monitoring.",
      },
      {
        slug: "research-assistant",
        title: "Enterprise Multi-Agent Knowledge & Research Assistant",
        reason:
          "Vector embedding retrieval with Qdrant, BM25 hybrid ranking, and automated quality metrics.",
      },
    ],
    skills: [
      "Python 3.13",
      "PyTorch",
      "YOLOv8",
      "OpenCV",
      "ONNX Runtime",
      "XGBoost",
      "FastAPI",
      "Pandas",
      "Plotly",
      "Docker",
    ],
  },
};

export const matchRole = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ role: z.enum(TARGET_ROLES) }).parse(input))
  .handler(async ({ data }): Promise<RoleMatchResult> => {
    const groqKey = process.env.GROQ_API_KEY;
    const googleKey = process.env.GOOGLE_API_KEY;

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

    // 1. Try Groq first for speed (try flagship openai/gpt-oss-120b, then fallbacks)
    if (groqKey) {
      const groqModels = ["openai/gpt-oss-120b", "llama-3.3-70b-versatile", "qwen/qwen3.8-27b"];
      for (const model of groqModels) {
        try {
          const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model,
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
            const candidate = json.choices?.[0]?.message?.content?.trim();
            if (candidate) {
              text = candidate;
              break;
            }
          }
        } catch {
          /* try next model */
        }
      }
    }

    // 2. Try Gemini backup
    if (!text && googleKey) {
      const geminiModels = ["models/gemini-3.5-flash", "models/gemini-3.8-flash", "models/gemini-flash-latest"];
      for (const model of geminiModels) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${googleKey}`,
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
            const candidate = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            if (candidate) {
              text = candidate;
              break;
            }
          }
        } catch {
          /* try next model */
        }
      }
    }

    // Parse model output if available
    if (text) {
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

        if (parsed.summary && projects.length > 0) {
          return { ok: true, match: { summary: parsed.summary, projects, skills } };
        }
      } catch {
        /* proceed to deterministic fallback */
      }
    }

    // Bulletproof fallback: Never show broken red boxes to recruiters/visitors
    const fallback = DETERMINISTIC_ROLE_MATCHES[data.role];
    return { ok: true, match: fallback };
  });
