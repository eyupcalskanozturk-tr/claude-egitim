/**
 * Claude ile Tanışma — kayıt formu oluşturucu (Google Apps Script)
 *
 * Kullanım: script.google.com → Yeni proje → bu kodu yapıştır → kayitFormunuOlustur'u çalıştır.
 * Çalışınca: Google Form + yanıtların düştüğü Google E-Tablo oluşturur, bağlantıları günlüğe yazar.
 */
function kayitFormunuOlustur() {
  var form = FormApp.create('Claude ile Tanışma | Kayıt Formu');
  form.setTitle('Claude ile Tanışma | Yapay Zeka Eğitimleri, 1. Hafta');
  form.setDescription(
    'Genç Kızılay ÇOMÜ Eğitim Birimi, Teknik Bilimler MYO iş birliğiyle\n\n' +
    '📅 1 Aralık 2026, Salı  ·  🕐 15.30  ·  📍 Teknik Bilimler MYO, Lab3\n' +
    '👥 Kontenjan: 35 kişi  ·  🎓 Katılım belgesi verilecek\n\n' +
    'Bu eğitim yalnızca Çanakkale Onsekiz Mart Üniversitesi öğrencilerine açıktır; ' +
    'lab bilgisayarlarına UBYS bilgilerinle giriş yapılmaktadır.\n\n' +
    'Gelmeden önce:\n' +
    '1) claude.ai adresinden ücretsiz hesabını aç.\n' +
    '2) UBYS şifreni hatırladığından emin ol.\n\n' +
    'Kişisel verilerin yalnızca bu eğitimin kaydı, hatırlatma mesajı ve katılım belgesi için kullanılacak; ' +
    'üçüncü kişilerle paylaşılmayacaktır.'
  );
  form.setConfirmationMessage(
    'Kaydın alındı, teşekkürler! 🎉\n\n' +
    'Eğitimden bir gün önce hatırlatma mesajı göndereceğiz. ' +
    'Gelmeden önce claude.ai hesabını açmayı ve UBYS şifreni hatırlamayı unutma.\n\n' +
    'Genç Kızılay ÇOMÜ Eğitim Birimi'
  );
  form.setProgressBar(true);
  form.setAllowResponseEdits(false);

  // ---------- 1. Bölüm: Kimlik ve öğrenci bilgileri ----------
  form.addSectionHeaderItem()
    .setTitle('Öğrenci bilgileri')
    .setHelpText('Katılım belgen bu bilgilere göre hazırlanacak.');

  form.addTextItem()
    .setTitle('Ad Soyad')
    .setHelpText('Katılım belgesinde yazmasını istediğin şekilde, Türkçe karakterlerle yaz.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('ÇOMÜ öğrenci numarası')
    .setHelpText('Sadece rakam (öğrenci kartında ve UBYS\'de yazan numara).')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('^[0-9]{8,12}$')
      .setHelpText('Öğrenci numarası 8–12 haneli, sadece rakamlardan oluşmalı.')
      .build());

  form.addTextItem()
    .setTitle('Fakülte / Yüksekokul / MYO')
    .setHelpText('Örnek: Teknik Bilimler MYO, Mühendislik Fakültesi')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Bölüm / Program')
    .setHelpText('Örnek: Bilgisayar Programcılığı')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Sınıf')
    .setChoiceValues(['Hazırlık', '1. sınıf', '2. sınıf', '3. sınıf', '4. sınıf', 'Yüksek lisans / Doktora'])
    .setRequired(true);

  // ---------- 2. Bölüm: İletişim ----------
  form.addSectionHeaderItem()
    .setTitle('İletişim')
    .setHelpText('Sadece hatırlatma mesajı ve katılım belgesi için kullanılacak.');

  form.addTextItem()
    .setTitle('E-posta adresi')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextIsEmail()
      .setHelpText('Geçerli bir e-posta adresi yaz.')
      .build());

  form.addTextItem()
    .setTitle('Cep telefonu')
    .setHelpText('05XX XXX XX XX biçiminde, boşluksuz da yazabilirsin. Hatırlatma mesajı için.')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('^0?\\s*5[0-9]{2}\\s*[0-9]{3}\\s*[0-9]{2}\\s*[0-9]{2}$')
      .setHelpText('Telefon numarası 05XX XXX XX XX biçiminde olmalı.')
      .build());

  // ---------- 3. Bölüm: Seni tanıyalım ----------
  form.addPageBreakItem()
    .setTitle('Seni tanıyalım')
    .setHelpText('Bu sorular eğitimi sana göre hazırlamamıza yardım eder. Doğru ya da yanlış cevap yok.');

  form.addMultipleChoiceItem()
    .setTitle('Genç Kızılay gönüllüsü müsün?')
    .setChoiceValues(['Evet', 'Hayır', 'Hayır, ama gönüllü olmak istiyorum'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Bilgisayar kullanımında kendini nasıl görüyorsun?')
    .setChoiceValues(['Yeni başlıyorum', 'Temel işleri yapabiliyorum', 'Rahat kullanıyorum'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Daha önce yapay zeka (Claude, ChatGPT, Gemini vb.) kullandın mı?')
    .setChoiceValues(['Hiç kullanmadım', 'Birkaç kez denedim', 'Sık sık kullanıyorum'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('claude.ai hesabını açtın mı?')
    .setHelpText('Hesap ücretsiz. claude.ai adresinden Google hesabınla birkaç dakikada açabilirsin.')
    .setChoiceValues(['Evet, açtım', 'Henüz değil, derse kadar açacağım'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Bu eğitimden ya da serinin 3. ve 4. haftasından beklentin, konu önerin var mı?')
    .setRequired(false);

  // ---------- 4. Bölüm: Onaylar ----------
  form.addPageBreakItem()
    .setTitle('Son adım: onaylar');

  form.addCheckboxItem()
    .setTitle('Katılım koşulu')
    .setChoiceValues(['ÇOMÜ öğrencisiyim ve lab bilgisayarına UBYS bilgilerimle giriş yapabileceğim.'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Kişisel verilerin kullanımı')
    .setChoiceValues(['Kişisel verilerimin yalnızca bu eğitimin kaydı, hatırlatma mesajı ve katılım belgesi için kullanılmasını kabul ediyorum.'])
    .setRequired(true);

  // ---------- Yanıt tablosu ----------
  var tablo = SpreadsheetApp.create('Claude ile Tanışma | Kayıtlar');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, tablo.getId());

  var kisa = form.shortenFormUrl(form.getPublishedUrl());
  Logger.log('FORM_DOLDURMA: ' + kisa);
  Logger.log('FORM_DUZENLEME: ' + form.getEditUrl());
  Logger.log('YANIT_TABLOSU: ' + tablo.getUrl());
}
