import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tinymce from 'tinymce'

import 'tinymce/themes/silver'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/table'

class TinyMCEditor extends Component {
  constructor() {
    super()
    this.state = { editor: null }
  }

  componentDidMount() {
    const { id, onEditorChange } = this.props
    tinymce.init({
      selector: `#${id}`,
      skin_url: `${process.env.PUBLIC_URL}/tinymce/skins/ui/oxide`,
      plugins: 'wordcount table',
      table_default_styles: {
        width: '50%',
      },
      setup: editor => {
        this.setState({ editor })
        editor.on('keyup change', () => {
          const content = editor.getContent()
          onEditorChange(content)
        })
      },
    })
  }

  componentWillUnmount() {
    const { editor } = this.state
    tinymce.remove(editor)
  }

  render() {
    const { id, content } = this.props
    return <textarea id={id} value={content} onChange={() => {}} />
  }
}

TinyMCEditor.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string,
  onEditorChange: PropTypes.func.isRequired,
}

export default TinyMCEditor
