import { useState } from "react";
import { DollarSign, TrendingUp, Percent, Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const CommissionRevenue = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const commissionSettings = [
    { category: "Elektronik", rate: 5, minimumCommission: 10000 },
    { category: "Fashion", rate: 8, minimumCommission: 5000 },
    { category: "Kecantikan", rate: 12, minimumCommission: 8000 },
    { category: "Rumah Tangga", rate: 7, minimumCommission: 6000 },
    { category: "Olahraga", rate: 10, minimumCommission: 7000 }
  ];

  const revenueData = [
    {
      vendor: "ElectroWorld",
      grossRevenue: 12500000,
      commission: 625000,
      netRevenue: 11875000,
      category: "Elektronik",
      period: "Januari 2024"
    },
    {
      vendor: "Fashion Hub",
      grossRevenue: 8900000,
      commission: 712000,
      netRevenue: 8188000,
      category: "Fashion",
      period: "Januari 2024"
    },
    {
      vendor: "Beauty Corner",
      grossRevenue: 6100000,
      commission: 732000,
      netRevenue: 5368000,
      category: "Kecantikan",
      period: "Januari 2024"
    },
    {
      vendor: "Home Living Store",
      grossRevenue: 4300000,
      commission: 301000,
      netRevenue: 3999000,
      category: "Rumah Tangga",
      period: "Januari 2024"
    }
  ];

  const totalCommission = revenueData.reduce((sum, item) => sum + item.commission, 0);
  const totalGrossRevenue = revenueData.reduce((sum, item) => sum + item.grossRevenue, 0);
  const averageCommissionRate = (totalCommission / totalGrossRevenue) * 100;

  const handleSaveCommission = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Pengaturan Disimpan",
      description: "Pengaturan komisi telah berhasil diperbarui.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Commission & Revenue Management</h1>
          <p className="text-muted-foreground">
            Kelola struktur komisi dan pantau revenue platform
          </p>
        </div>
        <Button onClick={handleSaveCommission} disabled={loading}>
          <Calculator className="mr-2 h-4 w-4" />
          {loading ? "Menyimpan..." : "Simpan Pengaturan"}
        </Button>
      </div>

      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalGrossRevenue)}</div>
            <p className="text-xs text-muted-foreground">+15.2% dari bulan lalu</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalCommission)}</div>
            <p className="text-xs text-muted-foreground">+18.7% dari bulan lalu</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Commission Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCommissionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Rata-rata seluruh kategori</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Vendor yang menghasilkan revenue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Commission Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Komisi per Kategori</CardTitle>
            <CardDescription>
              Atur persentase komisi untuk setiap kategori produk
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {commissionSettings.map((setting, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-center p-4 border border-border rounded-lg">
                <div>
                  <Label className="font-medium">{setting.category}</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`rate-${index}`} className="text-sm">Rate (%)</Label>
                  <Input 
                    id={`rate-${index}`}
                    type="number" 
                    defaultValue={setting.rate}
                    className="text-center"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`min-${index}`} className="text-sm">Min. Commission</Label>
                  <Input 
                    id={`min-${index}`}
                    type="number" 
                    defaultValue={setting.minimumCommission}
                    className="text-center"
                  />
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-threshold">Payment Threshold</Label>
                    <Input 
                      id="payment-threshold"
                      type="number" 
                      defaultValue={100000}
                      placeholder="Minimum untuk withdraw"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-schedule">Payment Schedule</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Mingguan</SelectItem>
                        <SelectItem value="monthly">Bulanan</SelectItem>
                        <SelectItem value="quarterly">Triwulan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Commission Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Aturan Komisi Khusus</CardTitle>
            <CardDescription>
              Pengaturan komisi untuk kondisi tertentu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-3">New Vendor Incentive</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bonus Rate (%)</Label>
                    <Input type="number" defaultValue={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (bulan)</Label>
                    <Input type="number" defaultValue={3} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Komisi tambahan untuk vendor baru selama periode tertentu
                </p>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-3">High Volume Discount</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Minimum Revenue</Label>
                    <Input type="number" defaultValue={10000000} />
                  </div>
                  <div className="space-y-2">
                    <Label>Discount Rate (%)</Label>
                    <Input type="number" defaultValue={1} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Potongan komisi untuk vendor dengan revenue tinggi
                </p>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-3">Seasonal Promotion</h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Commission Adjustment (%)</Label>
                    <Input type="number" defaultValue={-1} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Penyesuaian komisi untuk periode promosi khusus
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown per Vendor</CardTitle>
          <CardDescription>
            Detail revenue dan komisi untuk setiap vendor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Gross Revenue</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Net Revenue</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>Period</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueData.map((vendor, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{vendor.vendor}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{vendor.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(vendor.grossRevenue)}
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(vendor.commission)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(vendor.netRevenue)}
                  </TableCell>
                  <TableCell>
                    {((vendor.commission / vendor.grossRevenue) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {vendor.period}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionRevenue;