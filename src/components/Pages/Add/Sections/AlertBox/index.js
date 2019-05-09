import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Modal, Select, message } from 'antd'
import { Query, withApollo } from 'react-apollo'

import EditorBox from '../../../../Generic/EditorBox'
import { GET_ALERT_BOX, GET_PAGE } from '../../../queries'
import {
  UPDATE_ALERT_BOX,
  UPSERT_ALERT_BOX_TO_DB,
  DELETE_ALERT_BOX_TO_DB,
  REPLACE_PAGE_ITEMS_ID,
} from '../../../mutaitons'
import { AlertBoxSaveButtonWrapper } from './styles'

const { confirm } = Modal
const { Option } = Select

class AlertBox extends Component {
  handleInputChange = (e, name, value) => {
    const { client, itemId } = this.props

    client.mutate({
      mutation: UPDATE_ALERT_BOX,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
        itemId,
      },
    })
  }

  upsertAlertBox = async () => {
    const { client, itemId, rerenderSortable } = this.props

    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const { alertBox } = client.readQuery({
      query: GET_ALERT_BOX,
      variables: {
        itemId,
      },
    })

    const {
      data: { upsertAlertBox },
    } = await client.mutate({
      mutation: UPSERT_ALERT_BOX_TO_DB,
      variables: {
        id: alertBox.id,
        page: page.id,
        title: alertBox.title,
        content: alertBox.content,
        prefix: alertBox.prefix,
        style: alertBox.style,
        order: alertBox.order,
      },
    })

    /** Replace the DB Id in local state, if its just created */
    if (upsertAlertBox.id !== alertBox.id) {
      client.mutate({
        mutation: UPDATE_ALERT_BOX,
        variables: {
          name: 'id',
          value: upsertAlertBox.id,
          itemId: alertBox.id,
        },
      })
      client
        .mutate({
          mutation: REPLACE_PAGE_ITEMS_ID,
          variables: {
            itemId: alertBox.id,
            newItemId: upsertAlertBox.id,
          },
        })
        .then(() => {
          rerenderSortable()
        })
    }

    if (upsertAlertBox.id) {
      message.success('Alert Box updated successfully')
    } else message.error('Error! Alert Box update failed')
  }

  deleteAlertBox = () => {
    const { removeItem, itemId, client } = this.props
    confirm({
      title: 'Are you sure wan to delete this Alert Box?',
      content: "Once deleted, it can't be undone!!",
      async onOk() {
        try {
          const {
            data: { deleteAlertBox },
          } = await client.mutate({
            mutation: DELETE_ALERT_BOX_TO_DB,
            variables: {
              id: itemId,
            },
          })
          if (deleteAlertBox.id) {
            message.success('Alert Box deleted successfully')
            removeItem(itemId, 'AlertBox')
          } else message.error('Error! Alert Box delete failed')
        } catch (e) {
          removeItem(itemId, 'AlertBox')
          message.success('Alert Box deleted successfully')
        }
      },
      onCancel() {},
    })
  }

  render() {
    const { itemId } = this.props

    return (
      <Query query={GET_ALERT_BOX} variables={{ itemId }}>
        {({ data: { alertBox }, loading }) => {
          if (loading) return null
          const { title, content, prefix, style } = alertBox
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
              <Form.Item label="Prefix">
                <Input
                  name="prefix"
                  type="text"
                  placeholder="Prefix"
                  value={prefix}
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
                  <Option value="tip">Tip</Option>
                  <Option value="disclaimer">Disclaimer</Option>
                  <Option value="warning">Warning</Option>
                  <Option value="info">Info</Option>
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
              <AlertBoxSaveButtonWrapper>
                <Button type="danger" onClick={this.deleteAlertBox}>
                  Delete
                </Button>
                <Button type="default" onClick={this.upsertAlertBox}>
                  Save
                </Button>
              </AlertBoxSaveButtonWrapper>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

AlertBox.propTypes = {
  client: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  rerenderSortable: PropTypes.func.isRequired,
}

export default withApollo(AlertBox)
