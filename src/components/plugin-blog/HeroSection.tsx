import { AnimatedSection } from '../common/AnimatedSection';

export const HeroSection = () => (
  <header className="hero">
    <div className="container">
      <AnimatedSection>
        <span className="hero-label spaced-sans">Introducing</span>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <h1>How We Built AI-Powered Policy Analysis</h1>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <p className="hero-subtitle">The story of turning a general-purpose AI into a policy expert</p>
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
          <p>
            <a
              href="https://policyengine.org/us/claude-plugins"
              style={{ textDecoration: 'underline', fontWeight: 500 }}
            >
              See how you can use what we built &rarr;
            </a>
          </p>
        </div>
      </AnimatedSection>
    </div>
  </header>
);
