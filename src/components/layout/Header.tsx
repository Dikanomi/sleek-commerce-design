import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
        🎉 Flash Sale! Diskon hingga 70% untuk semua produk elektronik
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-xl text-foreground">ShopEase</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Cari produk, brand, atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 h-12 rounded-l-md border-r-0"
              />
              <Button 
                type="submit"
                size="sm" 
                className="absolute right-0 top-0 h-12 px-6 rounded-l-none"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/dashboard/profile">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Akun Saya</span>
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 relative">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Keranjang</span>
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 h-10"
            />
            <Button type="submit" size="sm" className="absolute right-1 top-1 h-8 px-3">
              <Search className="h-3 w-3" />
            </Button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-2">
              <Link to="/dashboard/profile" className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md">
                <User className="h-4 w-4" />
                <span>Akun Saya</span>
              </Link>
              <Link to="/cart" className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md">
                <ShoppingCart className="h-4 w-4" />
                <span>Keranjang (3)</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Categories Navigation */}
      <div className="bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 h-12 overflow-x-auto scrollbar-hide">
            <Link to="/category/elektronik" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              Elektronik
            </Link>
            <Link to="/category/fashion" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              Fashion
            </Link>
            <Link to="/category/rumah-tangga" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              Rumah Tangga
            </Link>
            <Link to="/category/olahraga" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              Olahraga
            </Link>
            <Link to="/category/kesehatan" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              Kesehatan
            </Link>
            <Link to="/category/otomotif" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
              Otomotif
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;