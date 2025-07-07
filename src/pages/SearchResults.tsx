import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import productHeadphones from "@/assets/product-headphones.jpg";
import productSmartphone from "@/assets/product-smartphone.jpg";
import productLaptop from "@/assets/product-laptop.jpg";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [newQuery, setNewQuery] = useState(query);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock search results - in real app, this would come from API
  const searchResults = [
    {
      id: "s1",
      image: productSmartphone,
      title: "Smartphone Android RAM 8GB Storage 256GB Camera 108MP Pro Max",
      price: 2499000,
      originalPrice: 4999000,
      rating: 4.7,
      sold: 856,
      discount: 50,
      isFreeShipping: true,
      location: "Bandung",
      relevanceScore: 95
    },
    {
      id: "s2",
      image: productLaptop,
      title: "Laptop Gaming Intel i7 RAM 16GB SSD 512GB RTX 3060 Pro",
      price: 12999000,
      originalPrice: 18999000,
      rating: 4.9,
      sold: 432,
      discount: 32,
      isFreeShipping: true,
      location: "Surabaya",
      relevanceScore: 87
    },
    {
      id: "s3",
      image: productHeadphones,
      title: "Headphone Wireless Premium Bluetooth 5.0 Noise Cancelling Pro",
      price: 299000,
      originalPrice: 999000,
      rating: 4.8,
      sold: 1234,
      discount: 70,
      isFreeShipping: true,
      location: "Jakarta Pusat",
      relevanceScore: 92
    },
    // Duplicate for demonstration
    ...Array(9).fill(null).map((_, index) => ({
      id: `s${index + 4}`,
      image: [productSmartphone, productLaptop, productHeadphones][index % 3],
      title: [
        "Samsung Galaxy S24 Ultra 256GB Smartphone Android",
        "ASUS ROG Zephyrus Gaming Laptop RTX 4060",
        "Sony WH-1000XM5 Wireless Headphone Premium"
      ][index % 3],
      price: [21999000, 19999000, 4299000][index % 3],
      originalPrice: [24999000, 23999000, 4999000][index % 3],
      rating: 4.5 + (index % 5) * 0.1,
      sold: 100 + index * 50,
      discount: 10 + (index % 3) * 5,
      isFreeShipping: true,
      location: ["Jakarta", "Bandung", "Surabaya"][index % 3],
      relevanceScore: 80 - index * 2
    }))
  ];

  const filteredResults = searchResults.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesPrice;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "relevance":
        return b.relevanceScore - a.relevanceScore;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.sold - a.sold; // Mock newest by sold count
      default:
        return 0;
    }
  });

  const brands = ["Samsung", "Apple", "Sony", "ASUS", "Dell", "HP", "Xiaomi"];
  const categories = ["Smartphone", "Laptop", "Headphone", "Tablet", "Camera"];
  const ratings = [5, 4, 3, 2, 1];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery.trim() });
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 50000000]);
    setSortBy("relevance");
  };

  useEffect(() => {
    setNewQuery(query);
  }, [query]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
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

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={category} />
                <label htmlFor={category} className="text-sm font-medium cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
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

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Reset Filter
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari produk, brand, atau kategori..."
                value={newQuery}
                onChange={(e) => setNewQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Cari</Button>
          </form>

          {query && (
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                Hasil pencarian untuk "{query}"
              </h1>
              <p className="text-muted-foreground">
                Menampilkan {sortedResults.length} produk dari {searchResults.length} hasil
              </p>
            </div>
          )}
        </div>

        {!query ? (
          // No Search Query
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">
              Cari Produk Favorit Anda
            </h2>
            <p className="text-muted-foreground mb-6">
              Masukkan kata kunci untuk menemukan produk yang Anda inginkan
            </p>
            
            {/* Popular Searches */}
            <div className="max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-3">Pencarian populer:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["iPhone", "Laptop Gaming", "Headphone", "Samsung", "Smartwatch"].map((term) => (
                  <Badge 
                    key={term} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      setNewQuery(term);
                      setSearchParams({ q: term });
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : sortedResults.length === 0 ? (
          // No Results
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">
              Tidak ada hasil untuk "{query}"
            </h2>
            <p className="text-muted-foreground mb-6">
              Coba gunakan kata kunci yang berbeda atau periksa ejaan Anda
            </p>
            
            <div className="space-y-3 max-w-md mx-auto">
              <p className="text-sm font-medium">Saran pencarian:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Gunakan kata kunci yang lebih umum</li>
                <li>• Periksa ejaan kata kunci</li>
                <li>• Coba gunakan sinonim atau kata yang berbeda</li>
                <li>• Kurangi jumlah kata kunci</li>
              </ul>
            </div>
          </div>
        ) : (
          // Search Results
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <div className="sticky top-6">
                <FiltersContent />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Controls Bar */}
              <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  {/* Mobile Filter */}
                  <Sheet open={showFilters} onOpenChange={setShowFilters}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filter Produk</SheetTitle>
                        <SheetDescription>
                          Gunakan filter untuk mempersempit hasil pencarian
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* View Mode */}
                  <div className="hidden md:flex items-center space-x-1 border border-border rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-8 w-8 p-0"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Urutkan:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Paling Relevan</SelectItem>
                      <SelectItem value="newest">Terbaru</SelectItem>
                      <SelectItem value="price-low">Harga Terendah</SelectItem>
                      <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                      <SelectItem value="rating">Rating Tertinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>"{query}"</span>
                  <button 
                    className="ml-1 hover:text-destructive"
                    onClick={() => {
                      setSearchParams({});
                      setNewQuery("");
                    }}
                  >
                    ×
                  </button>
                </Badge>
              </div>

              {/* Products Grid/List */}
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-2 md:grid-cols-3 gap-4" 
                  : "space-y-4"
              }>
                {sortedResults.map((product) => (
                  viewMode === "grid" ? (
                    <ProductCard key={product.id} {...product} />
                  ) : (
                    <Card key={product.id} className="hover:shadow-card-hover transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${product.id}`}>
                              <h3 className="font-medium text-foreground hover:text-primary line-clamp-2 mb-2">
                                {product.title}
                              </h3>
                            </Link>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg font-bold text-foreground">
                                {formatPrice(product.price)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                              {product.discount && (
                                <Badge variant="destructive" className="text-xs">
                                  -{product.discount}%
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <span className="flex text-yellow-400">
                                  {"★".repeat(Math.floor(product.rating))}
                                  {"☆".repeat(5 - Math.floor(product.rating))}
                                </span>
                                <span>({product.rating})</span>
                                <span>•</span>
                                <span>{product.sold} terjual</span>
                              </div>
                              <span>{product.location}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
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
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;