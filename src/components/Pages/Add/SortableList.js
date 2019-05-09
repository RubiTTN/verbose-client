import React, { Component } from 'react'
import Sortable from 'react-sortablejs'
import { Row, Col, message } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import uniqueId from 'lodash/uniqueId'
import { Query, withApollo } from 'react-apollo'
import { sentenceCase } from 'change-case'
import assign from 'lodash/assign'
import get from 'lodash/get'
import map from 'lodash/map'

import Block from './Sections/Block'
import Box from './Sections/Box'
import ProsAndCons from './Sections/ProsAndCons'
import Faq from './Sections/Faq'
import FaqAccordion from './Sections/FaqAccordion'
import Grid from './Sections/Grid'
import { GET_PAGE_ITEMS } from '../queries'
import {
  ORDER_PAGE_ITEMS,
  REMOVE_PAGE_ITEM,
  UPDATE_SECTIONS_ORDER_TO_DB,
} from '../mutaitons'
import AlertBox from './Sections/AlertBox'
import QuickTip from './Sections/QuickTip'

const SortableListWrapper = styled.div`
  .editorClassName {
    min-height: 200px;
    border: 1px solid #f1f1f1;
    background: white;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
`

class SortableList extends Component {
  static propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
  }

  state = { loading: false }

  renderSection = (type, item) => {
    const props = assign(item, {
      removeItem: this.removeItem,
      rerenderSortable: this.rerenderSortable,
    })
    switch (type) {
      case 'Block':
        return <Block {...props} />
      case 'Box':
        return <Box {...props} />
      case 'AlertBox':
        return <AlertBox {...props} />
      case 'ProsAndCons':
        return <ProsAndCons {...props} />
      case 'Faq':
        return <Faq {...props} />
      case 'FaqAccordion':
        return <FaqAccordion {...props} />
      case 'Grid':
        return <Grid {...props} />
      case 'QuickTip':
        return <QuickTip {...props} />
      default:
        return null
    }
  }

  handleSortChange = itemIds => {
    const { client } = this.props

    client
      .mutate({
        mutation: ORDER_PAGE_ITEMS,
        variables: {
          itemIds,
        },
        refetchQueries: [
          {
            query: GET_PAGE_ITEMS,
          },
        ],
      })
      .then(data => {
        // saving the order to the db
        let pageItems = get(data, 'data.orderPageItems.pageItems')
        pageItems = map(pageItems, (elem, idx) => ({
          id: elem.itemId,
          type: elem.type,
          order: idx,
        }))

        client
          .mutate({
            mutation: UPDATE_SECTIONS_ORDER_TO_DB,
            variables: {
              sectionsOrder: pageItems,
            },
          })
          .then(data => {
            const id = get(data, 'data.updateSectionsOrder.id')
            if (id) {
              message.success('Sections order updated successfully')
            } else message.error('Error! Section order update failed')
          })
      })
  }

  removeItem = (itemId, type) => {
    const { client } = this.props
    this.setState({ loading: true })
    client
      .mutate({
        mutation: REMOVE_PAGE_ITEM,
        variables: {
          itemId,
          type,
        },
      })
      .then(() => {
        this.setState({ loading: false })
      })
  }

  rerenderSortable = () => {
    this.setState({ loading: true }, () => {
      this.setState({ loading: false })
    })
  }

  render() {
    const { loading } = this.state
    return !loading ? (
      <Query query={GET_PAGE_ITEMS}>
        {({ data: { pageItems }, loading }) => {
          if (loading) return null
          const listItems = pageItems.map((item, idx) => (
            <SortableListWrapper
              key={uniqueId()}
              data-id={item.itemId}
              style={{
                background: '#fbfbfb',
                marginBottom: '20px',
                padding: '20px',
                border: '1px solid #eee',
              }}
            >
              <Row className="subsection-header" style={{ cursor: 'move' }}>
                <Col xs={12}>
                  {sentenceCase(item.type)} #{idx + 1}
                </Col>
              </Row>
              {this.renderSection(item.type, item)}
            </SortableListWrapper>
          ))

          return (
            <div>
              <Sortable
                options={{
                  animation: 150,
                  handle: '.subsection-header',
                }}
                tag="div"
                onChange={itemIds => this.handleSortChange(itemIds)}
              >
                {listItems}
              </Sortable>
            </div>
          )
        }}
      </Query>
    ) : null
  }
}

SortableList.propTypes = {
  client: PropTypes.object.isRequired,
}

export default withApollo(SortableList)
