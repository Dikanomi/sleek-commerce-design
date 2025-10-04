import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Syarat & Ketentuan</h1>
          <p className="text-muted-foreground mb-8">
            Terakhir diperbarui: Oktober 2024
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Penerimaan Syarat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Selamat datang di ShopEase. Dengan mengakses dan menggunakan platform ini, Anda 
                  menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak setuju 
                  dengan syarat ini, harap jangan menggunakan layanan kami.
                </p>
                <p>
                  Kami berhak untuk memodifikasi syarat ini kapan saja. Perubahan akan berlaku efektif 
                  setelah dipublikasikan di platform. Penggunaan berkelanjutan Anda atas layanan kami 
                  setelah perubahan tersebut menunjukkan penerimaan Anda terhadap syarat yang direvisi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Akun Pengguna</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">2.1 Pendaftaran</h3>
                  <p className="text-muted-foreground">
                    Untuk menggunakan fitur tertentu, Anda harus membuat akun. Anda setuju untuk 
                    memberikan informasi yang akurat, terkini, dan lengkap selama proses pendaftaran 
                    dan memperbarui informasi tersebut untuk menjaga keakuratannya.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.2 Keamanan Akun</h3>
                  <p className="text-muted-foreground mb-2">
                    Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda. 
                    Anda bertanggung jawab penuh atas semua aktivitas yang terjadi di bawah akun Anda.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Segera beri tahu kami jika terjadi penggunaan tidak sah</li>
                    <li>Jangan berbagi kredensial akun Anda dengan orang lain</li>
                    <li>Gunakan kata sandi yang kuat dan unik</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.3 Kelayakan</h3>
                  <p className="text-muted-foreground">
                    Anda harus berusia minimal 18 tahun atau telah mencapai usia dewasa di yurisdiksi 
                    Anda untuk menggunakan layanan ini.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Pembelian dan Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">3.1 Pesanan</h3>
                  <p className="text-muted-foreground">
                    Semua pesanan tunduk pada ketersediaan produk. Kami berhak menolak atau membatalkan 
                    pesanan apa pun karena alasan apa pun, termasuk keterbatasan stok, kesalahan harga, 
                    atau masalah dengan pesanan.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3.2 Harga</h3>
                  <p className="text-muted-foreground mb-2">
                    Semua harga tercantum dalam Rupiah (IDR) dan sudah termasuk pajak kecuali 
                    dinyatakan lain. Kami berhak untuk:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Mengubah harga kapan saja tanpa pemberitahuan sebelumnya</li>
                    <li>Memperbaiki kesalahan harga bahkan setelah pesanan dilakukan</li>
                    <li>Menawarkan promosi dan diskon dengan syarat tertentu</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3.3 Pembayaran</h3>
                  <p className="text-muted-foreground">
                    Pembayaran harus dilakukan melalui metode yang tersedia di platform kami. 
                    Dengan memberikan informasi pembayaran, Anda menjamin bahwa Anda berwenang 
                    untuk menggunakan metode pembayaran tersebut.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Pengiriman</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Kami berusaha untuk memproses dan mengirim pesanan sesegera mungkin. Namun, 
                  waktu pengiriman yang disebutkan adalah estimasi dan bukan jaminan.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Biaya pengiriman ditentukan berdasarkan lokasi dan berat paket</li>
                  <li>Risiko kehilangan atau kerusakan barang berpindah kepada Anda saat pengiriman</li>
                  <li>Anda harus memberikan alamat pengiriman yang akurat dan lengkap</li>
                  <li>Kami tidak bertanggung jawab atas keterlambatan yang disebabkan oleh kurir pihak ketiga</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Pengembalian dan Penukaran</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-3">
                  Kebijakan pengembalian dan penukaran kami memungkinkan Anda untuk mengembalikan 
                  produk dalam kondisi tertentu. Silakan lihat halaman <a href="/returns" className="text-primary hover:underline">Pengembalian</a> kami 
                  untuk informasi lengkap.
                </p>
                <p>
                  Secara umum, pengembalian harus dilakukan dalam waktu 7 hari sejak penerimaan 
                  dengan kondisi produk yang tidak terpakai dan dalam kemasan asli.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Konten Pengguna</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">6.1 Ulasan dan Rating</h3>
                  <p className="text-muted-foreground">
                    Anda dapat mengirimkan ulasan, komentar, dan konten lainnya. Dengan melakukannya, 
                    Anda memberikan kami hak non-eksklusif, bebas royalti, perpetual untuk menggunakan, 
                    mereproduksi, dan menampilkan konten tersebut.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">6.2 Larangan</h3>
                  <p className="text-muted-foreground mb-2">Anda tidak boleh mengirimkan konten yang:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Melanggar hukum atau hak pihak ketiga</li>
                    <li>Mengandung materi yang menyinggung atau tidak pantas</li>
                    <li>Palsu, menyesatkan, atau tidak akurat</li>
                    <li>Mengandung virus atau kode berbahaya</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Hak Kekayaan Intelektual</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  Semua konten di platform ini, termasuk teks, grafik, logo, gambar, dan perangkat lunak, 
                  adalah milik ShopEase atau pemberi lisensinya dan dilindungi oleh undang-undang hak cipta 
                  dan merek dagang.
                </p>
                <p>
                  Anda tidak boleh mereproduksi, mendistribusikan, memodifikasi, atau menggunakan konten 
                  kami tanpa izin tertulis sebelumnya.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Batasan Tanggung Jawab</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>
                  Sejauh diizinkan oleh hukum, ShopEase tidak bertanggung jawab atas kerugian langsung, 
                  tidak langsung, insidental, khusus, konsekuensial, atau teladan yang timbul dari 
                  penggunaan atau ketidakmampuan menggunakan layanan kami.
                </p>
                <p>
                  Kami tidak menjamin bahwa layanan akan tidak terputus, aman, atau bebas dari kesalahan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Ganti Rugi</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Anda setuju untuk mengganti rugi dan membebaskan ShopEase dari setiap klaim, kerugian, 
                  kewajiban, dan biaya (termasuk biaya hukum) yang timbul dari pelanggaran Anda terhadap 
                  Syarat dan Ketentuan ini atau penggunaan layanan kami.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Hukum yang Berlaku</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. 
                  Setiap sengketa yang timbul akan diselesaikan di pengadilan yang berwenang di Jakarta.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Penghentian</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Kami dapat menangguhkan atau menghentikan akun Anda dan akses ke layanan kami kapan saja, 
                  tanpa pemberitahuan sebelumnya atau tanggung jawab, karena alasan apa pun, termasuk 
                  pelanggaran Syarat dan Ketentuan ini.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Hubungi Kami</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami:
                </p>
                <div className="space-y-2">
                  <p>📧 Email: legal@shopease.com</p>
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

export default TermsConditions;