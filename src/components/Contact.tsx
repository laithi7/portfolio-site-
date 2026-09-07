import { SimpleIcon } from './SimpleIcon';
import { contact, socials } from '../content';
import { useLanguage } from '../i18n';
import { GlowField } from './GlowField';
import { Reveal } from './Reveal';

function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2}>
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4.7c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

function ContactCard({ icon, label, value, href }: ContactCardProps) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-accent-light)]/40 hover:bg-white/[0.06]"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent-light)] transition-colors duration-200 group-hover:bg-[var(--color-accent)]/25">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-body text-xs font-semibold tracking-[0.12em] text-white/50 uppercase">
          {label}
        </span>
        <span
          className="block truncate font-heading text-base text-white transition-colors duration-200 group-hover:text-[var(--color-accent-light)] sm:text-lg"
          dir="ltr"
        >
          {value}
        </span>
      </span>
    </a>
  );
}

export function Contact() {
  const { t } = useLanguage();
  const blurb = t(contact.blurb);
  const linkedin = socials.find((social) => social.slug === 'linkedin');

  return (
    <footer id="contact" className="relative pt-24 pb-14 md:pt-32">
      <GlowField glows={[{ top: '0%', left: '15%', size: '440px', color: '#4b1d8f', opacity: 0.3 }]} />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <h2 className="text-center font-heading text-2xl text-white sm:text-3xl md:text-start">
            {t(contact.heading)}
          </h2>
          {blurb && (
            <p className="mx-auto mt-6 max-w-2xl text-center font-heading text-sm leading-relaxed text-white/85 md:mx-0 md:text-start md:text-base">
              {blurb}
            </p>
          )}

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:mx-0 md:grid-cols-3">
            {contact.phone && (
              <ContactCard
                icon={<PhoneIcon />}
                label={t({ en: 'Phone', ar: 'الهاتف' })}
                value={contact.phoneDisplay || contact.phone}
                href={`tel:${contact.phone}`}
              />
            )}
            {contact.email && (
              <ContactCard icon={<MailIcon />} label={t({ en: 'Email', ar: 'البريد الإلكتروني' })} value={contact.email} href={`mailto:${contact.email}`} />
            )}
            {linkedin && (
              <ContactCard
                icon={<SimpleIcon slug="linkedin" size={18} />}
                label="LinkedIn"
                value={linkedin.href.replace(/^https?:\/\//, '')}
                href={linkedin.href}
              />
            )}
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
