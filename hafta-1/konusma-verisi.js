// Hafta 1 konuşma kartları. Her slayt için bir kart; sıra, başlık ve süre sunumla birebir aynı olmalı
// (testler/konusma.spec.js bunu denetler). Adım türleri: soyle (kelimesi kelimesine), yap (sahne yönergesi),
// cevap (doğru cevap), ipucu (gerekirse). **kalın** işaretli kelimeler vurgulanır.
var A = 'Açılış';
var B1 = 'Bölüm 1: Yapay zeka ve Claude';
var B2 = 'Bölüm 2: Claude ile tanış';
var B3 = 'Bölüm 3: İyi soru sormak';
var B4 = 'Bölüm 4: Kontrol et, güvenli kullan';
var B5 = 'Bölüm 5: Öğrendiğini kullan';

window.KONUSMA = [
  // ===================== AÇILIŞ =====================
  { no: 1, baslik: 'Claude ile Tanışma', sure: '0–2', bolum: A, adimlar: [
    { tur: 'yap', metin: 'Kronometreyi başlat (sağ üstteki 00:00). Sınıfa dön, gülümse, herkes yerleşene kadar birkaç saniye bekle.' },
    { tur: 'soyle', metin: 'Merhaba arkadaşlar, hoş geldiniz! Nasılsınız? Gün nasıl geçiyor, yorgun olan var mı? Merak etmeyin, bugün yorulmayacağız, eğleneceğiz.' },
    { tur: 'soyle', metin: 'Ben Eyüp, Genç Kızılay ÇOMÜ Eğitim Birimi başkanıyım. Bugün sizinle **Yapay Zeka Eğitimleri** serimizin ilk haftasındayız: **Claude ile Tanışma**.' },
    { tur: 'soyle', metin: 'Bize bu laboratuvarı açtığı için Teknik Bilimler MYO’ya çok teşekkür ediyoruz. Bir de masa asistanı arkadaşlarımızı tanıtayım: [isimleri söyle]. Takıldığınız an elinizi kaldırın, hemen yanınıza gelecekler.' },
    { tur: 'soyle', metin: 'Telefonlarınızı sessize alın ama kapatmayın; birazdan giriş yaparken e-postanıza kod gelebilir.' },
  ] },
  { no: 2, baslik: 'Yapay zeka eğitimleri serisi', sure: '2–3', bolum: A, adimlar: [
    { tur: 'soyle', metin: 'Bu eğitim tek seferlik değil, bir seri. Dört hafta boyunca her salı buradayız ve her hafta farklı bir konu işleyeceğiz.' },
    { tur: 'soyle', metin: 'Bugün yapay zekayla başlıyoruz, Claude ile tanışacağız. Gelecek hafta **Excel kullanımı** var: tablo, formül, grafik. Üçüncü ve dördüncü haftanın konusunu yakında duyuracağız. Aklınızda öğrenmek istediğiniz bir konu varsa bize mutlaka söyleyin.' },
    { tur: 'soyle', metin: 'Her eğitimin sonunda katılım belgesi veriyoruz. Yani hangi haftaya katılırsanız o haftanın belgesini alırsınız.' },
  ] },
  { no: 3, baslik: 'Bugün ne yapacağız?', sure: '3–4', bolum: A, adimlar: [
    { tur: 'soyle', metin: 'Bugünkü planımız şu: Bu bir ders değil, bir **atölye**. Yani ben çok konuşmayacağım; siz bilgisayarda deneyeceksiniz. Bugün tam **on üç kez** kendi bilgisayarınızda bir şey yapacaksınız.' },
    { tur: 'soyle', metin: 'Üç hedefimiz var. Birincisi **tanışmak**: yapay zeka nedir, Claude nedir, nasıl konuşulur. İkincisi **doğru soru sormak**: aynı soruyu iyi sorunca cevabın nasıl değiştiğini göreceğiz. Üçüncüsü **kontrol etmek**: yapay zeka yanılabilir, bunu nasıl yakalarız ve kişisel bilgilerimizi nasıl koruruz.' },
    { tur: 'soyle', metin: 'Yaklaşık bir buçuk saat sürecek, ortada kısa bir ara vereceğiz.' },
  ] },
  { no: 4, baslik: 'Atölye kuralları', sure: '4–5', bolum: A, adimlar: [
    { tur: 'soyle', metin: 'Başlamadan önce altı küçük kuralımız var, hızlıca geçiyorum.' },
    { tur: 'soyle', metin: 'Bir: **eşli çalışmak serbest**, yanınızdakiyle konuşun, birlikte çözün. İki: telefon sessizde ama açık. Üç: **her yeni uygulama için yeni bir sohbet** açın, konular birbirine karışmasın. Dört: her uygulamanın süresi ekranda, süre bitince birlikte bakacağız.' },
    { tur: 'soyle', metin: 'Beş, en önemlisi: **kişisel bilgi yok**. Kendi ya da başkasının TC numarasını, telefonunu, adresini asla Claude’a yazmıyoruz. Altı: ücretsiz hesapta **mesaj sınırı** var. Kısa ve net yazarsak sorun olmaz; sınıra takılan olursa yanındakiyle devam eder.' },
  ] },
  { no: 5, baslik: 'Isınma sorusu', sure: '5–6', bolum: A, adimlar: [
    { tur: 'soyle', metin: 'Isınmak için küçük bir soru. Şu an izlediğiniz bu sunumu kim hazırladı? Üç şık var: ben mi, Claude mu, yoksa ikimiz birlikte mi? El kaldırarak oy verelim. Bana diyenler? Claude diyenler? Birlikte diyenler?' },
    { tur: 'yap', metin: 'Oyları aldıktan sonra önce “Eyüp”e, sonra “Claude”a tıkla (gri, yanlış), en son “İkisi birlikte”ye tıkla (yeşil).' },
    { tur: 'cevap', metin: 'İkisi birlikte.' },
    { tur: 'soyle', metin: 'Doğru cevap: **ikimiz birlikte**. Ben ne istediğimi anlattım, Claude hazırladı, ben de kontrol edip düzelttim. Bugünün özü tam olarak bu: yapay zeka işi bizim yerimize yapmaz, bizimle birlikte yapar.' },
  ] },
  { no: 6, baslik: 'Yapay zekayı nerede gördünüz?', sure: '6–8', bolum: A, adimlar: [
    { tur: 'soyle', metin: 'Şimdi iki dakika sizi dinleyelim. Yapay zekayı daha önce nerede gördünüz, nerede kullandınız? Hiç kullanmadıysanız da sorun değil, onu da söyleyin.' },
    { tur: 'yap', metin: 'Sayacı başlat (2 dakika). 3–4 kişiye söz ver.' },
    { tur: 'ipucu', metin: 'Beklenen cevaplar: ChatGPT, çeviri uygulamaları, Instagram filtreleri, Siri ya da Google Asistan, navigasyon.' },
    { tur: 'soyle', metin: 'Gördüğünüz gibi aslında hepimiz farkında olmadan her gün yapay zeka kullanıyoruz. Hiç kullanmayan arkadaşlar, bugün tam size göre; sıfırdan, adım adım gideceğiz.' },
  ] },

  // ===================== BÖLÜM 1 =====================
  { no: 7, baslik: 'Yapay zeka ve Claude', sure: '8', bolum: B1, adimlar: [
    { tur: 'soyle', metin: 'Birinci bölümle başlıyoruz: **Yapay zeka ve Claude**. Bilgisayara geçmeden önce, neyle konuşacağımızı anlayalım. Yapay zeka nedir, nereden geldi, nasıl öğrenir ve Claude bu resmin neresinde duruyor? On dakika içinde hepsini konuşacağız.' },
  ] },
  { no: 8, baslik: 'Yapay zeka nedir?', sure: '8–9', bolum: B1, adimlar: [
    { tur: 'soyle', metin: 'Yapay zeka, bilgisayarların bizim insanlara özgü sandığımız işleri yapabilmesi demek: **anlamak, tahmin etmek ve karar vermek**.' },
    { tur: 'soyle', metin: 'Önemli fark şu: Bilgisayara kuralları tek tek yazmıyoruz. Ona çok sayıda örnek gösteriyoruz, o da bu örneklerden kendisi öğreniyor.' },
    { tur: 'soyle', metin: 'Ekrandaki dört örneği düşünün: Navigasyon trafiğe bakıp size yol öneriyor. Çeviri uygulaması metni saniyeler içinde başka dile çeviriyor. YouTube ne izleyeceğinizi öneriyor. Telefonunuz yüzünüzü tanıyıp kilidi açıyor. Bunların hepsi yapay zeka.' },
  ] },
  { no: 9, baslik: 'Yapay zekanın kısa tarihi', sure: '9–10', bolum: B1, atlanabilir: true, adimlar: [
    { tur: 'ipucu', metin: 'Zaman darsa bu slaytı geç.' },
    { tur: 'soyle', metin: 'Yapay zeka aslında yeni bir fikir değil. **1950**’de Alan Turing “Makineler düşünebilir mi?” diye sordu. **1956**’da “yapay zeka” adı ilk kez kullanıldı.' },
    { tur: 'soyle', metin: '**1997**’de IBM’in Deep Blue bilgisayarı satranç şampiyonu Kasparov’u yendi. **2016**’da AlphaGo, Go oyununda dünya şampiyonunu yendi. Ama bunlar tek bir işte çok iyi olan sistemlerdi.' },
    { tur: 'soyle', metin: 'Asıl kırılma **2022 ve 2023**’te oldu: ChatGPT ve Claude gibi, her konuda konuşabilen asistanlar herkesin kullanımına açıldı. Yani yetmiş yıllık bir yolculuğun en heyecanlı yerindeyiz.' },
  ] },
  { no: 10, baslik: 'Makine nasıl öğrenir?', sure: '10–11', bolum: B1, adimlar: [
    { tur: 'soyle', metin: 'Makine nasıl öğrenir? Bir örnekle anlatayım. Küçük bir çocuğa kediyi tarif ettiğinizi düşünün: “Dört ayağı var, bıyığı var, kuyruğu var.” Ama köpeğin de dört ayağı, kuyruğu var. Kural tutmuyor.' },
    { tur: 'soyle', metin: 'Bunun yerine çocuğa yüzlerce kedi resmi gösterirsiniz. Bir süre sonra hiç görmediği bir kediyi de tanır. İşte **makine öğrenmesi** böyle çalışır: kural yazmak yerine örnek gösteririz.' },
    { tur: 'soyle', metin: 'Claude’un örnekleri ise resim değil, **milyonlarca metin**. Bu yüzden dili bu kadar iyi kullanıyor.' },
  ] },
  { no: 11, baslik: 'Üretken yapay zeka', sure: '11–12', bolum: B1, adimlar: [
    { tur: 'soyle', metin: 'Az önceki örnekler bir şeyi tanıyordu: yüzü, yolu, kediyi. Son yıllarda bir adım daha atıldı: **üretken yapay zeka**. Bu tür yapay zeka yepyeni bir şey üretiyor: bir metin, bir görsel, bir ses, hatta bilgisayar kodu.' },
    { tur: 'soyle', metin: 'Sol tarafta neler üretebileceğini görüyorsunuz: duyuru, özet, e-posta, liste, tablo, plan. Sağ tarafta da bilinen sohbet asistanları var: Claude, ChatGPT, Gemini, Copilot.' },
    { tur: 'soyle', metin: 'Biz bugün **Claude**’u kullanacağız. Ama öğreneceğiniz her şey, yani iyi soru sormak ve cevabı kontrol etmek, bu asistanların hepsinde işe yarar.' },
  ] },
  { no: 12, baslik: 'Nasıl çalışır?', sure: '12–13', bolum: B1, adimlar: [
    { tur: 'soyle', metin: 'Peki Claude nasıl çalışıyor? Hepinizin telefonunda bir örneği var. Telefonda yazarken klavye bir sonraki kelimeyi tahmin eder, değil mi? Mesela “Yarın sabah erkenden” yazınca…' },
    { tur: 'yap', metin: '→ tuşuna üç kez basarak “kalkıp”, “okula”, “gideceğim” kelimelerini tek tek aç.' },
    { tur: 'soyle', metin: 'Telefonunuz bunu sizin daha önce yazdıklarınızdan öğrendi. Claude da aynı fikirle çalışır, ama milyonlarca kitap ve makale okuyarak öğrendiği için tek bir kelimeyi değil, koca paragrafları tahmin edebilir.' },
    { tur: 'soyle', metin: 'Bunun önemli bir sonucu var: Claude bilgiyi bir veritabanından okumaz, **en olası cevabı yazar**. Bu yüzden çoğu zaman çok iyidir ama bazen yanılabilir. Dördüncü bölümde buna geri döneceğiz.' },
  ] },
  { no: 13, baslik: 'Dil modeli ve bilgi sınırı', sure: '13–14', bolum: B1, adimlar: [
    { tur: 'soyle', metin: 'Claude’a teknik olarak **büyük dil modeli** deniyor. Bunun arkasında, onu doğru kullanmak için bilmeniz gereken dört şey var.' },
    { tur: 'soyle', metin: 'Bir: metni **parça parça** okur; bu parçalara “token” denir. İki: okuduğu metinlerdeki kalıplardan öğrenir, **ezberden değil tahminle** yazar.' },
    { tur: 'soyle', metin: 'Üç, çok önemli: **bilgisinin bir tarihi var**. Belirli bir tarihe kadarki verilerle eğitilir, sonrasında olanları bilmeyebilir. Dört: her zaman internete bakmaz. Yani dün çıkan bir haberi ya da yeni bir yönetmeliği sorarken bunu aklınızda tutun.' },
  ] },
  { no: 14, baslik: 'Claude nedir?', sure: '14–15', bolum: B1, adimlar: [
    { tur: 'soyle', metin: 'Şimdi bugünün kahramanıyla tanışalım: **Claude**. Claude, Anthropic adlı şirketin geliştirdiği bir yapay zeka asistanı; 2023’ten beri kullanılıyor.' },
    { tur: 'soyle', metin: 'Türkçe dahil birçok dilde konuşur. Tarayıcıda, telefonda ve bilgisayar uygulamasında çalışır. PDF, belge ve fotoğraf okuyabilir, uzun metinleri özetleyebilir. Ve en güzeli: **ücretsiz** başlayabilirsiniz.' },
    { tur: 'soyle', metin: 'Sağdaki turuncu yıldızı aklınızda tutun; ekranda bunu gördüğünüz yer Claude. Ücretsiz planda mesaj sınırı olduğunu da tekrar hatırlatayım.' },
  ] },
  { no: 15, baslik: 'Neler yapabilir, nelere dikkat?', sure: '15–16', bolum: B1, adimlar: [
    { tur: 'soyle', metin: 'Claude çok güçlü bir yardımcı ama bir uzman ya da arama motoru değil. İki tarafı da bilelim.' },
    { tur: 'soyle', metin: 'Neler yapabilir? Metin yazar, düzeltir, sadeleştirir. Özetler, açıklar, çevirir. Fikir ve plan üretir. Ve sabırla, tekrar tekrar anlatır; yüzüncü kez sorsanız da sıkılmaz.' },
    { tur: 'soyle', metin: 'Nelere dikkat? **Yanılabilir**, hatta bilgi uydurabilir. Her konuda güncel bilgisi yoktur. Duygusu yoktur. Ve en önemlisi: **son karar ve sorumluluk her zaman sizde**.' },
  ] },
  { no: 16, baslik: 'Boşluğu doldur', sure: '16–17', bolum: B1, adimlar: [
    { tur: 'soyle', metin: 'Birinci bölümü bitirmeden kısa bir tekrar yapalım. Cümleleri ben okuyacağım, boşluğu siz sesli tamamlayın.' },
    { tur: 'soyle', metin: '“Makine öğrenmesinde sistem kuralları değil, …… kullanır.” “Claude bir sonraki kelimeyi …… ederek yazar.” “Üretken yapay zeka yeni bir şey ……” “Claude’un bilgisinin bir …… vardır.” “Claude da …… yapabilir, bu yüzden cevabı …… ederim.”' },
    { tur: 'yap', metin: 'Her cümlede sınıftan cevabı al, sonra boşluğa tıklayıp doğru cevabı aç.' },
    { tur: 'cevap', metin: 'Sırayla: örnekleri · tahmin · üretir · tarihi · hata · kontrol.' },
  ] },

  // ===================== BÖLÜM 2 =====================
  { no: 17, baslik: 'Claude ile tanış', sure: '17', bolum: B2, adimlar: [
    { tur: 'soyle', metin: 'Teoriyi bitirdik, şimdi işin eğlenceli kısmı. İkinci bölüm: **Claude ile tanış**. Herkes bilgisayarının başına geçsin. Üç adımda bilgisayara gireceğiz, Claude’u açacağız ve ilk mesajımızı göndereceğiz.' },
    { tur: 'soyle', metin: 'Takılan olursa hiç çekinmeden el kaldırın; kimse geride kalmadan birlikte ilerleyeceğiz.' },
  ] },
  { no: 18, baslik: '1. Adım: Bilgisayara giriş', sure: '17–19', bolum: B2, adimlar: [
    { tur: 'soyle', metin: 'Birinci adım: bilgisayara giriş. Tarayıcıyı açtığınızda kampüs ağının giriş sayfası gelecek. Oraya **TC kimlik numaranızı** ve **UBYS şifrenizi** yazıp “Giriş”e tıklayın. Ekrandaki görsel temsili, sizdeki sayfa biraz farklı görünebilir.' },
    { tur: 'yap', metin: 'Herkesin giriş yapmasını bekle. “Giren el kaldırsın” de; kalkmayan ellere masa asistanlarını yönlendir.' },
    { tur: 'soyle', metin: 'Girebilen el kaldırsın! Şifresini hatırlamayan varsa üzülmeyin; yanınızdaki arkadaşla birlikte çalışabilirsiniz.' },
  ] },
  { no: 19, baslik: "2. Adım: Claude'a giriş", sure: '19–20', bolum: B2, adimlar: [
    { tur: 'soyle', metin: 'İkinci adım: Claude’a giriş. Adres çubuğuna **claude.ai** yazıp Enter’a basın. Hesabınızı nasıl açtıysanız öyle girin: Google ile açtıysanız “Google ile devam et”, e-postayla açtıysanız e-posta adresinizi yazın.' },
    { tur: 'soyle', metin: 'E-postayla girenlere bir kod gelecek, telefonunuza bakın. Ekranda bir mesaj kutusu görüyorsanız tamamsınız.' },
    { tur: 'soyle', metin: 'Bir önemli uyarı: Tarayıcı “şifreyi kaydet” diye sorarsa **Hayır** deyin. Bu bilgisayarları başkaları da kullanıyor.' },
    { tur: 'yap', metin: 'Hesap açmadan gelenleri yanındakiyle eşleştir.' },
  ] },
  { no: 20, baslik: '3. Adım: Claude ekranını tanı', sure: '20–21', bolum: B2, adimlar: [
    { tur: 'soyle', metin: 'Üçüncü adım: ekranı tanıyalım. Ekranda üç şey önemli.' },
    { tur: 'soyle', metin: 'Bir numara **mesaj kutusu**: Sorunuzu ya da isteğinizi buraya yazarsınız. İki numara **gönder** düğmesi: ok işaretine tıklayın ya da Enter’a basın. Alt satıra geçmek isterseniz Shift ile Enter’a birlikte basın. Üç numara **yeni sohbet**: Her yeni konu için temiz bir sayfa açar.' },
    { tur: 'yap', metin: 'Kendi ekranında da göster: mesaj kutusu, gönder, yeni sohbet, sol taraftaki sohbet geçmişi.' },
  ] },
  { no: 21, baslik: 'İlk mesajını gönder', sure: '21–24', bolum: B2, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Ve ilk uygulamamız! Ekrandaki mesajı yazacaksınız. Alt çizgili yere kendi adınızı yazın: “Merhaba, benim adım …, kendini bana üç cümlede tanıt ve bugün sana neler sorabileceğimi söyle.” Üç dakikanız var, başlayın!' },
    { tur: 'yap', metin: 'Sayacı başlat (3 dakika). Sınıfta dolaş, Türkçe karakterlerde zorlananlara yardım et.' },
    { tur: 'soyle', metin: 'Süre bitti. Bir gönüllü alalım: Claude size ne cevap verdi, sesli okur musunuz?' },
    { tur: 'soyle', metin: 'Gördünüz mü, ilk sohbetimizi yaptık! Sizi tanıdı, size hitap etti, neler yapabileceğini anlattı.' },
  ] },
  { no: 22, baslik: "Claude'a kendini anlattır", sure: '24–27', bolum: B2, etkinlik: true, atlanabilir: true, adimlar: [
    { tur: 'ipucu', metin: 'Zaman darsa bu uygulamayı geç.' },
    { tur: 'soyle', metin: 'Aynı sohbette devam ediyoruz. Şimdi Claude’a sizin için neler yapabileceğini soracağız. Ekrandaki mesajı gönderin: bir üniversite öğrencisinin ve bir Kızılay gönüllüsünün işine yarayacak beş şeyi, her birine örnek bir mesajla birlikte istiyoruz. Üç dakika.' },
    { tur: 'yap', metin: 'Sayacı başlat (3 dakika). Dolaş.' },
    { tur: 'soyle', metin: 'Listede sizi en çok şaşırtan madde hangisiydi? İki kişiden duyalım. Bu listedeki örnek mesajları ileride siz de kullanabilirsiniz.' },
  ] },
  { no: 23, baslik: 'Sohbet nasıl yürür?', sure: '27–28', bolum: B2, adimlar: [
    { tur: 'soyle', metin: 'Claude ile konuşmak mesajlaşmaya benziyor. Ama işinizi kolaylaştıracak dört küçük özellik var.' },
    { tur: 'soyle', metin: 'Bir: **sohbet hafızası**. Aynı sohbetteki her şeyi hatırlar, “bunu kısalt” demeniz yeter. İki: **yeniden dene**. Cevabı beğenmezseniz yeniden yazdırabilirsiniz, her seferinde farklı yazar. Üç: **mesajını düzenle**. Kendi mesajınızdaki bir hatayı düzeltip yeniden gönderebilirsiniz. Dört: **kopyala**. Cevabın altındaki düğmeyle metni kopyalayıp Word’e ya da WhatsApp’a yapıştırırsınız.' },
    { tur: 'yap', metin: 'Dört özelliği kendi ekranında tek tek göster.' },
  ] },

  // ===================== BÖLÜM 3 =====================
  { no: 24, baslik: 'İyi soru sormak', sure: '28', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Üçüncü bölüme geldik ve bu bugünün **en önemli bölümü**: **İyi soru sormak**. Size bir formül ve beş teknik öğreteceğim. Her tekniği kısaca anlatacağım, sonra hemen deneyeceğiz.' },
    { tur: 'soyle', metin: 'Aynı yapay zekadan çok farklı cevaplar almanın sırrı burada.' },
  ] },
  { no: 25, baslik: 'İyi istemin formülü', sure: '28–29', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Önce bir kelime öğrenelim: **istem**. İstem, Claude’a yazdığınız mesaj demek.' },
    { tur: 'soyle', metin: 'İyi bir istemi şöyle düşünün: Kızılay’a yeni gelen bir gönüllüye iş tarif ediyorsunuz. Ona sadece “bir şey yaz” derseniz ne yapacağını bilemez. Ama üç soruyu cevaplarsanız tam istediğinizi yapar.' },
    { tur: 'soyle', metin: '**Kim için?** Metni kim okuyacak: öğrenciler mi, gönüllüler mi? **Ne?** Tam olarak ne istiyorsunuz: duyuru mu, liste mi? **Nasıl?** Uzunluğu, tonu, biçimi: kaç cümle, samimi mi, resmî mi?' },
  ] },
  { no: 26, baslik: 'Hangisi daha iyi?', sure: '29–30', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Aynı konuda iki istem var. A: “Kızılay yaz.” B: “Genç Kızılay için kan bağışı kampanyasına çağıran üç cümlelik samimi bir Instagram duyurusu yaz.” Sizce hangisi daha iyi bir cevap getirir?' },
    { tur: 'yap', metin: 'Cevapları al, sonra → tuşuyla A’nın çarpısını ve B’nin tikini sırayla aç.' },
  ] },
  { no: 27, baslik: 'B neden daha iyi?', sure: '30–31', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Peki B neden daha iyi? Üç şık var: Daha uzun olduğu için mi, kim için ne ve nasıl olduğunu söylediği için mi, yoksa daha kibar olduğu için mi? El kaldırarak oy verelim.' },
    { tur: 'yap', metin: 'Oyları al, doğru şıkka tıkla.' },
    { tur: 'cevap', metin: 'Kim için, ne ve nasıl olduğunu söylediği için.' },
    { tur: 'soyle', metin: 'Kim için: Genç Kızılay takipçileri. Ne: kan bağışı duyurusu. Nasıl: üç cümle, samimi, Instagram için. Uzunluk tek başına bir şey değiştirmez; önemli olan **net bilgi**.' },
  ] },
  { no: 28, baslik: 'Farkı kendin gör', sure: '31–35', bolum: B3, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Şimdi farkı kendi gözünüzle göreceksiniz. Önce A’yı, yani sadece “Kızılay yaz”ı gönderin. Sonra **yeni bir sohbet** açın ve B’yi gönderin. İki cevabı karşılaştırın. Dört dakikanız var.' },
    { tur: 'yap', metin: 'Sayacı başlat (4 dakika). Dolaş, yavaş yazanlara yardım et.' },
    { tur: 'soyle', metin: 'Bir iki kişiden duyalım: A’da ne geldi, B’de ne geldi?' },
    { tur: 'ipucu', metin: 'Beklenen: A’da dağınık, genel bir Kızılay tanıtımı; B’de doğrudan paylaşılabilecek bir duyuru.' },
    { tur: 'soyle', metin: 'İşte fark bu. Aynı yapay zeka, ama siz net olunca cevap da net oluyor.' },
  ] },
  { no: 29, baslik: 'Kim için? Aynı konu, üç okuyucu', sure: '35–36', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Formülün ilk parçasına yakından bakalım: **Kim için?** Aynı bilgiyi kime anlattığınıza göre kelimeler, örnekler ve uzunluk tamamen değişir.' },
    { tur: 'soyle', metin: 'On yaşındaki bir çocuğa kısa cümleler ve benzetmelerle anlatırsınız. Bir lise öğrencisine biraz daha ayrıntıyla. Bir bilgisayar mühendisine ise teknik terimlerle, kısa ve yoğun.' },
    { tur: 'soyle', metin: 'Bu soruyu boş bırakırsanız Claude ortalama bir okuyucuya yazar; o da çoğu zaman kimseye tam uymaz.' },
  ] },
  { no: 30, baslik: 'Üç farklı okuyucu', sure: '36–39', bolum: B3, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Deneyelim. Yeni bir sohbet açın ve ekrandaki mesajı gönderin: Yapay zekayı önce on yaşında bir çocuğa, sonra bir lise öğrencisine, sonra bir bilgisayar mühendisine üçer cümleyle açıklamasını isteyin. Üç dakika.' },
    { tur: 'yap', metin: 'Sayacı başlat (3 dakika). Dolaş.' },
    { tur: 'soyle', metin: 'Hangisi size en uygundu, neden? Okuyucuyu söylemek, cevabı en çok değiştiren tek bilgi.' },
  ] },
  { no: 31, baslik: 'Rol ver', sure: '39–40', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'İkinci teknik: **rol ver**. Claude’a “Sen bir … gibi davran” dediğinizde, o rolün bilgisiyle ve diliyle cevap verir. Bu, kime danışacağınızı seçmek gibidir.' },
    { tur: 'soyle', metin: 'Ekrandaki örnekte Claude’a “Sen AFAD’da çalışan deneyimli bir afet eğitmenisin” diyoruz. Bakın, cevap nasıl daha öğretici oluyor: öncelikleri sıralıyor, nedenlerini açıklıyor.' },
    { tur: 'soyle', metin: 'Ama dikkat: rol vermek bilgiyi doğru yapmaz, sadece anlatımı iyileştirir. Kontrol etmek yine bizim işimiz.' },
  ] },
  { no: 32, baslik: 'Rol deneyi', sure: '40–43', bolum: B3, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Şimdi siz deneyin. Önce rolsüz sorun: “Deprem çantasında neler olmalı?” Sonra **yeni bir sohbet** açıp rollü hâlini gönderin. Hangisi daha öğretici, karşılaştırın. Üç dakika.' },
    { tur: 'yap', metin: 'Sayacı başlat (3 dakika). Dolaş.' },
    { tur: 'soyle', metin: 'Rollü cevapta ne farklıydı? Gerekçeler, sıralama, daha öğretici bir dil, değil mi? Bu listeyi bir duyuruda kullanacaksanız mutlaka afad.gov.tr’deki resmî listeyle karşılaştırın.' },
  ] },
  { no: 33, baslik: 'Biçim söyle', sure: '43–44', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Üçüncü teknik: **biçim söyle**. Aynı bilgi bir paragraf, bir liste ya da bir tablo olarak gelebilir. Siz nasıl kullanacaksanız o biçimi isteyin.' },
    { tur: 'soyle', metin: 'Hızlı okunacaksa “beş maddelik liste” deyin. Karşılaştırma yapacaksanız “tablo yap” deyin. Sosyal medya için “en fazla elli kelime” deyin.' },
    { tur: 'soyle', metin: 'Kendinize şunu sorun: Bu metni nereye yapıştıracağım? WhatsApp’a uzun bir tablo, bir rapora tek bir cümle uymaz.' },
  ] },
  { no: 34, baslik: 'Biçim deneyi', sure: '44–47', bolum: B3, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Deneyelim. Aynı sohbette iki mesajı sırayla göndereceksiniz. Önce: sınav haftasında sağlıklı kalmak için beş öneriyi tablo olarak isteyin. Sonra aynı önerileri en fazla elli kelimelik tek bir paragrafta isteyin. Üç dakika.' },
    { tur: 'yap', metin: 'Sayacı başlat (3 dakika). Dolaş.' },
    { tur: 'soyle', metin: 'Hangisini arkadaşınıza WhatsApp’tan gönderirdiniz, hangisini bir panoya asardınız? Aynı bilgi, farklı biçim, farklı kullanım.' },
  ] },
  { no: 35, baslik: 'Örnek göster', sure: '47–48', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Dördüncü teknik: **örnek göster**. Bazen ne istediğinizi tarif etmek zordur. O zaman bir iki örnek gösterin; Claude örneklerin tarzını, uzunluğunu ve tonunu yakalayıp aynı çizgide devam eder.' },
    { tur: 'soyle', metin: 'Ekranda iki kan bağışı sloganı verdik: “Bir ünite kan, üç hayat.” ve “Damarındaki iyilik, birinin yarını.” Bakın, Claude’un yazdığı sloganlar da kısa ve iki parçalı oldu. Örnek göstermek, tarif etmekten çoğu zaman daha hızlıdır.' },
  ] },
  { no: 36, baslik: 'Örnekle öğret', sure: '48–51', bolum: B3, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Sıra sizde. Ekrandaki mesajı gönderin ve gelen beş slogandan en beğendiğinizi seçin. İsteyen kendi iki örneğini yazıp tekrar deneyebilir. Üç dakika.' },
    { tur: 'yap', metin: 'Sayacı başlat (3 dakika). Dolaş.' },
    { tur: 'soyle', metin: 'Üç kişiden en beğendiği sloganı duyalım. Sınıfın favorisini seçelim; birazdan Kızılay görevinde işinize yarayabilir.' },
  ] },
  { no: 37, baslik: 'Önce sana sorsun', sure: '51–52', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Beşinci teknik: **önce sana sorsun**. Ne istediğinizi tam bilmiyorsanız ya da bilgi eksikse, Claude’dan yazmaya başlamadan önce size soru sormasını isteyin. Tahmin etmek yerine öğrenir, cevap ilk seferde tutar.' },
    { tur: 'soyle', metin: 'Bunun için “Yazmadan önce bana üç soru sor”, “Eksik bilgi varsa önce sor” ya da “Önce bir plan çıkar, onaylarsam yaz” demeniz yeter. Davet, duyuru, etkinlik planı gibi ayrıntılı işlerde çok zaman kazandırır.' },
  ] },
  { no: 38, baslik: 'Önce bana sor', sure: '52–56', bolum: B3, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Deneyelim. Ekrandaki mesajı gönderin: Genç Kızılay gönüllü toplantısı için bir WhatsApp davet mesajı istiyoruz ama Claude önce bize üç soru soracak. Sorularını kendi bilgilerinizle cevaplayın ve davet metnini alın. Gerçek bir kişinin telefonunu ya da adresini yazmayın; yer olarak “Teknik Bilimler MYO” yeterli. Dört dakika.' },
    { tur: 'yap', metin: 'Sayacı başlat (4 dakika). Dolaş.' },
    { tur: 'soyle', metin: 'Claude size hangi soruları sordu? Tarih, saat, yer, gündem, değil mi? İyi bir istem bazen tek bir mesaj değil, küçük bir sohbettir.' },
  ] },
  { no: 39, baslik: 'Altı altın ipucu', sure: '56–57', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Şimdiye kadar denediklerimizi altı ipucunda toplayalım: Bağlam verin, kim olduğunuzu ve durumu anlatın. Rol verin. Örnek gösterin. Biçim söyleyin. Adım adım isteyin. Ve eksik bilgi varsa önce size sormasına izin verin.' },
    { tur: 'soyle', metin: 'Hepsini aynı anda kullanmak zorunda değilsiniz. İşe göre ikisini üçünü seçmeniz yeterli.' },
    { tur: 'ipucu', metin: 'Ara vermek için uygun an: “Beş dakika ara veriyoruz, bilgisayarları kapatmayın.”' },
  ] },
  { no: 40, baslik: 'Hepsi bir arada: örnek sohbet', sure: '57–58', bolum: B3, atlanabilir: true, adimlar: [
    { tur: 'ipucu', metin: 'Zaman darsa bu slaytı geç.' },
    { tur: 'soyle', metin: 'İpuçlarını tek bir istemde birleştirince ne oluyor, bakalım. Rol: deneyimli bir ilk yardım eğitmeni. Kim için: üniversite öğrencileri. Ne: deprem anında yapılacaklar. Nasıl: dört maddelik kısa bir liste.' },
    { tur: 'soyle', metin: 'Cevap da tam istediğimiz gibi geldi: Çök, kapan, tutun. Bu, AFAD’ın da önerdiği yöntem. Yine de Claude’un cevabını resmî kaynakla karşılaştırmak dördüncü bölümün konusu.' },
  ] },
  { no: 41, baslik: 'Beğenmedin mi? Sohbete devam et', sure: '58–59', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Claude’un ilk cevabı bir **taslaktır**. Beğenmezseniz baştan başlamanıza gerek yok. Aynı sohbette neyi değiştirmek istediğinizi söyleyin: “Daha kısa yap”, “İki emoji ekle”, “Daha resmî yaz.”' },
    { tur: 'soyle', metin: 'Bir arkadaşınıza “şunu biraz kısalt” der gibi yazın. Kural basit: Yeni konu için yeni sohbet, aynı metni geliştirmek için aynı sohbet.' },
  ] },
  { no: 42, baslik: 'Cevabı 2 kez düzelttir', sure: '59–62', bolum: B3, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Şimdi bunu deneyelim. Kan bağışı duyurusunun ya da davet mesajının olduğu sohbete dönün. Önce “Daha kısa yap ve iki emoji ekle” yazın. Sonra “Şimdi aynı metni daha resmî bir dille yaz” yazın. Her seferinde metnin nasıl değiştiğine bakın. Üç dakika.' },
    { tur: 'yap', metin: 'Sayacı başlat (3 dakika). Dolaş.' },
    { tur: 'soyle', metin: 'Hangi sürümü en çok beğendiniz? Aynı istek, farklı tonlar. Seçim her zaman sizin.' },
  ] },
  { no: 43, baslik: 'Formülü tamamla', sure: '62–63', bolum: B3, adimlar: [
    { tur: 'soyle', metin: 'Üçüncü bölümü bitiriyoruz. Yine ben okuyacağım, siz tamamlayın. “İyi istem: …… için, …… ve ……” “Rol ver: Deneyimli bir afet …… gibi cevap ver.” “Biçim söyle: Cevabı beş maddelik bir …… hâlinde ver.” “Emin değilsen: Yazmadan önce bana …… sor.” “İlk cevabı beğenmezsem …… ederim.”' },
    { tur: 'yap', metin: 'Her cümlede sınıftan cevabı al, sonra boşluklara sırayla tıkla. 40–42. slaytlar atlandıysa son boşluktan önce sözlü açıkla: “Cevabı beğenmezseniz yeniden başlamayın, aynı sohbette düzeltme isteyin.”' },
    { tur: 'cevap', metin: 'Kim · Ne · Nasıl · eğitmeni · liste · soru · sohbete devam.' },
  ] },

  // ===================== BÖLÜM 4 =====================
  { no: 44, baslik: 'Kontrol et, güvenli kullan', sure: '63', bolum: B4, adimlar: [
    { tur: 'soyle', metin: 'Dördüncü bölüm: **Kontrol et, güvenli kullan**. Claude çok yardımcı, gördünüz. Ama doğruluk, adalet ve gizlilik konusunda sorumluluk her zaman bizde. Bu bölüm en az iyi soru sormak kadar önemli.' },
    { tur: 'soyle', metin: 'Yanlış bilgiyi nasıl yakalarız, kişisel bilgileri nasıl koruruz, birlikte göreceğiz.' },
  ] },
  { no: 45, baslik: 'Claude da yanılabilir', sure: '63–64', bolum: B4, adimlar: [
    { tur: 'soyle', metin: 'Hatırlıyor musunuz, Claude en olası cevabı yazıyordu. Bu yüzden bilmediği bir yerde de akla yatkın bir şey uydurabilir ve bunu **kendinden emin** bir dille söyler. Buna **halüsinasyon** denir.' },
    { tur: 'soyle', metin: 'En çok tarihlerde, sayılarda, kişi ve kurum isimlerinde, kaynak ve kitap adlarında olur. Ne yapmalıyız? Önemli bilgiyi başka bir kaynaktan kontrol etmeliyiz, özellikle başkasıyla paylaşacaksak.' },
    { tur: 'soyle', metin: 'Unutmayın: Claude yalan söylemez ama yanılabilir. **Düzgün yazılmış bir cevap, doğru olduğu anlamına gelmez.**' },
  ] },
  { no: 46, baslik: 'Hatayı bul', sure: '64–66', bolum: B4, adimlar: [
    { tur: 'soyle', metin: 'Claude’dan şöyle bir cevap geldiğini düşünün: “Türk Kızılay 1923 yılında kuruldu. Afetlerde barınma ve beslenme desteği verir, kan bağışı çalışmaları yürütür.” Cümleler düzgün, ton emin. Bu cevapta bir yanlış var. Hangisi?' },
    { tur: 'yap', metin: 'Cevapları al. Bulan olursa → tuşuyla doğru cevabı aç.' },
    { tur: 'cevap', metin: '1923 değil, 1868. Kızılay, Osmanlı döneminde İstanbul’da kuruldu (kizilay.org.tr tarihçe sayfası).' },
    { tur: 'soyle', metin: 'Gördünüz mü? Cevap çok düzgün ve emin görünüyordu ama yanlıştı. İşte bu yüzden kontrol ediyoruz.' },
    { tur: 'ipucu', metin: 'Biri “1923 de doğru” derse: 1923’te kurum yeni değil, adı “Türkiye Hilal-i Ahmer Cemiyeti” oldu. Kuruluş 1868. Yarı doğru bilgi de kontrol gerektirir.' },
  ] },
  { no: 47, baslik: 'Halüsinasyon avı', sure: '66–70', bolum: B4, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Şimdi siz bir halüsinasyon avına çıkacaksınız! Yeni bir sohbet açın ve sorun: Çanakkale Teknik Bilimler Meslek Yüksekokulu hangi yıl kuruldu, okulun ilk müdürü kimdi? Cevabı not alın. Sonra ikinci mesajı gönderin: “Bu bilgilerden ne kadar eminsin, hangi kaynağa dayanıyorsun?” Dört dakika.' },
    { tur: 'yap', metin: 'Sayacı başlat (4 dakika). Dolaş.' },
    { tur: 'soyle', metin: 'Size bir ipucu: Okulun logosunda kuruluş yılı yazıyor. Claude’un verdiği yıl doğru muydu? Peki ilk müdür için ne dedi? Bir isim verdi mi, yoksa emin olmadığını mı söyledi?' },
    { tur: 'cevap', metin: 'Kuruluş yılı logoda: 1976. İlk müdürün adını derse gelmeden okulun resmî sitesinden kontrol et: [ismi buraya yaz].' },
    { tur: 'soyle', metin: 'Yerel ve az bilinen bilgilerde halüsinasyon riski en yüksektir. Bir isim duyduğunuzda mutlaka resmî kaynağa bakın.' },
  ] },
  { no: 48, baslik: 'Cevabı nasıl kontrol ederim?', sure: '70–71', bolum: B4, adimlar: [
    { tur: 'soyle', metin: 'Peki nasıl kontrol edeceğiz? Üç adım var. Bir: **resmî kaynağa bakın**; tarih, sayı ve kurallar için kurumun kendi sitesi: kizilay.org.tr, afad.gov.tr, e-Devlet. İki: **Claude’a geri sorun**: “Bundan emin misin, hangi kaynağa dayanıyorsun?” Az önce bunu denediniz. Üç: sağlık, hukuk ve para konularında **bir uzmana danışın**.' },
    { tur: 'soyle', metin: 'Kural çok basit: **Bir bilgiyi başkasına aktaracaksanız, önce doğrulayın.**' },
  ] },
  { no: 49, baslik: 'Önyargıya dikkat', sure: '71–72', bolum: B4, adimlar: [
    { tur: 'soyle', metin: 'Bir şeye daha dikkat edelim: **önyargı**. Claude insanların yazdığı metinlerden öğrendiği için, o metinlerdeki önyargıları da yansıtabilir.' },
    { tur: 'soyle', metin: 'Örneğin Claude’dan “bir hemşire ve bir mühendis hakkında hikâye yaz” isteyince hemşireyi kadın, mühendisi erkek yazabilir. Ya da bir bölgeyi kalıp yargıyla anlatabilir.' },
    { tur: 'soyle', metin: 'Ne yapacağız? Metni yayımlamadan önce bu gözle okuyacağız, gerekirse “kapsayıcı bir dille yaz” diyeceğiz. Kızılay’ın temel ilkelerini hatırlayın: insanlık, ayrım gözetmeme, tarafsızlık. Bu ilkeler yapay zekayla yazdığımız metinler için de geçerli.' },
  ] },
  { no: 50, baslik: "Claude'a asla yazma", sure: '72–73', bolum: B4, adimlar: [
    { tur: 'soyle', metin: 'Şimdi en önemli kurallardan birine geldik. Claude’a yazdığınız her şey bir sunucuya gider. Bu yüzden bazı şeyleri **asla** yazmıyoruz.' },
    { tur: 'soyle', metin: 'Kişisel bilgiler: TC kimlik numarası, telefon, adres, doğum tarihi, şifreler ve kart bilgileri. Kızılay’da ise: afetzedelerin kimlik ve adresleri, bağışçıların sağlık bilgileri, gönüllülerin iletişim bilgileri. Bunlar bize emanettir; KVKK, yani kişisel verilerin korunması kanunu da bunu gerektirir.' },
    { tur: 'soyle', metin: 'Basit bir kural: “**Bunu bir yabancıya söyler miydim?**” Hayırsa yazmayın. Bir metinde gerçek isim gerekiyorsa “[isim]” yazın, sonra kendiniz doldurun.' },
  ] },
  { no: 51, baslik: 'Kişisel veriyi temizle', sure: '73–76', bolum: B4, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Şimdi bunu uygulayalım. Ekrandaki istemde kişisel bilgiler var: isim, TC numarası, telefon ve adres. Bu bilgiler tamamen uydurma ama yine de **olduğu gibi göndermiyoruz**. Önce bu bilgileri [isim], [telefon] gibi yer tutucularla değiştirin, sonra gönderin. Üç dakika.' },
    { tur: 'yap', metin: 'Sayacı başlat (3 dakika). Dolaş, kimin neyi sildiğine bak.' },
    { tur: 'soyle', metin: 'Size bir soru: Bu mesajı yazdırmak için TC numarasına gerçekten ihtiyaç var mıydı? Hayır! Claude mesajı yer tutucularla gayet güzel yazdı. Gerçek bilgiyi en son siz eklersiniz.' },
  ] },
  { no: 52, baslik: "Hangisini Claude'a yazabilirim?", sure: '76–77', bolum: B4, atlanabilir: true, adimlar: [
    { tur: 'ipucu', metin: 'Zaman darsa bu slaytı geç.' },
    { tur: 'soyle', metin: 'Dört istem var. Her birini okuyacağım; siz “yazabilirim” ya da “yazamam” diye el kaldırın. Birden fazla doğru cevap olabilir. Bir: “Kan bağışı günü için afiş metni yaz.” İki: “Ayşe K., TC numarası ve adresi şu, ona yardım mektubu yaz.” Üç: “Şu şifrem güvenli mi?” Dört: “Gönüllü toplantısı için beş maddelik gündem öner.”' },
    { tur: 'yap', metin: 'Her şıkta oy al ve şıkka tıkla.' },
    { tur: 'cevap', metin: 'Yazılabilir: 1 ve 4. Yazılamaz: 2 ve 3. İkincisi az önceki uygulamadaki gibi yer tutucuyla yazılabilir.' },
  ] },
  { no: 53, baslik: 'Öğrenmek için kullan', sure: '77–78', bolum: B4, adimlar: [
    { tur: 'soyle', metin: 'Bu bölümün son konusu: Claude’u **öğrenmek için** kullanmak. Onu yanınızda sabırlı bir öğretmen gibi düşünün. Ödevinizi onun yazması size bir şey kazandırmaz; ama size öğretmesi çok şey kazandırır.' },
    { tur: 'soyle', metin: 'Öğrenmenizi hızlandıran kullanım: anlamadığınız konuyu basitçe açıklatmak, “bana beş soru sor” diyerek kendinizi sınamak, kendi taslağınızı geliştirmesini istemek. Öğrenmenizi engelleyen kullanım: ödevi kopyalayıp teslim etmek, okumadan paylaşmak, düşünmeyi tamamen ona bırakmak.' },
    { tur: 'soyle', metin: 'Hocalarınızın yapay zeka kurallarına uyun; kullandıysanız bunu açıkça belirtin.' },
  ] },
  { no: 54, baslik: 'Claude seni sınasın', sure: '78–82', bolum: B4, etkinlik: true, atlanabilir: true, adimlar: [
    { tur: 'ipucu', metin: 'Zaman darsa bu uygulamayı geç.' },
    { tur: 'soyle', metin: 'Claude’u öğretmen gibi kullanmanın en güzel örneğini deneyelim. Yeni bir sohbet açın ve ekrandaki mesajı gönderin. Claude size bugünkü konulardan beş soruluk bir quiz yapacak. Soruları tek tek cevaplayın, her cevabınızı değerlendirecek. Dört dakika.' },
    { tur: 'yap', metin: 'Sayacı başlat (4 dakika). Dolaş.' },
    { tur: 'soyle', metin: 'Kaç doğrunuz var? Sınavlara da tam olarak böyle çalışabilirsiniz.' },
  ] },

  // ===================== BÖLÜM 5 =====================
  { no: 55, baslik: 'Öğrendiğini kullan', sure: '82', bolum: B5, adimlar: [
    { tur: 'soyle', metin: 'Son bölüme geldik: **Öğrendiğini kullan**. Şimdi bugün öğrendiğiniz her şeyi bir araya getireceğiz ve bir Kızılay gönüllüsü olarak gerçek bir işi Claude ile birlikte baştan sona yapacaksınız.' },
    { tur: 'soyle', metin: 'Formülü, ipuçlarını ve kontrol adımlarını tek bir görevde kullanacağız.' },
  ] },
  { no: 56, baslik: "Kızılay'da yapay zeka", sure: '82–83', bolum: B5, adimlar: [
    { tur: 'soyle', metin: 'Gönüllülük çalışmalarımızda yapay zeka bize çok zaman kazandırabilir. Duyuru ve afiş metinleri. Görev listesi ve zaman çizelgesiyle etkinlik planları. İlk yardım ve afete hazırlık için sade eğitim materyalleri. Uzun toplantı notlarını kısa karar listesine çevirmek. Bilgilendirme metinlerinin çeviri taslakları. Ve proje, slogan, sosyal medya fikirleri.' },
    { tur: 'soyle', metin: 'Ama her birinde aynı kural geçerli: **kişisel veri yok, son kontrol bizde.** Afet bölgesinde hayati bir bilgi çevrilecekse mutlaka o dili bilen birine kontrol ettirin.' },
  ] },
  { no: 57, baslik: 'Mini proje: nasıl çalışacağız?', sure: '83–84', bolum: B5, adimlar: [
    { tur: 'soyle', metin: 'Son uygulama dört adımlı küçük bir proje. Bir: **seç**. Üç görevden birini seçeceksiniz. İki: **yaz**. Formülü kullanın ve rol, biçim ya da örnek ipuçlarından en az ikisini ekleyin. Üç: **geliştir**. Cevabı en az bir kez sohbetle düzelttirin. Dört: **kontrol et**. Bilgileri resmî kaynakla karşılaştırın, kişisel veri olmadığından emin olun.' },
    { tur: 'soyle', metin: 'Acele etmeyin, kalite önemli. Bitirenler en iyi sonucu seçip paylaşmaya hazırlansın.' },
  ] },
  { no: 58, baslik: 'Kızılay görevi', sure: '84–91', bolum: B5, etkinlik: true, adimlar: [
    { tur: 'soyle', metin: 'Ve büyük görev! Üç seçeneğiniz var: deprem çantası kontrol listesi, kan bağışı kampanyası duyurusu ya da yeni bir gönüllüye hoş geldin mesajı. Birini seçin, formülü ve en az iki ipucunu kullanın, sonra cevabı bir kez düzelttirin. Ekrandaki örneği aynen kopyalamak yerine kendi isteminizi yazmaya çalışın. Yedi dakikanız var.' },
    { tur: 'yap', metin: 'Sayacı başlat (7 dakika). Dolaş; paylaşılacak 2–3 güzel örnek seç. Deprem çantası seçenlere afad.gov.tr ile karşılaştırmalarını hatırlat.' },
    { tur: 'soyle', metin: 'Bir dakika kaldı! Bitirenler cevaplarını bir kez daha okusun.' },
  ] },
  { no: 59, baslik: 'Sonuçlarımızı paylaşalım', sure: '91–93', bolum: B5, adimlar: [
    { tur: 'soyle', metin: 'Şimdi sonuçlarımızı paylaşalım. [Seçtiğin kişiye söz ver] Sonucunuzu sesli okur musunuz? Sonra da bize anlatın: İsteminize ne yazdınız, hangi ipuçlarını kullandınız? Sonradan neyi düzelttirdiniz? Cevapta kontrol etmeniz gereken bir bilgi var mıydı?' },
    { tur: 'yap', metin: '2–3 kişiye söz ver. Her paylaşımdan sonra formülün hangi parçasının iyi kullanıldığını söyle ve alkışlat.' },
    { tur: 'soyle', metin: 'Harika iş çıkardınız! Gördüğünüz gibi, bir saat önce Claude’u hiç kullanmamış biri bile artık kullanıma hazır metinler üretebiliyor.' },
  ] },
  { no: 60, baslik: 'Mini sözlük', sure: '93–94', bolum: B5, adimlar: [
    { tur: 'soyle', metin: 'Bugün kullandığımız altı kavramı hızlıca tekrar edelim. **Yapay zeka**: bilgisayarın örneklerden öğrenip tahmin yapması. **Dil modeli**: metinlerden öğrenip bir sonraki kelimeyi tahmin ederek yazan yapay zeka, Claude da böyle bir model. **İstem**: Claude’a yazdığınız mesaj.' },
    { tur: 'soyle', metin: '**Halüsinasyon**: yapay zekanın emin bir dille yanlış bilgi vermesi. **Önyargı**: verideki kalıp yargıların cevaplara yansıması. **Kişisel veri**: birini tanımlayan bilgi, yani TC numarası, telefon, adres, sağlık bilgisi. Bu kelimeleri gelecek haftalarda da kullanacağız.' },
  ] },
  { no: 61, baslik: 'Çıkış quizi', sure: '94–96', bolum: B5, adimlar: [
    { tur: 'soyle', metin: 'Son kontrol, hep birlikte cevaplayalım. Bir: “İyi istemin formülü: Kim için, ne ve ……” İki: “Claude’un cevabı düzgün yazılmışsa her zaman doğrudur.” Doğru mu, yanlış mı? Üç: “Afetzedelerin kimlik bilgilerini Claude’a ……”' },
    { tur: 'yap', metin: 'Her soruda sınıftan cevabı al; boşluğa ve doğru şıkka tıkla.' },
    { tur: 'cevap', metin: 'Nasıl · Yanlış · yazmam.' },
  ] },
  { no: 62, baslik: 'Çıkış quizi, ikinci tur', sure: '96–98', bolum: B5, atlanabilir: true, adimlar: [
    { tur: 'ipucu', metin: 'Zaman darsa bu slaytı geç.' },
    { tur: 'soyle', metin: 'Üç soru daha, bu sefer tekniklerden. Dört: “Sen deneyimli bir afet eğitmenisin demek, Claude’a bir …… vermektir.” Beş: Claude’un bilmediği yerde emin bir dille uydurmasına ne denir? Halüsinasyon mu, önyargı mı, token mı? Altı: “Bilgi eksikse Claude’a: Yazmadan önce bana …… sor derim.”' },
    { tur: 'yap', metin: 'Her soruda cevabı al; boşluğa ve doğru şıkka tıkla.' },
    { tur: 'cevap', metin: 'rol · Halüsinasyon · soru.' },
  ] },
  { no: 63, baslik: 'Bugün öğrendiklerimiz', sure: '98–99', bolum: B5, adimlar: [
    { tur: 'soyle', metin: 'Doksan dakikada on üç uygulama yaptık. Bugünden aklınızda üç şey kalsın.' },
    { tur: 'soyle', metin: 'Bir: Yapay zeka örneklerden öğrenir ve en olası cevabı yazar; bu yüzden bazen yanılır ve bilgisinin bir tarihi vardır. İki: İyi istem **kim için, ne ve nasıl** sorularını cevaplar; rol verin, biçim söyleyin, örnek gösterin, gerekirse önce size sorsun, sonra sohbetle geliştirin. Üç: Cevabı **resmî kaynakla kontrol edin**, önyargıya dikkat edin ve **kişisel veriyi asla yazmayın**.' },
    { tur: 'soyle', metin: 'Bunlar sadece Claude için değil, bütün yapay zeka asistanları için geçerli.' },
  ] },
  { no: 64, baslik: 'Gelecek haftaya kadar', sure: '99–100', bolum: B5, adimlar: [
    { tur: 'soyle', metin: 'Öğrendiğinizi unutmamanın en iyi yolu kullanmak. Gelecek salıya kadar size üç küçük görev bırakıyorum.' },
    { tur: 'soyle', metin: 'Ders için: Zorlandığınız bir konuyu “lise öğrencisine anlatır gibi” açıklatın, sonra “bana beş soru sor” deyin. Kızılay için: Bir etkinlik duyurusu yazdırın, iki kez düzelttirin ve bilgileri kontrol edin. Merak için: Claude’u bir halüsinasyonda yakalayın ve hangi kaynakla doğruladığınızı not alın; yakalayan gelecek hafta bize anlatsın!' },
    { tur: 'soyle', metin: 'Gelecek hafta konumuz **Excel kullanımı**: tablo, formül ve grafiklerle çalışmayı yine bilgisayar başında öğreneceğiz.' },
  ] },
  { no: 65, baslik: 'Teşekkürler!', sure: '100–105', bolum: 'Kapanış', adimlar: [
    { tur: 'soyle', metin: 'Ve geldik sona. Bugün katıldığınız, denediğiniz ve sorduğunuz için hepinize çok teşekkür ederim. Masa asistanı arkadaşlarımıza ve bize bu laboratuvarı açan Teknik Bilimler MYO’ya da ayrıca teşekkürler.' },
    { tur: 'soyle', metin: 'Katılım belgeleriniz Genç Kızılay ÇOMÜ tarafından iletilecek. Sunuma istediğiniz zaman karekoddan yeniden bakabilirsiniz.' },
    { tur: 'soyle', metin: 'Ve çok önemli bir son hatırlatma: Çıkmadan önce **Claude’dan ve Google hesabınızdan çıkış yapın**. Bu bilgisayarları başkaları da kullanıyor.' },
    { tur: 'soyle', metin: 'Sorusu olan varsa şimdi alabilirim. Gelecek hafta görüşmek üzere!' },
    { tur: 'yap', metin: 'Kalan süreyi soru-cevaba ayır. Çıkarken hesaplardan çıkış yapıldığını kontrol et.' },
  ] },
];
