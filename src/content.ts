/**
 * Single source of truth for every piece of copy, media, and link on the
 * site. Every user-facing string is a `Localized<...>` object — `{ en, ar }`
 * — resolved to the active language with `t()` from `useLanguage()`
 * (see src/i18n.tsx). Non-text fields (hrefs, image imports, icon slugs)
 * stay plain.
 */

import type { Localized } from './i18n';

import handwritingBeforeImg from './assets/handwriting-before-cleaning.png';
import handwritingAfterImg from './assets/handwriting-after-cleaning.png';
import handwritingAllLettersImg from './assets/handwriting-all-letters.png';
import wordRecognitionPatternImg from './assets/word-recognition-pattern.png';
import wordRecognitionTariqImg from './assets/word-recognition-tariq.png';
import wordRecognitionCostellateImg from './assets/word-recognition-costellate.png';
import robotArchitectureImg from './assets/robot-architecture.png';
import robotFaceAlertImg from './assets/robot-face-alert.png';
import trafficControlOverviewImg from './assets/traffic-control-overview.png';
import trafficControlManualOverrideImg from './assets/traffic-control-manual-override.png';
import avatarImg from './assets/avatar.png';
import powerbiIconImg from './assets/powerbi-icon.png';
import mrsLogoImg from './assets/mrs-logo.png';
import rssLogoImg from './assets/rss-logo.webp';
import overflowLogoImg from './assets/overflow-logo.png';
import mrsDashboardImg from './assets/mrs-project/mrs-dashboard.png';
import mrsJournalEntryImg from './assets/mrs-project/mrs-journal-entry.png';
import mrsFinancialReportsImg from './assets/mrs-project/mrs-financial-reports.png';
import mrsIncomeStatementImg from './assets/mrs-project/mrs-income-statement.png';
import mrsAiAssistantImg from './assets/mrs-project/mrs-ai-assistant.png';
import mrsAccountingEntriesImg from './assets/mrs-project/mrs-accounting-entries.png';

export interface NavLink {
  label: Localized;
  href: string;
}

export interface ExperienceCard {
  organization: Localized;
  role: Localized;
  period: Localized;
  location: Localized;
  /** Local image path or URL for the organization's logo. */
  logo: string;
}

export interface SkillBadge {
  /**
   * Simple Icons slug. Currently wired up in SimpleIcon.tsx: figma, react,
   * c, nodedotjs, javascript, css, nextdotjs, greensock, express, mongodb,
   * typescript, html5, git, github, googlechrome, behance, dribbble,
   * instagram, x, python, flask, postgresql, scikitlearn, mysql, sqlite,
   * cplusplus, plus a locally-added "linkedin". To add another brand, import
   * its `si<Name>` export from `simple-icons` into SimpleIcon.tsx first (see
   * https://simpleicons.org for the full catalog/slugs).
   */
  slug: string;
  label: Localized;
}

export interface ShowcaseSkill {
  label: string;
  /**
   * 'simple' renders via SimpleIcon (brand mark from the simple-icons
   * package); 'custom' via CustomIcon (hand-drawn line icon, for
   * technologies with no official mark available); 'image' renders a
   * provided logo file directly (for an official mark not in simple-icons).
   */
  iconKind: 'simple' | 'custom' | 'image';
  /** Slug into SimpleIcon.ICONS / CustomIcon.CustomIconSlug, or an imported image path, depending on iconKind. */
  slug: string;
}

export interface FeaturedProject {
  eyebrow: Localized;
  title: Localized;
  /** Short subtitle shown under the title, e.g. a field or category. */
  category?: Localized;
  description: Localized;
  /**
   * Optional structured write-up (Goal/Process/Result/…) shown as labeled
   * paragraphs instead of the single `description` when present.
   */
  sections?: {
    label: Localized;
    text: Localized;
    /** Optional short step labels, rendered as a horizontal flow (e.g. for a Process section). */
    steps?: Localized<string[]>;
    /** Optional bullet list rendered under the text (e.g. for a contribution/responsibilities section). */
    bullets?: Localized<string[]>;
  }[];
  /** Optional highlighted recognitions (e.g. grades, awards) shown as trophy badge cards. */
  achievements?: {
    label: Localized;
    value: string;
  }[];
  /** Optional one-line note shown under the achievement badges. */
  achievementsNote?: Localized;
  /**
   * Optional compact statistic tiles (e.g. verified scale numbers). Distinct
   * from `achievements`, which are trophy-style recognitions.
   */
  stats?: {
    label: Localized;
    value: string;
  }[];
  /**
   * Marks this as the flagship/most prominent project. Gives it a stronger
   * visual treatment (bigger badge, glowing frame) without a separate layout.
   */
  flagship?: boolean;
  /** Optional credit line with a small logo (e.g. crediting a mentor's company). */
  attribution?: {
    logo: string;
    label: Localized;
  };
  /** Optional tech-stack badges shown under the description. Technology names are not translated. */
  technologies?: string[];
  /**
   * Local image path or URL for the project screenshot/mockup. Shown as the
   * main visual. When `gallery` is also set but `image` is empty, the
   * gallery is shown as the main visual instead (as a grid).
   */
  image: string;
  /**
   * Optional set of labeled images. Shown as a small clickable thumbnail
   * strip alongside `image` when both are set, or as the main grid when
   * `image` is empty. Each one opens full-size in a lightbox.
   */
  gallery?: {
    label: Localized;
    src: string;
  }[];
  links: {
    demo?: string;
    source?: string;
    external?: string;
  };
}

