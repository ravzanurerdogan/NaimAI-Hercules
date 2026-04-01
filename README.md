📝 Proje Vizyonu
NAIM HERCULES, endüstriyel lojistik ve akıllı tarım ekosistemleri için geliştirilmiş, "Sıfır İnsan Müdahalesi" hedefleyen bir master kontrol panelidir. 50 KG'lık bir başlangıç iskeletinden başlayıp, 250 KG+ yük taşıyabilen otonom sistemleri yönetebilecek bir Master V9.0 kapasitesine ulaştırılmıştır.

🚀 Gelişim Süreci, Siklet ve Teknik Aşamalar
1. Aşama: Core Architecture & UI Foundation
Süre: 15 Dakika | Sistem Sikleti: 50 KG

Teknik Detay: Dashboard iskeleti ve canlı veri akışları (Lityum, Nvidia, Pamuk) için temel state yönetimi kuruldu.

📂 Kanıt: Dashboard Giriş Ekranı | Canlı Veri Akış Testi

2. Aşama: Log Engine & Registry System
Süre: 15 Dakika | Sistem Sikleti: 120 KG

Teknik Detay: Otonom sistemin hamlelerini kayıt altına alan Trade Log motoru geliştirildi. Başarılı işlemler ve riskli emir reddi protokolleri test edildi.

📂 Kanıt: Başarılı İşlem Kaydı | Riskli İşlem Reddi Protokolü

3. Aşama: Dynamic UI & High-Performance Animation
Süre: 20 Dakika | Sistem Sikleti: 180 KG

Teknik Detay: React Native Animated API ile verimlilik nabız efekti ve görsel evrim merkezi optimize edildi.

📂 Kanıt: Evrim ve Kontrol Merkezi

4. Aşama: Otonom Hata Analiz Simülasyonu
Süre: 15 Dakika | Sistem Sikleti: 220 KG

Teknik Detay: Sistemin kendi hatalarını tespit etme ve verimlilik düşüşünü kullanıcıya kırmızı alert ile bildirme mekanizması simüle edildi. Kalabalık veri setleri altında sistem stabilitesi ölçüldü.

📂 Kanıt: Hata Tespit ve Alert Mekanizması

5. Aşama: Karpathy Otonom Core (Final Master)
Süre: 25 Dakika | Sistem Sikleti: 250 KG+ (MASTER)

Teknik Detay: Karpathy Döngüsü v9.0 entegrasyonu tamamlandı. Sistem; kendi başına piyasa analizi yapma ve "Self-Healing" (Kendi Kendini Onarma) yeteneklerini kazandı.

🎬 Operasyon Videosu: V9.0 Otonom Çalışma Videosunu İzle

🧩 Teknik İnovasyonlar ve Çözülen Problemler
Performans Optimizasyonu: Yoğun veri akışında UI'ın takılmaması için useRef ve useEffect kancalarıyla bellek yönetimi yapıldı.

Otonom Güvenlik Filtresi: Riskli emirlerin sistem tarafından otomatik olarak reddedilmesi ve güvenli moda geçiş sağlandı.

Dinamik Verimlilik Takibi: Sistem kendi performansını % bazında ölçüp anlık olarak arayüze yansıtmaktadır.

🛠 Kurulum ve Çalıştırma
git clone [SİZİN_REPO_LİNKİNİZ]

npm install

npx expo start
