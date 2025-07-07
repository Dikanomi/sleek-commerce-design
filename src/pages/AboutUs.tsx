import { Users, Award, Shield, Truck, Heart, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBubble from "@/components/ui/chat-bubble";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const stats = [
    { label: "Tahun Berdiri", value: "2020", icon: Award },
    { label: "Pelanggan Aktif", value: "50K+", icon: Users },
    { label: "Produk Tersedia", value: "10K+", icon: Star },
    { label: "Kota Jangkauan", value: "100+", icon: Truck }
  ];

  const values = [
    {
      icon: Shield,
      title: "Kepercayaan",
      description: "Kami mengutamakan kepercayaan pelanggan dengan memberikan produk berkualitas dan layanan terbaik."
    },
    {
      icon: Heart,
      title: "Kepuasan Pelanggan",
      description: "Kepuasan pelanggan adalah prioritas utama kami dalam setiap transaksi dan interaksi."
    },
    {
      icon: Award,
      title: "Kualitas Terjamin",
      description: "Semua produk telah melalui seleksi ketat untuk memastikan kualitas terbaik bagi pelanggan."
    },
    {
      icon: Truck,
      title: "Pengiriman Cepat",
      description: "Jaringan logistik yang luas memungkinkan pengiriman cepat ke seluruh Indonesia."
    }
  ];

  const team = [
    {
      name: "Ahmad Rizki",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Visioner di balik ShopEase dengan pengalaman 10+ tahun di industri e-commerce."
    },
    {
      name: "Siti Nurhaliza",
      position: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Ahli teknologi yang memimpin inovasi platform dan pengalaman digital."
    },
    {
      name: "Budi Santoso",
      position: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Mengawasi operasional harian dan memastikan efisiensi dalam setiap proses."
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
          <span className="text-foreground">Tentang Kami</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tentang <span className="text-primary">ShopEase</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ShopEase adalah platform e-commerce terdepan di Indonesia yang menghubungkan jutaan pelanggan 
            dengan berbagai produk berkualitas dari brand ternama dan penjual terpercaya.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Cerita Kami</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                ShopEase didirikan pada tahun 2020 dengan visi sederhana namun kuat: 
                membuat belanja online menjadi mudah, aman, dan menyenangkan bagi semua orang.
              </p>
              <p>
                Berawal dari sebuah ide untuk mengatasi kesulitan berbelanja online yang rumit, 
                kami mengembangkan platform yang mengutamakan kemudahan pengguna dan kepercayaan.
              </p>
              <p>
                Hari ini, ShopEase telah melayani lebih dari 50.000 pelanggan aktif dengan 
                lebih dari 10.000 produk dari berbagai kategori, mulai dari elektronik hingga fashion.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
              alt="ShopEase Office"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg">
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-sm">Rating Pelanggan</div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Visi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi platform e-commerce pilihan utama di Indonesia yang menghadirkan 
                pengalaman berbelanja online terdepan dengan teknologi inovatif dan 
                layanan yang mengutamakan kepuasan pelanggan.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Misi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Menyediakan platform belanja online yang mudah dan aman</li>
                <li>• Menghubungkan pelanggan dengan produk berkualitas</li>
                <li>• Memberikan layanan pelanggan terbaik</li>
                <li>• Mendukung pertumbuhan UMKM Indonesia</li>
                <li>• Inovasi berkelanjutan dalam teknologi e-commerce</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Tim Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.position}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">
              Bergabung dengan Jutaan Pelanggan Kami
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Rasakan pengalaman berbelanja online yang mudah, aman, dan menyenangkan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/products">Mulai Belanja</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/live-chat">Hubungi Kami</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default AboutUs;