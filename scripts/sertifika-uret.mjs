// Katılım belgelerini isim listesinden PDF olarak üretir.
//
// Kullanım:
//   node scripts/sertifika-uret.mjs <hafta> <liste.csv | liste.txt>
//
// Liste:
//   - Google Formlar yanıt tablosundan "Dosya > İndir > CSV" ile indirilen dosya
//     ("Ad Soyad" sütunu otomatik bulunur), ya da
//   - her satırda bir isim olan düz metin dosyası.
//   Listeye yalnızca eğitime GERÇEKTEN katılanları koy (yoklamadan).
//
// Çıktı (sertifika/cikti/hafta-N/):
//   - hepsi.pdf          → baskı için, her kişi bir A4 yatay sayfa
//   - kisiler/<Ad>.pdf   → WhatsApp / e-posta ile tek tek göndermek için
import { chromium } from '@playwright/test';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';

const kok = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [haftaArg, listeArg] = process.argv.slice(2);
const hafta = Number(haftaArg);
if (!(hafta >= 1 && hafta <= 4) || !listeArg) {
  console.error('Kullanım: node scripts/sertifika-uret.mjs <hafta 1-4> <liste.csv|liste.txt>');
  process.exit(1);
}

// ---------- Listeyi oku ----------
function csvSatirlari(metin) {
  const satirlar = []; let satir = [], alan = '', tirnak = false;
  for (let i = 0; i < metin.length; i++) {
    const c = metin[i];
    if (tirnak) {
      if (c === '"' && metin[i + 1] === '"') { alan += '"'; i++; }
      else if (c === '"') tirnak = false;
      else alan += c;
    } else if (c === '"') tirnak = true;
    else if (c === ',') { satir.push(alan); alan = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && metin[i + 1] === '\n') i++;
      satir.push(alan); satirlar.push(satir); satir = []; alan = '';
    } else alan += c;
  }
  if (alan || satir.length) { satir.push(alan); satirlar.push(satir); }
  return satirlar.filter((s) => s.some((a) => a.trim()));
}

// "AYŞE   yılmaz-KARA" → "Ayşe Yılmaz-Kara"
function duzgunAd(ad) {
  return ad.trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr-TR')
    .replace(/(^|[\s-])(\S)/g, (_, once, harf) => once + harf.toLocaleUpperCase('tr-TR'));
}

const ham = readFileSync(path.resolve(listeArg), 'utf8').replace(/^﻿/, '');
let adlar;
if (/\.csv$/i.test(listeArg)) {
  const [baslik, ...veri] = csvSatirlari(ham);
  const sutun = baslik.findIndex((b) => /ad\s*soyad/i.test(b));
  if (sutun < 0) { console.error('CSV içinde "Ad Soyad" sütunu bulunamadı. Başlıklar: ' + baslik.join(' | ')); process.exit(1); }
  adlar = veri.map((s) => s[sutun] || '');
} else {
  adlar = ham.split(/\r?\n/);
}
adlar = [...new Set(adlar.map(duzgunAd).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'tr'));
if (!adlar.length) { console.error('Listede isim yok.'); process.exit(1); }

// ---------- PDF üret ----------
const cikti = path.join(kok, 'sertifika', 'cikti', 'hafta-' + hafta);
rmSync(cikti, { recursive: true, force: true });
mkdirSync(path.join(cikti, 'kisiler'), { recursive: true });

const tarayici = await chromium.launch();
const sayfa = await tarayici.newPage();
const hatalar = [];
sayfa.on('pageerror', (e) => hatalar.push(e.message));
sayfa.on('requestfailed', (r) => hatalar.push('yüklenemedi: ' + r.url()));
await sayfa.goto(pathToFileURL(path.join(kok, 'sertifika', 'belge.html')).href + '?hafta=' + hafta);
await sayfa.evaluate(() => document.fonts.ready);
if (hatalar.length) { console.error(hatalar.join('\n')); process.exit(1); }

const pdf = (dosya) => sayfa.pdf({ path: dosya, preferCSSPageSize: true, printBackground: true });

await sayfa.evaluate(([h, a]) => window.belgeleriCiz(h, a), [hafta, adlar]);
await sayfa.evaluate(() => document.fonts.ready);
await pdf(path.join(cikti, 'hepsi.pdf'));

for (const ad of adlar) {
  await sayfa.evaluate(([h, a]) => window.belgeleriCiz(h, [a]), [hafta, ad]);
  await pdf(path.join(cikti, 'kisiler', ad.replace(/[\\/:*?"<>|]/g, '') + '.pdf'));
}
await tarayici.close();

console.log(`${adlar.length} kişi için ${hafta}. hafta belgeleri hazır:`);
console.log('  ' + path.relative(kok, path.join(cikti, 'hepsi.pdf')) + '  (baskı)');
console.log('  ' + path.relative(kok, path.join(cikti, 'kisiler')) + path.sep + '  (tek tek gönderim)');
