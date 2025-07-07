import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const orders = [
    {
      id: "ORD-001",
      customer: "Ahmad Rizki",
      email: "ahmad.rizki@email.com",
      items: 3,
      total: "Rp 2.899.000",
      status: "completed",
      date: "2024-01-15",
      time: "14:30",
      payment: "Credit Card"
    },
    {
      id: "ORD-002",
      customer: "Siti Nurhaliza", 
      email: "siti.nur@email.com",
      items: 1,
      total: "Rp 1.299.000",
      status: "processing",
      date: "2024-01-15",
      time: "13:45",
      payment: "Bank Transfer"
    },
    {
      id: "ORD-003",
      customer: "Budi Santoso",
      email: "budi.santoso@email.com", 
      items: 2,
      total: "Rp 3.199.000",
      status: "pending",
      date: "2024-01-15",
      time: "12:20",
      payment: "E-Wallet"
    },
    {
      id: "ORD-004",
      customer: "Maya Sari",
      email: "maya.sari@email.com",
      items: 4,
      total: "Rp 1.679.000",
      status: "shipped",
      date: "2024-01-15",
      time: "11:15",
      payment: "Credit Card"
    },
    {
      id: "ORD-005",
      customer: "Eko Wijaya",
      email: "eko.wijaya@email.com",
      items: 1,
      total: "Rp 899.000",
      status: "cancelled",
      date: "2024-01-15", 
      time: "10:30",
      payment: "Bank Transfer"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "outline" as const, label: "Menunggu", icon: null },
      processing: { variant: "secondary" as const, label: "Diproses", icon: Package },
      shipped: { variant: "default" as const, label: "Dikirim", icon: Truck },
      completed: { variant: "default" as const, label: "Selesai", icon: CheckCircle },
      cancelled: { variant: "destructive" as const, label: "Dibatalkan", icon: XCircle }
    };

    const config = variants[status as keyof typeof variants];
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {IconComponent && <IconComponent className="h-3 w-3" />}
        {config.label}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || !selectedStatus || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    completed: orders.filter(o => o.status === "completed").length,
    cancelled: orders.filter(o => o.status === "cancelled").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Manajemen Pesanan</h1>
        <p className="text-muted-foreground">
          Kelola dan pantau semua pesanan pelanggan
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{orderStats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diproses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{orderStats.processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dikirim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{orderStats.shipped}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{orderStats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dibatalkan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{orderStats.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pesanan berdasarkan ID, nama, atau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="processing">Diproses</SelectItem>
                <SelectItem value="shipped">Dikirim</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter Lanjutan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pesanan</CardTitle>
          <CardDescription>
            Menampilkan {filteredOrders.length} dari {orders.length} pesanan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pesanan</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Pembayaran</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items} item{order.items > 1 ? 's' : ''}</TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div>
                      <p>{order.date}</p>
                      <p className="text-sm text-muted-foreground">{order.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          Tracking Info
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default AdminOrders;