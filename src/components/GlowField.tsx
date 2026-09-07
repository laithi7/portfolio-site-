interface Glow {
  top: string;
  left?: string;
  right?: string;
  size: string;
  color: string;
  opacity?: number;
  animate?: boolean;
}

/**
 * Renders the soft purple/blue glow blobs that sit behind each section in
 * the design (originally exported as radial-gradient SVGs). Reproduced as
 * pure CSS so they scale losslessly at any viewport size.
 */
export function GlowField({ glows, className = '' }: { glows: Glow[]; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {glows.map((glow, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl ${glow.animate ? 'animate-[pulse-glow_8s_ease-in-out_infinite]' : ''}`}
          style={{
            top: glow.top,
            left: glow.left,
            right: glow.right,
            width: glow.size,
            height: glow.size,
            background: `radial-gradient(circle, ${glow.color} 0%, transparent 70%)`,
            opacity: glow.opacity ?? 0.55,
            animationDelay: `${i * 1.3}s`,
          }}
        />
      ))}
    </div>
  );
}
