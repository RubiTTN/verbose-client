import React, { Component, Fragment } from 'react'
import { Form, Input } from 'antd'

export default class Faq extends Component {
  render() {
    return (
      <Fragment>
        <Form.Item label="Search for FAQ">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Title">
          <Input type="text" disabled />
        </Form.Item>
        <Form.Item label="Content">
          <Input.TextArea disabled />
        </Form.Item>
      </Fragment>
    )
  }
}
