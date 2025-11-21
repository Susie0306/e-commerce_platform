import { Link } from "react-router-dom";
import { Layout } from "antd";
import CartDrawer from "./CartDrawer";

const { Header } = Layout;

export default function Navbar() {
  return (
    <Header
      style={{
        background: "#fff",
        borderBottom: "1px solid #eee",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ fontWeight: 600, fontSize: 18 }}>
          Susie的电商平台
        </Link>
        <CartDrawer />
      </div>
    </Header>
  );
}
