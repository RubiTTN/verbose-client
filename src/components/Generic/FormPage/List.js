import React, { Fragment } from 'react'
import { withApollo } from 'react-apollo'
import styled from 'styled-components'
import { Button } from 'antd'
import keys from 'lodash/keys'
import isEmpty from 'lodash/isEmpty'

import { object, string, array } from 'prop-types'
import DataTable from '../DataTable'
import { isEqual } from 'apollo-utilities';

const AddNewButton = styled.div`
  text-align: right;
  margin-bottom: 20px;
`
const initialPagination = {
  current: 1,
  total: 0,
  pageSize: 8
}

class ListPage extends React.Component {
  static propTypes = {
    getListQuery: object.isRequired,
    attributes: array.isRequired,
    customColumns: array,
    addUrl: string,
    editUrl: string,
    history: object,
  }

  state = {
    dataSource : [],
    pagination : { ...initialPagination },
    filter: {},
    loading: false,
  }

  componentDidMount = () => {
    this.fetchListData();
  }

  handleTableChange = (_pagination, _filter, sorter) => {
    let filter = {}, 
    pagination = _pagination

    if (!isEmpty(_filter)) {
      for (let key in _filter) {
        let arrValue = _filter[key]
        if (arrValue.length) {
          filter[key] = arrValue.join(" ")
        }
      }

      if (!isEqual(filter, this.state.filter)) {
        pagination = { ...initialPagination }
      }
    }
    this.setState({
      pagination,
      filter,
    }, () => {
      this.fetchListData();
    });
  }

  fetchListData = async (params = {}) => {
    const { client, getListQuery } = this.props
    const { pagination: { current, pageSize: first }, filter } = this.state;
    let variables = { first , skip: (current - 1) * first }

    if(!isEmpty(filter)) {
      variables.filter = filter
    }
    
    this.setState({ loading: true });

    const { data, 
      data : { [keys(data)[0]] : { items: dataSource, meta : {total_count: total} } },
    } = await client.query({
      query: getListQuery,
      variables,
      fetchPolicy: "network-only",
    })
    
    const pagination = { ...this.state.pagination, total };
    this.setState({ dataSource, pagination, loading: false });
  };

  render() {
    const { addUrl, history, ...rest } = this.props
    const { pagination, dataSource, loading } = this.state;

    return (
            <Fragment>
              {addUrl && (
                <AddNewButton>
                  <Button type="primary" onClick={() => history.push(addUrl)}>
                    Add New
                  </Button>
                </AddNewButton>
              )}
              <DataTable 
                dataSource={dataSource} 
                pagination={pagination}
                handleTableChange={this.handleTableChange}
                loading={loading}
                {...rest} 
              />
            </Fragment>
          )
  }
}

export default withApollo(ListPage)