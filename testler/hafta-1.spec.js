import { test, expect } from '@playwright/test';
import { hazirBekle, hataTopla } from './yardimci.js';

const BASLIKLAR = [
  'Claude ile Tanışma',
  'Yapay zeka eğitimleri serisi',
  'Bugün ne yapacağız?',
  'Isınma sorusu',
  'Yapay zekayı nerede gördünüz?',
  'Yapay zeka ve Claude',
  'Yapay zeka nedir?',
  'Üretken yapay zeka',
  'Nasıl çalışır?',
  'Claude nedir?',
  'Neler yapabilir, nelere dikkat?',
  'Boşluğu doldur',
  'Claude ile tanış',
  '1. Adım: Bilgisayara giriş',
  "2. Adım: Claude'a giriş",
  '3. Adım: Claude ekranını tanı',
  'İlk mesajını gönder',
  'İyi soru sormak',
  'İyi istemin formülü',
  'Hangisi daha iyi?',
  'B neden daha iyi?',
  'Farkı kendin gör',
  'Altı altın ipucu',
  'Bir örnek sohbet',
  'Beğenmedin mi? Sohbete devam et',
  'Cevabı 2 kez düzelttir',
  'Formülü tamamla',
  'Kontrol et, güvenli kullan',
  'Claude da yanılabilir',
  'Hatayı bul',
  'Cevabı nasıl kontrol ederim?',
  "Claude'a asla yazma",
  "Hangisini Claude'a yazabilirim?",
  'Öğrenmek için kullan',
  'Öğrendiğini kullan',
  'Kızılay görevi',
  'Sonuçlarımızı paylaşalım',
  'Mini sözlük',
  'Çıkış quizi',
  'Bugün öğrendiklerimiz',
  'Teşekkürler!',
];

test.beforeEach(async ({ page }) => {
  await page.goto('hafta-1/');
  await hazirBekle(page);
});

const slaytlar = (page) => page.locator('.reveal .slides > section');
const slaytBaslikla = (page, baslik) =>
  slaytlar(page).filter({ has: page.locator('h1, h2', { hasText: new RegExp(`^\\s*${baslik.replace(/[?.*+()]/g, '\\$&')}\\s*$`) }) });

test('sunum hatasız açılır, bütün görseller yüklenir', async ({ page }) => {
  const hatalar = hataTopla(page);
  await page.reload();
  await hazirBekle(page);
  await page.waitForLoadState('load');
  const bozuk = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
  expect(bozuk).toEqual([]);
  expect(hatalar).toEqual([]);
});

test('tam 41 slayt (mola slaydı yok), başlıklar beklenen sırada', async ({ page }) => {
  const basliklar = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')].map((s) => s.querySelector('h1, h2').textContent.trim()));
  expect(basliklar).toEqual(BASLIKLAR);
});

test('beş bölüm açılışı sırayla 1–5 numaralı', async ({ page }) => {
  const s = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((sec, i) => (sec.classList.contains('bolum') ? [i + 1, sec.querySelector('.bolum-no').textContent.trim()] : null))
      .filter(Boolean));
  expect(s).toEqual([[6, '1'], [13, '2'], [18, '3'], [28, '4'], [35, '5']]);
});

test('ilk bölümden sonraki her slayt bir bölüme bağlı (alt köşede görünür)', async ({ page }) => {
  const bolumsuz = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((s, i) => ({ no: i + 1, b: s.getAttribute('data-bolum') }))
      .filter((x) => x.no >= 6 && x.no <= 40 && !x.b).map((x) => x.no));
  expect(bolumsuz).toEqual([]);
});

test('atlanabilir slaytlar: 24, 25, 26 ve 33', async ({ page }) => {
  const atlanabilir = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((s, i) => ({ no: i + 1, not: s.querySelector('aside.notes').textContent.trim() }))
      .filter((x) => x.not.startsWith('⏭ ATLANABİLİR')).map((x) => x.no));
  expect(atlanabilir).toEqual([24, 25, 26, 33]);
});

