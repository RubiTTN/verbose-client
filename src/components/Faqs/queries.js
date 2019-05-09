import gql from 'graphql-tag'

export const CURRENT_USER = gql`
  query {
    me @client {
      id
    }
  }
`

export const GET_USERS = gql`
    {
        users {
            id
            email
        }
    }
`

export const GET_FAQ_CATEGORIES = gql`
    {
        faqCategories {
            id
            name
        }
    }
`

export const GET_FAQ_DB = gql`
    query getFaq($id: ID) {
        faq(id: $id) {
            id
            title
            description
            short_description
            vertical
            authors {
                id
            }
            category {
                id
            }
            variant
            tag
            slug
            order
        }
    }
`

export const GET_FAQS_DB = gql`
    {
        faqs {
            id
            title
            description
            short_description
            vertical
            authors {
                id
            }
            category {
                id
            }
            variant
            tag
            slug
            order
        }
    }
`