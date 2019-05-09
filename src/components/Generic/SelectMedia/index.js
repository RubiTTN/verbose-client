import React, { Component } from 'react'
import { Modal, Form, Button, Icon, Tooltip } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import findKey from 'lodash/findKey'

import MediaLibrary from '../../MediaLibrary'
import { MediaWrapper } from './styles'

class SelectMedia extends Component {
  state = { visible: false, selectedMedia: {} }

  selectImage = () => {
    this.setState({ visible: true })
  }

  onMediaSelect = selectedMedia => {
    this.setState({ selectedMedia })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      selectedMedia: {},
    })
  }

  handleOk = async () => {
    const { client, updateMediaMutation, variables } = this.props
    const { selectedMedia } = this.state

    const mediaKey = findKey(variables, val => val === 'selectedMediaValue')
    variables[mediaKey] = selectedMedia

    if (selectedMedia.id) {
      await client.mutate({
        mutation: updateMediaMutation,
        variables,
      })
    }

    this.setState({
      visible: false,
    })
  }

  removeImage = async () => {
    const { client, deleteMediaMutation, variables } = this.props
    await client.mutate({
      mutation: deleteMediaMutation,
      variables,
    })
  }

  render() {
    const { visible } = this.state
    const { currentMedia } = this.props

    const url = get(currentMedia, 'url')
    const renderMedia = url ? (
      <MediaWrapper>
        <img src={url} alt="" />
        <Tooltip title="Remove image">
          <Button type="danger" onClick={this.removeImage} size="small">
            <Icon type="close" />
          </Button>
        </Tooltip>
      </MediaWrapper>
    ) : null

    const renderMediaLibrary = visible ? (
      <Modal
        title="Select an Image"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={1400}
        style={{ top: 10 }}
        okText="Insert Image"
      >
        <MediaLibrary
          includeLayout={false}
          onMediaSelect={this.onMediaSelect}
        />
      </Modal>
    ) : null
    return (
      <div>
        <Form.Item label="Image">
          {renderMedia}
          <Button onClick={this.selectImage}>Select Image</Button>
        </Form.Item>
        {renderMediaLibrary}
      </div>
    )
  }
}

SelectMedia.propTypes = {
  client: PropTypes.object.isRequired,
  updateMediaMutation: PropTypes.object.isRequired,
  deleteMediaMutation: PropTypes.object,
  currentMedia: PropTypes.object,
  variables: PropTypes.object.isRequired,
}

export default withApollo(SelectMedia)
