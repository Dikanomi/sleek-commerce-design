import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/product-card";
import { fetchProducts, convertProduct } from "@/services/api";

const RecommendedSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(8);
        const recommendedProducts = data.products.map(convertProduct);
        setProducts(recommendedProducts);
      } catch (error) {
        console.error('Error loading recommended products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
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