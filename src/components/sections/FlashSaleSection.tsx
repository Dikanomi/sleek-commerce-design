import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/product-card";
import productHeadphones from "@/assets/product-headphones.jpg";
import productSmartphone from "@/assets/product-smartphone.jpg";
import productLaptop from "@/assets/product-laptop.jpg";

const flashSaleProducts = [
  {
    id: "fs1",
    image: productHeadphones,
    title: "Headphone Wireless Premium Bluetooth 5.0 Noise Cancelling",
    price: 299000,
    originalPrice: 999000,
    rating: 4.8,
    sold: 1234,
    discount: 70,
    isFlashSale: true,
    isFreeShipping: true,
    location: "Jakarta Pusat"
  },
  {
    id: "fs2",
    image: productSmartphone,
    title: "Smartphone Android RAM 8GB Storage 256GB Camera 108MP",
    price: 2499000,
    originalPrice: 4999000,
    rating: 4.7,
    sold: 856,
    discount: 50,
    isFlashSale: true,
    isFreeShipping: true,
    location: "Bandung"
  },
  {
    id: "fs3",
    image: productLaptop,
    title: "Laptop Gaming Intel i7 RAM 16GB SSD 512GB RTX 3060",
    price: 12999000,
    originalPrice: 18999000,
    rating: 4.9,
    sold: 432,
    discount: 32,
    isFlashSale: true,
    isFreeShipping: true,
    location: "Surabaya"
  },
  {
    id: "fs4",
    image: productHeadphones,
    title: "TWS Earbuds Pro Max Wireless Charging Case",
    price: 199000,
    originalPrice: 599000,
    rating: 4.6,
    sold: 2341,
    discount: 67,
    isFlashSale: true,
    isFreeShipping: true,
    location: "Jakarta Selatan"
  }
];

const FlashSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-accent/5 to-destructive/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <h2 className="text-3xl font-bold text-foreground">Flash Sale</h2>
            </div>
            
            {/* Countdown Timer */}
            <div className="flex items-center space-x-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Berakhir dalam:</span>
              <div className="flex space-x-1">
                <div className="bg-white/20 px-2 py-1 rounded text-sm font-bold">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <span>:</span>
                <div className="bg-white/20 px-2 py-1 rounded text-sm font-bold">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <span>:</span>
                <div className="bg-white/20 px-2 py-1 rounded text-sm font-bold">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" className="hidden md:flex items-center space-x-2">
            <span>Lihat Semua</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden text-center">
          <Button variant="outline" className="w-full">
            Lihat Semua Flash Sale
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;