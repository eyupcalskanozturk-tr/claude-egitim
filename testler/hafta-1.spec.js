import { test, expect } from '@playwright/test';
import { hazirBekle, hataTopla } from './yardimci.js';

const BASLIKLAR = [
  'Claude ile Tanışma',
  'Bugün ne yapacağız?',
  'Isınma sorusu 🤔',
  'Yapay zekayı nerede gördünüz?',
  '1. Adım: Bilgisayara giriş',
  "2. Adım: Claude'a giriş",
  '3. Adım: Claude ekranını tanı',
  'İlk mesajını gönder',
  'Claude nedir?',
  'Neler yapabilir, nelere dikkat?',
  'Boşluğu doldur ✍️',
  'İyi istemin formülü',
  'Hangisi daha iyi?',
  'B neden daha iyi?',
  'Farkı kendin gör',
  'Beğenmedin mi? Sohbete devam et 💬',
  'Cevabı 2 kez düzelttir',
  'Formülü tamamla ✍️',
  'Mola ☕',
  'Claude da yanılabilir',
  'Hatayı bul 🔍',
  "🚫 Claude'a asla yazma",
  "Hangisini Claude'a yazabilirim?",
  'Kızılay görevi 🚑',
  'Sonuçlarımızı paylaşalım 🎤',
  'Çıkış quizi 🏁',
  'Bugün öğrendiklerimiz ✅',
  'Teşekkürler! 🙌',
];

test.beforeEach(async ({ page }) => {
  await page.goto('hafta-1/');
  await hazirBekle(page);
});

test('sunum hatasız açılır, bütün görseller yüklenir', async ({ page }) => {
  const hatalar = hataTopla(page);
  await page.reload();
  await hazirBekle(page);
  const bozuk = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
  expect(bozuk).toEqual([]);
  expect(hatalar).toEqual([]);
});

test('tam 28 slayt, başlıklar beklenen sırada', async ({ page }) => {
  const basliklar = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')].map((s) => s.querySelector('h1, h2').textContent.trim()));
  expect(basliklar).toEqual(BASLIKLAR);
});

test('sadece 16, 17 ve 23 numaralı slaytlar atlanabilir olarak işaretli', async ({ page }) => {
  const atlanabilir = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((s, i) => ({ no: i + 1, not: s.querySelector('aside.notes').textContent.trim() }))
      .filter((x) => x.not.startsWith('⏭ ATLANABİLİR')).map((x) => x.no));
  expect(atlanabilir).toEqual([16, 17, 23]);
});

test('"siz yapın" slaytları 8, 15, 17 ve 24', async ({ page }) => {
  const nolar = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((s, i) => (s.classList.contains('siz-yapin') ? i + 1 : 0)).filter(Boolean));
  expect(nolar).toEqual([8, 15, 17, 24]);
});

test('S tuşu konuşmacı görünümünü açar', async ({ page }) => {
  const [pencere] = await Promise.all([page.waitForEvent('popup'), page.keyboard.press('s')]);
  expect(pencere).toBeTruthy();
});

test('her slaytta boş olmayan konuşmacı notu var', async ({ page }) => {
  const notsuz = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((s, i) => ({ no: i + 1, not: (s.querySelector('aside.notes') || { textContent: '' }).textContent.trim() }))
      .filter((x) => x.not.length < 20).map((x) => x.no));
  expect(notsuz).toEqual([]);
});

test('"siz yapın" slaytları koyu zeminli ve sayaçlı', async ({ page }) => {
  const s = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section.siz-yapin')].map((sec) => ({
      zemin: sec.getAttribute('data-background-color'), sayac: !!sec.querySelector('.sayac[data-sure]'),
    })));
  expect(s.length).toBeGreaterThanOrEqual(1);
  for (const x of s) expect(x).toEqual({ zemin: '#141413', sayac: true });
});

test('soru slaytlarında en az bir doğru şık var', async ({ page }) => {
  const dogrusuz = await page.evaluate(() =>
    [...document.querySelectorAll('.secmeli')].filter((g) => !g.querySelector('[data-dogru]')).length);
  expect(dogrusuz).toBe(0);
});

for (const [g, y] of [[1920, 1080], [1280, 720], [1024, 768]]) {
  test(`hiçbir slayt taşmaz (${g}×${y})`, async ({ page }) => {
    await page.setViewportSize({ width: g, height: y });
    await page.reload();
    await hazirBekle(page);
    await page.evaluate(() => document.fonts.ready);
    const tasan = await page.evaluate(() => {
      const sonuc = [];
      const adet = document.querySelectorAll('.reveal .slides > section').length;
      for (let i = 0; i < adet; i++) {
        Reveal.slide(i);
        const s = Reveal.getCurrentSlide();
        if (s.scrollHeight > 1080 || s.scrollWidth > 1920) sonuc.push({ no: i + 1, h: s.scrollHeight, w: s.scrollWidth });
      }
      return sonuc;
    });
    expect(tasan).toEqual([]);
  });
}
