import { useState } from "react";
import {
  Layout,
  Tabs,
  Input,
  Avatar,
  Dropdown,
  Divider,
  Affix,
  Drawer,
  Grid,
  Menu,
  Button,
} from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
  HeartOutlined,
  StarOutlined,
  UserOutlined,
  DownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";
import { App } from "antd";
import { logout } from "../api/authApi";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const routes = [
  { key: "/", label: "Home", icon: <HomeOutlined /> },
  { key: "/movies", label: "Movies", icon: <VideoCameraOutlined /> },
  { key: "/watchlist", label: "Watchlist", icon: <StarOutlined /> },
  { key: "/favourites", label: "Favourites", icon: <HeartOutlined /> },
];

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { message } = App.useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();

  const activeKey =
    routes.find((r) =>
      r.key === "/" ? pathname === "/" : pathname.startsWith(r.key)
    )?.key || "/";

  const dropdownMenu = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: (
          <span
            onClick={async () => {
              if (await logout()) {
                message.success("Logged out", 2);
                navigate("/login", { replace: true });
              } else {
                message.error("Something went wrong", 2);
              }
            }}
          >
            Logout
          </span>
        ),
      },
    ],
  };

  const navTabs = (
    <Tabs
      activeKey={activeKey}
      onChange={navigate}
      type="line"
      items={routes.map(({ key, label, icon }) => ({
        key,
        label: (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: "#fff",
            }}
          >
            {icon}
            {label}
          </span>
        ),
      }))}
      style={{
        flex: 1,
        background: "transparent",
        display: "flex",
        alignItems: "center",
        paddingLeft: 20,
      }}
      className="nav-tabs"
    />
  );

  return (
    <>
      <Affix offsetTop={0}>
        <Header
          style={{
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            padding: screens.md ? "0 32px" : "0 16px",
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(6px)",
            borderRadius: 8,
          }}
        >
          <div
            onClick={() => navigate("/")}
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              marginRight: 24,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            MovieBase
          </div>

          <Divider
            type="vertical"
            style={{ height: 24, borderColor: "#fff", marginInline: 12 }}
          />

          {screens.md && navTabs}

          {screens.md && (
            <Input.Search
              placeholder="Search movies…"
              allowClear
              onSearch={(v) =>
                navigate(`/movies?query=${encodeURIComponent(v.trim())}`)
              }
              style={{ width: 200, marginInline: 16 }}
            />
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginLeft: "auto",
            }}
          >
            {!screens.md && (
              <Button
                type="text"
                icon={<MenuOutlined style={{ fontSize: 20, color: "#fff" }} />}
                onClick={() => setDrawerOpen(true)}
              />
            )}

            <Dropdown
              menu={dropdownMenu}
              open={menuOpen}
              onOpenChange={() => setMenuOpen((p) => !p)}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <Avatar size="small" icon={<UserOutlined />} />
                <DownOutlined
                  style={{
                    transition: "transform .3s ease",
                    transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </div>
            </Dropdown>
          </div>
        </Header>
      </Affix>

      <Drawer
        title="Navigation"
        placement="left"
        width={260}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={({ key }) => {
            navigate(key);
            setDrawerOpen(false);
          }}
          items={routes.map(({ key, label, icon }) => ({
            key,
            icon,
            label,
          }))}
        />
        <div style={{ padding: 16 }}>
          <Input.Search
            placeholder="Search movies…"
            allowClear
            onSearch={(v) => {
              navigate(`/movies?query=${encodeURIComponent(v.trim())}`);
              setDrawerOpen(false);
            }}
          />
        </div>
      </Drawer>
    </>
  );
};

export default NavBar;
