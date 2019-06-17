import gql from 'graphql-tag'

export const GET_PAGE = gql`
  {
    page @client {
      id
      title
      vertical
      type
      slug
      content
      url
      status
      template
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
      alignment
      content
      top
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
      alignment
      top
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
      alignment
      content
      top
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
      top
      video
      style
      alignment
      order
      media {
        id
        url
      }
    }
  }
`

export const GET_PAGE_FAQ_ACCORDIANS = gql`
  query GetPageFaqAccordions {
    pageFaqAccordions @client {
      id
      faqCategory
      order
    }
  }
`

export const GET_PAGE_FAQS = gql`
  query GetPageFaqs {
    pageFaqs @client {
      id
      faq
      order
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
      top
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
      top
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
      top
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
      top
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
      top
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
      top
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

export const GET_GRID_BY_ID = gql`
  query GetGridById($itemId: String) {
    gridById(itemId: $itemId) @client {
      id
      title
      content
      media {
        id
        url
      }
      order
      items {
        id
        title
        content
        linkText
        linkUrl
        media {
          id
          url
        }
      }
    }
  }
`

export const GET_GRIDS = gql`
  query GetGrids {
    grids @client {
      id
      title
      content
      media {
        id
        url
      }
      order
      items {
        id
        title
        content
        linkText
        linkUrl
        media {
          id
          url
        }
      }
    }
  }
`

export const GET_PAGES_DB = gql`
  query getPages($first: Int, $skip: Int, $filter: PageFilterInput) {
    pages(first: $first, skip: $skip, filter: $filter) {
      items {
        id
        title
        slug
        type
        vertical
        status
      }
      meta {
        total_count
      }
    }
  }
`

export const GET_PAGE_DB = gql`
  query getPage($id: ID) {
    page(id: $id) {
      id
      title
      slug
      url
      type
      vertical
      content
      status
      template
      media {
        id
        url
      }
      blocks {
        id
        title
        video
        alignment
        content
        top
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
        alignment
        content
        top
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
        top
        order
      }
      quickTips {
        id
        title
        content
        buttonText
        buttonLink
        top
        order
        media {
          id
          url
        }
      }
      prosAndCons {
        id
        title
        top
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
      faqAccordion {
        id
        faqCategory {
          id
        }
        order
      }
      faqs {
        id
        order
        faq {
          id
        }
      }
      grids {
        id
        order
        title
        media {
          id
          url
        }
        content
        items {
          id
          title
          content
          linkText
          linkUrl
          media {
            id
            url
          }
        }
      }
    }
  }
`

export const SEARCH_FAQS_DB = gql`
  query searchFaq($searchString: String) {
    searchFaq(searchString: $searchString) {
      id
      title
      description
    }
  }
`

export const GET_PAGE_FAQ_ACCORDIAN = gql`
  query GetPageFaqAccordion($itemId: String) {
    pageFaqAccordion(itemId: $itemId) @client {
      id
      order
      faqCategory
    }
  }
`

export const GET_PAGE_FAQ = gql`
  query GetPageFaq($itemId: String) {
    pageFaq(itemId: $itemId) @client {
      id
      order
      faq
    }
  }
`

export const GENERATE_PAGE_URL = gql`
  query generatePageUrl($slug: String!, $type: PageType!, $vertical: String!) {
    generatePageUrl(slug: $slug, type: $type, vertical: $vertical) {
      url
    }
  }
`