export interface SocialLink {
  label: string;
  href: string;
  /** Icon slug — see the SkillBadge.slug comment for what's wired up. */
  slug: string;
}

export const nav: NavLink[] = [
  { label: { en: 'Home', ar: 'الرئيسية' }, href: '#home' },
  { label: { en: 'Exp', ar: 'الخبرات' }, href: '#about' },
  { label: { en: 'Project', ar: 'المشاريع' }, href: '#lab' },
  { label: { en: 'Contact', ar: 'التواصل' }, href: '#contact' },
];

/** Hardcoded section headings that aren't otherwise part of a content block. */
export const sectionHeadings = {
  experience: { en: 'Experience', ar: 'الخبرات' } satisfies Localized,
};

export const hero = {
  greetingPrefix: { en: "Hello! I'm", ar: 'مرحباً! أنا' } satisfies Localized,
  name: { en: 'Mohammad Kamal Al-Laithi', ar: 'محمد كمال الليثي' } satisfies Localized,
  tagline: { en: 'A Data Scientist who', ar: 'عالم بيانات' } satisfies Localized,
  headlineBefore: { en: 'Turns data and ideas', ar: 'يحوّل البيانات والأفكار' } satisfies Localized,
  headlineHighlightLead: { en: 'into intelligent ', ar: 'إلى ' } satisfies Localized,
  headlineHighlight: { en: 'solutions', ar: 'حلول ذكية' } satisfies Localized,
  headlineSuffix: { en: '.', ar: '.' } satisfies Localized,
  subtext: {
    en: 'Because great technology begins with understanding the real problem.',
    ar: 'لأن التقنية العظيمة تبدأ بفهم المشكلة الحقيقية.',
  } satisfies Localized,
  typewriterText: { en: "I'm a Data Science & AI Graduate.", ar: 'خريج علم بيانات وذكاء اصطناعي.' } satisfies Localized,
  currentRoleLead: {
    en: "Currently, I'm seeking an opportunity where I can apply my skills, grow professionally, and create meaningful value.",
    ar: 'أبحث حالياً عن فرصة أستطيع فيها توظيف مهاراتي، والنمو مهنياً، وتقديم قيمة حقيقية.',
  } satisfies Localized,
  currentCompany: { en: '', ar: '' } satisfies Localized,
  currentCompanyHref: '',
  bio: {
    en: 'I develop customized software solutions based on business needs and continuously look for ways to improve workflows and support company growth. While searching for my next opportunity, I built an accounting ERP system by combining my technical skills with guidance from my father, an experienced financial professional.',
    ar: 'أطوّر حلولاً برمجية مخصصة حسب احتياجات الأعمال، وأبحث باستمرار عن طرق لتحسين سير العمل ودعم نمو الشركة. وأثناء بحثي عن فرصتي القادمة، بنيت نظام ERP محاسبي بدمج مهاراتي التقنية مع إرشاد والدي، وهو محترف مالي ذو خبرة.',
  } satisfies Localized,
  avatarImage: avatarImg,
};

export const experience: ExperienceCard[] = [
  {
    organization: { en: 'MRS — AI-Powered ERP System', ar: 'ميزان — نظام ERP مدعوم بالذكاء الاصطناعي' },
    role: { en: 'Full-Stack Developer', ar: 'مطوّر برمجيات متكامل' },
    period: { en: 'Apr 2026 – Present', ar: 'أبريل 2026 – حتى الآن' },
    location: { en: 'Jubail, Saudi Arabia', ar: 'الجبيل، السعودية' },
    logo: mrsLogoImg,
  },
  {
    organization: { en: 'Royal Scientific Society (RSS)', ar: 'الجمعية العلمية الملكية' },
    role: { en: 'AI Intern', ar: 'متدرب ذكاء اصطناعي' },
    period: { en: 'Jun 2025 – Aug 2025 · 240 Hours', ar: 'يونيو 2025 – أغسطس 2025 · 240 ساعة' },
    location: { en: 'Amman, Jordan', ar: 'عمّان، الأردن' },
    logo: rssLogoImg,
  },
  {
    organization: { en: 'Overflow Club — PSUT', ar: 'نادي Overflow — الجامعة الأميرة سمية' },
    role: { en: 'Public Relations Lead', ar: 'مسؤول العلاقات العامة' },
    period: { en: 'May 2024 – May 2025', ar: 'مايو 2024 – مايو 2025' },
    location: { en: 'Amman, Jordan', ar: 'عمّان، الأردن' },
    logo: overflowLogoImg,
  },
];

