# Hafta 1 Sunum Sitesi — Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Genç Kızılay ÇOMÜ "Claude ile Tanışma" eğitiminin 28 slaytlık, etkileşimli, tahtaya yansıtılacak sunum sitesini ve seri vitrinini GitHub Pages'e hazır hâle getirmek.

**Architecture:** Derleme adımı olmayan statik site. reveal.js 5.2.1 (repoya kopyalanmış) slayt motorunu, `ortak/` altındaki tema CSS'i ve küçük bir etkileşim betiği (seçmeli soru, boşluk doldurma, sayaç) bütün haftaların ortak şablonunu oluşturur. Her hafta `hafta-N/index.html` içinde sadece içerik barındırır. Testler Playwright ile yerel `http-server` üzerinde koşar.

**Tech Stack:** HTML/CSS/vanilla JS, reveal.js 5.2.1 (+ notes eklentisi), Poppins/Inter (@fontsource woff2), Playwright 1.55.0, http-server 14.1.1, qrcode 1.5.4.

**Spec:** `docs/superpowers/specs/2026-11-23-hafta-1-design.md`

## Global Constraints

- Bütün dosya yolları **göreli** olmalı (`../ortak/...`). Site `https://eyupcalskanozturk-tr.github.io/claude-egitim/` alt dizininden yayınlanır, `/` ile başlayan yol bozulur.
- Bağımlılık sürümleri **tam sabit** (`^` yok): reveal.js `5.2.1`, @playwright/test `1.55.0`, @fontsource/inter `5.2.6`, @fontsource/poppins `5.2.6`, http-server `14.1.1`, qrcode `1.5.4`.
- Sunum hiçbir dış CDN'e bağlı değil. reveal.js ve yazı tipleri `ortak/vendor/` ve `ortak/fonts/` altına kopyalanır ve repoya commit'lenir.
- Renkler: turuncu `#D97757`, krem `#FAF9F5`, koyu `#141413`, açık gri `#E8E6DC`, yeşil `#788C5D`, gri `#B0AEA5`. Turuncu **gövde metninde kullanılmaz** (başlık çizgisi, etiket, sayaç, boşluk cevabı gibi büyük vurgu alanları hariç).
- Başlık (h2) ≥ 64px, gövde ≥ 36px. Anlatım slaytlarında liste başına en fazla 3 madde.
- Slayt tuvali 1920×1080 (16:9). Hiçbir slayt bu alandan taşmaz.
- Veri toplanmaz, `localStorage` kullanılmaz. Etkileşimler sayfa yenilenince sıfırlanır.
- Arayüz metinleri Türkçe.
- Her sayfada `<link rel="icon" href="data:,">` bulunur (favicon 404'ünü önler).
- **Paket ve tarayıcı kurulumları** (`npm install`, `npx playwright install`) sandbox içindeki Bash/PowerShell'de kalıcı olmuyor. Bunları `run_in_terminal` aracıyla, `C:\Users\eyupc\claude-egitim` klasöründe çalıştır.

## Review Focus

1. **Butona tıkladıktan sonra Space/→ ile ilerlemek:** Eğitmen bir şıkka veya sayaç düğmesine tıklayıp Space'e basarsa düğme tekrar tetiklenmemeli, slayt ilerlemeli. Tıklamadan sonra odak düğmede kalmamalı. → Task 4 ve Task 6 testleri.
2. **Sayaç çalışırken slayt değiştirmek:** Eğitmen sayaç çalışırken başka slayda geçip dönerse sayaç geçen süreyi doğru göstermeli (zaman `Date.now()` farkından hesaplanır). → Task 6 testi.
3. **4:3 veya düşük çözünürlüklü projeksiyon (1024×768, 1280×720):** Hiçbir slayt taşmamalı veya kesilmemeli. → Task 8 taşma testi üç çözünürlükte.
4. **GitHub Pages alt dizini:** `/` ile başlayan bir yol, yerelde çalışıp yayında kırılır. → Task 9 testi bütün HTML dosyalarında kök-mutlak yol arar.
5. **Türkçe karakterler (ğ, ş, ı, İ):** Yedek yazı tipine düşmemeli, latin-ext dosyası yüklenmeli. → Task 1 yazı tipi testi.

---

## Dosya Haritası

| Dosya | Sorumluluk |
|---|---|
| `package.json` | Sabit sürümlü geliştirme bağımlılıkları ve betikler |
| `.gitignore`, `.nojekyll` | node_modules/test çıktıları hariç tutulur. Pages'in Jekyll işlemesi kapatılır. |
| `scripts/vendor.mjs` | reveal.js ve woff2 dosyalarını node_modules'tan `ortak/` altına kopyalar |
| `playwright.config.js` | Test sunucusu, varsayılan 1920×1080 görünüm, `BASE_URL` ile canlı test |
| `ortak/css/fontlar.css` | 6 adet `@font-face` (Inter 400/700, Poppins 700 × latin/latin-ext) |
| `ortak/css/tema.css` | Renk değişkenleri, tipografi, slayt türü stilleri, etkileşim bileşeni stilleri |
| `ortak/css/vitrin.css` | Sadece seri vitrini (kök `index.html`) stilleri |
| `ortak/js/etkilesim.js` | `window.Etkilesim = { kur, sureBicimle }`: seçmeli, boşluk, sayaç |
| `ortak/js/baslat.js` | Ortak `Reveal.initialize(...)` ve ardından `Etkilesim.kur(document)` |
| `hafta-1/index.html` | 28 slayt + konuşmacı notları |
| `index.html` | Seri vitrini (Hafta 1–4 kartları) |
| `gorseller/logolar/*.svg` | Logo yer tutucuları (gerçek logolar gelince değişir) |
| `gorseller/hafta-1/*.svg` | Ekran görüntüsü yer tutucuları + site karekodu |
| `testler/yardimci.js` | Ortak test yardımcıları |
| `testler/ornek.html` | Her slayt türünden birer örnek içeren test sunumu |
| `testler/*.spec.js` | Playwright testleri |

---

### Task 1: Proje altyapısı ve sunum iskeleti

**Files:**
- Create: `package.json`, `.gitignore`, `.nojekyll`, `scripts/vendor.mjs`, `playwright.config.js`
- Create: `ortak/css/fontlar.css`, `ortak/css/tema.css` (en küçük hâli), `ortak/js/etkilesim.js` (boş hâli), `ortak/js/baslat.js`
- Create: `hafta-1/index.html` (tek slaytlık iskelet)
- Test: `testler/yardimci.js`, `testler/iskelet.spec.js`

**Interfaces:**
- Produces: `window.Etkilesim.kur(kok: ParentNode): void` (bu task'ta boş). `testler/yardimci.js` içinden `hazirBekle(page): Promise<void>`. `ortak/js/baslat.js` bütün sunum sayfalarında `etkilesim.js`'den sonra yüklenir.

- [ ] **Step 1: package.json, .gitignore, .nojekyll oluştur**

`package.json`:
```json
{
  "name": "claude-egitim",
  "private": true,
  "type": "module",
  "scripts": {
    "vendor": "node scripts/vendor.mjs",
    "karekod": "qrcode -t svg -o gorseller/hafta-1/site-karekod.svg https://eyupcalskanozturk-tr.github.io/claude-egitim/",
    "serve": "http-server . -p 4173 -c-1 -s",
    "test": "playwright test"
  },
  "devDependencies": {
    "@fontsource/inter": "5.2.6",
    "@fontsource/poppins": "5.2.6",
    "@playwright/test": "1.55.0",
    "http-server": "14.1.1",
    "qrcode": "1.5.4",
    "reveal.js": "5.2.1"
  }
}
```

`.gitignore`:
```
node_modules/
test-results/
playwright-report/
```

`.nojekyll`: boş dosya.

- [ ] **Step 2: Bağımlılıkları kur (run_in_terminal ile)**

```powershell
cd C:\Users\eyupc\claude-egitim; npm install; npx playwright install chromium
```
Beklenen: `node_modules/reveal.js/dist/reveal.js` mevcut, Chromium indirildi.

- [ ] **Step 3: Test yardımcısını ve başarısız testi yaz**

`playwright.config.js`:
```js
import { defineConfig } from '@playwright/test';

const canli = process.env.BASE_URL;

export default defineConfig({
  testDir: 'testler',
  use: {
    baseURL: canli || 'http://localhost:4173',
    viewport: { width: 1920, height: 1080 },
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: canli ? undefined : {
    command: 'npx http-server . -p 4173 -c-1 -s',
    url: 'http://localhost:4173/package.json',
    reuseExistingServer: true,
  },
});
```

`testler/yardimci.js`:
```js
export async function hazirBekle(page) {
  await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
}

export function hataTopla(page) {
  const hatalar = [];
  page.on('pageerror', (e) => hatalar.push('js: ' + e.message));
  page.on('requestfailed', (r) => hatalar.push('istek: ' + r.url()));
  page.on('response', (r) => { if (r.status() >= 400) hatalar.push(r.status() + ': ' + r.url()); });
  return hatalar;
}
```

`testler/iskelet.spec.js`:
```js
import { test, expect } from '@playwright/test';
import { hazirBekle, hataTopla } from './yardimci.js';

test('hafta 1 sunumu hatasız açılır ve reveal hazır olur', async ({ page }) => {
  const hatalar = hataTopla(page);
  await page.goto('hafta-1/');
  await hazirBekle(page);
  expect(hatalar).toEqual([]);
});

test('yazı tipleri yerelden yüklenir, Türkçe karakter için latin-ext dahil', async ({ page }) => {
  await page.goto('hafta-1/');
  await hazirBekle(page);
  const yuklu = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts]
      .filter((f) => f.status === 'loaded')
      .map((f) => ({ aile: f.family.replace(/["']/g, ''), aralik: f.unicodeRange }));
  });
  const inter = yuklu.filter((f) => f.aile === 'Inter');
  const aralik = (f) => f.aralik.toUpperCase();
  expect(inter.some((f) => aralik(f).includes('U+100-2BA') || aralik(f).includes('U+0100-02BA'))).toBe(true);
  expect(yuklu.some((f) => f.aile === 'Poppins')).toBe(true);
});
```

- [ ] **Step 4: Testin başarısız olduğunu gör**

Run: `npx playwright test testler/iskelet.spec.js`
Expected: FAIL (`hafta-1/` 404 verir, `Reveal` tanımsız).

- [ ] **Step 5: vendor betiğini yaz ve çalıştır**

`scripts/vendor.mjs`:
```js
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
```

Run: `npm run vendor`
Expected: `vendor: tamam`. `ortak/vendor/reveal/` ve `ortak/fonts/` altında 6 woff2 dosyası.

- [ ] **Step 6: Yazı tipi CSS'ini yaz**

`ortak/css/fontlar.css`:
```css
/* Inter + Poppins, @fontsource 5.2.6'dan yerel kopya. Aralıklar Google Fonts latin / latin-ext ile aynı. */
@font-face {
  font-family: 'Inter'; font-style: normal; font-weight: 400; font-display: swap;
  src: url(../fonts/inter-latin-ext-400-normal.woff2) format('woff2');
  unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF;
}
@font-face {
  font-family: 'Inter'; font-style: normal; font-weight: 400; font-display: swap;
  src: url(../fonts/inter-latin-400-normal.woff2) format('woff2');
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}
@font-face {
  font-family: 'Inter'; font-style: normal; font-weight: 700; font-display: swap;
  src: url(../fonts/inter-latin-ext-700-normal.woff2) format('woff2');
  unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF;
}
@font-face {
  font-family: 'Inter'; font-style: normal; font-weight: 700; font-display: swap;
  src: url(../fonts/inter-latin-700-normal.woff2) format('woff2');
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}
@font-face {
  font-family: 'Poppins'; font-style: normal; font-weight: 700; font-display: swap;
  src: url(../fonts/poppins-latin-ext-700-normal.woff2) format('woff2');
  unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF;
}
@font-face {
  font-family: 'Poppins'; font-style: normal; font-weight: 700; font-display: swap;
  src: url(../fonts/poppins-latin-700-normal.woff2) format('woff2');
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}
```

- [ ] **Step 7: En küçük tema, etkileşim, başlatıcı ve iskelet sayfayı yaz**

`ortak/css/tema.css` (Task 3'te tamamı yazılacak):
```css
:root { --baslik-font: 'Poppins', sans-serif; --govde-font: 'Inter', sans-serif; }
.reveal { font-family: var(--govde-font); }
.reveal h1, .reveal h2 { font-family: var(--baslik-font); font-weight: 700; }
```

`ortak/js/etkilesim.js` (Task 4–6'da doldurulacak):
```js
(function () {
  function kur(kok) {}
  window.Etkilesim = { kur: kur };
})();
```

`ortak/js/baslat.js`:
```js
Reveal.initialize({
  width: 1920,
  height: 1080,
  margin: 0.04,
  center: false,
  hash: true,
  slideNumber: 'c/t',
  transition: 'fade',
  plugins: [RevealNotes],
}).then(function () {
  Etkilesim.kur(document);
});
```

`hafta-1/index.html`:
```html
<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Claude ile Tanışma · Hafta 1</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="../ortak/vendor/reveal/reset.css">
  <link rel="stylesheet" href="../ortak/vendor/reveal/reveal.css">
  <link rel="stylesheet" href="../ortak/css/fontlar.css">
  <link rel="stylesheet" href="../ortak/css/tema.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <section>
        <h1>Claude ile Tanışma</h1>
        <aside class="notes">İskelet slayt.</aside>
      </section>
    </div>
  </div>
  <script src="../ortak/vendor/reveal/reveal.js"></script>
  <script src="../ortak/vendor/reveal/plugin/notes/notes.js"></script>
  <script src="../ortak/js/etkilesim.js"></script>
  <script src="../ortak/js/baslat.js"></script>
</body>
</html>
```

- [ ] **Step 8: Testlerin geçtiğini gör**

Run: `npx playwright test testler/iskelet.spec.js`
Expected: 2 passed.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json .gitignore .nojekyll scripts playwright.config.js ortak hafta-1 testler
git commit -m "Sunum altyapısı: reveal.js, yerel yazı tipleri, test düzeni"
```

---

### Task 2: Görsel yer tutucular ve karekod

**Files:**
- Create: `gorseller/logolar/genc-kizilay.svg`, `gorseller/logolar/comu.svg`
- Create: `gorseller/hafta-1/cportal.svg`, `gorseller/hafta-1/claude-giris.svg`, `gorseller/hafta-1/claude-ekran.svg`
- Create (betikle): `gorseller/hafta-1/site-karekod.svg`
- Test: `testler/gorseller.spec.js`

**Interfaces:**
- Produces: Yukarıdaki 6 yol. Task 3, 7, 8 ve 9 bu yolları `<img src>` ile kullanır. Gerçek görseller geldiğinde (Task 11) aynı ad `.png` uzantısıyla eklenip `src` güncellenir.

- [ ] **Step 1: Başarısız testi yaz**

`testler/gorseller.spec.js`:
```js
import { test, expect } from '@playwright/test';

const yollar = [
  'gorseller/logolar/genc-kizilay.svg',
  'gorseller/logolar/comu.svg',
  'gorseller/hafta-1/cportal.svg',
  'gorseller/hafta-1/claude-giris.svg',
  'gorseller/hafta-1/claude-ekran.svg',
  'gorseller/hafta-1/site-karekod.svg',
];

for (const yol of yollar) {
  test(`görsel mevcut: ${yol}`, async ({ request }) => {
    const yanit = await request.get(yol);
    expect(yanit.status()).toBe(200);
    expect(await yanit.text()).toContain('<svg');
  });
}
```

- [ ] **Step 2: Başarısız olduğunu gör**

Run: `npx playwright test testler/gorseller.spec.js`
Expected: 6 failed (404).

- [ ] **Step 3: Ekran görüntüsü yer tutucularını yaz**

`gorseller/hafta-1/cportal.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <rect width="1600" height="1000" fill="#E8E6DC"/>
  <rect x="24" y="24" width="1552" height="952" fill="none" stroke="#B0AEA5" stroke-width="8" stroke-dasharray="32 20"/>
  <text x="800" y="470" font-family="sans-serif" font-size="72" font-weight="700" fill="#141413" text-anchor="middle">cportal giriş ekranı</text>
  <text x="800" y="570" font-family="sans-serif" font-size="44" fill="#141413" text-anchor="middle">Ekran görüntüsü buraya gelecek</text>
</svg>
```

`gorseller/hafta-1/claude-giris.svg`: Aynı içerik, ilk `<text>` değeri `claude.ai giriş sayfası`.

`gorseller/hafta-1/claude-ekran.svg`: Aynı içerik, ilk `<text>` değeri `Claude sohbet ekranı`.

- [ ] **Step 4: Logo yer tutucularını yaz**

`gorseller/logolar/genc-kizilay.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <circle cx="200" cy="200" r="190" fill="#FAF9F5" stroke="#B0AEA5" stroke-width="8" stroke-dasharray="20 14"/>
  <text x="200" y="190" font-family="sans-serif" font-size="44" font-weight="700" fill="#141413" text-anchor="middle">Genç Kızılay</text>
  <text x="200" y="245" font-family="sans-serif" font-size="32" fill="#141413" text-anchor="middle">logo</text>
</svg>
```

`gorseller/logolar/comu.svg`: Aynı içerik, ilk `<text>` değeri `ÇOMÜ`.

- [ ] **Step 5: Karekodu üret**

Run: `npm run karekod`
Expected: `gorseller/hafta-1/site-karekod.svg` oluşur ve `<svg` ile başlar.

- [ ] **Step 6: Testin geçtiğini gör**

Run: `npx playwright test testler/gorseller.spec.js`
Expected: 6 passed.

- [ ] **Step 7: Commit**

```bash
git add gorseller testler/gorseller.spec.js
git commit -m "Görsel yer tutucuları ve site karekodu"
```

---

### Task 3: Tema ve slayt türü stilleri

**Files:**
- Modify: `ortak/css/tema.css` (tamamen yeniden yazılır)
- Create: `testler/ornek.html`
- Test: `testler/tema.spec.js`

**Interfaces:**
- Consumes: `hazirBekle`, `hataTopla` (Task 1), görsel yolları (Task 2)
- Produces: CSS sınıfları. Bunlar Task 4–8'de HTML'de kullanılır:
  - Section: `kapak` (içinde `kapak-ic` sarmalayıcısı), `siz-yapin` (+ `data-background-color="#141413"`), `data-state="kapak-ekrani"`
  - Düzen: `iki-sutun`, `adim-duzen`, `formul` > `kart`, `kartlar` > `kart`
  - Bileşen: `kutu` (+ `iyi` / `kotu`), `istem` (+ `kucuk`), `not-kutusu`, `etiket`, `ust-baslik`, `alt-baslik`, `vurgu`, `rozet`, `cevap-kutusu`, `cipler` > `cip`, `ekran` > `img` + `halka`, `adimlar`, `kose-logo`, `karekod`
  - Etkileşim (stilleri burada, davranışları Task 4–6'da): `secmeli` (+ `yatay`) > `sik` (+ `dogru` / `yanlis`), `bosluk` (+ `acik`), `sayac` > `sayac-ekran` + `sayac-dugme` (+ `bitti`)
  - `testler/ornek.html` içindeki section id'leri: `kapak`, `anlatim`, `secmeli`, `bosluk`, `karsilastirma`, `adim`, `siz-yapin`, `mola`

- [ ] **Step 1: Örnek test sunumunu yaz**

`testler/ornek.html`:
```html
<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Örnek slaytlar (test)</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="../ortak/vendor/reveal/reset.css">
  <link rel="stylesheet" href="../ortak/vendor/reveal/reveal.css">
  <link rel="stylesheet" href="../ortak/css/fontlar.css">
  <link rel="stylesheet" href="../ortak/css/tema.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <section id="kapak" class="kapak" data-state="kapak-ekrani">
        <div class="kapak-ic">
          <p class="ust-baslik">Örnek</p>
          <h1>Kapak <span class="vurgu">başlığı</span></h1>
        </div>
      </section>
      <section id="anlatim">
        <h2>Anlatım başlığı</h2>
        <ul><li>Bir</li><li>İki</li><li>Üç</li></ul>
        <p class="not-kutusu">Not kutusu</p>
      </section>
      <section id="secmeli">
        <h2>Soru</h2>
        <div class="secmeli yatay">
          <button class="sik">Yanlış şık</button>
          <button class="sik" data-dogru>Doğru şık</button>
          <button class="sik">Diğer şık</button>
        </div>
      </section>
      <section id="bosluk">
        <h2>Boşluk</h2>
        <p>Claude bir yapay zeka <span class="bosluk" data-cevap="asistanıdır"></span>.</p>
      </section>
      <section id="karsilastirma">
        <h2>Karşılaştırma</h2>
        <div class="iki-sutun">
          <div class="kutu kotu"><h3>A</h3><div class="istem">Kötü</div></div>
          <div class="kutu iyi"><h3>B</h3><div class="istem">İyi</div></div>
        </div>
      </section>
      <section id="adim">
        <h2>Adım</h2>
        <div class="adim-duzen">
          <div class="ekran">
            <img src="../gorseller/hafta-1/claude-ekran.svg" alt="Örnek ekran">
            <span class="halka" style="left: 50%; top: 50%"></span>
          </div>
          <ol class="adimlar"><li>Bir</li><li>İki</li></ol>
        </div>
      </section>
      <section id="siz-yapin" class="siz-yapin" data-background-color="#141413">
        <p class="etiket">✋ Sıra sizde · 3 dakika</p>
        <h2>Görev</h2>
        <div class="istem">Merhaba!</div>
        <div class="sayac" data-sure="180"></div>
      </section>
      <section id="mola">
        <h2>Mola</h2>
        <div class="sayac" data-sure="300"></div>
      </section>
    </div>
  </div>
  <img class="kose-logo" src="../gorseller/logolar/genc-kizilay.svg" alt="Genç Kızılay">
  <script src="../ortak/vendor/reveal/reveal.js"></script>
  <script src="../ortak/vendor/reveal/plugin/notes/notes.js"></script>
  <script src="../ortak/js/etkilesim.js"></script>
  <script src="../ortak/js/baslat.js"></script>
</body>
</html>
```

- [ ] **Step 2: Başarısız tema testini yaz**

`testler/tema.spec.js`:
```js
import { test, expect } from '@playwright/test';
import { hazirBekle, hataTopla } from './yardimci.js';

const KREM = 'rgb(250, 249, 245)';
const KOYU = 'rgb(20, 20, 19)';
const TURUNCU = 'rgb(217, 119, 87)';

test('örnek sunum hatasız açılır', async ({ page }) => {
  const hatalar = hataTopla(page);
  await page.goto('testler/ornek.html');
  await hazirBekle(page);
  expect(hatalar).toEqual([]);
});

test('anlatım: krem zemin, Poppins başlık ≥64px turuncu çizgili, koyu gövde ≥36px', async ({ page }) => {
  await page.goto('testler/ornek.html#/anlatim');
  await hazirBekle(page);
  const s = await page.evaluate(() => {
    const sec = document.getElementById('anlatim');
    const h2 = getComputedStyle(sec.querySelector('h2'));
    const li = getComputedStyle(sec.querySelector('li'));
    return {
      zemin: getComputedStyle(document.body).backgroundColor,
      baslikFont: h2.fontFamily, baslikBoyut: parseFloat(h2.fontSize), cizgi: h2.borderBottomColor,
      govdeBoyut: parseFloat(li.fontSize), govdeRenk: li.color,
    };
  });
  expect(s.zemin).toBe(KREM);
  expect(s.baslikFont).toContain('Poppins');
  expect(s.baslikBoyut).toBeGreaterThanOrEqual(64);
  expect(s.cizgi).toBe(TURUNCU);
  expect(s.govdeBoyut).toBeGreaterThanOrEqual(36);
  expect(s.govdeRenk).toBe(KOYU);
});

test('siz yapın: koyu tam ekran zemin, krem başlık', async ({ page }) => {
  await page.goto('testler/ornek.html#/siz-yapin');
  await hazirBekle(page);
  const s = await page.evaluate(() => {
    const bg = document.querySelector('.backgrounds .slide-background.present');
    const icerik = bg.querySelector('.slide-background-content');
    return {
      zeminler: [getComputedStyle(bg).backgroundColor, icerik ? getComputedStyle(icerik).backgroundColor : ''],
      baslik: getComputedStyle(document.querySelector('#siz-yapin h2')).color,
    };
  });
  expect(s.zeminler).toContain(KOYU);
  expect(s.baslik).toBe(KREM);
});

test('karşılaştırma: iki kutu yan yana', async ({ page }) => {
  await page.goto('testler/ornek.html#/karsilastirma');
  await hazirBekle(page);
  const [a, b] = await page.locator('#karsilastirma .kutu').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().toJSON()));
  expect(Math.abs(a.y - b.y)).toBeLessThan(2);
  expect(b.x).toBeGreaterThan(a.x + a.width);
});

test('adım: halka turuncu', async ({ page }) => {
  await page.goto('testler/ornek.html#/adim');
  await hazirBekle(page);
  const renk = await page.locator('#adim .halka').evaluate((e) => getComputedStyle(e).borderTopColor);
  expect(renk).toBe(TURUNCU);
});

test('köşe logosu kapakta gizli, diğer slaytlarda görünür', async ({ page }) => {
  await page.goto('testler/ornek.html#/kapak');
  await hazirBekle(page);
  await expect(page.locator('.kose-logo')).toBeHidden();
  await page.goto('testler/ornek.html#/anlatim');
  await expect(page.locator('.kose-logo')).toBeVisible();
});
```

- [ ] **Step 3: Başarısız olduğunu gör**

Run: `npx playwright test testler/tema.spec.js`
Expected: "örnek sunum hatasız açılır" PASS. Diğerleri FAIL (renkler/boyutlar tanımsız).

- [ ] **Step 4: Temanın tamamını yaz**

`ortak/css/tema.css`:
```css
:root {
  --turuncu: #D97757;
  --krem: #FAF9F5;
  --koyu: #141413;
  --acik-gri: #E8E6DC;
  --yesil: #788C5D;
  --gri: #B0AEA5;
  --baslik-font: 'Poppins', sans-serif;
  --govde-font: 'Inter', sans-serif;
}

/* ---------- Temel ---------- */
html, body, .reveal-viewport { background: var(--krem); }
.reveal { font-family: var(--govde-font); font-size: 40px; color: var(--koyu); }
.reveal .slides { text-align: left; }
.reveal .slides > section { padding: 60px 100px; box-sizing: border-box; }
.reveal h1, .reveal h2, .reveal h3 { font-family: var(--baslik-font); font-weight: 700; color: var(--koyu); line-height: 1.15; }
.reveal h1 { font-size: 110px; margin: 0 0 30px; }
.reveal h2 { font-size: 64px; margin: 0 0 44px; padding-bottom: 14px; border-bottom: 6px solid var(--turuncu); display: inline-block; }
.reveal h3 { font-size: 44px; margin: 0 0 20px; }
.reveal p, .reveal li { font-size: 40px; line-height: 1.4; margin: 0 0 20px; }
.reveal ul, .reveal ol { margin: 0 0 30px 1.2em; padding: 0; }
.reveal li + li { margin-top: 16px; }
.vurgu { color: var(--turuncu); }

/* ---------- Kapak ---------- */
.reveal .slides > section.kapak { height: 100%; }
.kapak-ic { height: 100%; display: flex; flex-direction: column; justify-content: center; }
.ust-baslik { font-weight: 700; color: var(--turuncu); letter-spacing: 0.03em; }
.alt-baslik { color: var(--koyu); }
.logolar { display: flex; gap: 40px; margin-bottom: 50px; }
.logolar img { height: 140px; width: auto; }

/* ---------- Düzenler ---------- */
.iki-sutun { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
.formul, .kartlar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-bottom: 40px; }
.kart { background: #fff; border-top: 10px solid var(--turuncu); border-radius: 20px; padding: 32px 36px; }
.kart p { margin: 0; }
.siz-yapin .kart { background: rgba(250, 249, 245, 0.08); }

/* ---------- Kutular ---------- */
.kutu { background: var(--acik-gri); border-radius: 24px; padding: 36px 40px; border-left: 14px solid var(--gri); }
.kutu.iyi { border-left-color: var(--yesil); }
.kutu.kotu { border-left-color: var(--gri); }
.not-kutusu { background: var(--acik-gri); border-radius: 20px; padding: 24px 36px; }
.cevap-kutusu { background: #fff; border: 3px solid var(--acik-gri); border-radius: 24px; padding: 32px 40px; margin-bottom: 30px; }
.cevap-kutusu::before { content: "Claude'un cevabı:"; display: block; font-size: 30px; font-weight: 700; color: var(--gri); margin-bottom: 10px; }
.rozet { margin-left: 16px; }
.cipler { display: flex; flex-wrap: wrap; gap: 24px; margin: 20px 0 40px; }
.cip { background: #fff; border: 4px solid var(--turuncu); border-radius: 999px; padding: 14px 36px; font-weight: 700; }

/* ---------- İstem kutusu ---------- */
.istem { font-size: 48px; line-height: 1.35; background: #fff; color: var(--koyu); border: 4px solid var(--turuncu); border-radius: 24px; padding: 28px 40px; margin-bottom: 30px; }
.istem::before { content: "Claude'a yaz:"; display: block; font-size: 28px; font-weight: 700; color: var(--turuncu); margin-bottom: 8px; }
.istem.kucuk { font-size: 38px; padding: 20px 32px; }

/* ---------- Siz yapın ---------- */
.reveal .slides > section.siz-yapin,
.reveal .slides > section.siz-yapin p,
.reveal .slides > section.siz-yapin li,
.reveal .slides > section.siz-yapin h2,
.reveal .slides > section.siz-yapin h3 { color: var(--krem); }
.etiket { font-weight: 700; color: var(--turuncu) !important; margin: 0 0 12px; }

/* ---------- Adım adım ---------- */
.adim-duzen { display: grid; grid-template-columns: 1.35fr 1fr; gap: 60px; align-items: start; }
.ekran { position: relative; }
.ekran img { display: block; width: 100%; height: auto; border-radius: 16px; box-shadow: 0 8px 30px rgba(20, 20, 19, 0.15); }
.halka { position: absolute; width: 150px; height: 150px; border: 8px solid var(--turuncu); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; }
.adimlar li { margin-bottom: 24px; }

/* ---------- Köşe logosu ve karekod ---------- */
.kose-logo { position: fixed; top: 20px; right: 28px; height: 72px; width: auto; z-index: 30; }
.kapak-ekrani .kose-logo { display: none; }
.karekod { width: 320px; height: 320px; background: #fff; padding: 16px; border-radius: 16px; }

/* ---------- Seçmeli soru ---------- */
.secmeli { display: grid; gap: 24px; margin-top: 10px; }
.secmeli.yatay { grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); }
.sik { font: 700 40px var(--govde-font); text-align: left; padding: 28px 36px; border-radius: 20px; border: 4px solid var(--acik-gri); background: #fff; color: var(--koyu); cursor: pointer; }
.sik:hover { border-color: var(--turuncu); }
.sik.dogru { background: var(--yesil); border-color: var(--yesil); color: #fff; }
.sik.dogru::after { content: " ✓"; }
.sik.yanlis { background: var(--gri); border-color: var(--gri); color: var(--koyu); animation: salla 0.4s; }
.sik.yanlis::after { content: " ✗"; }
@keyframes salla { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-12px); } 75% { transform: translateX(12px); } }

/* ---------- Boşluk doldurma ---------- */
.bosluk { display: inline-block; min-width: 4ch; border-bottom: 5px solid var(--turuncu); color: transparent; font-weight: 700; text-align: center; cursor: pointer; }
.bosluk.acik { color: var(--turuncu); }

/* ---------- Sayaç ---------- */
.sayac { display: flex; align-items: center; gap: 36px; margin-top: 20px; }
.sayac-ekran { font: 700 150px var(--baslik-font); color: var(--turuncu); font-variant-numeric: tabular-nums; min-width: 4.5ch; line-height: 1; }
.sayac.bitti .sayac-ekran { animation: nabiz 1s infinite; }
.sayac-dugme { font: 700 32px var(--govde-font); padding: 16px 32px; border-radius: 16px; border: 3px solid var(--turuncu); background: transparent; color: inherit; cursor: pointer; }
@keyframes nabiz { 50% { opacity: 0.35; } }
```

> Not: Dikey ortalama `section` üzerinde değil, içindeki `.kapak-ic` sarmalayıcısında yapılır. reveal.js slaytları gösterip gizlerken `section`'ın `display` değerini kendisi yönetir, bu değeri ezmiyoruz.

- [ ] **Step 5: Testlerin geçtiğini gör**

Run: `npx playwright test testler/tema.spec.js`
Expected: 6 passed.

- [ ] **Step 6: Commit**

```bash
git add ortak/css/tema.css testler/ornek.html testler/tema.spec.js
git commit -m "Claude paleti teması ve slayt türü stilleri"
```

---

### Task 4: Seçmeli soru bileşeni

**Files:**
- Modify: `ortak/js/etkilesim.js`
- Test: `testler/secmeli.spec.js`

**Interfaces:**
- Consumes: `.secmeli .sik` ve `[data-dogru]` işaretlemesi (Task 3)
- Produces: `Etkilesim.kur(kok)` her `.sik` için tıklama dinleyicisi kurar. Tıklama `dogru` veya `yanlis` sınıfını açıp kapatır ve odağı bırakır.

- [ ] **Step 1: Başarısız testi yaz**

`testler/secmeli.spec.js`:
```js
import { test, expect } from '@playwright/test';
import { hazirBekle } from './yardimci.js';

test.beforeEach(async ({ page }) => {
  await page.goto('testler/ornek.html#/secmeli');
  await hazirBekle(page);
});

test('yanlış şık gri + yanlis, doğru şık yeşil + dogru olur', async ({ page }) => {
  const yanlis = page.getByRole('button', { name: 'Yanlış şık' });
  const dogru = page.getByRole('button', { name: 'Doğru şık' });
  await yanlis.click();
  await expect(yanlis).toHaveClass(/yanlis/);
  await expect(dogru).not.toHaveClass(/dogru/);
  await dogru.click();
  await expect(dogru).toHaveClass(/dogru/);
});

test('ikinci tıklama işareti geri alır', async ({ page }) => {
  const dogru = page.getByRole('button', { name: 'Doğru şık' });
  await dogru.click();
  await dogru.click();
  await expect(dogru).not.toHaveClass(/dogru/);
});

test('tıklamadan sonra Space slaytı ilerletir, şıkkı tekrar tetiklemez', async ({ page }) => {
  const dogru = page.getByRole('button', { name: 'Doğru şık' });
  await dogru.click();
  await page.keyboard.press('Space');
  await expect(dogru).toHaveClass(/dogru/);
  await expect.poll(() => page.evaluate(() => Reveal.getCurrentSlide().id)).toBe('bosluk');
});
```

- [ ] **Step 2: Başarısız olduğunu gör**

Run: `npx playwright test testler/secmeli.spec.js`
Expected: FAIL (sınıflar eklenmiyor).

- [ ] **Step 3: Bileşeni yaz**

`ortak/js/etkilesim.js`:
```js
(function () {
  function secmeliKur(kok) {
    kok.querySelectorAll('.secmeli .sik').forEach(function (sik) {
      sik.type = 'button';
      sik.addEventListener('click', function () {
        sik.classList.toggle(sik.hasAttribute('data-dogru') ? 'dogru' : 'yanlis');
        sik.blur();
      });
    });
  }

  function kur(kok) {
    secmeliKur(kok);
  }

  window.Etkilesim = { kur: kur };
})();
```

- [ ] **Step 4: Testlerin geçtiğini gör**

Run: `npx playwright test testler/secmeli.spec.js`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add ortak/js/etkilesim.js testler/secmeli.spec.js
git commit -m "Seçmeli soru bileşeni"
```

---

### Task 5: Boşluk doldurma bileşeni

**Files:**
- Modify: `ortak/js/etkilesim.js`
- Test: `testler/bosluk.spec.js`

**Interfaces:**
- Consumes: `<span class="bosluk" data-cevap="...">` (Task 3)
- Produces: `Etkilesim.kur` her `.bosluk` öğesinin metnini `data-cevap` yapar (CSS'te şeffaf, genişlik baştan sabit). Tıklama `acik` sınıfını açıp kapatır.

- [ ] **Step 1: Başarısız testi yaz**

`testler/bosluk.spec.js`:
```js
import { test, expect } from '@playwright/test';
import { hazirBekle } from './yardimci.js';

test('boşluk kapalıyken cevap görünmez, tıklayınca turuncu görünür, tekrar tıklayınca kapanır', async ({ page }) => {
  await page.goto('testler/ornek.html#/bosluk');
  await hazirBekle(page);
  const b = page.locator('#bosluk .bosluk');
  await expect(b).toHaveText('asistanıdır');
  await expect(b).toHaveCSS('color', 'rgba(0, 0, 0, 0)');
  const genislikOnce = await b.evaluate((e) => e.getBoundingClientRect().width);
  await b.click();
  await expect(b).toHaveCSS('color', 'rgb(217, 119, 87)');
  const genislikSonra = await b.evaluate((e) => e.getBoundingClientRect().width);
  expect(Math.abs(genislikSonra - genislikOnce)).toBeLessThan(1);
  await b.click();
  await expect(b).toHaveCSS('color', 'rgba(0, 0, 0, 0)');
});
```

- [ ] **Step 2: Başarısız olduğunu gör**

Run: `npx playwright test testler/bosluk.spec.js`
Expected: FAIL (metin boş).

- [ ] **Step 3: Bileşeni ekle**

`ortak/js/etkilesim.js` içinde `secmeliKur` fonksiyonunun altına ekle:
```js
  function boslukKur(kok) {
    kok.querySelectorAll('.bosluk').forEach(function (b) {
      b.textContent = b.dataset.cevap;
      b.setAttribute('role', 'button');
      b.addEventListener('click', function () {
        b.classList.toggle('acik');
      });
    });
  }
```
`kur` fonksiyonunu şöyle değiştir:
```js
  function kur(kok) {
    secmeliKur(kok);
    boslukKur(kok);
  }
```

- [ ] **Step 4: Testin geçtiğini gör**

Run: `npx playwright test testler/bosluk.spec.js testler/secmeli.spec.js`
Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add ortak/js/etkilesim.js testler/bosluk.spec.js
git commit -m "Boşluk doldurma bileşeni"
```

---

### Task 6: Geri sayım sayacı

**Files:**
- Modify: `ortak/js/etkilesim.js`
- Test: `testler/sayac.spec.js`

**Interfaces:**
- Consumes: `<div class="sayac" data-sure="SANİYE">` (Task 3)
- Produces: `Etkilesim.sureBicimle(saniye: number): string` → `"MM:SS"` (yukarı yuvarlar, negatifse `"00:00"`). `Etkilesim.kur` her `.sayac` içine `.sayac-ekran`, `[data-eylem="baslat"]` (metni Başlat/Duraklat) ve `[data-eylem="sifirla"]` düğmelerini kurar. Süre bitince ekranda `Süre doldu!` yazar ve öğeye `bitti` sınıfı eklenir.

- [ ] **Step 1: Başarısız testi yaz**

`testler/sayac.spec.js`:
```js
import { test, expect } from '@playwright/test';
import { hazirBekle } from './yardimci.js';

test('sureBicimle MM:SS üretir', async ({ page }) => {
  await page.goto('testler/ornek.html');
  await hazirBekle(page);
  const s = await page.evaluate(() => [0, -5, 59.2, 60, 180, 125].map(Etkilesim.sureBicimle));
  expect(s).toEqual(['00:00', '00:00', '01:00', '01:00', '03:00', '02:05']);
});

test.describe('sayaç', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.goto('testler/ornek.html#/siz-yapin');
    await hazirBekle(page);
  });

  const ekran = (page) => page.locator('#siz-yapin .sayac-ekran');
  const baslat = (page) => page.locator('#siz-yapin [data-eylem="baslat"]');
  const sifirla = (page) => page.locator('#siz-yapin [data-eylem="sifirla"]');

  test('başlangıçta 03:00, başlatınca geri sayar, duraklatınca durur', async ({ page }) => {
    await expect(ekran(page)).toHaveText('03:00');
    await baslat(page).click();
    await expect(baslat(page)).toHaveText('Duraklat');
    await page.clock.runFor(61_000);
    await expect(ekran(page)).toHaveText('01:59');
    await baslat(page).click();
    await expect(baslat(page)).toHaveText('Başlat');
    await page.clock.runFor(10_000);
    await expect(ekran(page)).toHaveText('01:59');
  });

  test('süre bitince "Süre doldu!" ve bitti sınıfı, sıfırla 03:00 yapar', async ({ page }) => {
    await baslat(page).click();
    await page.clock.runFor(181_000);
    await expect(ekran(page)).toHaveText('Süre doldu!');
    await expect(page.locator('#siz-yapin .sayac')).toHaveClass(/bitti/);
    await expect(baslat(page)).toHaveText('Başlat');
    await sifirla(page).click();
    await expect(ekran(page)).toHaveText('03:00');
    await expect(page.locator('#siz-yapin .sayac')).not.toHaveClass(/bitti/);
  });

  test('sayaç çalışırken başka slayda gidip dönünce geçen süre doğru', async ({ page }) => {
    await baslat(page).click();
    await page.evaluate(() => Reveal.slide(Reveal.getIndices(document.getElementById('mola')).h));
    await page.clock.runFor(30_000);
    await page.evaluate(() => Reveal.slide(Reveal.getIndices(document.getElementById('siz-yapin')).h));
    await expect(ekran(page)).toHaveText('02:30');
  });

  test('düğmeye tıkladıktan sonra Space slaytı ilerletir, sayacı duraklatmaz', async ({ page }) => {
    await baslat(page).click();
    await page.keyboard.press('Space');
    await expect.poll(() => page.evaluate(() => Reveal.getCurrentSlide().id)).toBe('mola');
    await expect(baslat(page)).toHaveText('Duraklat');
  });

  test('her sayaç bağımsız: mola sayacı 05:00 gösterir', async ({ page }) => {
    await expect(page.locator('#mola .sayac-ekran')).toHaveText('05:00');
  });
});
```

- [ ] **Step 2: Başarısız olduğunu gör**

Run: `npx playwright test testler/sayac.spec.js`
Expected: FAIL (`Etkilesim.sureBicimle` tanımsız, `.sayac-ekran` yok).

- [ ] **Step 3: Sayacı ekle**

`ortak/js/etkilesim.js` içinde `boslukKur` fonksiyonunun altına ekle:
```js
  function sureBicimle(saniye) {
    var s = Math.max(0, Math.ceil(saniye));
    var dk = Math.floor(s / 60);
    var sn = s % 60;
    return String(dk).padStart(2, '0') + ':' + String(sn).padStart(2, '0');
  }

  function sayacKur(el) {
    var toplam = Number(el.dataset.sure);
    var kalan = toplam;
    var bitis = 0;
    var zamanlayici = null;

    el.innerHTML =
      '<div class="sayac-ekran"></div>' +
      '<button type="button" class="sayac-dugme" data-eylem="baslat">Başlat</button>' +
      '<button type="button" class="sayac-dugme" data-eylem="sifirla">Sıfırla</button>';
    var ekran = el.querySelector('.sayac-ekran');
    var baslatDugme = el.querySelector('[data-eylem="baslat"]');
    var sifirlaDugme = el.querySelector('[data-eylem="sifirla"]');

    function ciz() {
      ekran.textContent = kalan <= 0 ? 'Süre doldu!' : sureBicimle(kalan);
      el.classList.toggle('bitti', kalan <= 0);
    }
    function durdur() {
      clearInterval(zamanlayici);
      zamanlayici = null;
      baslatDugme.textContent = 'Başlat';
    }
    function tik() {
      kalan = (bitis - Date.now()) / 1000;
      if (kalan <= 0) {
        kalan = 0;
        durdur();
      }
      ciz();
    }

    baslatDugme.addEventListener('click', function () {
      if (zamanlayici) {
        tik();
        durdur();
      } else if (kalan > 0) {
        bitis = Date.now() + kalan * 1000;
        zamanlayici = setInterval(tik, 250);
        baslatDugme.textContent = 'Duraklat';
      }
      baslatDugme.blur();
    });
    sifirlaDugme.addEventListener('click', function () {
      durdur();
      kalan = toplam;
      ciz();
      sifirlaDugme.blur();
    });

    ciz();
  }
```
`kur` ve dışa aktarımı şöyle değiştir:
```js
  function kur(kok) {
    secmeliKur(kok);
    boslukKur(kok);
    kok.querySelectorAll('.sayac').forEach(sayacKur);
  }

  window.Etkilesim = { kur: kur, sureBicimle: sureBicimle };
```

- [ ] **Step 4: Bütün testlerin geçtiğini gör**

Run: `npx playwright test`
Expected: Bütün testler PASS.

- [ ] **Step 5: Commit**

```bash
git add ortak/js/etkilesim.js testler/sayac.spec.js
git commit -m "Geri sayım sayacı bileşeni"
```

---

### Task 7: Hafta 1 slaytları 1–14

**Files:**
- Modify: `hafta-1/index.html` (iskelet slaytı yerine 1–14 + köşe logosu)
- Test: `testler/hafta-1.spec.js`

**Interfaces:**
- Consumes: Task 3 CSS sınıfları, Task 4–6 bileşenleri, Task 2 görsel yolları
- Produces: `hafta-1/index.html` içinde ilk 14 `section`. Task 8 aynı dosyanın `.slides` sonuna 15–28'i ekler.

- [ ] **Step 1: Başarısız testi yaz**

`testler/hafta-1.spec.js`:
```js
import { test, expect } from '@playwright/test';
import { hazirBekle, hataTopla } from './yardimci.js';

const BASLIKLAR = [
  'Claude ile Tanışma',
  'Bugün ne yapacağız?',
  'Isınma sorusu 🤔',
  'Yapay zekayı nerede gördünüz?',
  '1. Adım: Bilgisayara giriş',
  "2. Adım: Claude'a giriş",
  '3. Adım: Claude ekranını tanı',
  'İlk mesajını gönder',
  'Claude nedir?',
  'Neler yapabilir, nelere dikkat?',
  'Boşluğu doldur ✍️',
  'İyi istemin formülü',
  'Hangisi daha iyi?',
  'B neden daha iyi?',
];

test.beforeEach(async ({ page }) => {
  await page.goto('hafta-1/');
  await hazirBekle(page);
});

test('sunum hatasız açılır, bütün görseller yüklenir', async ({ page }) => {
  const hatalar = hataTopla(page);
  await page.reload();
  await hazirBekle(page);
  const bozuk = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
  expect(bozuk).toEqual([]);
  expect(hatalar).toEqual([]);
});

test('slayt başlıkları beklenen sırada', async ({ page }) => {
  const basliklar = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')].map((s) => s.querySelector('h1, h2').textContent.trim()));
  expect(basliklar.slice(0, BASLIKLAR.length)).toEqual(BASLIKLAR);
});

test('her slaytta boş olmayan konuşmacı notu var', async ({ page }) => {
  const notsuz = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((s, i) => ({ no: i + 1, not: (s.querySelector('aside.notes') || { textContent: '' }).textContent.trim() }))
      .filter((x) => x.not.length < 20).map((x) => x.no));
  expect(notsuz).toEqual([]);
});

test('"siz yapın" slaytları koyu zeminli ve sayaçlı', async ({ page }) => {
  const s = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section.siz-yapin')].map((sec) => ({
      zemin: sec.getAttribute('data-background-color'), sayac: !!sec.querySelector('.sayac[data-sure]'),
    })));
  expect(s.length).toBeGreaterThanOrEqual(1);
  for (const x of s) expect(x).toEqual({ zemin: '#141413', sayac: true });
});

