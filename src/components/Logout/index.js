import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from 'antd'
import { CURRENT_USER_QUERY } from '../User'

const LOG_OUT_MUTATION = gql`
  mutation LOG_OUT_MUTATION {
    logout {
      message
    }
  }
`
const Logout = props => (
  <Mutation
    mutation={LOG_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {logout => <Button onClick={logout}>Log Out</Button>}
  </Mutation>
)

export default Logout
