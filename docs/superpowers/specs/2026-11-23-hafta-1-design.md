# Claude Eğitim Serisi — Hafta 1 Tasarım Belgesi

- **Tarih:** 23 Kasım 2026
- **Hazırlayan:** Eyüp Çalışkanöztürk (Genç Kızılay ÇOMÜ Eğitim Birimi Başkanı), Claude ile birlikte
- **Durum:** Taslak — onay bekliyor

---

## 1. Amaç

Genç Kızılay ÇOMÜ gönüllülerine, Teknik Bilimler MYO **Lab3**'te, uygulamalı bir **"Claude ile Tanışma"** eğitimi vermek. Bu eğitim, dilekçede belirtilen "yapay zeka kullanımı ve Office programları" serisinin **ilk haftası**dır.

Hafta 1 sonunda bir katılımcı:

1. Lab bilgisayarına ve claude.ai'ye kendi başına girip Claude ile sohbet edebilir.
2. "Kim için? + Ne? + Nasıl?" formülüyle iyi bir istem yazabilir ve cevabı konuşarak düzelttirebilir.
3. Claude'un yanılabileceğini bilir, cevabı kontrol eder ve kişisel veriyi asla paylaşmaz.

Başarı ölçütü: Katılımcıların büyük çoğunluğu Kızılay görevini (slayt 24) kendi bilgisayarında tamamlar ve çıkış quizinde sınıf doğru cevapları verebilir.

## 2. Kapsam ve Bağlam

### Kullanıcının belirttikleri
- Kitle: **Kızılay gönüllüleri**, yaklaşık **35 kişi**. Bilgisayar kullanmayı hiç bilmeyen ama yapay zekaya ilgi duyan kişiler de gelebilir.
- Zaman: **Salı günleri, ~1,5 saat**. İlk ders **1 Aralık 2026 Salı**.
- Format: Eğitmen sunumu **tahtaya yansıtır ve yönetir**. Katılımcılar zamanı gelince söyleneni kendi bilgisayarında yapar. Uygulama ağırlıklı, az anlatım.
- Seri: Her hafta farklı ama birbiriyle akraba bir konu. Her hafta sonunda katılım belgesi verilecek (ayrı iş, bu belgenin kapsamı dışında).
- Lab bilgisayarları eduroam'a bağlı. Masaüstüne giriş **cportal** üzerinden **TC kimlik no + UBYS şifresi** ile yapılıyor.
- Katılımcılar claude.ai hesabını **önceden açıp gelecek** (duyuru ve afişte belirtilecek).
- Site **GitHub Pages** üzerinde yayınlanacak.
- Tema rengi olarak **Claude paleti** (turuncu) kullanılacak.

### Varsayımlar
- Katılımcılar ücretsiz Claude planı kullanacak. Alıştırmalar kısa tutularak mesaj limitine takılma riski azaltılır.
- Lab bilgisayarlarına program kurulamaz. Her şey tarayıcıdan yürür.

### Serinin taslak iskeleti (yön göstermek için, ayrı ayrı tasarlanacak)
| Hafta | Konu | 4D vurgusu |
|---|---|---|
| 1 | Claude ile Tanışma — iyi soru, kontrol, güvenli kullanım | Description, Discernment, Diligence |
| 2 | Claude ile Yazmak — dilekçe, duyuru, e-posta, özet | Description |
| 3 | Office + Yapay Zeka — Word/Excel işlerinde Claude | Delegation |
| 4 | Kod Yazmadan Üretmek — Artifacts ile mini uygulama, Kızılay projesi | Delegation, Diligence |

Çerçeve: Anthropic'in AI Fluency eğitimindeki **4D** (Delegation, Description, Discernment, Diligence).

## 3. Lojistik ve Zaman Çizelgesi

| Tarih | İş | Sorumlu |
|---|---|---|
| Çar 25 Kasım | Duyuru metni ve afiş yayında (hesap açma + UBYS şifresi uyarısı dahil) | Eyüp (metin: Claude) |
| Per–Cum 26–27 Kasım | Lab testi: cportal girişi ve claude.ai erişimi. cportal ekran görüntüleri alınır. | Eyüp |
| Paz 29 Kasım | Sunum sitesi hazır, baştan sona prova | Claude + Eyüp |
| Pzt 30 Kasım | Hatırlatma mesajı: "Hesabın açık gel, UBYS şifreni bil" | Eyüp |
| **Sal 1 Aralık** | **Ders** | Eyüp |

