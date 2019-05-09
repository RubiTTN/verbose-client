import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Layout from '../Layout'
import AddMedia from './Add'
import ListMedia from './List'
import { ListMediaWrapper } from './styles'

class MediaLibrary extends Component {
  render() {
    const { includeLayout, onMediaSelect } = this.props

    const content = (
      <Fragment>
        <AddMedia />
        <ListMediaWrapper>
          <ListMedia onMediaSelect={onMediaSelect} />
        </ListMediaWrapper>
      </Fragment>
    )
    const renderMediaLibrary = includeLayout ? (
      <Layout>{content}</Layout>
    ) : (
      content
    )
    return <Fragment>{renderMediaLibrary}</Fragment>
  }
}

MediaLibrary.defaultProps = {
  includeLayout: true,
}

MediaLibrary.propTypes = {
  includeLayout: PropTypes.bool,
  onMediaSelect: PropTypes.func,
}

export default MediaLibrary
