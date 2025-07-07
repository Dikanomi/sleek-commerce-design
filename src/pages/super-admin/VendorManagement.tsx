import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
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

const VendorManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const vendors = [
    {
      id: "VND-001",
      name: "ElectroWorld",
      email: "admin@electroworld.com",
      category: "Elektronik",
      joinDate: "2023-06-15",
      status: "active",
      revenue: "Rp 12.5M",
      commission: "Rp 625K",
      products: 145,
      rating: 4.8,
      location: "Jakarta",
      verified: true
    },
    {
      id: "VND-002", 
      name: "Fashion Hub",
      email: "contact@fashionhub.id",
      category: "Fashion",
      joinDate: "2023-08-22",
      status: "active",
      revenue: "Rp 8.9M",
      commission: "Rp 445K", 
      products: 89,
      rating: 4.6,
      location: "Bandung",
      verified: true
    },
    {
      id: "VND-003",
      name: "TechMart Indonesia",
      email: "info@techmart.co.id",
      category: "Elektronik",
      joinDate: "2024-01-15",
      status: "pending",
      revenue: "Rp 0",
      commission: "Rp 0",
      products: 0,
      rating: 0,
      location: "Surabaya",
      verified: false
    },
    {
      id: "VND-004",
      name: "Beauty Corner",
      email: "hello@beautycorner.com",
      category: "Kecantikan",
      joinDate: "2023-09-10",
      status: "suspended",
      revenue: "Rp 6.1M",
      commission: "Rp 305K",
      products: 67,
      rating: 4.2,
      location: "Medan",
      verified: true
    },
    {
      id: "VND-005",
      name: "Home Living Store",
      email: "support@homeliving.id",
      category: "Rumah Tangga",
      joinDate: "2024-01-13",
      status: "under_review",
      revenue: "Rp 0",
      commission: "Rp 0",
      products: 23,
      rating: 0,
      location: "Yogyakarta",
      verified: false
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      pending: "secondary", 
      suspended: "destructive",
      under_review: "outline"
    } as const;
    
    const labels = {
      active: "Aktif",
      pending: "Pending",
      suspended: "Suspended",
      under_review: "Under Review"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || vendor.status === selectedStatus;
    const matchesCategory = !selectedCategory || vendor.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Management</h1>
          <p className="text-muted-foreground">
            Kelola semua vendor di platform multivendor
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite Vendor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8 vendor baru minggu ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">91% dari total vendor</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Perlu review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">Pelanggaran kebijakan</p>
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
                placeholder="Cari vendor berdasarkan nama, email, atau ID..."
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
                <SelectItem value="">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Kategori</SelectItem>
                <SelectItem value="Elektronik">Elektronik</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Kecantikan">Kecantikan</SelectItem>
                <SelectItem value="Rumah Tangga">Rumah Tangga</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Vendor</CardTitle>
          <CardDescription>
            Menampilkan {filteredVendors.length} dari {vendors.length} vendor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {vendor.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium flex items-center space-x-1">
                          <span>{vendor.name}</span>
                          {vendor.verified && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">{vendor.email}</p>
                        <p className="text-xs text-muted-foreground">
                          ID: {vendor.id} • {vendor.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{vendor.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{vendor.revenue}</TableCell>
                  <TableCell className="font-medium text-green-600">
                    {vendor.commission}
                  </TableCell>
                  <TableCell>{vendor.products}</TableCell>
                  <TableCell>
                    {vendor.rating > 0 ? (
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span>{vendor.rating}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(vendor.status)}</TableCell>
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
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Vendor
                        </DropdownMenuItem>
                        {vendor.status === "pending" && (
                          <DropdownMenuItem className="text-green-600">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {vendor.status === "active" && (
                          <DropdownMenuItem className="text-yellow-600">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus Vendor
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

export default VendorManagement;