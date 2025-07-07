import { useState } from "react";
import { CheckCircle, XCircle, Clock, AlertTriangle, Eye, FileText, Store, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const Approvals = () => {
  const { toast } = useToast();

  const vendorApprovals = [
    {
      id: "VND-001",
      vendorName: "TechMart Indonesia",
      email: "admin@techmart.co.id",
      category: "Elektronik",
      requestDate: "2024-01-15",
      documents: ["KTP", "NPWP", "SIUP", "Bank Statement"],
      status: "pending_review",
      description: "Toko elektronik dengan fokus pada gadget dan aksesoris",
      estimatedRevenue: "Rp 15M/bulan"
    },
    {
      id: "VND-002", 
      vendorName: "Fashion Zone",
      email: "contact@fashionzone.id",
      category: "Fashion",
      requestDate: "2024-01-14",
      documents: ["KTP", "NPWP", "SIUP"],
      status: "need_revision",
      description: "Brand fashion lokal dengan target pasar remaja",
      estimatedRevenue: "Rp 8M/bulan"
    },
    {
      id: "VND-003",
      vendorName: "Home Living Store",
      email: "info@homeliving.com",
      category: "Rumah Tangga",
      requestDate: "2024-01-13",
      documents: ["KTP", "NPWP", "SIUP", "Bank Statement", "Portfolio"],
      status: "pending_review",
      description: "Supplier peralatan rumah tangga dan dekorasi",
      estimatedRevenue: "Rp 5M/bulan"
    }
  ];

  const productApprovals = [
    {
      id: "PRD-001",
      productName: "iPhone 15 Pro Max 256GB",
      vendor: "TechMart Indonesia",
      category: "Smartphone",
      price: "Rp 20.999.000",
      status: "pending_review",
      requestDate: "2024-01-16",
      reason: "Produk baru"
    },
    {
      id: "PRD-002",
      productName: "Samsung Galaxy S24 Ultra",
      vendor: "ElectroWorld",
      category: "Smartphone", 
      price: "Rp 19.999.000",
      status: "flagged",
      requestDate: "2024-01-15",
      reason: "Harga terlalu rendah dari market price"
    },
    {
      id: "PRD-003",
      productName: "MacBook Air M3 13\"",
      vendor: "Gadget Store",
      category: "Laptop",
      price: "Rp 18.999.000",
      status: "pending_review",
      requestDate: "2024-01-14",
      reason: "Update spesifikasi"
    }
  ];

  const contentApprovals = [
    {
      id: "CNT-001",
      title: "Review iPhone 15 Pro Max",
      vendor: "TechMart Indonesia",
      type: "Blog Post",
      status: "pending_review",
      requestDate: "2024-01-16",
      reason: "Konten marketing baru"
    },
    {
      id: "CNT-002",
      title: "Flash Sale Fashion Week",
      vendor: "Fashion Hub",
      type: "Promotional Banner",
      status: "flagged",
      requestDate: "2024-01-15",
      reason: "Klaim diskon perlu verifikasi"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending_review: "secondary",
      need_revision: "destructive",
      flagged: "outline",
      approved: "default",
      rejected: "destructive"
    } as const;
    
    const labels = {
      pending_review: "Pending Review",
      need_revision: "Need Revision",
      flagged: "Flagged",
      approved: "Approved",
      rejected: "Rejected"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const handleApprove = (id: string, type: string) => {
    toast({
      title: "Item Approved",
      description: `${type} ${id} has been approved successfully.`,
    });
  };

  const handleReject = (id: string, type: string) => {
    toast({
      title: "Item Rejected",
      description: `${type} ${id} has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Approval Center</h1>
          <p className="text-muted-foreground">
            Review dan setujui vendor, produk, dan konten yang pending
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Vendors</CardTitle>
            <Store className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Menunggu review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Products</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Produk baru & update</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Perlu perhatian khusus</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Approvals</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Disetujui hari ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Approval Tabs */}
      <Tabs defaultValue="vendors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vendors">Vendor Approvals</TabsTrigger>
          <TabsTrigger value="products">Product Approvals</TabsTrigger>
          <TabsTrigger value="content">Content Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Registration Approvals</CardTitle>
              <CardDescription>
                Review aplikasi vendor yang menunggu persetujuan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorApprovals.map((vendor) => (
                  <Card key={vendor.id} className="p-4">
                    <div className="grid lg:grid-cols-3 gap-4">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{vendor.vendorName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {vendor.email} • {vendor.category}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Applied: {vendor.requestDate} • Estimated Revenue: {vendor.estimatedRevenue}
                            </p>
                          </div>
                          {getStatusBadge(vendor.status)}
                        </div>
                        
                        <p className="text-sm mb-3">{vendor.description}</p>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Documents Submitted:</p>
                          <div className="flex flex-wrap gap-1">
                            {vendor.documents.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          Review Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleApprove(vendor.id, "Vendor")}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleReject(vendor.id, "Vendor")}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Approvals</CardTitle>
              <CardDescription>
                Review produk baru dan update yang pending
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productApprovals.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.productName}</p>
                          <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>{product.vendor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{product.price}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell className="text-sm">{product.reason}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleApprove(product.id, "Product")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReject(product.id, "Product")}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Approvals</CardTitle>
              <CardDescription>
                Review konten marketing dan promosi vendor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentApprovals.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{content.title}</p>
                          <p className="text-sm text-muted-foreground">ID: {content.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>{content.vendor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{content.type}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(content.status)}</TableCell>
                      <TableCell className="text-sm">{content.reason}</TableCell>
                      <TableCell className="text-sm">{content.requestDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleApprove(content.id, "Content")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReject(content.id, "Content")}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Approvals;