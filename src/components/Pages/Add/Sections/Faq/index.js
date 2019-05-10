import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withApollo, Query } from 'react-apollo'
import gql from 'graphql-tag'

import { SEARCH_FAQS_DB, GET_PAGE, GET_PAGE_FAQ } from '../../../queries'
import { REPLACE_PAGE_ITEMS_ID, UPDATE_PAGE_FAQ, UPSERT_PAGE_FAQ_TO_DB, DELETE_PAGE_FAQ_TO_DB } from '../../../mutaitons'
import { BoxSaveButtonWrapper } from '../FaqAccordion/styles'
import { Form, Input, AutoComplete, Button, Icon, Modal, message } from 'antd'

const Option = AutoComplete.Option;

const GET_FAQ_DB = gql`
query faq($id: ID){
  faq(id:$id) {
    title
    description
  }
}
`

class Faq extends Component {
  state = {
    dataSource: [],
    selectedFaq: {}
  }

  onSelect = (value) => {
    const {
      client, itemId
    } = this.props

    client.mutate({
      mutation: UPDATE_PAGE_FAQ,
      variables: {
        name:'faq',
        value,
        itemId,
      },
    })
}


  handleSearch = async (value) => {
    const {
      client,
    } = this.props
    this.lastFetchId += 1;
    this.setState({ data: [], fetching: true });

    const {
      data : { searchFaq },
    } = await client.query({
      query: SEARCH_FAQS_DB,
      variables: { searchString: value },
    })
    this.setState({ dataSource: searchFaq });
    }

  renderOption = (item) => {
    return (
      <Option key={item.id} text={item.title}>
       {item.title}
      </Option>
    );
  }


  upsertFaq = async () => {
    const { client, itemId, rerenderSortable } = this.props
    const { page } = await client.readQuery({
      query: GET_PAGE,
    })

    const { pageFaq } = await client.readQuery({
      query: GET_PAGE_FAQ,
      variables: {
        itemId,
      },
    })

    const {
      data: { upsertPageFaq },
    } = await client.mutate({
      mutation: UPSERT_PAGE_FAQ_TO_DB,
      variables: {
        id: pageFaq.id,
        page: page.id,
        faq: pageFaq.faq,
        order: pageFaq.order,
      },
    })
    message.success("FAQ Successfully saved!")
    if (upsertPageFaq.id !== pageFaq.id) {
      client.mutate({
        mutation: UPDATE_PAGE_FAQ,
        variables: {
          name: 'id',
          value: upsertPageFaq.id,
          itemId: pageFaq.id,
        },
        refetchQueries: [
          {
            query: GET_PAGE_FAQ,
          },
        ],
      })
      client
        .mutate({
          mutation: REPLACE_PAGE_ITEMS_ID,
          variables: {
            itemId: pageFaq.id,
            newItemId: upsertPageFaq.id,
          },
        })
        .then(() => {
          rerenderSortable()
        })
    }
  }

  deleteFaq = () => {
    const { client, itemId, removeItem } = this.props
    Modal.confirm({
      title: 'Are you sure wan to delete this Faq Accordian?',
      content: "Once deleted, it can't be undone!!",
      async onOk() {
        try {
          const {
            data: { deletePageFaqAccordion },
          } = await client.mutate({
            mutation: DELETE_PAGE_FAQ_TO_DB,
            variables: {
              id: itemId,
            },
          })
          if (deletePageFaqAccordion.id) {
            message.success('Faq deleted successfully')
            removeItem(itemId, 'PageFaq')
          } else message.error('Error! Faq delete failed')
        } catch (e) {
          removeItem(itemId, 'PageFaq')
          message.success('Faq deleted successfully')
        }
      },
      onCancel() {},
    })
  }


  render() {
    const { dataSource } = this.state;
    const { itemId } = this.props
    return (
      <Query query={GET_PAGE_FAQ} variables={{itemId}}>
        {({ data: { pageFaq }, loading }) => {
          if (loading) return null
          const {faq} = pageFaq
          return <Fragment>
            <Form.Item label="Search for FAQ">
              <AutoComplete
                className="global-search"
                size="large"
                style={{ width: '100%' }}
                dataSource={dataSource.map(this.renderOption)}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="input here"
                optionLabelProp="text"
              >
                <Input
                    suffix={(
                      <Button className="search-btn" size="large" type="primary">
                        <Icon type="search" />
                      </Button>
                    )}
                />
              </AutoComplete>
            </Form.Item>
            {faq ? <Query query={GET_FAQ_DB} variables={{id: faq}}>
              {({data: { faq }, loading}) => {
                if (loading) return null
                return <Fragment>
                  <Form.Item label="Title">
                    <Input value={faq.title} type="text" disabled />
                  </Form.Item>
                  <Form.Item label="Content">
                    <Input.TextArea value={faq.description} disabled />
                  </Form.Item>
                </Fragment>
              }}
            </Query> : null }
            <BoxSaveButtonWrapper>
              <Button type="danger" onClick={this.deleteFaq}>
                Delete
              </Button>
              <Button type="default" onClick={this.upsertFaq}>
                Save
              </Button>
            </BoxSaveButtonWrapper>
          </Fragment>
        }}
      </Query>
    )
  }
}

Faq.propTypes = {
  client: PropTypes.object.isRequired,
  itemId: PropTypes.string,
}

export default withApollo(Faq)
