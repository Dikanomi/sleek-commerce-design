import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
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

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const products = [
    {
      id: "PRD-001",
      name: "iPhone 15 Pro Max",
      category: "Elektronik",
      price: "Rp 20.999.000",
      stock: 45,
      status: "active",
      sales: 89,
      image: "/src/assets/product-smartphone.jpg"
    },
    {
      id: "PRD-002", 
      name: "MacBook Air M3",
      category: "Elektronik",
      price: "Rp 18.999.000",
      stock: 12,
      status: "active",
      sales: 34,
      image: "/src/assets/product-laptop.jpg"
    },
    {
      id: "PRD-003",
      name: "Sony WH-1000XM5",
      category: "Elektronik", 
      price: "Rp 4.299.000",
      stock: 0,
      status: "out_of_stock",
      sales: 156,
      image: "/src/assets/product-headphones.jpg"
    },
    {
      id: "PRD-004",
      name: "Samsung Galaxy S24 Ultra",
      category: "Elektronik",
      price: "Rp 19.999.000", 
      stock: 28,
      status: "active",
      sales: 67,
      image: "/src/assets/product-smartphone.jpg"
    },
    {
      id: "PRD-005",
      name: "iPad Pro 12.9\"",
      category: "Elektronik",
      price: "Rp 16.999.000",
      stock: 8,
      status: "low_stock",
      sales: 23,
      image: "/src/assets/product-smartphone.jpg"
    }
  ];

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Stok Habis</Badge>;
    }
    if (status === "low_stock" || stock < 10) {
      return <Badge variant="secondary">Stok Sedikit</Badge>;
    }
    return <Badge variant="default">Aktif</Badge>;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || !selectedCategory || product.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || !selectedStatus || 
      (selectedStatus === "active" && product.status === "active") ||
      (selectedStatus === "low_stock" && (product.status === "low_stock" || product.stock < 10)) ||
      (selectedStatus === "out_of_stock" && (product.status === "out_of_stock" || product.stock === 0));
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manajemen Produk</h1>
          <p className="text-muted-foreground">
            Kelola semua produk di toko Anda
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Produk
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+12 dari minggu lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produk Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">542</div>
            <p className="text-xs text-muted-foreground">94.6% dari total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Sedikit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Perlu restok</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Habis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Perlu ditambah</p>
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
                placeholder="Cari produk berdasarkan nama atau ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Elektronik">Elektronik</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Rumah Tangga">Rumah Tangga</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="low_stock">Stok Sedikit</SelectItem>
                <SelectItem value="out_of_stock">Stok Habis</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk</CardTitle>
          <CardDescription>
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terjual</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-medium">{product.price}</TableCell>
                  <TableCell>
                    <span className={product.stock < 10 ? "text-red-500" : ""}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(product.status, product.stock)}</TableCell>
                  <TableCell>{product.sales}</TableCell>
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
                          Edit Produk
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus Produk
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

export default Products;