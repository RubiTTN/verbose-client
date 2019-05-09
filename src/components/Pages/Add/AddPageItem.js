import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Select } from 'antd'
import { withApollo } from 'react-apollo'

import { SortableActionButtonsWrapper } from './styles'
import { ADD_PAGE_ITEM } from '../mutaitons'
import { GET_PAGE_ITEMS } from '../queries'

const { Option } = Select

class AddPageItem extends Component {
  state = {
    addSectionType: 'Block',
  }

  handleAddPageItem = () => {
    const { client } = this.props
    const { addSectionType } = this.state

    client.mutate({
      mutation: ADD_PAGE_ITEM,
      variables: {
        type: addSectionType,
      },
      refetchQueries: [
        {
          query: GET_PAGE_ITEMS,
        },
      ],
    })
  }

  render() {
    const { addSectionType } = this.state
    return (
      <SortableActionButtonsWrapper>
        <Select
          defaultValue={addSectionType}
          onChange={addSectionType => this.setState({ addSectionType })}
        >
          <Option value="Block">Block</Option>
          <Option value="Box">Box</Option>
          <Option value="AlertBox">Alert Box</Option>
          <Option value="ProsAndCons">Pros and Cons</Option>
          <Option value="Faq">Faq</Option>
          <Option value="FaqAccordion">Faq Accordion</Option>
          <Option value="QuickTip">Quick Tip</Option>
          <Option value="Grid">Grid</Option>
        </Select>
        <Button type="default" onClick={() => this.handleAddPageItem()}>
          Add Section
        </Button>
      </SortableActionButtonsWrapper>
    )
  }
}

AddPageItem.propTypes = {
  client: PropTypes.object.isRequired,
}

export default withApollo(AddPageItem)
