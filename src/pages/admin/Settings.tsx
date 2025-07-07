import { useState } from "react";
import { Save, User, Store, Bell, Shield, Globe, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Pengaturan Disimpan",
      description: "Semua perubahan telah berhasil disimpan.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pengaturan Admin</h1>
          <p className="text-muted-foreground">
            Kelola pengaturan toko dan sistem Anda
          </p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Store Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="h-5 w-5" />
              <span>Informasi Toko</span>
            </CardTitle>
            <CardDescription>
              Pengaturan dasar informasi toko Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Nama Toko</Label>
              <Input id="store-name" defaultValue="ShopEase" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-description">Deskripsi Toko</Label>
              <Textarea 
                id="store-description" 
                defaultValue="Toko online terpercaya dengan beragam produk berkualitas"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-email">Email Kontak</Label>
              <Input id="store-email" type="email" defaultValue="admin@shopease.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-phone">Nomor Telepon</Label>
              <Input id="store-phone" defaultValue="+62 21 1234 5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-address">Alamat Toko</Label>
              <Textarea 
                id="store-address" 
                defaultValue="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Admin Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profil Admin</span>
            </CardTitle>
            <CardDescription>
              Informasi akun administrator
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-name">Nama Lengkap</Label>
              <Input id="admin-name" defaultValue="Admin ShopEase" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email Admin</Label>
              <Input id="admin-email" type="email" defaultValue="admin@shopease.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-role">Role</Label>
              <Select defaultValue="super-admin">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status Akun</Label>
              <div className="flex items-center space-x-2">
                <Badge variant="default">Aktif</Badge>
                <Badge variant="secondary">Terverifikasi</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Pengaturan Notifikasi</span>
            </CardTitle>
            <CardDescription>
              Kelola preferensi notifikasi sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Pesanan Baru</Label>
                <p className="text-sm text-muted-foreground">
                  Terima notifikasi saat ada pesanan baru
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Stok Rendah</Label>
                <p className="text-sm text-muted-foreground">
                  Peringatan saat stok produk hampir habis
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Laporan Harian</Label>
                <p className="text-sm text-muted-foreground">
                  Ringkasan aktivitas harian via email
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Aktivitas Mencurigakan</Label>
                <p className="text-sm text-muted-foreground">
                  Alert untuk aktivitas keamanan
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Keamanan</span>
            </CardTitle>
            <CardDescription>
              Pengaturan keamanan dan akses sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan autentikasi dua faktor
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Timeout Sesi (menit)</Label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 menit</SelectItem>
                  <SelectItem value="60">60 menit</SelectItem>
                  <SelectItem value="120">2 jam</SelectItem>
                  <SelectItem value="480">8 jam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Login Log</Label>
                <p className="text-sm text-muted-foreground">
                  Simpan riwayat login admin
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan mode maintenance
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Pengaturan Sistem</span>
            </CardTitle>
            <CardDescription>
              Konfigurasi sistem dan performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Zona Waktu</Label>
              <Select defaultValue="asia-jakarta">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-jakarta">Asia/Jakarta (WIB)</SelectItem>
                  <SelectItem value="asia-makassar">Asia/Makassar (WITA)</SelectItem>
                  <SelectItem value="asia-jayapura">Asia/Jayapura (WIT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Mata Uang</Label>
              <Select defaultValue="idr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idr">IDR (Rupiah)</SelectItem>
                  <SelectItem value="usd">USD (Dollar)</SelectItem>
                  <SelectItem value="eur">EUR (Euro)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Bahasa Default</Label>
              <Select defaultValue="id">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Backup otomatis database harian
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Pengaturan Email</span>
            </CardTitle>
            <CardDescription>
              Konfigurasi server email dan template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input id="smtp-host" defaultValue="smtp.gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input id="smtp-port" defaultValue="587" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-user">SMTP Username</Label>
              <Input id="smtp-user" defaultValue="noreply@shopease.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-name">Nama Pengirim</Label>
              <Input id="from-name" defaultValue="ShopEase" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SSL/TLS</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan enkripsi email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;