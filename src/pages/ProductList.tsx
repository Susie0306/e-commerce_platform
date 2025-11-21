import { useEffect, useState } from "react";
import { Layout, Button, Drawer, theme } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import FilterSidebar from "../sections/FilterSidebar";
import SortBar from "../sections/SortBar";
import ProductGrid from "../sections/ProductGrid";
import Paginator from "../sections/Paginator";
import { useProductStore } from "../stores/productStore";

const { Content, Sider } = Layout;

export default function ProductList() {
  const init = useProductStore((s) => s.init);
  // 添加状态判断是否为移动端
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // 控制移动端筛选抽屉的开关
  const [filterOpen, setFilterOpen] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    init();
    // 监听窗口大小变化，动态切换布局模式
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [init]);

  return (
    <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* PC 端：显示固定侧边栏 (非移动端时渲染) */}
      {!isMobile && (
        <Sider
          width={280}
          style={{
            background: colorBgContainer,
            padding: 16,
            borderRight: "1px solid #eee",
          }}
        >
          <FilterSidebar />
        </Sider>
      )}

      <Layout>
        <Content style={{ padding: 16 }}>
          {/* 移动端：显示“筛选商品”按钮和抽屉 (移动端时渲染) */}
          {isMobile && (
            <div style={{ marginBottom: 16 }}>
              <Button
                icon={<FilterOutlined />}
                onClick={() => setFilterOpen(true)}
              >
                筛选商品
              </Button>
              <Drawer
                title="筛选"
                placement="left"
                onClose={() => setFilterOpen(false)}
                open={filterOpen}
                width="85%" // 移动端抽屉宽度
                styles={{ body: { padding: 16 } }}
              >
                {/* 复用 FilterSidebar 组件 */}
                <FilterSidebar />
              </Drawer>
            </div>
          )}

          <SortBar />
          <ProductGrid />
          <Paginator />
        </Content>
      </Layout>
    </Layout>
  );
}
