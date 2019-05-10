import React, { Component } from 'react'
import { Card, message } from 'antd'
import keys from 'lodash/keys'
import { withApollo } from 'react-apollo'
import { object, string, array } from 'prop-types'

import DataForm from '../DataForm'

class CreateFormPage extends Component {
  static propTypes = {
    saveDataMutation: object.isRequired,
    editUrl: string,
    title: string,
    fields: array.isRequired,
    history: object.isRequired,
  }

  handleSubmit = fields => {
    const { client, history, title, editUrl, saveDataMutation } = this.props
    client
      .mutate({
        mutation: saveDataMutation,
        variables: fields,
      })
      .then(({ data }) => {
        const id = data[keys(data)[0]].id
        message.success(`${title} Success!`)
        history.push(`${editUrl}/${id}`)
      })
  }

  render() {
    const { title, fields } = this.props
    return (
      <Card title={title}>
        <DataForm fields={fields} onSubmit={this.handleSubmit} />
      </Card>
    )
  }
}

export default withApollo(CreateFormPage)
