import { useEffect, useState } from 'react';
import logo from '../assets/mylogo.png';
import flagGb from '../assets/flags/32x24/gb.png';
import flagGb2x from '../assets/flags/64x48/gb.png';
import flagSa from '../assets/flags/32x24/sa.png';
import flagSa2x from '../assets/flags/64x48/sa.png';
import { nav } from '../content';
import { useLanguage } from '../i18n';

function Flag({ src, srcSet }: { src: string; srcSet: string }) {
  return (
    <img
      src={src}
      srcSet={`${srcSet} 2x`}
      width={19}
      height={14}
      alt=""
      className="block size-[19px] shrink-0 rounded-full object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.16)] opacity-55 transition-opacity duration-200 group-hover/langopt:opacity-85 [.active_&]:opacity-100"
    />
  );
}

function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div
      className={`inline-flex shrink-0 items-center gap-0.5 rounded-full bg-white/5 p-[3px] leading-none ring-1 ring-white/10 ${className}`}
      style={{ direction: 'ltr' }}
      role="group"
      aria-label="Language / اللغة"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        title="English"
        aria-label="English"
        aria-pressed={!isAr}
        className={`group/langopt flex cursor-pointer items-center gap-1.5 rounded-full border py-[5px] pr-[11px] pl-2 font-nav text-[11.5px] font-bold tracking-[0.4px] transition-colors duration-200 ${
          !isAr
            ? 'active border-[var(--color-accent)]/35 bg-[var(--color-accent)]/15 text-white'
            : 'border-transparent text-white/50 hover:text-white/80'
        }`}
      >
        <Flag src={flagGb} srcSet={flagGb2x} />
        <span style={{ direction: 'ltr', unicodeBidi: 'isolate' }}>EN</span>
      </button>
      <button
        type="button"
        onClick={() => setLang('ar')}
        title="العربية"
        aria-label="العربية"
        aria-pressed={isAr}
        className={`group/langopt flex cursor-pointer items-center gap-1.5 rounded-full border py-[5px] pr-[11px] pl-2 font-nav text-[11.5px] font-bold tracking-[0.4px] transition-colors duration-200 ${
          isAr
            ? 'active border-[var(--color-accent)]/35 bg-[var(--color-accent)]/15 text-white'
            : 'border-transparent text-white/50 hover:text-white/80'
        }`}
      >
        <Flag src={flagSa} srcSet={flagSa2x} />
        <span style={{ direction: 'ltr', unicodeBidi: 'isolate' }}>AR</span>
      </button>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-[0px_6px_22px_-3px_rgba(0,0,0,0.35)]' : 'shadow-none'
      }`}
      style={{ backgroundColor: 'var(--color-header)' }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <a href="#home" aria-label="Home" className="shrink-0">
          <img src={logo} alt="" className="h-12 w-auto md:h-14" />
        </a>

        <nav className="hidden items-center gap-10 font-nav text-lg font-semibold tracking-[0.02em] text-white md:flex lg:gap-16 lg:text-xl">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 transition-colors duration-200 hover:text-[var(--color-accent-light)] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--color-accent-light)] after:transition-all after:duration-300 hover:after:w-full"
            >
              {t(item.label)}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <LanguageToggle />
        </div>
      </div>

      {/* Phones only: no hamburger/dropdown — the nav links and language
          toggle sit permanently on a second row under the logo, always
          visible with nothing to tap open. `md:hidden` keeps this row (and
          the menu button it replaces) out of tablet/desktop entirely, so
          that layout is unchanged. */}
      <div className="flex items-center justify-between gap-3 px-6 pb-4 font-nav text-white md:hidden">
        <nav className="flex items-center gap-4 text-sm font-semibold">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap">
              {t(item.label)}
            </a>
          ))}
        </nav>
        <LanguageToggle />
      </div>
    </header>
  );
}
