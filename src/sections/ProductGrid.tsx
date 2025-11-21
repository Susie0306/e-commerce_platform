import { Card, Tag, Skeleton, Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { useProductStore } from '../stores/productStore'

export default function ProductGrid() {
  const items = useProductStore((s) => s.paged)
  const loading = useProductStore((s) => s.loading)
  const error = useProductStore((s) => s.error)
  const retry = useProductStore((s) => s.retry)

  if (loading) {
    return (
      <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i}>
            <Skeleton.Image style={{ width: '100%', height: 120 }} />
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Result status="error" title="加载失败" subTitle={error} extra={<Button onClick={retry}>重试</Button>} />
    )
  }

  if (items.length === 0) {
    return (
      <Result status="info" title="暂无商品" subTitle="未命中筛选条件" extra={<Link to="/"><Button>返回列表</Button></Link>} />
    )
  }

  return (
    <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
      {items.map((p) => (
        <Card key={p.id} hoverable cover={<img src={p.thumbnail} alt={p.title} style={{ height: 160, objectFit: 'cover' }} />}>
          <div style={{ fontWeight: 600 }}>{p.title}</div>
          <div>价格 ¥{p.price}</div>
          <div>销量 {p.sales}</div>
          <div style={{ margin: '6px 0' }}>
            {p.tags.map((t) => (
              <Tag key={t} color={t === '新品' ? 'blue' : t === '热销' ? 'orange' : 'green'}>{t}</Tag>
            ))}
          </div>
          <Link to={`/product/${p.id}`}>查看详情</Link>
        </Card>
      ))}
    </div>
  )
}