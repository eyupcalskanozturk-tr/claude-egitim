import { test, expect } from '@playwright/test';
import { hazirBekle, hataTopla } from './yardimci.js';

const KAGIT = 'rgb(251, 248, 241)';
const MUREKKEP = 'rgb(34, 32, 90)';
const GECE = 'rgb(13, 15, 26)';
const BEYAZ = 'rgb(245, 243, 238)';
const TURUNCU = 'rgb(217, 119, 87)';

test('örnek sunum hatasız açılır', async ({ page }) => {
  const hatalar = hataTopla(page);
  await page.goto('testler/ornek.html');
  await hazirBekle(page);
  expect(hatalar).toEqual([]);
});

test('anlatım: kareli kâğıt zemin, Fraunces başlık ≥64px, mürekkep gövde ≥36px', async ({ page }) => {
  await page.goto('testler/ornek.html#/anlatim');
  await hazirBekle(page);
  const s = await page.evaluate(() => {
    const sec = document.getElementById('anlatim');
    const h2 = getComputedStyle(sec.querySelector('h2'));
    const li = getComputedStyle(sec.querySelector('li'));
    return {
      zemin: getComputedStyle(document.body).backgroundColor,
      baslikFont: h2.fontFamily, baslikBoyut: parseFloat(h2.fontSize), izgara: getComputedStyle(document.body).backgroundImage,
      govdeBoyut: parseFloat(li.fontSize), govdeRenk: li.color,
    };
  });
  expect(s.zemin).toBe(KAGIT);
  expect(s.izgara).toContain('linear-gradient');
  expect(s.baslikFont).toContain('Fraunces');
  expect(s.baslikBoyut).toBeGreaterThanOrEqual(64);
  expect(s.govdeBoyut).toBeGreaterThanOrEqual(36);
  expect(s.govdeRenk).toBe(MUREKKEP);
});

test('strong vurgusu kalın görünür (reset.css sıfırlamasına rağmen)', async ({ page }) => {
  await page.goto('testler/ornek.html#/anlatim');
  await hazirBekle(page);
  await expect(page.locator('#anlatim strong')).toHaveCSS('font-weight', '700');
});

test('"Claude\'un cevabı" etiketi beyaz zeminde okunur (≥4.5:1 kontrast)', async ({ page }) => {
  await page.goto('hafta-1/');
  await hazirBekle(page);
  await page.evaluate(() => Reveal.slide([...document.querySelectorAll('.reveal .slides > section')].findIndex((s) => s.querySelector('.cevap-kutusu'))));
  await hazirBekle(page);
  const renk = await page.locator('.cevap-kutusu').evaluate((e) => getComputedStyle(e, '::before').color);
  const [r, g, b] = renk.match(/\d+/g).map(Number);
  const l = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const parlaklik = 0.2126 * l(r) + 0.7152 * l(g) + 0.0722 * l(b);
  expect((1 + 0.05) / (parlaklik + 0.05)).toBeGreaterThanOrEqual(4.5);
});

test('siz yapın: gece zemini (ışık halkalı), açık renk başlık', async ({ page }) => {
  await page.goto('testler/ornek.html#/siz-yapin');
  await hazirBekle(page);
  const s = await page.evaluate(() => {
    const bg = document.querySelector('.backgrounds .slide-background.present');
    const icerik = bg.querySelector('.slide-background-content');
    return {
      zeminler: [getComputedStyle(bg).backgroundColor, icerik ? getComputedStyle(icerik).backgroundColor : ''],
      desen: getComputedStyle(bg).backgroundImage + (icerik ? getComputedStyle(icerik).backgroundImage : ''),
      baslik: getComputedStyle(document.querySelector('#siz-yapin h2')).color,
    };
  });
  expect(s.zeminler).toContain(GECE);
  expect(s.desen).toContain('radial-gradient');
  expect(s.baslik).toBe(BEYAZ);
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
