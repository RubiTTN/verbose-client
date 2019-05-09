import gql from 'graphql-tag'

export const SAVE_FAQ_TO_DB = gql`
  mutation ADD_FAQ(
    $title: String!
    $slug: String!
    $description: String
    $short_description: String
    $vertical: String
    $order: Int
    $authors: [ID!]!
    $category: [ID!]
    $variant: [String]
    $tag: [String]
  ) {
    addFaq(
      title: $title
      slug: $slug
      description: $description
      short_description: $short_description
      vertical: $vertical
      order: $order
      authors: $authors
      category: $category
      variant: $variant
      tag: $tag
    ) {
      id
      title
      slug
      vertical
    }
  }
`

export const UPDATE_FAQ_TO_DB = gql`
  mutation UPDATE_FAQ(
    $id: ID!
    $title: String!
    $slug: String!
    $description: String
    $short_description: String
    $vertical: String
    $order: Int
    $authors: [ID!]!
    $category: [ID!]
    $variant: [String]
    $tag: [String]
  ) {
    updateFaq(
      id: $id
      title: $title
      slug: $slug
      description: $description
      short_description: $short_description
      vertical: $vertical
      order: $order
      authors: $authors
      category: $category
      variant: $variant
      tag: $tag
    ) {
      id
      title
      slug
      vertical
    }
  }
`

export const DELETE_FAQ = gql`
  mutation deleteFaq($id: ID!) {
    deleteFaq(id: $id) {
      id
    }
  }
`