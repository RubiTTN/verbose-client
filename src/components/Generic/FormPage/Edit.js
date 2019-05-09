import React, { Component } from 'react'
import { Card, message, Icon, Tooltip, Modal } from 'antd'
import keys from 'lodash/keys'
import { withApollo } from 'react-apollo'
import { object, string, array } from 'prop-types'

import Layout from '../../Layout'
import DataForm from '../DataForm'

class EditFormPage extends Component {
  static propTypes = {
      updateDataMutation: object.isRequired,
      getDataQuery: object.isRequired,
      deleteDataMutation: object,
      listPageUrl: string,
      title: string,
      fields: array.isRequired,
      match: object.isRequired,
      history: object,
  }
  state = {
      loaded: false,
  }
  componentDidMount () {
    const { client, match: {params : {id}}, getDataQuery, fields } = this.props
    client.query({ query: getDataQuery, variables: {id} }).then(({ data }) => {
      let formData = data[keys(data)[0]]
      fields.forEach(element => {
        if (element.optionsQuery) {
          formData[element.attribute] = formData[element.attribute].map(
            e => e[element.optionsQuery.valueKey || 'id']
          )
        }
      })
      this.setState({formData, loaded: true})
    })
  } 
  handleSubmit = (fields) => {
    const { client, title, updateDataMutation } = this.props
    client.mutate({
      mutation: updateDataMutation,
      variables: fields
    }).then(() => {
        message.success(`${title} Success!`)
    })
  }
  delete = () => {
    const { client, listPageUrl, deleteDataMutation, history } = this.props
    client.mutate({
      mutation: deleteDataMutation,
      variables: { id: this.state.formData.id }
    }).then(() => {
        message.success(`Successfully Deleted!`)
        history.push(listPageUrl)
    })

  }
  confirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete?',
      content: 'Once deleted. This cannot be undone!',
      onOk: this.delete,
    });
  }
  render() {
    const { title, fields, deleteDataMutation } = this.props
    const { loaded, formData } = this.state

    const renderDelete = deleteDataMutation ? <Tooltip title="Delete">
      <Icon onClick={this.confirm} type="delete" style={{fontSize: '20px'}}/>
    </Tooltip> : null

    return (
      <Layout>
        <Card title={title} extra={renderDelete}>
          { loaded && <DataForm initialValues={formData} fields={fields} onSubmit={this.handleSubmit}/> }
        </Card>
      </Layout>
    )
  }
}

export default withApollo(EditFormPage)
