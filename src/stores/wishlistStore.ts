import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  sold: number;
  discount?: number;
  isAvailable: boolean;
  isFreeShipping: boolean;
  location: string;
  addedDate: string;
  priceHistory: Array<{ date: string; price: number }>;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: Omit<WishlistItem, 'addedDate' | 'priceHistory'>) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const exists = state.items.find((i) => i.id === item.id);
          if (exists) return state;
          
          return {
            items: [...state.items, item],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      toggleItem: (item) => {
        set((state) => {
          const exists = state.items.find((i) => i.id === item.id);
          
          if (exists) {
            return {
              items: state.items.filter((i) => i.id !== item.id),
            };
          }
          
          return {
            items: [
              ...state.items,
              {
                ...item,
                addedDate: new Date().toISOString().split('T')[0],
                priceHistory: [{ date: new Date().toISOString().split('T')[0], price: item.price }],
              },
            ],
          };
        });
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
