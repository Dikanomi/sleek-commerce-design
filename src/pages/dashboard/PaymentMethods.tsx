import { useState } from "react";
import { Plus, Edit, Trash2, CreditCard, Smartphone, Building, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface PaymentMethod {
  id: string;
  type: "bank" | "ewallet" | "credit_card";
  name: string;
  details: string;
  isDefault: boolean;
  isActive: boolean;
  addedDate: string;
  lastUsed?: string;
  icon: string;
}

const PaymentMethods = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "bank",
      name: "BCA",
      details: "•••• •••• •••• 1234",
      isDefault: true,
      isActive: true,
      addedDate: "2024-01-15",
      lastUsed: "2024-01-25",
      icon: "🏦"
    },
    {
      id: "2",
      type: "ewallet",
      name: "OVO",
      details: "081234567890",
      isDefault: false,
      isActive: true,
      addedDate: "2024-01-10",
      lastUsed: "2024-01-20",
      icon: "💰"
    },
    {
      id: "3",
      type: "credit_card",
      name: "Visa",
      details: "•••• •••• •••• 5678",
      isDefault: false,
      isActive: false,
      addedDate: "2024-01-05",
      icon: "💳"
    }
  ]);

  const [formData, setFormData] = useState({
    type: "",
    name: "",
    accountNumber: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    holderName: ""
  });

  const paymentTypes = {
    bank: {
      label: "Virtual Account Bank",
      icon: Building,
      providers: ["BCA", "Mandiri", "BNI", "BRI", "CIMB Niaga", "Permata"],
      fields: ["name", "accountNumber"]
    },
    ewallet: {
      label: "E-Wallet",
      icon: Smartphone,
      providers: ["OVO", "GoPay", "DANA", "LinkAja", "ShopeePay"],
      fields: ["name", "phone"]
    },
    credit_card: {
      label: "Kartu Kredit/Debit",
      icon: CreditCard,
      providers: ["Visa", "Mastercard", "JCB", "American Express"],
      fields: ["name", "cardNumber", "expiryDate", "holderName"]
    }
  };

  const getTypeIcon = (type: string) => {
    return paymentTypes[type as keyof typeof paymentTypes]?.icon || CreditCard;
  };

  const getTypeLabel = (type: string) => {
    return paymentTypes[type as keyof typeof paymentTypes]?.label || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const resetForm = () => {
    setFormData({
      type: "",
      name: "",
      accountNumber: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      holderName: ""
    });
    setSelectedType("");
  };

  const handleSave = () => {
    if (editingId) {
      // Update existing payment method
      setPaymentMethods(prev => prev.map(method => 
        method.id === editingId 
          ? {
              ...method,
              type: formData.type as any,
              name: formData.name,
              details: formData.type === "ewallet" 
                ? formData.phone 
                : formData.type === "credit_card" 
                  ? `•••• •••• •••• ${formData.cardNumber.slice(-4)}`
                  : `•••• •••• •••• ${formData.accountNumber.slice(-4)}`,
              icon: formData.type === "bank" ? "🏦" : formData.type === "ewallet" ? "💰" : "💳"
            }
          : method
      ));
    } else {
      // Add new payment method
      const newPaymentMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: formData.type as any,
        name: formData.name,
        details: formData.type === "ewallet" 
          ? formData.phone 
          : formData.type === "credit_card" 
            ? `•••• •••• •••• ${formData.cardNumber.slice(-4)}`
            : `•••• •••• •••• ${formData.accountNumber.slice(-4)}`,
        isDefault: paymentMethods.length === 0,
        isActive: true,
        addedDate: new Date().toISOString().split('T')[0],
        icon: formData.type === "bank" ? "🏦" : formData.type === "ewallet" ? "💰" : "💳"
      };
      
      setPaymentMethods(prev => [...prev, newPaymentMethod]);
    }
    setIsDialogOpen(false);
    resetForm();
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleToggleActive = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === id 
          ? { ...method, isActive: !method.isActive }
          : method
      )
    );
  };

  const openAddDialog = () => {
    resetForm();
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (method: PaymentMethod) => {
    setEditingId(method.id);
    setSelectedType(method.type);
    setFormData({
      type: method.type,
      name: method.name,
      accountNumber: method.type === "bank" ? method.details.replace(/[•\s]/g, '') : "",
      phone: method.type === "ewallet" ? method.details : "",
      cardNumber: method.type === "credit_card" ? method.details.replace(/[•\s]/g, '') : "",
      expiryDate: "",
      holderName: ""
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Metode Pembayaran</h1>
          <p className="text-muted-foreground">Kelola metode pembayaran untuk kemudahan transaksi</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Metode Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Tambah"} Metode Pembayaran</DialogTitle>
              <DialogDescription>
                Pilih jenis pembayaran dan isi detail yang diperlukan
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Payment Type Selection */}
              <div className="space-y-2">
                <Label>Jenis Pembayaran</Label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(paymentTypes).map(([key, type]) => {
                    const Icon = type.icon;
                    return (
                      <Button
                        key={key}
                        variant={selectedType === key ? "default" : "outline"}
                        className="justify-start h-auto p-3"
                        onClick={() => {
                          setSelectedType(key);
                          setFormData({...formData, type: key});
                        }}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        <span>{type.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Provider Selection */}
              {selectedType && (
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Select value={formData.name} onValueChange={(value) => setFormData({...formData, name: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTypes[selectedType as keyof typeof paymentTypes]?.providers.map((provider) => (
                        <SelectItem key={provider} value={provider}>
                          {provider}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Dynamic Fields */}
              {selectedType && formData.name && (
                <div className="space-y-4">
                  {selectedType === "bank" && (
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Nomor Rekening</Label>
                      <Input
                        id="accountNumber"
                        placeholder="1234567890"
                        value={formData.accountNumber}
                        onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                      />
                    </div>
                  )}

                  {selectedType === "ewallet" && (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        placeholder="081234567890"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  )}

                  {selectedType === "credit_card" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Nomor Kartu</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Masa Berlaku</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="holderName">Nama Pemegang</Label>
                          <Input
                            id="holderName"
                            placeholder="John Doe"
                            value={formData.holderName}
                            onChange={(e) => setFormData({...formData, holderName: e.target.value})}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!formData.type || !formData.name || 
                  (selectedType === "bank" && !formData.accountNumber) ||
                  (selectedType === "ewallet" && !formData.phone) ||
                  (selectedType === "credit_card" && (!formData.cardNumber || !formData.expiryDate || !formData.holderName))
                }
              >
                Simpan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Methods List */}
      {paymentMethods.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CreditCard className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Belum ada metode pembayaran</h3>
            <p className="text-muted-foreground mb-6">
              Tambahkan metode pembayaran untuk mempercepat proses checkout
            </p>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Metode Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => {
            const TypeIcon = getTypeIcon(method.type);
            
            return (
              <Card key={method.id} className={`${method.isDefault ? 'ring-2 ring-primary' : ''} ${!method.isActive ? 'opacity-60' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                        <span className="text-xl">{method.icon}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{method.name}</h3>
                          {method.isDefault && (
                            <Badge variant="default">Utama</Badge>
                          )}
                          {!method.isActive && (
                            <Badge variant="secondary">Nonaktif</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{getTypeLabel(method.type)}</p>
                        <p className="font-mono text-sm">{method.details}</p>
                        
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>Ditambahkan {formatDate(method.addedDate)}</span>
                          {method.lastUsed && (
                            <span>• Terakhir digunakan {formatDate(method.lastUsed)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={method.isActive}
                          onCheckedChange={() => handleToggleActive(method.id)}
                        />
                        <span className="text-sm text-muted-foreground">Aktif</span>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEditDialog(method)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(method.id)}
                        disabled={method.isDefault}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {!method.isDefault && method.isActive && (
                    <div className="mt-4 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Jadikan Metode Utama
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Security Info */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-success mt-1" />
            <div>
              <h3 className="font-semibold mb-2">🔒 Keamanan Pembayaran</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Semua data pembayaran dienkripsi dengan standar SSL 256-bit</li>
                <li>• Kami tidak menyimpan informasi sensitif seperti CVV kartu kredit</li>
                <li>• Metode pembayaran dapat diaktifkan/nonaktifkan kapan saja</li>
                <li>• Transaksi dimonitor 24/7 untuk deteksi aktivitas mencurigakan</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethods;