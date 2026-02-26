import type { ReactNode } from "react";
import { AnimatedSection } from "../common/AnimatedSection";

/* ---------- sub-components ---------- */

const PipelineStep = ({
  label,
  checkpoint,
}: {
  label: string;
  checkpoint?: boolean;
}) => (
  <>
    <span
      className={`pipeline-step${checkpoint ? " pipeline-step--checkpoint" : ""}`}
    >
      {label}
    </span>
    <span className="pipeline-arrow">&rarr;</span>
  </>
);

/* ---------- inline data ---------- */

const takeaways = [
  {
    bold: "Point to live code, not stale examples.",
    text: " Skills reference the active repo instead of hardcoding examples\u2014always fresh, zero maintenance.",
  },
  {
    bold: "The law is the source of truth.",
    text: " Agents read the actual regulation first, not patterns from other jurisdictions.",
  },
  {
    bold: "Zero hard-coding.",
    text: " Every dollar amount and threshold lives in a parameter file\u2014agents enforce this automatically.",
  },
  {
    bold: "Claude policing Claude.",
    text: " Hooks check every file write against architectural rules and block violations.",
  },
  {
    bold: "Structure beats volume.",
    text: " A 200-line skill file outperforms a 2,000-line knowledge dump.",
  },
  {
    bold: "Plugins are prompt engineering at scale.",
    text: " You\u2019re building structured context, not training a model.",
  },
];

/* ---------- timeline milestones (text only) ---------- */

interface Milestone {
  date: string;
  title: string;
  body: ReactNode;
}

const milestones: Milestone[] = [
  {
    date: "Feb 2025",
    title: "Claude Code first release \u2014 we start using it",
    body: (
      <>
        <p>
          Anthropic releases Claude Code, a CLI coding agent. We adopt it
          immediately and discover it&rsquo;s remarkably useful for
          research&mdash;having the Claude web chat but right in your terminal.
          We slowly migrate to the command line from the browser.
        </p>
        <p>
          For coding, the early wins are the repetitive tasks: renaming files,
          updating import paths, bulk reformatting. Claude handles them
          instantly. It&rsquo;s not writing policy logic yet&mdash;but
          it&rsquo;s already saving hours a week.
        </p>
      </>
    ),
  },
  {
    date: "Apr 2025",
    title: "First experiments \u2014 and first failures",
    body: (
      <>
        <p>
          We point Claude at our codebase and start asking it to implement
          government programs. The results are mixed. It hardcodes dollar
          amounts that should live in parameter files. It mixes up federal and
          state logic. It skips regulatory sources and guesses at eligibility
          rules.
        </p>
        <p>
          A typical failure: Claude implements a state TANF program by copying
          patterns from another state, changing a few numbers, and calling it
          done. The code compiles, the tests pass&mdash;but the income
          thresholds are wrong because it never read the primary sources.
        </p>
        <p>
          The model is capable. The problem is context. Claude doesn&rsquo;t
          know how PolicyEngine is structured, what our conventions are, or that
          the law is the source of truth.
        </p>
      </>
    ),
  },
  {
    date: "Aug 2025",
    title: "Skills and agents take shape",
    body: (
      <>
        <p>
          We start writing <strong>skill files</strong>&mdash;structured
          documents Claude reads at runtime. Variable naming conventions.
          Parameter file structures. How PolicyEngine&rsquo;s tax-benefit logic
          is organized. How to properly use <code>adds</code> and{" "}
          <code>subtracts</code> annotations. Which patterns to follow and which
          to avoid.
        </p>
        <p>
          Then come <strong>specialized agents</strong>. A{" "}
          <code>rules-engineer</code> that knows how to implement tax
          variables&mdash;it reads the regulation, creates parameter files with
          proper metadata, and writes vectorized formulas. A{" "}
          <code>test-creator</code> that builds integration tests from real
          household scenarios. A <code>document-collector</code> that researches
          government regulations and extracts the specific provisions needed
          before anyone writes a line of code.
        </p>
        <p>
          The difference is immediate. Claude stops guessing. It reads the skill
          file, understands the convention, and follows the pattern. Error rates
          on parameter structure drop dramatically.
        </p>
      </>
    ),
  },
  {
    date: "Oct 2025",
    title: "Claude Code launches with plugin support",
    body: (
      <>
        <p>
          Anthropic adds an open plugin architecture to Claude Code. Plugins let
          you package domain knowledge, custom agents, and automated workflows
          into something Claude loads at runtime. No fine-tuning, no training
          data.
        </p>
        <p>
          This changes everything. The skills and agents we&rsquo;ve been
          building since August can now be packaged as a proper
          plugin&mdash;portable, versioned, and shareable. We consolidate our
          scattered skill files into a single plugin that loads automatically in
          any PolicyEngine repository.
        </p>
      </>
    ),
  },
  {
    date: "Dec 2025",
    title: "Orchestrated commands chain it all together",
    body: (
      <>
        <p>
          Individual agents are useful, but the real power comes from chaining
          them. We build <strong>orchestrated commands</strong>
          &mdash;multi-agent pipelines that run end-to-end workflows.{" "}
          <code>/encode-policy</code> is the flagship: it takes a government
          program from legal text to working, tested code.
        </p>
        <p>
          We also build <code>/review-pr</code> for automated code review,{" "}
          <code>/fix-pr</code> to resolve CI failures, and{" "}
          <code>/audit-state-tax</code> for tax implementation audits. Each
          command encodes a workflow our team runs daily&mdash;now automated
          with guardrails built in.
        </p>
      </>
    ),
  },
  {
    date: "Feb 2026",
    title: "Agent teams unlock parallel research",
    body: (
      <>
        <p>
          Opus 4.6 launched with agent teams&mdash;multiple agents collaborating
          in parallel within a single session. With <code>/encode-policy</code>{" "}
          already working well, agent teams unlocked workflows that
          weren&rsquo;t feasible before. The biggest: backdating historical
          policy.
        </p>
        <p>
          Agent teams solved this by splitting the work: a discovery agent finds
          historical PDFs, prep agents download and render them, and multiple
          research agents read different documents in
          parallel&mdash;communicating directly with each other, not through a
          central coordinator. This made <code>/backdate-policy</code> possible
          and dramatically expanded what a single session could accomplish.
        </p>
      </>
    ),
  },
  {
    date: "Today",
    title: "Still building",
    body: (
      <p>
        We&rsquo;re still building new skills, agents, and commands every
        week&mdash;and not just for coding policy. New workflows cover writing
        policy analysis, building interactive dashboards, and generating
        content. The plugin is expanding beyond implementation into every part
        of how we work.
      </p>
    ),
  },
];

