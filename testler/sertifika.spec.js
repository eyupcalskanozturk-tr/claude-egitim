import { test, expect } from '@playwright/test';
import { hataTopla } from './yardimci.js';

const ADRES = '/sertifika/belge.html';

test('her hafta kendi parçasını ve doğru desen kesitini çizer', async ({ page }) => {
  const hatalar = hataTopla(page);
  const beklenen = { 1: '0 0 297 210', 2: '297 0 297 210', 3: '0 210 297 210', 4: '297 210 297 210' };
  for (const h of [1, 2, 3, 4]) {
    await page.goto(`${ADRES}?hafta=${h}&ad=Deneme`);
    await expect(page.locator('.sayfa')).toHaveCount(1);
    await expect(page.locator('.hafta')).toContainText(`${h}. hafta`);
    await expect(page.locator('.desen')).toHaveAttribute('viewBox', beklenen[h]);
  }
  expect(hatalar).toEqual([]);
});

test('birleşik görünüm dört parçayı 2×2 dizer', async ({ page }) => {
  await page.goto(`${ADRES}?tum=1`);
  const kutular = await page.locator('.sayfa').evaluateAll((s) => s.map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y)]; }));
  expect(kutular).toHaveLength(4);
  expect(kutular[1][0]).toBeGreaterThan(kutular[0][0]);
  expect(kutular[2][1]).toBeGreaterThan(kutular[0][1]);
  expect(kutular[3]).toEqual([kutular[1][0], kutular[2][1]]);
});

test('belgeleriCiz birden çok ismi ayrı sayfalara güvenle yazar', async ({ page }) => {
  await page.goto(`${ADRES}?hafta=1`);
  await page.evaluate(() => window.belgeleriCiz(2, ['Ayşe Yılmaz', '<b>Ali</b> & Veli']));
  await expect(page.locator('.sayfa')).toHaveCount(2);
  await expect(page.locator('.hafta').first()).toContainText('2. hafta');
  await expect(page.locator('.ad').nth(1)).toHaveText('<b>Ali</b> & Veli');
});

test('PDF çıktısında her isim tam olarak bir A4 sayfa', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'PDF yalnızca Chromium');
  await page.goto(`${ADRES}?hafta=1`);
  await page.evaluate(() => window.belgeleriCiz(3, ['Bir', 'İki', 'Üç']));
  await page.evaluate(() => document.fonts.ready);
  const pdf = (await page.pdf({ preferCSSPageSize: true, printBackground: true })).toString('latin1');
  expect(pdf.match(/\/Type\s*\/Page[^s]/g)).toHaveLength(3);
  const boyut = pdf.match(/\/MediaBox\s*\[\s*0 0 ([\d.]+) ([\d.]+)/);
  expect(Math.round(Number(boyut[1]))).toBe(842); // 297 mm
  expect(Math.round(Number(boyut[2]))).toBe(595); // 210 mm
});

test('yerelde damgasız, yayındaki sitede ÖRNEK damgalı', async ({ page }) => {
  await page.goto(`${ADRES}?hafta=1`);
  await expect(page.locator('body')).not.toHaveClass(/ornek/);
  await page.route('https://ornek.github.io/**', (r) => r.fulfill({ path: 'sertifika/belge.html', contentType: 'text/html' }));
  await page.goto('https://ornek.github.io/sertifika/belge.html?hafta=1');
  await expect(page.locator('body')).toHaveClass(/ornek/);
});
