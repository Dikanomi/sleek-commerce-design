import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, CreditCard, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const OrderSuccess = () => {
  // Mock order data - in real app this would come from API/state
  const orderData = {
    orderId: "ORD-2024-001234",
    orderDate: new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    }),
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
        title: "Headphone Wireless Premium Bluetooth 5.0",
        price: 299000,
        quantity: 2,
        image: "🎧"
      }
    ],
    shipping: {
      method: "Express (1-2 hari kerja)",
      cost: 25000,
      address: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110"
    },
    payment: {
      method: "BCA Virtual Account",
      total: 3123000,
      vaNumber: "1234567890123456"
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-success-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Pesanan Berhasil Dibuat!
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Terima kasih atas pesanan Anda
          </p>
          <p className="text-muted-foreground">
            Pesanan Anda dengan ID <span className="font-mono font-medium">{orderData.orderId}</span> telah berhasil dibuat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Detail Pesanan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Nomor Pesanan:</span>
                    <p className="font-mono font-medium">{orderData.orderId}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tanggal Pesanan:</span>
                    <p className="font-medium">{orderData.orderDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className="bg-warning text-warning-foreground">Menunggu Pembayaran</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estimasi Tiba:</span>
                    <p className="font-medium">{orderData.estimatedDelivery}</p>
                  </div>
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
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl">
                        {item.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.price)}</p>
                        <p className="text-sm text-muted-foreground">
                          Total: {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Informasi Pengiriman</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Metode Pengiriman:</span>
                  <p className="font-medium">{orderData.shipping.method}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Alamat Pengiriman:</span>
                  <p className="font-medium">{orderData.shipping.address}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Ongkos Kirim:</span>
                  <p className="font-medium">{formatPrice(orderData.shipping.cost)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment & Actions */}
          <div className="space-y-6">
            {/* Payment Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Instruksi Pembayaran</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-medium mb-2 text-warning-foreground">
                    Segera Lakukan Pembayaran
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Pesanan akan otomatis dibatalkan jika tidak dibayar dalam 24 jam
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Metode:</span>
                      <p className="font-medium">{orderData.payment.method}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Virtual Account:</span>
                      <p className="font-mono font-medium text-lg">{orderData.payment.vaNumber}</p>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        Salin Nomor
                      </Button>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Pembayaran:</span>
                      <p className="font-bold text-lg text-primary">
                        {formatPrice(orderData.payment.total)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Transfer tepat sesuai nominal di atas</p>
                  <p>• Pembayaran akan terverifikasi otomatis</p>
                  <p>• Simpan screenshot sebagai bukti pembayaran</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({orderData.items.length} produk)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ongkos Kirim</span>
                    <span>{formatPrice(orderData.shipping.cost)}</span>
                  </div>
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(orderData.payment.total)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              
              <Link to="/orders" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Lihat Status Pesanan
                </Button>
              </Link>
              
              <Link to="/" className="block">
                <Button variant="ghost" className="w-full">
                  Kembali ke Beranda
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Help */}
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Butuh bantuan?
                </p>
                <Button variant="link" size="sm" className="text-primary">
                  Hubungi Customer Service
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Tracking Timeline */}
        <Card className="mt-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Status Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-success-foreground" />
                </div>
                <p className="text-sm font-medium">Pesanan Dibuat</p>
                <p className="text-xs text-muted-foreground">Hari ini</p>
              </div>
              
              <div className="flex-1 h-0.5 bg-muted mx-4"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center mb-2">
                  <CreditCard className="w-6 h-6 text-warning-foreground" />
                </div>
                <p className="text-sm font-medium">Menunggu Pembayaran</p>
                <p className="text-xs text-muted-foreground">Dalam 24 jam</p>
              </div>
              
              <div className="flex-1 h-0.5 bg-muted mx-4"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Diproses</p>
                <p className="text-xs text-muted-foreground">Setelah bayar</p>
              </div>
              
              <div className="flex-1 h-0.5 bg-muted mx-4"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Dikirim</p>
                <p className="text-xs text-muted-foreground">1-2 hari kerja</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;