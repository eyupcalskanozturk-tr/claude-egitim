(function () {
  // ikonlar/ klasörü bu betiğe göreli bulunur (sayfanın derinliğinden bağımsız).
  var betik = document.currentScript && document.currentScript.src;
  var ikonKoku = betik ? betik.replace(/js\/etkilesim\.js.*$/, 'ikonlar/') : 'ortak/ikonlar/';

  function ikonKur(kok) {
    kok.querySelectorAll('[data-ikon]').forEach(function (el) {
      el.style.setProperty('--ikon', 'url("' + ikonKoku + el.getAttribute('data-ikon') + '.svg")');
      el.setAttribute('aria-hidden', 'true');
    });
  }

  function bolumIziKur() {
    var iz = document.querySelector('.bolum-izi');
    if (!iz || !window.Reveal) return;
    function guncelle() {
      var s = Reveal.getCurrentSlide();
      iz.textContent = (s && !s.classList.contains('bolum') && s.getAttribute('data-bolum')) || '';
    }
    Reveal.on('slidechanged', guncelle);
    guncelle();
  }

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
      b.tabIndex = 0;
      b.addEventListener('click', function () {
        b.classList.toggle('acik');
      });
      // Enter açar/kapatır. Space'e bilerek dokunulmaz: reveal'da slayt ilerletir.
      b.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          b.classList.toggle('acik');
        }
      });
    });
  }

  function sureBicimle(saniye) {
    var s = Math.max(0, Math.ceil(saniye));
    var dk = Math.floor(s / 60);
    var sn = s % 60;
    return String(dk).padStart(2, '0') + ':' + String(sn).padStart(2, '0');
  }

  function sayacKur(el) {
    var toplam = Number(el.dataset.sure);
    var kalan = toplam;
    var bitis = 0;
    var zamanlayici = null;

    el.innerHTML =
      '<div class="sayac-ekran"></div>' +
      '<button type="button" class="sayac-dugme" data-eylem="baslat">Başlat</button>' +
      '<button type="button" class="sayac-dugme" data-eylem="sifirla">Sıfırla</button>';
    var ekran = el.querySelector('.sayac-ekran');
    var baslatDugme = el.querySelector('[data-eylem="baslat"]');
    var sifirlaDugme = el.querySelector('[data-eylem="sifirla"]');

    function ciz() {
      ekran.textContent = kalan <= 0 ? 'Süre doldu!' : sureBicimle(kalan);
      el.classList.toggle('bitti', kalan <= 0);
    }
    function durdur() {
      clearInterval(zamanlayici);
      zamanlayici = null;
      baslatDugme.textContent = 'Başlat';
    }
    function tik() {
      kalan = (bitis - Date.now()) / 1000;
      if (kalan <= 0) {
        kalan = 0;
        durdur();
      }
      ciz();
    }

    baslatDugme.addEventListener('click', function () {
      if (zamanlayici) {
        tik();
        durdur();
      } else if (kalan > 0) {
        bitis = Date.now() + kalan * 1000;
        zamanlayici = setInterval(tik, 250);
        baslatDugme.textContent = 'Duraklat';
      }
      baslatDugme.blur();
    });
    sifirlaDugme.addEventListener('click', function () {
      durdur();
      kalan = toplam;
      ciz();
      sifirlaDugme.blur();
    });

    ciz();
  }

  function kur(kok) {
    secmeliKur(kok);
    boslukKur(kok);
    kok.querySelectorAll('.sayac').forEach(sayacKur);
    ikonKur(kok);
    bolumIziKur();
  }

  window.Etkilesim = { kur: kur, sureBicimle: sureBicimle };
})();
