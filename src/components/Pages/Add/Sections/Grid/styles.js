import styled from 'styled-components'
import { Button } from 'antd'

export const GridItemsWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
  .ant-card {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
`

export const BoxSaveButtonWrapper = styled.div`
  text-align: right;
  margin-top: 20px;
  .ant-btn {
    margin-left: 10px;
  }
`

export const AddMoreButton = styled(Button)`
  margin: 20px auto 0;
`
