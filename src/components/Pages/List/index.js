import React, { Component } from 'react'
import { Table, Input, Button, Icon } from 'antd'
import Highlighter from 'react-highlight-words'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import Layout from '../../Layout'
import { GET_PAGES_DB } from '../queries'

export default class PagesList extends Component {
  state = {
    searchText: '',
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
    render: text => {
      const { searchText } = this.state
      return (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      )
    },
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  render() {
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '30%',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: 'Slug',
        dataIndex: 'slug',
        key: 'slug',
        width: '30%',
        ...this.getColumnSearchProps('slug'),
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: '30%',
        ...this.getColumnSearchProps('type'),
      },
      {
        title: 'Vertical',
        dataIndex: 'vertical',
        key: 'vertical',
        width: '30%',
        ...this.getColumnSearchProps('vertical'),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '30%',
        ...this.getColumnSearchProps('status'),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/dashboard/pages/edit/${record.id}`}>
              Edit {record.name}
            </Link>
          </span>
        ),
      },
    ]

    return (
      <Query query={GET_PAGES_DB}>
        {({ data: { pages }, loading }) => {
          if (loading) return null
          return (
            <Layout>
              <Table columns={columns} dataSource={pages} rowKey="id" />
            </Layout>
          )
        }}
      </Query>
    )
  }
}
