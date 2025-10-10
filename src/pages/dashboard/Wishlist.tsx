import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import productHeadphones from "@/assets/product-headphones.jpg";
import productSmartphone from "@/assets/product-smartphone.jpg";
import productLaptop from "@/assets/product-laptop.jpg";

const Wishlist = () => {
  const { items: wishlistItems, removeItem, clearWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  // Initialize wishlist with sample data on first load
  useEffect(() => {
    if (wishlistItems.length === 0) {
      const { addItem } = useWishlistStore.getState();
      
      const sampleItems = [
        {
          id: "w1",
          image: productSmartphone,
          title: "iPhone 15 Pro Max 256GB Natural Titanium",
          price: 24999000,
          originalPrice: 26999000,
          rating: 4.8,
          sold: 123,
          discount: 7,
          isAvailable: true,
          isFreeShipping: true,
          location: "Jakarta Selatan",
          addedDate: "2024-01-20",
          priceHistory: [
            { date: "2024-01-20", price: 24999000 },
            { date: "2024-01-15", price: 25999000 },
            { date: "2024-01-10", price: 26999000 }
          ]
        },
        {
          id: "w2",
          image: productLaptop,
          title: "MacBook Air M2 13-inch 8GB 256GB Space Gray",
          price: 18999000,
          originalPrice: 21999000,
          rating: 4.9,
          sold: 234,
          discount: 14,
          isAvailable: true,
          isFreeShipping: true,
          location: "Jakarta Pusat",
          addedDate: "2024-01-18",
          priceHistory: [
            { date: "2024-01-18", price: 18999000 },
            { date: "2024-01-12", price: 19999000 },
            { date: "2024-01-05", price: 21999000 }
          ]
        },
        {
          id: "w3",
          image: productHeadphones,
          title: "Sony WH-1000XM5 Noise Canceling Headphones",
          price: 4299000,
          originalPrice: 4999000,
          rating: 4.7,
          sold: 567,
          discount: 14,
          isAvailable: false,
          isFreeShipping: true,
          location: "Bandung",
          addedDate: "2024-01-15",
          priceHistory: [
            { date: "2024-01-15", price: 4299000 },
            { date: "2024-01-08", price: 4599000 },
            { date: "2024-01-01", price: 4999000 }
          ]
        }
      ];

      sampleItems.forEach(item => addItem(item));
    }
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  const removeFromWishlist = (id: string) => {
    removeItem(id);
    setSelectedItems(prev => prev.filter(item => item !== id));
    toast.success("Produk dihapus dari wishlist");
  };

  const removeSelectedItems = () => {
    selectedItems.forEach(id => removeItem(id));
    setSelectedItems([]);
    toast.success(`${selectedItems.length} produk dihapus dari wishlist`);
  };

  const handleAddToCart = (id: string) => {
    const item = wishlistItems.find(i => i.id === id);
    if (!item) return;

    addToCart({
      id: item.id,
      image: item.image,
      title: item.title,
      price: item.price,
      originalPrice: item.originalPrice,
      stock: 50,
      seller: "Official Store",
      isFreeShipping: item.isFreeShipping,
      discount: item.discount
    });
    toast.success("Produk ditambahkan ke keranjang");
  };

  const handleAddAllToCart = () => {
    selectedItems.forEach(id => handleAddToCart(id));
    setSelectedItems([]);
  };

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      case "oldest":
        return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "discount":
        return (b.discount || 0) - (a.discount || 0);
      default:
        return 0;
    }
  });

  const availableItems = sortedItems.filter(item => item.isAvailable);
  const unavailableItems = sortedItems.filter(item => !item.isAvailable);

  const getPriceChange = (item: any) => {
    if (item.priceHistory.length < 2) return null;
    const current = item.priceHistory[0].price;
    const previous = item.priceHistory[1].price;
    return current - previous;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} produk dalam wishlist Anda
          </p>
        </div>
        
        {wishlistItems.length > 0 && (
          <Button variant="outline" onClick={() => {
            clearWishlist();
            toast.success("Wishlist dikosongkan");
          }}>
            <Filter className="h-4 w-4 mr-2" />
            Bersihkan Wishlist
          </Button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Wishlist Anda kosong</h3>
            <p className="text-muted-foreground mb-6">
              Tambahkan produk favorit Anda untuk memudahkan belanja di kemudian hari
            </p>
            <Link to="/">
              <Button>
                Jelajahi Produk
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Bulk Actions */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedItems.length === wishlistItems.length}
                      onCheckedChange={toggleSelectAll}
                    />
                    <span className="text-sm font-medium">
                      Pilih Semua ({selectedItems.length}/{wishlistItems.length})
                    </span>
                  </div>
                  
                  {selectedItems.length > 0 && (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleAddAllToCart}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Tambah ke Keranjang ({selectedItems.length})
                      </Button>
                      <Button variant="outline" size="sm" onClick={removeSelectedItems}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Hapus ({selectedItems.length})
                      </Button>
                    </div>
                  )}
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Urutkan:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Terbaru Ditambahkan</SelectItem>
                      <SelectItem value="oldest">Terlama Ditambahkan</SelectItem>
                      <SelectItem value="price-low">Harga Terendah</SelectItem>
                      <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                      <SelectItem value="discount">Diskon Terbesar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Items */}
          {availableItems.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Tersedia ({availableItems.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableItems.map((item) => {
                  const priceChange = getPriceChange(item);
                  
                  return (
                    <Card key={item.id} className="group hover:shadow-card-hover transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-2 mb-3">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                          />
                          <div className="flex-1 min-w-0">
                            {/* Product Image */}
                            <div className="relative mb-3">
                              <Link to={`/product/${item.id}`}>
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-40 object-cover rounded-lg"
                                />
                              </Link>
                              
                              {/* Badges */}
                              <div className="absolute top-2 left-2 flex flex-col gap-1">
                                {item.discount && (
                                  <Badge variant="destructive" className="text-xs">
                                    -{item.discount}%
                                  </Badge>
                                )}
                                {item.isFreeShipping && (
                                  <Badge variant="outline" className="text-xs bg-background">
                                    Gratis Ongkir
                                  </Badge>
                                )}
                              </div>

                              {/* Remove Button */}
                              <Button
                                size="sm"
                                variant="secondary"
                                className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeFromWishlist(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Product Info */}
                            <Link to={`/product/${item.id}`}>
                              <h3 className="font-medium text-foreground hover:text-primary line-clamp-2 mb-2">
                                {item.title}
                              </h3>
                            </Link>

                            {/* Price */}
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg font-bold text-foreground">
                                {formatPrice(item.price)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                            </div>

                            {/* Price Change Alert */}
                            {priceChange && (
                              <div className={`text-xs p-2 rounded-md mb-2 ${
                                priceChange < 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                              }`}>
                                {priceChange < 0 ? "📉" : "📈"} Harga {priceChange < 0 ? "turun" : "naik"} {formatPrice(Math.abs(priceChange))}
                              </div>
                            )}

                            {/* Rating & Location */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                              <div className="flex items-center space-x-1">
                                <div className="flex">{renderStars(item.rating)}</div>
                                <span>({item.rating})</span>
                                <span>•</span>
                                <span>{item.sold} terjual</span>
                              </div>
                              <span>{item.location}</span>
                            </div>

                            {/* Added Date */}
                            <p className="text-xs text-muted-foreground mb-3">
                              Ditambahkan {formatDate(item.addedDate)}
                            </p>

                            {/* Actions */}
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleAddToCart(item.id)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Tambah ke Keranjang
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Unavailable Items */}
          {unavailableItems.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-muted-foreground">
                Tidak Tersedia ({unavailableItems.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unavailableItems.map((item) => (
                  <Card key={item.id} className="opacity-60">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox disabled />
                        <div className="flex-1 min-w-0">
                          <div className="relative mb-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                              <Badge variant="secondary">Stok Habis</Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="absolute top-2 right-2 h-8 w-8 p-0"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <h3 className="font-medium text-muted-foreground line-clamp-2 mb-2">
                            {item.title}
                          </h3>

                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg font-bold text-muted-foreground">
                              {formatPrice(item.price)}
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground mb-3">
                            Ditambahkan {formatDate(item.addedDate)}
                          </p>

                          <Button variant="outline" size="sm" className="w-full" disabled>
                            Stok Habis
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Wishlist;