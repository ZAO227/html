import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Dropdown, Layout, Menu, theme } from 'antd'
import {
  FolderOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useAuth } from '../auth/AuthContext'

const { Header, Sider, Content } = Layout

export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { token: themeToken } = theme.useToken()

  const selected = location.pathname.startsWith('/library') ? '/library' : '/'

  return (
    <Layout className="app-shell">
      <Header className="app-header" style={{ paddingInline: 24, background: '#fff' }}>
        <div className="brand">
          <div className="brand-mark">Y</div>
          <div className="brand-text">
            <span className="brand-company">湖北云龙服饰有限公司</span>
            <span className="brand-divider" />
            <span className="brand-product">投标共享资料平台</span>
          </div>
        </div>
        <Dropdown
          menu={{
            items: [
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: '退出登录',
                onClick: async () => {
                  await logout()
                  navigate('/login', { replace: true })
                },
              },
            ],
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <Avatar size={28} icon={<UserOutlined />} style={{ background: themeToken.colorPrimary }} />
            <span style={{ fontSize: 13 }}>
              {user?.displayName}
              <span style={{ color: '#8c8c8c', marginLeft: 6 }}>{user?.department}</span>
            </span>
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} className="app-sider" breakpoint="lg" collapsedWidth={64}>
          <Menu
            mode="inline"
            selectedKeys={[selected]}
            style={{ borderInlineEnd: 0, background: 'transparent', paddingTop: 8 }}
            items={[
              { key: '/', icon: <HomeOutlined />, label: '首页' },
              { key: '/library', icon: <FolderOutlined />, label: '资料库' },
            ]}
            onClick={({ key }) => navigate(key)}
          />
        </Sider>
        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