test('soru slaytlarında en az bir doğru şık var', async ({ page }) => {
  const dogrusuz = await page.evaluate(() =>
    [...document.querySelectorAll('.secmeli')].filter((g) => !g.querySelector('[data-dogru]')).length);
  expect(dogrusuz).toBe(0);
});

for (const [g, y] of [[1920, 1080], [1280, 720], [1024, 768]]) {
  test(`hiçbir slayt taşmaz (${g}×${y})`, async ({ page }) => {
    await page.setViewportSize({ width: g, height: y });
    await page.reload();
    await hazirBekle(page);
    await page.evaluate(() => document.fonts.ready);
    const tasan = await page.evaluate(() => {
      const sonuc = [];
      const adet = document.querySelectorAll('.reveal .slides > section').length;
      for (let i = 0; i < adet; i++) {
        Reveal.slide(i);
        const s = Reveal.getCurrentSlide();
        if (s.scrollHeight > 1080 || s.scrollWidth > 1920) sonuc.push({ no: i + 1, h: s.scrollHeight, w: s.scrollWidth });
      }
      return sonuc;
    });
    expect(tasan).toEqual([]);
  });
}
```

- [ ] **Step 2: Başarısız olduğunu gör**

Run: `npx playwright test testler/hafta-1.spec.js`
Expected: "slayt başlıkları" FAIL (tek slayt var).

- [ ] **Step 3: Slaytları yaz**

`hafta-1/index.html` içinde `<div class="slides">` ile `</div>` arasındaki iskelet `section`ı sil ve yerine şunu yaz:
```html
      <!-- 1 -->
      <section class="kapak" data-state="kapak-ekrani">
        <div class="kapak-ic">
          <div class="logolar">
            <img src="../gorseller/logolar/genc-kizilay.svg" alt="Genç Kızılay logosu">
            <img src="../gorseller/logolar/comu.svg" alt="ÇOMÜ logosu">
          </div>
          <p class="ust-baslik">Genç Kızılay ÇOMÜ · Yapay Zeka Eğitimleri · Hafta 1</p>
          <h1>Claude ile <span class="vurgu">Tanışma</span></h1>
          <p class="alt-baslik">Teknik Bilimler MYO · Lab3 · 1 Aralık 2026</p>
        </div>
        <aside class="notes">Hoş geldiniz. Kendini ve Eğitim Birimi'ni 30 saniyede tanıt. Telefonları sessize aldır ama kapattırma (e-posta kodu gerekebilir). Masa asistanlarını tanıt: "Takılan el kaldırsın, arkadaşlarımız yanınıza gelecek."</aside>
      </section>

      <!-- 2 -->
      <section>
        <h2>Bugün ne yapacağız?</h2>
        <ol>
          <li>Claude'a girip <strong>ilk sohbetimizi</strong> yapacağız</li>
          <li><strong>İyi soru sormayı</strong> öğreneceğiz</li>
          <li>Cevabı <strong>kontrol etmeyi</strong> ve güvenli kullanmayı öğreneceğiz</li>
        </ol>
        <p class="not-kutusu">💡 Bugün dinlemekten çok <strong>yapacağız</strong>. Takılırsan el kaldır!</p>
        <aside class="notes">Üç hedefi oku. "Her adımda siz de bilgisayarda deneyeceksiniz" de. Süre: yaklaşık 1,5 saat, ortada 5 dakika mola var.</aside>
      </section>

      <!-- 3 -->
      <section>
        <h2>Isınma sorusu 🤔</h2>
        <p>Bu sunumu kim hazırladı?</p>
        <div class="secmeli yatay">
          <button class="sik">Eyüp</button>
          <button class="sik">Claude</button>
          <button class="sik" data-dogru>İkisi birlikte</button>
        </div>
        <aside class="notes">El kaldırarak oylat. Önce "Eyüp", sonra "Claude" şıkkına tıkla (gri, yanlış), en son "İkisi birlikte" (yeşil). Mesaj: "Ben ne istediğimi anlattım, Claude hazırladı, ben kontrol edip düzelttim. Bugün bu iş birliğini öğreneceğiz."</aside>
      </section>

      <!-- 4 -->
      <section>
        <h2>Yapay zekayı nerede gördünüz?</h2>
        <ul>
          <li>Telefonda, sosyal medyada, haberlerde...</li>
          <li>Hiç kullanmadıysan da sorun yok!</li>
        </ul>
        <div class="sayac" data-sure="120"></div>
        <aside class="notes">Sayacı başlat, 3–4 kişiye söz ver. Beklenen cevaplar: ChatGPT, çeviri uygulamaları, Instagram filtreleri, sesli asistanlar. Hiç kullanmayanları rahatlat: "Bugün tam size göre."</aside>
      </section>

      <!-- 5 -->
      <section>
        <h2>1. Adım: Bilgisayara giriş</h2>
        <div class="adim-duzen">
          <div class="ekran">
            <img src="../gorseller/hafta-1/cportal.svg" alt="cportal giriş ekranı">
            <span class="halka" style="left: 50%; top: 55%"></span>
          </div>
          <ol class="adimlar">
            <li>Açılan giriş sayfasına <strong>TC kimlik no</strong> yaz</li>
            <li><strong>UBYS şifreni</strong> yaz</li>
            <li><strong>Giriş</strong>'e tıkla</li>
          </ol>
        </div>
        <aside class="notes">Herkes yapsın. Bitiren "girdim" diye el kaldırsın. Şifresini bilmeyen: masa asistanı yanına gitsin, olmazsa yanındakiyle eşli çalışsın. Gerçek ekran görüntüsü gelince halkanın yerini giriş düğmesine göre ayarla.</aside>
      </section>

      <!-- 6 -->
      <section>
        <h2>2. Adım: Claude'a giriş</h2>
        <div class="adim-duzen">
          <div class="ekran">
            <img src="../gorseller/hafta-1/claude-giris.svg" alt="claude.ai giriş sayfası">
            <span class="halka" style="left: 50%; top: 55%"></span>
          </div>
          <ol class="adimlar">
            <li>Adres çubuğuna <strong>claude.ai</strong> yaz</li>
            <li>Hesabını nasıl açtıysan öyle gir (<strong>Google</strong> veya e-posta)</li>
            <li>Mesaj kutusunu görüyorsan tamam ✋</li>
          </ol>
        </div>
        <aside class="notes">E-postayla girenlere kod gelir, telefonlarına baksınlar. Tarayıcı "şifreyi kaydet" derse HAYIR desinler, bu ortak bir bilgisayar. Hesap açmadan gelen yanındakiyle eşli çalışsın.</aside>
      </section>

      <!-- 7 -->
      <section>
        <h2>3. Adım: Claude ekranını tanı</h2>
        <div class="adim-duzen">
          <div class="ekran">
            <img src="../gorseller/hafta-1/claude-ekran.svg" alt="Claude sohbet ekranı">
            <span class="halka" style="left: 50%; top: 60%"></span>
          </div>
          <ol class="adimlar">
            <li><strong>Mesaj kutusu:</strong> buraya yazarsın</li>
            <li><strong>Gönder:</strong> ok düğmesi ya da Enter</li>
            <li><strong>Yeni sohbet:</strong> sol üstteki düğme</li>
          </ol>
        </div>
        <aside class="notes">Kendi ekranında göster: mesaj kutusu, gönder, yeni sohbet, sol taraftaki geçmiş. "Her yeni konu için yeni sohbet açın" de.</aside>
      </section>

      <!-- 8 -->
      <section class="siz-yapin" data-background-color="#141413">
        <p class="etiket">✋ Sıra sizde · 3 dakika</p>
        <h2>İlk mesajını gönder</h2>
        <div class="istem">Merhaba, benim adım ___. Kendini bana 3 cümlede tanıt.</div>
        <div class="sayac" data-sure="180"></div>
        <aside class="notes">Sayacı başlat. "___ yerine kendi adınızı yazın." Türkçe karakterlerde zorlanan olursa göster. Süre bitince bir kişiye gelen cevabı sesli okut.</aside>
      </section>

      <!-- 9 -->
      <section>
        <h2>Claude nedir?</h2>
        <p>Claude, <strong>Anthropic</strong> şirketinin geliştirdiği bir <strong>yapay zeka asistanıdır</strong>.</p>
        <ul>
          <li>Çok büyük miktarda metin okuyarak dili öğrendi</li>
          <li>Sorunu anlar, cevabı <strong>yazarak üretir</strong></li>
        </ul>
        <p class="not-kutusu">🧠 Benzetme: <strong>Çok okumuş ama bazen kendinden fazla emin bir arkadaş</strong></p>
        <aside class="notes">Teknik ayrıntıya girme. "Cevabı bir yerden kopyalamaz, okuduklarından yola çıkarak yazar. Bu yüzden çoğu zaman çok iyidir ama bazen yanılır. 60. dakikada bunu kendi gözümüzle göreceğiz."</aside>
      </section>

      <!-- 10 -->
      <section>
        <h2>Neler yapabilir, nelere dikkat?</h2>
        <div class="iki-sutun">
          <div class="kutu iyi">
            <h3>✅ Yapabilir</h3>
            <ul>
              <li>Metin yazar, düzeltir</li>
              <li>Özetler, açıklar, çevirir</li>
              <li>Fikir ve liste üretir</li>
            </ul>
          </div>
          <div class="kutu kotu">
            <h3>⚠️ Dikkat</h3>
            <ul>
              <li>Yanılabilir, uydurabilir</li>
              <li>Her şeyi bilmez</li>
              <li>Son karar ve sorumluluk <strong>sende</strong></li>
            </ul>
          </div>
        </div>
        <aside class="notes">Sol sütun: günlük hayattan örnek ver (ödev açıklaması, e-posta, özet). Sağ sütun: "Claude bir yardımcı, karar veren sizsiniz."</aside>
      </section>

      <!-- 11 -->
      <section>
        <h2>Boşluğu doldur ✍️</h2>
        <p>Claude bir yapay zeka <span class="bosluk" data-cevap="asistanıdır"></span>.</p>
        <p>Claude da <span class="bosluk" data-cevap="hata"></span> yapabilir, bu yüzden cevabı <span class="bosluk" data-cevap="kontrol"></span> ederim.</p>
        <aside class="notes">Sınıfa sor, cevabı aldıktan sonra boşluğa tıkla. Boşluklar sırayla: asistanıdır, hata, kontrol.</aside>
      </section>

      <!-- 12 -->
      <section>
        <h2>İyi istemin formülü</h2>
        <div class="formul">
          <div class="kart"><h3>👥 Kim için?</h3><p>Kimler okuyacak?</p></div>
          <div class="kart"><h3>📝 Ne?</h3><p>Tam olarak ne istiyorsun?</p></div>
          <div class="kart"><h3>🎨 Nasıl?</h3><p>Uzunluk, ton, biçim</p></div>
        </div>
        <p class="not-kutusu">Ne kadar <strong>net</strong> anlatırsan, o kadar <strong>iyi</strong> cevap alırsın.</p>
        <aside class="notes">"İstem" = Claude'a yazdığımız mesaj. Benzetme: yeni gelen bir gönüllüye iş tarif etmek. "Bir şey yaz" dersen ne yapacağını bilemez. "Kimin için, ne, nasıl" dersen tam istediğini yapar.</aside>
      </section>

      <!-- 13 -->
      <section>
        <h2>Hangisi daha iyi?</h2>
        <div class="iki-sutun">
          <div class="kutu kotu">
            <h3>A <span class="fragment rozet">❌</span></h3>
            <div class="istem">Kızılay yaz</div>
          </div>
          <div class="kutu iyi">
            <h3>B <span class="fragment rozet">✅</span></h3>
            <div class="istem kucuk">Genç Kızılay için kan bağışı kampanyasına çağıran 3 cümlelik samimi bir Instagram duyurusu yaz.</div>
          </div>
        </div>
        <aside class="notes">Önce iki istemi sesli oku, sınıfa "Hangisi?" diye sor. Sonra → tuşuyla ❌ ve ✅ işaretlerini sırayla aç.</aside>
      </section>

      <!-- 14 -->
      <section>
        <h2>B neden daha iyi?</h2>
        <div class="secmeli">
          <button class="sik">Daha uzun olduğu için</button>
          <button class="sik" data-dogru>Kim için, ne ve nasıl olduğunu söylediği için</button>
          <button class="sik">Daha kibar olduğu için</button>
        </div>
        <aside class="notes">Oylat, sonra tıkla. Açıkla: Kim için = Genç Kızılay takipçileri. Ne = kan bağışı duyurusu. Nasıl = 3 cümle, samimi, Instagram. "Uzunluk tek başına bir şey değiştirmez, önemli olan net bilgi."</aside>
      </section>
