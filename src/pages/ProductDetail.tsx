import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import productHeadphones from "@/assets/product-headphones.jpg";
import productSmartphone from "@/assets/product-smartphone.jpg";
import productLaptop from "@/assets/product-laptop.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app this would come from API
  const product = {
    id: "fs2",
    title: "Smartphone Android RAM 8GB Storage 256GB Camera 108MP",
    images: [productSmartphone, productHeadphones, productLaptop],
    price: 2499000,
    originalPrice: 4999000,
    discount: 50,
    rating: 4.7,
    totalReviews: 1234,
    sold: 856,
    location: "Bandung",
    seller: "ElektronikStore Official",
    description: "Smartphone flagship dengan performa tinggi, kamera profesional 108MP, dan baterai tahan lama. Cocok untuk fotografi, gaming, dan produktivitas sehari-hari.",
    specifications: {
      "Layar": "6.7 inch AMOLED, 120Hz",
      "Processor": "Snapdragon 8 Gen 2",
      "RAM": "8GB LPDDR5",
      "Storage": "256GB UFS 3.1",
      "Kamera Belakang": "108MP + 12MP + 12MP",
      "Kamera Depan": "32MP",
      "Baterai": "5000mAh, Fast Charging 67W",
      "OS": "Android 14",
      "Dimensi": "163.2 x 75.4 x 8.9 mm",
      "Berat": "234g"
    },
    features: [
      "IP68 Water Resistant",
      "5G Ready",
      "Wireless Charging",
      "NFC Support",
      "Stereo Speaker",
      "In-Display Fingerprint"
    ],
    stock: 25,
    isFlashSale: true,
    isFreeShipping: true
  };

  const reviews = [
    {
      id: 1,
      name: "Budi Santoso",
      rating: 5,
      comment: "Kualitas sangat bagus, kamera jernih banget. Pengiriman cepat, packaging aman. Recommended!",
      date: "2 hari yang lalu",
      helpful: 12
    },
    {
      id: 2,
      name: "Siti Rahayu",
      rating: 4,
      comment: "Produk sesuai deskripsi, performa lancar untuk gaming. Cuma agak berat aja buat penggunaan lama.",
      date: "1 minggu yang lalu",
      helpful: 8
    },
    {
      id: 3,
      name: "Ahmad Fauzi",
      rating: 5,
      comment: "Sudah pakai 2 bulan, baterai awet seharian penuh. Fast charging benar-benar cepat.",
      date: "2 minggu yang lalu",
      helpful: 15
    }
  ];

  const relatedProducts = [
    {
      id: "r1",
      image: productLaptop,
      title: "MacBook Air M2 13-inch 8GB 256GB",
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
      image: productHeadphones,
      title: "Sony WH-1000XM5 Noise Canceling",
      price: 4299000,
      originalPrice: 4999000,
      rating: 4.7,
      sold: 567,
      discount: 14,
      isFreeShipping: true,
      location: "Bandung"
    }
  ];

  const comparisonProducts = [
    {
      id: product.id,
      name: product.title,
      image: product.images[0],
      price: product.price,
      rating: product.rating,
      storage: "256GB",
      camera: "108MP",
      ram: "8GB",
      battery: "5000mAh",
      processor: "Snapdragon 8 Gen 2"
    },
    {
      id: "comp1",
      name: "iPhone 15 Pro Max 256GB",
      image: productSmartphone,
      price: 21999000,
      rating: 4.8,
      storage: "256GB",
      camera: "48MP",
      ram: "8GB",
      battery: "4441mAh",
      processor: "A17 Pro"
    },
    {
      id: "comp2", 
      name: "Samsung Galaxy S24 Ultra 256GB",
      image: productSmartphone,
      price: 19999000,
      rating: 4.6,
      storage: "256GB", 
      camera: "200MP",
      ram: "12GB",
      battery: "5000mAh",
      processor: "Snapdragon 8 Gen 3"
    },
    {
      id: "comp3",
      name: "Google Pixel 8 Pro 256GB", 
      image: productSmartphone,
      price: 15999000,
      rating: 4.5,
      storage: "256GB",
      camera: "50MP",
      ram: "12GB", 
      battery: "5050mAh",
      processor: "Google Tensor G3"
    }
  ];

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Beranda</Link>
          <span>/</span>
          <Link to="/category/elektronik" className="hover:text-foreground">Elektronik</Link>
          <span>/</span>
          <span className="text-foreground">Smartphone</span>
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
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Badges */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.isFlashSale && (
                  <Badge className="bg-accent">⚡ Flash Sale</Badge>
                )}
                <Badge variant="destructive">-{product.discount}%</Badge>
                {product.isFreeShipping && (
                  <Badge variant="outline">Gratis Ongkir</Badge>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {product.title}
              </h1>
              
              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  {product.totalReviews.toLocaleString()} ulasan
                </span>
                <span className="text-muted-foreground">
                  {product.sold.toLocaleString()} terjual
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Hemat {formatPrice(product.originalPrice - product.price)}
              </p>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{product.seller}</h3>
                    <p className="text-sm text-muted-foreground">{product.location}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Kunjungi Toko
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Jumlah:</label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Stok: {product.stock} tersisa
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Tambah ke Keranjang
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Beli Sekarang
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Bagikan
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="w-4 h-4 text-success" />
                <span>Gratis ongkir ke seluruh Indonesia</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-success" />
                <span>Garansi resmi 1 tahun</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <RotateCcw className="w-4 h-4 text-success" />
                <span>14 hari tukar barang</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Deskripsi</TabsTrigger>
            <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
            <TabsTrigger value="reviews">Ulasan ({product.totalReviews})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Deskripsi Produk</h3>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                
                <h4 className="font-semibold mb-3">Fitur Unggulan:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Spesifikasi Teknis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col space-y-1 pb-3 border-b border-border">
                      <span className="text-sm font-medium text-muted-foreground">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Ulasan Pelanggan</h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{review.name}</span>
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground mb-2">{review.comment}</p>
                          <Button variant="ghost" size="sm" className="text-xs">
                            👍 Membantu ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Product Comparison Table */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Perbandingan dengan Produk Serupa</h3>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Produk</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Storage</TableHead>
                      <TableHead>Kamera</TableHead>
                      <TableHead>RAM</TableHead>
                      <TableHead>Baterai</TableHead>
                      <TableHead>Processor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonProducts.map((item, index) => (
                      <TableRow key={item.id} className={index === 0 ? "bg-primary/5" : ""}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              {index === 0 && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                  Produk Ini
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatPrice(item.price)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <div className="flex">{renderStars(item.rating)}</div>
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.storage}</TableCell>
                        <TableCell>{item.camera}</TableCell>
                        <TableCell>{item.ram}</TableCell>
                        <TableCell>{item.battery}</TableCell>
                        <TableCell>{item.processor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Products */}
        <section>
          <h3 className="text-2xl font-bold mb-6">Produk Terkait</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;