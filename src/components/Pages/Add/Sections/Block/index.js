import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Button, Modal, message } from 'antd'
import { Query, withApollo } from 'react-apollo'

import SelectMedia from '../../../../Generic/SelectMedia'
import EditorBox from '../../../../Generic/EditorBox'
import { GET_BLOCK, GET_PAGE } from '../../../queries'
import {
  UPDATE_BLOCK,
  UPSERT_BLOCK_TO_DB,
  DELETE_BLOCK_TO_DB,
  REPLACE_PAGE_ITEMS_ID,
  UPDATE_BLOCK_MEDIA,
  DELETE_BLOCK_MEDIA,
} from '../../../mutaitons'
import { BlockSaveButtonWrapper } from './styles'

const { Option } = Select
const { confirm } = Modal

class Block extends Component {
  handleInputChange = (e, name, value) => {
    const { client, itemId } = this.props

    client.mutate({
      mutation: UPDATE_BLOCK,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
        itemId,
      },
    })
  }

  upsertBlock = async () => {
    const { client, itemId, rerenderSortable } = this.props

    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const { block } = client.readQuery({
      query: GET_BLOCK,
      variables: {
        itemId,
      },
    })

    const {
      data: { upsertBlock },
    } = await client.mutate({
      mutation: UPSERT_BLOCK_TO_DB,
      variables: {
        id: block.id,
        page: page.id,
        media: block.media && block.media.id,
        title: block.title,
        video: block.video,
        style: block.style,
        content: block.content,
        order: block.order,
      },
    })

    /** Replace the DB Id in local state, if its just created */
    if (upsertBlock.id !== block.id) {
      client.mutate({
        mutation: UPDATE_BLOCK,
        variables: {
          name: 'id',
          value: upsertBlock.id,
          itemId: block.id,
        },
      })
      client
        .mutate({
          mutation: REPLACE_PAGE_ITEMS_ID,
          variables: {
            itemId: block.id,
            newItemId: upsertBlock.id,
          },
        })
        .then(() => {
          rerenderSortable()
        })
    }

    if (upsertBlock.id) {
      message.success('Block updated successfully')
    } else message.error('Error! Block update failed')
  }

  deleteBlock = () => {
    const { removeItem, itemId, client } = this.props
    confirm({
      title: 'Are you sure wan to delete this Block?',
      content: "Once deleted, it can't be undone!!",
      async onOk() {
        try {
          const {
            data: { deleteBlock },
          } = await client.mutate({
            mutation: DELETE_BLOCK_TO_DB,
            variables: {
              id: itemId,
            },
          })
          if (deleteBlock.id) {
            message.success('Block deleted successfully')
            removeItem(itemId, 'Block')
          } else message.error('Error! Block delete failed')
        } catch (e) {
          removeItem(itemId, 'Block')
          message.success('Block deleted successfully')
        }
      },
      onCancel() {},
    })
  }

  render() {
    const { itemId } = this.props

    return (
      <Query query={GET_BLOCK} variables={{ itemId }}>
        {({ data: { block }, loading }) => {
          if (loading) return null
          const { title, video, style, content, media } = block

          return (
            <Fragment>
              <Form.Item label="Title">
                <Input
                  name="title"
                  type="text"
                  value={title}
                  onChange={this.handleInputChange}
                />
              </Form.Item>
              <SelectMedia
                updateMediaMutation={UPDATE_BLOCK_MEDIA}
                deleteMediaMutation={DELETE_BLOCK_MEDIA}
                variables={{
                  itemId,
                  media: 'selectedMediaValue',
                }}
                currentMedia={media}
              />
              <Form.Item label="Video">
                <Input
                  name="video"
                  type="text"
                  placeholder="Video URL"
                  value={video}
                  onChange={this.handleInputChange}
                />
              </Form.Item>
              <Form.Item label="Style">
                <Select
                  defaultValue={style}
                  onChange={value =>
                    this.handleInputChange(null, 'style', value)
                  }
                >
                  <Option value="full-width">Full Width</Option>
                  <Option value="content-left">Content Left</Option>
                  <Option value="content-right">Content Right</Option>
                  <Option value="content-left-column">
                    Content Left Column
                  </Option>
                  <Option value="content-right-column">
                    Content Right Column
                  </Option>
                </Select>
              </Form.Item>
              <EditorBox
                label="Content"
                name="content"
                value={content}
                id={itemId}
                onChange={this.handleInputChange}
                insertImage
              />
              <BlockSaveButtonWrapper>
                <Button type="danger" onClick={this.deleteBlock}>
                  Delete
                </Button>
                <Button type="default" onClick={this.upsertBlock}>
                  Save
                </Button>
              </BlockSaveButtonWrapper>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

Block.propTypes = {
  client: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  rerenderSortable: PropTypes.func.isRequired,
}

export default withApollo(Block)