```

`</div></div>` kapanışlarından sonra, `<script>` etiketlerinden önce ekle:
```html
  <img class="kose-logo" src="../gorseller/logolar/genc-kizilay.svg" alt="Genç Kızılay">
```

- [ ] **Step 4: Testlerin geçtiğini gör**

Run: `npx playwright test testler/hafta-1.spec.js`
Expected: Hepsi PASS. Taşma testi bir slaytı bildirirse o slaytta metni kısalt veya `istem` yerine `istem kucuk` kullan. Kural: anlatım listesinde en fazla 3 madde.

- [ ] **Step 5: Gözle kontrol**

`npm run serve` çalıştır ve `http://localhost:4173/hafta-1/` adresini tarayıcıda tam ekran aç. 1–14 arasında gez. Şıklara, boşluklara ve sayaca tıkla. `S` tuşuyla konuşmacı görünümünü aç.

- [ ] **Step 6: Commit**

```bash
git add hafta-1/index.html testler/hafta-1.spec.js
git commit -m "Hafta 1: slaytlar 1-14"
```

---

### Task 8: Hafta 1 slaytları 15–28 ve sunum bütünlük testleri

**Files:**
- Modify: `hafta-1/index.html` (`.slides` sonuna 15–28)
- Modify: `testler/hafta-1.spec.js`
- Test: `testler/hafta-1.spec.js`

