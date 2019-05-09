import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

const PublishButtonsWrapper = styled.div`
    text-align: right;
`

export default function PublishButton (props) {
  return (
    <PublishButtonsWrapper>
      <Button type="primary" onClick={props.onClick}>
        Publish
      </Button>
    </PublishButtonsWrapper>
  )
}