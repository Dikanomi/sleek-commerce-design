import { ShoppingCart, CreditCard, Truck, CheckCircle, Phone, MessageCircle, Search, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBubble from "@/components/ui/chat-bubble";
import { Link } from "react-router-dom";

const PurchaseGuide = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Cari Produk",
      description: "Gunakan fitur pencarian atau jelajahi kategori untuk menemukan produk yang Anda inginkan.",
      tips: [
        "Gunakan filter untuk mempersempit pencarian",
        "Baca deskripsi dan spesifikasi produk dengan teliti",
        "Lihat rating dan ulasan dari pembeli lain"
      ]
    },
    {
      number: 2,
      icon: ShoppingCart,
      title: "Tambah ke Keranjang",
      description: "Pilih varian produk (warna, ukuran, dll) dan tentukan jumlah yang ingin dibeli.",
      tips: [
        "Pastikan varian dan jumlah sudah sesuai",
        "Cek ketersediaan stok",
        "Manfaatkan promo bundle atau diskon"
      ]
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Review Pesanan",
      description: "Periksa kembali produk, alamat pengiriman, dan pilih metode pembayaran.",
      tips: [
        "Pastikan alamat pengiriman sudah benar",
        "Pilih ekspedisi sesuai kebutuhan",
        "Gunakan voucher atau poin jika tersedia"
      ]
    },
    {
      number: 4,
      icon: CreditCard,
      title: "Pembayaran",
      description: "Selesaikan pembayaran menggunakan metode yang Anda pilih.",
      tips: [
        "Pastikan saldo mencukupi",
        "Simpan bukti pembayaran",
        "Pembayaran akan dikonfirmasi otomatis"
      ]
    },
    {
      number: 5,
      icon: Truck,
      title: "Pengiriman",
      description: "Pesanan akan diproses dan dikirim sesuai estimasi yang ditampilkan.",
      tips: [
        "Pantau status pengiriman secara real-time",
        "Pastikan ada yang menerima saat barang tiba",
        "Lakukan konfirmasi penerimaan"
      ]
    }
  ];

  const paymentMethods = [
    {
      category: "Transfer Bank",
      methods: [
        "BCA", "Mandiri", "BRI", "BNI", "CIMB Niaga"
      ],
      icon: "🏦"
    },
    {
      category: "E-Wallet",
      methods: [
        "GoPay", "OVO", "DANA", "LinkAja", "ShopeePay"
      ],
      icon: "📱"
    },
    {
      category: "Kartu Kredit/Debit",
      methods: [
        "Visa", "Mastercard", "JCB", "American Express"
      ],
      icon: "💳"
    },
    {
      category: "Cicilan",
      methods: [
        "Kredivo", "Akulaku", "Home Credit", "Indodana"
      ],
      icon: "📊"
    }
  ];

  const shippingOptions = [
    {
      name: "Reguler",
      duration: "5-7 hari",
      price: "Rp 10.000",
      description: "Pilihan ekonomis untuk pengiriman standar"
    },
    {
      name: "Express",
      duration: "2-3 hari", 
      price: "Rp 25.000",
      description: "Pengiriman lebih cepat dengan tracking detail"
    },
    {
      name: "Same Day",
      duration: "4-8 jam",
      price: "Rp 50.000",
      description: "Pengiriman di hari yang sama untuk area tertentu"
    },
    {
      name: "Instant",
      duration: "1-2 jam",
      price: "Rp 75.000",
      description: "Pengiriman kilat untuk kebutuhan mendesak"
    }
  ];

  const faqs = [
    {
      question: "Bagaimana jika produk tidak sesuai?",
      answer: "Anda dapat mengembalikan produk dalam 7 hari dengan syarat produk masih dalam kondisi baik dan kemasan asli."
    },
    {
      question: "Apakah ada garansi untuk produk elektronik?",
      answer: "Ya, semua produk elektronik memiliki garansi resmi dari distributor atau brand. Masa garansi berbeda-beda sesuai produk."
    },
    {
      question: "Bagaimana cara melacak pesanan?",
      answer: "Anda akan mendapat nomor resi setelah pembayaran dikonfirmasi. Gunakan nomor tersebut di halaman tracking atau aplikasi ekspedisi."
    },
    {
      question: "Bisakah mengubah alamat setelah checkout?",
      answer: "Alamat hanya bisa diubah sebelum pesanan diproses (maksimal 1 jam setelah checkout). Hubungi customer service untuk bantuan."
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
          <span className="text-foreground">Cara Pembelian</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Panduan <span className="text-primary">Pembelian</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ikuti langkah-langkah mudah ini untuk berbelanja di ShopEase dengan aman dan nyaman
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Langkah-Langkah Pembelian</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-6 p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center space-x-2">
                          <step.icon className="h-5 w-5 text-primary" />
                          <span>{step.title}</span>
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <h4 className="font-medium mb-2">Tips:</h4>
                      <ul className="space-y-1">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <Star className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Metode Pembayaran</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((category, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.methods.map((method, methodIndex) => (
                      <Badge key={methodIndex} variant="outline" className="mr-2 mb-2">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shipping Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Pilihan Pengiriman</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingOptions.map((option, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{option.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{option.duration}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold mb-2">{option.price}</div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <Card className="mb-16 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/10">
          <CardHeader>
            <CardTitle className="text-yellow-800 dark:text-yellow-200">Penting untuk Diperhatikan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-yellow-700 dark:text-yellow-300">
            <p>• Pastikan data pribadi dan alamat yang Anda masukkan sudah benar</p>
            <p>• Simpan bukti pembayaran dan nomor pesanan untuk referensi</p>
            <p>• Periksa kondisi barang saat menerima dan laporkan jika ada kerusakan</p>
            <p>• Gunakan akun terdaftar untuk mendapat poin reward dan akses fitur lengkap</p>
            <p>• Hubungi customer service jika mengalami kendala dalam proses pembelian</p>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Pertanyaan Umum</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Butuh Bantuan?</h2>
            <p className="text-lg mb-6 opacity-90">
              Tim customer service kami siap membantu Anda 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/live-chat" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Live Chat</span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Phone className="h-4 w-4 mr-2" />
                <span>021-1234-5678</span>
              </Button>
            </div>
            <Separator className="my-6 bg-primary-foreground/20" />
            <div className="text-sm opacity-75">
              <p>📧 Email: support@shopease.com</p>
              <p>⏰ Jam Operasional: 24/7 (Live Chat) | 08:00-22:00 WIB (Telepon)</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default PurchaseGuide;