**Interfaces:**
- Consumes: Task 7'deki `hafta-1/index.html` ve test dosyası
- Produces: 28 slaytlık tam sunum. Atlanabilir slaytların (16, 17, 23) notları `⏭ ATLANABİLİR` ile başlar.

- [ ] **Step 1: Testi 28 slayta genişlet (başarısız)**

`testler/hafta-1.spec.js` içindeki `BASLIKLAR` dizisini şununla değiştir:
```js
const BASLIKLAR = [
  'Claude ile Tanışma',
  'Bugün ne yapacağız?',
  'Isınma sorusu 🤔',
  'Yapay zekayı nerede gördünüz?',
  '1. Adım: Bilgisayara giriş',
  "2. Adım: Claude'a giriş",
  '3. Adım: Claude ekranını tanı',
  'İlk mesajını gönder',
  'Claude nedir?',
  'Neler yapabilir, nelere dikkat?',
  'Boşluğu doldur ✍️',
  'İyi istemin formülü',
  'Hangisi daha iyi?',
  'B neden daha iyi?',
  'Farkı kendin gör',
  'Beğenmedin mi? Sohbete devam et 💬',
  'Cevabı 2 kez düzelttir',
  'Formülü tamamla ✍️',
  'Mola ☕',
  'Claude da yanılabilir',
  'Hatayı bul 🔍',
  "🚫 Claude'a asla yazma",
  "Hangisini Claude'a yazabilirim?",
  'Kızılay görevi 🚑',
  'Sonuçlarımızı paylaşalım 🎤',
  'Çıkış quizi 🏁',
  'Bugün öğrendiklerimiz ✅',
  'Teşekkürler! 🙌',
];
```
"slayt başlıkları beklenen sırada" testini şununla değiştir:
```js
test('tam 28 slayt, başlıklar beklenen sırada', async ({ page }) => {
  const basliklar = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')].map((s) => s.querySelector('h1, h2').textContent.trim()));
  expect(basliklar).toEqual(BASLIKLAR);
});
```
Dosyanın sonuna ekle:
```js
test('sadece 16, 17 ve 23 numaralı slaytlar atlanabilir olarak işaretli', async ({ page }) => {
  const atlanabilir = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((s, i) => ({ no: i + 1, not: s.querySelector('aside.notes').textContent.trim() }))
      .filter((x) => x.not.startsWith('⏭ ATLANABİLİR')).map((x) => x.no));
  expect(atlanabilir).toEqual([16, 17, 23]);
});

test('"siz yapın" slaytları 8, 15, 17 ve 24', async ({ page }) => {
  const nolar = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((s, i) => (s.classList.contains('siz-yapin') ? i + 1 : 0)).filter(Boolean));
  expect(nolar).toEqual([8, 15, 17, 24]);
});

test('S tuşu konuşmacı görünümünü açar', async ({ page }) => {
  const [pencere] = await Promise.all([page.waitForEvent('popup'), page.keyboard.press('s')]);
  expect(pencere).toBeTruthy();
});
```

