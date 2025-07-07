import { useState } from "react";
import { Shield, Key, Smartphone, Eye, EyeOff, Clock, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoginSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

interface SecurityEvent {
  id: string;
  type: "login" | "password_change" | "failed_login" | "account_access";
  description: string;
  timestamp: string;
  location: string;
  isSuccessful: boolean;
}

const Security = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isLoginAlertsEnabled, setIsLoginAlertsEnabled] = useState(true);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loginSessions] = useState<LoginSession[]>([
    {
      id: "1",
      device: "Windows PC",
      browser: "Chrome 120",
      location: "Jakarta, Indonesia",
      ipAddress: "103.xxx.xxx.xxx",
      lastActive: "2024-01-25T14:30:00Z",
      isCurrent: true
    },
    {
      id: "2",
      device: "iPhone 15",
      browser: "Safari Mobile",
      location: "Jakarta, Indonesia",
      ipAddress: "103.xxx.xxx.xxx",
      lastActive: "2024-01-25T10:15:00Z",
      isCurrent: false
    },
    {
      id: "3",
      device: "MacBook Air",
      browser: "Chrome 119",
      location: "Bandung, Indonesia",
      ipAddress: "114.xxx.xxx.xxx",
      lastActive: "2024-01-24T16:45:00Z",
      isCurrent: false
    }
  ]);

  const [securityEvents] = useState<SecurityEvent[]>([
    {
      id: "1",
      type: "login",
      description: "Login berhasil dari perangkat Windows PC",
      timestamp: "2024-01-25T14:30:00Z",
      location: "Jakarta, Indonesia",
      isSuccessful: true
    },
    {
      id: "2",
      type: "login",
      description: "Login berhasil dari iPhone",
      timestamp: "2024-01-25T10:15:00Z",
      location: "Jakarta, Indonesia",
      isSuccessful: true
    },
    {
      id: "3",
      type: "failed_login",
      description: "Percobaan login gagal - password salah",
      timestamp: "2024-01-24T22:30:00Z",
      location: "Unknown",
      isSuccessful: false
    },
    {
      id: "4",
      type: "password_change",
      description: "Password berhasil diubah",
      timestamp: "2024-01-20T09:20:00Z",
      location: "Jakarta, Indonesia",
      isSuccessful: true
    },
    {
      id: "5",
      type: "account_access",
      description: "Akses dashboard dari perangkat baru",
      timestamp: "2024-01-19T15:10:00Z",
      location: "Bandung, Indonesia",
      isSuccessful: true
    }
  ]);

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Baru saja";
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    if (diffInHours < 48) return "Kemarin";
    return formatDateTime(timestamp);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "login": return "🔓";
      case "password_change": return "🔑";
      case "failed_login": return "⚠️";
      case "account_access": return "👤";
      default: return "🔒";
    }
  };

  const handleChangePassword = () => {
    // Simulate password change
    console.log("Changing password...");
    setIsChangePasswordOpen(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleLogoutSession = (sessionId: string) => {
    console.log(`Logging out session: ${sessionId}`);
  };

  const handleLogoutAllSessions = () => {
    console.log("Logging out all sessions except current");
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return { text: "Lemah", color: "text-destructive" };
      case 2: return { text: "Sedang", color: "text-warning" };
      case 3: return { text: "Kuat", color: "text-success" };
      case 4:
      case 5: return { text: "Sangat Kuat", color: "text-success" };
      default: return { text: "", color: "" };
    }
  };

  const strength = getPasswordStrength(passwordForm.newPassword);
  const strengthInfo = getStrengthLabel(strength);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Keamanan Akun</h1>
        <p className="text-muted-foreground">Kelola pengaturan keamanan dan monitor aktivitas akun Anda</p>
      </div>

      {/* Security Status */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Status keamanan akun Anda: <strong>Baik</strong>. 
          {!isTwoFactorEnabled && " Pertimbangkan untuk mengaktifkan autentikasi dua faktor untuk keamanan ekstra."}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>Password</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Password terakhir diubah: <strong>20 Januari 2024</strong>
              </p>
              
              <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Ubah Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ubah Password</DialogTitle>
                    <DialogDescription>
                      Masukkan password lama dan password baru untuk mengubah password akun Anda
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Password Lama</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Password Baru</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      {/* Password Strength */}
                      {passwordForm.newPassword && (
                        <div className="space-y-1">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`h-2 flex-1 rounded ${
                                  level <= strength
                                    ? strength <= 2
                                      ? "bg-destructive"
                                      : strength <= 3
                                      ? "bg-warning"
                                      : "bg-success"
                                    : "bg-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <p className={`text-xs ${strengthInfo.color}`}>
                            Kekuatan password: {strengthInfo.text}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                        <p className="text-xs text-destructive">Password tidak cocok</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                      Batal
                    </Button>
                    <Button 
                      onClick={handleChangePassword}
                      disabled={!passwordForm.currentPassword || !passwordForm.newPassword || 
                        passwordForm.newPassword !== passwordForm.confirmPassword || strength < 3}
                    >
                      Ubah Password
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Separator />

            {/* Two-Factor Authentication */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">Autentikasi Dua Faktor</h4>
                  <p className="text-sm text-muted-foreground">
                    Tambahan keamanan dengan kode verifikasi
                  </p>
                </div>
                <Switch
                  checked={isTwoFactorEnabled}
                  onCheckedChange={setIsTwoFactorEnabled}
                />
              </div>
              
              {!isTwoFactorEnabled && (
                <Button variant="outline" size="sm" className="w-full">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Aktifkan 2FA
                </Button>
              )}
            </div>

            <Separator />

            {/* Login Alerts */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notifikasi Login</h4>
                <p className="text-sm text-muted-foreground">
                  Dapatkan email saat ada login dari perangkat baru
                </p>
              </div>
              <Switch
                checked={isLoginAlertsEnabled}
                onCheckedChange={setIsLoginAlertsEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Perangkat Aktif</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogoutAllSessions}>
                Logout Semua
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loginSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{session.device}</h4>
                      {session.isCurrent && (
                        <Badge variant="default" className="text-xs">Saat ini</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session.browser} • {session.location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Terakhir aktif: {getRelativeTime(session.lastActive)}
                    </p>
                  </div>
                  
                  {!session.isCurrent && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLogoutSession(session.id)}
                    >
                      Logout
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Aktivitas Keamanan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                <div className="text-lg mt-1">
                  {getEventIcon(event.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{event.description}</h4>
                    <Badge variant={event.isSuccessful ? "default" : "destructive"} className="text-xs">
                      {event.isSuccessful ? "Berhasil" : "Gagal"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{getRelativeTime(event.timestamp)}</span>
                    <MapPin className="h-3 w-3 ml-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button variant="outline">Lihat Selengkapnya</Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-warning mt-1" />
            <div>
              <h3 className="font-semibold mb-2">💡 Tips Keamanan</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Gunakan password yang kuat dan unik untuk setiap akun</li>
                <li>• Aktifkan autentikasi dua faktor untuk keamanan ekstra</li>
                <li>• Jangan pernah membagikan password atau kode verifikasi</li>
                <li>• Logout dari perangkat yang tidak Anda gunakan lagi</li>
                <li>• Periksa aktivitas akun secara rutin</li>
                <li>• Laporkan aktivitas mencurigakan segera</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;