import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import productHeadphones from "@/assets/product-headphones.jpg";
import productSmartphone from "@/assets/product-smartphone.jpg";
import productLaptop from "@/assets/product-laptop.jpg";

const ProductListing = () => {
  const { category } = useParams();
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [sortBy, setSortBy] = useState("terbaru");

  const products = [
    {
      id: "p1",
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
      id: "p2",
      image: productSmartphone,
      title: "iPhone 15 Pro Max 256GB Natural Titanium",
      price: 24999000,
      rating: 4.8,
      sold: 123,
      isFreeShipping: true,
      location: "Jakarta Selatan"
    },
    {
      id: "p3",
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
    // Duplicate products for demonstration
    ...Array(9).fill(null).map((_, index) => ({
      id: `p${index + 4}`,
      image: [productLaptop, productSmartphone, productHeadphones][index % 3],
      title: [
        "ASUS ROG Zephyrus G14 Ryzen 9 RTX 4060",
        "Samsung Galaxy S24 Ultra 512GB",
        "AirPods Pro 2nd Generation"
      ][index % 3],
      price: [19999000, 21999000, 3599000][index % 3],
      originalPrice: [23999000, 24999000, 3999000][index % 3],
      rating: 4.5 + (index % 5) * 0.1,
      sold: 100 + index * 50,
      discount: 10 + (index % 3) * 5,
      isFreeShipping: true,
      location: ["Jakarta", "Bandung", "Surabaya"][index % 3]
    }))
  ];

  const brands = ["Apple", "Samsung", "Sony", "ASUS", "Dell", "HP", "Xiaomi", "Oppo"];
  const ratings = [5, 4, 3, 2, 1];

  const categoryTitle = {
    "elektronik": "Elektronik",
    "fashion": "Fashion & Aksesoris",
    "rumah-tangga": "Rumah Tangga",
    "olahraga": "Olahraga & Outdoor",
    "kesehatan": "Kesehatan & Kecantikan",
    "otomotif": "Otomotif"
  }[category || "elektronik"] || "Semua Produk";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <span>Beranda</span>
          <span>/</span>
          <span>Kategori</span>
          <span>/</span>
          <span className="text-foreground font-medium">{categoryTitle}</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{categoryTitle}</h1>
            <p className="text-muted-foreground">
              Menampilkan {products.length} produk dari ribuan pilihan terbaik
            </p>
          </div>
          
          {/* Sort Options - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Urutkan:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih urutan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="terbaru">Terbaru</SelectItem>
                <SelectItem value="terlaris">Terlaris</SelectItem>
                <SelectItem value="harga-terendah">Harga Terendah</SelectItem>
                <SelectItem value="harga-tertinggi">Harga Tertinggi</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-6 space-y-6">
              {/* Price Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filter Harga</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rp {priceRange[0].toLocaleString()}</span>
                      <span>Rp {priceRange[1].toLocaleString()}</span>
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50000000}
                      step={100000}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="text-xs"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000000])}
                      className="text-xs"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Brand Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Brand</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm font-medium cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rating Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {ratings.map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="text-sm font-medium cursor-pointer flex items-center">
                          <span className="flex text-yellow-400 mr-1">
                            {"★".repeat(rating)}{"☆".repeat(5 - rating)}
                          </span>
                          <span>{rating}+ ke atas</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pengiriman</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-shipping" />
                      <label htmlFor="free-shipping" className="text-sm font-medium cursor-pointer">
                        Gratis Ongkir
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="same-day" />
                      <label htmlFor="same-day" className="text-sm font-medium cursor-pointer">
                        Same Day Delivery
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Sort */}
            <div className="md:hidden mb-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Urutkan berdasarkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terbaru">Terbaru</SelectItem>
                  <SelectItem value="terlaris">Terlaris</SelectItem>
                  <SelectItem value="harga-terendah">Harga Terendah</SelectItem>
                  <SelectItem value="harga-tertinggi">Harga Tertinggi</SelectItem>
                  <SelectItem value="rating">Rating Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Gratis Ongkir</span>
                <button className="ml-1 hover:text-destructive">×</button>
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Rating 4+</span>
                <button className="ml-1 hover:text-destructive">×</button>
              </Badge>
            </div>

            {/* Products */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Sebelumnya
                </Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="px-2">...</span>
                <Button variant="outline" size="sm">10</Button>
                <Button variant="outline" size="sm">
                  Selanjutnya
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductListing;