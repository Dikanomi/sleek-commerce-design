import { TrendingUp, TrendingDown, Users, ShoppingCart, Package, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const Analytics = () => {
  const salesData = [
    { month: "Jan", sales: 12500000, orders: 245, customers: 189 },
    { month: "Feb", sales: 15200000, orders: 298, customers: 234 },
    { month: "Mar", sales: 18900000, orders: 367, customers: 298 },
    { month: "Apr", sales: 16700000, orders: 334, customers: 267 },
    { month: "May", sales: 21300000, orders: 412, customers: 356 },
    { month: "Jun", sales: 24100000, orders: 489, customers: 398 }
  ];

  const topCategories = [
    { name: "Elektronik", sales: "Rp 45.2M", percentage: 68, growth: "+12.5%" },
    { name: "Fashion", sales: "Rp 12.8M", percentage: 19, growth: "+8.2%" },
    { name: "Rumah Tangga", sales: "Rp 5.4M", percentage: 8, growth: "-2.1%" },
    { name: "Olahraga", sales: "Rp 3.2M", percentage: 5, growth: "+15.3%" }
  ];

  const topProducts = [
    { name: "iPhone 15 Pro", revenue: "Rp 18.9M", units: 89, growth: "+25.4%" },
    { name: "MacBook Air M3", revenue: "Rp 15.2M", units: 34, growth: "+18.7%" },
    { name: "Samsung Galaxy S24", revenue: "Rp 12.8M", units: 67, growth: "+22.1%" },
    { name: "Sony WH-1000XM5", revenue: "Rp 8.4M", units: 156, growth: "+31.2%" }
  ];

  const revenueStats = [
    {
      title: "Pendapatan Hari Ini",
      value: "Rp 2.4M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Pendapatan Minggu Ini", 
      value: "Rp 18.7M",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp
    },
    {
      title: "Pendapatan Bulan Ini",
      value: "Rp 78.3M",
      change: "+15.1%",
      trend: "up",
      icon: TrendingUp
    },
    {
      title: "Rata-rata Order Value",
      value: "Rp 1.2M",
      change: "-2.4%",
      trend: "down",
      icon: ShoppingCart
    }
  ];

  const customerMetrics = [
    { metric: "Total Pelanggan", value: "2,847", change: "+18.2%", trend: "up" },
    { metric: "Pelanggan Baru", value: "156", change: "+24.1%", trend: "up" },
    { metric: "Repeat Customers", value: "67.8%", change: "+5.2%", trend: "up" },
    { metric: "Customer Lifetime Value", value: "Rp 8.9M", change: "+12.7%", trend: "up" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Laporan</h1>
          <p className="text-muted-foreground">
            Analisis mendalam tentang performa toko Anda
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Hari</SelectItem>
              <SelectItem value="30days">30 Hari</SelectItem>
              <SelectItem value="90days">90 Hari</SelectItem>
              <SelectItem value="1year">1 Tahun</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Laporan</Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {revenueStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
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
                <span>dari periode sebelumnya</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Tren Penjualan (6 Bulan Terakhir)</CardTitle>
            <CardDescription>Perkembangan penjualan dan pesanan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{data.month} 2024</span>
                    <span className="text-muted-foreground">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0
                      }).format(data.sales)}
                    </span>
                  </div>
                  <Progress value={(data.sales / 25000000) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{data.orders} pesanan</span>
                    <span>{data.customers} pelanggan</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Terlaris</CardTitle>
            <CardDescription>Performance berdasarkan kategori produk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <div className="text-right">
                      <p className="text-sm font-medium">{category.sales}</p>
                      <p className={`text-xs ${category.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {category.growth}
                      </p>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {category.percentage}% dari total penjualan
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produk Terlaris</CardTitle>
            <CardDescription>Produk dengan revenue tertinggi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.units} unit terjual</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                    <p className="text-xs text-green-500">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Metrik Pelanggan</CardTitle>
            <CardDescription>Analisis perilaku dan value pelanggan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerMetrics.map((metric) => (
                <div key={metric.metric} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{metric.metric}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;