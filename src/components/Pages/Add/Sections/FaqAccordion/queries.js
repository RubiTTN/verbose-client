import gql from 'graphql-tag'

export const GET_FAQ_CATEGORY_DB = gql`
query faqCategory($id: ID){
  faqCategory(id: $id) {
    faqs {
      title
    }
  }
}
`