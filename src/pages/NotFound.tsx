import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-8 pb-8 text-center">
          {/* 404 Number with gradient */}
          <div className="mb-6">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-muted-foreground mb-2">
              Maaf, halaman yang Anda cari tidak dapat ditemukan.
            </p>
            <p className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-md inline-block">
              {location.pathname}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" asChild>
                <Link to="/search">
                  <Search className="mr-2 h-4 w-4" />
                  Cari Produk
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/category/elektronik">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Belanja
                </Link>
              </Button>
            </div>

            <Button variant="ghost" onClick={() => window.history.back()} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Halaman Sebelumnya
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">
              Atau kunjungi halaman populer:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/category/elektronik" className="text-xs bg-muted px-2 py-1 rounded-md hover:bg-muted/80 transition-colors">
                Elektronik
              </Link>
              <Link to="/category/fashion" className="text-xs bg-muted px-2 py-1 rounded-md hover:bg-muted/80 transition-colors">
                Fashion
              </Link>
              <Link to="/cart" className="text-xs bg-muted px-2 py-1 rounded-md hover:bg-muted/80 transition-colors">
                Keranjang
              </Link>
              <Link to="/dashboard/profile" className="text-xs bg-muted px-2 py-1 rounded-md hover:bg-muted/80 transition-colors">
                Akun Saya
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
