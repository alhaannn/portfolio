import researchCover from "@/assets/project-research-assistant.webp";
import gatewayCover from "@/assets/project-gateway.webp";
import telemetryCover from "@/assets/project-anomaly-mlops.webp";
import defectCover from "@/assets/project-defect-inspection.webp";
import sqlAgentCover from "@/assets/project-sql-agent.webp";
import { PROJECTS } from "./data";

const details = [
  {
    slug: "research-assistant", name: "Research Assistant", cover: researchCover,
    overview: "An in-progress research system designed around a stateful team of agents. Its planned workflow combines hybrid retrieval, a structured vectorless fallback, fact checking, security middleware, and regression evaluation.",
    stages: ["Plan and validate the query", "Retrieve with Qdrant or Chroma plus BM25, with structured SQL or JSON fallback", "Fact-check and synthesize across sources in LangGraph", "Evaluate, trace, and stream the result through FastAPI SSE"],
    features: [
      { title: "Stateful agent orchestration", body: "LangGraph models cyclic workflows so agents can retain state, reflect on intermediate results, and revisit an answer before returning it." },
      { title: "Grounded knowledge retrieval", body: "Qdrant provides the vector retrieval layer for self-reflective RAG, connecting the answer-generation workflow to relevant source context." },
      { title: "Typed outputs and guardrails", body: "Pydantic v2 enforces response schemas. PII redaction callbacks and prompt-injection defenses address sensitive data and untrusted input." },
      { title: "Evaluation plan", body: "Ragas or DeepEval will measure faithfulness, relevancy, and context recall. The 34% hallucination reduction is a target until validated." },
    ],
  },
  {
    slug: "ai-gateway", name: "AI Gateway", cover: gatewayCover,
    overview: "An in-progress asynchronous gateway designed to separate model requests from background execution while adding traffic controls, semantic deduplication, provider resilience, audit trails, and queue processing.",
    stages: ["Validate through FastAPI and Pydantic v2", "Apply token-bucket limits and LRU semantic deduplication", "Route through LiteLLM with provider fallback", "Execute with Celery and Redis, then record usage and latency in PostgreSQL"],
    features: [
      { title: "Token-bucket rate limiting", body: "A token-bucket limiter controls incoming traffic while allowing bounded bursts, protecting the request pipeline from excessive demand." },
      { title: "Semantic caching", body: "The caching layer targets semantically similar requests, reducing repeated model work rather than relying only on exact text matches." },
      { title: "Automated provider fallback", body: "LiteLLM handles provider routing, with Groq as the primary path and OpenAI as the fallback when the primary provider cannot complete a request." },
      { title: "Non-blocking task execution", body: "Celery and Redis provide background queue execution so long-running tasks can be separated from the FastAPI request path. PostgreSQL is part of the persistence stack." },
      { title: "Tests and continuous integration", body: "Pytest and GitHub Actions will cover linting, testing, image builds, and registry publishing. More than 80% coverage, 250+ concurrent requests, and sub-50ms queue latency are targets." },
    ],
  },
  {
    slug: "anomaly-detection", name: "Anomaly Detection", cover: telemetryCover,
    overview: "An in-progress anomaly-detection workflow connecting versioned telemetry, experiment tracking, drift detection, and observable container delivery. The focus is the complete lifecycle, not only an offline prediction.",
    stages: ["Version an IoT or security telemetry dataset with DVC", "Train Isolation Forest or XGBoost baselines and register them in MLflow", "Package inference in Docker and deploy with Kubernetes HPA", "Monitor latency, health, volume, and drift with Prometheus, Grafana, and Evidently AI"],
    features: [
      { title: "Detection and drift tracking", body: "PyTorch and Scikit-learn form the modeling stack, while Evidently AI tracks changes in incoming telemetry distributions." },
      { title: "Repeatable model lifecycle", body: "MLflow and DVC support the experiment and versioning workflow around automated retraining." },
      { title: "Containerized deployment", body: "Docker packages the system for deployment. Kubernetes rolling updates and HPA support the production delivery workflow." },
      { title: "Operational visibility", body: "Prometheus, Grafana, and Evidently AI form the planned telemetry layer. Drift visibility and safe rolling updates with rollback are targets to validate." },
    ],
  },
  {
    slug: "multimodal-inspection", name: "Multimodal Inspection", cover: defectCover,
    overview: "An in-progress inspection system combining visual evidence with tabular or signal metadata, spanning model training through edge-optimized serving.",
    stages: ["Prepare a defect or threat dataset and operational metadata", "Fine-tune YOLOv8 or MobileNet with PyTorch and OpenCV", "Fuse image embeddings with structured features", "Quantize with ONNX Runtime or TensorFlow Lite and serve through FastAPI"],
    features: [
      { title: "Multimodal classification", body: "The planned pipeline combines visual features with operational metadata rather than interpreting each image in isolation." },
      { title: "Edge-oriented inference", body: "ONNX Runtime or TensorFlow Lite will optimize CPU inference. The 42 FPS and 94.2% mAP values are target benchmarks." },
      { title: "Structured detection API", body: "FastAPI will return bounding boxes, confidence scores, and category labels through a typed response contract." },
      { title: "Auditable anomalies", body: "Flagged detections will be stored in SQL so outputs can be reviewed, traced, and compared with later outcomes." },
    ],
  },
  {
    slug: "self-healing-sql-agent", name: "SQL Analytics Agent", cover: sqlAgentCover,
    overview: "An in-progress analytics agent helping non-technical users ask data questions while keeping execution read-only, inspectable, and recoverable when generated SQL fails.",
    stages: ["Inspect the PostgreSQL schema and business definitions", "Generate and validate SQL against a read-only replica", "Feed errors back through a self-correction loop for up to three retries", "Create Plotly charts and insights with human review for ambiguity"],
    features: [
      { title: "Schema-aware generation", body: "A Schema Inspector grounds SQL generation in available tables, fields, relationships, and business context." },
      { title: "Bounded self-correction", body: "Database errors return to the SQL Generator for a maximum of three correction attempts rather than looping indefinitely." },
      { title: "Safe execution", body: "Queries run against a read-only replica. Ambiguous or high-impact actions are routed to a human review step." },
      { title: "Charts and explanations", body: "Pandas and Plotly turn valid results into interactive charts and concise narrative insights." },
    ],
  },
];

export const PROJECT_DETAILS = PROJECTS.map((project, index) => ({ ...project, ...details[index] }));