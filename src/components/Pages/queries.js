import gql from 'graphql-tag'

export const GET_PAGE = gql`
  {
    page @client {
      id
      title
      vertical
      type
      slug
      status
      media {
        id
        url
      }
    }
  }
`

export const GET_PAGE_ITEMS = gql`
  query GetPageItems {
    pageItems @client {
      itemId
      type
    }
  }
`

export const GET_BLOCKS = gql`
  query GetBlocks {
    blocks @client {
      id
      title
      video
      style
      content
      order
      media {
        id
        url
      }
    }
  }
`

export const GET_BLOCK = gql`
  query GetBlock($itemId: String) {
    block(itemId: $itemId) @client {
      id
      title
      content
      video
      style
      order
      media {
        id
        url
      }
    }
  }
`

export const GET_BOXES = gql`
  query GetBoxes {
    boxes @client {
      id
      title
      video
      style
      content
      order
      media {
        id
        url
      }
    }
  }
`

export const GET_BOX = gql`
  query GetBox($itemId: String) {
    box(itemId: $itemId) @client {
      id
      title
      content
      video
      style
      order
      media {
        id
        url
      }
    }
  }
`

export const GET_ALERT_BOXES = gql`
  query GetAlertBoxes {
    alertBoxes @client {
      id
      title
      content
      prefix
      style
      order
    }
  }
`

export const GET_ALERT_BOX = gql`
  query GetBox($itemId: String) {
    alertBox(itemId: $itemId) @client {
      id
      title
      content
      prefix
      style
      order
    }
  }
`

export const GET_QUICK_TIPS = gql`
  query GetQuickTips {
    quickTips @client {
      id
      title
      content
      buttonText
      buttonLink
      order
      media {
        id
        url
      }
    }
  }
`

export const GET_QUICK_TIP = gql`
  query GetQuickTip($itemId: String) {
    quickTip(itemId: $itemId) @client {
      id
      title
      content
      buttonText
      buttonLink
      order
      media {
        id
        url
      }
    }
  }
`

export const GET_PROS_AND_CONS = gql`
  query GetProsAndCons {
    prosAndCons @client {
      id
      title
      order
      pros {
        id
        content
      }
      cons {
        id
        content
      }
    }
  }
`

export const GET_PROS_AND_CONS_BY_ID = gql`
  query GetProsAndConsById($itemId: String) {
    prosAndConsById(itemId: $itemId) @client {
      id
      title
      order
      pros {
        id
        content
      }
      cons {
        id
        content
      }
    }
  }
`

export const GET_PAGES_DB = gql`
  query getPages {
    pages {
      id
      title
      slug
      type
      vertical
      status
    }
  }
`

export const GET_PAGE_DB = gql`
  query getPage($id: ID) {
    page(id: $id) {
      id
      title
      slug
      type
      vertical
      status
      media {
        id
        url
      }
      blocks {
        id
        title
        video
        style
        content
        order
        media {
          id
          url
        }
      }
      boxes {
        id
        title
        video
        style
        content
        order
        media {
          id
          url
        }
      }
      alertBoxes {
        id
        title
        content
        prefix
        style
        order
      }
      quickTips {
        id
        title
        content
        buttonText
        buttonLink
        order
        media {
          id
          url
        }
      }
      prosAndCons {
        id
        title
        order
        pros {
          id
          content
        }
        cons {
          id
          content
        }
      }
    }
  }
`
