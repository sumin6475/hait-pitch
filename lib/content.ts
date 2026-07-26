/*
  HAIT pitch page content. Filled from HAIT's README.md and its strengths doc
  (2026-07-09-HAIT-PMS-strengths.md). Every claim traces to those sources.

  TODO (Sumin): add a demo/walkthrough link and a résumé link when available. The repo
  link (github.com/sumin6475/hait) is set; confirm it is public before sharing the page.
*/

export type Heading = {
  top: string;
  accent: string;
  body?: string;
};

export type Feature = {
  title: string;
  body: string;
  points?: string[];
  image?: string;
  visualLabel?: string;
};
export type Decision = { title: string; body: string };
export type Metric = { label: string; value: string };

export type PitchContent = {
  projectName: string;
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    image?: string; // when set, the hero shows this screenshot on a scroll-tilt device frame
    imageAlt?: string;
  };
  problem: Heading & { points: string[]; image?: string; visualLabel?: string };
  features: Heading & { items: Feature[] };
  technical: Heading & {
    stack: string[];
    decisions: Decision[];
    skills: string[];
    learnings: string[];
  };
  outcomes: Heading & { metrics: Metric[]; notes: string[] };
  cta: Heading;
  links: {
    demo?: string;
    repo?: string;
    resume?: string;
  };
};

