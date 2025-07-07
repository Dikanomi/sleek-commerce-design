import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  Bell,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const AdminLayout = () => {
  const location = useLocation();
  
  const navigationItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Produk",
      href: "/admin/products",
      icon: Package,
    },
    {
      title: "Pesanan",
      href: "/admin/orders",
      icon: ShoppingCart,
      badge: "12", // Pending orders
    },
    {
      title: "Pelanggan",
      href: "/admin/customers",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Pengaturan",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const isActivePath = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 items-center px-4 lg:px-6">
          {/* Logo */}
          <Link to="/admin" className="flex items-center space-x-2 mr-6">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg">Admin ShopEase</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari produk, pesanan, pelanggan..."
              className="pl-10"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center p-0">
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-background/50 min-h-[calc(100vh-64px)]">
          <nav className="p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActivePath(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Quick Stats */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground px-3">
                Statistik Hari Ini
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between px-3 py-1">
                  <span className="text-muted-foreground">Pesanan Baru</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between px-3 py-1">
                  <span className="text-muted-foreground">Pendapatan</span>
                  <span className="font-medium">Rp 15.2M</span>
                </div>
                <div className="flex justify-between px-3 py-1">
                  <span className="text-muted-foreground">Pengunjung</span>
                  <span className="font-medium">1,248</span>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;