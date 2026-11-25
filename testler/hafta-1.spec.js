import { test, expect } from '@playwright/test';
import { hazirBekle, hataTopla } from './yardimci.js';

// 90 dakikalık uygulamalı atölye: çok sayıda "Sıra sizde" etkinliği, detaylı anlatım.
const ZORUNLU_BASLIKLAR = [
  'Claude ile Tanışma',
  'Atölye kuralları',
  'Yapay zekanın kısa tarihi',
  'Makine nasıl öğrenir?',
  'Dil modeli ve bilgi sınırı',
  'Sohbet nasıl yürür?',
  'İyi istemin formülü',
  'Rol ver',
  'Biçim söyle',
  'Örnek göster',
  'Önce sana sorsun',
  'Formülü tamamla',
  'Hatayı bul',
  'Halüsinasyon avı',
  'Önyargıya dikkat',
  'Kişisel veriyi temizle',
  "Kızılay'da yapay zeka",
  'Kızılay görevi',
  'Mini sözlük',
  'Çıkış quizi',
  'Teşekkürler!',
];

test.beforeEach(async ({ page }) => {
  await page.goto('hafta-1/');
  await hazirBekle(page);
});

const slaytlar = (page) => page.locator('.reveal .slides > section');
const slaytBaslikla = (page, baslik) =>
  slaytlar(page).filter({ has: page.locator('h1, h2', { hasText: new RegExp(`^\\s*${baslik.replace(/[?.*+()!]/g, '\\$&')}\\s*$`) }) });
const ozet = (page) => page.evaluate(() =>
  [...document.querySelectorAll('.reveal .slides > section')].map((s, i) => ({
    no: i + 1,
    baslik: s.querySelector('h1, h2').textContent.trim(),
    sinif: s.className,
    bolum: s.getAttribute('data-bolum'),
    not: (s.querySelector('aside.notes') || { textContent: '' }).textContent.trim(),
    sure: [...s.querySelectorAll('.sayac[data-sure]')].reduce((t, e) => t + Number(e.dataset.sure), 0),
  })));

test('sunum hatasız açılır, bütün görseller yüklenir', async ({ page }) => {
  const hatalar = hataTopla(page);
  await page.reload();
  await hazirBekle(page);
  await page.waitForLoadState('load');
  const bozuk = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
  expect(bozuk).toEqual([]);
  expect(hatalar).toEqual([]);
});

test('90 dakikalık atölye ölçeğinde: 60–70 slayt, kapakla başlar, teşekkürle biter', async ({ page }) => {
  const s = await ozet(page);
  expect(s.length).toBeGreaterThanOrEqual(60);
  expect(s.length).toBeLessThanOrEqual(70);
  expect(s[0].baslik).toBe('Claude ile Tanışma');
  expect(s.at(-1).baslik).toBe('Teşekkürler!');
});

test('zorunlu konu başlıklarının hepsi var ve başlıklar tekrar etmiyor', async ({ page }) => {
  const basliklar = (await ozet(page)).map((x) => x.baslik);
  for (const b of ZORUNLU_BASLIKLAR) expect(basliklar).toContain(b);
  expect(new Set(basliklar).size).toBe(basliklar.length);
});

test('beş bölüm açılışı 1–5 sırasıyla', async ({ page }) => {
  const nolar = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section.bolum .bolum-no')].map((e) => e.textContent.trim()));
  expect(nolar).toEqual(['1', '2', '3', '4', '5']);
});

test('ilk bölümden sonraki her slayt (son hariç) bir bölüme bağlı', async ({ page }) => {
  const s = await ozet(page);
  const ilk = s.findIndex((x) => x.sinif.includes('bolum'));
  expect(s.slice(ilk, -1).filter((x) => !x.bolum).map((x) => x.no)).toEqual([]);
});