Run: `npx playwright test testler/hafta-1.spec.js`
Expected: "tam 28 slayt", "atlanabilir" ve "siz yapın" testleri FAIL.

- [ ] **Step 2: Slaytları yaz**

`hafta-1/index.html` içinde 14. slaydın `</section>` etiketinden sonra (`.slides` kapanmadan önce) ekle:
```html
      <!-- 15 -->
      <section class="siz-yapin" data-background-color="#141413">
        <p class="etiket">✋ Sıra sizde · 6 dakika</p>
        <h2>Farkı kendin gör</h2>
        <p>1️⃣ Önce A'yı gönder:</p>
        <div class="istem kucuk">Kızılay yaz</div>
        <p>2️⃣ <strong>Yeni sohbet</strong> aç, B'yi gönder:</p>
        <div class="istem kucuk">Genç Kızılay için kan bağışı kampanyasına çağıran 3 cümlelik samimi bir Instagram duyurusu yaz.</div>
        <div class="sayac" data-sure="360"></div>
        <aside class="notes">Sayacı başlat. Dolaş, yavaş yazanlara yardım et. Bitince 1–2 kişiye sor: "A'da ne geldi, B'de ne geldi?" Beklenen: A dağınık ve genel, B kullanıma hazır.</aside>
      </section>

      <!-- 16 -->
      <section>
        <h2>Beğenmedin mi? Sohbete devam et 💬</h2>
        <p>İlk cevap bir <strong>taslaktır</strong>. Aynı sohbette düzeltmesini iste:</p>
        <div class="cipler">
          <span class="cip">Daha kısa yap</span>
          <span class="cip">Daha resmi yaz</span>
          <span class="cip">Emoji ekle</span>
        </div>
        <p class="not-kutusu">Yeniden başlamana gerek yok, Claude önceki mesajları hatırlar.</p>
        <aside class="notes">⏭ ATLANABİLİR — Zaman darsa 16 ve 17'yi atla, 18'e geç. "Bir arkadaşınıza 'şunu biraz kısalt' der gibi yazın."</aside>
      </section>

      <!-- 17 -->
      <section class="siz-yapin" data-background-color="#141413">
        <p class="etiket">✋ Sıra sizde · 5 dakika</p>
        <h2>Cevabı 2 kez düzelttir</h2>
        <p>B'nin cevabının altına sırayla yaz:</p>
        <div class="istem kucuk">Daha kısa yap ve 2 emoji ekle.</div>
        <div class="istem kucuk">Şimdi daha resmi bir dille yaz.</div>
        <div class="sayac" data-sure="300"></div>
        <aside class="notes">⏭ ATLANABİLİR — Sayacı başlat. Bitince sor: "Hangi sürümü en çok beğendiniz?" Mesaj: aynı istek, farklı tonlar. Seçim sizin.</aside>
      </section>

      <!-- 18 -->
      <section>
        <h2>Formülü tamamla ✍️</h2>
        <p>İyi istem: <span class="bosluk" data-cevap="Kim"></span> için? + <span class="bosluk" data-cevap="Ne"></span>? + <span class="bosluk" data-cevap="Nasıl"></span>?</p>
        <p>İlk cevabı beğenmezsem <span class="bosluk" data-cevap="sohbete devam"></span> ederim.</p>
        <aside class="notes">Sınıfa sor, sonra boşluklara sırayla tıkla: Kim, Ne, Nasıl, sohbete devam.</aside>
      </section>

      <!-- 19 -->
      <section>
        <h2>Mola ☕</h2>
        <p>5 dakika sonra devam ediyoruz. <strong>Bilgisayarı kapatma!</strong></p>
        <div class="sayac" data-sure="300"></div>
        <aside class="notes">Sayacı başlat. Molada takılan masalara git. Moladan sonra yarısının döndüğünü görmeden başlama.</aside>
      </section>

      <!-- 20 -->
      <section>
        <h2>Claude da yanılabilir</h2>
        <p>Bazen <strong>kendinden emin bir şekilde yanlış</strong> bilgi verebilir.</p>
        <ul>
          <li>Özellikle <strong>tarih, sayı, isim ve kaynaklarda</strong></li>
          <li>Önemli bilgiyi <strong>başka bir kaynaktan</strong> kontrol et</li>
        </ul>
        <p class="not-kutusu">🧠 Hatırla: çok okumuş ama bazen kendinden fazla emin bir arkadaş</p>
        <aside class="notes">Buna "uydurma" ya da "halüsinasyon" denir. Claude yalan söylemez ama bilmediği yerde akla yatkın bir şey üretebilir. Resmi bir yazıya girecek her bilgi kontrol edilir.</aside>
      </section>

      <!-- 21 -->
      <section>
        <h2>Hatayı bul 🔍</h2>
        <p>Claude'dan şöyle bir cevap geldiğini düşünün:</p>
        <div class="cevap-kutusu">Türk Kızılay <strong>1923</strong> yılında kuruldu. Afetlerde barınma ve beslenme desteği verir, kan bağışı çalışmaları yürütür.</div>
        <p class="fragment not-kutusu">❌ 1923 değil → ✅ <strong>1868</strong> (Osmanlı döneminde, İstanbul'da kuruldu)</p>
        <aside class="notes">Sınıfa sor: "Bu cevapta bir yanlış var, hangisi?" Bulan olursa → ile cevabı aç. Doğrulama kaynağı: kizilay.org.tr tarihçe sayfası. Mesaj: "Cevap çok düzgün ve emin görünüyor, ama yanlış. Bu yüzden kontrol ediyoruz."</aside>
      </section>

      <!-- 22 -->
      <section>
        <h2>🚫 Claude'a asla yazma</h2>
        <div class="iki-sutun">
          <div class="kutu kotu">
            <h3>Kişisel bilgiler</h3>
            <ul>
              <li>TC kimlik no</li>
              <li>Telefon, adres</li>
              <li>Şifreler</li>
            </ul>
          </div>
          <div class="kutu kotu">
            <h3>Kızılay'da</h3>
            <ul>
              <li><strong>Afetzedelerin</strong> bilgileri</li>
              <li>Bağışçıların sağlık bilgileri</li>
              <li>Gönüllülerin iletişim bilgileri</li>
            </ul>
          </div>
        </div>
        <p class="not-kutusu">Kural: <strong>"Bunu bir yabancıya söyler miydim?"</strong> Hayırsa yazma.</p>
        <aside class="notes">KVKK'dan kısaca bahset: başkasının kişisel verisi bize emanettir. Bir metinde gerçek isim gerekiyorsa "[isim]" diye yer tutucu kullanıp sonradan kendin doldur.</aside>
      </section>

      <!-- 23 -->
      <section>
        <h2>Hangisini Claude'a yazabilirim?</h2>
        <div class="secmeli">
          <button class="sik" data-dogru>"Kan bağışı günü için afiş metni yaz."</button>
          <button class="sik">"Ayşe K., TC no'su ve adresi şu... Ona yardım mektubu yaz."</button>
          <button class="sik">"Şu şifrem güvenli mi: ..."</button>
          <button class="sik" data-dogru>"Gönüllü toplantısı için 5 maddelik gündem öner."</button>
        </div>
        <aside class="notes">⏭ ATLANABİLİR — Her şıkkı sırayla oylat ve tıkla. Doğrular: 1 ve 4. İkincisi için: "Mektup yazdırılabilir ama TC no ve adres olmadan, [isim] yer tutucusuyla."</aside>
      </section>

      <!-- 24 -->
      <section class="siz-yapin" data-background-color="#141413">
        <p class="etiket">✋ Sıra sizde · 8 dakika</p>
        <h2>Kızılay görevi 🚑</h2>
        <p>Birini seç, <strong>formülü</strong> kullan (Kim için + Ne + Nasıl):</p>
        <div class="kartlar">
          <div class="kart"><p>🎒 Deprem çantası kontrol listesi</p></div>
          <div class="kart"><p>🩸 Kan bağışı duyurusu</p></div>
          <div class="kart"><p>🤝 Yeni gönüllüye hoş geldin mesajı</p></div>
        </div>
        <div class="istem kucuk">Örnek: Genç Kızılay gönüllüleri için deprem çantasına konacak 10 maddelik kısa bir kontrol listesi hazırla.</div>
        <div class="sayac" data-sure="480"></div>
        <aside class="notes">Sayacı başlat. Örneği kopyalamak yerine kendi istemlerini yazmaya teşvik et. Bitirenlere: "Bir kez düzelttirin." Dolaşırken paylaşılacak 2–3 güzel örnek seç.</aside>
      </section>

      <!-- 25 -->
      <section>
        <h2>Sonuçlarımızı paylaşalım 🎤</h2>
        <ul>
          <li>2–3 gönüllü sonucunu sesli okusun</li>
          <li>İstemine <strong>ne yazdın?</strong></li>
          <li>Sonradan <strong>neyi düzelttirdin?</strong></li>
        </ul>
        <aside class="notes">Görevde seçtiğin örneklere söz ver. Her paylaşımdan sonra formülün hangi parçasının iyi kullanıldığını söyle. Alkış!</aside>
      </section>

      <!-- 26 -->
      <section>
        <h2>Çıkış quizi 🏁</h2>
        <p>1. İyi istem: Kim için + Ne + <span class="bosluk" data-cevap="Nasıl"></span></p>
        <p>2. "Claude'un cevabı her zaman doğrudur."</p>
        <div class="secmeli yatay">
          <button class="sik">Doğru</button>
          <button class="sik" data-dogru>Yanlış</button>
        </div>
        <p>3. Afetzedelerin bilgilerini Claude'a <span class="bosluk" data-cevap="yazmam"></span>.</p>
        <aside class="notes">Hızlı tur, sınıf hep birlikte cevaplasın. Sırayla: boşluk (Nasıl), seçmeli (Yanlış), boşluk (yazmam).</aside>
      </section>

      <!-- 27 -->
      <section>
        <h2>Bugün öğrendiklerimiz ✅</h2>
        <ol>
          <li>Claude'a girip sohbet etmek</li>
          <li><strong>Kim için + Ne + Nasıl</strong> ile iyi istem yazmak</li>
          <li>Cevabı <strong>kontrol etmek</strong>, kişisel veriyi paylaşmamak</li>
        </ol>
        <p class="not-kutusu">📅 Gelecek hafta: <strong>Claude ile Yazmak</strong> (dilekçe, duyuru, e-posta)</p>
        <aside class="notes">Üç maddeyi sınıfla birlikte tekrar et. Gelecek haftanın konusunu duyur, "Evde bu hafta öğrendiğinizle bir şey deneyin" de.</aside>
      </section>

      <!-- 28 -->
      <section>
        <h2>Teşekkürler! 🙌</h2>
        <div class="iki-sutun">
          <div>
            <p>🎓 Katılım belgeleri Genç Kızılay ÇOMÜ tarafından iletilecek.</p>
            <p class="not-kutusu">🔒 Çıkmadan önce <strong>Claude'dan ve Google hesabından çıkış yap!</strong></p>
          </div>
          <div>
            <img class="karekod" src="../gorseller/hafta-1/site-karekod.svg" alt="Sunum sitesinin karekodu">
            <p>Sunuma tekrar bak</p>
          </div>
        </div>
        <aside class="notes">Teşekkür et. ÇIKIŞ YAPMAYI MUTLAKA HATIRLAT, bu ortak bir bilgisayar. Karekod sunum sitesine götürür. Masa asistanlarına teşekkür et.</aside>
      </section>
```

