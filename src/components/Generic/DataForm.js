import React from 'react'
import { Form } from 'antd'
import { array, func } from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import { withApollo } from 'react-apollo'
import { titleCase } from 'change-case'

import InputBox from './InputBox'
import PublishButton from './PublishButton'
import gql from 'graphql-tag'

export const CURRENT_USER = gql`
  query {
    me @client {
      id
    }
  }
`
class DataForm extends React.Component {

  static propTypes = {
    fields: array.isRequired,
    onSubmit: func.isRequired,
  }
  constructor (props) {
    super(props)
    const { initialValues = {} } = props 
    this.state = initialValues
  }

  handleInputChange = (e, name, value) => {
    name = name || e.target.name
    value = value || e.target.value
    this.setState({[name]: value})
  }

  handleSubmit = () => {
    const { onSubmit, client, fields } = this.props
    let formFields = {...this.state}
    if (find(fields, {attribute: 'authors'}) && isEmpty(formFields.authors)) {
      const { me: {id: userId} } = client.readQuery({ query: CURRENT_USER })
      formFields.authors = [userId]
    }
    if (find(fields, {attribute: 'order'})) {
      if (formFields.order) {
        formFields.order = parseInt(formFields.order)
      }
      else {
        delete formFields.order
      }
    }
    onSubmit(formFields)
  }

  getFormField = ({ Component, attribute, label, ...rest}) => {
    Component = Component ? Component : InputBox
    let props = {
        key: attribute,
        name: attribute,
        label: label || titleCase(attribute),
        value: this.state[attribute],
        onChange: this.handleInputChange,
        ...rest
    }
    return React.createElement(Component, props)
  }

  render() {
    const { fields }= this.props
    const renderFields = fields.map(element => this.getFormField(element))
    return (
      <Form>
        { renderFields }
        <PublishButton onClick={this.handleSubmit} />
      </Form>
    )
  }
}

export default withApollo(DataForm)