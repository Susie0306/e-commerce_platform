import { Drawer, List, Button } from 'antd'
import { useCartStore } from '../stores/cartStore'

export default function CartDrawer() {
  const open = useCartStore((s) => s.open)
  const openDrawer = useCartStore((s) => s.openDrawer)
  const closeDrawer = useCartStore((s) => s.closeDrawer)
  const items = useCartStore((s) => s.items)
  const remove = useCartStore((s) => s.removeItem)
  const total = useCartStore((s) => s.totalPrice)

  return (
    <>
      <Button onClick={openDrawer}>购物车({items.length})</Button>
      <Drawer title="购物车" open={open} onClose={closeDrawer} placement="right">
        <List
          dataSource={items}
          renderItem={(it) => (
            <List.Item
              actions={[<Button danger onClick={() => remove(it.id)}>删除</Button>]}
            >
              <List.Item.Meta title={`${it.title} (${it.size}/${it.color})`} description={`¥${it.price} x ${it.qty}`} />
            </List.Item>
          )}
        />
        <div style={{ marginTop: 12, fontWeight: 600 }}>合计：¥{total()}</div>
        <Button type="primary" block style={{ marginTop: 12 }}>去结算</Button>
      </Drawer>
    </>
  )
}