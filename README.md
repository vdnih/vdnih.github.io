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
| `npm run preflight` | ストア提出前チェック（未記入のプレースホルダが残っていないか） |
| `npm run images` | OGP 画像とアイコンを `public/` に再生成 |

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

## ストア配信アプリ

App Store / Google Play に出すアプリは、GitHub リポジトリのショーケースである `projects.json` とは別に **`src/data/apps.json`** で管理します。ストアリンク・収集データ・法務文書・サポート窓口という追加情報が必要なためです。

アプリを 1 件足すと、次のページが ja / en の両方に生成されます。

| ルート | 用途 | 要求元 |
| --- | --- | --- |
| `/apps/{id}/` | アプリ紹介 | Apple の Marketing URL / Play の Website |
| `/apps/{id}/privacy/` | プライバシーポリシー | **Apple・Google 両方で必須** |
| `/apps/{id}/support/` | サポート | **Apple Guideline 1.5 で必須** |
| `/apps/{id}/terms/` | 利用規約 | 任意 |
| `/apps/{id}/delete-account/` | アカウント削除の受付 | **`hasAccounts: true` のとき Google Play で必須** |

- 収集データの表は `apps.json` の `dataCollected` から生成されます。**Play の Data safety フォームおよび Apple の App Privacy 申告と必ず一致させてください。**申告と本文の食い違いは審査落ちの定番です。
- ポリシーの散文は `src/content/legal/{lang}/{appId}/*.md` に置きます。プライバシーポリシーが `privacy-1.md` と `privacy-2.md` に分かれているのは、その間に上記の表を差し込むためです。
- 連絡先メールは `profile.json` の `supportEmail` 1 箇所だけで管理します。未設定のあいだは各ページに「準備中」と表示され、偽のアドレスが出ることはありません。

提出前に必ず実行してください。

```sh
npm run preflight            # 全アプリ
npm run preflight friendnote # 特定のアプリ
```

`draft: true` のまま、あるいは `（要記入）` が残っているとここで落ちます。

## デプロイ

`main` への push で `.github/workflows/deploy.yml` が走り、GitHub Pages へ公開されます。

> [!IMPORTANT]
> 初回のみ、リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に変更する必要があります。

Pull Request と `main` 以外への push では `.github/workflows/ci.yml` が型チェックとビルドを実行します。

## 構成

```
src/
├── components/     # Header / Hero / ProjectCard / AppDetail / 法務ページ本体 など
├── content/legal/  # 法務文書の Markdown（{lang}/{appId|site}/*.md）
├── data/           # profile.json / projects.json / apps.json / types.ts
├── i18n/           # UI ラベル辞書とロケール解決ユーティリティ
├── layouts/        # BaseLayout（<head>・OGP・hreflang）/ LegalLayout
├── lib/            # apps.ts（アプリ取得・パス生成・構造化データ）
├── pages/          # ja は直下、en は en/ 配下。中身は数行のラッパー
└── styles/         # global.css（カスタムプロパティ・ライト/ダーク）
```

ページの実体はすべて `components/` にあり、`pages/` 配下の ja / en 両方のファイルはそれを呼ぶだけです。文言の分岐は i18n 辞書と `Localized` 型のデータに寄せているので、マークアップを二重に持ちません。ページを 1 つ足すときは `src/pages/` と `src/pages/en/` の両方にラッパーを置き、`src/i18n/ui.ts` の `ja` / `en` 双方にキーを足してください（片方だけだと型エラーでビルドが落ちます）。
