import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Star } from "lucide-react";

const VendorAnalytics = () => {
  const vendorPerformanceData = [
    { name: "ElectroWorld", revenue: 12500000, orders: 245, commission: 625000, rating: 4.8 },
    { name: "Fashion Hub", revenue: 8900000, orders: 189, commission: 712000, rating: 4.6 },
    { name: "Beauty Corner", revenue: 6100000, orders: 156, commission: 732000, rating: 4.2 },
    { name: "Gadget Store", revenue: 7200000, orders: 134, commission: 360000, rating: 4.5 },
    { name: "Home Living", revenue: 4300000, orders: 98, commission: 301000, rating: 4.3 }
  ];

  const categoryData = [
    { name: "Elektronik", value: 35, revenue: 45600000, vendors: 42 },
    { name: "Fashion", value: 28, revenue: 32400000, vendors: 38 },
    { name: "Kecantikan", value: 18, revenue: 21800000, vendors: 25 },
    { name: "Rumah Tangga", value: 12, revenue: 15200000, vendors: 18 },
    { name: "Olahraga", value: 7, revenue: 8900000, vendors: 12 }
  ];

  const monthlyTrendData = [
    { month: "Jul", totalRevenue: 89000000, vendors: 142, avgOrder: 450000 },
    { month: "Aug", totalRevenue: 95000000, vendors: 145, avgOrder: 465000 },
    { month: "Sep", totalRevenue: 102000000, vendors: 148, avgOrder: 478000 },
    { month: "Oct", totalRevenue: 108000000, vendors: 152, avgOrder: 485000 },
    { month: "Nov", totalRevenue: 115000000, vendors: 154, avgOrder: 495000 },
    { month: "Dec", totalRevenue: 128000000, vendors: 156, avgOrder: 512000 }
  ];

  const topVendorsByGrowth = [
    { name: "TechMart Indo", growth: 145.2, category: "Elektronik", newVendor: true },
    { name: "Beauty Zone", growth: 89.7, category: "Kecantikan", newVendor: false },
    { name: "Sport Center", growth: 67.3, category: "Olahraga", newVendor: true },
    { name: "Home Decor", growth: 54.8, category: "Rumah Tangga", newVendor: false },
    { name: "Fashion Outlet", growth: 42.1, category: "Fashion", newVendor: false }
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Analytics</h1>
          <p className="text-muted-foreground">
            Analisis mendalam performa vendor dan tren platform
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">30 Hari Terakhir</SelectItem>
              <SelectItem value="last-3-months">3 Bulan Terakhir</SelectItem>
              <SelectItem value="last-6-months">6 Bulan Terakhir</SelectItem>
              <SelectItem value="last-year">1 Tahun Terakhir</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue per Vendor</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 5.2M</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span>dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Orders per Vendor</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">164</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.2%</span>
              <span>orders per vendor</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Vendor Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+0.3</span>
              <span>rating improvement</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Vendors This Month</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-2</span>
              <span>vs bulan lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Vendor Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Vendor Performance</CardTitle>
            <CardDescription>Revenue dan orders vendor terbaik</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendorPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value as number) : value,
                    name === 'revenue' ? 'Revenue' : 'Orders'
                  ]}
                />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Distribusi revenue berdasarkan kategori</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Growth Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Growth Trend</CardTitle>
          <CardDescription>Tren pertumbuhan revenue dan vendor bulanan</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'totalRevenue' ? formatCurrency(value as number) : 
                  name === 'avgOrder' ? formatCurrency(value as number) : value,
                  name === 'totalRevenue' ? 'Total Revenue' :
                  name === 'avgOrder' ? 'Avg Order Value' : 'Vendors'
                ]}
              />
              <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="vendors" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Fastest Growing Vendors */}
        <Card>
          <CardHeader>
            <CardTitle>Fastest Growing Vendors</CardTitle>
            <CardDescription>Vendor dengan pertumbuhan tertinggi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVendorsByGrowth.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium flex items-center space-x-2">
                        <span>{vendor.name}</span>
                        {vendor.newVendor && (
                          <Badge variant="secondary" className="text-xs">New</Badge>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">{vendor.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-500">+{vendor.growth}%</p>
                    <p className="text-xs text-muted-foreground">growth rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Performa setiap kategori produk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {category.vendors} vendors
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(category.revenue)}</p>
                      <p className="text-sm text-muted-foreground">{category.value}% share</p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${category.value}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
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

export default VendorAnalytics;