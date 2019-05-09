import gql from 'graphql-tag'

export const UPLOAD_MEDIA = gql`
  mutation uploadMedia($media: Upload!) {
    uploadMedia(media: $media) {
      url
    }
  }
`

export const UPDATE_MEDIA = gql`
  mutation updateMedia($id: ID!, $title: String, $altText: String) {
    updateMedia(id: $id, title: $title, altText: $altText) {
      id
      title
      altText
    }
  }
`
