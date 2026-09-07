import arrow from '../assets/icons/arrow.svg';
import underline from '../assets/icons/underline.svg';
import { hero } from '../content';
import { useTypewriter } from '../hooks/useTypewriter';
import { useLanguage } from '../i18n';
import { GlowField } from './GlowField';
import { Reveal } from './Reveal';

export function Hero() {
  const { t } = useLanguage();

  const greetingPrefix = t(hero.greetingPrefix);
  const name = t(hero.name);
  const tagline = t(hero.tagline);
  const headlineBefore = t(hero.headlineBefore);
  const headlineHighlightLead = t(hero.headlineHighlightLead);
  const headlineHighlight = t(hero.headlineHighlight);
  const headlineSuffix = t(hero.headlineSuffix);
  const subtext = t(hero.subtext);
  const typewriterText = t(hero.typewriterText);
  const currentRoleLead = t(hero.currentRoleLead);
  const currentCompany = t(hero.currentCompany);
  const bio = t(hero.bio);

  const typed = useTypewriter(typewriterText);
  const hasHeadline = headlineBefore || headlineHighlight;
  const hasGreeting = greetingPrefix || name;

  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-28 md:pt-48 lg:pt-56">
      <GlowField
        glows={[
          { top: '2%', left: '18%', size: '420px', color: '#7127ba', opacity: 0.35, animate: true },
          { top: '28%', right: '10%', size: '380px', color: '#5a2ea8', opacity: 0.28 },
        ]}
      />

      <div className="relative mx-auto max-w-4xl px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-8">
          {/* Avatar + speech-bubble intro */}
          <Reveal className="relative w-[130px] shrink-0 md:w-[150px]">
            {hasGreeting && (
              <div className="absolute -top-16 start-1/2 flex w-[260px] max-w-[80vw] -translate-x-1/2 flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-heading text-sm text-white/90 rtl:translate-x-1/2 md:-top-24 md:start-0 md:w-[320px] md:max-w-none md:translate-x-0 md:justify-start md:rtl:translate-x-0 md:text-start lg:-top-20 lg:w-[300px]">
                <span>{greetingPrefix}</span>
                <span className="text-lg font-bold text-white md:text-lg lg:text-xl">{name}</span>
              </div>
            )}

            <img
              src={arrow}
              alt=""
              className="absolute -top-4 left-5 hidden w-7 opacity-80 md:block rtl:right-5 rtl:left-auto rtl:-scale-x-100"
            />

            <div
              className="absolute inset-0 -z-10 rounded-full blur-2xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(120,64,173,0.45) 0%, rgba(48,16,128,0.2) 55%, transparent 75%)',
              }}
            />
            <div className="size-[130px] md:size-[150px]">
              {hero.avatarImage && <img src={hero.avatarImage} alt="" className="size-full object-contain" />}
            </div>
          </Reveal>

          {/* Headline */}
          {(hasHeadline || tagline || subtext) && (
            <Reveal delay={80} className="text-center md:text-start">
              {tagline && (
                <p className="relative top-2 mb-1 font-heading text-sm tracking-wide text-white underline decoration-white/70 underline-offset-4 md:text-base">
                  {tagline}
                </p>
              )}
              {hasHeadline && (
                <h1 className="relative inline-block font-heading text-3xl leading-tight text-white sm:text-4xl md:text-[2.75rem]">
                  {headlineBefore}
                  {headlineBefore && (headlineHighlightLead || headlineHighlight) && <br />}
                  {headlineHighlightLead}
                  {headlineHighlight && (
                    <span className="relative text-[var(--color-accent)]">
                      {headlineHighlight}
                      <img
                        src={underline}
                        alt=""
                        className="pointer-events-none absolute -bottom-1 left-1/2 w-[130%] max-w-none -translate-x-1/2"
                      />
                    </span>
                  )}
                  {headlineSuffix}
                </h1>
              )}
              {subtext && (
                <p className="mx-auto mt-6 max-w-xs font-heading text-xs tracking-wide text-white/70 md:mx-0">
                  {subtext}
                </p>
              )}
            </Reveal>
          )}
        </div>

        {/* Typewriter role */}
        {(typewriterText || currentRoleLead) && (
          <Reveal delay={160} className="mt-14 text-center md:mt-20 md:text-start">
            {typewriterText && (
              <h2 className="font-heading text-3xl text-white sm:text-4xl md:text-5xl">
                {typed}
                <span className="animate-[blink-caret_1s_step-start_infinite] font-normal">|</span>
              </h2>
            )}
            {currentRoleLead && (
              <p className="mt-3 font-heading text-sm text-white/80 md:text-base">
                {currentRoleLead}{' '}
                {currentCompany && (
                  <a
                    href={hero.currentCompanyHref || undefined}
                    className="font-semibold text-[var(--color-fb-blue)] hover:underline"
                  >
                    {currentCompany}
                  </a>
                )}
              </p>
            )}
          </Reveal>
        )}

        {/* Bio */}
        {bio && (
          <Reveal delay={240} className="mt-10 text-center md:text-start">
            <p className="mx-auto max-w-3xl font-heading text-lg leading-relaxed text-white/90 md:mx-0 md:text-xl">
              {bio}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
