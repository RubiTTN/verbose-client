import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import { string } from 'postcss-selector-parser';
import User from '../User'
import { Logo } from './styles'
import Logout from '../Logout'
import SidebarMenu from './SidebarMenu'

const { Header, Content } = Layout

export default class DashboardLayout extends Component {
  static propTypes = {
    children: string,
  }

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
              <SidebarMenu />
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
