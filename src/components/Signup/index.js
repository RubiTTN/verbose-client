import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Particles from 'react-particles-js'
import particleConfig from '../../utils/particleConfig'
import Error from '../ErrorMessage'

import FormWrapper from '../../styles/FormWrapper'
import StyledContainer from '../../styles/StyledContainer'

const StyledHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${props => props.theme.neutralDark};
`

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { name, email, password } = this.state
    return (
      <Fragment>
        <StyledContainer>
          <FormWrapper>
            <StyledHeader>Sign up for an account</StyledHeader>
            <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
              {(signup, { error, loading }) => (
                <Form
                  method="post"
                  onSubmit={async e => {
                    e.preventDefault()
                    const res = await signup()
                    console.log(res)
                    this.setState({ name: '', email: '', password: '' })
                  }}
                >
                  <Form.Item>
                    <Error error={error} />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Email will be the username"
                      name="email"
                      value={email}
                      onChange={this.saveToState}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={this.saveToState}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Full name"
                      name="name"
                      value={name}
                      onChange={this.saveToState}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Sign up
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Mutation>
          </FormWrapper>
        </StyledContainer>
        <Particles
          params={particleConfig}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </Fragment>
    )
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(Signup)
