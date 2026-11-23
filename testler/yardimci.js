export async function hazirBekle(page) {
  await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
}

export function hataTopla(page) {
  const hatalar = [];
  page.on('pageerror', (e) => hatalar.push('js: ' + e.message));
  page.on('requestfailed', (r) => hatalar.push('istek: ' + r.url()));
  page.on('response', (r) => { if (r.status() >= 400) hatalar.push(r.status() + ': ' + r.url()); });
  return hatalar;
}
