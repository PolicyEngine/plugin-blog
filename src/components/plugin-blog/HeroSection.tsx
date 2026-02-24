import { AnimatedSection } from '../common/AnimatedSection';

export const HeroSection = () => (
  <header className="hero">
    <div className="container">
      <AnimatedSection>
        <span className="hero-label spaced-sans">Introducing</span>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <h1>The PolicyEngine Claude Code Plugin</h1>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <p className="hero-subtitle">Domain expertise through structured context, not training</p>
      </AnimatedSection>
      <AnimatedSection delay={0.35}>
        <div className="hero-intro">
          <p>
            PolicyEngine models tax and benefit policy for 50+ US state programs
            and multiple countries. Our ecosystem spans 40+ repositories,
            thousands of parameters, and a codebase where a single misread
            regulation can produce wrong numbers for millions of households.
          </p>
          <p>
            <em>
              This is the story of how we turned a general-purpose AI into a
              domain expert.
            </em>
          </p>
        </div>
      </AnimatedSection>
    </div>
  </header>
);
