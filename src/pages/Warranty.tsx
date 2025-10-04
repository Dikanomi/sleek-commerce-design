import { Shield, FileText, Clock, CheckCircle, Package, AlertTriangle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const Warranty = () => {
  const warrantyTypes = [
    {
      icon: Shield,
      title: "Garansi Distributor/Brand",
      duration: "Bervariasi per produk",
      description: "Garansi resmi dari distributor atau brand produk",
      coverage: [
        "Kerusakan pabrik",
        "Cacat material",
        "Malfungsi komponen",
        "Servis gratis"
      ],
      color: "border-blue-200"
    },
    {
      icon: Package,
      title: "Garansi Toko",
      duration: "7-14 hari",
      description: "Garansi dari ShopEase untuk produk tertentu",
      coverage: [
        "Produk tidak sesuai",
        "DOA (Dead on Arrival)",
        "Tukar unit baru",
        "Refund 100%"
      ],
      color: "border-green-200"
    }
  ];

  const claimSteps = [
    {
      number: 1,
      title: "Persiapkan Dokumen",
      description: "Siapkan kartu garansi, invoice/bukti pembelian, dan foto produk yang bermasalah",
      icon: FileText
    },
    {
      number: 2,
      title: "Hubungi Customer Service",
      description: "Hubungi customer service untuk verifikasi dan panduan lebih lanjut",
      icon: Phone
    },
    {
      number: 3,
      title: "Kirim Produk",
      description: "Kirim produk ke service center yang ditunjuk dengan kemasan aman",
      icon: Package
    },
    {
      number: 4,
      title: "Proses Perbaikan",
      description: "Tunggu proses perbaikan atau penggantian sesuai ketentuan garansi",
      icon: Clock
    },
    {
      number: 5,
      title: "Terima Produk",
      description: "Produk yang sudah diperbaiki atau unit baru akan dikirim kembali",
      icon: CheckCircle
    }
  ];

  const warrantyPeriods = [
    { category: "Elektronik Besar", period: "1-3 tahun", examples: "TV, Kulkas, AC, Mesin Cuci" },
    { category: "Gadget & HP", period: "1-2 tahun", examples: "Smartphone, Tablet, Laptop" },
    { category: "Aksesoris Elektronik", period: "6-12 bulan", examples: "Headphone, Powerbank, Charger" },
    { category: "Fashion & Jam Tangan", period: "6-12 bulan", examples: "Jam tangan branded" },
    { category: "Peralatan Rumah", period: "6-12 bulan", examples: "Blender, Rice Cooker, Setrika" }
  ];

  const notCovered = [
    "Kerusakan akibat kelalaian pengguna",
    "Jatuh, terkena air, atau benturan keras",
    "Modifikasi atau perbaikan tidak resmi",
    "Pemakaian tidak sesuai manual",
    "Kerusakan akibat force majeure",
    "Komponen habis pakai (baterai, dll)",
    "Goresan, lecet, atau kerusakan kosmetik",
    "Kehilangan atau pencurian"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Beranda</Link>
          <span>/</span>
          <span className="text-foreground">Garansi</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kebijakan <span className="text-primary">Garansi</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Belanja dengan tenang, produk Anda dilindungi garansi resmi
          </p>
        </div>

        {/* Warranty Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Jenis Garansi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {warrantyTypes.map((type, index) => (
              <Card key={index} className={type.color}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <type.icon className="h-6 w-6 text-primary" />
                      <span>{type.title}</span>
                    </CardTitle>
                    <Badge variant="secondary">{type.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{type.description}</p>
                  <div className="space-y-2">
                    <p className="font-medium text-sm">Cakupan:</p>
                    <ul className="space-y-1">
                      {type.coverage.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Warranty Periods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Masa Garansi Berdasarkan Kategori</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {warrantyPeriods.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.category}</h3>
                      <p className="text-sm text-muted-foreground">{item.examples}</p>
                    </div>
                    <Badge variant="outline" className="ml-4">{item.period}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Claim Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Cara Klaim Garansi</h2>
          <div className="space-y-6">
            {claimSteps.map((step, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <step.icon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Not Covered */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Tidak Termasuk dalam Garansi</h2>
          <Card className="border-red-200">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {notCovered.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/10">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-700 dark:text-red-300">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Info */}
        <Card className="mb-16 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/10">
          <CardHeader>
            <CardTitle className="text-yellow-800 dark:text-yellow-200">Penting untuk Diperhatikan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-yellow-700 dark:text-yellow-300">
            <p>• Simpan kartu garansi dan bukti pembelian dengan baik</p>
            <p>• Jangan membuka segel garansi sebelum berkonsultasi dengan service center</p>
            <p>• Waktu proses klaim garansi bervariasi tergantung jenis kerusakan (7-30 hari)</p>
            <p>• Untuk garansi internasional, hubungi service center resmi di Indonesia</p>
            <p>• Biaya kirim ke service center ditanggung oleh pelanggan</p>
            <p>• Pastikan produk dikemas dengan aman saat mengirim untuk klaim</p>
          </CardContent>
        </Card>

        {/* Service Centers */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Service Center Resmi</h2>
          <Card>
            <CardContent className="pt-6 text-center">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Cari Service Center Terdekat</h3>
              <p className="text-muted-foreground mb-6">
                Hubungi customer service kami untuk informasi lokasi service center resmi terdekat dari Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/live-chat">Chat dengan Kami</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:02112345678">Telepon: 021-1234-5678</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ada Pertanyaan tentang Garansi?</h2>
            <p className="text-lg mb-6 opacity-90">
              Tim customer service kami siap membantu Anda dengan informasi garansi produk
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/help">Pusat Bantuan</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/returns">Kebijakan Pengembalian</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Warranty;
