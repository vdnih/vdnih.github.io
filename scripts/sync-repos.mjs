#!/usr/bin/env node
/**
 * src/data/projects.json に載っているリポジトリのメタデータを GitHub API から取り直し、
 * license / updatedAt を最新の値に書き戻す。
 *
 * 手動実行のみ（`npm run sync`）。CI からは呼ばない。
 * サイトのビルドを GitHub API に依存させないため、取得結果はコミットして使う。
 *
 * GITHUB_TOKEN があればレート制限緩和のために使う（公開リポジトリのみなので必須ではない）。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const PROJECTS_PATH = fileURLToPath(new URL('../src/data/projects.json', import.meta.url));

/** ISO 日時を YYYY-MM に丸める */
function toYearMonth(iso) {
  return iso.slice(0, 7);
}

async function fetchRepo(fullName) {
  const headers = {
    accept: 'application/vnd.github+json',
    'x-github-api-version': '2022-11-28',
    'user-agent': 'vdnih-portfolio-sync',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${fullName}`, { headers });
  if (!response.ok) {
    throw new Error(`GET /repos/${fullName} -> ${response.status} ${response.statusText}`);
  }
  return response.json();
}

const projects = JSON.parse(await readFile(PROJECTS_PATH, 'utf8'));
const changes = [];

for (const project of projects) {
  let repo;
  try {
    repo = await fetchRepo(project.repo);
  } catch (error) {
    console.warn(`! ${project.repo}: ${error.message} (skipped)`);
    continue;
  }

  // homepage / status / description は手で書いた値のほうが正確なので同期しない。
  // （例: gurogu_yes_no の GitHub Pages URL はリポジトリの homepage 欄に入っていない）
  const updatedAt = toYearMonth(repo.pushed_at);
  const license = repo.license?.spdx_id ?? null;

  if (project.updatedAt !== updatedAt) {
    changes.push(`${project.repo}: updatedAt ${project.updatedAt} -> ${updatedAt}`);
    project.updatedAt = updatedAt;
  }
  if (project.license !== license) {
    changes.push(`${project.repo}: license ${project.license} -> ${license}`);
    project.license = license;
  }

  console.log(`✓ ${project.repo}`);
}

if (changes.length === 0) {
  console.log('\nNo changes.');
} else {
  await writeFile(PROJECTS_PATH, `${JSON.stringify(projects, null, 2)}\n`, 'utf8');
  console.log(`\nUpdated src/data/projects.json:\n${changes.map((c) => `  - ${c}`).join('\n')}`);
}
