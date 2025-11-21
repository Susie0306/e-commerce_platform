import type { Product, Category, TagType } from "../types/product";

const categoryCNMap: Record<string, Category> = {
  smartphones: "数码",
  laptops: "数码",
  tablets: "数码",
  "mobile-accessories": "数码",
  "mens-shirts": "男装",
  tops: "男装",
  "womens-dresses": "女装",
  "womens-bags": "配饰",
  "womens-jewellery": "配饰",
  "mens-shoes": "鞋靴",
  "womens-shoes": "鞋靴",
  "mens-watches": "配饰",
  "womens-watches": "配饰",
  sunglasses: "配饰",
  "sports-accessories": "配饰",
  "home-decoration": "家居",
  furniture: "家居",
  "kitchen-accessories": "家居",
  beauty: "美妆",
  "skin-care": "美妆",
  fragrances: "美妆",
  groceries: "杂货",
  vehicle: "杂货",
  motorcycle: "杂货",
};

// 定义不同品类的规格数据模板
const CATEGORY_SPECS: Record<Category, { sizes: string[]; colors: string[] }> =
  {
    男装: {
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["黑", "白", "灰", "藏青"],
    },
    女装: { sizes: ["XS", "S", "M", "L"], colors: ["黑", "白", "粉", "米白"] },
    鞋靴: {
      sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
      colors: ["黑", "白", "棕", "灰"],
    },
    数码: { sizes: ["标准版", "Pro版", "Ultra版"], colors: ["默认"] },
    配饰: { sizes: ["均码"], colors: ["金", "银", "玫瑰金", "黑"] },
    家居: { sizes: ["均码"], colors: ["米白", "浅灰", "深蓝", "原木色"] },
    美妆: { sizes: ["标准装", "礼盒装", "旅行装"], colors: ["默认"] },
    杂货: { sizes: ["250g", "500g", "1kg", "5kg"], colors: ["默认"] },
  };

export async function fetchProducts(
  limit = 100,
  failRate = 0
): Promise<Product[]> {
  if (Math.random() < failRate) throw new Error("网络异常，请稍后重试");
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
  const json: any = await res.json();
  const data: Array<any> = json.products || [];

  const products: Product[] = data.map((d, idx) => {
    let category: Category = categoryCNMap[d.category];
    if (!category) {
      if (d.category?.includes("mens")) category = "男装";
      else if (d.category?.includes("womens")) category = "女装";
      else if (d.category?.includes("shoes")) category = "鞋靴";
      else if (d.category?.includes("watch") || d.category?.includes("jewel"))
        category = "配饰";
      else if (d.category?.includes("home") || d.category?.includes("deco"))
        category = "家居";
      else if (d.category?.includes("beauty") || d.category?.includes("skin"))
        category = "美妆";
      else if (d.category?.includes("phone") || d.category?.includes("laptop"))
        category = "数码";
      else category = "杂货";
    }

    const specs = CATEGORY_SPECS[category] || CATEGORY_SPECS["杂货"];
    const sizes = specs.sizes;
    const colors = specs.colors;

    const price = Number(d.price);
    const tags: TagType[] = [
      "新品",
      ...(Number(d.stock) > 200 ? (["热销"] as TagType[]) : []),
      ...(price < 50 ? (["折扣"] as TagType[]) : []),
    ];
    const inventory = buildInventory(sizes, colors, idx);
    const images = d.images && d.images.length ? d.images : buildImages(d.id);
    const thumbnail = d.thumbnail || images[0];

    return {
      id: String(d.id),
      title: d.title,
      category,
      price,
      sales: Number(d.stock) || Math.floor(Math.random() * 1000) + 50,
      tags,
      sizes,
      colors,
      thumbnail,
      images,
      description: d.description,
      inventory,
    };
  });
  return products;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const d: any = await res.json();
    if (!d || !d.id) return null;

    let category: Category = categoryCNMap[d.category];
    if (!category) {
      if (d.category?.includes("mens")) category = "男装";
      else if (d.category?.includes("womens")) category = "女装";
      else if (d.category?.includes("shoes")) category = "鞋靴";
      else if (d.category?.includes("watch") || d.category?.includes("jewel"))
        category = "配饰";
      else if (d.category?.includes("home") || d.category?.includes("deco"))
        category = "家居";
      else if (d.category?.includes("beauty") || d.category?.includes("skin"))
        category = "美妆";
      else if (d.category?.includes("phone") || d.category?.includes("laptop"))
        category = "数码";
      else category = "杂货";
    }

    const specs = CATEGORY_SPECS[category] || CATEGORY_SPECS["杂货"];
    const sizes = specs.sizes;
    const colors = specs.colors;

    const inventory = buildInventory(sizes, colors, d.id);
    const images = d.images && d.images.length ? d.images : buildImages(d.id);
    const thumbnail = d.thumbnail || images[0];
    const tags: TagType[] = ["新品"];

    return {
      id: String(d.id),
      title: d.title,
      category,
      price: Number(d.price),
      sales: Number(d.stock) || 0,
      tags,
      sizes,
      colors,
      thumbnail,
      images,
      description: d.description,
      inventory,
    };
  } catch {
    return null;
  }
}

function buildInventory(sizes: string[], colors: string[], seed = 1) {
  const map: Record<string, Record<string, number>> = {};
  sizes.forEach((s, i) => {
    map[s] = {};
    colors.forEach((c, j) => {
      const n = (seed + i * 7 + j * 3) % 26;
      map[s][c] = n;
    });
  });
  return map;
}

function buildImages(id: number) {
  return [1, 2, 3].map(
    (i) => `https://picsum.photos/seed/djson-${id}-${i}/640/480`
  );
}

export const allCategories: Category[] = [
  "数码",
  "男装",
  "女装",
  "鞋靴",
  "配饰",
  "家居",
  "美妆",
  "杂货",
];
