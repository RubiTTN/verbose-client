import gql from 'graphql-tag'

export const SAVE_FAQ_CATEGORY_TO_DB = gql`
  mutation ADD_FAQ_CATEGORY(
    $name: String!
    $slug: String!
    $description: String!
  ) {
    addFaqCategory(
      name: $name
      slug: $slug
      description: $description
    ) {
      id
      name
      slug
      description
    }
  }
`

export const UPDATE_FAQ_CATEGORY_TO_DB = gql`
  mutation UPDATE_FAQ(
    $id: ID!
    $name: String!
    $slug: String!
    $description: String!
  ) {
    updateFaqCategory(
      id: $id
      name: $name
      slug: $slug
      description: $description
    ) {
      id
      name
      slug
      description
    }
  }
`

export const DELETE_FAQ_CATEGORY = gql`
  mutation deleteFaqCategory($id: ID!) {
    deleteFaqCategory(id: $id) {
      id
    }
  }
`