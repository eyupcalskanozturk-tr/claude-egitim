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

  function kur(kok) {
    secmeliKur(kok);
  }

  window.Etkilesim = { kur: kur };
})();
