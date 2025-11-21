import { Tag, Space } from 'antd'
import type { Product } from '../stores/productStore'

export default function SpecSelector({ product }: { product: Product }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ marginBottom: 8 }}>尺码</div>
      <Space wrap>
        {product.sizes.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </Space>
      <div style={{ margin: '12px 0 8px' }}>颜色</div>
      <Space wrap>
        {product.colors.map((c) => (
          <Tag key={c}>{c}</Tag>
        ))}
      </Space>
    </div>
  )
}