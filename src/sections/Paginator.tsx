import { Pagination } from 'antd'
import { useProductStore } from '../stores/productStore'

export default function Paginator() {
  const page = useProductStore((s) => s.page)
  const pageSize = useProductStore((s) => s.pageSize)
  const total = useProductStore((s) => s.total)
  const setPage = useProductStore((s) => s.setPage)
  const setPageSize = useProductStore((s) => s.setPageSize)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
      <Pagination
        current={page}
        total={total}
        pageSize={pageSize}
        showSizeChanger
        onChange={(p) => setPage(p)}
        onShowSizeChange={(_, s) => setPageSize(s)}
      />
    </div>
  )
}