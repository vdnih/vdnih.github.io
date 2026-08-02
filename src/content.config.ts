import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// astro:content からの z の再エクスポートは Astro 7 で非推奨になった
import { z } from 'astro/zod';

/**
 * 法務文書のコレクション。
 *
 * パスの規約: src/content/legal/{lang}/{scope}/{doc}.md
 *   lang  … 'ja' | 'en'
 *   scope … アプリ ID（apps.json の id）または 'site'
 *   doc   … 'privacy-1' | 'privacy-2' | 'terms' など
 *
 * プライバシーポリシーが privacy-1 / privacy-2 に分かれているのは、
 * その間に apps.json 由来の「収集する情報」「利用している外部サービス」の
 * 表を差し込むため。表を JSON から生成することで、ストアの
 * Data safety / App Privacy 申告と本文がズレるのを防いでいる。
 *
 * ディレクトリ名に言語を持たせているのは、glob ローダーが
 * ファイル名のドットを ID 生成時に加工するのを避けるため。
 */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { legal };
