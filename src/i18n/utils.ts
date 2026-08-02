import type { Lang } from '../data/types';
import { defaultLang, ui, type UiKey } from './ui';

/** URL のパス先頭から言語を判定する。未知のプレフィックスは既定言語にフォールバックする。 */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang && maybeLang in ui) return maybeLang as Lang;
  return defaultLang;
}

/** 指定言語の UI ラベルを引く関数を返す。 */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * サイト内パスに言語プレフィックスを付ける。
 * 既定言語 (ja) はプレフィックスなし、en は /en 配下。
 */
export function localizePath(path: string, lang: Lang): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return normalized;
  return normalized === '/' ? `/${lang}/` : `/${lang}${normalized}`;
}

/** 現在の言語から見た「もう一方の言語」を返す。 */
export function getAlternateLang(lang: Lang): Lang {
  return lang === 'ja' ? 'en' : 'ja';
}

/** 現在の URL に対応する、もう一方の言語のパスを返す。 */
export function getAlternatePath(url: URL, lang: Lang): string {
  const stripped = url.pathname.replace(/^\/(ja|en)(?=\/|$)/, '') || '/';
  return localizePath(stripped, getAlternateLang(lang));
}