### Dersten önce katılımcılara gidecek hazırlık bilgisi
1. Lab bilgisayarına girişte **TC kimlik no + UBYS şifresi** istenir. Şifreni bilmiyorsan derse gelmeden UBYS'den sıfırla.
2. **claude.ai hesabını önceden aç** (adım adım, ekran görüntülü kısa rehber).

### Riskler ve önlemler
| Risk | Önlem |
|---|---|
| Okul ağı claude.ai'yi engelliyor veya doğrulamada sorun çıkıyor | Lab testi (26–27 Kasım). Sorun çıkarsa Bilgi İşlem ile görüşülür. |
| ÇOMÜ öğrencisi olmayan bir gönüllünün UBYS hesabı yok | Kayıt formuna "ÇOMÜ öğrencisi misin?" sorusu eklenir. Gerekirse Bilgi İşlem'den misafir girişi istenir veya kişi eşli çalışır. |
| Hesap açmadan gelen veya giriş yapamayan katılımcı | Yanındakiyle eşli çalışır |
| Ücretsiz plan mesaj limiti | Kısa, hedefli alıştırmalar. Limite takılan eşli çalışır. |
| Giriş adımında ders temposunun düşmesi | Teknik bilen 1–2 gönüllü **masa asistanı** olarak yardım eder |
| Zaman taşması | Atlanabilir slaytlar: **16–17 ve 23** (konuşmacı notlarında işaretli) |

## 4. Sunum Sitesi — Mimari

### Adres ve yapı
- Repo: `eyupcalskanozturk-tr/claude-egitim`, GitHub Pages ile `main` dalının kökünden yayın
- Adres: `https://eyupcalskanozturk-tr.github.io/claude-egitim/`

```
claude-egitim/
├── index.html              # Seri vitrini: Hafta 1-4 kartları
├── hafta-1/
│   └── index.html          # Hafta 1 sunumu (slaytlar + konuşmacı notları)
├── ortak/
│   ├── css/tema.css        # Claude paleti, yazı tipleri, slayt türü stilleri
│   ├── js/etkilesim.js     # Etkileşim kartları (soru, boşluk, sayaç, karşılaştırma)
│   ├── fonts/              # Poppins + Inter (yerel barındırma)
│   └── vendor/reveal/      # reveal.js, sabit sürüm, repoya dahil
├── gorseller/
│   ├── logolar/            # Genç Kızılay, ÇOMÜ
│   └── hafta-1/            # Ekran görüntüleri
└── docs/                   # Tasarım ve plan belgeleri
```

### Teknik kararlar
- **Düz HTML/CSS/JS**, derleme adımı yok.
- **reveal.js**: ok tuşuyla geçiş, tam ekran, sunum kumandası desteği ve konuşmacı görünümü (`S` tuşu) hazır gelir.
- Bütün bağımlılıklar (reveal.js, yazı tipleri) **repoya dahil**. Sunum dış CDN'lere bağlı değil.
- Her hafta aynı `ortak/` şablonunu kullanır, sadece `hafta-N/index.html` içeriği değişir.
- Hedef ekran **16:9 projeksiyon**.

### Slayt türleri (bütün haftalarda ortak)
| Tür | Davranış |
|---|---|
| **Anlatım** | Büyük başlık, en fazla 3 madde, görsel |
| **Seçmeli soru** | Sınıf sesli cevap verir, eğitmen şıkka tıklar. Doğru: yeşil + ✓. Yanlış: gri + ✗ + hafif sallanma. |
| **Boşluk doldurma** | Cümledeki boşluğa tıklayınca kelime açılır |
| **Karşılaştırma** | İki sütun (❌ / ✅). Cevaplar tıklamayla sırayla açılır. |
| **Adım adım** | Ekran görüntüsü, tıklanacak yer turuncu halkayla işaretli, numaralı adımlar |
| **Siz yapın** | Tam ekran koyu zemin, görev metni, büyük punto istem kutusu, dev geri sayım sayacı (başlat/duraklat/sıfırla). Süre dolunca görsel uyarı. |

