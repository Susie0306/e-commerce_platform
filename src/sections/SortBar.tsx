import { Segmented } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useProductStore } from "../stores/productStore";

export default function SortBar() {
  const sortKey = useProductStore((s) => s.sortKey);
  const sortDir = useProductStore((s) => s.sortDir);
  const setSort = useProductStore((s) => s.setSort);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontWeight: 600 }}>排序：</span>
      <Segmented
        value={sortKey}
        options={[
          { label: "价格", value: "price" },
          { label: "销量", value: "sales" },
        ]}
        onChange={(v) => setSort(v as any, sortDir)}
      />
      <Segmented
        value={sortDir}
        options={[
          { label: <ArrowUpOutlined />, value: "asc" },
          { label: <ArrowDownOutlined />, value: "desc" },
        ]}
        onChange={(v) => setSort(sortKey, v as any)}
      />
    </div>
  );
}