- [ ] **Step 3: Testlerin geçtiğini gör**

Run: `npx playwright test`
Expected: Bütün testler PASS. Taşma testi bir slaytı bildirirse (özellikle 15, 17, 23, 24) metni kısalt veya `istem kucuk` / daha az şık kullan. Başlığı değiştirme (test başlıklara bağlı).

- [ ] **Step 4: Gözle kontrol**

`npm run serve` ile `http://localhost:4173/hafta-1/` adresini aç. 15–28 arasında gez. 21'de → ile cevabın açıldığını, 23'te iki doğru şıkkın da yeşil olduğunu, 28'de karekodun okunduğunu (telefon kamerasıyla) kontrol et.

- [ ] **Step 5: Commit**

```bash
git add hafta-1/index.html testler/hafta-1.spec.js
git commit -m "Hafta 1: slaytlar 15-28 ve sunum bütünlük testleri"
```

---

### Task 9: Seri vitrini (ana sayfa)

**Files:**
- Create: `index.html`, `ortak/css/vitrin.css`
- Test: `testler/vitrin.spec.js`

**Interfaces:**
- Consumes: `ortak/css/fontlar.css`, logo yolları
- Produces: Site kök sayfası. Hafta 1 kartı `hafta-1/` adresine gider, diğerleri "Yakında" olarak görünür.

