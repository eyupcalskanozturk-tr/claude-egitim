(function () {
  function secmeliKur(kok) {
    kok.querySelectorAll('.secmeli .sik').forEach(function (sik) {
      sik.type = 'button';
      sik.addEventListener('click', function () {
        sik.classList.toggle(sik.hasAttribute('data-dogru') ? 'dogru' : 'yanlis');
        sik.blur();
      });
    });
  }

  function boslukKur(kok) {
    kok.querySelectorAll('.bosluk').forEach(function (b) {
      b.textContent = b.dataset.cevap;
      b.setAttribute('role', 'button');
      b.addEventListener('click', function () {
        b.classList.toggle('acik');
      });
    });
  }

  function kur(kok) {
    secmeliKur(kok);
    boslukKur(kok);
  }

  window.Etkilesim = { kur: kur };
})();
