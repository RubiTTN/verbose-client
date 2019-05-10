import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import map from 'lodash/map'
import split from 'lodash/split'
import changeCase from 'change-case'

const { SubMenu } = Menu
const { Sider } = Layout

const menuItems = [
  { title: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
  {
    title: 'Pages',
    icon: 'copy',
    subMenu: [
      { title: 'All Pages', link: '/dashboard/pages' },
      { title: 'Add New Page', link: '/dashboard/pages/add', type: 'a' },
    ],
  },
  {
    title: 'Faqs',
    icon: 'laptop',
    subMenu: [
      { title: 'All Faqs', link: '/dashboard/faqs' },
      { title: 'Add Faq', link: '/dashboard/faqs/add' },
      { title: 'All Categories', link: '/dashboard/faqs/categories' },
      { title: 'Add Category', link: '/dashboard/faqs/categories/add' },
    ],
  },
  { title: 'Media Library', link: '/dashboard/media', icon: 'picture' },
]

class SidebarMenu extends Component {
  render() {
    const {
      location: { pathname },
    } = this.props
    const renderMenu = map(menuItems, menuItem => {
      if (!menuItem.subMenu) {
        return (
          <Menu.Item key={menuItem.link}>
            <Link to={menuItem.link}>
              <Icon type={menuItem.icon} />
              {menuItem.title}
            </Link>
          </Menu.Item>
        )
      }
      return (
        <SubMenu
          key={menuItem.title}
          title={
            <span>
              <Icon type={menuItem.icon} />
              {menuItem.title}
            </span>
          }
        >
          {map(menuItem.subMenu, menu => (
            <Menu.Item key={menu.link}>
              {menu.type === 'a' ? (
                <a href={menu.link}>{menu.title}</a>
              ) : (
                <Link to={menu.link}>{menu.title}</Link>
              )}
            </Menu.Item>
          ))}
        </SubMenu>
      )
    })

    const defaultOpenKey = changeCase.sentenceCase(split(pathname, '/')[2])

    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[`${pathname}`]}
          defaultOpenKeys={[`${defaultOpenKey}`]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {renderMenu}
        </Menu>
      </Sider>
    )
  }
}

SidebarMenu.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(SidebarMenu)