/* ---------- component ---------- */

export const TimelineSection = () => {
  return (
    <>
      {/* ===== TIMELINE (text only) ===== */}
      <section className="section section--no-border">
        <div className="container">
          <AnimatedSection>
            <h2>The Story</h2>
          </AnimatedSection>

          <div className="timeline">
            {milestones.map((m, i) => (
              <AnimatedSection
                key={m.title}
                className="timeline-item"
                delay={i * 0.05}
              >
                <div className="timeline-marker">
                  <div className="timeline-dot" />
                  {i < milestones.length - 1 && (
                    <div className="timeline-line" />
                  )}
                </div>
                <div className="timeline-content">
                  <span className="timeline-date spaced-sans">{m.date}</span>
                  <h3>{m.title}</h3>
                  {m.body}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE BUILT (pipeline only) ===== */}
      <section className="section section--light">
        <div className="container">
          <AnimatedSection>
            <h2>The Pipeline</h2>
          </AnimatedSection>
        </div>

        {/* pipeline */}
        <div className="container--wide">
          <AnimatedSection>
            <div className="pipeline-block">
              <p className="pipeline-intro">
                Our most complex workflow chains 6+ agents across 8
                phases&mdash;from reading the law to pushing a validated PR.{" "}
                <a
                  href="https://www.policyengine.org/us/research/encode-policy-multi-agent-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the full blog post &rarr;
                </a>
              </p>
              <div className="pipeline-label spaced-sans">
                /encode-policy pipeline
              </div>
              <div className="pipeline">
                <PipelineStep label="1. Issue & PR setup" />
                <PipelineStep label="2. Document collection" />
                <PipelineStep label="Checkpoint" checkpoint />
                <PipelineStep label="3. Parameters → Tests + Variables ∥" />
                <PipelineStep label="Checkpoint" checkpoint />
                <PipelineStep label="4. Organization check" />
                <PipelineStep label="5. Test & fix" />
                <PipelineStep label="6. Format & push" />
                <PipelineStep label="7. Regulatory review" />
                <PipelineStep label="Checkpoint" checkpoint />
                <span className="pipeline-step">8. Final summary</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== TAKEAWAYS ===== */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <h2>What Made It Work</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="takeaway-grid">
              {takeaways.map((t) => (
                <div key={t.bold} className="takeaway-card">
                  <strong>{t.bold}</strong>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section section--no-border">
        <div className="container">
          <AnimatedSection>
            <h2>Try it yourself</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
              We built this for ourselves and we&rsquo;re making it public. See
              what the plugin can do, or explore the source code.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://policyengine.org/us/claude-plugin"
                className="cta-button"
              >
                See what it can do
              </a>
              <a
                href="https://github.com/PolicyEngine/policyengine-claude"
                className="cta-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};
