// Kapak, bölüm açılışları ve "siz yapın" slaytları "gece sahnesi" zeminini alır.
// reveal.js data-background-* özniteliklerini başlatırken okuduğu için bu, initialize'dan önce yapılır.
// Not: reveal gradyanı background-image'a yazar; renk ayrı öznitelikte olmalı.
var GECE_RENGI = '#0D0F1A';
var GECE_ISIGI =
  'radial-gradient(circle at 88% 6%, rgba(232, 135, 95, 0.38), rgba(232, 135, 95, 0) 40%), ' +
  'radial-gradient(circle at 4% 104%, rgba(229, 50, 58, 0.26), rgba(229, 50, 58, 0) 38%)';

document.querySelectorAll(
  '.reveal .slides > section.karanlik, .reveal .slides > section.kapak, ' +
  '.reveal .slides > section.bolum, .reveal .slides > section.siz-yapin'
).forEach(function (s) {
  s.classList.add('karanlik');
  s.setAttribute('data-background-color', GECE_RENGI);
  s.setAttribute('data-background-gradient', GECE_ISIGI);
});

Reveal.initialize({
  width: 1920,
  height: 1080,
  margin: 0.04,
  center: true,
  hash: true,
  slideNumber: 'c/t',
  transition: 'fade',
  plugins: [RevealNotes],
}).then(function () {
  Etkilesim.kur(document);
});
