import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'

import Layout from '../../Layout'
import PageForm from './PageForm'
import SortableList from './SortableList'
import AddPageItem from './AddPageItem'
import { ActionButtonsWrapper, AddNewPageWrapper } from './styles'
import { GET_PAGE } from '../queries'
import { UPSERT_PAGE_TO_DB } from '../mutaitons'

class AddPage extends Component {
  upsertPage = async () => {
    const { client, history } = this.props
    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const {
      data: { upsertPage },
    } = await client.mutate({
      mutation: UPSERT_PAGE_TO_DB,
      variables: {
        id: page.id,
        media: page.media && page.media.id,
        title: page.title,
        slug: page.slug,
        type: page.type,
        vertical: page.vertical,
        status: page.status,
      },
    })

    if (upsertPage.id) {
      message.success('Page Created Successfully')
      history.push(`/dashboard/pages/edit/${upsertPage.id}`)
    } else message.error('Error: Failed to create a page')
  }

  render() {
    return (
      <Layout>
        <AddNewPageWrapper>
          <Card title="Add New Page">
            <PageForm upsertPage={this.upsertPage} />
            <SortableList />
            <AddPageItem />
            <ActionButtonsWrapper>
              <Button type="primary" onClick={this.upsertPage}>
                Add Page
              </Button>
            </ActionButtonsWrapper>
          </Card>
        </AddNewPageWrapper>
      </Layout>
    )
  }
}

AddPage.propTypes = {
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withApollo(AddPage)
