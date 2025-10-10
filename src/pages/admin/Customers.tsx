import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, Mail, Phone, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const customers = [
    {
      id: "CUST-001",
      name: "Ahmad Rizki",
      email: "ahmad.rizki@email.com",
      phone: "+62 812-3456-7890",
      status: "active",
      totalOrders: 24,
      totalSpent: "Rp 48.900.000",
      joinDate: "2023-06-15",
      lastOrder: "2024-01-15",
      avatar: null
    },
    {
      id: "CUST-002",
      name: "Siti Nurhaliza",
      email: "siti.nur@email.com", 
      phone: "+62 813-4567-8901",
      status: "active",
      totalOrders: 18,
      totalSpent: "Rp 32.100.000",
      joinDate: "2023-08-22",
      lastOrder: "2024-01-14",
      avatar: null
    },
    {
      id: "CUST-003",
      name: "Budi Santoso",
      email: "budi.santoso@email.com",
      phone: "+62 814-5678-9012", 
      status: "inactive",
      totalOrders: 5,
      totalSpent: "Rp 8.750.000",
      joinDate: "2023-11-08",
      lastOrder: "2023-12-20",
      avatar: null
    },
    {
      id: "CUST-004",
      name: "Maya Sari",
      email: "maya.sari@email.com",
      phone: "+62 815-6789-0123",
      status: "active",
      totalOrders: 32,
      totalSpent: "Rp 67.200.000",
      joinDate: "2023-03-12",
      lastOrder: "2024-01-13",
      avatar: null
    },
    {
      id: "CUST-005",
      name: "Eko Wijaya",
      email: "eko.wijaya@email.com",
      phone: "+62 816-7890-1234",
      status: "suspended",
      totalOrders: 12,
      totalSpent: "Rp 18.900.000",
      joinDate: "2023-09-05",
      lastOrder: "2024-01-10",
      avatar: null
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "default" as const, label: "Aktif", icon: UserCheck },
      inactive: { variant: "secondary" as const, label: "Tidak Aktif", icon: UserX },
      suspended: { variant: "destructive" as const, label: "Diblokir", icon: UserX }
    };

    const config = variants[status as keyof typeof variants];
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || selectedStatus === "all" || customer.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active").length,
    inactive: customers.filter(c => c.status === "inactive").length,
    suspended: customers.filter(c => c.status === "suspended").length,
    totalSpent: customers.reduce((sum, c) => sum + parseInt(c.totalSpent.replace(/[^\d]/g, '')), 0)
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Manajemen Pelanggan</h1>
        <p className="text-muted-foreground">
          Kelola dan pantau data semua pelanggan
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pelanggan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.total}</div>
            <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pelanggan Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{customerStats.active}</div>
            <p className="text-xs text-muted-foreground">{((customerStats.active / customerStats.total) * 100).toFixed(1)}% dari total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Penjualan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(customerStats.totalSpent)}</div>
            <p className="text-xs text-muted-foreground">Dari semua pelanggan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(customerStats.totalSpent / customerStats.total)}</div>
            <p className="text-xs text-muted-foreground">Per pelanggan</p>
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
                placeholder="Cari pelanggan berdasarkan nama, email, atau ID..."
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
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
                <SelectItem value="suspended">Diblokir</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter Lanjutan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan</CardTitle>
          <CardDescription>
            Menampilkan {filteredCustomers.length} dari {customers.length} pelanggan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Pesanan</TableHead>
                <TableHead>Total Belanja</TableHead>
                <TableHead>Bergabung</TableHead>
                <TableHead>Pesanan Terakhir</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar || ""} />
                        <AvatarFallback>
                          {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{customer.email}</p>
                      <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell className="font-medium">{customer.totalOrders}</TableCell>
                  <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
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
                          <Mail className="mr-2 h-4 w-4" />
                          Kirim Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Hubungi
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Update Status
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

export default Customers;