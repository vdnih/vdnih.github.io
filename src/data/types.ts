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
  /** owner/repo 形式 */
  repo: string;
  /** GitHub リポジトリ URL */
  url: string;
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
  /**
   * 一般公開する連絡先メールアドレス。
   * Google Play は開発者連絡先メールの一般公開を必須としており、
   * Apple も Guideline 1.5 でサポート URL 上に到達可能な連絡手段を求める。
   * scripts/preflight.mjs がプレースホルダのままでないことを検査する。
   */
  supportEmail: string;
  /** 開発を始めた年。Hero の「開発歴」に使う */
  startYear: number;
  tagline: Localized;
  /** ヒーローに出す短い紹介 */
  intro: Localized;
  /** About セクションに出す長めの紹介 */
  bio: Localized;
  links: ProfileLink[];
}

/* ------------------------------------------------------------------ *
 * ストア配信アプリ
 *
 * projects.json（GitHub リポジトリのショーケース）とは別レイヤー。
 * App Store / Google Play に出すアプリは、ストアリンク・収集データ・
 * 法務文書・サポート窓口という追加情報を必要とするため型を分けている。
 * ------------------------------------------------------------------ */

/** 配信プラットフォーム */
export type Platform = 'ios' | 'android';

/**
 * アプリの公開状態。
 * - development: 開発中。ストア未提出
 * - testing:     クローズドテスト・審査中
 * - released:    ストア公開済み
 */
export type AppStage = 'development' | 'testing' | 'released';

/**
 * 収集するデータの 1 項目。
 *
 * Google Play の Data safety フォームおよび Apple の App Privacy 申告と
 * 1 対 1 で対応させること。こことストア申告がズレると審査で落ちる。
 */
export interface DataCategory {
  /** Play の Data safety のカテゴリ名に合わせる（例: 'アカウント情報'） */
  label: Localized;
  /** 具体的に何を集めるか */
  items: Localized;
  /** 何のために集めるか */
  purpose: Localized;
  /** 第三者と共有するか */
  shared: boolean;
  /** ユーザーが提供を拒否できるか（必須項目なら false） */
  optional: boolean;
}

/** アプリが利用する第三者サービス／SDK */
export interface ThirdParty {
  name: string;
  /** 何に使っているか */
  role: Localized;
  /** 提供元のプライバシーポリシー URL */
  privacyUrl: string;
}

/** ストア掲載 URL。未公開のうちは null */
export interface StoreLinks {
  appStore: string | null;
  googlePlay: string | null;
}

export interface StoreApp {
  /** URL に使う識別子。/apps/{id}/ になる */
  id: string;
  /** 画面に出す表示名 */
  name: string;
  /** 対応プラットフォーム */
  platforms: Platform[];
  stage: AppStage;
  stores: StoreLinks;
  /** アイコン画像のパス（public/ からの絶対パス）。無ければ null */
  icon: string | null;
  tagline: Localized;
  /** アプリ LP に出す説明。空行区切りで段落になる */
  description: Localized;
  /** 主な機能。LP に箇条書きで出す */
  features: Localized[];
  /**
   * ユーザーアカウント（サインアップ／ログイン）を持つか。
   * true の場合 Google Play はアカウント削除リクエスト URL を必須とするため、
   * /apps/{id}/delete-account が生成される。
   */
  hasAccounts: boolean;
  /** アカウント削除後、バックアップから完全に消えるまでの日数 */
  deletionGraceDays: number;
  dataCollected: DataCategory[];
  thirdParties: ThirdParty[];
  /** 法務文書の最終更新日 YYYY-MM-DD */
  policyUpdatedAt: string;
  /**
   * 内容が未確定のプレースホルダかどうか。
   * true の間は scripts/preflight.mjs が失敗し、ストア提出前に気付ける。
   */
  draft: boolean;
}
