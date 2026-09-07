import { SimpleIcon } from './SimpleIcon';
import { contact, socials } from '../content';
import { useLanguage } from '../i18n';
import { Reveal } from './Reveal';

function PhoneIcon({ size = 18 }: { size?: number }) {
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

function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface ContactOptionProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

/** One clickable contact method: icon badge + label-over-value, filling its
 * share of the panel row (or full width when the panel stacks on mobile). */
function ContactOption({ icon, label, value, href, external }: ContactOptionProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex min-w-0 items-center gap-3 px-6 py-5 transition-all duration-250 ease-out hover:-translate-y-0.5 hover:bg-white/[0.04] min-[1000px]:px-5"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent-light)] shadow-[0_0_0_0_rgba(163,98,255,0)] transition-all duration-250 ease-out group-hover:bg-[var(--color-accent)]/35 group-hover:shadow-[0_0_16px_2px_rgba(163,98,255,0.45)]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-body text-[11px] font-semibold tracking-[0.12em] text-white/50 uppercase">
          {label}
        </span>
        <span
          className="block truncate font-heading text-sm text-white transition-colors duration-250 ease-out group-hover:text-[var(--color-accent-light)] min-[1000px]:text-base"
          dir="ltr"
        >
          {value}
        </span>
      </span>
    </a>
  );
}

export function Contact() {
  const { t, dir } = useLanguage();
  const linkedin = socials.find((social) => social.slug === 'linkedin');

  return (
    <footer
      id="contact"
      lang={dir === 'rtl' ? 'ar' : 'en'}
      dir={dir}
      className="relative scroll-mt-24 py-[70px] md:py-[90px]"
    >
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="font-heading text-2xl text-white sm:text-3xl">{t(contact.heading)}</h2>
            <span
              className="mx-auto mt-3 block h-[3px] w-14 rounded-full bg-[var(--color-accent-light)]"
              aria-hidden
            />
          </div>

          {/* Glass panel: one row from 1000px up, where there's genuinely
              enough width for all three values (including the LinkedIn URL)
              to sit unclipped — narrower tablets keep the stacked mobile
              layout rather than cramming three columns into too little
              space. Dividers switch from horizontal top borders to vertical
              side borders at the same breakpoint. */}
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-[var(--color-accent-light)]/25 bg-[var(--color-accent)]/[0.07] shadow-[0_8px_40px_-8px_rgba(113,39,186,0.45)] backdrop-blur-sm">
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(163,98,255,0.22) 0%, transparent 70%)' }}
              aria-hidden
            />
            <div className="flex flex-col min-[1000px]:flex-row min-[1000px]:items-stretch">
              {contact.phone && (
                <div className="min-w-0 flex-1 border-t border-white/10 first:border-t-0 min-[1000px]:border-t-0 min-[1000px]:border-s min-[1000px]:first:border-s-0">
                  <ContactOption
                    icon={<PhoneIcon />}
                    label={t({ en: 'Phone', ar: 'الهاتف' })}
                    value={contact.phoneDisplay || contact.phone}
                    href={`tel:${contact.phone}`}
                  />
                </div>
              )}
              {contact.email && (
                <div className="min-w-0 flex-1 border-t border-white/10 first:border-t-0 min-[1000px]:border-t-0 min-[1000px]:border-s min-[1000px]:first:border-s-0">
                  <ContactOption
                    icon={<MailIcon />}
                    label={t({ en: 'Email', ar: 'البريد الإلكتروني' })}
                    value={contact.email}
                    href={`mailto:${contact.email}`}
                  />
                </div>
              )}
              {linkedin && (
                <div className="min-w-0 flex-1 border-t border-white/10 first:border-t-0 min-[1000px]:border-t-0 min-[1000px]:border-s min-[1000px]:first:border-s-0">
                  <ContactOption
                    icon={<SimpleIcon slug="linkedin" size={16} />}
                    label="LinkedIn"
                    value={linkedin.href.replace(/^https?:\/\/(www\.)?/, '')}
                    href={linkedin.href}
                    external
                  />
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
