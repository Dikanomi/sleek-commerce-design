const API_BASE_URL = 'https://dummyjson.com';

// Product Types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  weight?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  reviews?: any[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Fetch all products
export const fetchProducts = async (limit: number = 30, skip: number = 0): Promise<ProductsResponse> => {
  const response = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

// Fetch single product
export const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

// Search products
export const searchProducts = async (query: string): Promise<ProductsResponse> => {
  const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search products');
  return response.json();
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<ProductsResponse> => {
  const response = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!response.ok) throw new Error('Failed to fetch products by category');
  return response.json();
};

// Fetch all categories
export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/products/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

// Convert API product to app format
export const convertProduct = (product: Product) => {
  const originalPrice = product.discountPercentage > 0 
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : undefined;

  return {
    id: product.id.toString(),
    title: product.title,
    description: product.description,
    price: Math.round(product.price * 15000), // Convert to IDR (approx)
    originalPrice: originalPrice ? Math.round(originalPrice * 15000) : undefined,
    image: product.thumbnail,
    images: product.images,
    rating: product.rating,
    sold: Math.floor(Math.random() * 500) + 50, // Random sold count
    category: product.category,
    brand: product.brand,
    discount: Math.round(product.discountPercentage),
    stock: product.stock,
    isFlashSale: product.discountPercentage > 10,
    isFreeShipping: product.price > 50,
    location: ["Jakarta", "Bandung", "Surabaya", "Semarang"][Math.floor(Math.random() * 4)]
  };
};
