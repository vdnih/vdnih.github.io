import type { Lang } from '../data/types';

export const defaultLang = 'ja' satisfies Lang;
export const languages = {
  ja: '日本語',
  en: 'English',
} as const satisfies Record<Lang, string>;

export const ui = {
  ja: {
    'site.title': 'vdnih — 個人開発ポートフォリオ',
    'site.description':
      'vdnih の個人開発ポートフォリオ。AI エージェント、Flutter アプリ、Web サービスなど、開発中・公開中のプロダクト一覧。',

    'nav.projects': 'プロダクト',
    'nav.stack': '技術スタック',
    'nav.about': 'About',
    'nav.skipToContent': '本文へスキップ',

    'hero.eyebrow': '個人開発者',
    'hero.viewProjects': 'プロダクトを見る',
    'hero.github': 'GitHub を見る',
    'hero.stats.projects': '掲載プロダクト',
    'hero.stats.active': 'アクティブ開発中',
    'hero.stats.tech': '使っている技術',
    'hero.stats.since': '開発歴',
    'hero.stats.sinceUnit': '年',

    'projects.title': 'プロダクト',
    'projects.lead':
      '公開しているリポジトリから、実際に手を動かして作っているものを選んで並べています。',
    'projects.featured': '主要プロダクト',
    'projects.others': 'そのほか',
    'projects.repo': 'リポジトリ',
    'projects.demo': 'デモを見る',
    'projects.since': '開始',
    'projects.updated': '最終更新',

    'status.active': '開発中',
    'status.maintenance': 'メンテナンス中',
    'status.experiment': '実験・プロトタイプ',

    'stack.title': '技術スタック',
    'stack.lead': '掲載プロダクトで実際に使っている技術です。数字は使用プロダクト数。',
    'stack.unit': '件',

    'about.title': 'About',
    'about.contact': '連絡・リンク',

    'footer.builtWith': 'Astro で構築し、GitHub Actions で GitHub Pages にデプロイしています。',
    'footer.source': 'このサイトのソース',

    'lang.switchTo': 'English',
    'lang.label': '言語',

    'notFound.title': 'ページが見つかりません',
    'notFound.body': 'お探しのページは存在しないか、移動した可能性があります。',
    'notFound.home': 'トップへ戻る',
  },
  en: {
    'site.title': 'vdnih — Indie Developer Portfolio',
    'site.description':
      "vdnih's indie development portfolio — AI agents, Flutter apps, and web services currently in development or shipped.",

    'nav.projects': 'Projects',
    'nav.stack': 'Tech Stack',
    'nav.about': 'About',
    'nav.skipToContent': 'Skip to content',

    'hero.eyebrow': 'Indie Developer',
    'hero.viewProjects': 'View projects',
    'hero.github': 'View GitHub',
    'hero.stats.projects': 'Projects listed',
    'hero.stats.active': 'In active development',
    'hero.stats.tech': 'Technologies used',
    'hero.stats.since': 'Years building',
    'hero.stats.sinceUnit': 'yrs',

    'projects.title': 'Projects',
    'projects.lead':
      'A selected list of the things I actually build, drawn from my public repositories.',
    'projects.featured': 'Main projects',
    'projects.others': 'Other work',
    'projects.repo': 'Repository',
    'projects.demo': 'View demo',
    'projects.since': 'Started',
    'projects.updated': 'Last updated',

    'status.active': 'In development',
    'status.maintenance': 'Maintained',
    'status.experiment': 'Experiment',

    'stack.title': 'Tech Stack',
    'stack.lead':
      'Technologies I actually use across the projects listed here. The number is how many projects use it.',
    'stack.unit': '',

    'about.title': 'About',
    'about.contact': 'Links',

    'footer.builtWith': 'Built with Astro, deployed to GitHub Pages via GitHub Actions.',
    'footer.source': 'Source of this site',

    'lang.switchTo': '日本語',
    'lang.label': 'Language',

    'notFound.title': 'Page not found',
    'notFound.body': "The page you're looking for doesn't exist or has moved.",
    'notFound.home': 'Back to home',
  },
} as const;

export type UiKey = keyof (typeof ui)['ja'];
