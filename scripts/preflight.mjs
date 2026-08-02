#!/usr/bin/env node
/**
 * ストア提出前チェック。
 *
 *   npm run preflight              全アプリを検査
 *   npm run preflight friendnote   特定のアプリだけ検査
 *
 * App Store / Google Play に提出する URL は審査のたびに必ず開かれるため、
 * プレースホルダのまま提出すると確実にリジェクトされる。
 * 通常の `npm run build` は警告にとどめてデプロイを止めず、
 * 「本当に出す直前」の関門としてこのスクリプトを別に用意している。
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (relative) => JSON.parse(readFileSync(join(root, relative), 'utf8'));

const profile = readJson('src/data/profile.json');
const apps = readJson('src/data/apps.json');

/** 未記入を示すマーカー。どれか 1 つでも含まれていれば未完成とみなす */
const PLACEHOLDER_MARKERS = ['TODO', 'example.com', '要記入', 'TO BE FILLED'];

const hasPlaceholder = (value) => {
  if (typeof value === 'string') {
    return PLACEHOLDER_MARKERS.some((marker) => value.includes(marker));
  }
  if (Array.isArray(value)) return value.some(hasPlaceholder);
  if (value && typeof value === 'object') return Object.values(value).some(hasPlaceholder);
  return false;
};

const errors = [];
const warnings = [];

/* ---- 開発者共通 ---------------------------------------------------- */

if (!profile.supportEmail || hasPlaceholder(profile.supportEmail)) {
  errors.push(
    'profile.json: supportEmail が未設定です。' +
      'Google Play は開発者連絡先メールの一般公開を必須とし、' +
      'Apple も Guideline 1.5 でサポート URL 上に到達可能な連絡手段を求めます。',
  );
}

/* ---- アプリごと ---------------------------------------------------- */

const target = process.argv[2];
const targets = target ? apps.filter((app) => app.id === target) : apps;

if (target && targets.length === 0) {
  console.error(`✗ apps.json に "${target}" というアプリがありません。`);
  process.exit(1);
}

for (const app of targets) {
  const label = `apps.json[${app.id}]`;

  if (app.draft) {
    errors.push(
      `${label}: draft: true のままです。内容を確定させてから false にしてください。`,
    );
  }

  for (const field of ['tagline', 'description', 'features']) {
    if (hasPlaceholder(app[field])) {
      errors.push(`${label}: ${field} にプレースホルダが残っています。`);
    }
  }

  if (hasPlaceholder(app.dataCollected)) {
    errors.push(
      `${label}: dataCollected にプレースホルダが残っています。` +
        'ここは Google Play の Data safety フォームおよび Apple の App Privacy 申告と' +
        '一致させる必要があります。',
    );
  }

  if (!app.dataCollected?.length) {
    warnings.push(
      `${label}: dataCollected が空です。本当に何も収集しないなら問題ありませんが、` +
        'ストアの申告と一致しているか確認してください。',
    );
  }

  if (!app.policyUpdatedAt || !/^\d{4}-\d{2}-\d{2}$/.test(app.policyUpdatedAt)) {
    errors.push(`${label}: policyUpdatedAt が YYYY-MM-DD 形式で入っていません。`);
  }

  if (app.hasAccounts && !(app.deletionGraceDays > 0)) {
    errors.push(
      `${label}: hasAccounts が true なのに deletionGraceDays が設定されていません。` +
        'Google Play はアカウント削除時のデータ保持期間の明示を求めます。',
    );
  }

  if (app.stage === 'released' && !app.stores.appStore && !app.stores.googlePlay) {
    errors.push(`${label}: stage が released なのにストア URL が 1 つも入っていません。`);
  }

  if (app.platforms?.includes('ios') && !app.stores.appStore && app.stage === 'released') {
    warnings.push(`${label}: iOS 対応なのに appStore URL が空です。`);
  }
  if (app.platforms?.includes('android') && !app.stores.googlePlay && app.stage === 'released') {
    warnings.push(`${label}: Android 対応なのに googlePlay URL が空です。`);
  }

  if (!app.icon) {
    warnings.push(`${label}: icon が未設定です。アプリ LP と OGP 画像の見栄えに影響します。`);
  }
}

/* ---- 出力 ----------------------------------------------------------- */

for (const warning of warnings) console.warn(`⚠ ${warning}`);

if (errors.length > 0) {
  console.error('');
  for (const error of errors) console.error(`✗ ${error}`);
  console.error('');
  console.error(`ストア提出前チェックに失敗しました（${errors.length} 件）。`);
  process.exit(1);
}

const scope = target ? `"${target}"` : `${apps.length} 件のアプリ`;
console.log(`✓ ストア提出前チェックを通過しました（${scope}）。`);
