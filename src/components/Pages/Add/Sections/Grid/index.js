import React, { Component, Fragment } from 'react'
import { Form, Input } from 'antd'

import { GridItemsWrapper } from './styles'

export default class Grid extends Component {
  render() {
    return (
      <Fragment>
        <Form.Item label="Grid Title">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Grid Content">
          <Input.TextArea />
        </Form.Item>

        <GridItemsWrapper>
          <fieldset>
            <legend>Grid Items:</legend>
          </fieldset>
          <Form.Item label="Title">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Image">
            <Input type="text" placeholder="Image Url" />
          </Form.Item>
          <Form.Item label="Link Text">
            <Input type="text" placeholder="Link Text" />
          </Form.Item>
          <Form.Item label="Link Url">
            <Input type="text" placeholder="Link Url" />
          </Form.Item>
          <Form.Item label="Content">
            <Input.TextArea />
          </Form.Item>
        </GridItemsWrapper>
      </Fragment>
    )
  }
}
