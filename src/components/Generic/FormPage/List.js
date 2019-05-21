import React, { Fragment } from 'react'
import { withApollo } from 'react-apollo'
import styled from 'styled-components'
import { Button } from 'antd'
import keys from 'lodash/keys'

import { object, string, array } from 'prop-types'
import DataTable from '../DataTable'

const AddNewButton = styled.div`
  text-align: right;
  margin-bottom: 20px;
`

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
    pagination : {
      current: 1,
      total: 0,
      pageSize: 1
    },
    loading: false,
  }

  componentDidMount = () => {
    this.fetchListData();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    }, () => {
      this.fetchListData();
    });
  }

  fetchListData = async (params = {}) => {
    const { client, getListQuery} = this.props
    const { pagination: { current, pageSize: first } } = this.state;

    this.setState({ loading: true });

    const { data, 
      data : { [keys(data)[0]] : { items: dataSource, meta : {total_count: total} } },
    } = await client.query({
      query: getListQuery,
      variables: { first , skip: (current - 1) * first },
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