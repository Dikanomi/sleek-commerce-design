import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Heart, ShoppingCart as CartIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/product-card";
import productHeadphones from "@/assets/product-headphones.jpg";
import productSmartphone from "@/assets/product-smartphone.jpg";
import productLaptop from "@/assets/product-laptop.jpg";

interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  stock: number;
  seller: string;
  isSelected: boolean;
  isFreeShipping: boolean;
  discount?: number;
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "cart1",
      image: productSmartphone,
      title: "Smartphone Android RAM 8GB Storage 256GB Camera 108MP",
      price: 2499000,
      originalPrice: 4999000,
      quantity: 1,
      stock: 25,
      seller: "ElektronikStore Official",
      isSelected: true,
      isFreeShipping: true,
      discount: 50
    },
    {
      id: "cart2",
      image: productHeadphones,
      title: "Headphone Wireless Premium Bluetooth 5.0 Noise Cancelling",
      price: 299000,
      originalPrice: 999000,
      quantity: 2,
      stock: 50,
      seller: "AudioTech Store",
      isSelected: true,
      isFreeShipping: true,
      discount: 70
    },
    {
      id: "cart3",
      image: productLaptop,
      title: "Laptop Gaming Intel i7 RAM 16GB SSD 512GB RTX 3060",
      price: 12999000,
      originalPrice: 18999000,
      quantity: 1,
      stock: 10,
      seller: "GamingHub Official",
      isSelected: false,
      isFreeShipping: true,
      discount: 32
    }
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const recommendedProducts = [
    {
      id: "rec1",
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
      id: "rec2",
      image: productHeadphones,
      title: "AirPods Pro 2nd Generation",
      price: 3599000,
      originalPrice: 3999000,
      rating: 4.9,
      sold: 678,
      discount: 10,
      isFreeShipping: true,
      location: "Jakarta Barat"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.stock, newQuantity)) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const toggleItemSelection = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(items =>
      items.map(item => ({ ...item, isSelected: newSelectAll }))
    );
  };

  const selectedItems = cartItems.filter(item => item.isSelected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = selectedItems.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) * item.quantity), 0
  );
  const totalSavings = originalTotal - subtotal;
  const shippingCost = selectedItems.length > 0 && selectedItems.every(item => item.isFreeShipping) ? 0 : 15000;
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <CartIcon className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Keranjang Belanja Kosong
            </h2>
            <p className="text-muted-foreground mb-8">
              Ayo mulai berbelanja dan temukan produk favorit Anda!
            </p>
            <Link to="/">
              <Button size="lg">
                Mulai Belanja
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Keranjang Belanja</h1>
          <div className="text-muted-foreground">
            {cartItems.length} produk
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="select-all"
                    checked={selectAll}
                    onCheckedChange={toggleSelectAll}
                  />
                  <label htmlFor="select-all" className="font-medium cursor-pointer">
                    Pilih Semua ({cartItems.length} produk)
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Checkbox */}
                    <Checkbox
                      checked={item.isSelected}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                      className="mt-2"
                    />

                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 mr-4">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-medium text-foreground hover:text-primary line-clamp-2 mb-1">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-2">
                            Dijual oleh: {item.seller}
                          </p>
                          
                          {/* Badges */}
                          <div className="flex items-center space-x-2 mb-2">
                            {item.discount && (
                              <Badge variant="destructive" className="text-xs">
                                -{item.discount}%
                              </Badge>
                            )}
                            {item.isFreeShipping && (
                              <Badge variant="outline" className="text-xs">
                                Gratis Ongkir
                              </Badge>
                            )}
                          </div>

                          {/* Price */}
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-lg font-bold text-foreground">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end space-y-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-muted-foreground">Jumlah:</span>
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-16 h-8 text-center border-0 focus-visible:ring-0"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Stok: {item.stock}
                          </span>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <div className="font-bold text-lg text-foreground">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          {item.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {formatPrice(item.originalPrice * item.quantity)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold">Kode Promo</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Masukkan kode promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" size="sm">
                    Terapkan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold">Ringkasan Pesanan</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({selectedItems.length} produk)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Hemat</span>
                      <span>-{formatPrice(totalSavings)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Ongkos Kirim</span>
                    <span className={shippingCost === 0 ? "text-success" : ""}>
                      {shippingCost === 0 ? "GRATIS" : formatPrice(shippingCost)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  disabled={selectedItems.length === 0}
                >
                  Checkout ({selectedItems.length} produk)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                </p>
              </CardContent>
            </Card>

            {/* Shopping Guarantees */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-sm">Jaminan Belanja</h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>100% Original</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>14 Hari Tukar Barang</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>Pembayaran Aman</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Mungkin Anda Suka</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ShoppingCart;