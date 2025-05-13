import { Layout as AntLayout, Spin } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router";
import NavBar from "./NavBar";

const { Content, Footer } = AntLayout;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);
  return null;
};

const Layout = ({ children }) => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <AntLayout style={{ minHeight: "100vh", flexDirection: "column" }}>
      <ScrollToTop />

      <NavBar />

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
            <Spin tip="Loading…" />
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
