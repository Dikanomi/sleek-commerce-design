import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/product-card";
import { fetchProducts, convertProduct } from "@/services/api";

const FlashSaleSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(8);
        const flashSaleProducts = data.products
          .filter(p => p.discountPercentage > 10)
          .slice(0, 4)
          .map(convertProduct);
        setProducts(flashSaleProducts);
      } catch (error) {
        console.error('Error loading flash sale products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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
          {loading ? (
            <div className="col-span-4 text-center py-8">
              <p className="text-muted-foreground">Memuat produk...</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
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