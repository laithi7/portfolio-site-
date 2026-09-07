import logo from '../assets/mylogo.png';
import { CustomIcon, type CustomIconSlug } from './CustomIcon';
import { SimpleIcon } from './SimpleIcon';
import { skills, type ShowcaseSkill } from '../content';
import { useLanguage } from '../i18n';
import { Reveal } from './Reveal';

function SkillIcon({ skill, size }: { skill: ShowcaseSkill; size: number }) {
  if (skill.iconKind === 'custom') {
    return <CustomIcon slug={skill.slug as CustomIconSlug} size={size} />;
  }
  if (skill.iconKind === 'image') {
    return <img src={skill.slug} alt="" style={{ width: size, height: size }} className="object-contain" />;
  }
  return <SimpleIcon slug={skill.slug} brandColor size={size} />;
}

/** One hoverable skill bubble: enlarges and shows a name tooltip on hover. */
function SkillBubble({ skill, size = 'md' }: { skill: ShowcaseSkill; size?: 'sm' | 'md' }) {
  const dims = size === 'sm' ? 'size-10' : 'size-12';
  const iconSize = size === 'sm' ? 18 : 20;

  return (
    <div className="group/skill relative flex items-center justify-center">
      <div
        className={`flex ${dims} items-center justify-center rounded-full bg-[#1c1030]/90 text-white ring-1 ring-white/10 backdrop-blur-sm transition-transform duration-200 group-hover/skill:scale-125 group-hover/skill:ring-[var(--color-accent-light)]`}
      >
        <SkillIcon skill={skill} size={iconSize} />
      </div>
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 rounded-md bg-black/85 px-2.5 py-1 font-body text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-150 group-hover/skill:opacity-100"
      >
        {skill.label}
      </span>
    </div>
  );
}

// All measurements share one coordinate space: pixels, origin at the
// container's center. The SVG viewBox below must match CONTAINER_SIZE
// exactly so the connector lines land on the same points as the bubbles.
const CONTAINER_SIZE = 720;
const PRIMARY_RADIUS = 150;
const ORBIT_RADIUS_X = 300;
const ORBIT_RADIUS_Y = 220;

