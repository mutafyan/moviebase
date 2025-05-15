import { Layout as AntLayout, Spin } from "antd";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import NavBar from "./NavBar";
import { useEffect } from "react";

const { Content, Footer } = AntLayout;

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [pathname, search]);

  return null;
};
const Layout = ({ children }) => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <AntLayout style={{ minHeight: "100vh", flexDirection: "column" }}>
      <NavBar />
      <ScrollToTop />
      <Content
        style={{
          padding: "24px 24px 0",
          background: "#fff",
          flex: 1,
        }}
      >
        {loading ? (
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin />
          </div>
        ) : (
          children
        )}
      </Content>

      <Footer style={{ textAlign: "center" }}>
        All rights reserved. MovieBase ©{new Date().getFullYear()}. @mutafyan
      </Footer>
    </AntLayout>
  );
};

export default Layout;
