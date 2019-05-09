import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import styled from 'styled-components'
import Particles from 'react-particles-js'
import particleConfig from '../../utils/particleConfig'
import StyledContainer from '../../styles/StyledContainer'
import FormWrapper from '../../styles/FormWrapper'
import Error from '../ErrorMessage'
import { CURRENT_USER_QUERY } from '../User'

const StyledHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${props => props.theme.neutralDark};
`

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, password } = this.state
    const { updateToken } = this.props
    return (
      <Fragment>
        <StyledContainer>
          <FormWrapper>
            <StyledHeader>Log into your account</StyledHeader>
            <Mutation
              mutation={LOGIN_MUTATION}
              variables={this.state}
              refetchQueries={[
                {
                  query: CURRENT_USER_QUERY,
                },
              ]}
              awaitRefetchQueries
            >
              {(login, { error, loading }) => (
                <Form
                  method="post"
                  onSubmit={async e => {
                    e.preventDefault()
                    await login()
                    this.setState({ email: '', password: '' })
                    updateToken();
                  }}
                >
                  <Error error={error} />
                  <Form.Item>
                    <Input
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="email"
                      placeholder="Username"
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
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ fontSize: '16px' }}
                    >
                      Log In
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

Login.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(Login)
