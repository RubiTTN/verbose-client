import React, { Component } from 'react'
import { Card, message } from 'antd'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'

import { UPLOAD_MEDIA } from '../mutations'
import { GET_MEDIA_FILES } from '../queries'

class AddMedia extends Component {
  uploadMedia = async variables => {
    const { client } = this.props
    const {
      data: { uploadMedia },
    } = await client.mutate({
      mutation: UPLOAD_MEDIA,
      variables,
      refetchQueries: [
        {
          query: GET_MEDIA_FILES,
        },
      ],
    })

    if (uploadMedia.url) message.success('Media Uploaded Successfully.')
    else message.error('Media Upload Failed.')
  }

  render() {
    return (
      <Card title="Add Media">
        <input
          type="file"
          required
          onChange={({
            target: {
              validity,
              files: [file],
            },
          }) => validity.valid && this.uploadMedia({ media: file })}
        />
      </Card>
    )
  }
}

AddMedia.propTypes = {
  client: PropTypes.object.isRequired,
}

export default withApollo(AddMedia)
