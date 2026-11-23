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
      if (['node_modules', '.git', '.superpowers', 'test-results', 'playwright-report', 'vendor'].includes(ad)) continue;
      const yol = join(d, ad);
      if (statSync(yol).isDirectory()) gez(yol);
      else if (ad.endsWith('.html')) htmller.push(yol);
    }
  };
  gez('.');
  const sorunlu = htmller.filter((f) => /(src|href)="\/(?!\/)/.test(readFileSync(f, 'utf8')));
  expect(sorunlu).toEqual([]);
});
