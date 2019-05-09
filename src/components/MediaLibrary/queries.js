import gql from 'graphql-tag'

export const GET_MEDIA_FILES = gql`
  query getMediaFiles {
    mediaFiles {
      id
      url
      title
      altText
    }
  }
`
export const GET_MEDIA_FILE = gql`
  query getMediaFile($id: ID) {
    mediaFile(id: $id) {
      id
      url
      title
      altText
    }
  }
`
