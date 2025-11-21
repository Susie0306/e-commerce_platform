import type { Product, Category, TagType } from '../types/product'

const categoryCNMap: Record<string, Category> = {
  tops: '男装',
  'mens-shirts': '男装',
  'mens-shoes': '鞋靴',
  'mens-watches': '配饰',
  'womens-dresses': '女装',
  'womens-shoes': '鞋靴',
  'womens-watches': '配饰',
  'womens-bags': '配饰',
  'womens-jewellery': '配饰',
}

export async function fetchProducts(limit = 100, failRate = 0): Promise<Product[]> {
  if (Math.random() < failRate) throw new Error('网络异常，请稍后重试')
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}`)
  const json: any = await res.json()
  const data: Array<any> = json.products || []
  const sizes = ['S', 'M', 'L', 'XL']
  const colors = ['黑', '白', '蓝', '红']
  const products: Product[] = data.map((d, idx) => {
    const category = categoryCNMap[d.category] || (d.category?.includes('mens') ? '男装' : d.category?.includes('womens') ? '女装' : d.category?.includes('shoes') ? '鞋靴' : '配饰')
    const price = Number(d.price)
    const tags: TagType[] = ['新品', ...(Number(d.stock) > 200 ? ['热销'] : []), ...(price < 50 ? ['折扣'] : [])]
    const inventory = buildInventory(sizes, colors, idx)
    const images = d.images && d.images.length ? d.images : buildImages(d.id)
    const thumbnail = d.thumbnail || images[0]
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
    }
  })
  return products
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const d: any = await res.json()
    if (!d || !d.id) return null
    const category = categoryCNMap[d.category] || (d.category?.includes('mens') ? '男装' : d.category?.includes('womens') ? '女装' : d.category?.includes('shoes') ? '鞋靴' : '配饰')
    const sizes = ['S', 'M', 'L', 'XL']
    const colors = ['黑', '白', '蓝', '红']
    const inventory = buildInventory(sizes, colors, d.id)
    const images = d.images && d.images.length ? d.images : buildImages(d.id)
    const thumbnail = d.thumbnail || images[0]
    const tags: TagType[] = ['新品']
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
    }
  } catch {
    return null
  }
}

function buildInventory(sizes: string[], colors: string[], seed = 1) {
  const map: Record<string, Record<string, number>> = {}
  sizes.forEach((s, i) => {
    map[s] = {}
    colors.forEach((c, j) => {
      const n = (seed + i * 7 + j * 3) % 26
      map[s][c] = n
    })
  })
  return map
}

function buildImages(id: number) {
  return [1, 2, 3].map((i) => `https://picsum.photos/seed/djson-${id}-${i}/640/480`)
}

export const allCategories: Category[] = ['男装', '女装', '鞋靴', '配饰']