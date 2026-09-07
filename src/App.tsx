import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SkillsOrbit } from './components/SkillsOrbit';
import { LanguageProvider } from './i18n';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[var(--color-ink)]">
        <Header />
        <main>
          <Hero />
          <Experience />
          <SkillsOrbit />
          <FeaturedProjects />
        </main>
        <Contact />
      </div>
    </LanguageProvider>
  );
}

export default App;
