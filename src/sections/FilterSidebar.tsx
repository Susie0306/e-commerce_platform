import { Card, Checkbox, Divider, InputNumber } from 'antd'
import { useProductStore } from '../stores/productStore'

export default function FilterSidebar() {
  const categories = useProductStore((s) => s.categories)
  const selected = useProductStore((s) => s.selectedCategories)
  const setCategories = useProductStore((s) => s.setCategories)
  const [min, max] = useProductStore((s) => s.priceRange)
  const setPriceRange = useProductStore((s) => s.setPriceRange)

  return (
    <Card title="筛选区" size="small">
      <div style={{ marginBottom: 8, fontWeight: 600 }}>分类</div>
      <Checkbox.Group
        options={categories}
        value={selected}
        onChange={(v) => setCategories(v as string[])}
      />
      <Divider style={{ margin: '12px 0' }} />
      <div style={{ marginBottom: 8, fontWeight: 600 }}>价格区间</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <InputNumber
          placeholder="最低价"
          min={0}
          value={min ?? undefined}
          onChange={(v) => setPriceRange(v ?? null, max)}
          style={{ width: '100%' }}
        />
        <InputNumber
          placeholder="最高价"
          min={0}
          value={max ?? undefined}
          onChange={(v) => setPriceRange(min, v ?? null)}
          style={{ width: '100%' }}
        />
      </div>
    </Card>
  )
}
