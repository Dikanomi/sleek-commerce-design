import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { User, Package, Heart, MapPin, Settings, LogOut, Bell, CreditCard, Shield, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const DashboardLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      icon: User,
      label: "Profil Saya",
      path: "/dashboard/profile",
      description: "Kelola informasi akun"
    },
    {
      icon: Package,
      label: "Pesanan Saya",
      path: "/dashboard/orders",
      description: "Lihat status pesanan",
      badge: 3
    },
    {
      icon: Heart,
      label: "Wishlist",
      path: "/dashboard/wishlist",
      description: "Produk favorit",
      badge: 12
    },
    {
      icon: MapPin,
      label: "Alamat",
      path: "/dashboard/addresses",
      description: "Kelola alamat pengiriman"
    },
    {
      icon: CreditCard,
      label: "Pembayaran",
      path: "/dashboard/payment-methods",
      description: "Metode pembayaran"
    },
    {
      icon: Bell,
      label: "Notifikasi",
      path: "/dashboard/notifications",
      description: "Pengaturan notifikasi"
    },
    {
      icon: Shield,
      label: "Keamanan",
      path: "/dashboard/security",
      description: "Password & keamanan"
    },
    {
      icon: Settings,
      label: "Pengaturan",
      path: "/dashboard/settings",
      description: "Preferensi akun"
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const userData = {
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "+62 812 3456 7890",
    memberSince: "Januari 2023",
    avatar: "",
    level: "Gold Member",
    points: 2450
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* User Info Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={userData.avatar} />
                      <AvatarFallback className="text-lg font-semibold">
                        {userData.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{userData.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{userData.email}</p>
                      <Badge variant="secondary" className="mt-1">
                        {userData.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member sejak:</span>
                      <span className="font-medium">{userData.memberSince}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Poin rewards:</span>
                      <span className="font-medium text-primary">{userData.points.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Menu */}
              <Card>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                          isActive(item.path)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-5 w-5" />
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className={`text-xs ${
                              isActive(item.path) ? "text-primary-foreground/80" : "text-muted-foreground"
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                        {item.badge && (
                          <Badge variant="destructive" className="ml-2">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </nav>
                  
                  <Separator className="my-2" />
                  
                  {/* Additional Actions */}
                  <div className="p-4 space-y-2">
                    <Link to="/help" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors">
                      <HelpCircle className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">Bantuan</span>
                    </Link>
                    
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      <LogOut className="h-4 w-4 mr-3" />
                      Keluar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;