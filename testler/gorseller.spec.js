import { test, expect } from '@playwright/test';

const yollar = [
  'gorseller/logolar/genc-kizilay.png',
  'gorseller/logolar/comu.png',
  'gorseller/logolar/claude.svg',
  'gorseller/yildiz-gece.svg',
  'gorseller/hafta-1/cportal.svg',
  'gorseller/hafta-1/claude-giris.svg',
  'gorseller/hafta-1/claude-ekran.svg',
  'gorseller/hafta-1/site-karekod.svg',
  'gorseller/hafta-1/foto-gencler.jpg',
  'gorseller/hafta-1/foto-kar.jpg',
  'gorseller/logolar/tbmyo.png',
  'gorseller/hafta-1/foto-eller.jpg',
];

const tip = { svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg' };

for (const yol of yollar) {
  test(`görsel mevcut: ${yol}`, async ({ request }) => {
    const yanit = await request.get(yol);
    expect(yanit.status()).toBe(200);
    expect(yanit.headers()['content-type']).toContain(tip[yol.split('.').pop()]);
  });
}

test('yer tutucu görsel kalmadı', async ({ request }) => {
  for (const yol of yollar.filter((y) => y.endsWith('.svg'))) {
    expect(await (await request.get(yol)).text()).not.toContain('buraya gelecek');
  }
});
