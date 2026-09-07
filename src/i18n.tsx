import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'ar';

/** A piece of copy provided in both languages. Read it with `t()`. */
export interface Localized<T = string> {
  en: T;
  ar: T;
}

const STORAGE_KEY = 'portfolio-lang';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Resolves a Localized value (or a plain string, passed through as-is) to the current language. */
  t: <T>(value: Localized<T> | T) => T;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocalized<T>(value: unknown): value is Localized<T> {
  return typeof value === 'object' && value !== null && 'en' in value && 'ar' in value;
}

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') return stored;
  } catch {
    // localStorage can throw in private-browsing contexts — fall through to default.
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore write failures (private browsing, storage disabled, etc.).
    }
  };

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang,
      dir,
      t: <T,>(value: Localized<T> | T) => (isLocalized<T>(value) ? value[lang] : value),
    }),
    [lang, dir],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
