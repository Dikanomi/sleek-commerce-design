import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [shippingData, setShippingData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");

  // Mock cart data - in real app this would come from context/state
  const cartItems = [
    {
      id: "cart1",
      title: "Smartphone Android RAM 8GB Storage 256GB",
      price: 2499000,
      quantity: 1,
      image: "/api/placeholder/80/80"
    },
    {
      id: "cart2", 
      title: "Headphone Wireless Premium Bluetooth 5.0",
      price: 299000,
      quantity: 2,
      image: "/api/placeholder/80/80"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === "regular" ? 15000 : shippingMethod === "express" ? 25000 : 0;
  const adminFee = paymentMethod.includes("bank") ? 0 : 2500;
  const total = subtotal + shippingCost + adminFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    navigate("/order-success");
  };

  const provinces = [
    "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Sumatera Utara",
    "Sumatera Barat", "Riau", "Lampung", "Banten", "DIY Yogyakarta",
    "Bali", "Kalimantan Timur", "Sulawesi Selatan", "Papua"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/cart")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Keranjang
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {stepNumber}
                </div>
                <span className="ml-2 text-sm font-medium">
                  {stepNumber === 1 && "Alamat"}
                  {stepNumber === 2 && "Pengiriman"}
                  {stepNumber === 3 && "Pembayaran"}
                </span>
                {stepNumber < 3 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    step > stepNumber ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Alamat Pengiriman</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nama Lengkap *</Label>
                      <Input
                        id="fullName"
                        value={shippingData.fullName}
                        onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingData.email}
                      onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Alamat Lengkap *</Label>
                    <Textarea
                      id="address"
                      value={shippingData.address}
                      onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                      placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="province">Provinsi *</Label>
                      <Select value={shippingData.province} onValueChange={(value) => setShippingData({...shippingData, province: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih provinsi" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="city">Kota/Kabupaten *</Label>
                      <Input
                        id="city"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                        placeholder="Nama kota/kabupaten"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Kode Pos</Label>
                      <Input
                        id="postalCode"
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Catatan untuk Kurir (Opsional)</Label>
                    <Textarea
                      id="notes"
                      value={shippingData.notes}
                      onChange={(e) => setShippingData({...shippingData, notes: e.target.value})}
                      placeholder="Patokan alamat atau instruksi khusus"
                      rows={2}
                    />
                  </div>

                  <Button 
                    onClick={handleNextStep} 
                    className="w-full"
                    disabled={!shippingData.fullName || !shippingData.phone || !shippingData.address || !shippingData.province || !shippingData.city}
                  >
                    Lanjut ke Pengiriman
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping Method */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Metode Pengiriman</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                      <RadioGroupItem value="regular" id="regular" />
                      <div className="flex-1">
                        <Label htmlFor="regular" className="font-medium cursor-pointer">
                          Reguler (3-5 hari kerja)
                        </Label>
                        <p className="text-sm text-muted-foreground">Pengiriman standar</p>
                      </div>
                      <span className="font-medium">{formatPrice(15000)}</span>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                      <RadioGroupItem value="express" id="express" />
                      <div className="flex-1">
                        <Label htmlFor="express" className="font-medium cursor-pointer">
                          Express (1-2 hari kerja)
                        </Label>
                        <p className="text-sm text-muted-foreground">Pengiriman cepat</p>
                      </div>
                      <span className="font-medium">{formatPrice(25000)}</span>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                      <RadioGroupItem value="same-day" id="same-day" />
                      <div className="flex-1">
                        <Label htmlFor="same-day" className="font-medium cursor-pointer">
                          Same Day (Hari ini)
                        </Label>
                        <p className="text-sm text-muted-foreground">Khusus Jakarta, Bekasi, Depok</p>
                      </div>
                      <span className="font-medium text-success">GRATIS</span>
                    </div>
                  </RadioGroup>

                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={handlePreviousStep} className="flex-1">
                      Kembali
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1" disabled={!shippingMethod}>
                      Lanjut ke Pembayaran
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Metode Pembayaran</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    {/* Bank Transfer */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Transfer Bank</h4>
                      
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                        <RadioGroupItem value="bca" id="bca" />
                        <div className="flex-1">
                          <Label htmlFor="bca" className="font-medium cursor-pointer">
                            BCA Virtual Account
                          </Label>
                          <p className="text-sm text-muted-foreground">Bayar melalui m-BCA, KlikBCA, atau ATM</p>
                        </div>
                        <span className="text-success font-medium">Gratis</span>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                        <RadioGroupItem value="mandiri" id="mandiri" />
                        <div className="flex-1">
                          <Label htmlFor="mandiri" className="font-medium cursor-pointer">
                            Mandiri Virtual Account
                          </Label>
                          <p className="text-sm text-muted-foreground">Bayar melalui Livin', ATM, atau internet banking</p>
                        </div>
                        <span className="text-success font-medium">Gratis</span>
                      </div>
                    </div>

                    {/* E-Wallet */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">E-Wallet</h4>
                      
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                        <RadioGroupItem value="ovo" id="ovo" />
                        <div className="flex-1">
                          <Label htmlFor="ovo" className="font-medium cursor-pointer">
                            OVO
                          </Label>
                          <p className="text-sm text-muted-foreground">Bayar dengan saldo OVO</p>
                        </div>
                        <span className="font-medium">{formatPrice(2500)}</span>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                        <RadioGroupItem value="gopay" id="gopay" />
                        <div className="flex-1">
                          <Label htmlFor="gopay" className="font-medium cursor-pointer">
                            GoPay
                          </Label>
                          <p className="text-sm text-muted-foreground">Bayar dengan saldo GoPay</p>
                        </div>
                        <span className="font-medium">{formatPrice(2500)}</span>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                        <RadioGroupItem value="dana" id="dana" />
                        <div className="flex-1">
                          <Label htmlFor="dana" className="font-medium cursor-pointer">
                            DANA
                          </Label>
                          <p className="text-sm text-muted-foreground">Bayar dengan saldo DANA</p>
                        </div>
                        <span className="font-medium">{formatPrice(2500)}</span>
                      </div>
                    </div>

                    {/* COD */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Bayar di Tempat</h4>
                      
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                        <RadioGroupItem value="cod" id="cod" />
                        <div className="flex-1">
                          <Label htmlFor="cod" className="font-medium cursor-pointer">
                            Cash on Delivery (COD)
                          </Label>
                          <p className="text-sm text-muted-foreground">Bayar tunai saat barang diterima</p>
                        </div>
                        <span className="font-medium">{formatPrice(5000)}</span>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={handlePreviousStep} className="flex-1">
                      Kembali
                    </Button>
                    <Button 
                      onClick={handlePlaceOrder} 
                      className="flex-1" 
                      disabled={!paymentMethod || isLoading}
                    >
                      {isLoading ? "Memproses..." : "Buat Pesanan"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-xs">📱</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} produk)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {step >= 2 && shippingMethod && (
                    <div className="flex justify-between">
                      <span>Ongkos Kirim</span>
                      <span className={shippingCost === 0 ? "text-success" : ""}>
                        {shippingCost === 0 ? "GRATIS" : formatPrice(shippingCost)}
                      </span>
                    </div>
                  )}

                  {step >= 3 && paymentMethod && adminFee > 0 && (
                    <div className="flex justify-between">
                      <span>Biaya Admin</span>
                      <span>{formatPrice(adminFee)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>

                {/* Shipping Info */}
                {step >= 1 && shippingData.fullName && (
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <p className="font-medium mb-1">Dikirim ke:</p>
                    <p>{shippingData.fullName}</p>
                    <p className="text-muted-foreground">
                      {shippingData.city}, {shippingData.province}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;