export const skills = {
  introBefore: {
    en: "I'm currently looking to join a forward-thinking team where I can turn",
    ar: 'أبحث حالياً عن الانضمام إلى فريق طموح أستطيع فيه تحويل',
  } satisfies Localized,
  introHighlight: { en: 'data, AI, and software', ar: 'البيانات والذكاء الاصطناعي والبرمجيات' } satisfies Localized,
  introAfter: { en: 'into practical solutions.', ar: 'إلى حلول عملية.' } satisfies Localized,
  badges: [] as SkillBadge[],
  /** Inner ring — closest to the logo, connected to it with curved lines. */
  primary: [
    { label: 'Python', iconKind: 'simple', slug: 'python' },
    { label: 'SQL', iconKind: 'custom', slug: 'sql' },
    { label: 'Flask', iconKind: 'simple', slug: 'flask' },
    { label: 'PostgreSQL', iconKind: 'simple', slug: 'postgresql' },
    { label: 'JavaScript', iconKind: 'simple', slug: 'javascript' },
    { label: 'Scikit-learn', iconKind: 'simple', slug: 'scikitlearn' },
    { label: 'Power BI', iconKind: 'image', slug: powerbiIconImg },
    { label: 'Git', iconKind: 'simple', slug: 'git' },
    { label: 'HTML5', iconKind: 'simple', slug: 'html5' },
    { label: 'CSS3', iconKind: 'simple', slug: 'css' },
  ] as ShowcaseSkill[],
  /** Outer ring — orbits further out on subtle elliptical paths. */
  orbiting: [
    { label: 'R', iconKind: 'custom', slug: 'rlang' },
    { label: 'C++', iconKind: 'simple', slug: 'cplusplus' },
    { label: 'MySQL', iconKind: 'simple', slug: 'mysql' },
    { label: 'SQLite', iconKind: 'simple', slug: 'sqlite' },
    { label: 'MongoDB', iconKind: 'simple', slug: 'mongodb' },
    { label: 'REST APIs', iconKind: 'custom', slug: 'restapi' },
    { label: 'LLM / RAG', iconKind: 'custom', slug: 'llm' },
    { label: 'Matplotlib', iconKind: 'custom', slug: 'plotting' },
    { label: 'Seaborn', iconKind: 'custom', slug: 'plotting' },
    { label: 'ETL', iconKind: 'custom', slug: 'etl' },
  ] as ShowcaseSkill[],
};

