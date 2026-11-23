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
console.log('vendor: tamam');
