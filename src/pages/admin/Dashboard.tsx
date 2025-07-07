import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign,
  Eye,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Pendapatan",
      value: "Rp 2.4M",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      description: "dari bulan lalu"
    },
    {
      title: "Pesanan",
      value: "1,248",
      change: "+180.1%",
      trend: "up", 
      icon: ShoppingCart,
      description: "dari bulan lalu"
    },
    {
      title: "Pelanggan",
      value: "892",
      change: "+19%",
      trend: "up",
      icon: Users,
      description: "pelanggan aktif"
    },
    {
      title: "Produk",
      value: "573",
      change: "-5.2%",
      trend: "down",
      icon: Package,
      description: "total produk"
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Ahmad Rizki",
      amount: "Rp 899.000",
      status: "completed",
      items: 3,
      time: "2 menit lalu"
    },
    {
      id: "#ORD-002", 
      customer: "Siti Nurhaliza",
      amount: "Rp 1.299.000",
      status: "processing",
      items: 1,
      time: "5 menit lalu"
    },
    {
      id: "#ORD-003",
      customer: "Budi Santoso",
      amount: "Rp 2.100.000",
      status: "pending",
      items: 2,
      time: "12 menit lalu"
    },
    {
      id: "#ORD-004",
      customer: "Maya Sari",
      amount: "Rp 679.000",
      status: "shipped",
      items: 4,
      time: "18 menit lalu"
    }
  ];

  const topProducts = [
    { name: "iPhone 15 Pro", sales: 89, revenue: "Rp 89.000.000", stock: 23 },
    { name: "Samsung Galaxy S24", sales: 67, revenue: "Rp 67.000.000", stock: 45 },
    { name: "MacBook Air M3", sales: 34, revenue: "Rp 68.000.000", stock: 12 },
    { name: "AirPods Pro", sales: 156, revenue: "Rp 46.800.000", stock: 89 }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      processing: "secondary", 
      pending: "outline",
      shipped: "destructive"
    } as const;
    
    const labels = {
      completed: "Selesai",
      processing: "Diproses",
      pending: "Menunggu",
      shipped: "Dikirim"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang kembali! Berikut ringkasan toko Anda hari ini.
          </p>
        </div>
        <Button>
          <Eye className="mr-2 h-4 w-4" />
          Lihat Laporan Lengkap
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Pesanan Terbaru</CardTitle>
            <CardDescription>
              Daftar pesanan yang baru masuk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium">{order.amount}</p>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(order.status)}
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {order.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produk Terlaris</CardTitle>
            <CardDescription>
              Produk dengan penjualan tertinggi bulan ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.sales} terjual • Stok: {product.stock}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.revenue}</p>
                    </div>
                  </div>
                  <Progress value={(product.sales / 200) * 100} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;