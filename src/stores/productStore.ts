import { create } from "zustand";
import type { Product } from "../types/product";
import {
  fetchProducts,
  fetchProductById,
  allCategories,
} from "../mock/products";

type SortKey = "price" | "sales";

type ProductState = {
  products: Product[];
  page: number;
  pageSize: number;
  total: number;
  categories: string[];
  selectedCategories: string[];
  priceRange: [number | null, number | null];
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  paged: Product[];
  loading: boolean;
  error: string | null;
  init: () => Promise<void>;
  retry: () => Promise<void>;
  ensureProduct: (id: string) => Promise<void>;
  setCategories: (cats: string[]) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setSort: (key: SortKey, dir: "asc" | "desc") => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  byId: (id: string) => Product | undefined;
  recommend: (id?: string) => Product[];
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  page: 1,
  pageSize: window.innerWidth < 768 ? 4 : 14,
  total: 0,
  categories: allCategories,
  selectedCategories: [],
  priceRange: [null, null],
  sortKey: "price",
  sortDir: "asc",
  paged: [],
  loading: false,
  error: null,
  init: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProducts(100, 0);
      set({ products: data, total: data.length, loading: false });
      const { page, pageSize } = get();
      const paged = applyAll(get().products, get(), page, pageSize);
      set({ paged });
    } catch (e: any) {
      set({ error: e.message || "加载失败", loading: false });
    }
  },
  retry: async () => {
    await get().init();
  },
  ensureProduct: async (id: string) => {
    const exists = get().products.find((p) => p.id === id);
    if (exists) return;
    set({ loading: true, error: null });
    const one = await fetchProductById(id);
    if (!one) {
      set({ loading: false, error: "商品加载失败" });
      return;
    }
    const products = [...get().products, one];
    set({ products, total: products.length, loading: false });
    const { page, pageSize } = get();
    const paged = applyAll(products, get(), page, pageSize);
    set({ paged });
  },
  setCategories: (cats) => {
    set({ selectedCategories: cats, page: 1 });
    const { page, pageSize } = get();
    const paged = applyAll(get().products, get(), page, pageSize);
    set({ paged, total: filterOnly(get().products, get()).length });
  },
  setPriceRange: (min, max) => {
    set({ priceRange: [min, max], page: 1 });
    const { page, pageSize } = get();
    const paged = applyAll(get().products, get(), page, pageSize);
    set({ paged, total: filterOnly(get().products, get()).length });
  },
  setSort: (key, dir) => {
    set({ sortKey: key, sortDir: dir });
    const { page, pageSize } = get();
    const paged = applyAll(get().products, get(), page, pageSize);
    set({ paged });
  },
  setPage: (page) => {
    set({ page });
    const { pageSize } = get();
    const paged = applyAll(get().products, get(), page, pageSize);
    set({ paged });
  },
  setPageSize: (size) => {
    set({ pageSize: size });
    const { page } = get();
    const paged = applyAll(get().products, get(), page, size);
    set({ paged });
  },
  byId: (id) => get().products.find((p) => p.id === id),
  recommend: (id) => {
    const target = id ? get().products.find((p) => p.id === id) : undefined;
    const list = get()
      .products.filter(
        (p) => !id || (p.id !== id && p.category === target?.category)
      )
      .sort((a, b) => b.sales - a.sales);
    return list.slice(0, 6);
  },
}));

function filterOnly(products: Product[], state: ProductState) {
  const [min, max] = state.priceRange;
  return products.filter((p) => {
    const catOk =
      state.selectedCategories.length === 0 ||
      state.selectedCategories.includes(p.category);
    const priceOk =
      (min == null || p.price >= min) && (max == null || p.price <= max);
    return catOk && priceOk;
  });
}

function applyAll(
  products: Product[],
  state: ProductState,
  page: number,
  pageSize: number
) {
  const filtered = filterOnly(products, state);
  const sorted = filtered.sort((a, b) => {
    const key = state.sortKey;
    const dir = state.sortDir === "asc" ? 1 : -1;
    return (a[key as "price" | "sales"] - b[key as "price" | "sales"]) * dir;
  });
  const start = (page - 1) * pageSize;
  return sorted.slice(start, start + pageSize);
}
