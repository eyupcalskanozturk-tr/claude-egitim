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