export const content: PitchContent = {
  projectName: "HAIT",
  hero: {
    eyebrow: "Human-AI Team · HCDE master's thesis",
    headline: "How does an AI teammate change a group's decision?",
    subhead:
      "HAIT is a full-stack platform for a Hidden Profile group study. Human participants discuss four candidates with an AI teammate named Alex, whose every turn is governed by frozen prompts and explicit rules, so the AI stays a controlled variable across sessions.",
    primaryCta: "View the code",
    secondaryCta: "Live demo",
    image: "/shots/discussion.png",
    imageAlt: "The HAIT team discussion: Alex moderating as team lead while participants share their hidden candidate information, beside each member's own candidate cards",
  },
  problem: {
    top: "A free chatbot would break the experiment.",
    accent: "A controlled one keeps it valid.",
    body: "In a behavioral study, if the AI drifts between sessions or speaks whenever it likes, you can no longer attribute the result to the manipulation. HAIT is built around that constraint from the ground up.",
    points: [
      "What the AI may say is frozen before the study starts and cannot change mid-run.",
      "When the AI speaks is decided by explicit, auditable rules, not the model's impulse.",
      "Every model boundary returns typed, schema-validated data, so a bad output fails fast instead of leaking into the results.",
    ],
    image: "/shots/survey.png",
    visualLabel: "The participant flow",
  },
  features: {
    top: "What it does.",
    accent: "The parts worth showing.",
    body: "The screens that carry the study, for the participants in the discussion and the researcher running it. The deeper engineering is in the next section.",
    items: [
      {
        title: "Alex, an AI teammate you can control",
        body: "Alex joins the discussion under different experimental conditions. A lightweight judge first decides whether Alex should speak this turn and picks a reason; a reason-routed builder then composes the reply from the frozen condition prompt. The AI never speaks just because it can.",
        points: [
          "Judge, gate, and prompt-builder are three separable stages.",
          "A gpt-4o-mini judge keeps the speak decision fast; a pinned generator writes the reply.",
        ],
        image: "/shots/chat.png",
        visualLabel: "Participant chat with Alex",
      },
      {
        title: "A hidden-profile study, measured live",
        body: "Each member sees only part of every candidate's profile, so the right choice emerges only if the team surfaces its hidden information. The server measures that as it happens: how much unshared information reaches the table, and whether the team picks the best candidate.",
        points: [
          "Information pooling rate and decision accuracy, read from the live chat.",
          "The extractor is fail-soft, so it never blocks a participant's turn.",
        ],
        image: "/shots/information-card.png",
        visualLabel: "A candidate information card",
      },
      {
        title: "The whole study at a glance",
        body: "A researcher dashboard tracks every condition in one place: recruitment by cell against the target, completed sessions, average duration, and which approval gates are waiting. No querying the database mid-study to see where things stand.",
        points: [
          "Recruitment, completion, and pending gates across all five conditions in one view.",
          "Release a session's next stage right from the dashboard.",
        ],
        image: "/shots/dash-overview.png",
        visualLabel: "Researcher overview dashboard",
      },
      {
        title: "Read the discussion as it happens",
        body: "Full transcripts, ordered by sequence and filterable to humans or the AI, viewable live while a session runs. So the manipulation can be watched in real time and the whole log exported afterward.",
        points: [
          "Live, sequence-ordered transcripts per session.",
          "Filter to the AI's turns to audit exactly when and how Alex spoke.",
        ],
        image: "/shots/dash-chatlogs.png",
        visualLabel: "Live chat log viewer",
      },
    ],
  },
  technical: {
    top: "How it's built.",
    accent: "And why those choices.",
    body: "The defining idea is a separation of concerns: what the AI may say is frozen, when it speaks is code, and every model boundary is typed.",
    stack: [
      "TypeScript",
      "React 18",
      "Vite",
      "Tailwind",
      "shadcn/ui",
      "Node",
      "Express 5",
      "Socket.IO",
      "Zod",
      "MongoDB",
      "OpenAI Responses API",
      "Anthropic (prompt pipeline)",
      "Vercel",
    ],
    decisions: [
      {
        title: "Judgment is the model's, gating is the code's",
        body: "The prompt pipeline's Supervisor and the server's speak-gate are both deterministic TypeScript, not model calls. Pass, revise, or halt is pure logic reading one config, so it is predictable, testable, and reproducible. I reached this split independently in two subsystems.",
      },
      {
        title: "Evaluate with two blind calls, not one",
        body: "A Simulator writes a mock discussion without knowing it will be graded; a separate Evaluator then scores that transcript. Splitting generation from scoring prevents self-grading bias at the architecture level.",
      },
      {
        title: "LangGraph deferred on purpose",
        body: "The dependency is installed but not imported. The revision loop is a plain while loop because it is linear, with one back-edge and no parallelism. Tools chosen by need, not by hype.",
      },
      {
        title: "Model output is typed data",
        body: "Every live boundary (generation, judge, trait extraction) returns a Zod-validated structured output. Failures are explicit: a failed judge falls back to deterministic triggers, a failed extraction becomes a no-op.",
      },
    ],
    skills: [
      "Designing an AI as a controlled variable so a behavioral experiment stays valid",
      "A judge, gate, prompt-builder pattern for governed LLM turns",
      "A multi-agent prompt pipeline with typed deltas and an eval harness (LLM-as-a-judge, with self-grading-bias mitigation)",
      "Real-time correctness: atomic, deterministic message sequencing over Socket.IO",
      "Routing models by task, with a separate regression harness per route",
    ],
    learnings: [
      "Reaching the same judgment-versus-gating split in two different subsystems taught me it was a principle, not a coincidence.",
      "The SHA-256 tripwire on the frozen framework was heavier than the build stage needed. A workflow gate or a human approval step would have protected integrity with less friction.",
    ],
  },
  outcomes: {
    top: "Where it stands.",
    accent: "And what I took from it.",
    body: "HAIT is in pilot-prep. The dependent variables are measured live, but pilot result numbers are not in yet. The figures below describe the system, not its outcomes.",
    metrics: [
      { value: "5", label: "specialized agents in the prompt pipeline" },
      { value: "4", label: "orthogonal conditions in the 2×2, plus a control" },
      { value: "36", label: "golden outputs in the generation baseline" },
      { value: "2", label: "blind model calls per evaluation, to avoid self-grading" },
    ],
    notes: [
      "Built end to end for an HCDE master's thesis: the experimental design, the full-stack implementation, and the AI decision-quality layer.",
    ],
  },
  cta: {
    top: "Want the engineering detail?",
    accent: "The code and docs go deep.",
    body: "Two load-bearing docs split the system: one for the infrastructure, one for the AI decision layer.",
  },
  links: {
    repo: "https://github.com/sumin6475/hait",
    // demo + resume: add when available (see TODO at top of file)
  },
};
