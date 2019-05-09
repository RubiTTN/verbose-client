import React, { Component, Fragment } from 'react'
import { Form, Select } from 'antd'

import { QuestionsWrapper } from './styles'

const { Option } = Select

export default class FaqAccordion extends Component {
  render() {
    return (
      <Fragment>
        <Form.Item label="Select Faq Category">
          <Select defaultValue="select">
            <Option value="select">Select Category</Option>
            <Option value="home-loans">Home Loans</Option>
            <Option value="car-loans">Car Loans</Option>
            <Option value="personal-loans">Personal Loans</Option>
            <Option value="banking">Banking</Option>
            <Option value="other">Other Faq Category</Option>
          </Select>
        </Form.Item>
        <QuestionsWrapper>
          <ol>
            <li>How to find a great car loan</li>
            <li>Do I need good credit to get a car loan?</li>
            <li>What is a bad credit car loan?</li>
          </ol>
        </QuestionsWrapper>
      </Fragment>
    )
  }
}
