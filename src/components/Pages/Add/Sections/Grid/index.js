import React, { Component, Fragment } from 'react'
import { Form, Input, Button, Card, Tooltip, Icon, message, Modal } from 'antd'
import { Query, withApollo } from 'react-apollo'

import { GridItemsWrapper, BoxSaveButtonWrapper, AddMoreButton } from './styles'
import { GET_GRID_BY_ID, GET_PAGE } from '../../../queries';
import { UPDATE_GRID, ADD_GRID_ITEM, REMOVE_GRID_ITEM, UPSERT_GRID_TO_DB, REPLACE_PAGE_ITEMS_ID, DELETE_GRID_TO_DB } from '../../../mutaitons';
import SelectMedia from '../../../../Generic/SelectMedia';

class Grid extends Component {
  handleInputChange = (e, gridItemId) => {
    const { client, itemId } = this.props
    client.mutate({
      mutation: UPDATE_GRID,
      variables: {
        name: e.target.name,
        value: e.target.value,
        itemId,
        gridItemId,
      }
    })
  }
  upsertGrid = async () => {
    const { client, itemId, rerenderSortable } = this.props
    const { data: { gridById: grid } } = await client.query({
      query: GET_GRID_BY_ID,
      variables: { itemId }
    })

    const { page } = await client.readQuery({
      query: GET_PAGE,
    })
    
    const items = grid.items.map(item => {
      const { id, title, content, linkText, linkUrl, media } = item
      return {
        id,
        title,
        content,
        linkText,
        linkUrl,
        media: media ? media.id : null
      }
    })
    const { data: { upsertGrid } } = await client.mutate({
      mutation: UPSERT_GRID_TO_DB,
      variables: {
        id: grid.id,
        page: page.id,
        title: grid.title,
        content: grid.content,
        order: grid.order,
        items,
      }
    })

    /** Replace the DB Id in local state, if its just created */
    if (upsertGrid.id !== grid.id) {
      client.mutate({
        mutation: UPDATE_GRID,
        variables: {
          name: 'id',
          value: upsertGrid.id,
          itemId: grid.id,
        },
      })
      client
        .mutate({
          mutation: REPLACE_PAGE_ITEMS_ID,
          variables: {
            itemId: grid.id,
            newItemId: upsertGrid.id,
          },
        })
        .then(() => {
          rerenderSortable()
        })
    }

    if (upsertGrid.id) {
      message.success('Grid updated successfully')
    } else message.error('Error! Grid update failed')
  }
  deleteGrid = () => {
    const { removeItem, itemId, client } = this.props
    Modal.confirm({
      title: 'Are you sure wan to delete this Grid?',
      content: "Once deleted, it can't be undone!!",
      async onOk() {
        try {
          const {
            data: { deleteGrid },
          } = await client.mutate({
            mutation: DELETE_GRID_TO_DB,
            variables: {
              id: itemId,
            },
          })
          if (deleteGrid.id) {
            message.success('Grid deleted successfully')
            removeItem(itemId, 'Grid')
          } else message.error('Error! Grid delete failed')
        } catch (e) {
          removeItem(itemId, 'Grid')
          message.success('Grid deleted successfully')
        }
      },
      onCancel() {},
    })
  }
  addGridItem = () => {
    const { client, itemId } = this.props
    client.mutate({
      mutation: ADD_GRID_ITEM,
      variables: { itemId }
    })
  }
  removeGridItem = (id) => {
    const { client, itemId } = this.props
    client.mutate({
      mutation: REMOVE_GRID_ITEM,
      variables: { itemId, gridItemId: id }
    })
  }
  getDeleteIcon = (id) => {
    return <Tooltip title="Delete">
      <Icon
        onClick={() => this.removeGridItem(id)}
        type="delete"
        style={{ fontSize: '20px' }}
      />
    </Tooltip>
  }
  render() {
    const { itemId } = this.props
    return (
      <Query query={GET_GRID_BY_ID} variables={{itemId}}>
      {({ data: { gridById }, loading }) => {
        if (loading) return null
        const { title, content, items } = gridById
        const showDeleteItemIcon = items.length > 1
        return <Fragment>
        <Form.Item label="Grid Title">
          <Input name="title" type="text" value={title} onChange={this.handleInputChange}/>
        </Form.Item>
        <Form.Item label="Grid Content">
          <Input.TextArea name="content" value={content} onChange={this.handleInputChange}/>
        </Form.Item>

        <GridItemsWrapper>
          <fieldset>
            <legend>Grid Items:</legend>
          </fieldset>
          {
            items.map((item, i) => {
              const { id, title, content, linkText, linkUrl, media } = item
              const deleteIcon = showDeleteItemIcon ? this.getDeleteIcon(id) : null
              return (
                <Card title={`Item #${i+1}`} key={id}
                  extra={deleteIcon}>
                  <Form.Item label="Title">
                    <Input type="text" name="title" value={title} onChange={e => this.handleInputChange(e, id)}/>
                  </Form.Item>
                  <SelectMedia
                    updateMediaMutation={UPDATE_GRID}
                    deleteMediaMutation={UPDATE_GRID}
                    variables={{
                      name: 'media',
                      itemId,
                      gridItemId: id,
                      value: 'selectedMediaValue',
                    }}
                    currentMedia={media}
                  />
                  <Form.Item label="Link Text">
                    <Input type="text" placeholder="Link Text" name="linkText" value={linkText} onChange={e => this.handleInputChange(e, id)}/>
                  </Form.Item>
                  <Form.Item label="Link Url">
                    <Input type="text" placeholder="Link Url" name="linkUrl" value={linkUrl} onChange={e => this.handleInputChange(e, id)}/>
                  </Form.Item>
                  <Form.Item label="Content">
                    <Input.TextArea name="content" value={content} onChange={e => this.handleInputChange(e, id)}/>
                  </Form.Item>
                </Card>
              )
            })
          }
          <AddMoreButton type="default" onClick={this.addGridItem}>
            Add More Items
          </AddMoreButton>
        </GridItemsWrapper>
        <BoxSaveButtonWrapper>
          <Button type="danger" onClick={this.deleteGrid}>
            Delete
          </Button>
          <Button type="default" onClick={this.upsertGrid}>
            Save
          </Button>
        </BoxSaveButtonWrapper>
      </Fragment>
      }}
    </Query>
    )
  }
}

export default withApollo(Grid)
