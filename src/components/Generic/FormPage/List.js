import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import keys from 'lodash/keys'
import styled from 'styled-components'
import { Button } from 'antd'

import { object, string, array } from 'prop-types'
import DataTable from '../DataTable'

const AddNewButton = styled.div`
  text-align: right;
  margin-bottom: 20px;
`

export default class ListPage extends React.Component {
  static propTypes = {
    getListQuery: object.isRequired,
    attributes: array.isRequired,
    customColumns: array,
    addUrl: string,
    editUrl: string,
    history: object,
  }

  render() {
    const { getListQuery, addUrl, history, ...rest } = this.props
    return (
      <Query query={getListQuery} fetchPolicy="network-only">
        {({ data, loading }) => {
          if (loading) return null
          const listData = data[keys(data)[0]]
          return (
            <Fragment>
              {addUrl && (
                <AddNewButton>
                  <Button type="primary" onClick={() => history.push(addUrl)}>
                    Add New
                  </Button>
                </AddNewButton>
              )}
              <DataTable data={listData} {...rest} />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}