export const projects: FeaturedProject[] = [
  {
    eyebrow: { en: 'Flagship Independent Project', ar: 'المشروع الرئيسي المستقل' },
    title: { en: 'MRS Accounting & ERP System', ar: 'نظام MRS للمحاسبة وتخطيط موارد المؤسسات' },
    category: {
      en: 'Full-Stack Development & Financial Systems',
      ar: 'تطوير برمجي متكامل وأنظمة مالية',
    },
    flagship: true,
    description: {
      en: 'MRS is a full double-entry accounting and ERP platform that I independently designed and developed during my job search. The system was created by translating real accounting requirements into software, with domain guidance from my father, a financial and accounting professional with over 30 years of experience.',
      ar: 'MRS هو نظام محاسبة بالقيد المزدوج ونظام تخطيط موارد مؤسسات كامل صممته وطوّرته بشكل مستقل أثناء بحثي عن عمل. بُني النظام بترجمة متطلبات محاسبية حقيقية إلى برمجيات، بإرشاد من والدي، محترف مالي ومحاسبي بخبرة تتجاوز 30 عاماً.',
    },
    sections: [
      {
        label: { en: 'Overview', ar: 'نظرة عامة' },
        text: {
          en: 'MRS is a full double-entry accounting and ERP platform that I independently designed and developed during my job search. The system was created by translating real accounting requirements into software, with domain guidance from my father, a financial and accounting professional with over 30 years of experience.',
          ar: 'MRS هو نظام محاسبة بالقيد المزدوج ونظام تخطيط موارد مؤسسات كامل صممته وطوّرته بشكل مستقل أثناء بحثي عن عمل. بُني النظام بترجمة متطلبات محاسبية حقيقية إلى برمجيات، بإرشاد من والدي، محترف مالي ومحاسبي بخبرة تتجاوز 30 عاماً.',
        },
      },
      {
        label: { en: 'Goal', ar: 'الهدف' },
        text: {
          en: 'Replace spreadsheet-based accounting with a reliable, self-hosted system that enforces accurate financial workflows and centralizes business operations.',
          ar: 'استبدال المحاسبة القائمة على جداول البيانات بنظام موثوق يُستضاف ذاتياً، يفرض إجراءات مالية دقيقة، ويوحّد إدارة عمليات الأعمال.',
        },
      },
      {
        label: { en: 'Core Features', ar: 'المزايا الأساسية' },
        text: {
          en: 'General ledger and chart of accounts, journal entries and accounting validation, sales and purchase invoicing, customers, suppliers and payment allocation, inventory and stock management, payroll with GOSI, settlements, and end-of-service calculations, fixed assets and depreciation, budgeting and forecasting, bank reconciliation with automatic matching, financial statements and VAT reports, user management with action-level permissions, and activity logs, notifications, and an AI assistant.',
          ar: 'دفتر الأستاذ العام ودليل الحسابات، القيود اليومية والتحقق المحاسبي، فواتير المبيعات والمشتريات، العملاء والموردون وتوزيع الدفعات، إدارة المخزون، الرواتب مع التأمينات الاجتماعية (GOSI) والتسويات ومكافأة نهاية الخدمة، الأصول الثابتة والإهلاك، الموازنات والتنبؤ المالي، التسوية البنكية مع المطابقة التلقائية، القوائم المالية وتقارير ضريبة القيمة المضافة، إدارة المستخدمين بصلاحيات على مستوى الإجراء، وسجلات النشاط والإشعارات ومساعد ذكاء اصطناعي.',
        },
      },
      {
        label: { en: 'Architecture', ar: 'البنية التقنية' },
        text: {
          en: 'A full-stack system built with a Flask backend, REST-style APIs, PostgreSQL, and a responsive frontend using JavaScript, HTML, and CSS. It includes exact decimal money handling, server-side accounting validation, automated posting workflows, database-protected audit records, and custom role-based access control.',
          ar: 'نظام متكامل مبني بخلفية Flask، وواجهات برمجية بأسلوب REST، وقاعدة بيانات PostgreSQL، وواجهة أمامية متجاوبة بلغات JavaScript وHTML وCSS. يتضمّن معالجة دقيقة للمبالغ المالية بالأرقام العشرية، وتحققاً محاسبياً من جانب الخادم، وسير عمل ترحيل تلقائي، وسجلات تدقيق محمية على مستوى قاعدة البيانات، وتحكماً مخصصاً بالوصول حسب الأدوار.',
        },
      },
      {
        label: { en: 'Result', ar: 'النتيجة' },
        text: {
          en: 'A working, large-scale ERP platform that transforms professional accounting knowledge into enforced software logic — not a basic CRUD application or university project.',
          ar: 'منصة تخطيط موارد مؤسسات عاملة وواسعة النطاق تحوّل المعرفة المحاسبية المهنية إلى منطق برمجي مُلزَم — وليست مجرد تطبيق CRUD بسيط أو مشروع جامعي.',
        },
      },
    ],
    stats: [
      { label: { en: 'API Routes', ar: 'مسارات API' }, value: '300' },
      { label: { en: 'Database Tables', ar: 'جداول قاعدة البيانات' }, value: '67' },
      { label: { en: 'Permission Keys', ar: 'مفاتيح الصلاحيات' }, value: '260' },
      { label: { en: 'Automated Tests', ar: 'اختبارات آلية' }, value: '182' },
    ],
    attribution: {
      logo: mrsLogoImg,
      label: {
        en: 'Independently developed with accounting guidance from a finance professional with 30+ years of experience.',
        ar: 'طُوِّر بشكل مستقل بإرشاد محاسبي من محترف مالي بخبرة تتجاوز 30 عاماً.',
      },
    },
    technologies: [
      'Python',
      'Flask',
      'PostgreSQL',
      'Psycopg2',
      'JavaScript',
      'HTML',
      'CSS',
      'ReportLab',
      'OpenPyXL',
      'Pytest',
    ],
    image: mrsDashboardImg,
    gallery: [
      { label: { en: 'Journal Entry', ar: 'القيد اليومي' }, src: mrsJournalEntryImg },
      { label: { en: 'Financial Report', ar: 'التقرير المالي' }, src: mrsFinancialReportsImg },
      { label: { en: 'Income Statement', ar: 'قائمة الدخل' }, src: mrsIncomeStatementImg },
      { label: { en: 'AI Assistant', ar: 'المساعد الذكي' }, src: mrsAiAssistantImg },
      { label: { en: 'Core Modules', ar: 'الوحدات الأساسية' }, src: mrsAccountingEntriesImg },
    ],
    links: {},
  },
  {
    eyebrow: { en: 'Graduation Project', ar: 'مشروع التخرج' },
    title: { en: 'AI-Powered Traffic Control Optimization', ar: 'تحسين التحكم المروري بالذكاء الاصطناعي' },
    category: {
      en: 'Reinforcement Learning, Traffic Simulation & Web Development',
      ar: 'التعلم المعزّز، محاكاة المرور، وتطوير الويب',
    },
    description: {
      en: 'A team graduation project combining multi-agent reinforcement learning, SUMO traffic simulation, and an operator control dashboard. The system optimizes traffic signals while allowing traffic authorities to monitor intersections and manually override signal phases when needed.',
      ar: 'مشروع تخرج جماعي يجمع بين التعلم المعزّز متعدد الوكلاء (Multi-Agent Reinforcement Learning)، ومحاكاة المرور عبر SUMO، ولوحة تحكم للمشغّل. يعمل النظام على تحسين إشارات المرور مع تمكين سلطات المرور من مراقبة التقاطعات والتحكم اليدوي بمراحل الإشارة عند الحاجة.',
    },
    sections: [
      {
        label: { en: 'Inspiration', ar: 'الإلهام' },
        text: {
          en: "The idea came from observing Jordan's traffic congestion and inefficient fixed traffic signals during my university commute. This inspired our team to explore how AI and real-time monitoring could create a more adaptive traffic-management system.",
          ar: 'وُلدت الفكرة من ملاحظة الازدحام المروري في الأردن وعدم كفاءة الإشارات المرورية الثابتة أثناء تنقلاتي الجامعية اليومية. هذا ما ألهم فريقنا لاستكشاف كيف يمكن للذكاء الاصطناعي والمراقبة اللحظية أن يصنعا نظام إدارة مرور أكثر تكيفاً.',
        },
      },
      {
        label: { en: 'Overview', ar: 'نظرة عامة' },
        text: {
          en: 'A team graduation project combining multi-agent reinforcement learning, SUMO traffic simulation, and an operator control dashboard. The system optimizes traffic signals while allowing traffic authorities to monitor intersections and manually override signal phases when needed.',
          ar: 'مشروع تخرج جماعي يجمع بين التعلم المعزّز متعدد الوكلاء، ومحاكاة المرور عبر SUMO، ولوحة تحكم للمشغّل. يعمل النظام على تحسين إشارات المرور مع تمكين سلطات المرور من مراقبة التقاطعات والتحكم اليدوي بمراحل الإشارة عند الحاجة.',
        },
      },
      {
        label: { en: 'Goal', ar: 'الهدف' },
        text: {
          en: 'Reduce waiting time and congestion, improve traffic flow, prioritize emergency vehicles, and provide authorities with centralized remote control.',
          ar: 'تقليل وقت الانتظار والازدحام، وتحسين تدفق الحركة المرورية، وإعطاء الأولوية لمركبات الطوارئ، وتزويد السلطات بتحكم مركزي عن بُعد.',
        },
      },
      {
        label: { en: 'My Contribution', ar: 'مساهمتي' },
        text: {
          en: 'The team split into three focus areas — one member built the PPO reinforcement-learning model, another handled the SUMO simulation and TraCI integration, and I was responsible for designing and developing the operator-facing web interface and control dashboard: an interface that represents a real traffic control center for police or an independent transport authority.',
          ar: 'انقسم الفريق إلى ثلاثة محاور — عضو بنى نموذج التعلم المعزّز PPO، وآخر تولّى محاكاة SUMO وربطها عبر TraCI، وكنت مسؤولاً عن تصميم وتطوير واجهة الويب ولوحة التحكم الخاصة بالمشغّل: واجهة تمثّل مركز تحكم مروري حقيقي للشرطة أو لهيئة نقل مستقلة.',
        },
        bullets: {
          en: [
            'Secure authentication',
            'Live traffic statistics and system status',
            'Intersection monitoring and traffic-load indicators',
            'Remote traffic-light control',
            'Ability to select and locate an intersection',
            'Manual red and green control for each road direction',
            'Options to apply a manual signal phase or return to automatic control',
          ],
          ar: [
            'نظام دخول آمن (Authentication)',
            'إحصاءات مرورية وحالة نظام لحظية',
            'مراقبة التقاطعات ومؤشرات حمل الحركة المرورية',
            'تحكم عن بُعد بإشارات المرور',
            'إمكانية اختيار وتحديد موقع تقاطع معيّن',
            'تحكم يدوي بالإشارة الحمراء والخضراء لكل اتجاه',
            'خيارات لتطبيق مرحلة إشارة يدوية أو الرجوع للتحكم التلقائي',
          ],
        },
      },
      {
        label: { en: 'System Flow', ar: 'مسار النظام' },
        text: {
          en: 'Live simulation data flows from SUMO through TraCI to the reinforcement-learning agents, which optimize signal timing; the dashboard then monitors the result in real time and lets an operator step in with a manual override at any point.',
          ar: 'تنتقل بيانات المحاكاة اللحظية من SUMO عبر TraCI إلى وكلاء التعلم المعزّز التي تعمل على تحسين توقيت الإشارات؛ ثم تراقب لوحة التحكم النتيجة لحظياً وتتيح للمشغّل التدخل بتحكم يدوي في أي وقت.',
        },
        steps: {
          en: [
            'SUMO Simulation',
            'Real-Time TraCI Data',
            'Multi-Agent PPO',
            'Signal Optimization',
            'Dashboard Monitoring & Manual Override',
          ],
          ar: [
            'محاكاة SUMO',
            'بيانات TraCI اللحظية',
            'PPO متعدد الوكلاء',
            'تحسين الإشارة',
            'مراقبة اللوحة والتحكم اليدوي',
          ],
        },
      },
      {
        label: { en: 'Result', ar: 'النتيجة' },
        text: {
          en: 'The model controlled five simulated intersections in Jubeiha, Amman. Training stabilized after approximately 150,000 steps and improved waiting-time and average-speed metrics in the SUMO simulation. Physical deployment on real traffic signals was not tested.',
          ar: 'تحكم النموذج في خمسة تقاطعات محاكاة في الجبيهة، عمّان. استقر التدريب بعد حوالي 150,000 خطوة وتحسّنت مقاييس وقت الانتظار ومتوسط السرعة داخل محاكاة SUMO. لم يتم اختبار التطبيق الفعلي على إشارات مرور حقيقية.',
        },
      },
    ],
    achievements: [
      { label: { en: 'Graduation Project I', ar: 'مشروع التخرج ١' }, value: '90/100' },
      { label: { en: 'Graduation Project II', ar: 'مشروع التخرج ٢' }, value: '88/100' },
    ],
    achievementsNote: {
      en: "Recognized as one of the university's top graduation projects.",
      ar: 'حاز تقديراً كأحد أفضل مشاريع التخرج في الجامعة.',
    },
    technologies: [
      'Python',
      'PyTorch',
      'Stable-Baselines3',
      'PPO',
      'SUMO',
      'TraCI',
      'Gymnasium',
      'NumPy',
      'Flask',
      'SQLAlchemy',
      'WebSockets',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    image: trafficControlOverviewImg,
    gallery: [{ label: { en: 'Manual Override', ar: 'التحكم اليدوي' }, src: trafficControlManualOverrideImg }],
    links: {},
  },
  {
    eyebrow: { en: 'Academic Project', ar: 'مشروع أكاديمي' },
    title: { en: 'Handwritten Letter Recognition Using CNN', ar: 'التعرّف على الحروف المكتوبة بخط اليد باستخدام CNN' },
    category: { en: 'Machine Learning & Computer Vision', ar: 'تعلّم الآلة ورؤية الحاسوب' },
    description: {
      en: 'A machine-learning system that recognizes handwritten English letters from images and converts them into digital characters. The project covers the complete workflow, from exploring and balancing an unbalanced dataset to training and evaluating a CNN model.',
      ar: 'نظام تعلّم آلي يتعرّف على الحروف الإنجليزية المكتوبة بخط اليد من الصور ويحوّلها إلى حروف رقمية. يغطي المشروع سير العمل الكامل، من استكشاف وموازنة مجموعة بيانات غير متوازنة إلى تدريب وتقييم نموذج CNN.',
    },
    sections: [
      {
        label: { en: 'Overview', ar: 'نظرة عامة' },
        text: {
          en: 'A machine-learning system that recognizes handwritten English letters from images and converts them into digital characters. The project covers the complete workflow, from exploring and balancing an unbalanced dataset to training and evaluating a CNN model.',
          ar: 'نظام تعلّم آلي يتعرّف على الحروف الإنجليزية المكتوبة بخط اليد من الصور ويحوّلها إلى حروف رقمية. يغطي المشروع سير العمل الكامل، من استكشاف وموازنة مجموعة بيانات غير متوازنة إلى تدريب وتقييم نموذج CNN.',
        },
      },
      {
        label: { en: 'Goal', ar: 'الهدف' },
        text: {
          en: 'Build a reliable model capable of classifying all 26 English letters across different handwriting styles.',
          ar: 'بناء نموذج موثوق قادر على تصنيف الحروف الإنجليزية الـ26 كافة عبر أنماط خط يد مختلفة.',
        },
      },
      {
        label: { en: 'Process', ar: 'آلية العمل' },
        text: {
          en: 'Analyzed the distribution of the 26 letter classes and prepared the 28×28 grayscale image data. Increased underrepresented classes using rotation, horizontal flipping, and median blurring, while downsampling overrepresented classes. Used an 80/20 train-test split and trained a three-layer CNN with 32, 64, and 128 filters using Adam and categorical cross-entropy. Tested the model on unseen handwritten samples and displayed the predicted letter for each image.',
          ar: 'تحليل توزيع فئات الحروف الـ26 وتجهيز بيانات الصور بمقاس 28×28 بتدرج رمادي. زيادة الفئات الناقصة باستخدام التدوير والانعكاس الأفقي والتمويه المتوسط، مع تقليل عينات الفئات الزائدة. استخدام تقسيم 80/20 للتدريب والاختبار وتدريب شبكة CNN ثلاثية الطبقات بمرشحات 32 و64 و128 باستخدام Adam ودالة categorical cross-entropy. اختبار النموذج على عينات خط يد غير مسبوقة وعرض الحرف المتوقع لكل صورة.',
        },
        steps: {
          en: ['Data Exploration', 'Dataset Balancing', 'CNN Training', 'Evaluation'],
          ar: ['استكشاف البيانات', 'موازنة البيانات', 'تدريب CNN', 'التقييم'],
        },
      },
      {
        label: { en: 'Result', ar: 'النتيجة' },
        text: {
          en: 'The saved training run achieved 95.44% training accuracy and 97% validation accuracy, successfully recognizing handwritten English letters from unseen images.',
          ar: 'حققت جلسة التدريب المحفوظة دقة تدريب 95.44% ودقة تحقق 97%، بنجاح في التعرّف على الحروف الإنجليزية المكتوبة بخط اليد من صور غير مسبوقة.',
        },
      },
    ],
    technologies: [
      'Python',
      'TensorFlow/Keras',
      'OpenCV',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'SciPy',
      'Scikit-learn',
    ],
    image: handwritingAllLettersImg,
    gallery: [
      { label: { en: 'Before', ar: 'قبل' }, src: handwritingBeforeImg },
      { label: { en: 'After', ar: 'بعد' }, src: handwritingAfterImg },
    ],
    links: {},
  },
  {
    eyebrow: { en: 'Academic Project', ar: 'مشروع أكاديمي' },
    title: { en: 'Handwritten Word Recognition System', ar: 'نظام التعرّف على الكلمات المكتوبة بخط اليد' },
    category: { en: 'Pattern Recognition & Computer Vision', ar: 'التعرّف على الأنماط ورؤية الحاسوب' },
    description: {
      en: 'An extension of my previous handwritten-letter classification project, developed for a Pattern Recognition course. The enhanced system detects multiple handwritten characters and combines their predictions to read complete words.',
      ar: 'امتداد لمشروعي السابق في تصنيف الحروف المكتوبة بخط اليد، طُوّر لمادة التعرّف على الأنماط. يكتشف النظام المحسَّن عدة حروف مكتوبة بخط اليد ويدمج توقعاتها لقراءة كلمات كاملة.',
    },
    sections: [
      {
        label: { en: 'Overview', ar: 'نظرة عامة' },
        text: {
          en: 'An extension of my previous handwritten-letter classification project, developed for a Pattern Recognition course. The enhanced system detects multiple handwritten characters and combines their predictions to read complete words.',
          ar: 'امتداد لمشروعي السابق في تصنيف الحروف المكتوبة بخط اليد، طُوّر لمادة التعرّف على الأنماط. يكتشف النظام المحسَّن عدة حروف مكتوبة بخط اليد ويدمج توقعاتها لقراءة كلمات كاملة.',
        },
      },
      {
        label: { en: 'Goal', ar: 'الهدف' },
        text: {
          en: 'Transform the original single-letter CNN classifier into a complete word-recognition pipeline.',
          ar: 'تحويل مصنّف CNN الأصلي للحرف الواحد إلى خط معالجة كامل للتعرّف على الكلمات.',
        },
      },
      {
        label: { en: 'Process', ar: 'آلية العمل' },
        text: {
          en: 'The system adjusts image contrast, converts the image to grayscale, applies Gaussian blur, Otsu thresholding, and dilation, then uses contour detection to locate and separate each character. The detected characters are sorted from left to right, resized and normalized, classified using the trained CNN model, and combined to produce the final predicted word. It also detects large gaps between characters as spaces.',
          ar: 'يقوم النظام بضبط تباين الصورة، وتحويلها إلى تدرج رمادي، وتطبيق تمويه غاوسي وعتبة Otsu والتمدد (dilation)، ثم يستخدم اكتشاف الحدود الخارجية (contour detection) لتحديد وفصل كل حرف. تُرتّب الحروف المكتشفة من اليسار لليمين، ويُعاد تحجيمها وتطبيعها، وتُصنَّف باستخدام نموذج CNN المدرَّب، ثم تُدمج لإنتاج الكلمة المتوقعة النهائية. كما يكتشف النظام الفراغات الكبيرة بين الحروف كمسافات.',
        },
        steps: {
          en: ['Image Preprocessing', 'Character Segmentation', 'CNN Classification', 'Word Reconstruction'],
          ar: ['معالجة الصورة المبدئية', 'تجزئة الحروف', 'تصنيف CNN', 'إعادة بناء الكلمة'],
        },
      },
      {
        label: { en: 'Result', ar: 'النتيجة' },
        text: {
          en: 'The system successfully detects character boundaries and reconstructs complete handwritten words, including "PATTERN," "TARIQ," and "COSTELLATE."',
          ar: 'ينجح النظام في اكتشاف حدود الحروف وإعادة بناء كلمات كاملة مكتوبة بخط اليد، بما فيها "PATTERN" و"TARIQ" و"COSTELLATE".',
        },
      },
    ],
    technologies: ['Python', 'OpenCV', 'TensorFlow/Keras', 'NumPy', 'PIL', 'Matplotlib'],
    image: wordRecognitionPatternImg,
    gallery: [
      { label: { en: 'TARIQ', ar: 'TARIQ' }, src: wordRecognitionTariqImg },
      { label: { en: 'COSTELLATE', ar: 'COSTELLATE' }, src: wordRecognitionCostellateImg },
    ],
    links: {},
  },
  {
    eyebrow: { en: 'Academic Project', ar: 'مشروع أكاديمي' },
    title: { en: 'Raspberry Pi Smart Surveillance Robot', ar: 'روبوت مراقبة ذكي بمعالج Raspberry Pi' },
    category: { en: 'Robotics, Computer Vision & IoT', ar: 'الروبوتات، رؤية الحاسوب، وإنترنت الأشياء' },
    description: {
      en: 'A Raspberry Pi-based surveillance robot that combines computer vision, sensors, motor control, live video streaming, and automated security alerts.',
      ar: 'روبوت مراقبة قائم على Raspberry Pi يجمع بين رؤية الحاسوب، والحساسات، والتحكم بالمحركات، وبث الفيديو المباشر، وتنبيهات أمنية تلقائية.',
    },
    sections: [
      {
        label: { en: 'Overview', ar: 'نظرة عامة' },
        text: {
          en: 'A Raspberry Pi-based surveillance robot that combines computer vision, sensors, motor control, live video streaming, and automated security alerts. Built as an academic team project.',
          ar: 'روبوت مراقبة قائم على Raspberry Pi يجمع بين رؤية الحاسوب، والحساسات، والتحكم بالمحركات، وبث الفيديو المباشر، وتنبيهات أمنية تلقائية. بُني كمشروع أكاديمي جماعي.',
        },
      },
      {
        label: { en: 'Goal', ar: 'الهدف' },
        text: {
          en: 'Build a mobile system capable of monitoring its surroundings and responding automatically to people and obstacles.',
          ar: 'بناء نظام متحرك قادر على مراقبة محيطه والاستجابة تلقائياً للأشخاص والعوائق.',
        },
      },
      {
        label: { en: 'Process', ar: 'آلية العمل' },
        text: {
          en: 'The robot detects faces in the live camera feed, continuously senses distance to nearby obstacles using an ultrasonic sensor, and automatically stops or reroutes to avoid collisions. Video is streamed live over the network, and whenever an unknown face is detected the system emails an alert with a captured snapshot.',
          ar: 'يكتشف الروبوت الوجوه في بث الكاميرا المباشر، ويستشعر باستمرار المسافة إلى العوائق القريبة باستخدام حساس فوق صوتي، ويتوقف أو يغيّر مساره تلقائياً لتجنّب الاصطدام. يُبث الفيديو مباشرة عبر الشبكة، وعند اكتشاف وجه غير معروف يرسل النظام تنبيهاً عبر البريد الإلكتروني مع لقطة مُلتقطة.',
        },
        steps: {
          en: ['Face Detection', 'Obstacle Sensing', 'Collision Avoidance', 'Live Streaming & Email Alerts'],
          ar: ['اكتشاف الوجوه', 'استشعار العوائق', 'تجنّب الاصطدام', 'البث المباشر وتنبيهات البريد الإلكتروني'],
        },
      },
      {
        label: { en: 'Result', ar: 'النتيجة' },
        text: {
          en: 'The prototype successfully detected faces, measured distances, avoided collisions, streamed live video, and sent alerts with captured images.',
          ar: 'نجح النموذج الأولي في اكتشاف الوجوه، وقياس المسافات، وتجنّب الاصطدامات، وبث الفيديو المباشر، وإرسال تنبيهات مع صور ملتقطة.',
        },
      },
    ],
    technologies: [
      'Python',
      'Raspberry Pi',
      'OpenCV',
      'Flask',
      'RPi.GPIO',
      'Camera Module',
      'Ultrasonic Sensor',
      'Motor Driver',
      'SMTP',
    ],
    image: robotArchitectureImg,
    gallery: [{ label: { en: 'Unknown Face Alert', ar: 'تنبيه وجه غير معروف' }, src: robotFaceAlertImg }],
    links: {},
  },
];

export const contact = {
  heading: { en: 'Contact Me', ar: 'تواصل معي' } satisfies Localized,
  email: 'Laithi11@aol.com',
  phone: '+966539336282',
  phoneDisplay: '0539 336 282',
};

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/Laithi11', slug: 'linkedin' },
];