test('uygulama ağırlıklı: en az 12 "Sıra sizde" etkinliği, her biri sayaçlı ve istemli', async ({ page }) => {
  const s = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section.siz-yapin')].map((sec) => ({
      baslik: sec.querySelector('h2').textContent.trim(),
      sayac: !!sec.querySelector('.sayac[data-sure]'),
      istem: !!sec.querySelector('.istem'),
    })));
  expect(s.length).toBeGreaterThanOrEqual(12);
  for (const x of s) expect(x, x.baslik).toMatchObject({ sayac: true, istem: true });
});

test('uygulama süreleri toplamı en az 45 dakika', async ({ page }) => {
  const s = await ozet(page);
  const toplam = s.filter((x) => x.sinif.includes('siz-yapin')).reduce((t, x) => t + x.sure, 0);
  expect(toplam).toBeGreaterThanOrEqual(45 * 60);
});

test('"siz yapın" ve bölüm slaytları gece zeminli', async ({ page }) => {
  const s = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section.siz-yapin, .reveal .slides > section.bolum')].map((sec) =>
      sec.getAttribute('data-background-color') === '#0D0F1A' && (sec.getAttribute('data-background-gradient') || '').includes('radial-gradient')));
  expect(s.every(Boolean)).toBe(true);
});

test('atlanabilir slaytlar işaretli (en az 4), hiçbiri bölüm açılışı ya da kapak değil', async ({ page }) => {
  const s = (await ozet(page)).filter((x) => x.not.startsWith('⏭ ATLANABİLİR'));
  expect(s.length).toBeGreaterThanOrEqual(4);
  for (const x of s) expect(x.sinif).not.toMatch(/bolum|kapak/);
});

test('her slaytta zaman bilgili konuşmacı notu var', async ({ page }) => {
  const eksik = (await ozet(page)).filter((x) => x.not.length < 20 || !/\(\d+(–\d+)? dk\)/.test(x.not)).map((x) => x.no);
  expect(eksik).toEqual([]);
});

test('S tuşu konuşmacı görünümünü açar', async ({ page }) => {
  const [pencere] = await Promise.all([page.waitForEvent('popup'), page.keyboard.press('s')]);
  expect(pencere).toBeTruthy();
});

test('kapakta üç logo: Genç Kızılay, ÇOMÜ, Teknik Bilimler MYO', async ({ page }) => {
  const kaynaklar = await slaytlar(page).first().locator('.logolar img').evaluateAll((im) => im.map((i) => i.getAttribute('src').split('/').pop()));
  expect(kaynaklar).toEqual(['genc-kizilay.png', 'comu.png', 'tbmyo.png']);
});

test('slaytlarda görünen metin detaylı: en az 3000 kelime (notlar hariç)', async ({ page }) => {
  const toplam = await page.evaluate(() => [...document.querySelectorAll('.reveal .slides > section')].reduce((t, s) => {
    const k = s.cloneNode(true); k.querySelectorAll('aside.notes').forEach((a) => a.remove());
    return t + k.textContent.split(/\s+/).filter(Boolean).length;
  }, 0));
  expect(toplam).toBeGreaterThanOrEqual(3000);
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

test('"Kişisel veriyi temizle" örneğindeki veriler açıkça sahte', async ({ page }) => {
  const metin = await slaytBaslikla(page, 'Kişisel veriyi temizle').locator('.istem').first().textContent();
  expect(metin).toContain('0555 000 00 00');
  expect(metin).toContain('00000000000');
});

test('çıkış quizinde soru, düğmelere yapışık değil', async ({ page }) => {
  const no = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')].findIndex((s) => s.querySelector('h2')?.textContent.trim() === 'Çıkış quizi'));
  await page.evaluate((i) => Reveal.slide(i), no);
  const bosluk = await slaytlar(page).nth(no).locator('.secmeli').first().evaluate((g) =>
    g.nextElementSibling.getBoundingClientRect().top - g.getBoundingClientRect().bottom);
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
