import './PluginBlog.css';
import { HeroSection } from '../components/plugin-blog/HeroSection';
import { TimelineSection } from '../components/plugin-blog/TimelineSection';

export const PluginBlog = () => (
  <div className="pb">
    <HeroSection />
    <TimelineSection />
    <footer className="footer">PolicyEngine &middot; Open Source</footer>
  </div>
);
