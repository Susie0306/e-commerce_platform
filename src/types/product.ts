export type Category =
  | "男装"
  | "女装"
  | "鞋靴"
  | "配饰"
  | "数码"
  | "家居"
  | "美妆"
  | "杂货";
export type TagType = "新品" | "热销" | "折扣";

export type InventoryMap = Record<string, Record<string, number>>;

export type Product = {
  id: string;
  title: string;
  category: Category;
  price: number;
  sales: number;
  tags: TagType[];
  sizes: string[];
  colors: string[];
  thumbnail: string;
  images: string[];
  description: string;
  inventory: InventoryMap;
};
