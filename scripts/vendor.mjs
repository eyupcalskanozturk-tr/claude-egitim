import { cpSync, mkdirSync, rmSync } from 'node:fs';

const nm = 'node_modules';
const reveal = 'ortak/vendor/reveal';

rmSync(reveal, { recursive: true, force: true });
mkdirSync(`${reveal}/plugin`, { recursive: true });
for (const dosya of ['reveal.js', 'reveal.css', 'reset.css']) {
  cpSync(`${nm}/reveal.js/dist/${dosya}`, `${reveal}/${dosya}`);
}
cpSync(`${nm}/reveal.js/plugin/notes`, `${reveal}/plugin/notes`, { recursive: true });
cpSync(`${nm}/reveal.js/LICENSE`, `${reveal}/LICENSE`);

mkdirSync('ortak/fonts', { recursive: true });
const fontlar = [
  ['inter', 'latin', 400], ['inter', 'latin-ext', 400],
  ['inter', 'latin', 700], ['inter', 'latin-ext', 700],
  ['poppins', 'latin', 700], ['poppins', 'latin-ext', 700],
];
for (const [aile, alt, agirlik] of fontlar) {
  const ad = `${aile}-${alt}-${agirlik}-normal.woff2`;
  cpSync(`${nm}/@fontsource/${aile}/files/${ad}`, `ortak/fonts/${ad}`);
}
// Lucide ikonları (MIT) — sadece kullanılanlar
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
