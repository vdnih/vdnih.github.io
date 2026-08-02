# vdnih.github.io

個人開発ポートフォリオサイト。[https://vdnih.github.io](https://vdnih.github.io)

Astro で構築し、GitHub Actions で GitHub Pages にデプロイしています。日本語（`/`）と英語（`/en/`）の 2 ロケール。

## 開発

```sh
npm install
npm run dev      # http://localhost:4321
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | `dist/` に静的ビルド |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run check` | `astro check`（型チェック） |
| `npm run sync` | 掲載リポジトリの最終更新日・ライセンスを GitHub API から取り直す |

## 掲載内容の編集

サイトの内容はすべて `src/data/` の JSON に入っています。ビルド時に外部 API は叩きません。

- **`src/data/projects.json`** — 掲載プロダクト。追加・削除・並び替えはこのファイルだけで完結します。
  - `featured: true` にすると「主要プロダクト」として上段に大きく表示されます
  - `status` は `active` / `maintenance` / `experiment`
  - `tech` は技術スタックセクションの集計にもそのまま使われます（ハードコードなし）
  - `description` は `ja` / `en` の両方が必要です
- **`src/data/profile.json`** — 名前・アバター・リンクと、ヒーロー用の短い `intro` / About 用の長い `bio`（`bio` は空行で段落が分かれます）
- **`src/data/types.ts`** — 上記 2 ファイルの型定義

UI のラベル（見出し・ボタン文言など）は `src/i18n/ui.ts` にまとまっています。`ja` にキーを足したら `en` にも足してください（型で揃っていることを保証しています）。

`npm run sync` は `projects.json` の `updatedAt` と `license` だけを GitHub API の値で更新します。`homepage` や `description` は手で書いた値のほうが正確なので上書きしません。

## デプロイ

`main` への push で `.github/workflows/deploy.yml` が走り、GitHub Pages へ公開されます。

> [!IMPORTANT]
> 初回のみ、リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に変更する必要があります。

Pull Request と `main` 以外への push では `.github/workflows/ci.yml` が型チェックとビルドを実行します。

## 構成

```
src/
├── components/   # Header / Hero / ProjectCard / TechStack など
├── data/         # profile.json / projects.json / types.ts
├── i18n/         # UI ラベル辞書とロケール解決ユーティリティ
├── layouts/      # BaseLayout（<head>・OGP・hreflang）
├── pages/        # index.astro（ja）/ en/index.astro / 404.astro
└── styles/       # global.css（カスタムプロパティ・ライト/ダーク）
```

ja / en のページはどちらも `HomeSections.astro` を呼ぶだけで、文言の分岐は i18n 辞書と `description[lang]` に寄せています。マークアップを二重に持たない構成です。
