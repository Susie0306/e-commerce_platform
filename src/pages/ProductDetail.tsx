import { useParams, Link } from 'react-router-dom'
import { Layout, Row, Col, Card, Button, Carousel, Radio, Space, Tag, InputNumber } from 'antd'
import { useState, useEffect } from 'react'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'

const { Content } = Layout

export default function ProductDetail() {
  const { id } = useParams()
  const product = useProductStore((s) => s.byId(id || ''))
  const ensureProduct = useProductStore((s) => s.ensureProduct)
  const loading = useProductStore((s) => s.loading)
  const error = useProductStore((s) => s.error)
  const addItem = useCartStore((s) => s.addItem)
  const openDrawer = useCartStore((s) => s.openDrawer)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (id) ensureProduct(id)
  }, [id, ensureProduct])

  if (loading) return <div style={{ padding: 24 }}>正在加载...</div>
  if (error) return <div style={{ padding: 24 }}>{error}</div>
  if (!product) return <div style={{ padding: 24 }}>商品不存在或正在加载...</div>

  return (
    <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Content>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={14}>
            <Card>
              <Carousel>
                {product.images.map((src) => (
                  <img key={src} src={src} alt={product.title} style={{ width: '100%', height: 360, objectFit: 'cover' }} />
                ))}
              </Carousel>
            </Card>
          </Col>
          <Col xs={24} md={10}>
            <Card>
              <h2 style={{ marginBottom: 8 }}>{product.title}</h2>
              <div style={{ marginBottom: 12 }}>价格：¥{product.price}</div>
              <div style={{ marginBottom: 8 }}>标签：</div>
              <Space wrap style={{ marginBottom: 12 }}>
                {product.tags.map((t) => (
                  <Tag key={t} color={t === '新品' ? 'blue' : t === '热销' ? 'orange' : 'green'}>{t}</Tag>
                ))}
              </Space>
              <div style={{ marginBottom: 8 }}>尺码</div>
              <Radio.Group value={size} onChange={(e) => setSize(e.target.value)} style={{ marginBottom: 12 }}>
                {product.sizes.map((s) => (
                  <Radio.Button key={s} value={s}>{s}</Radio.Button>
                ))}
              </Radio.Group>
              <div style={{ marginBottom: 8 }}>颜色</div>
              <Radio.Group value={color} onChange={(e) => setColor(e.target.value)} style={{ marginBottom: 12 }}>
                {product.colors.map((c) => (
                  <Radio.Button key={c} value={c}>{c}</Radio.Button>
                ))}
              </Radio.Group>
              <div style={{ marginBottom: 12 }}>库存：{size && color ? (product.inventory?.[size]?.[color] ?? 0) : '请选择规格'}</div>
              <Space style={{ width: '100%', marginBottom: 12 }}>
                <span>数量</span>
                <InputNumber min={1} value={qty} onChange={(v) => setQty(v || 1)} />
              </Space>
              <Button
                type="primary"
                block
                disabled={!size || !color || (product.inventory?.[size]?.[color] ?? 0) <= 0}
                onClick={() => {
                  addItem(product, qty, size, color)
                  openDrawer()
                }}
              >
                加入购物车
              </Button>
              <div style={{ marginTop: 12 }}>
                <Link to="/">返回列表</Link>
              </div>
            </Card>
          </Col>
        </Row>
        <Card style={{ marginTop: 16 }} title="推荐/相似商品">
          <Row gutter={[12, 12]}>
            {useProductStore.getState().recommend(product.id).map((p) => (
              <Col key={p.id} xs={12} md={8} lg={6}>
                <Card hoverable cover={<img src={p.thumbnail} alt={p.title} style={{ height: 140, objectFit: 'cover' }} />}>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div>¥{p.price}</div>
                  <Link to={`/product/${p.id}`}>查看</Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Content>
    </Layout>
  )
}