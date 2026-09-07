import { useEffect, useRef, useState } from 'react';

export interface LightboxImage {
  src: string;
  alt: string;
  /** Short title shown in the caption bar (falls back to `alt` when omitted). */
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  /** Index into `images` to open on. */
  startIndex: number;
  onClose: () => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;
/** Minimum horizontal drag distance (px) on touch to count as a swipe instead of a pan/tap. */
const SWIPE_THRESHOLD = 50;

/**
 * Fullscreen gallery viewer: +/- zoom, drag-to-pan while zoomed, reset/close,
 * previous/next navigation (buttons, keyboard arrows, and touch swipe when
 * not zoomed in), and a caption bar. Closes on backdrop click, the close
 * button, or Escape.
 */
export function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const current = images[index];
  const hasMultiple = images.length > 1;

  const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

  const zoomIn = () => setZoom((z) => clampZoom(z + ZOOM_STEP));
  const zoomOut = () =>
    setZoom((z) => {
      const next = clampZoom(z - ZOOM_STEP);
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
      return next;
    });
  const reset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
    reset();
  };
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
      if (e.key === '0') reset();
      if (e.key === 'ArrowLeft' && hasMultiple) goPrev();
      if (e.key === 'ArrowRight' && hasMultiple) goNext();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, index, hasMultiple]);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => {
      const next = clampZoom(z + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= MIN_ZOOM) {
      // Not zoomed in: track this as a potential swipe instead of a pan.
      swipeStart.current = { x: e.clientX, y: e.clientY };
      return;
    }
    (e.target as Element).setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragState.current) {
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      setPan({ x: dragState.current.panX + dx, y: dragState.current.panY + dy });
    }
  };

  const endDrag = (e: React.PointerEvent) => {
    if (swipeStart.current && zoom <= MIN_ZOOM && hasMultiple) {
      const dx = e.clientX - swipeStart.current.x;
      const dy = e.clientY - swipeStart.current.y;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) goPrev();
        else goNext();
      }
    }
    swipeStart.current = null;
    dragState.current = null;
    setIsDragging(false);
  };

  const captionText = current.caption ?? current.alt;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Controls */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={zoomOut}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Zoom out"
          className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={zoomIn}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
          className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={zoom === MIN_ZOOM && pan.x === 0 && pan.y === 0}
          aria-label="Reset zoom"
          className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}>
            <path
              d="M4 4v5h5M20 20v-5h-5M4.5 9a8 8 0 0 1 14.5-3M19.5 15a8 8 0 0 1-14.5 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Previous / next */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-5"
          >
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            className="absolute top-1/2 right-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5"
          >
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Caption + zoom level */}
      <div
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        {captionText && (
          <p className="max-w-[80vw] truncate rounded-full bg-black/50 px-4 py-1.5 font-body text-sm text-white">
            {captionText}
            {hasMultiple && (
              <span className="text-white/50">
                {' '}
                · {index + 1}/{images.length}
              </span>
            )}
          </p>
        )}
        <span className="rounded-full bg-white/10 px-3 py-1 font-body text-xs text-white/80">
          {Math.round(zoom * 100)}%
        </span>
      </div>

      {/* This wrapper spans the whole viewport (needed to center the image
          via flexbox), but must NOT swallow clicks on its own — only a
          click that actually lands on the image (or while dragging/panning
          it) should be kept from reaching the backdrop's onClose below.
          Otherwise every click in the empty space around a small or
          non-full-bleed image — most of the screen, for a landscape
          screenshot — silently does nothing instead of closing. */}
      <div
        className="flex size-full items-center justify-center overflow-hidden"
        onClick={(e) => {
          if (e.target !== e.currentTarget) e.stopPropagation();
        }}
        onWheel={onWheel}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          draggable={false}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onDoubleClick={() => (zoom > MIN_ZOOM ? reset() : zoomIn())}
          className="max-h-full max-w-full rounded-lg object-contain shadow-[0_20px_80px_rgba(0,0,0,0.6)] select-none"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            cursor: zoom > MIN_ZOOM ? (isDragging ? 'grabbing' : 'grab') : hasMultiple ? 'ew-resize' : 'zoom-in',
            touchAction: 'none',
          }}
        />
      </div>
    </div>
  );
}