Etkileşimler klavye ve fareyle çalışır, sayfa yenilenince sıfırlanır. Hiçbir veri kaydedilmez veya gönderilmez.

### Bilinçli olarak kapsam dışı
Öğrenci tarafı sayfa, skor tablosu, giriş sistemi, veri toplama, backend. Gerekirse sonraki haftalarda eklenebilir.

## 5. Hafta 1 — Slayt Akışı (90 dk)

Her slaytta **konuşmacı notu** bulunur: ne söylenecek, olası öğrenci soruları, "takılırsa ne yap" ipuçları.

### Açılış (0–10 dk)
| # | Tür | İçerik |
|---|---|---|
| 1 | Anlatım | Kapak: Genç Kızılay ÇOMÜ · "Claude ile Tanışma" · Hafta 1 |
| 2 | Anlatım | Bugün ne yapacağız? (3 hedef) |
| 3 | Seçmeli | Kanca: "Bu sunumu kim hazırladı?" Şıklar: Eyüp / Claude / İkisi birlikte → **İkisi birlikte** |
| 4 | Anlatım + sayaç | "Yapay zekayı daha önce nerede gördünüz?" Sesli tur, 2 dk |

### Hazırlık (10–20 dk)
| # | Tür | İçerik |
|---|---|---|
| 5 | Adım adım | Bilgisayara giriş: cportal ekranı, TC + UBYS şifresi |
| 6 | Adım adım | claude.ai'ye giriş |
| 7 | Adım adım | Claude ekran turu: mesaj kutusu, gönder, yeni sohbet, geçmiş |
| 8 | Siz yapın (3 dk) | İlk mesaj: *"Merhaba, benim adım ___. Kendini bana 3 cümlede tanıt."* |

### Claude nedir? (20–30 dk)
| # | Tür | İçerik |
|---|---|---|
| 9 | Anlatım | Benzetme: "Çok okumuş ama bazen kendinden fazla emin bir arkadaş" |
| 10 | Anlatım | Claude ne yapar / ne yapamaz (iki sütun) |
| 11 | Boşluk doldurma | "Claude bir yapay zeka **asistanıdır**." · "Claude da **hata** yapabilir." |

### İyi soru sorma (30–55 dk)
| # | Tür | İçerik |
|---|---|---|
| 12 | Anlatım | İyi istem formülü: **Kim için? + Ne? + Nasıl?** (uzunluk, ton, biçim) |
| 13 | Karşılaştırma | ❌ *"Kızılay yaz"* · ✅ *"Genç Kızılay için kan bağışı kampanyasına çağıran 3 cümlelik samimi bir Instagram duyurusu yaz."* |
| 14 | Seçmeli | İki istemden hangisi daha iyi, neden? |
| 15 | Siz yapın (6 dk) | Önce kötü istemi, sonra iyisini gönder, farkı gör |
| 16 | Anlatım | Beğenmedin mi? Konuşmaya devam et: *"Daha kısa yap"*, *"Daha resmi yaz"* — *atlanabilir* |
| 17 | Siz yapın (5 dk) | Cevabı 2 kez düzelttir — *atlanabilir* |
| 18 | Boşluk doldurma | Formülü hep birlikte tamamlama |

### Mola (55–60 dk)
| # | Tür | İçerik |
|---|---|---|
| 19 | Sayaç | 5 dakikalık mola |

### Kontrol et, güvenli kullan (60–75 dk)
| # | Tür | İçerik |
|---|---|---|
| 20 | Anlatım | Claude yanılabilir: "kendinden emin uydurma" |
| 21 | Hatayı bul | Örnek cevap: *"Türk Kızılay 1923'te kuruldu..."* → doğrusu **1868** |
| 22 | Anlatım | 🚫 Asla yazma: TC no, telefon, adres, sağlık bilgisi, **afetzedelerin bilgileri**, şifreler |
| 23 | Seçmeli | "Hangisini Claude'a yazabilirim?" 4 senaryo — *atlanabilir* |

