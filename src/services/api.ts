import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';

// Saleor GraphQL endpoint - you can use demo or your own instance
const SALEOR_API_URL = 'https://demo.saleor.io/graphql/';

// Apollo Client setup
const client = new ApolloClient({
  link: new HttpLink({
    uri: SALEOR_API_URL,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

// Product Types
export interface Product {
  id: string;
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

// GraphQL Queries
const GET_PRODUCTS = gql`
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after, channel: "default-channel") {
      edges {
        node {
          id
          name
          description
          thumbnail {
            url
            alt
          }
          media {
            url
            alt
          }
          category {
            name
          }
          defaultVariant {
            id
            name
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          variants {
            id
            quantityAvailable
          }
          rating
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

const GET_PRODUCT = gql`
  query GetProduct($id: ID!, $channel: String!) {
    product(id: $id, channel: $channel) {
      id
      name
      description
      thumbnail {
        url
        alt
      }
      media {
        url
        alt
      }
      category {
        name
        id
      }
      defaultVariant {
        id
        name
        pricing {
          price {
            gross {
              amount
              currency
            }
          }
        }
      }
      variants {
        id
        name
        quantityAvailable
      }
      rating
    }
  }
`;

const SEARCH_PRODUCTS = gql`
  query SearchProducts($search: String!, $first: Int!, $channel: String!) {
    products(first: $first, channel: $channel, filter: { search: $search }) {
      edges {
        node {
          id
          name
          description
          thumbnail {
            url
            alt
          }
          category {
            name
          }
          defaultVariant {
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          rating
        }
      }
      totalCount
    }
  }
`;

const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: ID!, $first: Int!, $channel: String!) {
    products(first: $first, channel: $channel, filter: { categories: [$category] }) {
      edges {
        node {
          id
          name
          description
          thumbnail {
            url
            alt
          }
          category {
            name
          }
          defaultVariant {
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          rating
        }
      }
      totalCount
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories($first: Int!) {
    categories(first: $first) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

// Fetch all products
export const fetchProducts = async (limit: number = 30, skip: number = 0): Promise<ProductsResponse> => {
  try {
    const { data } = await client.query({
      query: GET_PRODUCTS,
      variables: { first: limit, after: skip > 0 ? btoa(`arrayconnection:${skip - 1}`) : null },
    });

    const result = data as any;
    const products = result.products.edges.map((edge: any) => convertSaleorProduct(edge.node));
    
    return {
      products,
      total: result.products.totalCount || products.length,
      skip,
      limit,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Fetch single product
export const fetchProduct = async (id: string): Promise<Product> => {
  try {
    const { data } = await client.query({
      query: GET_PRODUCT,
      variables: { id, channel: "default-channel" },
    });

    const result = data as any;
    return convertSaleorProduct(result.product);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
};

// Search products
export const searchProducts = async (query: string): Promise<ProductsResponse> => {
  try {
    const { data } = await client.query({
      query: SEARCH_PRODUCTS,
      variables: { search: query, first: 30, channel: "default-channel" },
    });

    const result = data as any;
    const products = result.products.edges.map((edge: any) => convertSaleorProduct(edge.node));
    
    return {
      products,
      total: result.products.totalCount || products.length,
      skip: 0,
      limit: 30,
    };
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products');
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (categoryId: string): Promise<ProductsResponse> => {
  try {
    const { data } = await client.query({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: { category: categoryId, first: 30, channel: "default-channel" },
    });

    const result = data as any;
    const products = result.products.edges.map((edge: any) => convertSaleorProduct(edge.node));
    
    return {
      products,
      total: result.products.totalCount || products.length,
      skip: 0,
      limit: 30,
    };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to fetch products by category');
  }
};

// Fetch all categories
export const fetchCategories = async (): Promise<any[]> => {
  try {
    const { data } = await client.query({
      query: GET_CATEGORIES,
      variables: { first: 50 },
    });

    const result = data as any;
    return result.categories.edges.map((edge: any) => ({
      id: edge.node.id,
      name: edge.node.name,
      slug: edge.node.slug,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

// Convert Saleor product to app format
const convertSaleorProduct = (product: any): Product => {
  const price = product.defaultVariant?.pricing?.price?.gross?.amount || 0;
  const discountPercentage = Math.floor(Math.random() * 30); // Random discount for demo
  
  return {
    id: product.id,
    title: product.name,
    description: product.description || '',
    price: price,
    discountPercentage: discountPercentage,
    rating: product.rating || (Math.random() * 2 + 3), // Random rating between 3-5
    stock: product.variants?.[0]?.quantityAvailable || Math.floor(Math.random() * 100),
    brand: product.category?.name || 'Brand',
    category: product.category?.name || 'Category',
    thumbnail: product.thumbnail?.url || '/placeholder.svg',
    images: product.media?.map((m: any) => m.url) || [product.thumbnail?.url || '/placeholder.svg'],
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 2-3 business days',
    returnPolicy: '30 days return policy',
  };
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
