import { useState } from "react";
import { Save, Globe, Mail, Shield, Database, Server, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const SuperAdminSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Settings Saved",
      description: "All system settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Kelola pengaturan sistem dan konfigurasi platform multivendor
          </p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      <Tabs defaultValue="platform" className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Platform Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Platform Information</span>
                </CardTitle>
                <CardDescription>
                  Informasi dasar platform multivendor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="ShopEase Marketplace" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-description">Description</Label>
                  <Textarea 
                    id="platform-description" 
                    defaultValue="Platform e-commerce multivendor terpercaya di Indonesia"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-url">Platform URL</Label>
                  <Input id="platform-url" defaultValue="https://shopease.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@shopease.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" defaultValue="+62 21 1234 5678" />
                </div>
              </CardContent>
            </Card>

            {/* Platform Features */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Features</CardTitle>
                <CardDescription>
                  Enable/disable fitur platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Vendor Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new vendors to register
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Product Approval</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve new products
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Multi-language Support</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable multiple languages
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mobile App API</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable mobile app integration
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Advanced Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable detailed analytics tracking
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Vendor Registration */}
            <Card>
              <CardHeader>
                <CardTitle>Vendor Registration Settings</CardTitle>
                <CardDescription>
                  Pengaturan proses registrasi vendor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="approval-required">Manual Approval Required</Label>
                  <Switch defaultChecked />
                  <p className="text-sm text-muted-foreground">
                    Require manual approval for new vendors
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="required-documents">Required Documents</Label>
                  <div className="space-y-2">
                    {["KTP", "NPWP", "SIUP", "Bank Statement", "Business License"].map((doc) => (
                      <div key={doc} className="flex items-center space-x-2">
                        <Switch defaultChecked={["KTP", "NPWP", "SIUP"].includes(doc)} />
                        <Label>{doc}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimum-capital">Minimum Capital Requirement</Label>
                  <Input type="number" defaultValue={5000000} />
                </div>
              </CardContent>
            </Card>

            {/* Vendor Policies */}
            <Card>
              <CardHeader>
                <CardTitle>Vendor Policies</CardTitle>
                <CardDescription>
                  Kebijakan dan aturan untuk vendor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="max-products">Maximum Products per Vendor</Label>
                  <Select defaultValue="unlimited">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 Products</SelectItem>
                      <SelectItem value="500">500 Products</SelectItem>
                      <SelectItem value="1000">1000 Products</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission-range">Commission Range (%)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Min %" defaultValue="3" />
                    <Input placeholder="Max %" defaultValue="15" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-terms">Payment Terms (days)</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="14">14 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Automatic Suspension Triggers</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Low rating (&lt; 3.0) for 30 days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>High dispute rate (&gt; 10%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Multiple policy violations</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Payment Gateways */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Gateway Settings</CardTitle>
                <CardDescription>
                  Konfigurasi payment gateway yang tersedia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Midtrans", status: "active", fee: "2.9%" },
                  { name: "Xendit", status: "active", fee: "2.5%" },
                  { name: "DOKU", status: "inactive", fee: "3.0%" },
                  { name: "iPay88", status: "active", fee: "2.8%" }
                ].map((gateway, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Switch defaultChecked={gateway.status === "active"} />
                      <div>
                        <p className="font-medium">{gateway.name}</p>
                        <p className="text-sm text-muted-foreground">Fee: {gateway.fee}</p>
                      </div>
                    </div>
                    <Badge variant={gateway.status === "active" ? "default" : "secondary"}>
                      {gateway.status}
                    </Badge>
                  </div>
                ))}
                <div className="space-y-2">
                  <Label htmlFor="payment-timeout">Payment Timeout (minutes)</Label>
                  <Input type="number" defaultValue={60} />
                </div>
              </CardContent>
            </Card>

            {/* Commission Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Global Commission Settings</CardTitle>
                <CardDescription>
                  Pengaturan komisi global platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-fee">Platform Transaction Fee (%)</Label>
                  <Input type="number" step="0.1" defaultValue="1.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-processing">Payment Processing Fee (%)</Label>
                  <Input type="number" step="0.1" defaultValue="2.9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="withdrawal-fee">Withdrawal Fee</Label>
                  <Select defaultValue="fixed">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="fixed">Fixed (Rp 5.000)</SelectItem>
                      <SelectItem value="percentage">Percentage (0.5%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimum-withdrawal">Minimum Withdrawal Amount</Label>
                  <Input type="number" defaultValue={100000} />
                </div>
                <div className="space-y-2">
                  <Label>Auto-payout Schedule</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="manual">Manual Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>
                Konfigurasi notifikasi sistem dan user
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Email Notifications</h4>
                  <div className="space-y-3">
                    {[
                      "New vendor registration",
                      "Product approval required",
                      "Payment disputes",
                      "System maintenance",
                      "Performance alerts"
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Label>{notification}</Label>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">SMS Notifications</h4>
                  <div className="space-y-3">
                    {[
                      "Critical system alerts",
                      "Security breaches",
                      "High-value transactions",
                      "Emergency maintenance",
                      "Fraud detection"
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Label>{notification}</Label>
                        <Switch defaultChecked={index < 2} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Notification Recipients</h4>
                <div className="space-y-2">
                  <Label htmlFor="admin-emails">Admin Email List</Label>
                  <Textarea 
                    id="admin-emails"
                    placeholder="admin1@shopease.com, admin2@shopease.com"
                    defaultValue="admin@shopease.com, security@shopease.com, tech@shopease.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-phones">Emergency Phone Numbers</Label>
                  <Textarea 
                    id="emergency-phones"
                    placeholder="+62812345678, +62887654321"
                    defaultValue="+62812345678, +62887654321"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Security Policies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Policies</span>
                </CardTitle>
                <CardDescription>
                  Pengaturan keamanan sistem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Requirements</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Minimum 8 characters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Require uppercase letters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Require numbers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <Label>Require special characters</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                  <Select defaultValue="8">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Hour</SelectItem>
                      <SelectItem value="4">4 Hours</SelectItem>
                      <SelectItem value="8">8 Hours</SelectItem>
                      <SelectItem value="24">24 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Two-Factor Authentication</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Required for Super Admins</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <Label>Required for Vendors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <Label>Optional for Customers</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fraud Detection */}
            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection</CardTitle>
                <CardDescription>
                  Pengaturan deteksi penipuan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="max-failed-logins">Max Failed Login Attempts</Label>
                  <Input type="number" defaultValue={5} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lockout-duration">Account Lockout Duration (minutes)</Label>
                  <Input type="number" defaultValue={30} />
                </div>
                <div className="space-y-2">
                  <Label>Auto-suspend Triggers</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Suspicious IP activity</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Multiple device logins</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Unusual transaction patterns</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transaction-limit">Daily Transaction Limit (without verification)</Label>
                  <Input type="number" defaultValue={10000000} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* System Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>System Configuration</span>
                </CardTitle>
                <CardDescription>
                  Konfigurasi teknis sistem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="Asia/Jakarta">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                      <SelectItem value="Asia/Makassar">Asia/Makassar (WITA)</SelectItem>
                      <SelectItem value="Asia/Jayapura">Asia/Jayapura (WIT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Select defaultValue="IDR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IDR">Indonesian Rupiah (IDR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-file-size">Max File Upload Size (MB)</Label>
                  <Input type="number" defaultValue={10} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-rate-limit">API Rate Limit (requests/minute)</Label>
                  <Input type="number" defaultValue={1000} />
                </div>
                <div className="space-y-2">
                  <Label>Maintenance Mode</Label>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Enable maintenance mode</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Database & Backup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Database & Backup</span>
                </CardTitle>
                <CardDescription>
                  Pengaturan database dan backup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Auto Backup Schedule</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                  <Input type="number" defaultValue={30} />
                </div>
                <div className="space-y-2">
                  <Label>Backup Storage</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Local storage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>AWS S3</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <Label>Google Cloud Storage</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="log-retention">Log Retention (days)</Label>
                  <Input type="number" defaultValue={90} />
                </div>
                <Button className="w-full" variant="outline">
                  <Database className="mr-2 h-4 w-4" />
                  Run Manual Backup Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminSettings;