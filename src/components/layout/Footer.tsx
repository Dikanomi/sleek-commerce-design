import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl">ShopEase</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Platform e-commerce terpercaya dengan jutaan produk berkualitas dan harga terbaik.
            </p>
            <p className="text-sm text-muted-foreground">
              📍 Jakarta, Indonesia<br/>
              📞 +62 21 1234 5678<br/>
              ✉️ hello@shopease.com
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Layanan Pelanggan</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">Pusat Bantuan</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Hubungi Kami</Link></li>
              <li><Link to="/purchase-guide" className="text-muted-foreground hover:text-foreground transition-colors">Cara Pembelian</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors">Pengembalian</Link></li>
              <li><Link to="/warranty" className="text-muted-foreground hover:text-foreground transition-colors">Garansi</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">Tentang ShopEase</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Tentang Kami</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Karir</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/press" className="text-muted-foreground hover:text-foreground transition-colors">Press</Link></li>
              <li><Link to="/investor" className="text-muted-foreground hover:text-foreground transition-colors">Investor</Link></li>
            </ul>
          </div>

          {/* Payment & Shipping */}
          <div>
            <h3 className="font-semibold mb-4">Pembayaran & Pengiriman</h3>
            
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Metode Pembayaran:</p>
              <div className="flex flex-wrap gap-2">
                <div className="bg-background border border-border rounded px-2 py-1 text-xs">Bank Transfer</div>
                <div className="bg-background border border-border rounded px-2 py-1 text-xs">OVO</div>
                <div className="bg-background border border-border rounded px-2 py-1 text-xs">GoPay</div>
                <div className="bg-background border border-border rounded px-2 py-1 text-xs">DANA</div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Kurir Pengiriman:</p>
              <div className="flex flex-wrap gap-2">
                <div className="bg-background border border-border rounded px-2 py-1 text-xs">JNE</div>
                <div className="bg-background border border-border rounded px-2 py-1 text-xs">J&T</div>
                <div className="bg-background border border-border rounded px-2 py-1 text-xs">SiCepat</div>
                <div className="bg-background border border-border rounded px-2 py-1 text-xs">GoSend</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ShopEase. Semua hak cipta dilindungi.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Kebijakan Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;