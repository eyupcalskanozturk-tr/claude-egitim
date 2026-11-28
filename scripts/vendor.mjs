import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

const nm = 'node_modules';
const reveal = 'ortak/vendor/reveal';

rmSync(reveal, { recursive: true, force: true });
mkdirSync(`${reveal}/plugin`, { recursive: true });
for (const dosya of ['reveal.js', 'reveal.css', 'reset.css']) {
  cpSync(`${nm}/reveal.js/dist/${dosya}`, `${reveal}/${dosya}`);
}
cpSync(`${nm}/reveal.js/plugin/notes`, `${reveal}/plugin/notes`, { recursive: true });
cpSync(`${nm}/reveal.js/LICENSE`, `${reveal}/LICENSE`);

// Yazı tipleri (@fontsource, OFL) — latin + latin-ext (Türkçe karakterler)
rmSync('ortak/fonts', { recursive: true, force: true });
mkdirSync('ortak/fonts', { recursive: true });
const ARALIK = {
  latin: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  'latin-ext': 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
};
const aileler = [
  ['fraunces', 'Fraunces', [600, 700], [500]], // 500 italik: katılım belgesindeki isim
  ['plus-jakarta-sans', 'Plus Jakarta Sans', [400, 600, 700]],
  ['caveat', 'Caveat', [700]],
];
let css = '/* scripts/vendor.mjs tarafından üretilir, elle düzenlemeyin. Kaynak: @fontsource (OFL). */\n';
for (const [paket, ad, agirliklar, italikler = []] of aileler) {
  const turler = [...agirliklar.map((a) => [a, 'normal']), ...italikler.map((a) => [a, 'italic'])];
  for (const [agirlik, stil] of turler) {
    for (const alt of ['latin-ext', 'latin']) {
      const dosya = `${paket}-${alt}-${agirlik}-${stil}.woff2`;
      cpSync(`${nm}/@fontsource/${paket}/files/${dosya}`, `ortak/fonts/${dosya}`);
      css += `@font-face { font-family: '${ad}'; font-style: ${stil}; font-weight: ${agirlik}; font-display: swap; src: url(../fonts/${dosya}) format('woff2'); unicode-range: ${ARALIK[alt]}; }\n`;
    }
  }
}
writeFileSync('ortak/css/fontlar.css', css);

// Lucide ikonları (ISC) — sadece kullanılanlar
const ikonlar = [
  'brain', 'sparkles', 'message-circle', 'message-square-text', 'languages', 'map', 'navigation', 'smartphone',
  'image', 'file-text', 'list-checks', 'lightbulb', 'users', 'target', 'palette', 'search', 'search-check',
  'shield-alert', 'lock', 'key-round', 'id-card', 'phone', 'map-pin', 'stethoscope', 'hand-heart', 'droplet',
  'backpack', 'heart-handshake', 'graduation-cap', 'book-open', 'laptop', 'keyboard', 'globe', 'repeat',
  'table', 'badge-check', 'clipboard-check', 'megaphone', 'pen-line', 'wand-sparkles', 'scale', 'eye',
  'landmark', 'circle-help', 'mail', 'calendar', 'clock', 'coffee', 'drama', 'bot', 'zap', 'log-out',
  'shopping-cart', 'camera', 'mic', 'check', 'x', 'house', 'siren', 'list-ordered', 'quote',
];
rmSync('ortak/ikonlar', { recursive: true, force: true });
mkdirSync('ortak/ikonlar', { recursive: true });
for (const ad of ikonlar) cpSync(`${nm}/lucide-static/icons/${ad}.svg`, `ortak/ikonlar/${ad}.svg`);
cpSync(`${nm}/lucide-static/LICENSE`, 'ortak/ikonlar/LICENSE');

console.log('vendor: tamam');
