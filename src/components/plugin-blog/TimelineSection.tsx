import type { ReactNode } from 'react';
import { AnimatedSection } from '../common/AnimatedSection';

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
      className={`pipeline-step${checkpoint ? ' pipeline-step--checkpoint' : ''}`}
    >
      {label}
    </span>
    <span className="pipeline-arrow">&rarr;</span>
  </>
);

/* ---------- inline data ---------- */

const ideas = [
  {
    title: 'Documentation Pointers, Not Stale Examples',
    paragraphs: [
      "Most knowledge bases rot. You write example code, the codebase evolves, and now your examples are wrong.",
      'We solved this by having skills point to live code in the active repository instead of hardcoding examples. When Claude reads a skill, it gets instructions like \u201clook at the current implementation in the relevant country model repo\u201d\u2014always fresh, always branch-aware, zero maintenance.',
    ],
  },
  {
    title: 'Legal Code Is the Source of Truth',
    paragraphs: [
      "When implementing a government benefit program, the temptation is to copy what another jurisdiction does and tweak it. Our agents are instructed differently: read the actual regulation first, understand what the law says, then implement exactly that. Pattern-matching across jurisdictions is a tool, not a shortcut.",
    ],
  },
  {
    title: 'Zero Hard-Coding',
    paragraphs: [
      'Every dollar amount, every threshold, every phase-out rate lives in a parameter file\u2014never as a magic number in code. This is what makes PolicyEngine work: you can simulate policy reforms by changing parameters alone. Our agents enforce this automatically.',
    ],
  },
  {
    title: 'Claude Policing Claude',
    paragraphs: [
      "We use Claude Code hooks\u2014prompts that run before or after tool calls\u2014to enforce architectural rules. When Claude writes a file, another Claude prompt checks whether tax logic ended up somewhere it shouldn\u2019t be. If it did, the write gets blocked.",
      "The same mechanism auto-detects which PolicyEngine repo you\u2019re in and routes you to the right specialized agents. Open Claude Code in any PolicyEngine repository and it knows which agents to load\u2014country models get the rules-engineer, the API repos get the api-reviewer, the frontend gets the app-reviewer.",
    ],
  },
];

const lessons = [
  {
    bold: 'Structure beats volume.',
    text: ' A well-organized 200-line skill file is worth more than a 2,000-line knowledge dump. Claude works best when knowledge is modular and clearly scoped.',
  },
  {
    bold: 'Agents need constraints, not just capabilities.',
    text: " The most impactful additions weren\u2019t new features\u2014they were guardrails. Regulatory checkpoints. Architecture enforcement. The rule that agents must read the law before writing code.",
  },
  {
    bold: 'Plugins are prompt engineering at scale.',
    text: " You\u2019re not training a model. You\u2019re building a structured context that makes a general-purpose model behave like a domain expert. That\u2019s powerful and accessible\u2014anyone can do it.",
  },
];

