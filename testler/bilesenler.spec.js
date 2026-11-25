import { test, expect } from '@playwright/test';
import { hazirBekle } from './yardimci.js';

const KOYU = 'rgb(20, 20, 19)';
const TURUNCU = 'rgb(217, 119, 87)';

async function git(page, id) {
  await page.goto(`testler/ornek.html#/${id}`);
  await hazirBekle(page);
}

test('bölüm açılışı: turuncu zemin, koyu çizgisiz başlık, dev numara', async ({ page }) => {
  await git(page, 'bolum');
  const s = await page.evaluate(() => {
    const bg = document.querySelector('.backgrounds .slide-background.present');
    const icerik = bg.querySelector('.slide-background-content');
    const h2 = getComputedStyle(document.querySelector('#bolum h2'));
    return {
      zeminler: [getComputedStyle(bg).backgroundColor, icerik ? getComputedStyle(icerik).backgroundColor : ''],
      baslikRenk: h2.color, cizgi: h2.borderBottomStyle,
      no: parseFloat(getComputedStyle(document.querySelector('#bolum .bolum-no')).fontSize),
    };
  });
  expect(s.zeminler).toContain(TURUNCU);
  expect(s.baslikRenk).toBe(KOYU);
  expect(s.cizgi).toBe('none');
  expect(s.no).toBeGreaterThanOrEqual(200);
});

test('sohbet: "sen" balonu sağa, "claude" balonu sola yaslı ve Claude simgeli', async ({ page }) => {
  await git(page, 'sohbet');
  const s = await page.evaluate(() => {
    const kap = document.querySelector('#sohbet .sohbet').getBoundingClientRect();
    const sen = document.querySelector('#sohbet .balon.sen').getBoundingClientRect();
    const cl = document.querySelector('#sohbet .balon.claude');
    return {
      senSag: kap.right - sen.right, senSol: sen.left - kap.left,
      clSol: cl.getBoundingClientRect().left - kap.left,
      simge: getComputedStyle(cl, '::before').backgroundImage,
    };
  });
  expect(s.senSag).toBeLessThan(2);
  expect(s.senSol).toBeGreaterThan(50);
  expect(s.clSol).toBeLessThan(2);
  expect(s.simge).toContain('claude.svg');
});

test('ikon: data-ikon dosyası maske olarak yüklenir', async ({ page }) => {
  await git(page, 'ikonlu');
  const maske = await page.locator('#ikonlu .ikon').evaluate((e) => getComputedStyle(e).webkitMaskImage || getComputedStyle(e).maskImage);
  expect(maske).toContain('ikonlar/brain.svg');
  const adres = maske.match(/url\("?([^")]+)"?\)/)[1];
  const durum = await page.evaluate((u) => fetch(u).then((r) => r.status), adres);
  expect(durum).toBe(200);
});

test('yarısı fotoğraflı slayt: fotoğraf sağ yarıyı tam boy kaplar', async ({ page }) => {
  await git(page, 'foto-yan');
  const s = await page.evaluate(() => {
    const sl = document.getElementById('foto-yan').getBoundingClientRect();
    const f = document.querySelector('#foto-yan .yan-foto').getBoundingClientRect();
    return { sol: (f.left - sl.left) / sl.width, sag: sl.right - f.right, boy: f.height / sl.height };
  });
  expect(s.sol).toBeGreaterThanOrEqual(0.45);
  expect(Math.abs(s.sag)).toBeLessThan(2);
  expect(s.boy).toBeGreaterThan(0.95);
});

test('alt köşe bölüm yazısı slaytın bölümünü gösterir, bölümsüz slaytta boştur', async ({ page }) => {
  await git(page, 'sohbet');
  await expect(page.locator('.bolum-izi')).toHaveText('Örnek bölüm');
  await page.evaluate(() => Reveal.slide(Reveal.getIndices(document.getElementById('anlatim')).h));
  await expect(page.locator('.bolum-izi')).toHaveText('');
});

test('ilerleme çubuğu turuncu', async ({ page }) => {
  await git(page, 'anlatim');
  const renk = await page.locator('.reveal .progress span').evaluate((e) => getComputedStyle(e).backgroundColor);
  expect(renk).toBe(TURUNCU);
});
