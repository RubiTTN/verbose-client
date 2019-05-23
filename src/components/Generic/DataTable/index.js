import React from 'react'
import { array, string, bool, func, object } from 'prop-types'
import { Table, Input, Button, Icon } from 'antd'
import Highlighter from 'react-highlight-words'
import { titleCase } from 'change-case'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

export default class DataTable extends React.Component {
  static propTypes = {
    attributes: array.isRequired,
    dataSource: array.isRequired,
    loading: bool,
    handleTableChange: func,
    pagination: object,
    editUrl: string,
    customColumns: array,
  }

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
          textToHighlight={(text && text.toString()) || ''}
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
    const { attributes, editUrl, customColumns } = this.props
    let { dataSource, pagination, handleTableChange, loading } = this.props

    const columns = attributes.map(attribute => {
      const attributeName = attribute.name || attribute
      const searchFields = attribute.disableSearch
        ? {}
        : this.getColumnSearchProps(attributeName)
      return {
        title: attribute.title || titleCase(attribute),
        key: attributeName,
        dataIndex: attributeName,
        ...searchFields,
      }
    })

    if (!isEmpty(customColumns)) {
      customColumns.forEach(element => {
        const customColumnProps = {
          title: titleCase(element.attribute),
          key: element.attribute,
          render: element.render,
        }
        columns.push(customColumnProps)
      })
    }

    if (editUrl) {
      const editActionColumn = {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`${editUrl}/${record.id}`}>Edit</Link>
          </span>
        ),
      }
      columns.push(editActionColumn)
    }

    return <Table 
            rowKey="id"  
            columns={columns}
            dataSource={dataSource} 
            pagination={pagination}
            onChange={handleTableChange}
            loading={loading}
    />
  }
}