### Kızılay görevi (75–85 dk)
| # | Tür | İçerik |
|---|---|---|
| 24 | Siz yapın (8 dk) | Birini seç: (a) deprem çantası kontrol listesi, (b) kan bağışı duyurusu, (c) yeni gönüllüye hoş geldin mesajı. Formülü kullan. |
| 25 | Anlatım | 2–3 gönüllü sonucunu sesli okur |

### Kapanış (85–90 dk)
| # | Tür | İçerik |
|---|---|---|
| 26 | Seçmeli + boşluk | Çıkış quizi: 3 hızlı soru |
| 27 | Anlatım | Bugün öğrendiklerimiz · Gelecek hafta: **Claude ile Yazmak** |
| 28 | Anlatım | Teşekkürler · katılım belgesi bilgisi · siteye götüren karekod |

## 6. Görsel Kimlik

Tema **Claude paleti**. Genç Kızılay kimliği **logolar** üzerinden görünür. Kızılay kırmızısı renk olarak kullanılmaz (turuncuyla çatışır).

### Renkler
| Rol | Kod | Kullanım |
|---|---|---|
| Ana vurgu (Claude turuncusu) | `#D97757` | Başlıklar, çizgiler, butonlar, sayaç. **Gövde metninde kullanılmaz.** |
| Zemin (krem) | `#FAF9F5` | Anlatım slaytları |
| Metin (koyu) | `#141413` | Gövde metni; "Siz yapın" zemini |
| Yardımcı (açık gri) | `#E8E6DC` | Kutular, istem çerçeveleri |
| Doğru | `#788C5D` + ✓ | Soru slaytları |
| Yanlış | `#B0AEA5` + ✗ | Soru slaytları |

Açık zemin seçildi: ışıklı odada projeksiyon koyu zemini soldurur. Doğru/yanlış bilgisi renk körlüğü için hep simgeyle de verilir.

### Yazı
- Başlık: **Poppins**. Gövde: **Inter**. İkisi de Türkçe karakter destekli ve yerelde barındırılıyor.
- Başlık ≥ 64px, gövde ≥ 36px. Slayt başına en fazla 3 madde.
- Tahtadan yazılacak istemler büyük puntolu, çerçeveli bir "mesaj kutusu" içinde ve 1–2 cümleyi geçmez.

### Görseller
- Kapakta Genç Kızılay + ÇOMÜ logoları. Diğer slaytlarda köşede küçük Genç Kızılay logosu.
- Adım adım slaytlarında gerçek ekran görüntüleri, tıklanacak yer turuncu halkayla işaretli.
- Ölçülü emoji, gereksiz süs yok.

## 7. Girdiler (Eyüp'ten beklenenler)

| Girdi | Ne zaman lazım | Yoksa ne olur |
|---|---|---|
| Genç Kızılay ve ÇOMÜ logoları (SVG veya yüksek çözünürlüklü PNG) | 28 Kasım | Logo alanında yer tutucu kalır |
| cportal ekran görüntüleri (2–3 adet) | 28 Kasım | Slayt 5 yazılı adımlarla, görselsiz kalır |

claude.ai ekran görüntüleri Claude tarafından hazırlanır.

## 8. Doğrulama ve Prova

- Sitenin tarayıcıda 1920×1080 ve 1280×720 çözünürlükte tam ekran açıldığını, bütün 28 slaytın taşma olmadan göründüğünü kontrol et.
- Her etkileşim türünü (seçmeli, boşluk, karşılaştırma, sayaç) tıklayarak dene.
- Konuşmacı görünümünün (`S`) açıldığını ve notların göründüğünü kontrol et.
- GitHub Pages adresinden, internet bağlantılı başka bir bilgisayarda aç.
- 29 Kasım'da Eyüp, sunumu notlardan okuyarak baştan sona dener ve süreyi tutar.
- Lab testinde siteyi lab projeksiyonunda açıp arka sıradan okunabilirliğe bak (mümkünse).

## 9. Bu Belgeden Sonra

1. Bu belgenin onayı
2. Uygulama planı (writing-plans)
3. Duyuru metni ve hesap açma rehberi (öncelikli — 25 Kasım'a yetişmeli)
4. Site iskeleti ve ortak şablon → Hafta 1 içeriği → prova
