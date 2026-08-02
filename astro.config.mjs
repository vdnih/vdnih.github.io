// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // ユーザーサイト (vdnih.github.io) なので base は '/' のまま
  site: 'https://vdnih.github.io',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: { ja: 'ja-JP', en: 'en-US' },
      },
    }),
  ],
});