const researcherCapabilities = [
  {
    title: 'Population-Level Impact Analysis',
    paragraphs: [
      'The analysis-tools plugin turns Claude into a microsimulation analyst. Point it at any tax or benefit reform and it runs population-level analysis using PolicyEngine\u2019s weighted survey data\u2014covering income, demographics, and household structure for the entire US population.',
      'The result: cost estimates, revenue projections, and counts of who wins and who loses under a proposed change\u2014all generated from a plain-English description of a policy reform.',
    ],
  },
  {
    title: 'Distributional and Inequality Analysis',
    paragraphs: [
      'Beyond aggregate numbers, Claude breaks down impacts by income decile, calculates changes to the Gini coefficient, and measures effects on poverty rates. You get the full distributional picture\u2014who bears the cost and who receives the benefit\u2014without writing a single line of analysis code.',
    ],
  },
  {
    title: 'Congressional District Analysis',
    paragraphs: [
      'Using geographic microdata from HuggingFace datasets, Claude can map reform impacts to every congressional district. This turns abstract national estimates into localized numbers that matter for legislative strategy and constituent communication.',
    ],
  },
  {
    title: 'Dashboards and Visualizations',
    paragraphs: [
      'Claude doesn\u2019t just compute numbers\u2014it builds interactive tools. Streamlit dashboards, Plotly charts, and household calculators that let stakeholders explore reform scenarios themselves. The analysis becomes a shareable, interactive product.',
    ],
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
    date: 'Feb 2025',
    title: 'Claude Code first release \u2014 we start using it',
    body: (
      <>
        <p>
          Anthropic releases Claude Code, a CLI coding agent. We adopt it
          immediately and discover it&rsquo;s remarkably useful for
          research&mdash;like having the Claude web chat but right in your
          terminal. We stop switching to the browser and start doing everything
          from the command line.
        </p>
        <p>
          For coding, the early wins are the repetitive tasks nobody wants to
          do by hand: renaming files, updating import paths, bulk reformatting.
          Claude handles them instantly. It&rsquo;s not writing policy logic
          yet&mdash;but it&rsquo;s already saving hours a week.
        </p>
      </>
    ),
  },
  {
    date: 'May 2025',
    title: 'Claude Code launches with plugin support',
    body: (
      <>
        <p>
          Anthropic adds an open plugin architecture to Claude Code. Plugins
          let you package domain knowledge, custom agents, and automated
          workflows into something Claude loads at runtime. No fine-tuning, no
          training data.
        </p>
        <p>
          We see the potential immediately. PolicyEngine models tax and benefit
          policy across 40+ repositories, thousands of parameters, and dozens
          of government programs. Every implementation has to match real
          legislation. We need an AI that can navigate all of it.
        </p>
      </>
    ),
  },
  {
    date: 'Aug 2025',
    title: 'First experiments \u2014 and first failures',
    body: (
      <>
        <p>
          We point Claude at our codebase and start asking it to implement
          government programs. The results are rough. It hardcodes dollar
          amounts that should live in parameter files. It mixes up federal and
          state logic. It skips regulatory sources and guesses at eligibility
          rules.
        </p>
        <p>
          A typical failure: Claude implements a state TANF program by copying
          patterns from another state, changing a few numbers, and calling it
          done. The code compiles, the tests pass&mdash;but the income
          thresholds are wrong because it never read the actual state
          regulation.
        </p>
        <p>
          The model is capable. The problem is context. Claude doesn&rsquo;t
          know how PolicyEngine is structured, what our conventions are, or
          that the law is the source of truth&mdash;not existing code.
        </p>
      </>
    ),
  },
  {
    date: 'Oct 2025',
    title: 'Skills and agents take shape',
    body: (
      <>
        <p>
          We start writing <strong>skill files</strong>&mdash;structured
          documents Claude reads at runtime. Variable naming conventions.
          Parameter file structures. How PolicyEngine&rsquo;s tax-benefit
          logic is organized. How to properly use <code>adds</code> and{' '}
          <code>subtracts</code> annotations. Which patterns to follow and
          which to avoid.
        </p>
        <p>
          Then come <strong>specialized agents</strong>. A{' '}
          <code>rules-engineer</code> that knows how to implement tax
          variables&mdash;it reads the regulation, creates parameter files
          with proper metadata, and writes vectorized formulas. A{' '}
          <code>test-creator</code> that builds integration tests from real
          household scenarios. A <code>document-collector</code> that
          researches government regulations and extracts the specific
          provisions needed before anyone writes a line of code.
        </p>
        <p>
          The difference is immediate. Claude stops guessing. It reads the
          skill file, understands the convention, and follows the pattern.
          Error rates on parameter structure drop to near zero.
        </p>
      </>
    ),
  },
  {
    date: 'Dec 2025',
    title: 'Orchestrated commands chain it all together',
    body: (
      <>
        <p>
          Individual agents are useful, but the real power comes from chaining
          them. We build <strong>orchestrated commands</strong>&mdash;multi-agent
          pipelines that run end-to-end workflows.{' '}
          <code>/encode-policy</code> is the flagship: it takes a government
          program from legal text to working, tested code.
        </p>
        <p>
          We also build <code>/review-pr</code> for automated code review,{' '}
          <code>/fix-pr</code> to resolve CI failures, and{' '}
          <code>/audit-state-tax</code> for tax implementation audits. Each
          command encodes a workflow our team runs daily&mdash;now automated
          with guardrails built in.
        </p>
      </>
    ),
  },
  {
    date: 'Feb 2026',
    title: 'A new level',
    body: (
      <>
        <p>
          Opus 4.6 launched with agent teams&mdash;multiple agents
          collaborating in parallel within a single session. With{' '}
          <code>/encode-policy</code> already working well, agent teams
          unlocked workflows that weren&rsquo;t feasible before. The biggest:
          backdating historical policy.
        </p>
        <p>
          Agent teams solved this by splitting the work: a discovery agent
          finds historical PDFs, prep agents download and render them, and
          multiple research agents read different documents in
          parallel&mdash;communicating directly with each other, not through
          a central coordinator. This made <code>/backdate-policy</code>{' '}
          possible and dramatically expanded what a single session could
          accomplish.
        </p>
      </>
    ),
  },
  {
    date: 'Today',
    title: 'Still building',
    body: (
      <p>
        These numbers keep growing. We&rsquo;re still building new skills,
        agents, and commands every week&mdash;and not just for coding
        policy. New workflows cover writing policy analysis, building
        interactive dashboards, and generating content. The plugin is
        expanding beyond implementation into every part of how we work.
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
                  {i < milestones.length - 1 && <div className="timeline-line" />}
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
            <h2>What We Built</h2>
          </AnimatedSection>
        </div>

        {/* pipeline */}
        <div className="container--wide">
          <AnimatedSection>
            <div className="pipeline-block">
              <p className="pipeline-intro">
                Our most complex workflow chains 6+ agents across
                8 phases&mdash;from reading the law to pushing a validated PR.{' '}
                <a
                  href="https://www.policyengine.org/us/encode-policy-multi-agent-ai"
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

      {/* ===== WHAT RESEARCHERS CAN DO ===== */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <h2>What Researchers Can Do</h2>
            <p className="section-lead">
              Beyond building the plugin, we focused on what policy researchers
              actually need from an AI assistant. See our{' '}
              <a
                href="https://www.policyengine.org/us/encode-policy-multi-agent-ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                multi-agent AI workflow post
              </a>{' '}
              for a deep dive into how these capabilities work in practice.
            </p>
          </AnimatedSection>

          {researcherCapabilities.map((cap) => (
            <AnimatedSection key={cap.title} className="idea-block">
              <h3 className="spaced-sans">{cap.title}</h3>
              {cap.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ===== IDEAS + LESSONS ===== */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <h2>The Ideas That Made It Work</h2>
          </AnimatedSection>

          {ideas.map((idea) => (
            <AnimatedSection key={idea.title} className="idea-block">
              <h3 className="spaced-sans">{idea.title}</h3>
              {idea.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </AnimatedSection>
          ))}

          <AnimatedSection>
            <h2 style={{ marginTop: 48 }}>What We Learned</h2>
          </AnimatedSection>

          {lessons.map((l) => (
            <AnimatedSection key={l.bold} className="lesson">
              <p>
                <strong>{l.bold}</strong>
                {l.text}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section section--no-border">
        <div className="container">
          <AnimatedSection>
            <h2>Try it yourself</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
              We built this for ourselves and we&rsquo;re making it public.
              See what the plugin can do, or explore the source code.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://policyengine.org/us/claude-plugins"
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
