import gql from 'graphql-tag'

export const CURRENT_USER = gql`
  query {
    me @client {
      id
    }
  }
`

export const GET_FAQ_CATEGORY_DB = gql`
    query getFaqCategory($id: ID) {
        faqCategory(id: $id) {
            id
            name
            slug
            description
        }
    }
`

export const GET_FAQ_CATEGORIES_DB = gql`
  query getFaqCategories($first: Int $skip:Int, $filter: FaqCategoryFilterInput) {
    faqCategories(first: $first skip: $skip, filter: $filter) {         
      items {
        id
        name
        slug
        description
        faqs {
          id
        }
      }
      meta {
        total_count
      }
    }
  }
`