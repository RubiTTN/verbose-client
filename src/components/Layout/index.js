import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

import { object } from 'prop-types'
import User from '../User'
import { Logo } from './styles'
import Logout from '../Logout'
import SidebarMenu from './SidebarMenu'
import Breadcrumb from './Breadcrumb'

const { Header, Content } = Layout

export default class DashboardLayout extends Component {
  static propTypes = {
    children: object,
  }

  render() {
    const { children, updateToken } = this.props
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
                style={{ lineHeight: '64px', float: 'right'}}
              >
                {me && (
                  <Menu.Item key="3">
                    <Logout updateToken={updateToken}/>
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
                <Breadcrumb />
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
