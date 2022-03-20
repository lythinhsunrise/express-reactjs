import {
  DesktopOutlined, ProfileOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../index.css';

const { Header, Footer, Sider, Content } = Layout

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  let navigate = useNavigate();

  let user = localStorage.getItem("user")
  user = JSON.parse(user)
  useEffect(() => {
    if(!user){
      navigate('/')
    }
  },[])

  const logOut = () => {
    localStorage.removeItem("user");
    navigate('/');
  }
  return (
    <Layout className="layout">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <div className="logo-admin">CMS</div>
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="/admin/posts">Posts</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Options
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff' }} >
            <div style={{ float: 'right' }}>
              <Button onClick={logOut}>Logout</Button>
            </div>
          </Header>
          <Content style={{ margin: '8px 16px 0' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ThinhDev ©2022 Nodejs Express - ReactJS
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AdminLayout