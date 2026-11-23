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
