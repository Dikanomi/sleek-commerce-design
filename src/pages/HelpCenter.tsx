import { Search, Phone, Mail, MessageCircle, HelpCircle, FileText, CreditCard, Package, RotateCcw, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const categories = [
    {
      icon: Package,
      title: "Pemesanan & Pengiriman",
      description: "Cara memesan, tracking pengiriman, dan estimasi waktu",
      link: "/purchase-guide"
    },
    {
      icon: CreditCard,
      title: "Pembayaran",
      description: "Metode pembayaran, konfirmasi, dan masalah transaksi",
      link: "/purchase-guide"
    },
    {
      icon: RotateCcw,
      title: "Pengembalian & Penukaran",
      description: "Kebijakan retur, cara pengembalian, dan penukaran produk",
      link: "/returns"
    },
    {
      icon: ShieldCheck,
      title: "Garansi",
      description: "Informasi garansi produk dan klaim garansi",
      link: "/warranty"
    },
    {
      icon: HelpCircle,
      title: "Akun & Keamanan",
      description: "Kelola akun, kata sandi, dan keamanan data",
      link: "/help"
    },
    {
      icon: FileText,
      title: "Kebijakan & Ketentuan",
      description: "Syarat & ketentuan, privasi, dan kebijakan toko",
      link: "/terms"
    }
  ];

  const popularTopics = [
    "Bagaimana cara melacak pesanan saya?",
    "Berapa lama waktu pengiriman?",
    "Bagaimana cara mengembalikan produk?",
    "Metode pembayaran apa saja yang tersedia?",
    "Bagaimana cara menggunakan voucher?",
    "Apakah ada biaya pengiriman?",
    "Bagaimana cara menghubungi penjual?",
    "Bagaimana jika produk rusak saat diterima?"
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Respon cepat dari tim kami",
      availability: "24/7",
      action: "Mulai Chat",
      link: "/live-chat"
    },
    {
      icon: Phone,
      title: "Telepon",
      description: "021-1234-5678",
      availability: "08:00 - 22:00 WIB",
      action: "Hubungi Sekarang",
      link: "tel:02112345678"
    },
    {
      icon: Mail,
      title: "Email",
      description: "support@shopease.com",
      availability: "Balasan dalam 24 jam",
      action: "Kirim Email",
      link: "mailto:support@shopease.com"
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
          <span className="text-foreground">Pusat Bantuan</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pusat <span className="text-primary">Bantuan</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Temukan jawaban untuk pertanyaan Anda atau hubungi tim support kami
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Cari bantuan, contoh: cara tracking pesanan..." 
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Kategori Bantuan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link to={category.link} key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <category.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Topik Populer</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {popularTopics.map((topic, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  >
                    <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Hubungi Kami</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <method.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-2">{method.description}</p>
                  <p className="text-sm text-muted-foreground mb-4">{method.availability}</p>
                  <Button asChild className="w-full">
                    <Link to={method.link}>{method.action}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Preview */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Masih Butuh Bantuan?</h2>
            <p className="text-lg mb-6 opacity-90">
              Tim customer service kami siap membantu Anda 24/7
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
                <Link to="/about">Tentang ShopEase</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
