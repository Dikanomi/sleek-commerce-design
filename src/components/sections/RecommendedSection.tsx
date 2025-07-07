import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/product-card";
import productHeadphones from "@/assets/product-headphones.jpg";
import productSmartphone from "@/assets/product-smartphone.jpg";
import productLaptop from "@/assets/product-laptop.jpg";

const recommendedProducts = [
  {
    id: "r1",
    image: productLaptop,
    title: "MacBook Air M2 13-inch 8GB 256GB Space Gray",
    price: 18999000,
    originalPrice: 21999000,
    rating: 4.9,
    sold: 234,
    discount: 14,
    isFreeShipping: true,
    location: "Jakarta Pusat"
  },
  {
    id: "r2",
    image: productSmartphone,
    title: "iPhone 15 Pro Max 256GB Natural Titanium",
    price: 24999000,
    rating: 4.8,
    sold: 123,
    isFreeShipping: true,
    location: "Jakarta Selatan"
  },
  {
    id: "r3",
    image: productHeadphones,
    title: "Sony WH-1000XM5 Noise Canceling Headphones",
    price: 4299000,
    originalPrice: 4999000,
    rating: 4.7,
    sold: 567,
    discount: 14,
    isFreeShipping: true,
    location: "Bandung"
  },
  {
    id: "r4",
    image: productLaptop,
    title: "ASUS ROG Zephyrus G14 Ryzen 9 RTX 4060",
    price: 19999000,
    originalPrice: 23999000,
    rating: 4.6,
    sold: 89,
    discount: 17,
    isFreeShipping: true,
    location: "Surabaya"
  },
  {
    id: "r5",
    image: productSmartphone,
    title: "Samsung Galaxy S24 Ultra 512GB Titanium Black",
    price: 21999000,
    rating: 4.8,
    sold: 345,
    isFreeShipping: true,
    location: "Medan"
  },
  {
    id: "r6",
    image: productHeadphones,
    title: "AirPods Pro 2nd Generation with MagSafe Case",
    price: 3599000,
    originalPrice: 3999000,
    rating: 4.9,
    sold: 678,
    discount: 10,
    isFreeShipping: true,
    location: "Jakarta Barat"
  },
  {
    id: "r7",
    image: productLaptop,
    title: "Dell XPS 13 Plus Intel i7 16GB 512GB OLED",
    price: 25999000,
    rating: 4.7,
    sold: 156,
    isFreeShipping: true,
    location: "Yogyakarta"
  },
  {
    id: "r8",
    image: productSmartphone,
    title: "Google Pixel 8 Pro 256GB Obsidian Black",
    price: 15999000,
    originalPrice: 17999000,
    rating: 4.6,
    sold: 234,
    discount: 11,
    isFreeShipping: true,
    location: "Semarang"
  }
];

const RecommendedSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Rekomendasi Untuk Anda
            </h2>
            <p className="text-muted-foreground">
              Produk pilihan berdasarkan preferensi dan riwayat belanja Anda
            </p>
          </div>

          <Button variant="outline" className="hidden md:flex items-center space-x-2">
            <span>Lihat Semua</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="w-full md:w-auto">
            Muat Lebih Banyak Produk
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;