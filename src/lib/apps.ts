import appsData from '../data/apps.json';
import profileData from '../data/profile.json';
import type { Lang, Profile, StoreApp } from '../data/types';
import { languages } from '../i18n/ui';

export const apps = appsData as StoreApp[];
export const profile = profileData as Profile;

/** 連絡先メールが未設定のまま公開されるのを検知するためのマーカー */
const PLACEHOLDER_MARKERS = ['TODO', 'example.com'];

/**
 * 連絡先メールがプレースホルダのままかどうか。
 * true のときは画面に mailto を出さず「準備中」と表示し、
 * 偽の連絡先がストア審査担当やユーザーの目に触れないようにする。
 */
export function isPlaceholderEmail(email: string): boolean {
  return PLACEHOLDER_MARKERS.some((marker) => email.includes(marker));
}

export const supportEmail = profile.supportEmail;
export const supportEmailReady = !isPlaceholderEmail(supportEmail);

/** id からアプリを引く。見つからなければビルドを落とす */
export function getApp(id: string): StoreApp {
  const app = apps.find((a) => a.id === id);
  if (!app) throw new Error(`Unknown app id: ${id}`);
  return app;
}

/** アカウントを持つアプリ（= アカウント削除ページが必要なアプリ） */
export function appsWithAccounts(): StoreApp[] {
  return apps.filter((app) => app.hasAccounts);
}

/**
 * /apps/[app]/* 系ページの getStaticPaths 用。
 * ja 側と en 側の両方から呼ぶ想定で、生成されるパスは
 * ルートファイルの置き場所（src/pages/ か src/pages/en/）で決まる。
 */
export function getAppPaths() {
  return apps.map((app) => ({
    params: { app: app.id },
    props: { app },
  }));
}

/** アカウントを持つアプリだけのパス。delete-account ルートで使う */
export function getAccountAppPaths() {
  return appsWithAccounts().map((app) => ({
    params: { app: app.id },
    props: { app },
  }));
}

/**
 * アプリ配下ページの URL を組み立てる。
 * localizePath と同じ規約（ja はプレフィックスなし、en は /en 配下）に従う。
 */
export function appPath(id: string, sub: string, lang: Lang): string {
  const base = sub ? `/apps/${id}/${sub}` : `/apps/${id}`;
  return lang === 'ja' ? `${base}/` : `/en${base}/`;
}

/** 法務文書の最終更新日を、言語に合わせた表記で返す */
export function formatDate(iso: string, lang: Lang): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(lang === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** トップページに出す開発者の構造化データ */
export function personJsonLd(lang: Lang, site: URL | undefined): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.handle,
    description: profile.intro[lang],
    image: profile.avatar,
    ...(site ? { url: site.href } : {}),
    sameAs: profile.links.map((link) => link.url),
    knowsAbout: ['Flutter', 'Next.js', 'Firebase', 'TypeScript', 'Python'],
  };
}

/** 空行区切りのテキストを段落配列にする（profile.bio と同じ扱い） */
export function toParagraphs(text: string): string[] {
  return text.split('\n\n').filter(Boolean);
}

/** 型の取り違えを防ぐための再エクスポート */
export const supportedLangs = Object.keys(languages) as Lang[];
