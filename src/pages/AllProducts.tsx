import { useState } from "react";
import { Search, Filter, Grid3X3, List, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/product-card";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 25000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const products = [
    {
      id: "1",
      title: "iPhone 15 Pro Max",
      price: 20999000,
      originalPrice: 22999000,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop",
      rating: 4.8,
      sold: 124,
      category: "Smartphone",
      brand: "Apple",
      isNew: true,
      isSale: true,
      discount: 10,
      isFlashSale: true,
      isFreeShipping: true,
      location: "Jakarta",
      description: "iPhone terbaru dengan chip A17 Pro dan kamera canggih"
    },
    {
      id: "2",
      title: "MacBook Air M3",
      price: 18999000,
      originalPrice: undefined,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
      rating: 4.9,
      sold: 89,
      category: "Laptop",
      brand: "Apple",
      isNew: true,
      isSale: false,
      discount: 0,
      isFlashSale: false,
      isFreeShipping: true,
      location: "Jakarta",
      description: "Laptop tipis dengan performa tinggi dan baterai tahan lama"
    },
    {
      id: "3",
      title: "Samsung Galaxy S24 Ultra",
      price: 19999000,
      originalPrice: 21999000,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
      rating: 4.7,
      sold: 156,
      category: "Smartphone", 
      brand: "Samsung",
      isNew: false,
      isSale: true,
      discount: 9,
      isFlashSale: false,
      isFreeShipping: true,
      location: "Jakarta",
      description: "Flagship Android dengan S Pen dan kamera 200MP"
    },
    {
      id: "4",
      title: "Sony WH-1000XM5",
      price: 4299000,
      originalPrice: 4999000,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop",
      rating: 4.6,
      sold: 234,
      category: "Audio",
      brand: "Sony",
      isNew: false,
      isSale: true,
      discount: 14,
      isFlashSale: false,
      isFreeShipping: false,
      location: "Jakarta",
      description: "Headphone noise-cancelling terbaik untuk audiophile"
    },
    {
      id: "5",
      title: "iPad Pro 12.9\"",
      price: 16999000,
      originalPrice: undefined,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
      rating: 4.8,
      sold: 67,
      category: "Tablet",
      brand: "Apple",
      isNew: true,
      isSale: false,
      discount: 0,
      isFlashSale: false,
      isFreeShipping: true,
      location: "Jakarta",
      description: "Tablet pro dengan chip M2 untuk kreativitas tanpa batas"
    },
    {
      id: "6",
      title: "Dell XPS 13",
      price: 15999000,
      originalPrice: 17999000,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop",
      rating: 4.5,
      sold: 98,
      category: "Laptop",
      brand: "Dell",
      isNew: false,
      isSale: true,
      discount: 11,
      isFlashSale: false,
      isFreeShipping: true,
      location: "Jakarta",
      description: "Laptop premium dengan layar InfinityEdge yang memukau"
    }
  ];

  const categories = ["Smartphone", "Laptop", "Tablet", "Audio", "Aksesoris"];
  const brands = ["Apple", "Samsung", "Sony", "Dell", "Xiaomi", "Asus"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.sold - a.sold;
      default: // newest
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Beranda</Link>
          <span>/</span>
          <span className="text-foreground">Semua Produk</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Semua Produk</h1>
            <p className="text-muted-foreground">
              Menampilkan {sortedProducts.length} dari {products.length} produk
            </p>
          </div>
          
          {/* View Toggle & Sort */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center border border-border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Terbaru</SelectItem>
                <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
                <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
                <SelectItem value="reviews">Paling Banyak Ulasan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-6">
              {/* Search */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Cari Produk</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Price Range */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-4 block">Rentang Harga</Label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={25000000}
                    min={0}
                    step={500000}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Rp {priceRange[0].toLocaleString()}</span>
                    <span>Rp {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Categories */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-4 block">Kategori</Label>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => 
                          handleCategoryChange(category, checked as boolean)
                        }
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Brands */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-4 block">Brand</Label>
                <div className="space-y-3">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => 
                          handleBrandChange(brand, checked as boolean)
                        }
                      />
                      <Label htmlFor={brand} className="text-sm">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                  setPriceRange([0, 25000000]);
                  setSearchQuery("");
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Reset Filter
              </Button>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Tidak ada produk yang sesuai dengan filter Anda
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setPriceRange([0, 25000000]);
                    setSearchQuery("");
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-4"
              }>
                {sortedProducts.map((product) => (
                  viewMode === "grid" ? (
                    <ProductCard 
                      key={product.id} 
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      rating={product.rating}
                      sold={product.sold}
                      discount={product.discount}
                      isFlashSale={product.isFlashSale}
                      isFreeShipping={product.isFreeShipping}
                      location={product.location}
                    />
                  ) : (
                    <Card key={product.id} className="p-4">
                      <div className="flex space-x-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                              <p className="text-muted-foreground text-sm mb-2">
                                {product.description}
                              </p>
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm ml-1">{product.rating}</span>
                                </div>
                                <span className="text-muted-foreground text-sm">
                                  ({product.sold} terjual)
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary">{product.category}</Badge>
                                <Badge variant="outline">{product.brand}</Badge>
                                {product.isNew && <Badge>Baru</Badge>}
                                {product.isSale && <Badge variant="destructive">Sale</Badge>}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-primary">
                                Rp {product.price.toLocaleString()}
                              </p>
                              {product.originalPrice && (
                                <p className="text-sm text-muted-foreground line-through">
                                  Rp {product.originalPrice.toLocaleString()}
                                </p>
                              )}
                              <div className="flex items-center space-x-2 mt-2">
                                <Button size="sm">
                                  Tambah ke Keranjang
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AllProducts;