import { SimpleIcon } from './SimpleIcon';
import { contact, socials } from '../content';
import { useLanguage } from '../i18n';
import { GlowField } from './GlowField';
import { Reveal } from './Reveal';

export function Contact() {
  const { t } = useLanguage();
  const blurb = t(contact.blurb);

  return (
    <footer className="relative pt-24 pb-14 md:pt-32">
      <GlowField glows={[{ top: '0%', left: '15%', size: '440px', color: '#4b1d8f', opacity: 0.3 }]} />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <h2 className="font-heading text-2xl text-white sm:text-3xl">{t(contact.heading)}</h2>
          {blurb && (
            <p className="mt-6 max-w-2xl font-heading text-sm leading-relaxed text-white/85 md:text-base">{blurb}</p>
          )}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="mt-4 inline-block font-heading text-sm text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-[var(--color-accent-light)] md:text-base"
            >
              {contact.email}
            </a>
          )}

          {socials.length > 0 && (
            <div className="mt-8 flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-200 hover:-translate-y-1 hover:bg-[var(--color-accent)]"
                >
                  <SimpleIcon slug={social.slug} size={16} />
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </footer>
  );
}
