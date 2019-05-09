import React, { Component } from 'react'
import { Form, Button, Modal, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import tinymce from 'tinymce'

import TinyMCEditor from '../../TinyMCEditor'
import MediaLibrary from '../../MediaLibrary'

class EditorBox extends Component {
  state = { visible: false, selectedMedia: {} }

  insertImage = () => {
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
    const { selectedMedia } = this.state
    const { id } = this.props

    if (selectedMedia.id) {
      tinymce.get(`${id}-editor`).insertContent(
        `<img src="${selectedMedia.url}" 
          title="${selectedMedia.title || ''}" 
          alt="${selectedMedia.altText || ''}" />`
      )
    }

    this.setState({
      visible: false,
    })
  }

  render() {
    const { label, name, value, onChange, id, insertImage } = this.props
    const { visible } = this.state

    const renderInsertImageBtn = insertImage ? (
      <Tooltip title="Insert image into editor" placement="right">
        <Button onClick={this.insertImage}>Insert Image</Button>
      </Tooltip>
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
      <Form.Item label={label}>
        {renderInsertImageBtn}
        {renderMediaLibrary}
        <TinyMCEditor
          id={`${id}-editor`}
          onEditorChange={value => onChange(null, name, value || '<p></p>')}
          content={value}
        />
      </Form.Item>
    )
  }
}

EditorBox.defaultProps = {
  insertImage: false,
}

EditorBox.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  insertImage: PropTypes.bool,
}

export default EditorBox
