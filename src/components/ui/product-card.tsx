import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  sold: number;
  discount?: number;
  isFlashSale?: boolean;
  isFreeShipping?: boolean;
  location?: string;
}

const ProductCard = ({
  id,
  image,
  title,
  price,
  originalPrice,
  rating,
  sold,
  discount,
  isFlashSale = false,
  isFreeShipping = false,
  location = "Jakarta"
}: ProductCardProps) => {
  const { addItem: addToCart } = useCartStore();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlistStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      image,
      title,
      price,
      originalPrice,
      stock: 50,
      seller: "Official Store",
      isFreeShipping,
      discount
    });
    toast.success("Produk ditambahkan ke keranjang");
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id,
      image,
      title,
      price,
      originalPrice,
      rating,
      sold,
      discount,
      isAvailable: true,
      isFreeShipping,
      location
    });
    
    if (isInWishlist(id)) {
      toast.success("Produk dihapus dari wishlist");
    } else {
      toast.success("Produk ditambahkan ke wishlist");
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }

    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="text-gray-300">☆</span>);
    }

    return stars;
  };

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 cursor-pointer border-border bg-background">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <Link to={`/product/${id}`}>
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isFlashSale && (
              <Badge className="bg-accent text-accent-foreground text-xs font-bold">
                ⚡ Flash Sale
              </Badge>
            )}
            {discount && (
              <Badge variant="destructive" className="text-xs font-bold">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(id) ? "fill-red-500 text-red-500" : ""}`} />
          </Button>

          {/* Quick Add to Cart */}
          <Button
            size="sm"
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            +
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-3">
          <Link to={`/product/${id}`}>
            <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mb-2">
              {title}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Rating & Sold */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <div className="flex">{renderStars(rating)}</div>
              <span>({rating})</span>
            </div>
            <span>{sold.toLocaleString()} terjual</span>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{location}</span>
            {isFreeShipping && (
              <Badge variant="outline" className="text-xs">
                Gratis Ongkir
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;