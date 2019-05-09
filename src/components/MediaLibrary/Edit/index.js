import React, { Component } from 'react'
import { Card, Form, Input, Button, message } from 'antd'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'

import { EditMediaWrapper } from './styles'
import { GET_MEDIA_FILE } from '../queries'
import { UPDATE_MEDIA } from '../mutations'

const { TextArea } = Input

class EditMedia extends Component {
  state = {
    title: '',
    altText: '',
  }

  componentDidMount() {
    this.fetchMediaData()
  }

  fetchMediaData = async () => {
    const { client, mediaId } = this.props
    client
      .query({
        query: GET_MEDIA_FILE,
        variables: { id: mediaId },
      })
      .then(res => {
        this.setState({
          title: res.data.mediaFile.title,
          altText: res.data.mediaFile.altText,
        })
      })
  }

  handleSubmit = async e => {
    e.preventDefault()

    const { client, mediaId } = this.props
    const { title, altText } = this.state

    const {
      data: { updateMedia },
    } = await client.mutate({
      mutation: UPDATE_MEDIA,
      variables: {
        id: mediaId,
        title,
        altText,
      },
    })

    if (updateMedia.id) message.success('Media Updated Successfully.')
    else message.error('Media Update Failed.')
  }

  render() {
    const { title, altText } = this.state
    return (
      <EditMediaWrapper>
        <Card title="Edit Media">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Title">
              <Input
                type="text"
                value={title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Alt Text">
              <TextArea
                autosize={{ minRows: 2, maxRows: 6 }}
                value={altText}
                onChange={e => this.setState({ altText: e.target.value })}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </EditMediaWrapper>
    )
  }
}

EditMedia.propTypes = {
  mediaId: PropTypes.string,
  client: PropTypes.object,
}

export default withApollo(EditMedia)
