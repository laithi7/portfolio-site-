export type CustomIconSlug = 'sql' | 'rlang' | 'plotting' | 'restapi' | 'llm' | 'etl';

interface CustomIconProps {
  slug: CustomIconSlug;
  size?: number;
  className?: string;
}

/**
 * Hand-drawn line icons for technologies with no official mark in
 * simple-icons (SQL as a language, R, Matplotlib/Seaborn) plus a few concept
 * icons (REST APIs, LLM/RAG, ETL) that have no brand mark at all. Power BI
 * uses its real logo (see SkillIcon's 'image' iconKind) instead of a
 * lookalike drawn here. All draw in `currentColor` so they inherit whatever
 * color the caller sets.
 */
export function CustomIcon({ slug, size = 20, className = '' }: CustomIconProps) {
  const common = {
    viewBox: '0 0 24 24',
    width: size,
    height: size,
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (slug) {
    case 'sql':
      // Database cylinder
      return (
        <svg {...common} role="img" aria-label="SQL">
          <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
          <path d="M4.5 5.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
          <path d="M4.5 11.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
        </svg>
      );
    case 'rlang':
      // Monogram "R"
      return (
        <svg {...common} role="img" aria-label="R">
          <text
            x="12"
            y="17"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fontFamily="Georgia, 'Times New Roman', serif"
            stroke="none"
            fill="currentColor"
          >
            R
          </text>
        </svg>
      );
    case 'plotting':
      // Line chart with data points (shared by Matplotlib / Seaborn)
      return (
        <svg {...common} role="img" aria-label="Data plotting">
          <path d="M4 20V4M4 20h16" />
          <path d="M4 15l4-5 4 3 8-9" />
          <circle cx="8" cy="10" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="20" cy="4" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'restapi':
      // Bidirectional arrows between two nodes
      return (
        <svg {...common} role="img" aria-label="REST APIs">
          <circle cx="5" cy="12" r="2.5" />
          <circle cx="19" cy="12" r="2.5" />
          <path d="M9 9.5l6-3M9.5 9l5.5-2.7" />
          <path d="M9 14.5l6 3M9.5 15l5.5 2.7" />
          <path d="M8.5 12h7" />
        </svg>
      );
    case 'llm':
      // Chat bubble with a spark, standing in for LLM / RAG
      return (
        <svg {...common} role="img" aria-label="LLM / RAG">
          <path d="M4 5.5h16v10H9.5L5 19v-3.5H4z" />
          <path d="M12 8v5M9.7 9.3l4.6 2.4M14.3 9.3l-4.6 2.4" />
        </svg>
      );
    case 'etl':
      // Three linked stages: extract -> transform -> load
      return (
        <svg {...common} role="img" aria-label="ETL">
          <rect x="2.5" y="9" width="5" height="6" rx="1.2" />
          <path d="M14.5 9l3-3-3-3M17.5 6H10" />
          <rect x="16.5" y="9" width="5" height="6" rx="1.2" />
          <path d="M9.5 15l-3 3 3 3M6.5 18H14" />
        </svg>
      );
    default:
      return null;
  }
}
