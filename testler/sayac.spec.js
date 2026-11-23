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
    expect(await page.evaluate(() => document.activeElement.classList.contains('sayac-dugme'))).toBe(false);
    await page.keyboard.press('Space');
    await expect.poll(() => page.evaluate(() => Reveal.getCurrentSlide().id)).toBe('mola');
    await expect(baslat(page)).toHaveText('Duraklat');
  });

  test('her sayaç bağımsız: mola sayacı 05:00 gösterir', async ({ page }) => {
    await expect(page.locator('#mola .sayac-ekran')).toHaveText('05:00');
  });
});
