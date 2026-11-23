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
