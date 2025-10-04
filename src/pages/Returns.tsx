import { RotateCcw, PackageCheck, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const Returns = () => {
  const returnSteps = [
    {
      number: 1,
      title: "Ajukan Pengembalian",
      description: "Login ke akun Anda, pilih pesanan yang ingin dikembalikan, dan klik 'Ajukan Pengembalian'",
      icon: RotateCcw
    },
    {
      number: 2,
      title: "Pilih Alasan",
      description: "Pilih alasan pengembalian dan upload foto produk jika diminta",
      icon: AlertCircle
    },
    {
      number: 3,
      title: "Tunggu Persetujuan",
      description: "Tim kami akan meninjau pengajuan Anda dalam 1x24 jam",
      icon: Clock
    },
    {
      number: 4,
      title: "Kirim Produk",
      description: "Setelah disetujui, kirim produk menggunakan label pengiriman yang disediakan",
      icon: PackageCheck
    },
    {
      number: 5,
      title: "Dana Dikembalikan",
      description: "Dana akan dikembalikan setelah produk diterima dan diverifikasi (3-7 hari kerja)",
      icon: CheckCircle
    }
  ];

  const eligibleProducts = [
    {
      icon: CheckCircle,
      title: "Produk Dapat Dikembalikan",
      items: [
        "Produk rusak atau cacat",
        "Produk tidak sesuai deskripsi",
        "Produk salah kirim",
        "Produk tidak lengkap",
        "Dalam masa pengembalian (7 hari)"
      ]
    },
    {
      icon: XCircle,
      title: "Produk Tidak Dapat Dikembalikan",
      items: [
        "Produk sudah digunakan atau tidak lengkap",
        "Kemasan rusak atau hilang",
        "Melewati masa pengembalian",
        "Produk custom/pesanan khusus",
        "Produk kategori kesehatan & personal care"
      ]
    }
  ];

  const returnReasons = [
    "Produk rusak/cacat produksi",
    "Tidak sesuai deskripsi",
    "Salah ukuran/warna/varian",
    "Berubah pikiran",
    "Menemukan harga lebih murah",
    "Terlambat diterima"
  ];

  const refundMethods = [
    {
      method: "Saldo ShopEase",
      duration: "Instant",
      description: "Dana langsung masuk ke saldo akun"
    },
    {
      method: "Transfer Bank",
      duration: "3-5 hari kerja",
      description: "Dana dikembalikan ke rekening bank"
    },
    {
      method: "E-Wallet",
      duration: "1-3 hari kerja",
      description: "Dana dikembalikan ke e-wallet"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Beranda</Link>
          <span>/</span>
          <span className="text-foreground">Pengembalian</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kebijakan <span className="text-primary">Pengembalian</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami menerima pengembalian produk dalam 7 hari dengan syarat dan ketentuan yang berlaku
          </p>
        </div>

        {/* Important Info */}
        <Card className="mb-12 border-primary">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Syarat Pengembalian</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Produk dalam kondisi baik, tidak rusak, dan kemasan asli masih utuh</li>
                  <li>• Semua label, tag, dan aksesoris masih terpasang lengkap</li>
                  <li>• Disertai dengan bukti pembelian (invoice)</li>
                  <li>• Masa pengembalian maksimal 7 hari sejak barang diterima</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Cara Mengajukan Pengembalian</h2>
          <div className="space-y-6">
            {returnSteps.map((step, index) => (
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

        {/* Eligible Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Produk yang Dapat Dikembalikan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {eligibleProducts.map((category, index) => (
              <Card key={index} className={index === 0 ? "border-green-200" : "border-red-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <category.icon className={`h-6 w-6 ${index === 0 ? 'text-green-600' : 'text-red-600'}`} />
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <span className="mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Return Reasons */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Alasan Pengembalian</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {returnReasons.map((reason, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
                    <RotateCcw className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{reason}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Refund Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Metode Pengembalian Dana</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {refundMethods.map((method, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{method.method}</CardTitle>
                  <Badge variant="secondary">{method.duration}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <Card className="mb-16 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/10">
          <CardHeader>
            <CardTitle className="text-yellow-800 dark:text-yellow-200">Catatan Penting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-yellow-700 dark:text-yellow-300">
            <p>• Ongkos kirim pengembalian ditanggung oleh pembeli, kecuali produk rusak/salah kirim</p>
            <p>• Proses verifikasi produk memakan waktu 2-3 hari kerja setelah diterima</p>
            <p>• Dana akan dikembalikan sesuai metode pembayaran yang dipilih</p>
            <p>• Untuk produk elektronik, garansi dari penjual tetap berlaku</p>
            <p>• Hubungi customer service jika ada kendala dalam proses pengembalian</p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Butuh Bantuan dengan Pengembalian?</h2>
            <p className="text-lg mb-6 opacity-90">
              Tim customer service kami siap membantu proses pengembalian Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/live-chat">Chat dengan Kami</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/help">Pusat Bantuan</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Returns;
