import { useState } from "react";
import { Plus, Edit, Trash2, MapPin, Home, Building, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
  type: "home" | "office" | "other";
  notes?: string;
}

const Addresses = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "Rumah",
      name: "Budi Santoso",
      phone: "+62 812 3456 7890",
      address: "Jl. Sudirman No. 123, RT 001/RW 002, Kelurahan Tanah Abang",
      city: "Jakarta Pusat",
      province: "DKI Jakarta",
      postalCode: "10110",
      isDefault: true,
      type: "home",
      notes: "Rumah cat biru, pagar putih"
    },
    {
      id: "2",
      label: "Kantor",
      name: "Budi Santoso",
      phone: "+62 812 3456 7890",
      address: "Menara BCA, Jl. MH Thamrin No. 1, Lantai 15",
      city: "Jakarta Pusat",
      province: "DKI Jakarta",
      postalCode: "10310",
      isDefault: false,
      type: "office",
      notes: "Jam kerja 09:00-17:00"
    }
  ]);

  const [formData, setFormData] = useState<Partial<Address>>({
    label: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    type: "home",
    notes: ""
  });

  const provinces = [
    "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Sumatera Utara",
    "Sumatera Barat", "Riau", "Lampung", "Banten", "DIY Yogyakarta",
    "Bali", "Kalimantan Timur", "Sulawesi Selatan", "Papua"
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "home": return Home;
      case "office": return Building;
      default: return MapPin;
    }
  };

  const resetForm = () => {
    setFormData({
      label: "",
      name: "",
      phone: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      type: "home",
      notes: ""
    });
    setEditingAddress(null);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData(address);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => 
        prev.map(addr => 
          addr.id === editingAddress.id 
            ? { ...formData, id: editingAddress.id } as Address
            : addr
        )
      );
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString(),
        isDefault: addresses.length === 0
      } as Address;
      setAddresses(prev => [...prev, newAddress]);
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alamat Saya</h1>
          <p className="text-muted-foreground">Kelola alamat pengiriman untuk pemesanan Anda</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Alamat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Alamat" : "Tambah Alamat Baru"}
              </DialogTitle>
              <DialogDescription>
                Masukkan detail alamat pengiriman dengan lengkap
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Label Alamat *</Label>
                  <Input
                    id="label"
                    placeholder="Rumah, Kantor, dll"
                    value={formData.label || ""}
                    onChange={(e) => setFormData({...formData, label: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Rumah</SelectItem>
                      <SelectItem value="office">Kantor</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Penerima *</Label>
                  <Input
                    id="name"
                    placeholder="Nama lengkap"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon *</Label>
                  <Input
                    id="phone"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat Lengkap *</Label>
                <Textarea
                  id="address"
                  placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                  value={formData.address || ""}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="province">Provinsi *</Label>
                  <Select value={formData.province} onValueChange={(value) => setFormData({...formData, province: value})}>
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
                <div className="space-y-2">
                  <Label htmlFor="city">Kota/Kabupaten *</Label>
                  <Input
                    id="city"
                    placeholder="Nama kota"
                    value={formData.city || ""}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Kode Pos</Label>
                  <Input
                    id="postalCode"
                    placeholder="12345"
                    value={formData.postalCode || ""}
                    onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan (Opsional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Patokan alamat atau instruksi khusus untuk kurir"
                  value={formData.notes || ""}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!formData.label || !formData.name || !formData.phone || !formData.address || !formData.city || !formData.province}
              >
                {editingAddress ? "Update" : "Simpan"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Address Cards */}
      {addresses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Belum ada alamat tersimpan</h3>
            <p className="text-muted-foreground mb-6">
              Tambahkan alamat untuk mempercepat proses checkout
            </p>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Alamat Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => {
            const TypeIcon = getTypeIcon(address.type);
            
            return (
              <Card key={address.id} className={`relative ${address.isDefault ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{address.label}</CardTitle>
                      {address.isDefault && (
                        <Badge variant="default" className="flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>Utama</span>
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(address)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(address.id)}
                        disabled={address.isDefault}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">{address.name}</p>
                    <p className="text-sm text-muted-foreground">{address.phone}</p>
                  </div>
                  
                  <div className="text-sm">
                    <p>{address.address}</p>
                    <p>{address.city}, {address.province} {address.postalCode}</p>
                  </div>
                  
                  {address.notes && (
                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      <strong>Catatan:</strong> {address.notes}
                    </div>
                  )}
                  
                  {!address.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Jadikan Alamat Utama
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Tips */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">💡 Tips Alamat</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Pastikan nama penerima sesuai dengan yang akan menerima paket</li>
            <li>• Sertakan patokan jelas agar kurir mudah menemukan lokasi</li>
            <li>• Alamat utama akan dipilih secara otomatis saat checkout</li>
            <li>• Simpan alamat kantor untuk kemudahan pengiriman di hari kerja</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Addresses;