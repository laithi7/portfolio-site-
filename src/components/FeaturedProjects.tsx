import { useState } from 'react';
import { SimpleIcon } from './SimpleIcon';
import { projects } from '../content';
import { useLanguage } from '../i18n';
import { GlowField } from './GlowField';
import { Lightbox, type LightboxImage } from './Lightbox';
import { Reveal } from './Reveal';

type Project = (typeof projects)[number];

const LINK_ICONS: { key: keyof Project['links']; slug: string; label: string }[] = [
  { key: 'demo', slug: 'googlechrome', label: 'Live demo' },
  { key: 'source', slug: 'github', label: 'Source code' },
];

function ProjectLinks({ project, className = '' }: { project: Project; className?: string }) {
  const hasLinks = LINK_ICONS.some((l) => project.links[l.key]) || project.links.external;
  if (!hasLinks) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {LINK_ICONS.filter((l) => project.links[l.key]).map((l) => (
        <a
          key={l.key}
          href={project.links[l.key]}
          aria-label={l.label}
          className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent)]"
        >
          <SimpleIcon slug={l.slug} size={16} />
        </a>
      ))}
      {project.links.external && (
        <a
          href={project.links.external}
          aria-label="Visit"
          className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent)]"
        >
          <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </div>
  );
}

/** Default project row: image/gallery on one side, single description card on the other, alternating sides. */
function DefaultProjectRow({
  project,
  index,
  onOpenImage,
}: {
  project: Project;
  index: number;
  onOpenImage: (i: number) => void;
}) {
  const { t } = useLanguage();
  const reversed = index % 2 === 1;
  const title = t(project.title);

  return (
    <Reveal delay={index * 100}>
      <div
        className={`flex flex-col items-center gap-10 md:flex-row md:gap-14 ${
          reversed ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Mockup */}
        <div className="relative w-full max-w-xl shrink-0 md:w-1/2">
          <div
            className="absolute -inset-6 -z-10 rounded-3xl blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(118,60,172,0.35) 0%, transparent 70%)' }}
          />
          {project.gallery ? (
            <div className={`grid gap-3 ${project.gallery.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {project.gallery.map((item, i) => {
                const label = t(item.label);
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => item.src && onOpenImage(i + 1)}
                      disabled={!item.src}
                      className="aspect-square w-full overflow-hidden rounded-2xl bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-transform duration-200 enabled:cursor-zoom-in enabled:hover:scale-[1.02] enabled:hover:ring-[var(--color-accent)]"
                    >
                      {item.src ? (
                        <img src={item.src} alt={`${title} — ${label}`} className="size-full object-cover" />
                      ) : (
                        <div className="size-full" />
                      )}
                    </button>
                    <p className="text-center font-body text-xs font-semibold uppercase tracking-wide text-[var(--color-body-text)]/60">
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => project.image && onOpenImage(0)}
              disabled={!project.image}
              className="aspect-[568/354] w-full overflow-hidden rounded-2xl bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-transform duration-200 enabled:cursor-zoom-in enabled:hover:scale-[1.01] enabled:hover:ring-[var(--color-accent)]"
            >
              {project.image ? (
                <img src={project.image} alt="" className="size-full object-cover" />
              ) : (
                <div className="size-full" />
              )}
            </button>
          )}
        </div>

        {/* Text card */}
        <div className={`w-full md:w-1/2 ${reversed ? 'md:text-right' : ''}`}>
          <p className="font-body text-sm font-semibold tracking-wide text-[var(--color-accent-bright)]">
            {t(project.eyebrow)}
          </p>
          <h3 className="mt-1 font-body text-2xl font-semibold text-[var(--color-body-text)] sm:text-3xl">{title}</h3>

          <div
            className={`relative mt-5 overflow-hidden rounded-2xl p-6 ${reversed ? 'md:ml-auto' : ''}`}
            style={{
              background: 'rgba(60,30,100,0.35)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background:
                  'radial-gradient(circle at 15% 20%, rgba(105,59,147,1) 0%, rgba(110,191,244,0.2) 60%, transparent 100%)',
              }}
              aria-hidden
            />
            <p className="relative font-body text-base leading-relaxed text-[var(--color-body-text)]">
              {t(project.description)}
            </p>
          </div>

          <ProjectLinks project={project} className={`mt-4 ${reversed ? 'justify-end' : ''}`} />
        </div>
      </div>
    </Reveal>
  );
}

/** Showcase project row: a calmer, two-column layout for projects with a structured Overview/Goal/Process/Result write-up. */
function ShowcaseProjectRow({
  project,
  index,
  onOpenImage,
}: {
  project: Project;
  index: number;
  onOpenImage: (i: number) => void;
}) {
  const { t } = useLanguage();
  const gallery = project.gallery ?? [];
  const reversed = index % 2 === 0;
  const title = t(project.title);

  return (
    <Reveal delay={index * 100}>
      <div className="relative">
        <div
          className="absolute -inset-8 -z-10 rounded-[2.5rem] blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(118,60,172,0.22) 0%, transparent 70%)' }}
          aria-hidden
        />

        <div
          className={`grid gap-10 md:gap-12 lg:gap-16 ${
            reversed ? 'md:grid-cols-[55fr_45fr]' : 'md:grid-cols-[45fr_55fr]'
          }`}
        >
          {/* Content column (~45%) */}
          <div className={`flex flex-col text-start ${reversed ? 'md:order-2' : 'md:order-1'}`}>
            <p className="font-body text-sm font-semibold tracking-wide text-[var(--color-accent-bright)]">
              {t(project.eyebrow)}
            </p>
            <h3 className="mt-1 font-body text-2xl font-semibold text-[var(--color-body-text)] sm:text-3xl">
              {title}
            </h3>
            {project.category && (
              <p className="mt-1 font-body text-sm text-[var(--color-body-text)]/60">{t(project.category)}</p>
            )}

            {project.achievements && (
              <div className="mt-4 flex flex-wrap gap-3">
                {project.achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-2.5"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width={18}
                      height={18}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      className="shrink-0 text-[var(--color-accent-bright)]"
                      aria-hidden
                    >
                      <path
                        d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4ZM7 5H4a3 3 0 0 0 3 3M17 5h3a3 3 0 0 1-3 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <p className="font-body text-[0.7rem] text-[var(--color-body-text)]/70">
                        {t(achievement.label)}
                      </p>
                      <p className="font-body text-sm font-semibold text-[var(--color-body-text)]">
                        {achievement.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {project.achievementsNote && (
              <p className="mt-2 font-body text-xs text-[var(--color-body-text)]/50">
                {t(project.achievementsNote)}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-5">
              {project.sections?.map((section, si) => {
                const steps = section.steps ? t(section.steps) : undefined;
                const bullets = section.bullets ? t(section.bullets) : undefined;
                return (
                  <div
                    key={si}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                  >
                    <p className="font-body text-xs font-semibold tracking-[0.14em] text-[var(--color-accent-bright)] uppercase">
                      {t(section.label)}
                    </p>
                    <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-[var(--color-body-text)]/90">
                      {t(section.text)}
                    </p>

                    {steps && (
                      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
                        {steps.map((step, i) => (
                          <div key={step} className="flex items-center gap-2">
                            <span className="rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-3 py-1.5 font-body text-xs font-medium whitespace-nowrap text-[var(--color-body-text)]">
                              {step}
                            </span>
                            {i < steps.length - 1 && (
                              <svg
                                viewBox="0 0 24 24"
                                width={14}
                                height={14}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="shrink-0 rtl:-scale-x-100 text-[var(--color-accent-bright)]/60"
                                aria-hidden
                              >
                                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {bullets && (
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 font-body text-sm leading-relaxed text-[var(--color-body-text)]/80"
                          >
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--color-accent-bright)]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            {project.technologies && (
              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-body text-[0.7rem] text-[var(--color-body-text)]/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {project.attribution && (
              <div className="mt-5 flex items-center gap-2.5 border-t border-white/10 pt-5">
                <img src={project.attribution.logo} alt="" className="h-6 w-auto shrink-0 rounded object-contain" />
                <p className="font-body text-xs text-[var(--color-body-text)]/60">{t(project.attribution.label)}</p>
              </div>
            )}

            <ProjectLinks project={project} className="mt-6" />
          </div>

          {/* Image column (~55%) */}
          <div className={`flex flex-col gap-4 ${reversed ? 'md:order-1' : 'md:order-2'}`}>
            {project.image && (
              <button
                type="button"
                onClick={() => onOpenImage(0)}
                className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.01] hover:border-[var(--color-accent)]/50"
              >
                <img
                  src={project.image}
                  alt={title}
                  className="aspect-[3/2] w-full cursor-zoom-in rounded-lg object-contain"
                />
              </button>
            )}

            {gallery.length > 0 && (
              <div className={`grid gap-4 ${gallery.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {gallery.map((item, i) => {
                  const label = t(item.label);
                  const openIndex = project.image ? i + 1 : i;
                  return (
                    <div key={i} className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => item.src && onOpenImage(openIndex)}
                        disabled={!item.src}
                        className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-2 transition-transform duration-200 enabled:cursor-zoom-in enabled:hover:scale-[1.03] enabled:hover:border-[var(--color-accent)]/50"
                      >
                        {item.src ? (
                          <img
                            src={item.src}
                            alt={`${title} — ${label}`}
                            className="size-full rounded-md object-contain"
                          />
                        ) : (
                          <div className="size-full" />
                        )}
                      </button>
                      <p className="text-center font-body text-[0.65rem] font-semibold tracking-wide text-[var(--color-body-text)]/60 uppercase">
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Flagship project row: a distinct, more prominent full-width template for
 * the single project marked `flagship: true`. Structure: full-width header
 * (badge/title/category/stats) → full-width image gallery (main + equal
 * thumbnails) → a balanced two-column grid of info cards → tech tags and
 * credit line.
 */
function FlagshipProjectRow({
  project,
  index,
  onOpenImage,
}: {
  project: Project;
  index: number;
  onOpenImage: (i: number) => void;
}) {
  const { t } = useLanguage();
  const title = t(project.title);
  const gallery = project.gallery ?? [];
  const mainImage = project.image;
  const thumbnails = gallery;

  return (
    <Reveal delay={index * 100}>
      <div className="relative">
        <div
          className="absolute -inset-10 -z-10 rounded-[3rem] blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(163,98,255,0.32) 0%, transparent 72%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -inset-px -z-10 rounded-[2.25rem] border border-[var(--color-accent-light)]/25"
          aria-hidden
        />

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-10">
          {/* 1. Full-width header */}
          <div className="text-center">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent-light)]/40 bg-[var(--color-accent)]/15 px-3.5 py-1.5 font-body text-sm font-semibold tracking-wide text-[var(--color-accent-light)]">
              <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor" className="shrink-0" aria-hidden>
                <path d="M12 2l2.9 6.26L21.5 9l-4.9 4.44L17.8 21 12 17.27 6.2 21l1.2-7.56L2.5 9l6.6-.74L12 2z" />
              </svg>
              {t(project.eyebrow)}
            </p>
            <h3 className="mt-4 font-heading text-3xl text-[var(--color-body-text)] sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h3>
            {project.category && (
              <p className="mt-2 font-body text-base text-[var(--color-body-text)]/60">{t(project.category)}</p>
            )}

            {project.stats && (
              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {project.stats.map((stat, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center">
                    <p className="font-heading text-2xl font-semibold text-[var(--color-accent-light)] sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-body text-[0.7rem] tracking-wide text-[var(--color-body-text)]/60 uppercase">
                      {t(stat.label)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Full-width gallery */}
          <div className="mt-10">
            {mainImage && (
              <button
                type="button"
                onClick={() => onOpenImage(0)}
                className="block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 transition-transform duration-200 hover:scale-[1.005] hover:border-[var(--color-accent)]/50 sm:p-3"
              >
                <img
                  src={mainImage}
                  alt={title}
                  className="aspect-[16/9] w-full cursor-zoom-in rounded-xl object-contain"
                />
              </button>
            )}

            {thumbnails.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {thumbnails.map((item, i) => {
                  const label = t(item.label);
                  const openIndex = mainImage ? i + 1 : i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => item.src && onOpenImage(openIndex)}
                      disabled={!item.src}
                      className="group flex flex-col gap-1.5"
                    >
                      <span className="block aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-1.5 transition-colors duration-200 group-enabled:cursor-zoom-in group-hover:enabled:border-[var(--color-accent)]/50">
                        {item.src ? (
                          <img
                            src={item.src}
                            alt={`${title} — ${label}`}
                            className="size-full rounded-lg object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <span className="block size-full" />
                        )}
                      </span>
                      <span className="text-center font-body text-[0.65rem] font-semibold tracking-wide text-[var(--color-body-text)]/60 uppercase">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Info cards — balanced two-column grid */}
          {project.sections && (
            <div className="mt-10 grid gap-5 text-start sm:grid-cols-2">
              {project.sections.map((section, si) => (
                <div
                  key={si}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                >
                  <p className="font-body text-xs font-semibold tracking-[0.14em] text-[var(--color-accent-bright)] uppercase">
                    {t(section.label)}
                  </p>
                  <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-[var(--color-body-text)]/90">
                    {t(section.text)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 4. Technologies + credit */}
          {project.technologies && (
            <div className="mt-8 flex flex-wrap justify-center gap-1.5 border-t border-white/10 pt-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-body text-[0.7rem] text-[var(--color-body-text)]/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.attribution && (
            <div className="mt-6 flex items-center justify-center gap-2.5">
              <img src={project.attribution.logo} alt="" className="h-7 w-auto shrink-0 rounded object-contain" />
              <p className="font-body text-xs text-[var(--color-body-text)]/60">{t(project.attribution.label)}</p>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const title = t(project.title);

  const images: LightboxImage[] = [
    ...(project.image ? [{ src: project.image, alt: title, caption: title }] : []),
    ...(project.gallery ?? []).map((item) => {
      const label = t(item.label);
      return { src: item.src, alt: `${title} — ${label}`, caption: label };
    }),
  ];

  const openImage = (i: number) => setLightboxIndex(i);

  return (
    <>
      {project.flagship ? (
        <FlagshipProjectRow project={project} index={index} onOpenImage={openImage} />
      ) : project.sections ? (
        <ShowcaseProjectRow project={project} index={index} onOpenImage={openImage} />
      ) : (
        <DefaultProjectRow project={project} index={index} onOpenImage={openImage} />
      )}

      {/* Rendered as a sibling of Reveal, not inside it: Reveal applies a CSS
          transform to its child, which would otherwise make this fixed-position
          overlay position itself relative to that element instead of the viewport. */}
      {lightboxIndex !== null && (
        <Lightbox images={images} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}

export function FeaturedProjects() {
  return (
    <section id="lab" className="relative py-24 md:py-32">
      <GlowField
        glows={[
          { top: '5%', left: '8%', size: '480px', color: '#5a2ea8', opacity: 0.28 },
          { top: '55%', right: '5%', size: '460px', color: '#4b1d8f', opacity: 0.3 },
        ]}
      />

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-24 px-6 md:px-10 lg:gap-32 lg:px-16">
        {projects.map((project, i) => (
          <ProjectRow key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
