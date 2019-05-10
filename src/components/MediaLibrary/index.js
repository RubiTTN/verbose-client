import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import AddMedia from './Add'
import ListMedia from './List'
import { ListMediaWrapper } from './styles'

class MediaLibrary extends Component {
  render() {
    const { onMediaSelect } = this.props
    return (
      <Fragment>
        <AddMedia />
        <ListMediaWrapper>
          <ListMedia onMediaSelect={onMediaSelect} />
        </ListMediaWrapper>
      </Fragment>
    )
  }
}

MediaLibrary.propTypes = {
  onMediaSelect: PropTypes.func,
}

export default MediaLibrary
