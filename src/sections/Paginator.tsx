import { useEffect } from "react";
import { Pagination } from "antd";
import { useProductStore } from "../stores/productStore";

export default function Paginator() {
  const page = useProductStore((s) => s.page);
  const pageSize = useProductStore((s) => s.pageSize);
  const total = useProductStore((s) => s.total);
  const setPage = useProductStore((s) => s.setPage);
  const setPageSize = useProductStore((s) => s.setPageSize);

  // 监听屏幕尺寸变化，自动切换每页数量
  useEffect(() => {
    const handleResize = () => {
      // 768px 是常见的平板/移动端分界线 (md)
      const isMobile = window.innerWidth < 768;
      const targetSize = isMobile ? 4 : 14;

      if (useProductStore.getState().pageSize !== targetSize) {
        setPageSize(targetSize);
      }
    };

    // 初始化检查
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setPageSize]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
      <Pagination
        current={page}
        total={total}
        pageSize={pageSize}
        showSizeChanger={false}
        onChange={(p) => setPage(p)}
      />
    </div>
  );
}
