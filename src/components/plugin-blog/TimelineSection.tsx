import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { AnimatedSection } from '../common/AnimatedSection';

/* eslint-disable @typescript-eslint/no-explicit-any */
type YTPlayer = any;

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

const stats = [
  { number: '39', label: 'Skills across\n7 categories' },
  { number: '30', label: 'Specialized\nagents' },
  { number: '8', label: 'Orchestrated\ncommands' },
  { number: '3', label: 'Hook types for\nenforcement' },
  { number: '7', label: 'Plugin\nbundles' },
];

interface EcoLayer {
  layer: string;
  repos: string;
  bundle: string;
  agents: string;
  commands: string[];
}

const layers: EcoLayer[] = [
  {
    layer: 'Country Models',
    repos: 'us, uk, canada, il, ng + 4 more',
    bundle: 'country-models',
    agents: 'rules-engineer, test-creator, document-collector + 13 more',
    commands: ['/encode-policy', '/review-pr', '/fix-pr', '/create-pr'],
  },
  {
    layer: 'API',
    repos: 'api, api-v2, household-api',
    bundle: 'api-development',
    agents: 'api-reviewer',
    commands: ['/review-pr', '/fix-pr', '/create-pr'],
  },
  {
    layer: 'Frontend',
    repos: 'app, app-v2, calculators',
    bundle: 'app-development',
    agents: 'app-reviewer, 4 SEO checkers',
    commands: ['/new-tool', '/audit-seo', '/review-pr'],
  },
  {
    layer: 'Data Science',
    repos: 'microdf, microimpute, microcalibrate, us-data, uk-data',
    bundle: 'data-science',
    agents: '\u2014',
    commands: [],
  },
  {
    layer: 'Analysis',
    repos: 'crfb-tob-impacts, newsletters, dashboards',
    bundle: 'analysis-tools',
    agents: '\u2014',
    commands: [],
  },
  {
    layer: 'Content',
    repos: 'marketing, social',
    bundle: 'content',
    agents: 'content-orchestrator, neutrality-reviewer',
    commands: ['/generate-content'],
  },
];

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

/* ---------- milestone definitions ---------- */

interface Milestone {
  date?: string;
  title: string;
  body: ReactNode;
}

