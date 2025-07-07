import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-white z-10">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Belanja Online
              <br />
              <span className="text-yellow-300">Mudah & Aman</span>
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-blue-100">
              Temukan jutaan produk berkualitas dengan harga terbaik. 
              Gratis ongkir, garansi terpercaya, dan pembayaran aman.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Mulai Belanja
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Lihat Promo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">10M+</div>
                <div className="text-sm text-blue-100">Produk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">5M+</div>
                <div className="text-sm text-blue-100">Pengguna</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">1000+</div>
                <div className="text-sm text-blue-100">Kota</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src={heroBanner}
              alt="Hero Banner"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">70%</div>
                <div className="text-xs text-muted-foreground">Diskon</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
              <div className="text-center">
                <div className="text-sm font-bold text-success">Free</div>
                <div className="text-xs text-muted-foreground">Ongkir</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="w-full h-full bg-gradient-to-l from-white/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;