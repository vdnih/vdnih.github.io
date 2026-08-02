#!/usr/bin/env node
/**
 * OGP 画像とアイコンを public/ に生成する。
 *
 *   npm run images
 *
 * 生成物はリポジトリにコミットしてあるので、通常のビルドでは実行不要。
 * ロゴやキャッチコピーを変えたときだけ実行する。
 *
 * ヘッドレス Chrome で HTML をスクリーンショットしている。
 * Chrome のパスは CHROME_PATH で上書きできる。
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
if (!chrome) {
  console.error('Chrome が見つかりません。CHROME_PATH を設定してください。');
  process.exit(1);
}

const MARK = `
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="#1d1b17" />
    <path d="M16 21 L26 43 L36 21" fill="none" stroke="#e08a5f" stroke-width="6"
          stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="45" cy="40" r="4" fill="#e08a5f" />
  </svg>`;

const FONT_STACK =
  "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', 'Noto Sans JP', sans-serif";

/** OGP 画像。og:image は 1200x630 が標準 */
const ogHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#14130f;color:#f0ece4;
    font-family:${FONT_STACK};display:flex;flex-direction:column;
    justify-content:center;padding:0 92px;position:relative;overflow:hidden}
  .glow{position:absolute;width:760px;height:760px;right:-260px;top:-300px;
    background:radial-gradient(circle,rgba(224,138,95,.20) 0%,rgba(224,138,95,0) 68%)}
  .mark{display:flex;align-items:center;gap:22px;margin-bottom:40px}
  .mark svg{width:76px;height:76px}
  .handle{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:40px;font-weight:600;letter-spacing:-.02em}
  h1{font-size:76px;line-height:1.22;letter-spacing:-.02em;font-weight:700;max-width:940px}
  p{margin-top:30px;font-size:30px;line-height:1.55;color:#a49c8d;max-width:880px}
  .rule{margin-top:46px;width:132px;height:6px;border-radius:999px;background:#e08a5f}
</style></head><body>
  <div class="glow"></div>
  <div class="mark">${MARK}<span class="handle">vdnih</span></div>
  <h1>作りたいものを、作りたい形で。</h1>
  <p>個人開発者 — Flutter アプリ・Web サービス・AI エージェント</p>
  <div class="rule"></div>
</body></html>`;

/* ------------------------------------------------------------------ *
 * アイコン
 *
 * favicon.svg と同じマーク（角丸なしの正方形版）を自前でラスタライズする。
 * ヘッドレス Chrome は小さいサイズの SVG を意図した寸法で描画しないことが
 * あり、アイコンのように 1px のズレが目立つ用途では信用できないため、
 * 図形が単純なこの用途に限って直接ピクセルを塗っている。
 *
 * iOS / Android は角丸を OS 側でマスクするので、ここでは角を丸めない。
 * ------------------------------------------------------------------ */

const BG = [0x1d, 0x1b, 0x17];
const FG = [0xe0, 0x8a, 0x5f];

/** favicon.svg と同じ 64 単位の座標系で定義したマーク */
const MARK_GEOMETRY = {
  viewBox: 64,
  strokeWidth: 6,
  // M16 21 L26 43 L36 21（丸いキャップと繋ぎ目）
  segments: [
    [16, 21, 26, 43],
    [26, 43, 36, 21],
  ],
  dot: { cx: 45, cy: 40, r: 4 },
};

/** 点と線分の距離。線端の丸めはこの距離をそのまま半径として扱えばよい */
function distanceToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = dx * dx + dy * dy;
  const t =
    lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSquared));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

/** マークの内側なら true。単位は viewBox の 64 座標系 */
function isInsideMark(x, y) {
  const radius = MARK_GEOMETRY.strokeWidth / 2;
  for (const [x1, y1, x2, y2] of MARK_GEOMETRY.segments) {
    if (distanceToSegment(x, y, x1, y1, x2, y2) <= radius) return true;
  }
  const { cx, cy, r } = MARK_GEOMETRY.dot;
  return Math.hypot(x - cx, y - cy) <= r;
}

/** 最小限の PNG エンコーダ（8bit RGB、フィルタなし） */
function encodePng(size, pixels) {
  const stride = size * 3;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y += 1) {
    raw[y * (stride + 1)] = 0; // filter type: None
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  const chunk = (type, data) => {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body));
    return Buffer.concat([length, body, crc]);
  };

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  // 10-12: compression / filter / interlace はすべて 0

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** 4x4 のスーパーサンプリングでアンチエイリアスをかけてマークを描く */
function renderIcon(size) {
  const pixels = Buffer.alloc(size * size * 3);
  const scale = MARK_GEOMETRY.viewBox / size;
  const SAMPLES = 4;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      let hits = 0;
      for (let sy = 0; sy < SAMPLES; sy += 1) {
        for (let sx = 0; sx < SAMPLES; sx += 1) {
          const px = (x + (sx + 0.5) / SAMPLES) * scale;
          const py = (y + (sy + 0.5) / SAMPLES) * scale;
          if (isInsideMark(px, py)) hits += 1;
        }
      }

      const coverage = hits / (SAMPLES * SAMPLES);
      const offset = (y * size + x) * 3;
      for (let channel = 0; channel < 3; channel += 1) {
        pixels[offset + channel] = Math.round(BG[channel] + (FG[channel] - BG[channel]) * coverage);
      }
    }
  }

  return encodePng(size, pixels);
}

const icons = [
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'favicon-32.png', size: 32 },
];

for (const icon of icons) {
  writeFileSync(join(publicDir, icon.file), renderIcon(icon.size));
  console.log(`✓ public/${icon.file} (${icon.size}x${icon.size})`);
}

/* ---- OGP 画像はテキスト組みが必要なので Chrome で描画する ---- */

const work = mkdtempSync(join(tmpdir(), 'vdnih-images-'));
const ogPath = join(work, 'og.html');
writeFileSync(ogPath, ogHtml);

execFileSync(
  chrome,
  [
    // 旧ヘッドレスはビューポートがウィンドウより約 82px 低くなる。
    // new は window-size がそのまま描画領域になる。
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    `--screenshot=${join(publicDir, 'og.png')}`,
    `file://${ogPath}`,
  ],
  { stdio: 'ignore' },
);

console.log('✓ public/og.png (1200x630)');