/** Desktop/tablet layout — logo with a floating inner ring and a rotating outer ring. */
function OrbitLayout() {
  const primaryCount = skills.primary.length;
  const orbitCount = skills.orbiting.length;
  const half = CONTAINER_SIZE / 2;

  return (
    <div
      className="relative mx-auto hidden items-center justify-center sm:flex"
      style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE, maxWidth: '100%' }}
    >
      {/* Connector lines from the logo to each primary skill (curved, thin, purple) */}
      <svg
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
        viewBox={`${-half} ${-half} ${CONTAINER_SIZE} ${CONTAINER_SIZE}`}
        aria-hidden
      >
        {skills.primary.map((skill, i) => {
          const angle = (i / primaryCount) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * PRIMARY_RADIUS;
          const y = Math.sin(angle) * PRIMARY_RADIUS;
          // Bow the midpoint outward, perpendicular to the line, for a gentle curve.
          const midX = x * 0.55 + Math.cos(angle + Math.PI / 2) * 16;
          const midY = y * 0.55 + Math.sin(angle + Math.PI / 2) * 16;
          return (
            <path
              key={skill.label}
              d={`M0,0 Q${midX},${midY} ${x},${y}`}
              fill="none"
              stroke="rgba(163,98,255,0.4)"
              strokeWidth="1.25"
            />
          );
        })}
      </svg>

      {/* Orbit ellipse guide (subtle) */}
      <div
        className="absolute rounded-[50%] border border-[var(--color-accent-light)]/15"
        style={{ width: ORBIT_RADIUS_X * 2, height: ORBIT_RADIUS_Y * 2 }}
        aria-hidden
      />

      {/* Logo, unchanged */}
      <div
        className="absolute size-40 rounded-full sm:size-48"
        style={{
          background: 'radial-gradient(circle, rgba(163,98,255,0.9) 0%, rgba(90,46,168,0.55) 55%, transparent 80%)',
          filter: 'blur(2px)',
        }}
        aria-hidden
      />
      <div className="absolute size-40 animate-[pulse-glow_5s_ease-in-out_infinite] rounded-full bg-[var(--color-accent-light)]/30 blur-3xl sm:size-48" />
      <div className="relative z-10 flex size-28 items-center justify-center rounded-full bg-gradient-to-b from-[#8a4fd6] to-[#4a1f8f] shadow-[0_0_60px_rgba(163,98,255,0.55)] sm:size-32">
        <img src={logo} alt="" className="h-16 w-auto sm:h-20" />
      </div>

      {/* Primary ring — floats gently in place, does not orbit.
          Positioning (translate to the point on the circle) lives on the
          outer div; the float animation lives on an inner div. Both animate
          `transform`, so they must be on separate elements — an animation's
          keyframes replace the whole `transform` value on their own element,
          they don't compose with an inline transform set alongside them. */}
      {skills.primary.map((skill, i) => {
        const angle = (i / primaryCount) * 2 * Math.PI - Math.PI / 2;
        return (
          <div
            key={skill.label}
            className="absolute top-1/2 left-1/2 z-10"
            style={{
              transform: `translate(-50%, -50%) translate(${Math.cos(angle) * PRIMARY_RADIUS}px, ${
                Math.sin(angle) * PRIMARY_RADIUS
              }px)`,
            }}
          >
            <div
              className="animate-[skill-float_4s_ease-in-out_infinite]"
              style={{ animationDelay: `${(i % 5) * 0.4}s` }}
            >
              <SkillBubble skill={skill} />
            </div>
          </div>
        );
      })}

      {/* Orbiting ring — the wrapper rotates around the logo (transform on the
          wrapper), and each icon counter-rotates on its own positioning div
          (transform there too) to stay upright — same separate-elements
          reasoning as above, one more level deep. */}
      <div className="absolute top-1/2 left-1/2 size-0 animate-[skill-orbit_70s_linear_infinite]">
        {skills.orbiting.map((skill, i) => {
          const angle = (i / orbitCount) * 2 * Math.PI;
          const x = Math.cos(angle) * ORBIT_RADIUS_X;
          const y = Math.sin(angle) * ORBIT_RADIUS_Y;
          return (
            <div
              key={skill.label}
              className="absolute top-0 left-0"
              style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
            >
              <div className="animate-[skill-orbit-counter_70s_linear_infinite]">
                <SkillBubble skill={skill} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Mobile layout — plain responsive grid, no orbit math, no overlap risk. */
function GridLayout() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 sm:hidden">
      <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-center font-body text-xs font-semibold tracking-[0.14em] text-[var(--color-accent-bright)] uppercase">
          {t({ en: 'Core Stack', ar: 'الأدوات الأساسية' })}
        </p>
        <div className="mt-4 grid grid-cols-4 gap-x-3 gap-y-6">
          {skills.primary.map((skill) => (
            <SkillBubble key={skill.label} skill={skill} size="sm" />
          ))}
        </div>
      </div>

      <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-center font-body text-xs font-semibold tracking-[0.14em] text-[var(--color-accent-bright)] uppercase">
          {t({ en: 'Also Working With', ar: 'أدوات أخرى أستخدمها' })}
        </p>
        <div className="mt-4 grid grid-cols-4 gap-x-3 gap-y-6">
          {skills.orbiting.map((skill) => (
            <SkillBubble key={skill.label} skill={skill} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsOrbit() {
  const { t } = useLanguage();
  const introBefore = t(skills.introBefore);
  const introHighlight = t(skills.introHighlight);
  const introAfter = t(skills.introAfter);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        {(introBefore || introHighlight || introAfter) && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-xl leading-relaxed text-white sm:text-2xl">
              {introBefore}{' '}
              <span className="text-[var(--color-accent-light)]">{introHighlight}</span>{' '}
              <span className="block text-base text-white/85 sm:text-lg">{introAfter}</span>
            </p>
          </Reveal>
        )}

        <Reveal delay={150} className="mt-16 md:mt-20">
          <OrbitLayout />
          <GridLayout />
        </Reveal>
      </div>
    </section>
  );
}
