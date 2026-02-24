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
    commands: ['/encode-policy', '/review-pr', '/fix-pr', '/audit-state-tax'],
  },
  {
    layer: 'API',
    repos: 'api, api-v2, household-api',
    bundle: 'api-development',
    agents: 'api-reviewer',
    commands: ['/review-pr', '/fix-pr', '/audit-state-tax'],
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
  const playerRef = useRef<YTPlayer>(null);

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

      {/* ===== WHAT WE BUILT (pipeline + stats + ecosystem) ===== */}
      <section className="section section--light">
        <div className="container">
          <AnimatedSection>
            <h2>What We Built</h2>
          </AnimatedSection>
        </div>

        {/* stats */}
        <div className="container--wide">
          <AnimatedSection>
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

        {/* command cards */}
        <div className="container">
          <AnimatedSection>
            <div className="accel-commands">
              <div className="accel-card accel-card--wip">
                <div className="accel-timeframe spaced-sans">The Past</div>
                <h3><code>/backdate-policy</code></h3>
                <p>
                  Codes historical versions of a program, enabling retroactive
                  analysis.
                </p>
                <span className="accel-badge spaced-sans">In development</span>
              </div>
              <div className="accel-card">
                <div className="accel-timeframe spaced-sans">The Present</div>
                <h3><code>/encode-policy</code></h3>
                <p>
                  Codes a government program as it exists today&mdash;from legal
                  text to working, tested code.
                </p>
              </div>
              <div className="accel-card accel-card--wip">
                <div className="accel-timeframe spaced-sans">The Future</div>
                <h3><code>/reform-policy</code></h3>
                <p>
                  Codes proposed policy changes and what-if scenarios before
                  they&rsquo;re enacted.
                </p>
                <span className="accel-badge spaced-sans">In development</span>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* ecosystem */}
        <div className="container">
          <AnimatedSection>
            <p className="ecosystem-intro">
              The plugin adapts to whichever repository you open. Each layer of
              the PolicyEngine ecosystem has its own plugin bundle, agents, and
              commands.
            </p>
          </AnimatedSection>
        </div>
        <div className="container--full">
          <AnimatedSection>
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
          </AnimatedSection>
        </div>
      </section>

      {/* ===== VIDEO ===== */}
      <section className="section section--gray">
        <AnimatedSection>
          <div className="container">
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Watch a walkthrough of how we built the plugin and see it in action
              encoding a real government program.
            </p>
          </div>
        </AnimatedSection>
        <div className="container--wide">
          <AnimatedSection>
            <div className="video-wrapper">
              <div id="yt-player-container" />
            </div>
          </AnimatedSection>
          <p className="video-note">
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

      {/* ===== CTA + SETUP ===== */}
      <section className="section section--no-border">
        <div className="container">
          <AnimatedSection>
            <h2>Open source &mdash; try it now</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
              We built this for ourselves and we&rsquo;re still actively
              developing it. Now we&rsquo;re making it public. If your team has
              domain knowledge scattered across docs, wikis, and tribal memory,
              a Claude Code plugin can consolidate it into something an AI agent
              actually uses.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="setup-steps">
              <h4 className="spaced-sans" style={{ color: 'var(--teal)', marginBottom: 16 }}>
                Get started in 3 steps
              </h4>
              <div className="setup-step">
                <span className="setup-number">1</span>
                <div>
                  <strong>Install Claude Code</strong>
                  <p><code>npm install -g @anthropic-ai/claude-code</code></p>
                </div>
              </div>
              <div className="setup-step">
                <span className="setup-number">2</span>
                <div>
                  <strong>Add the plugin</strong>
                  <p><code>claude plugins add PolicyEngine/policyengine-claude</code></p>
                </div>
              </div>
              <div className="setup-step">
                <span className="setup-number">3</span>
                <div>
                  <strong>Open any PolicyEngine repo and start working</strong>
                  <p>
                    The plugin auto-detects which repository you&rsquo;re in and
                    loads the right skills, agents, and commands.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
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
