import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'
import User from '../User'
import { Logo } from './styles'
import Logout from '../Logout'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

export default class DashboardLayout extends Component {
  render() {
    const { children } = this.props
    return (
      <User>
        {({ data: { me } }) => (
          <Layout>
            <Header className="header">
              <Logo />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
                {me && (
                  <Menu.Item key="3">
                    <Logout />
                  </Menu.Item>
                )}
                {!me && (
                  <Menu.Item key="3">
                    <Link to="/">Login</Link>
                  </Menu.Item>
                )}
              </Menu>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="dashboard" />
                        Dashboard
                      </span>
                    }
                  >
                    <Menu.Item key="1">
                      <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="copy" />
                        Pages
                      </span>
                    }
                  >
                    <Menu.Item key="2">
                      <Link to="/dashboard/pages">All Pages</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <a href="/dashboard/pages/add">Add New Page</a>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    title={
                      <span>
                        <Icon type="laptop" />
                        Faqs
                      </span>
                    }
                  >
                    <Menu.Item key="4">
                      <Link to="/dashboard/faqs">All Faqs</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Link to="/dashboard/faqs/add">Add Faq</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <Link to="/dashboard/faqs/categories">All Categories</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                      <Link to="/dashboard/faqs/categories/add">Add Category</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub4"
                    title={
                      <span>
                        <Icon type="picture" />
                        Media
                      </span>
                    }
                  >
                    <Menu.Item key="8">
                      <Link to="/dashboard/media">Library</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  {children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )}
      </User>
    )
  }
}
