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
