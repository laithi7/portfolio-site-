import {
  siFigma,
  siReact,
  siC,
  siNodedotjs,
  siJavascript,
  siCss,
  siNextdotjs,
  siGreensock,
  siExpress,
  siMongodb,
  siTypescript,
  siHtml5,
  siGit,
  siGithub,
  siGooglechrome,
  siBehance,
  siDribbble,
  siInstagram,
  siX,
  siPython,
  siFlask,
  siPostgresql,
  siScikitlearn,
  siMysql,
  siSqlite,
  siCplusplus,
} from 'simple-icons';

// Static, named imports only — this keeps the bundle to just the icons the
// site actually uses instead of pulling in the entire simple-icons set.
const ICONS = {
  figma: siFigma,
  react: siReact,
  c: siC,
  nodedotjs: siNodedotjs,
  javascript: siJavascript,
  css: siCss,
  nextdotjs: siNextdotjs,
  greensock: siGreensock,
  express: siExpress,
  mongodb: siMongodb,
  typescript: siTypescript,
  html5: siHtml5,
  git: siGit,
  github: siGithub,
  googlechrome: siGooglechrome,
  behance: siBehance,
  dribbble: siDribbble,
  instagram: siInstagram,
  x: siX,
  python: siPython,
  flask: siFlask,
  postgresql: siPostgresql,
  scikitlearn: siScikitlearn,
  mysql: siMysql,
  sqlite: siSqlite,
  cplusplus: siCplusplus,
} as const;

export type IconSlug = keyof typeof ICONS | 'linkedin';

interface SimpleIconProps {
  slug: string;
  className?: string;
  /** Render in the brand's own color instead of currentColor. */
  brandColor?: boolean;
  size?: number;
}

// LinkedIn was removed from simple-icons upstream; kept locally since it's a
// near-universal portfolio link.
const LINKEDIN = {
  title: 'LinkedIn',
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
} as const;

/** Renders a brand/tech icon from the simple-icons set by its slug. */
export function SimpleIcon({ slug, className = '', brandColor = false, size = 20 }: SimpleIconProps) {
  const icon = slug === 'linkedin' ? LINKEDIN : ICONS[slug as keyof typeof ICONS];
  if (!icon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={brandColor ? `#${icon.hex}` : 'currentColor'}
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}
