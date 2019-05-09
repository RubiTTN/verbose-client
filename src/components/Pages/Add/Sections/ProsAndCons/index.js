import React, { Component, Fragment } from 'react'
import { Form, Input, Row, Col, Button, Icon, Modal, message } from 'antd'
import { Query, withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'

import { ProsAndConsSaveButtonWrapper } from './styles'
import { GET_PAGE, GET_PROS_AND_CONS_BY_ID } from '../../../queries'
import {
  UPDATE_PROS_AND_CONS,
  ADD_PROS_OR_CONS,
  REMOVE_PROS_OR_CONS,
  UPSERT_PROS_AND_CONS_TO_DB,
  REPLACE_PAGE_ITEMS_ID,
  DELETE_PROS_AND_CONS_TO_DB,
} from '../../../mutaitons'

const { confirm } = Modal

class ProsAndCons extends Component {
  handleInputChange = (e, name, value, prosId, consId) => {
    const { client, itemId } = this.props

    client.mutate({
      mutation: UPDATE_PROS_AND_CONS,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
        itemId,
        prosId,
        consId,
      },
    })
  }

  addProsOrCons = prosOrCons => {
    const { client, itemId } = this.props
    client.mutate({
      mutation: ADD_PROS_OR_CONS,
      variables: {
        itemId,
        prosOrCons,
      },
      refetchQueries: [
        {
          query: GET_PROS_AND_CONS_BY_ID,
          variables: {
            itemId,
          },
        },
      ],
    })
  }

  removeProsOrCons = prosOrConsId => {
    const { client, itemId } = this.props
    client.mutate({
      mutation: REMOVE_PROS_OR_CONS,
      variables: {
        itemId,
        prosOrConsId,
      },
      refetchQueries: [
        {
          query: GET_PROS_AND_CONS_BY_ID,
          variables: {
            itemId,
          },
        },
      ],
    })
  }

  upsertProsAndCons = async () => {
    const { client, itemId, rerenderSortable } = this.props

    const { page } = client.readQuery({
      query: GET_PAGE,
    })

    const { prosAndConsById } = client.readQuery({
      query: GET_PROS_AND_CONS_BY_ID,
      variables: {
        itemId,
      },
    })

    const pros = prosAndConsById.pros.map(elem =>
      omit(elem, ['__typename', 'id'])
    )
    const cons = prosAndConsById.cons.map(elem =>
      omit(elem, ['__typename', 'id'])
    )

    const {
      data: { upsertProsAndCons },
    } = await client.mutate({
      mutation: UPSERT_PROS_AND_CONS_TO_DB,
      variables: {
        id: prosAndConsById.id,
        page: page.id,
        title: prosAndConsById.title,
        pros,
        cons,
        order: prosAndConsById.order,
      },
    })

    /** Replace the DB Id in local state, if its just created */
    if (upsertProsAndCons.id !== prosAndConsById.id) {
      client.mutate({
        mutation: UPDATE_PROS_AND_CONS,
        variables: {
          name: 'id',
          value: upsertProsAndCons.id,
          itemId: prosAndConsById.id,
        },
      })
      client
        .mutate({
          mutation: REPLACE_PAGE_ITEMS_ID,
          variables: {
            itemId: prosAndConsById.id,
            newItemId: upsertProsAndCons.id,
          },
        })
        .then(() => {
          rerenderSortable()
        })
    }

    if (upsertProsAndCons.id) {
      message.success('Pros and Cons updated successfully')
    } else message.error('Error! Pros and Cons update failed')
  }

  deleteProsAndCons = () => {
    const { removeItem, itemId, client } = this.props
    confirm({
      title: 'Are you sure wan to delete this Pros And Cons?',
      content: "Once deleted, it can't be undone!!",
      async onOk() {
        try {
          const {
            data: { deleteProsAndCons },
          } = await client.mutate({
            mutation: DELETE_PROS_AND_CONS_TO_DB,
            variables: {
              id: itemId,
            },
          })
          if (deleteProsAndCons.id) {
            message.success('Pros and Cons deleted successfully')
            removeItem(itemId, 'ProsAndCons')
          } else message.error('Error! Pros and Cons delete failed')
        } catch (e) {
          removeItem(itemId, 'ProsAndCons')
          message.success('Block Pros and Cons successfully')
        }
      },
      onCancel() {},
    })
  }

  render() {
    const { itemId } = this.props

    return (
      <Query query={GET_PROS_AND_CONS_BY_ID} variables={{ itemId }}>
        {({ data: { prosAndConsById }, loading }) => {
          if (loading) return null

          const { title, pros, cons } = prosAndConsById

          const renderProsItems = pros.map(item => (
            <Row key={item.id}>
              <Col md={22}>
                <Input
                  name="content"
                  type="text"
                  placeholder="Pros"
                  value={item.content}
                  onChange={e => this.handleInputChange(e, null, null, item.id)}
                />
              </Col>
              <Col md={1}>
                <Button
                  type="danger"
                  onClick={() => this.removeProsOrCons(item.id)}
                >
                  <Icon type="minus" />
                </Button>
              </Col>
            </Row>
          ))
          const renderConsItems = cons.map(item => (
            <Row key={item.id}>
              <Col md={22}>
                <Input
                  name="content"
                  type="text"
                  placeholder="Cons"
                  value={item.content}
                  onChange={e =>
                    this.handleInputChange(e, null, null, null, item.id)
                  }
                />
              </Col>
              <Col md={1}>
                <Button
                  type="danger"
                  onClick={() => this.removeProsOrCons(item.id)}
                >
                  <Icon type="minus" />
                </Button>
              </Col>
            </Row>
          ))

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
              <Row>
                <Col md={11}>
                  <Form.Item label="Pros">
                    {renderProsItems}
                    <Button
                      type="primary"
                      onClick={() => this.addProsOrCons('pros')}
                    >
                      Add Pros
                    </Button>
                  </Form.Item>
                </Col>
                <Col md={11} offset={2}>
                  <Form.Item label="Cons">
                    {renderConsItems}
                    <Button
                      type="danger"
                      onClick={() => this.addProsOrCons('cons')}
                    >
                      Add Cons
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <ProsAndConsSaveButtonWrapper>
                <Button type="danger" onClick={this.deleteProsAndCons}>
                  Delete
                </Button>
                <Button type="default" onClick={this.upsertProsAndCons}>
                  Save
                </Button>
              </ProsAndConsSaveButtonWrapper>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

ProsAndCons.propTypes = {
  client: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  rerenderSortable: PropTypes.func.isRequired,
}

export default withApollo(ProsAndCons)
