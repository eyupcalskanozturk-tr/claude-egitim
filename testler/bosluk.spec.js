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