- [ ] **Step 1: Başarısız testi yaz**

`testler/vitrin.spec.js`:
```js
import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { hataTopla } from './yardimci.js';

test('vitrin hatasız açılır, 4 hafta kartı var, Hafta 1 sunuma götürür', async ({ page }) => {
  const hatalar = hataTopla(page);
  await page.goto('./');
  await expect(page.locator('.hafta-karti')).toHaveCount(4);
  await page.getByRole('link', { name: /Claude ile Tanışma/ }).click();
  await expect(page).toHaveURL(/hafta-1\//);
  expect(hatalar).toEqual([]);
});

test('telefonda yatay kaydırma yok', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('./');
  const tasma = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(tasma).toBeLessThanOrEqual(0);
});

test('hiçbir HTML dosyasında "/" ile başlayan yol yok (Pages alt dizini)', () => {
  const htmller = [];
  const gez = (d) => {
    for (const ad of readdirSync(d)) {
      if (['node_modules', '.git', 'test-results', 'playwright-report', 'vendor'].includes(ad)) continue;
      const yol = join(d, ad);
      if (statSync(yol).isDirectory()) gez(yol);
      else if (ad.endsWith('.html')) htmller.push(yol);
    }
  };
  gez('.');
  const sorunlu = htmller.filter((f) => /(src|href)="\/(?!\/)/.test(readFileSync(f, 'utf8')));
  expect(sorunlu).toEqual([]);
});
```

