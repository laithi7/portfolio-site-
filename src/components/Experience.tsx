import { experience, sectionHeadings } from '../content';
import { useLanguage } from '../i18n';
import { GlowField } from './GlowField';
import { Reveal } from './Reveal';

function ExperienceCard({ card, index }: { card: (typeof experience)[number]; index: number }) {
  const { t } = useLanguage();

  return (
    <Reveal delay={index * 90} className="h-full">
      <article
        className="group relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-2xl p-6 text-center shadow-[4px_7px_26px_0px_rgba(0,0,0,0.25)] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:ring-[var(--color-accent)]/40"
        style={{
          backgroundImage:
            'linear-gradient(135deg, var(--color-card-deep) 15%, var(--color-card-mid) 55%, var(--color-card-violet) 90%, var(--color-card-fade) 130%, var(--color-card-dark) 160%)',
        }}
      >
        <div
          className="absolute inset-x-6 top-0 h-px opacity-60"
          style={{ background: 'var(--color-rule)' }}
          aria-hidden
        />

        <div className="relative shrink-0">
          <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-[var(--color-accent)]/25 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
          <div className="flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-2.5">
            {card.logo ? (
              <img src={card.logo} alt="" className="size-full object-contain" />
            ) : (
              <div className="size-full" />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="font-body text-lg font-semibold text-white">{t(card.organization)}</h3>
          <p className="font-body text-sm font-medium text-[var(--color-accent-light)]">{t(card.role)}</p>
          <p className="font-body text-sm text-white/70">{t(card.period)}</p>
          <p className="font-body text-xs text-white/50">{t(card.location)}</p>
        </div>
      </article>
    </Reveal>
  );
}

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 md:py-32">
      <GlowField glows={[{ top: '10%', left: '55%', size: '520px', color: '#4b1d8f', opacity: 0.3 }]} />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <h2 className="mb-12 font-heading text-3xl text-white sm:text-4xl md:mb-16 md:text-5xl">
            {t(sectionHeadings.experience)}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {experience.map((card, i) => (
            <ExperienceCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
