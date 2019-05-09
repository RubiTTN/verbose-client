import React from 'react'
import { Form, Input } from 'antd'

export default function InputBox(props) {
  const { label, type, ...rest } = props
  let Component = type === 'textarea' ? Input.TextArea : Input
  return (
    <Form.Item label={label}>
      <Component
        {...rest}
        type={type || "text"}
      />
    </Form.Item>
  )
}