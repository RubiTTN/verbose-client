import gql from 'graphql-tag'

export const GET_FAQ_DB = gql`
    query faq($id: ID){
        faq(id:$id) {
            title
            description
        }
    }
`