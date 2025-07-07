import { useState } from "react";
import { Bell, Mail, MessageSquare, Package, Heart, Star, Settings, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NotificationSetting {
  id: string;
  category: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface Notification {
  id: string;
  type: "order" | "promo" | "wishlist" | "review" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  action?: {
    label: string;
    url: string;
  };
}

const Notifications = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "1",
      category: "Pesanan",
      title: "Status pesanan",
      description: "Notifikasi saat pesanan diproses, dikirim, atau diterima",
      email: true,
      push: true,
      sms: false
    },
    {
      id: "2",
      category: "Pesanan",
      title: "Pembayaran",
      description: "Konfirmasi pembayaran dan pengingat jika belum dibayar",
      email: true,
      push: true,
      sms: true
    },
    {
      id: "3",
      category: "Promo",
      title: "Flash sale & penawaran khusus",
      description: "Notifikasi promo terbaru dan flash sale",
      email: true,
      push: false,
      sms: false
    },
    {
      id: "4",
      category: "Promo",
      title: "Rekomendasi produk",
      description: "Saran produk berdasarkan riwayat belanja",
      email: false,
      push: true,
      sms: false
    },
    {
      id: "5",
      category: "Wishlist",
      title: "Perubahan harga",
      description: "Notifikasi jika harga produk wishlist turun",
      email: true,
      push: true,
      sms: false
    },
    {
      id: "6",
      category: "Wishlist",
      title: "Stok tersedia",
      description: "Notifikasi jika produk wishlist kembali tersedia",
      email: true,
      push: true,
      sms: false
    },
    {
      id: "7",
      category: "Review",
      title: "Pengingat review",
      description: "Pengingat untuk memberikan review setelah pembelian",
      email: true,
      push: false,
      sms: false
    },
    {
      id: "8",
      category: "Akun",
      title: "Keamanan akun",
      description: "Notifikasi login dari perangkat baru dan perubahan password",
      email: true,
      push: true,
      sms: true
    },
    {
      id: "9",
      category: "Akun",
      title: "Newsletter mingguan",
      description: "Ringkasan aktivitas dan promo mingguan",
      email: false,
      push: false,
      sms: false
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      type: "order",
      title: "Pesanan Sedang Dikirim",
      message: "Pesanan ORD-2024-001234 sedang dalam perjalanan. Estimasi tiba besok pukul 14:00.",
      timestamp: "2024-01-25T10:30:00Z",
      isRead: false,
      action: {
        label: "Lacak Pesanan",
        url: "/dashboard/orders"
      }
    },
    {
      id: "n2",
      type: "promo",
      title: "Flash Sale 70% OFF!",
      message: "Jangan lewatkan flash sale smartphone premium. Hanya 2 jam lagi!",
      timestamp: "2024-01-25T09:15:00Z",
      isRead: false,
      action: {
        label: "Lihat Promo",
        url: "/"
      }
    },
    {
      id: "n3",
      type: "wishlist",
      title: "Harga Turun!",
      message: "MacBook Air M2 di wishlist Anda turun harga Rp 2.000.000. Buruan checkout!",
      timestamp: "2024-01-24T16:45:00Z",
      isRead: true,
      action: {
        label: "Lihat Produk",
        url: "/dashboard/wishlist"
      }
    },
    {
      id: "n4",
      type: "review",
      title: "Bagaimana pengalaman Anda?",
      message: "Anda sudah menerima pesanan Headphone Sony. Berikan review untuk membantu pembeli lain!",
      timestamp: "2024-01-24T14:20:00Z",
      isRead: true
    },
    {
      id: "n5",
      type: "system",
      title: "Pembaruan Kebijakan Privasi",
      message: "Kami telah memperbarui kebijakan privasi. Silakan baca perubahan terbaru.",
      timestamp: "2024-01-23T10:00:00Z",
      isRead: true
    }
  ]);

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    startTime: "22:00",
    endTime: "07:00"
  });

  const [frequency, setFrequency] = useState("instant");

  const updateSetting = (id: string, channel: 'email' | 'push' | 'sms', value: boolean) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, [channel]: value }
          : setting
      )
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order": return Package;
      case "promo": return Star;
      case "wishlist": return Heart;
      case "review": return MessageSquare;
      case "system": return Settings;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "order": return "bg-blue-100 text-blue-800";
      case "promo": return "bg-orange-100 text-orange-800";
      case "wishlist": return "bg-pink-100 text-pink-800";
      case "review": return "bg-green-100 text-green-800";
      case "system": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Baru saja";
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    if (diffInHours < 48) return "Kemarin";
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, NotificationSetting[]>);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifikasi</h1>
          <p className="text-muted-foreground">Kelola preferensi notifikasi dan lihat aktivitas terbaru</p>
        </div>
        
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Tandai Semua Dibaca ({unreadCount})
          </Button>
        )}
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifikasi {unreadCount > 0 && `(${unreadCount})`}</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Pengaturan</span>
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tidak ada notifikasi</h3>
                <p className="text-muted-foreground">Semua notifikasi akan muncul di sini</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <Card 
                  key={notification.id} 
                  className={`transition-all cursor-pointer ${
                    !notification.isRead ? 'bg-muted/30 border-primary/20' : 'hover:shadow-md'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <div className="flex items-center space-x-2">
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-2">
                          {notification.message}
                        </p>
                        
                        {notification.action && (
                          <Button variant="link" size="sm" className="p-0 h-auto">
                            {notification.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* Quiet Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {quietHours.enabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                <span>Jam Sunyi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Aktifkan Jam Sunyi</Label>
                  <p className="text-sm text-muted-foreground">
                    Nonaktifkan notifikasi push pada jam tertentu
                  </p>
                </div>
                <Switch
                  checked={quietHours.enabled}
                  onCheckedChange={(checked) => setQuietHours({...quietHours, enabled: checked})}
                />
              </div>
              
              {quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mulai</Label>
                    <Select value={quietHours.startTime} onValueChange={(value) => setQuietHours({...quietHours, startTime: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 24}, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Selesai</Label>
                    <Select value={quietHours.endTime} onValueChange={(value) => setQuietHours({...quietHours, endTime: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 24}, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Frequency */}
          <Card>
            <CardHeader>
              <CardTitle>Frekuensi Notifikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Kapan Anda ingin menerima notifikasi email?</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Langsung</SelectItem>
                    <SelectItem value="daily">Ringkasan Harian</SelectItem>
                    <SelectItem value="weekly">Ringkasan Mingguan</SelectItem>
                    <SelectItem value="never">Tidak Pernah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings by Category */}
          {Object.entries(groupedSettings).map(([category, categorySettings]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {categorySettings.map((setting) => (
                    <div key={setting.id} className="space-y-3">
                      <div>
                        <h4 className="font-medium">{setting.title}</h4>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={setting.email}
                            onCheckedChange={(checked) => updateSetting(setting.id, 'email', checked)}
                          />
                          <Label className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={setting.push}
                            onCheckedChange={(checked) => updateSetting(setting.id, 'push', checked)}
                          />
                          <Label className="flex items-center space-x-1">
                            <Bell className="h-4 w-4" />
                            <span>Push</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={setting.sms}
                            onCheckedChange={(checked) => updateSetting(setting.id, 'sms', checked)}
                          />
                          <Label className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>SMS</span>
                          </Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;