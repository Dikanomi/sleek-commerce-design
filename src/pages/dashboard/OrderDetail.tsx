import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, Calendar, CreditCard, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const OrderDetail = () => {
  const { orderId } = useParams();

  // Mock order data - in production this would be fetched based on orderId
  const order = {
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
        image: "📱",
        sku: "SPH-001"
      },
      {
        id: "2",
        title: "Headphone Wireless Premium",
        price: 299000,
        quantity: 1,
        image: "🎧",
        sku: "HPH-002"
      }
    ],
    shipping: {
      method: "Express",
      trackingNumber: "JNE1234567890",
      estimatedDelivery: "2024-01-17",
      address: {
        name: "John Doe",
        phone: "081234567890",
        street: "Jl. Sudirman No. 123",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
        postalCode: "12190"
      },
      cost: 0
    },
    payment: {
      method: "Bank Transfer - BCA",
      accountNumber: "•••• •••• •••• 1234",
      date: "2024-01-15",
      status: "Lunas"
    },
    timeline: [
      { date: "2024-01-17", status: "Pesanan diterima", icon: CheckCircle, completed: true },
      { date: "2024-01-16", status: "Dalam pengiriman", icon: Truck, completed: true },
      { date: "2024-01-15", status: "Pesanan diproses", icon: Package, completed: true },
      { date: "2024-01-15", status: "Pembayaran dikonfirmasi", icon: CreditCard, completed: true }
    ]
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
      delivered: { label: "Selesai", variant: "default" },
      processing: { label: "Diproses", variant: "secondary" },
      shipped: { label: "Dikirim", variant: "default" },
      cancelled: { label: "Dibatalkan", variant: "destructive" }
    };
    const config = statusConfig[status] || { label: status, variant: "secondary" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard/orders">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Detail Pesanan</h1>
            <p className="text-muted-foreground">{order.id}</p>
          </div>
        </div>
        {getStatusBadge(order.status)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.timeline.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${event.completed ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {event.status}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(event.date)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Produk yang Dipesan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-right font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Informasi Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Kurir</p>
                <p className="font-medium">{order.shipping.method}</p>
              </div>
              {order.shipping.trackingNumber && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nomor Resi</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono font-medium">{order.shipping.trackingNumber}</p>
                    <Button variant="outline" size="sm">
                      Lacak Paket
                    </Button>
                  </div>
                </div>
              )}
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Alamat Pengiriman
                </p>
                <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                  <p className="font-medium">{order.shipping.address.name}</p>
                  <p className="text-sm flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {order.shipping.address.phone}
                  </p>
                  <p className="text-sm">{order.shipping.address.street}</p>
                  <p className="text-sm">
                    {order.shipping.address.city}, {order.shipping.address.province}
                  </p>
                  <p className="text-sm">{order.shipping.address.postalCode}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Tanggal Pesanan
                </span>
                <span className="font-medium">{formatDate(order.date)}</span>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ongkir</span>
                  <span className="text-success">Gratis</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg text-primary">
                  {formatPrice(order.total)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Informasi Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Metode Pembayaran</p>
                <p className="font-medium">{order.payment.method}</p>
                <p className="font-mono text-sm">{order.payment.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status Pembayaran</p>
                <Badge variant="default" className="mt-1">{order.payment.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal Pembayaran</p>
                <p className="text-sm">{formatDate(order.payment.date)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link to="/help">Butuh Bantuan?</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
