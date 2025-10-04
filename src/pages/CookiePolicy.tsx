import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Kebijakan Cookie</h1>
          <p className="text-muted-foreground mb-8">
            Terakhir diperbarui: Oktober 2024
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Apa itu Cookie?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Cookie adalah file teks kecil yang ditempatkan di perangkat Anda (komputer, smartphone, 
                  atau tablet) ketika Anda mengunjungi situs web. Cookie digunakan secara luas untuk membuat 
                  situs web berfungsi lebih efisien dan memberikan informasi kepada pemilik situs.
                </p>
                <p>
                  ShopEase menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman 
                  belanja Anda, menganalisis penggunaan situs, dan mempersonalisasi konten dan iklan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Jenis Cookie yang Kami Gunakan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">2.1 Cookie Penting (Strictly Necessary)</h3>
                  <p className="text-muted-foreground mb-2">
                    Cookie ini sangat penting untuk mengoperasikan situs web kami. Tanpa cookie ini, 
                    beberapa fitur mungkin tidak berfungsi dengan baik.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    Contoh: Cookie autentikasi, cookie keranjang belanja, cookie keamanan
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.2 Cookie Fungsional</h3>
                  <p className="text-muted-foreground mb-2">
                    Cookie ini memungkinkan situs web mengingat pilihan yang Anda buat (seperti bahasa 
                    atau wilayah) dan memberikan fitur yang lebih personal.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    Contoh: Preferensi bahasa, pengaturan tampilan, riwayat pencarian
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.3 Cookie Kinerja/Analitik</h3>
                  <p className="text-muted-foreground mb-2">
                    Cookie ini mengumpulkan informasi tentang bagaimana pengunjung menggunakan situs web, 
                    seperti halaman mana yang paling sering dikunjungi. Data ini membantu kami meningkatkan 
                    kinerja situs.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    Contoh: Google Analytics, statistik pengunjung, analisis perilaku pengguna
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.4 Cookie Pemasaran/Iklan</h3>
                  <p className="text-muted-foreground mb-2">
                    Cookie ini digunakan untuk melacak pengunjung di berbagai situs web dengan tujuan 
                    menampilkan iklan yang relevan dan menarik. Kami juga dapat membagikan informasi ini 
                    dengan pihak ketiga untuk tujuan iklan.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    Contoh: Cookie retargeting, cookie media sosial, cookie iklan pihak ketiga
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Cookie Pihak Ketiga</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  Selain cookie kami sendiri, kami juga menggunakan cookie pihak ketiga untuk berbagai tujuan:
                </p>
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-foreground">Google Analytics</p>
                    <p className="text-sm">Untuk menganalisis penggunaan situs dan perilaku pengunjung</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Platform Media Sosial</p>
                    <p className="text-sm">Facebook, Instagram, Twitter untuk fitur berbagi dan iklan</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Penyedia Pembayaran</p>
                    <p className="text-sm">Untuk memfasilitasi transaksi pembayaran yang aman</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Platform Iklan</p>
                    <p className="text-sm">Google Ads, Facebook Ads untuk kampanye pemasaran</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Durasi Cookie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">4.1 Cookie Sesi (Session Cookies)</h3>
                  <p className="text-muted-foreground">
                    Cookie sementara yang dihapus ketika Anda menutup browser. Cookie ini digunakan untuk 
                    menyimpan informasi sementara seperti item di keranjang belanja Anda.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4.2 Cookie Persisten (Persistent Cookies)</h3>
                  <p className="text-muted-foreground">
                    Cookie yang tetap ada di perangkat Anda untuk jangka waktu tertentu (biasanya hingga 
                    beberapa tahun). Cookie ini digunakan untuk mengingat preferensi Anda dan meningkatkan 
                    pengalaman pengguna di kunjungan berikutnya.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Cara Kami Menggunakan Cookie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Kami menggunakan cookie untuk berbagai tujuan, termasuk:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Memungkinkan Anda untuk login dan mengakses akun Anda</li>
                  <li>Mengingat item di keranjang belanja Anda</li>
                  <li>Menyimpan preferensi dan pengaturan Anda</li>
                  <li>Menganalisis bagaimana Anda menggunakan situs web kami</li>
                  <li>Meningkatkan kecepatan dan keamanan situs</li>
                  <li>Mempersonalisasi konten dan rekomendasi produk</li>
                  <li>Menampilkan iklan yang relevan</li>
                  <li>Mencegah penipuan dan meningkatkan keamanan</li>
                  <li>Memahami efektivitas kampanye pemasaran kami</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Mengelola Cookie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">6.1 Pengaturan Browser</h3>
                  <p className="text-muted-foreground mb-3">
                    Sebagian besar browser memungkinkan Anda untuk menolak atau menerima cookie. 
                    Anda dapat mengubah pengaturan browser Anda untuk:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Memblokir semua cookie</li>
                    <li>Hanya menerima cookie dari situs yang Anda kunjungi</li>
                    <li>Menghapus cookie saat Anda menutup browser</li>
                    <li>Menerima notifikasi sebelum cookie disimpan</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">6.2 Cara Menghapus Cookie</h3>
                  <p className="text-muted-foreground mb-2">Untuk menghapus cookie yang sudah ada:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Chrome:</strong> Settings → Privacy and security → Clear browsing data</li>
                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                    <li><strong>Edge:</strong> Settings → Privacy, search, and services → Clear browsing data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">6.3 Konsekuensi Menonaktifkan Cookie</h3>
                  <p className="text-muted-foreground">
                    Perlu diingat bahwa menonaktifkan cookie dapat memengaruhi fungsionalitas situs web kami. 
                    Beberapa fitur mungkin tidak bekerja dengan baik atau sama sekali, seperti:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                    <li>Tetap login ke akun Anda</li>
                    <li>Menyimpan item di keranjang belanja</li>
                    <li>Mengingat preferensi Anda</li>
                    <li>Menerima rekomendasi produk yang dipersonalisasi</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Teknologi Pelacakan Lainnya</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">7.1 Web Beacons (Pixel Tags)</h3>
                  <p className="text-muted-foreground">
                    Gambar transparan kecil yang ditempatkan di situs web atau email untuk melacak 
                    interaksi pengguna, seperti apakah email telah dibuka atau halaman tertentu dikunjungi.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">7.2 Local Storage</h3>
                  <p className="text-muted-foreground">
                    Teknologi yang memungkinkan situs web menyimpan data di browser Anda untuk 
                    meningkatkan kinerja dan fungsionalitas.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">7.3 Fingerprinting</h3>
                  <p className="text-muted-foreground">
                    Teknik yang mengidentifikasi perangkat berdasarkan karakteristik unik seperti 
                    pengaturan browser dan sistem operasi.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Persetujuan Cookie</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  Ketika Anda pertama kali mengunjungi situs web kami, Anda akan melihat banner cookie 
                  yang menjelaskan penggunaan cookie kami. Dengan mengklik "Terima" atau melanjutkan 
                  menggunakan situs, Anda menyetujui penggunaan cookie sesuai dengan kebijakan ini.
                </p>
                <p>
                  Anda dapat menarik persetujuan Anda kapan saja dengan mengubah pengaturan cookie di 
                  browser Anda atau menghubungi kami.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Pembaruan Kebijakan Cookie</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu untuk mencerminkan 
                  perubahan dalam teknologi, hukum, atau praktik bisnis kami. Perubahan akan dipublikasikan 
                  di halaman ini dengan tanggal "Terakhir diperbarui" yang direvisi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Informasi Lebih Lanjut</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  Untuk informasi lebih lanjut tentang bagaimana kami menggunakan data pribadi Anda, 
                  silakan lihat <a href="/privacy" className="text-primary hover:underline">Kebijakan Privasi</a> kami.
                </p>
                <p>
                  Untuk informasi umum tentang cookie, Anda dapat mengunjungi:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AllAboutCookies.org</a></li>
                  <li><a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AboutCookies.org</a></li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Hubungi Kami</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  Jika Anda memiliki pertanyaan tentang penggunaan cookie kami, silakan hubungi kami:
                </p>
                <div className="space-y-2">
                  <p>📧 Email: privacy@shopease.com</p>
                  <p>📞 Telepon: +62 21 1234 5678</p>
                  <p>📍 Alamat: Jakarta, Indonesia</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;