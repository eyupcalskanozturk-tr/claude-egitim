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
  // Slayt ilerleyince önceki slayt aria-hidden olur; getByRole yerine CSS seçici.
  const dogru = page.locator('#secmeli .sik[data-dogru]');
  await dogru.click();
  // Odak şıkta kalırsa Enter (veya bazı sunum kumandaları) şıkkı tekrar tetikler.
  expect(await page.evaluate(() => document.activeElement.classList.contains('sik'))).toBe(false);
  await page.keyboard.press('Space');
  await expect(dogru).toHaveClass(/dogru/);
  await expect.poll(() => page.evaluate(() => Reveal.getCurrentSlide().id)).toBe('bosluk');
});
