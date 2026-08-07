export type Lang = 'ja' | 'en';

/** 各言語の文字列を持つフィールド */
export type Localized = Record<Lang, string>;

/**
 * プロダクトの状態。
 * - active:      現在アクティブに開発している
 * - maintenance: 動いているが積極的な開発はしていない
 * - experiment:  プロトタイプ・実験・小物
 */
export type ProjectStatus = 'active' | 'maintenance' | 'experiment';

export interface Project {
  /** URL やキーに使う識別子 */
  id: string;
  /** 画面に出す表示名 */
  name: string;
  /** owner/repo 形式。非公開リポジトリなど GitHub に出さない場合は null */
  repo: string | null;
  /** GitHub リポジトリ URL（無ければ null） */
  url: string | null;
  /** デモ・公開サイトの URL（無ければ null） */
  homepage: string | null;
  /** トップに大きく出すかどうか */
  featured: boolean;
  status: ProjectStatus;
  /** 技術タグ。Tech Stack セクションの集計にも使う */
  tech: string[];
  /** SPDX 表記のライセンス（無ければ null） */
  license: string | null;
  /** 開始時期 YYYY-MM */
  startedAt: string;
  /** 最終更新 YYYY-MM（scripts/sync-repos.mjs で更新される） */
  updatedAt: string;
  description: Localized;
}

export interface ProfileLink {
  label: string;
  url: string;
}

export interface Profile {
  handle: string;
  name: string;
  avatar: string;
  tagline: Localized;
  /** ヒーローに出す短い紹介 */
  intro: Localized;
  /** About セクションに出す長めの紹介 */
  bio: Localized;
  links: ProfileLink[];
}
