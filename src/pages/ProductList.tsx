import { useEffect } from 'react'
import { Layout } from 'antd'
import FilterSidebar from '../sections/FilterSidebar'
import SortBar from '../sections/SortBar'
import ProductGrid from '../sections/ProductGrid'
import Paginator from '../sections/Paginator'
import { useProductStore } from '../stores/productStore'

const { Content } = Layout

export default function ProductList() {
  const init = useProductStore((s) => s.init)

  useEffect(() => {
    init()
  }, [init])

  return (
    <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Layout.Sider width={280} style={{ background: '#fff', padding: 16, borderRight: '1px solid #eee' }}>
        <FilterSidebar />
      </Layout.Sider>
      <Layout>
        <Content style={{ padding: 16 }}>
          <SortBar />
          <ProductGrid />
          <Paginator />
        </Content>
      </Layout>
    </Layout>
  )
}