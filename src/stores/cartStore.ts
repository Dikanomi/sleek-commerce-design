import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  stock: number;
  seller: string;
  isSelected: boolean;
  isFreeShipping: boolean;
  discount?: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity' | 'isSelected'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleItemSelection: (id: string) => void;
  toggleSelectAll: () => void;
  clearCart: () => void;
  getSelectedItems: () => CartItem[];
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            // If item exists, increase quantity
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) }
                  : i
              ),
            };
          }
          
          // Add new item
          return {
            items: [...state.items, { ...item, quantity: 1, isSelected: true }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
              : item
          ),
        }));
      },

      toggleItemSelection: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, isSelected: !item.isSelected } : item
          ),
        }));
      },

      toggleSelectAll: () => {
        set((state) => {
          const allSelected = state.items.every((item) => item.isSelected);
          return {
            items: state.items.map((item) => ({
              ...item,
              isSelected: !allSelected,
            })),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSelectedItems: () => {
        return get().items.filter((item) => item.isSelected);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
