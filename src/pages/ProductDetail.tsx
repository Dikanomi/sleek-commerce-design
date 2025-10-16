import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduct, fetchProducts, convertProduct } from "@/services/api";
import { Minus, Plus, Heart, Share2, Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/product-card";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [productData, relatedData] = await Promise.all([
          fetchProduct(id),
          fetchProducts(8)
        ]);

        const convertedProduct = {
          ...convertProduct(productData),
          images: productData.images,
          totalReviews: Math.floor(Math.random() * 2000) + 100,
          seller: `${productData.brand} Official Store`,
          specifications: {
            "Brand": productData.brand,
            "Category": productData.category,
            "Stock": `${productData.stock} unit`,
            "Weight": `${productData.weight || 500}g`,
            "Warranty": productData.warrantyInformation || "1 Year",
            "Shipping": productData.shippingInformation || "Ships in 1-2 days"
          },
          features: [
            productData.warrantyInformation || "Warranty included",
            productData.returnPolicy || "30 Days Return",
            productData.shippingInformation || "Fast Shipping"
          ],
          reviews: productData.reviews || []
        };

        setProduct(convertedProduct);
        
        const convertedRelated = relatedData.products.slice(0, 4).map(convertProduct);
        setRelatedProducts(convertedRelated);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-lg text-muted-foreground">Memuat produk...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-lg text-muted-foreground">Produk tidak ditemukan</p>
          <Button className="mt-4" asChild>
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Beranda</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Badges */}
            <div>
              <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
              <div className="flex items-center space-x-2 mb-4">
                {product.isFlashSale && (
                  <Badge className="bg-accent text-accent-foreground">⚡ Flash Sale</Badge>
                )}
                {product.discount > 0 && (
                  <Badge variant="destructive">-{product.discount}%</Badge>
                )}
                {product.isFreeShipping && (
                  <Badge variant="outline">Gratis Ongkir</Badge>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
                <span className="ml-2 font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">{product.totalReviews} Penilaian</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">{product.sold} Terjual</span>
            </div>

            {/* Price */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{product.brand[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{product.seller}</p>
                    <p className="text-sm text-muted-foreground">{product.location}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Kunjungi Toko</Button>
              </CardContent>
            </Card>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Jumlah</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border border-border rounded-md py-2"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Stok: {product.stock}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Tambah ke Keranjang
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <Button size="lg" variant="secondary" className="w-full">
                Beli Sekarang
              </Button>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Pengiriman</p>
                    <p className="text-sm text-muted-foreground">Gratis ongkir min. belanja Rp 50.000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Garansi</p>
                    <p className="text-sm text-muted-foreground">{product.specifications.Warranty}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Pengembalian</p>
                    <p className="text-sm text-muted-foreground">Bisa dikembalikan dalam 7 hari</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="description">Deskripsi</TabsTrigger>
            <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
            <TabsTrigger value="reviews">Ulasan ({product.totalReviews})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Detail Produk</h3>
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>
                
                <h4 className="font-semibold mb-3">Fitur Utama:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Spesifikasi Teknis</h3>
                <div className="grid gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex border-b border-border pb-3">
                      <span className="w-1/3 font-medium">{key}</span>
                      <span className="w-2/3 text-muted-foreground">{value as string}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Ulasan Pembeli</h3>
                
                {/* Rating Summary */}
                <div className="bg-muted p-6 rounded-lg mb-6">
                  <div className="flex items-center space-x-6">
                    <div>
                      <div className="text-5xl font-bold">{product.rating}</div>
                      <div className="flex items-center mt-2">
                        {renderStars(product.rating)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.totalReviews} Penilaian
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {product.reviews.length > 0 ? (
                    product.reviews.map((review: any, index: number) => (
                      <div key={index} className="border-b border-border pb-6 last:border-0">
                        <div className="flex items-start space-x-3">
                          <Avatar>
                            <AvatarFallback>{review.reviewerName?.[0] || 'U'}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{review.reviewerName || 'Anonymous'}</p>
                            <div className="flex items-center space-x-2 my-1">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString('id-ID')}
                              </span>
                            </div>
                            <p className="text-muted-foreground mt-2">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">Belum ada ulasan</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} {...relProduct} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