- [ ] **Step 2: Başarısız olduğunu gör**

Run: `npx playwright test testler/vitrin.spec.js`
Expected: İlk iki test FAIL (`index.html` yok). Üçüncüsü PASS.

- [ ] **Step 3: Vitrini yaz**

`index.html`:
```html
<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Yapay Zeka Eğitimleri · Genç Kızılay ÇOMÜ</title>
  <meta name="description" content="Genç Kızılay ÇOMÜ Eğitim Birimi uygulamalı yapay zeka eğitimleri sunumları.">
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="ortak/css/fontlar.css">
  <link rel="stylesheet" href="ortak/css/vitrin.css">
</head>
<body>
  <main class="sayfa">
    <header class="ust">
      <div class="logolar">
        <img src="gorseller/logolar/genc-kizilay.svg" alt="Genç Kızılay logosu">
        <img src="gorseller/logolar/comu.svg" alt="ÇOMÜ logosu">
      </div>
      <p class="ust-baslik">Genç Kızılay ÇOMÜ · Eğitim Birimi</p>
      <h1>Yapay Zeka Eğitimleri</h1>
      <p class="aciklama">Her salı, Teknik Bilimler MYO Lab3'te uygulamalı eğitim. Sunumlara buradan ulaşabilirsin.</p>
    </header>
    <section class="haftalar">
      <a class="hafta-karti aktif" href="hafta-1/">
        <span class="hafta-no">Hafta 1 · 1 Aralık</span>
        <span class="hafta-adi">Claude ile Tanışma</span>
        <span class="hafta-durum">Sunumu aç →</span>
      </a>
      <div class="hafta-karti">
        <span class="hafta-no">Hafta 2</span>
        <span class="hafta-adi">Claude ile Yazmak</span>
        <span class="hafta-durum">Yakında</span>
      </div>
      <div class="hafta-karti">
        <span class="hafta-no">Hafta 3</span>
        <span class="hafta-adi">Office + Yapay Zeka</span>
        <span class="hafta-durum">Yakında</span>
      </div>
      <div class="hafta-karti">
        <span class="hafta-no">Hafta 4</span>
        <span class="hafta-adi">Kod Yazmadan Üretmek</span>
        <span class="hafta-durum">Yakında</span>
      </div>
    </section>
  </main>
</body>
</html>
```

`ortak/css/vitrin.css`:
```css
:root {
  --turuncu: #D97757; --krem: #FAF9F5; --koyu: #141413; --acik-gri: #E8E6DC; --gri: #B0AEA5;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--krem); color: var(--koyu); font-family: 'Inter', sans-serif; line-height: 1.5; }
.sayfa { max-width: 1040px; margin: 0 auto; padding: 48px 16px 64px; }
.logolar { display: flex; gap: 16px; margin-bottom: 24px; }
.logolar img { height: 72px; width: auto; }
.ust-baslik { margin: 0; font-weight: 700; color: var(--turuncu); letter-spacing: 0.03em; }
h1 { font-family: 'Poppins', sans-serif; font-size: clamp(2rem, 6vw, 3.5rem); line-height: 1.1; margin: 8px 0 16px; }
.aciklama { font-size: 1.125rem; max-width: 40em; margin: 0 0 40px; }
.haftalar { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
.hafta-karti { display: flex; flex-direction: column; gap: 8px; padding: 24px; border-radius: 20px; background: #fff; border: 2px solid var(--acik-gri); color: inherit; text-decoration: none; }
.hafta-karti.aktif { border-color: var(--turuncu); border-top-width: 8px; }
.hafta-karti.aktif:hover, .hafta-karti.aktif:focus-visible { box-shadow: 0 8px 24px rgba(20, 20, 19, 0.12); outline: none; }
.hafta-no { font-size: 0.875rem; font-weight: 700; color: var(--gri); }
.aktif .hafta-no { color: var(--koyu); }
.hafta-adi { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1.25rem; }
.hafta-durum { margin-top: auto; font-weight: 700; color: var(--gri); }
.aktif .hafta-durum { color: var(--turuncu); }
```

- [ ] **Step 4: Testlerin geçtiğini gör**

Run: `npx playwright test`
Expected: Bütün testler PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html ortak/css/vitrin.css testler/vitrin.spec.js
git commit -m "Seri vitrini ana sayfası"
```

---

### Task 10: GitHub'a yükleme ve Pages yayını

> Bu task dışarıya yayın yapar. **Her adımdan önce Eyüp'ün onayını al.** `gh` CLI kurulu değil.

**Files:** (kod değişikliği yok)

**Interfaces:**
- Consumes: Task 1–9'un commit'leri
- Produces: `https://eyupcalskanozturk-tr.github.io/claude-egitim/` adresinde canlı site

- [ ] **Step 1: Repo oluştur (onayla)**

Eyüp'e sor: "`eyupcalskanozturk-tr/claude-egitim` adında **herkese açık** bir repo oluşturayım mı?" (GitHub Pages ücretsiz planda herkese açık repo gerektirir.) Onay gelirse GitHub MCP `create_repository` aracıyla (`name: claude-egitim`, `private: false`, açıklama: "Genç Kızılay ÇOMÜ yapay zeka eğitimleri sunum sitesi") oluştur. Ya da Eyüp'ten github.com/new üzerinden oluşturmasını iste.

- [ ] **Step 2: Gönder (onayla)**

```powershell
cd C:\Users\eyupc\claude-egitim; git remote add origin https://github.com/eyupcalskanozturk-tr/claude-egitim.git; git push -u origin main
```

- [ ] **Step 3: Pages'i aç**

Eyüp şu yoldan açar: GitHub → repo → Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, klasör `/ (root)` → Save. Yayının çıkması 1–2 dakika sürer.

- [ ] **Step 4: Canlı siteye karşı testleri çalıştır**

```powershell
$env:BASE_URL = 'https://eyupcalskanozturk-tr.github.io/claude-egitim/'; npx playwright test
```
Expected: Bütün testler PASS. (`vitrin.spec.js` içindeki dosya sistemi testi yerel dosyaları okur, o da geçer.)

---

### Task 11: Gerçek görselleri yerleştirme (girdiler geldikçe)

> Eyüp'ten logo veya ekran görüntüsü geldiğinde yapılır. Gelmezse yer tutucular kalır, site çalışmaya devam eder.

**Files:**
- Create: `gorseller/logolar/genc-kizilay.(svg|png)`, `gorseller/logolar/comu.(svg|png)`, `gorseller/hafta-1/cportal.png`, `gorseller/hafta-1/claude-giris.png`, `gorseller/hafta-1/claude-ekran.png`
- Modify: `hafta-1/index.html`, `index.html`, `testler/gorseller.spec.js` (yalnızca değişen yollar)

- [ ] **Step 1: Görseli ekle**

Gelen dosyayı ilgili adla `gorseller/...` altına koy. claude.ai ekran görüntüleri için: Eyüp'ün izniyle, **boş yeni sohbet ekranında** ve sol taraftaki sohbet geçmişi görünmeyecek şekilde kırpılarak alınır. Kişisel bilgi (ad, e-posta) görünüyorsa bulanıklaştır.

- [ ] **Step 2: Yolları güncelle**

Uzantı `.svg`'den `.png`'ye değiştiyse `hafta-1/index.html`, `index.html` ve `testler/gorseller.spec.js` içinde o dosyanın yolunu güncelle. `gorseller.spec.js` içinde `.png` dosyaları için `toContain('<svg')` yerine şunu kullan:
```js
expect(yanit.headers()['content-type']).toContain('image/png');
```

- [ ] **Step 3: Halkaları hizala**

5, 6 ve 7. slaytlarda `.halka` öğesinin `style="left: X%; top: Y%"` değerini, gerçek görselde tıklanacak düğmenin merkezine göre ayarla. `npm run serve` ile gözle kontrol et.

- [ ] **Step 4: Testler ve commit**

Run: `npx playwright test`
Expected: Bütün testler PASS.
```bash
git add gorseller hafta-1/index.html index.html testler/gorseller.spec.js
git commit -m "Gerçek logo ve ekran görüntüleri"
```

---

## Elle Yapılacak Prova (spec §8)

- [ ] 29 Kasım: Eyüp sunumu konuşmacı notlarından okuyarak baştan sona dener, süreyi tutar. 90 dakikayı aşarsa atlanabilir slaytlar (16, 17, 23) işaretlenir.
- [ ] Lab testi (26–27 Kasım): Lab projeksiyonunda site açılır, arka sıradan okunabilirlik kontrol edilir. Projeksiyon "genişlet" modunda mı "yansıt" modunda mı, not edilir.
