import { Layout, Menu, Input, Button } from 'antd';
import { LogoutOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router';
import { App } from 'antd';
import { logout } from '../api/authApi';

const { Header } = Layout;

const NavBar = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const handleLogout = async () => {
    if (await logout()) {
      message.success('Logged out', 2);
      navigate('/login', { replace: true });
    } else {
        message.error('Something went wrong', 2);
    }
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center', padding: '0 32px' }}>
      <div style={{ color: '#fff', fontSize: 20, marginRight: 32 }}>
        MovieBase
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[]}
        items={[
          { key: 'movies', icon: <VideoCameraOutlined />, label: <NavLink to="/movies">Movies</NavLink> }
        ]}
        style={{ flex: 1 }}
      />

      <Input.Search
        placeholder="Search movies…"
        onSearch={(v) => navigate(`/movies?query=${v}`)}
        style={{ width: 220, marginRight: 24 }}
      />

      <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Button>
    </Header>
  );
};

export default NavBar;