test('"siz yapın" slaytları 17, 22, 26 ve 36', async ({ page }) => {
  const nolar = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((s, i) => (s.classList.contains('siz-yapin') ? i + 1 : 0)).filter(Boolean));
  expect(nolar).toEqual([17, 22, 26, 36]);
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

test('"siz yapın" ve bölüm slaytları gece zeminli; etkinlikler sayaçlı', async ({ page }) => {
  const s = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section.siz-yapin, .reveal .slides > section.bolum')].map((sec) => ({
      gece: sec.getAttribute('data-background-color') === '#0D0F1A' && (sec.getAttribute('data-background-gradient') || '').includes('radial-gradient'),
      sayac: sec.classList.contains('bolum') || !!sec.querySelector('.sayac[data-sure]'),
    })));
  expect(s.length).toBe(9);
  for (const x of s) expect(x).toEqual({ gece: true, sayac: true });
});

test('kapakta üç logo: Genç Kızılay, ÇOMÜ, Teknik Bilimler MYO', async ({ page }) => {
  const kaynaklar = await slaytlar(page).first().locator('.logolar img').evaluateAll((im) => im.map((i) => i.getAttribute('src').split('/').pop()));
  expect(kaynaklar).toEqual(['genc-kizilay.png', 'comu.png', 'tbmyo.png']);
});

test('slaytlarda görünen metin zengin: en az 1600 kelime (notlar hariç)', async ({ page }) => {
  const toplam = await page.evaluate(() => [...document.querySelectorAll('.reveal .slides > section')].reduce((t, s) => {
    const k = s.cloneNode(true); k.querySelectorAll('aside.notes').forEach((a) => a.remove());
    return t + k.textContent.split(/\s+/).filter(Boolean).length;
  }, 0));
  expect(toplam).toBeGreaterThanOrEqual(1600);
});

test('"istem" kelimesi slaytta (sadece notta değil) açıklanıyor', async ({ page }) => {
  const metin = await slaytBaslikla(page, 'İyi istemin formülü').evaluate((s) =>
    [...s.childNodes].filter((n) => n.nodeName !== 'ASIDE').map((n) => n.textContent).join(' '));
  expect(metin).toContain("Claude'a yazdığın mesaj");
});

test('atlanabilir slaytlar atlanırsa "Formülü tamamla" notu sözlü açıklamayı hatırlatır', async ({ page }) => {
  await expect(slaytBaslikla(page, 'Formülü tamamla').locator('aside.notes')).toContainText('atlandıysa');
});

test('"Hatayı bul" notu "1923" itirazına hazırlıklı', async ({ page }) => {
  await expect(slaytBaslikla(page, 'Hatayı bul').locator('aside.notes')).toContainText('Hilal-i Ahmer');
});

test('çıkış quizinde soru, düğmelere yapışık değil', async ({ page }) => {
  const no = (await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')].findIndex((s) => s.querySelector('h2')?.textContent.trim() === 'Çıkış quizi')));
  await page.evaluate((i) => Reveal.slide(i), no);
  const bosluk = await slaytlar(page).nth(no).locator('.secmeli').evaluate((g) =>
    g.nextElementSibling.getBoundingClientRect().top - g.getBoundingClientRect().bottom);
  // Görünüm 1920×1080, tuval ölçeği ~0.92; 20 tuval pikseli ≈ 18 ekran pikseli
  expect(bosluk).toBeGreaterThanOrEqual(18);
});

test('soru slaytlarında en az bir doğru şık var', async ({ page }) => {
  const dogrusuz = await page.evaluate(() =>
    [...document.querySelectorAll('.secmeli')].filter((g) => !g.querySelector('[data-dogru]')).length);
  expect(dogrusuz).toBe(0);
});

test('fotoğraf kaynağı son slaytta belirtilmiş', async ({ page }) => {
  await expect(slaytBaslikla(page, 'Teşekkürler!')).toContainText('genckizilay.org.tr');
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
