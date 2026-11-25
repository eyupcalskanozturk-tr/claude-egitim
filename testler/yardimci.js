export async function hazirBekle(page) {
  await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
}

// "rgb(r, g, b)" iki renk arasındaki WCAG kontrast oranı
export function kontrastOrani(renk1, renk2) {
  const parlaklik = (renk) => {
    const [r, g, b] = renk.match(/\d+/g).slice(0, 3).map(Number).map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [a, b] = [parlaklik(renk1), parlaklik(renk2)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

export function hataTopla(page) {
  const hatalar = [];
  page.on('pageerror', (e) => hatalar.push('js: ' + e.message));
  page.on('requestfailed', (r) => hatalar.push('istek: ' + r.url()));
  page.on('response', (r) => { if (r.status() >= 400) hatalar.push(r.status() + ': ' + r.url()); });
  return hatalar;
}
