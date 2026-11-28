// Katılım belgesi önizlemeleri: dört parça + birleşik 2×2 görünüm (PNG).
// Kullanım: node scripts/sertifika-onizle.mjs ["Ad Soyad"]
import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const kok = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
const sayfaUrl = pathToFileURL(path.join(kok, 'sertifika', 'belge.html')).href;
const cikti = path.join(kok, 'sertifika', 'onizleme');
mkdirSync(cikti, { recursive: true });
const ad = encodeURIComponent(process.argv[2] || 'Ayşe Yılmaz');

const tarayici = await chromium.launch();
const hatalar = [];
async function ciz(sorgu, dosya, genislik, yukseklik, olcek) {
  const sayfa = await tarayici.newPage({ viewport: { width: genislik, height: yukseklik }, deviceScaleFactor: olcek });
  sayfa.on('pageerror', (e) => hatalar.push(dosya + ': ' + e.message));
  sayfa.on('requestfailed', (r) => hatalar.push(dosya + ': yüklenemedi ' + r.url()));
  await sayfa.goto(sayfaUrl + sorgu);
  await sayfa.evaluate(() => document.fonts.ready);
  await sayfa.waitForTimeout(300);
  const olcum = await sayfa.evaluate(() => [...document.querySelectorAll('.sayfa')].map((s) => {
    const k = s.getBoundingClientRect();
    const icerik = s.querySelector('.icerik').getBoundingClientRect();
    const tasan = [...s.querySelectorAll('.icerik *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && (r.left < k.left || r.right > k.right || r.top < k.top || r.bottom > k.bottom); }).length;
    return { genislik: Math.round(k.width), yukseklik: Math.round(k.height), icerik: [Math.round(icerik.left - k.left), Math.round(icerik.top - k.top), Math.round(icerik.right - k.left), Math.round(icerik.bottom - k.top)], tasan };
  }));
  await sayfa.screenshot({ path: path.join(cikti, dosya), clip: { x: 0, y: 0, width: genislik, height: yukseklik } });
  await sayfa.close();
  return olcum;
}

for (let h = 1; h <= 4; h++) console.log('parca-' + h, JSON.stringify(await ciz(`?hafta=${h}&ad=${ad}`, `parca-${h}.png`, 1123, 794, 2)));
console.log('birlesik', JSON.stringify(await ciz(`?tum=1&ad=${ad}`, 'birlesik.png', 2245, 1587, 1)));
await tarayici.close();
console.log(hatalar.length ? 'HATALAR:\n' + hatalar.join('\n') : 'Hata yok');
