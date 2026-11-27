// Konuşma kartları: window.KONUSMA dizisini (her slayt için bir kart) tablette gösterir.
(function () {
  var kartlar = window.KONUSMA || [];
  var simdi = 0;
  var $ = function (id) { return document.getElementById(id); };

  function kayitOku(ad, varsayilan) { try { return localStorage.getItem(ad) || varsayilan; } catch (e) { return varsayilan; } }
  function kayitYaz(ad, deger) { try { localStorage.setItem(ad, deger); } catch (e) { /* özel pencere vb. */ } }

  function kacis(metin) {
    return String(metin).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  function goster(i) {
    simdi = Math.max(0, Math.min(kartlar.length - 1, i));
    var k = kartlar[simdi];
    $('kart-no').textContent = k.no;
    $('kart-toplam').textContent = '/ ' + kartlar.length;
    $('kart-baslik').textContent = k.baslik;
    $('kart-meta').innerHTML =
      '<span>' + kacis(k.bolum) + '</span>' +
      '<span>⏱ ' + kacis(k.sure) + ' dk</span>' +
      (k.etkinlik ? '<span class="rozet-etkinlik">Sıra sizde</span>' : '') +
      (k.atlanabilir ? '<span class="rozet-atla">Atlanabilir</span>' : '');
    $('kart-icerik').innerHTML = k.adimlar.map(function (a) {
      return '<p class="adim ' + a.tur + '">' + kacis(a.metin) + '</p>';
    }).join('');
    var sonraki = kartlar[simdi + 1];
    $('siradaki').innerHTML = sonraki
      ? '<span>Sıradaki ' + sonraki.no + '</span><b>' + kacis(sonraki.baslik) + '</b>'
      : '<span>Son kart</span><b>Sunum bitti 🎉</b>';
    $('geri').disabled = simdi === 0;
    $('ileri').disabled = simdi === kartlar.length - 1;
    if (location.hash !== '#' + k.no) history.replaceState(null, '', '#' + k.no);
    window.scrollTo(0, 0);
    listeIsaretle();
  }

  function ileri() { goster(simdi + 1); }
  function geri() { goster(simdi - 1); }

  // ---------- Slayt listesi ----------
  function listeKur() {
    $('liste-ol').innerHTML = kartlar.map(function (k, i) {
      var bas = i === 0 || kartlar[i - 1].bolum !== k.bolum;
      return '<li><a href="#' + k.no + '" data-i="' + i + '"' + (bas ? ' class="bolum-basi"' : '') + '><span>' + k.no + '</span>' + kacis(k.baslik) + '</a></li>';
    }).join('');
    $('liste-ol').addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      $('liste').hidden = true;
      goster(Number(a.dataset.i));
    });
  }
  function listeIsaretle() {
    var linkler = document.querySelectorAll('#liste-ol a');
    for (var i = 0; i < linkler.length; i++) linkler[i].classList.toggle('simdi', i === simdi);
  }

  // ---------- Yazı boyutu ve tema ----------
  var boyut = Number(kayitOku('konusma-yazi', '27'));
  function boyutUygula() { document.documentElement.style.setProperty('--yazi', boyut + 'px'); kayitYaz('konusma-yazi', String(boyut)); }
  var tema = kayitOku('konusma-tema', 'koyu');
  function temaUygula() { document.documentElement.setAttribute('data-tema', tema); $('tema').textContent = tema === 'koyu' ? '☀' : '☾'; kayitYaz('konusma-tema', tema); }

  // ---------- Kronometre ----------
  var baslangic = 0, gecen = 0, zaman = null;
  function saatCiz() {
    var t = Math.floor((gecen + (zaman ? Date.now() - baslangic : 0)) / 1000);
    $('saat').textContent = String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
  }
  function saatDegistir() {
    if (zaman) { gecen += Date.now() - baslangic; clearInterval(zaman); zaman = null; }
    else { baslangic = Date.now(); zaman = setInterval(saatCiz, 500); }
    $('saat').classList.toggle('calisiyor', !!zaman);
    saatCiz();
  }

  // ---------- Kaydırma hareketi ----------
  var dokunX = null, dokunY = null;
  document.addEventListener('touchstart', function (e) { dokunX = e.touches[0].clientX; dokunY = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (dokunX === null || !$('liste').hidden) return;
    var dx = e.changedTouches[0].clientX - dokunX, dy = e.changedTouches[0].clientY - dokunY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { if (dx < 0) ileri(); else geri(); }
    dokunX = null;
  });

  // ---------- Klavye / sunum kumandası ----------
  document.addEventListener('keydown', function (e) {
    if (!$('liste').hidden) { if (e.key === 'Escape') $('liste').hidden = true; return; }
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].indexOf(e.key) >= 0) { e.preventDefault(); ileri(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].indexOf(e.key) >= 0) { e.preventDefault(); geri(); }
  });

  // ---------- Kurulum ----------
  $('ileri').addEventListener('click', ileri);
  $('geri').addEventListener('click', geri);
  $('liste-ac').addEventListener('click', function () { $('liste').hidden = false; var s = document.querySelector('#liste-ol a.simdi'); if (s) s.scrollIntoView({ block: 'center' }); });
  $('liste-kapat').addEventListener('click', function () { $('liste').hidden = true; });
  $('yazi-buyut').addEventListener('click', function () { boyut = Math.min(44, boyut + 2); boyutUygula(); });
  $('yazi-kucult').addEventListener('click', function () { boyut = Math.max(18, boyut - 2); boyutUygula(); });
  $('tema').addEventListener('click', function () { tema = tema === 'koyu' ? 'acik' : 'koyu'; temaUygula(); });
  $('saat').addEventListener('click', saatDegistir);
  window.addEventListener('hashchange', function () { var n = Number(location.hash.slice(1)); if (n && n - 1 !== simdi) goster(n - 1); });

  listeKur();
  boyutUygula();
  temaUygula();
  saatCiz();
  var ilk = Number(location.hash.slice(1));
  goster(ilk ? ilk - 1 : 0);
})();
