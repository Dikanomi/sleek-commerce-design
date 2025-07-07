import { Download, FileText, TrendingUp, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Reports = () => {
  const reportCategories = [
    {
      title: "Financial Reports",
      description: "Laporan keuangan dan revenue platform",
      reports: [
        { name: "Monthly Revenue Report", description: "Laporan pendapatan bulanan seluruh platform", lastGenerated: "2024-01-20", format: "PDF" },
        { name: "Commission Analysis", description: "Analisis komisi per vendor dan kategori", lastGenerated: "2024-01-19", format: "Excel" },
        { name: "Tax Summary", description: "Ringkasan pajak dan kewajiban fiskal", lastGenerated: "2024-01-18", format: "PDF" },
        { name: "Payment Gateway Analysis", description: "Analisis metode pembayaran dan fee", lastGenerated: "2024-01-17", format: "Excel" }
      ]
    },
    {
      title: "Vendor Performance Reports",
      description: "Laporan performa dan aktivitas vendor",
      reports: [
        { name: "Top Performing Vendors", description: "Ranking vendor berdasarkan revenue dan rating", lastGenerated: "2024-01-20", format: "PDF" },
        { name: "Vendor Growth Analysis", description: "Analisis pertumbuhan vendor per periode", lastGenerated: "2024-01-19", format: "Excel" },
        { name: "Category Performance", description: "Performa penjualan per kategori produk", lastGenerated: "2024-01-18", format: "PDF" },
        { name: "Vendor Compliance Report", description: "Status kepatuhan vendor terhadap kebijakan", lastGenerated: "2024-01-17", format: "Excel" }
      ]
    },
    {
      title: "Customer Analytics",
      description: "Analisis perilaku dan demografi pelanggan",
      reports: [
        { name: "Customer Demographics", description: "Demografi dan segmentasi pelanggan", lastGenerated: "2024-01-20", format: "PDF" },
        { name: "Purchase Behavior Analysis", description: "Analisis pola pembelian pelanggan", lastGenerated: "2024-01-19", format: "Excel" },
        { name: "Customer Lifetime Value", description: "Analisis nilai seumur hidup pelanggan", lastGenerated: "2024-01-18", format: "PDF" },
        { name: "Customer Satisfaction Survey", description: "Hasil survei kepuasan pelanggan", lastGenerated: "2024-01-17", format: "Excel" }
      ]
    },
    {
      title: "Operational Reports",
      description: "Laporan operasional dan sistem platform",
      reports: [
        { name: "System Performance", description: "Laporan performa sistem dan uptime", lastGenerated: "2024-01-20", format: "PDF" },
        { name: "Order Fulfillment Analysis", description: "Analisis proses pemenuhan pesanan", lastGenerated: "2024-01-19", format: "Excel" },
        { name: "Support Ticket Analysis", description: "Analisis tiket dukungan pelanggan", lastGenerated: "2024-01-18", format: "PDF" },
        { name: "Fraud Detection Report", description: "Laporan aktivitas mencurigakan dan fraud", lastGenerated: "2024-01-17", format: "Excel" }
      ]
    }
  ];

  const scheduledReports = [
    { name: "Daily Sales Summary", frequency: "Harian", nextRun: "2024-01-21 09:00", recipients: 3, status: "active" },
    { name: "Weekly Vendor Performance", frequency: "Mingguan", nextRun: "2024-01-22 10:00", recipients: 5, status: "active" },
    { name: "Monthly Financial Report", frequency: "Bulanan", nextRun: "2024-02-01 08:00", recipients: 8, status: "active" },
    { name: "Quarterly Business Review", frequency: "Triwulan", nextRun: "2024-04-01 09:00", recipients: 12, status: "paused" }
  ];

  const getFormatBadge = (format: string) => {
    return (
      <Badge variant={format === "PDF" ? "default" : "secondary"}>
        {format}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "active" ? "default" : "secondary"}>
        {status === "active" ? "Aktif" : "Paused"}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate dan kelola laporan platform multivendor
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="last-7-days">7 Hari Terakhir</SelectItem>
              <SelectItem value="last-30-days">30 Hari Terakhir</SelectItem>
              <SelectItem value="last-quarter">Kuartal Terakhir</SelectItem>
              <SelectItem value="last-year">Tahun Terakhir</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Laporan terjadwal aktif</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892 GB</div>
            <p className="text-xs text-muted-foreground">Data bulan ini</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Report Recipients</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Pengguna terdaftar</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Available Reports</h2>
        {reportCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {category.reports.map((report, reportIndex) => (
                  <Card key={reportIndex} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{report.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {report.description}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>Last generated: {report.lastGenerated}</span>
                          {getFormatBadge(report.format)}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1 ml-4">
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Generate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>
            Laporan yang dijadwalkan untuk generate otomatis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledReports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.frequency}</TableCell>
                  <TableCell>{report.nextRun}</TableCell>
                  <TableCell>{report.recipients} recipients</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        {report.status === "active" ? "Pause" : "Resume"}
                      </Button>
                      <Button size="sm">
                        Run Now
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Export All Data</h3>
              <p className="text-sm text-muted-foreground">
                Download complete platform data for external analysis
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Full Backup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;