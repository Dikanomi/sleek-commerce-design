import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Kebijakan Privasi</h1>
          <p className="text-muted-foreground mb-8">
            Terakhir diperbarui: Oktober 2024
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Pendahuluan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  ShopEase ("kami", "kita", atau "milik kami") berkomitmen untuk melindungi privasi Anda. 
                  Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, 
                  dan melindungi informasi Anda ketika Anda menggunakan platform e-commerce kami.
                </p>
                <p>
                  Dengan menggunakan layanan kami, Anda menyetujui pengumpulan dan penggunaan informasi 
                  sesuai dengan kebijakan ini.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Informasi yang Kami Kumpulkan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">2.1 Informasi Pribadi</h3>
                  <p className="text-muted-foreground">
                    Kami mengumpulkan informasi yang Anda berikan secara langsung, termasuk:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                    <li>Nama lengkap</li>
                    <li>Alamat email</li>
                    <li>Nomor telepon</li>
                    <li>Alamat pengiriman dan penagihan</li>
                    <li>Informasi pembayaran</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.2 Informasi Otomatis</h3>
                  <p className="text-muted-foreground">
                    Kami secara otomatis mengumpulkan informasi tertentu saat Anda menggunakan layanan kami:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                    <li>Alamat IP</li>
                    <li>Jenis browser dan perangkat</li>
                    <li>Halaman yang dikunjungi</li>
                    <li>Waktu dan tanggal kunjungan</li>
                    <li>Data cookie dan teknologi pelacakan serupa</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.3 Informasi Transaksi</h3>
                  <p className="text-muted-foreground">
                    Kami menyimpan riwayat pembelian, preferensi belanja, dan interaksi dengan layanan pelanggan.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Cara Kami Menggunakan Informasi Anda</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Kami menggunakan informasi yang dikumpulkan untuk:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Memproses dan memenuhi pesanan Anda</li>
                  <li>Menyediakan layanan pelanggan dan dukungan</li>
                  <li>Mengirim konfirmasi pesanan dan pembaruan pengiriman</li>
                  <li>Meningkatkan pengalaman berbelanja Anda</li>
                  <li>Personalisasi konten dan rekomendasi produk</li>
                  <li>Mendeteksi dan mencegah penipuan</li>
                  <li>Mengirim promosi dan penawaran khusus (dengan persetujuan Anda)</li>
                  <li>Mematuhi kewajiban hukum</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Berbagi Informasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Kami dapat membagikan informasi Anda dengan:
                </p>
                <div>
                  <h3 className="font-semibold mb-2">4.1 Penyedia Layanan</h3>
                  <p className="text-muted-foreground">
                    Partner logistik, pemroses pembayaran, dan penyedia layanan cloud yang membantu 
                    kami mengoperasikan platform.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">4.2 Penjual</h3>
                  <p className="text-muted-foreground">
                    Informasi yang diperlukan untuk memproses dan mengirim pesanan Anda.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">4.3 Kewajiban Hukum</h3>
                  <p className="text-muted-foreground">
                    Ketika diwajibkan oleh hukum atau untuk melindungi hak kami.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Keamanan Data</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk 
                  melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.
                </p>
                <p>
                  Namun, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 
                  100% aman. Meskipun kami berusaha menggunakan cara yang dapat diterima secara komersial 
                  untuk melindungi informasi pribadi Anda, kami tidak dapat menjamin keamanan absolutnya.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Hak Anda</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">Anda memiliki hak untuk:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Mengakses informasi pribadi yang kami simpan tentang Anda</li>
                  <li>Meminta koreksi informasi yang tidak akurat</li>
                  <li>Meminta penghapusan informasi pribadi Anda</li>
                  <li>Menolak atau membatasi pemrosesan tertentu</li>
                  <li>Portabilitas data</li>
                  <li>Menarik persetujuan kapan saja</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Untuk menggunakan hak-hak ini, silakan hubungi kami di privacy@shopease.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Cookie dan Teknologi Pelacakan</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman 
                  Anda. Untuk informasi lebih lanjut, silakan lihat <a href="/cookies" className="text-primary hover:underline">Kebijakan Cookie</a> kami.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Privasi Anak-anak</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Layanan kami tidak ditujukan untuk anak-anak di bawah usia 13 tahun. Kami tidak 
                  dengan sengaja mengumpulkan informasi pribadi dari anak-anak di bawah 13 tahun. 
                  Jika Anda mengetahui bahwa anak Anda telah memberikan informasi pribadi kepada kami, 
                  silakan hubungi kami.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Perubahan Kebijakan Privasi</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan 
                  memberi tahu Anda tentang perubahan dengan memposting kebijakan baru di halaman ini 
                  dan memperbarui tanggal "Terakhir diperbarui".
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Hubungi Kami</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:
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

export default PrivacyPolicy;