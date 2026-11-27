import { test, expect } from '@playwright/test';
import { hazirBekle, hataTopla } from './yardimci.js';

// Konuşma kartları: tablette okunacak, sunumla birebir eşleşen konuşma metni.

async function sunumOzeti(page) {
  await page.goto('hafta-1/');
  await hazirBekle(page);
  return page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')].map((s) => {
      const not = (s.querySelector('aside.notes') || { textContent: '' }).textContent;
      return {
        baslik: s.querySelector('h1, h2').textContent.trim(),
        sure: (not.match(/\((\d+(?:–\d+)?) dk\)/) || [])[1],
        atlanabilir: not.trim().startsWith('⏭ ATLANABİLİR'),
        sizYapin: s.classList.contains('siz-yapin'),
      };
    }));
}

async function kartlar(page) {
  await page.goto('hafta-1/konusma.html');
  await page.waitForFunction(() => Array.isArray(window.KONUSMA));
  return page.evaluate(() => window.KONUSMA);
}

test('konuşma kartları sayfası hatasız açılır', async ({ page }) => {
  const hatalar = hataTopla(page);
  await page.goto('hafta-1/konusma.html');
  await expect(page.locator('#kart-baslik')).toHaveText('Claude ile Tanışma');
  expect(hatalar).toEqual([]);
});

test('her slayt için bir kart var; numara, başlık, süre ve atlanabilir bilgisi sunumla birebir aynı', async ({ page }) => {
  const sunum = await sunumOzeti(page);
  const k = await kartlar(page);
  expect(k.length).toBe(sunum.length);
  k.forEach((kart, i) => {
    expect(kart.no, `kart ${i + 1}`).toBe(i + 1);
    expect(kart.baslik, `kart ${i + 1}`).toBe(sunum[i].baslik);
    expect(kart.sure, `kart ${i + 1} süre`).toBe(sunum[i].sure);
    expect(!!kart.atlanabilir, `kart ${i + 1} atlanabilir`).toBe(sunum[i].atlanabilir);
  });
});

test('her kartta kelimesi kelimesine söylenecek metin var (en az 30 kelime)', async ({ page }) => {
  const k = await kartlar(page);
  const kisa = k.filter((kart) => {
    const kelime = kart.adimlar.filter((a) => a.tur === 'soyle').map((a) => a.metin).join(' ').split(/\s+/).filter(Boolean).length;
    return kelime < 30;
  }).map((kart) => kart.no);
  expect(kisa).toEqual([]);
});

test('"Sıra sizde" kartları sayacı başlatmayı ve dolaşmayı hatırlatır', async ({ page }) => {
  const sunum = await sunumOzeti(page);
  const k = await kartlar(page);
  const eksik = k.filter((kart, i) => sunum[i].sizYapin && !kart.adimlar.some((a) => a.tur === 'yap' && /sayac/i.test(a.metin))).map((kart) => kart.no);
  expect(eksik).toEqual([]);
});

test('soru ve boşluk slaytlarının kartlarında doğru cevap yazılı', async ({ page }) => {
  await page.goto('hafta-1/');
  await hazirBekle(page);
  const sorulu = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal .slides > section')]
      .map((s, i) => (s.querySelector('.secmeli, .bosluk') ? i + 1 : 0)).filter(Boolean));
  const k = await kartlar(page);
  const eksik = sorulu.filter((no) => !k[no - 1].adimlar.some((a) => a.tur === 'cevap'));
  expect(eksik).toEqual([]);
});

test('ileri/geri düğmeleri ve klavye okları kartlar arasında gezer', async ({ page }) => {
  await page.goto('hafta-1/konusma.html');
  await expect(page.locator('#kart-no')).toHaveText('1');
  await page.locator('#ileri').click();
  await expect(page.locator('#kart-no')).toHaveText('2');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#kart-no')).toHaveText('3');
  await page.locator('#geri').click();
  await expect(page.locator('#kart-no')).toHaveText('2');
  await expect(page.locator('#siradaki')).toContainText('Bugün ne yapacağız?');
});

test('adresle (#12) doğrudan karta gidilir, listeden kart seçilir', async ({ page }) => {
  await page.goto('hafta-1/konusma.html#12');
  await expect(page.locator('#kart-no')).toHaveText('12');
  await page.locator('#liste-ac').click();
  await page.locator('#liste a', { hasText: 'Halüsinasyon avı' }).click();
  await expect(page.locator('#kart-baslik')).toHaveText('Halüsinasyon avı');
  await expect(page.locator('#liste')).toBeHidden();
});

test('yazı büyütme düğmesi metni büyütür', async ({ page }) => {
  await page.goto('hafta-1/konusma.html');
  const once = await page.locator('.adim.soyle').first().evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
  await page.locator('#yazi-buyut').click();
  const sonra = await page.locator('.adim.soyle').first().evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
  expect(sonra).toBeGreaterThan(once);
});

for (const [ad, g, y] of [['dikey tablet', 820, 1180], ['yatay tablet', 1180, 820], ['telefon', 390, 844]]) {
  test(`${ad}: yatay kaydırma yok, gezinme düğmeleri ekranda`, async ({ page }) => {
    await page.setViewportSize({ width: g, height: y });
    await page.goto('hafta-1/konusma.html#47');
    const tasma = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(tasma).toBeLessThanOrEqual(0);
    await expect(page.locator('#ileri')).toBeInViewport();
    await expect(page.locator('#geri')).toBeInViewport();
  });
}
