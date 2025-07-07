import { 
  TrendingUp, 
  TrendingDown, 
  Store, 
  Users, 
  DollarSign,
  ShoppingCart,
  Eye,
  UserPlus,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const SuperAdminDashboard = () => {
  const stats = [
    {
      title: "Total Revenue Platform",
      value: "Rp 156.8M",
      change: "+24.1%",
      trend: "up",
      icon: DollarSign,
      description: "dari bulan lalu"
    },
    {
      title: "Total Vendors",
      value: "156",
      change: "+12.5%",
      trend: "up", 
      icon: Store,
      description: "vendor aktif"
    },
    {
      title: "Total Users",
      value: "45,892",
      change: "+18.2%",
      trend: "up",
      icon: Users,
      description: "pengguna terdaftar"
    },
    {
      title: "Commission Earned",
      value: "Rp 7.8M",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
      description: "komisi bulan ini"
    },
  ];

  const pendingApprovals = [
    {
      id: "VND-001",
      vendorName: "TechMart Indonesia",
      category: "Elektronik",
      requestDate: "2024-01-15",
      documents: "Lengkap",
      status: "pending_review"
    },
    {
      id: "VND-002", 
      vendorName: "Fashion Zone",
      category: "Fashion",
      requestDate: "2024-01-14",
      documents: "Perlu Revisi",
      status: "need_revision"
    },
    {
      id: "VND-003",
      vendorName: "Home Living Store",
      category: "Rumah Tangga",
      requestDate: "2024-01-13",
      documents: "Lengkap",
      status: "pending_review"
    }
  ];

  const topVendors = [
    { name: "ElectroWorld", revenue: "Rp 12.5M", commission: "Rp 625K", growth: 15.2 },
    { name: "Fashion Hub", revenue: "Rp 8.9M", commission: "Rp 445K", growth: 12.8 },
    { name: "Gadget Store", revenue: "Rp 7.2M", commission: "Rp 360K", growth: 8.5 },
    { name: "Beauty Corner", revenue: "Rp 6.1M", commission: "Rp 305K", growth: 22.1 }
  ];

  const recentActivities = [
    {
      type: "vendor_approval",
      message: "Vendor 'SmartPhone Center' telah disetujui",
      time: "5 menit lalu",
      severity: "success"
    },
    {
      type: "commission_payout",
      message: "Commission payout Rp 2.3M telah diproses",
      time: "15 menit lalu", 
      severity: "info"
    },
    {
      type: "vendor_violation",
      message: "Vendor 'FakeStore' dilaporkan karena produk palsu",
      time: "1 jam lalu",
      severity: "warning"
    },
    {
      type: "system_alert",
      message: "High traffic detected - Auto scaling activated",
      time: "2 jam lalu",
      severity: "info"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending_review: "secondary",
      need_revision: "destructive",
      approved: "default"
    } as const;
    
    const labels = {
      pending_review: "Review",
      need_revision: "Perlu Revisi", 
      approved: "Disetujui"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "success": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "error": return "text-red-500";
      default: return "text-blue-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview dan kontrol penuh platform multivendor ShopEase
          </p>
        </div>
        <Button>
          <Eye className="mr-2 h-4 w-4" />
          Platform Analytics
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
        {/* Pending Vendor Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5" />
              Persetujuan Vendor Pending
            </CardTitle>
            <CardDescription>
              Vendor yang menunggu persetujuan untuk bergabung
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{vendor.vendorName}</p>
                      <p className="text-sm text-muted-foreground">
                        {vendor.category} • {vendor.requestDate}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dokumen: {vendor.documents}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    {getStatusBadge(vendor.status)}
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">Review</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Vendors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Top Performing Vendors
            </CardTitle>
            <CardDescription>
              Vendor dengan performa terbaik bulan ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVendors.map((vendor, index) => (
                <div key={vendor.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Revenue: {vendor.revenue} • Commission: {vendor.commission}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-500">
                        +{vendor.growth}%
                      </p>
                    </div>
                  </div>
                  <Progress value={vendor.growth * 2} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Platform Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Aktivitas Platform Terbaru
          </CardTitle>
          <CardDescription>
            Log aktivitas penting di platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                <div className={`w-2 h-2 rounded-full ${getSeverityColor(activity.severity)}`}></div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Detail
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <Store className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Vendor Management</h3>
            <p className="text-sm opacity-90 mb-3">Kelola semua vendor platform</p>
            <Button variant="secondary" size="sm">
              Kelola Vendor
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-secondary text-secondary-foreground">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Commission Settings</h3>
            <p className="text-sm opacity-90 mb-3">Atur komisi dan revenue</p>
            <Button variant="outline" size="sm">
              Atur Komisi
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-accent text-accent-foreground">
          <CardContent className="p-6 text-center">
            <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Platform Reports</h3>
            <p className="text-sm opacity-90 mb-3">Laporan lengkap platform</p>
            <Button variant="outline" size="sm">
              Lihat Laporan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;