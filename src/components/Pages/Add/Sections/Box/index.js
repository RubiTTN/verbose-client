import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Button, Modal, message } from 'antd'
import { Query, withApollo } from 'react-apollo'

import EditorBox from '../../../../Generic/EditorBox'
import SelectMedia from '../../../../Generic/SelectMedia'
import { GET_BOX, GET_PAGE } from '../../../queries'
import {
  UPDATE_BOX,
  UPSERT_BOX_TO_DB,
  REPLACE_PAGE_ITEMS_ID,
  DELETE_BOX_TO_DB,
  UPDATE_BOX_MEDIA,
  DELETE_BOX_MEDIA,
} from '../../../mutaitons'
import { BoxSaveButtonWrapper } from './styles'

const { Option } = Select
const { confirm } = Modal

class Box extends Component {
  handleInputChange = (e, name, value) => {
    const { client, itemId } = this.props

    client.mutate({
      mutation: UPDATE_BOX,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
        itemId,
      },
    })
  }

  upsertBox = async () => {
    const { client, itemId, rerenderSortable } = this.props

    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const { box } = client.readQuery({
      query: GET_BOX,
      variables: {
        itemId,
      },
    })

    const {
      data: { upsertBox },
    } = await client.mutate({
      mutation: UPSERT_BOX_TO_DB,
      variables: {
        id: box.id,
        page: page.id,
        media: box.media && box.media.id,
        title: box.title,
        video: box.video,
        style: box.style,
        content: box.content,
        order: box.order,
      },
    })

    /** Replace the DB Id in local state, if its just created */
    if (upsertBox.id !== box.id) {
      client.mutate({
        mutation: UPDATE_BOX,
        variables: {
          name: 'id',
          value: upsertBox.id,
          itemId: box.id,
        },
        refetchQueries: [
          {
            query: GET_BOX,
          },
        ],
      })
      client
        .mutate({
          mutation: REPLACE_PAGE_ITEMS_ID,
          variables: {
            itemId: box.id,
            newItemId: upsertBox.id,
          },
        })
        .then(() => {
          rerenderSortable()
        })
    }

    if (upsertBox.id) {
      message.success('Box updated successfully')
    } else message.error('Error! Box update failed')
  }

  deleteBox = () => {
    const { removeItem, itemId, client } = this.props
    confirm({
      title: 'Are you sure wan to delete this Box?',
      content: "Once deleted, it can't be undone!!",
      async onOk() {
        try {
          const {
            data: { deleteBox },
          } = await client.mutate({
            mutation: DELETE_BOX_TO_DB,
            variables: {
              id: itemId,
            },
          })
          if (deleteBox.id) {
            message.success('Box deleted successfully')
            removeItem(itemId, 'Box')
          } else message.error('Error! Box delete failed')
        } catch (e) {
          removeItem(itemId, 'Box')
          message.success('Box deleted successfully')
        }
      },
      onCancel() {},
    })
  }

  render() {
    const { itemId } = this.props

    return (
      <Query query={GET_BOX} variables={{ itemId }}>
        {({ data: { box }, loading }) => {
          if (loading) return null
          const { title, video, style, content, media } = box

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
                updateMediaMutation={UPDATE_BOX_MEDIA}
                deleteMediaMutation={DELETE_BOX_MEDIA}
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
                  <Option value="white">White</Option>
                  <Option value="grey">Grey</Option>
                  <Option value="vertical">Vertical</Option>
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
              <BoxSaveButtonWrapper>
                <Button type="danger" onClick={this.deleteBox}>
                  Delete
                </Button>
                <Button type="default" onClick={this.upsertBox}>
                  Save
                </Button>
              </BoxSaveButtonWrapper>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

Box.propTypes = {
  client: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  rerenderSortable: PropTypes.func.isRequired,
}

export default withApollo(Box)
