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

    'nav.apps': 'アプリ',
    'nav.home': 'ホーム',

    'apps.title': 'アプリ',
    'apps.lead': 'App Store と Google Play で配信しているアプリです。',
    'apps.empty': '配信中のアプリはまだありません。',
    'apps.viewDetail': '詳細を見る',

    'app.stage.development': '開発中',
    'app.stage.testing': 'テスト中',
    'app.stage.released': '公開中',
    'app.platform.ios': 'iOS',
    'app.platform.android': 'Android',
    'app.comingSoon': '準備中',
    'app.features': '主な機能',
    'app.about': 'このアプリについて',
    'app.legal': 'ポリシーとサポート',
    'app.store.appStore': 'App Store で見る',
    'app.store.googlePlay': 'Google Play で見る',

    'legal.privacy': 'プライバシーポリシー',
    'legal.terms': '利用規約',
    'legal.support': 'サポート',
    'legal.deleteAccount': 'アカウントの削除',
    'legal.lastUpdated': '最終更新',
    'legal.backToApp': 'アプリの概要へ戻る',

    'privacy.dataTitle': '収集する情報',
    'privacy.dataLead':
      'このアプリが収集する情報は次のとおりです。App Store および Google Play で申告している内容と同一です。',
    'privacy.dataEmpty': 'このアプリは個人情報を収集しません。',
    'privacy.col.category': '種別',
    'privacy.col.items': '収集する項目',
    'privacy.col.purpose': '利用目的',
    'privacy.col.shared': '第三者提供',
    'privacy.col.required': '必須',
    'privacy.thirdTitle': '利用している外部サービス',
    'privacy.thirdLead':
      '上記の情報の一部は、次の外部サービス上で処理・保管されます。各社のプライバシーポリシーもあわせてご確認ください。',
    'privacy.thirdEmpty': '外部サービスへの情報の提供はありません。',
    'privacy.col.service': 'サービス',
    'privacy.col.role': '用途',
    'privacy.col.policy': 'ポリシー',
    'privacy.yes': 'あり',
    'privacy.no': 'なし',
    'privacy.required': '必須',
    'privacy.optional': '任意',
    'privacy.contactTitle': 'お問い合わせ',
    'privacy.contactBody':
      'このプライバシーポリシーおよび個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。',

    'support.title': 'サポート',
    'support.lead':
      'ご質問・不具合のご報告・ご要望は、下記のメールアドレスまでお気軽にご連絡ください。',
    'support.emailLabel': 'メールでのお問い合わせ',
    'support.responseNote': '通常 3 営業日以内に返信します。個人で開発・運営しているため、時間をいただく場合があります。',
    'support.emailPending': '公開用の連絡先メールアドレスを準備中です。',
    'support.tips': 'お問い合わせ時にお知らせいただきたいこと',
    'support.tip.device': 'ご利用の端末と OS のバージョン（例: iPhone 15 / iOS 18.5）',
    'support.tip.version': 'アプリのバージョン（設定画面の下部に表示されます）',
    'support.tip.steps': '問題が起きるまでの操作手順と、実際に起きたこと',
    'support.related': '関連するページ',

    'delete.title': 'アカウントとデータの削除',
    'delete.lead':
      'アカウントと、それに紐づくデータの削除をご希望の場合は、次のいずれかの方法をご利用ください。',
    'delete.inAppTitle': '方法 1: アプリ内から削除する（推奨）',
    'delete.inAppLead': 'アプリにログインできる場合は、アプリ内から即時に削除できます。',
    'delete.inApp.step1': 'アプリを起動し、「設定」を開きます。',
    'delete.inApp.step2': '「アカウント」を開きます。',
    'delete.inApp.step3': '「アカウントを削除」を選び、画面の案内に従って確定します。',
    'delete.webTitle': '方法 2: メールでリクエストする',
    'delete.webLead':
      'アプリを削除済みの場合やログインできない場合は、メールでリクエストしてください。ご登録のメールアドレスから、件名を「アカウント削除希望」としてお送りください。本人確認のうえ削除いたします。',
    'delete.deletedTitle': '削除されるデータ',
    'delete.deletedLead': '削除をご依頼いただくと、次の情報がすべて削除されます。',
    'delete.retentionTitle': '削除までにかかる期間',
    'delete.retentionBody':
      '削除のご依頼を受け付けると、稼働中のシステムからは速やかにデータを削除します。バックアップからも完全に消去されるまで、最大 {days} 日かかります。この期間中、データが利用されることはありません。',
    'delete.retentionLegal':
      'なお、法令により保存が義務づけられている記録がある場合に限り、必要な期間を過ぎるまで当該記録を保持することがあります。',

    'contact.title': 'お問い合わせ',
    'contact.lead': 'アプリに関するご連絡、お仕事のご相談などはこちらへどうぞ。',

    'sitePrivacy.title': 'このサイトについて',

    'footer.legal': 'ポリシー',
    'footer.contact': 'お問い合わせ',
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

    'nav.apps': 'Apps',
    'nav.home': 'Home',

    'apps.title': 'Apps',
    'apps.lead': 'Apps I publish on the App Store and Google Play.',
    'apps.empty': 'No apps have been published yet.',
    'apps.viewDetail': 'View details',

    'app.stage.development': 'In development',
    'app.stage.testing': 'In testing',
    'app.stage.released': 'Available',
    'app.platform.ios': 'iOS',
    'app.platform.android': 'Android',
    'app.comingSoon': 'Coming soon',
    'app.features': 'Features',
    'app.about': 'About this app',
    'app.legal': 'Policies and support',
    'app.store.appStore': 'View on the App Store',
    'app.store.googlePlay': 'View on Google Play',

    'legal.privacy': 'Privacy Policy',
    'legal.terms': 'Terms of Service',
    'legal.support': 'Support',
    'legal.deleteAccount': 'Delete your account',
    'legal.lastUpdated': 'Last updated',
    'legal.backToApp': 'Back to the app overview',

    'privacy.dataTitle': 'Information we collect',
    'privacy.dataLead':
      'The information this app collects is listed below. It matches what is declared on the App Store and Google Play.',
    'privacy.dataEmpty': 'This app does not collect personal information.',
    'privacy.col.category': 'Category',
    'privacy.col.items': 'What is collected',
    'privacy.col.purpose': 'Why',
    'privacy.col.shared': 'Shared',
    'privacy.col.required': 'Required',
    'privacy.thirdTitle': 'Third-party services',
    'privacy.thirdLead':
      'Some of the information above is processed or stored on the following third-party services. Please review their privacy policies as well.',
    'privacy.thirdEmpty': 'No information is shared with third-party services.',
    'privacy.col.service': 'Service',
    'privacy.col.role': 'Used for',
    'privacy.col.policy': 'Policy',
    'privacy.yes': 'Yes',
    'privacy.no': 'No',
    'privacy.required': 'Required',
    'privacy.optional': 'Optional',
    'privacy.contactTitle': 'Contact',
    'privacy.contactBody':
      'For questions about this privacy policy or how your information is handled, please get in touch:',

    'support.title': 'Support',
    'support.lead':
      'Questions, bug reports, and feature requests are all welcome — just send an email to the address below.',
    'support.emailLabel': 'Email support',
    'support.responseNote':
      'I usually reply within three business days. This is a solo project, so occasionally it takes a little longer.',
    'support.emailPending': 'A public support email address is being set up.',
    'support.tips': 'What to include in your message',
    'support.tip.device': 'Your device and OS version (e.g. iPhone 15 / iOS 18.5)',
    'support.tip.version': 'The app version, shown at the bottom of the settings screen',
    'support.tip.steps': 'The steps that led to the problem, and what actually happened',
    'support.related': 'Related pages',

    'delete.title': 'Deleting your account and data',
    'delete.lead':
      'If you would like your account and its associated data deleted, use either of the methods below.',
    'delete.inAppTitle': 'Option 1: Delete from inside the app (recommended)',
    'delete.inAppLead': 'If you can still sign in, you can delete your account immediately in the app.',
    'delete.inApp.step1': 'Open the app and go to Settings.',
    'delete.inApp.step2': 'Open Account.',
    'delete.inApp.step3': 'Choose "Delete account" and confirm.',
    'delete.webTitle': 'Option 2: Request deletion by email',
    'delete.webLead':
      'If you have already uninstalled the app or cannot sign in, email us instead. Please write from the address registered to your account, with "Delete my account" as the subject. We will verify your identity and then delete the account.',
    'delete.deletedTitle': 'What gets deleted',
    'delete.deletedLead': 'When you request deletion, all of the following is removed.',
    'delete.retentionTitle': 'How long deletion takes',
    'delete.retentionBody':
      'Once a deletion request is accepted, data is removed from the live system promptly. Complete erasure from backups takes up to {days} days. The data is not used for any purpose during that window.',
    'delete.retentionLegal':
      'Where a record must be retained to comply with the law, that record is kept only for as long as the law requires.',

    'contact.title': 'Contact',
    'contact.lead': 'For anything about the apps, or to discuss working together.',

    'sitePrivacy.title': 'About this site',

    'footer.legal': 'Policies',
    'footer.contact': 'Contact',
  },
} as const;

export type UiKey = keyof (typeof ui)['ja'];
