import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
import { Query, withApollo } from 'react-apollo'

import SelectMedia from '../../Generic/SelectMedia'
import { GET_PAGE } from '../queries'
import { UPDATE_PAGE, UPDATE_PAGE_MEDIA, DELETE_PAGE_MEDIA } from '../mutaitons'
import { PageFormWrapper } from './styles'

const { Option } = Select

class PageForm extends Component {
  handleInputChange = (pageId, e, name, value) => {
    const { client } = this.props
    client.mutate({
      mutation: UPDATE_PAGE,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
        pageId,
      },
    })
  }

  render() {
    return (
      <Query query={GET_PAGE}>
        {({ data: { page }, loading }) => {
          if (loading) return null
          const { id, title, slug, vertical, type, status, media } = page
          const { upsertPage } = this.props

          return (
            <PageFormWrapper>
              <Form.Item label="Title">
                <Input
                  name="title"
                  type="text"
                  value={title}
                  onChange={e => this.handleInputChange(id, e)}
                  onBlur={upsertPage}
                />
              </Form.Item>
              <SelectMedia
                updateMediaMutation={UPDATE_PAGE_MEDIA}
                deleteMediaMutation={DELETE_PAGE_MEDIA}
                variables={{
                  pageId: id,
                  media: 'selectedMediaValue',
                }}
                currentMedia={media}
              />
              <Form.Item label="Type">
                <Select
                  defaultValue={type}
                  onChange={value => {
                    this.handleInputChange(id, null, 'type', value)
                  }}
                >
                  <Option value="PAGE">Page</Option>
                  <Option value="NEWS">News</Option>
                  <Option value="ARTICLE">Article</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Slug">
                <Input
                  name="slug"
                  type="text"
                  placeholder="Slug"
                  value={slug}
                  onChange={e => this.handleInputChange(id, e)}
                />
              </Form.Item>
              <Form.Item label="Vertical">
                <Select
                  defaultValue={vertical}
                  onChange={value => {
                    this.handleInputChange(id, null, 'vertical', value)
                  }}
                >
                  <Option value="home-loans">Home Loans</Option>
                  <Option value="car-loans">Car Loans</Option>
                  <Option value="personal-loans">Personal Loans</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Status">
                <Select
                  defaultValue={status}
                  onChange={value => {
                    this.handleInputChange(id, null, 'status', value)
                  }}
                >
                  <Option value="DRAFT">Draft</Option>
                  <Option value="PUBLISHED">Published</Option>
                </Select>
              </Form.Item>
            </PageFormWrapper>
          )
        }}
      </Query>
    )
  }
}

PageForm.propTypes = {
  client: PropTypes.object.isRequired,
  upsertPage: PropTypes.func.isRequired,
}

export default withApollo(PageForm)
