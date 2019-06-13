import gql from 'graphql-tag'

export const REINGEST_PAGES = gql`
  mutation REINGEST_PAGES {
    reingestPages {
      status
    }
  }
`

export const MIGRATE_RC_PAGES = gql`
  mutation MIGRATE_RC_PAGES {
    migrateRcPages {
      status
    }
  }
`
