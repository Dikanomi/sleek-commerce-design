import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllProducts from "./pages/AllProducts";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import AboutUs from "./pages/AboutUs";
import PurchaseGuide from "./pages/PurchaseGuide";
import LiveChat from "./pages/LiveChat";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Profile from "./pages/dashboard/Profile";
import Orders from "./pages/dashboard/Orders";
import Wishlist from "./pages/dashboard/Wishlist";
import Addresses from "./pages/dashboard/Addresses";
import PaymentMethods from "./pages/dashboard/PaymentMethods";
import Notifications from "./pages/dashboard/Notifications";
import Security from "./pages/dashboard/Security";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import SuperAdminLayout from "./pages/super-admin/SuperAdminLayout";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import VendorManagement from "./pages/super-admin/VendorManagement";
import CommissionRevenue from "./pages/super-admin/CommissionRevenue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/category/:category" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/purchase-guide" element={<PurchaseGuide />} />
          <Route path="/live-chat" element={<LiveChat />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="security" element={<Security />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/super-admin" element={<SuperAdminLayout />}>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="vendors" element={<VendorManagement />} />
            <Route path="revenue" element={<CommissionRevenue />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
