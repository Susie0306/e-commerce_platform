import { create } from "zustand";
import type { Product } from "../types/product";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  size: string;
  color: string;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (p: Product, qty?: number, size?: string, color?: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  open: false,
  openDrawer: () => set({ open: true }),
  closeDrawer: () => set({ open: false }),
  addItem: (p, qty = 1, size = "", color = "") => {
    const items = [...get().items];
    const i = items.findIndex(
      (x) => x.id === p.id && x.size === size && x.color === color
    );
    if (i >= 0) {
      items[i] = { ...items[i], qty: items[i].qty + qty };
    } else {
      items.push({
        id: p.id,
        title: p.title,
        price: p.price,
        qty,
        size,
        color,
      });
    }
    set({ items, open: true });
  },
  removeItem: (id) => set({ items: get().items.filter((x) => x.id !== id) }),
  clear: () => set({ items: [] }),
  totalPrice: () => get().items.reduce((sum, x) => sum + x.price * x.qty, 0),
}));
