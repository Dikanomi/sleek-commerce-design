import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle, Clock, X, Eye, RotateCcw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock orders data
  const orders = [
    {
      id: "ORD-2024-001234",
      date: "2024-01-15",
      status: "delivered",
      total: 2798000,
      items: [
        {
          id: "1",
          title: "Smartphone Android RAM 8GB Storage 256GB",
          price: 2499000,
          quantity: 1,
          image: "📱"
        },
        {
          id: "2",
          title: "Headphone Wireless Premium",
          price: 299000,
          quantity: 1,
          image: "🎧"
        }
      ],
      shipping: {
        method: "Express",
        trackingNumber: "JNE1234567890",
        estimatedDelivery: "2024-01-17"
      }
    },
    {
      id: "ORD-2024-001235",
      date: "2024-01-20",
      status: "processing",
      total: 12999000,
      items: [
        {
          id: "3",
          title: "Laptop Gaming Intel i7 RAM 16GB",
          price: 12999000,
          quantity: 1,
          image: "💻"
        }
      ],
      shipping: {
        method: "Regular",
        trackingNumber: "",
        estimatedDelivery: "2024-01-25"
      }
    },
    {
      id: "ORD-2024-001236",
      date: "2024-01-22",
      status: "shipped",
      total: 599000,
      items: [
        {
          id: "4",
          title: "Wireless Mouse Gaming",
          price: 299000,
          quantity: 1,
          image: "🖱️"
        },
        {
          id: "5",
          title: "Mechanical Keyboard",
          price: 300000,
          quantity: 1,
          image: "⌨️"
        }
      ],
      shipping: {
        method: "Same Day",
        trackingNumber: "GOSEND123456",
        estimatedDelivery: "2024-01-22"
      }
    },
    {
      id: "ORD-2024-001237",
      date: "2024-01-25",
      status: "cancelled",
      total: 4299000,
      items: [
        {
          id: "6",
          title: "Sony WH-1000XM5 Headphones",
          price: 4299000,
          quantity: 1,
          image: "🎧"
        }
      ],
      shipping: {
        method: "Express",
        trackingNumber: "",
        estimatedDelivery: ""
      }
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "processing":
        return { label: "Diproses", variant: "secondary" as const, icon: Clock };
      case "shipped":
        return { label: "Dikirim", variant: "default" as const, icon: Truck };
      case "delivered":
        return { label: "Selesai", variant: "default" as const, icon: CheckCircle };
      case "cancelled":
        return { label: "Dibatalkan", variant: "destructive" as const, icon: X };
      default:
        return { label: "Unknown", variant: "secondary" as const, icon: Clock };
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderCounts = {
    all: orders.length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pesanan Saya</h1>
        <p className="text-muted-foreground">Kelola dan pantau status pesanan Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{orderCounts.all}</div>
            <div className="text-sm text-muted-foreground">Total Pesanan</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{orderCounts.processing}</div>
            <div className="text-sm text-muted-foreground">Diproses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{orderCounts.shipped}</div>
            <div className="text-sm text-muted-foreground">Dikirim</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{orderCounts.delivered}</div>
            <div className="text-sm text-muted-foreground">Selesai</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari pesanan atau produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="processing">Diproses</SelectItem>
                <SelectItem value="shipped">Dikirim</SelectItem>
                <SelectItem value="delivered">Selesai</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tidak ada pesanan ditemukan</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== "all" 
                  ? "Coba ubah filter atau kata kunci pencarian"
                  : "Anda belum memiliki pesanan"
                }
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Link to="/">
                  <Button>Mulai Belanja</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Dipesan pada {formatDate(order.date)}
                      </p>
                    </div>
                    <Badge variant={statusInfo.variant} className="flex items-center space-x-1">
                      <StatusIcon className="w-4 h-4" />
                      <span>{statusInfo.label}</span>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl">
                          {item.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium line-clamp-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Info */}
                  {order.shipping.trackingNumber && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium">Nomor Resi: </span>
                          <span className="font-mono">{order.shipping.trackingNumber}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Truck className="w-4 h-4 mr-1" />
                          Lacak
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Order Total & Actions */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <span className="text-sm text-muted-foreground">Total: </span>
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/orders/${order.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          Detail
                        </Link>
                      </Button>
                      
                      {order.status === "delivered" && (
                        <>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Beli Lagi
                          </Button>
                        </>
                      )}
                      
                      {order.status === "processing" && (
                        <Button variant="outline" size="sm">
                          <X className="w-4 h-4 mr-1" />
                          Batalkan
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Load More */}
      {filteredOrders.length > 0 && (
        <div className="text-center">
          <Button variant="outline">
            Muat Lebih Banyak
          </Button>
        </div>
      )}
    </div>
  );
};

export default Orders;