const milestones: Milestone[] = [
  /* 1 — Feb 2025 */
  {
    date: 'Feb 2025',
    title: 'Claude Code first release — we start using it',
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
  /* 2 — May 2025 */
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
  /* 3 — Aug 2025 */
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
  /* 4 — Oct 2025 */
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
  /* 5 — Dec 2025 */
  {
    date: 'Dec 2025',
    title: 'Orchestrated commands chain it all together',
    body: (
      <>
        <p>
          Individual agents are useful, but the real power comes from chaining
          them. We build <strong>orchestrated commands</strong>&mdash;multi-agent
          pipelines that run end-to-end workflows.
        </p>
        <p>
          <code>/encode-policy</code> is the flagship: it takes a government
          program from legal text to working, tested code. The pipeline sets
          up an issue and PR, collects regulatory documents, hits a checkpoint
          for human review, then fans out to create parameters, tests, and
          variables in parallel. After that: organization checks, test-and-fix
          loops, formatting, and a final regulatory review against the source
          law.
        </p>
        <p>
          We also build <code>/review-pr</code> for automated code review,{' '}
          <code>/fix-pr</code> to resolve CI failures, and{' '}
          <code>/create-pr</code> for routine pull requests. Each command
          encodes a workflow our team runs daily&mdash;now automated with
          guardrails built in.
        </p>

        {/* pipeline diagram */}
        <div className="timeline-dark-block">
          <div className="pipeline-intro">
            Our most complex workflow chains 6+ agents across
            8 phases&mdash;from reading the law to pushing a validated PR.{' '}
            <a
              href="https://www.policyengine.org/us/encode-policy-multi-agent-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the full blog post &rarr;
            </a>
          </div>
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
      </>
    ),
  },
  /* 6 — Feb 2026 */
  {
    date: 'Feb 2026',
    title: 'A new level',
    body: (
      <>
        <p>
          Opus 4.6 launched with agent teams&mdash;multiple agents
          collaborating in parallel within a single session. This changed
          what&rsquo;s possible. With <code>/encode-policy</code> already
          working well, agent teams let us tackle the problems that remained:
          large PDFs that exceeded context windows, and complex programs that
          needed simultaneous research from multiple regulatory sources.
        </p>
        <p>
          Now one agent reads the PDF while another researches comparable
          programs. A third starts scaffolding parameters before the first is
          even done reading. Speed increased dramatically&mdash;and the PDF
          limitations that had blocked us were finally overcome.
        </p>

        {/* 3-command cards */}
        <div className="timeline-dark-block">
          <div className="accel-commands">
            <div className="accel-card accel-card--wip">
              <div className="accel-timeframe spaced-sans">The Past</div>
              <h3>
                <code>/backdate-policy</code>
              </h3>
              <p>
                Codes historical versions of a program, enabling retroactive
                analysis.
              </p>
              <span className="accel-badge spaced-sans">In development</span>
            </div>
            <div className="accel-card">
              <div className="accel-timeframe spaced-sans">The Present</div>
              <h3>
                <code>/encode-policy</code>
              </h3>
              <p>
                Codes a government program as it exists today&mdash;from legal
                text to working, tested code.
              </p>
            </div>
            <div className="accel-card accel-card--wip">
              <div className="accel-timeframe spaced-sans">The Future</div>
              <h3>
                <code>/reform-policy</code>
              </h3>
              <p>
                Codes proposed policy changes and what-if scenarios before
                they&rsquo;re enacted.
              </p>
              <span className="accel-badge spaced-sans">In development</span>
            </div>
          </div>
        </div>

        <p>
          The plugin went from a productivity tool to a full development
          platform&mdash;covering past, present, and future policy.
        </p>

        {/* video intro */}
        <p style={{ color: 'var(--text-secondary)', marginTop: 24 }}>
          Watch a walkthrough of how we built the plugin and see it in action
          encoding a real government program.
        </p>

        {/* YouTube embed — rendered by the component's useEffect */}
        <div className="timeline-embed">
          <div className="video-wrapper">
            <div id="yt-player-container" />
          </div>
          <p className="video-note" style={{ margin: '20px 0 0', padding: 0 }}>
            Clip starts at 9:35 and ends at 18:45.{' '}
            <a
              href="https://www.youtube.com/watch?v=Ke_J3pOdL8k"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch the full video on YouTube &rarr;
            </a>
          </p>
        </div>
      </>
    ),
  },
  /* 7 — Today */
  {
    date: 'Today',
    title: 'What it looks like now — and what\u2019s next',
    body: (
      <>
        <p>
          These numbers keep growing. We&rsquo;re still building new skills,
          agents, and commands every week&mdash;and not just for coding
          policy. New workflows cover writing policy analysis, building
          interactive dashboards, and generating content. The plugin is
          expanding beyond implementation into every part of how we work.
        </p>
        {/* stats grid */}
        <div className="timeline-embed">
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-item" key={s.label}>
                <div className="stat-number">{s.number}</div>
                <div
                  className="stat-label"
                  dangerouslySetInnerHTML={{
                    __html: s.label.replace('\n', '<br/>'),
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ecosystem table */}
        <p style={{ marginTop: 32, color: 'var(--text-secondary)' }}>
          The plugin adapts to whichever repository you open. Each layer of
          the PolicyEngine ecosystem has its own plugin bundle, agents, and
          commands.
        </p>
        <div className="timeline-embed">
          <div className="ecosystem-grid">
            <div className="eco-row eco-row--header">
              <div className="eco-cell">Layer</div>
              <div className="eco-cell">Repos</div>
              <div className="eco-cell">Plugin Bundle</div>
              <div className="eco-cell">Key Agents</div>
              <div className="eco-cell">Key Commands</div>
            </div>
            {layers.map((row) => (
              <div className="eco-row" key={row.layer}>
                <div className="eco-cell eco-layer">{row.layer}</div>
                <div className="eco-cell">
                  <span className="eco-repos">{row.repos}</span>
                </div>
                <div className="eco-cell">
                  <code>{row.bundle}</code>
                </div>
                <div className="eco-cell">
                  {row.agents === '\u2014' ? (
                    <span className="eco-muted">{row.agents}</span>
                  ) : (
                    row.agents
                  )}
                </div>
                <div className="eco-cell">
                  {row.commands.length === 0 ? (
                    <span className="eco-muted">&mdash;</span>
                  ) : (
                    row.commands.map((cmd) => (
                      <div key={cmd}><code>{cmd}</code></div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  },
  /* 8 — no date */
  {
    title: 'The ideas that made it work',
    body: (
      <>
        {ideas.map((idea) => (
          <div className="idea-block" key={idea.title}>
            <h3 className="spaced-sans">{idea.title}</h3>
            {idea.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ))}

        <h3
          style={{
            fontFamily: "'Roboto Serif', serif",
            fontSize: '1.15rem',
            color: 'var(--dark)',
            marginTop: 40,
            marginBottom: 16,
          }}
        >
          What we learned
        </h3>
        {lessons.map((l) => (
          <div className="lesson" key={l.bold}>
            <p>
              <strong>{l.bold}</strong>
              {l.text}
            </p>
          </div>
        ))}
      </>
    ),
  },
  /* 9 — no date */
  {
    title: 'Open source',
    body: (
      <div className="cta-content" style={{ textAlign: 'center' }}>
        <p>
          We built this for ourselves and we&rsquo;re still actively
          developing it. Now we&rsquo;re making it public. If your team has
          domain knowledge scattered across docs, wikis, and tribal memory,
          a Claude Code plugin can consolidate it into something an AI agent
          actually uses. Start with a few skills, add agents for your key
          workflows, and let hooks enforce your rules.
        </p>
        <a
          href="https://github.com/PolicyEngine/policyengine-claude"
          className="cta-button"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 16 }}
        >
          View on GitHub
        </a>
      </div>
    ),
  },
];

/* ---------- component ---------- */

export const TimelineSection = () => {
  const playerRef = useRef<YTPlayer>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* YouTube player setup */
  useEffect(() => {
    const w = window as any;

    const loadAPI = () => {
      if (w.YT && w.YT.Player) {
        createPlayer();
        return;
      }

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);

      w.onYouTubeIframeAPIReady = createPlayer;
    };

    const createPlayer = () => {
      const el = document.getElementById('yt-player-container');
      if (!el || playerRef.current) return;
      containerRef.current = el as HTMLDivElement;

      playerRef.current = new w.YT.Player(el, {
        width: '100%',
        height: '100%',
        videoId: 'Ke_J3pOdL8k',
        playerVars: { start: 575, rel: 0 },
        events: {
          onStateChange: (e: any) => {
            if (e.data === w.YT.PlayerState.PLAYING) pollEnd();
          },
        },
      });
    };

    const pollEnd = () => {
      if (!playerRef.current || !playerRef.current.getCurrentTime) return;
      if (playerRef.current.getCurrentTime() >= 1125) {
        playerRef.current.pauseVideo();
        return;
      }
      requestAnimationFrame(pollEnd);
    };

    loadAPI();

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
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
                {m.date && (
                  <span className="timeline-date spaced-sans">{m.date}</span>
                )}
                <h3>{m.title}</h3>
                {m.body}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
