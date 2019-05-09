import gql from 'graphql-tag'

export const UPDATE_PAGE = gql`
  mutation UpdatePage($name: String, $value: String, $pageId: String) {
    updatePage(name: $name, value: $value, pageId: $pageId) @client
  }
`

export const UPDATE_PAGE_MEDIA = gql`
  mutation UpdatePageMedia($media: Media, $pageId: String) {
    updatePageMedia(media: $media, pageId: $pageId) @client
  }
`

export const DELETE_PAGE_MEDIA = gql`
  mutation DeletePageMedia($pageId: String) {
    deletePageMedia(pageId: $pageId) @client
  }
`

export const UPDATE_BLOCK = gql`
  mutation UpdateBlock($name: String, $value: String, $itemId: String) {
    updateBlock(name: $name, value: $value, itemId: $itemId) @client
  }
`

export const UPDATE_BLOCK_MEDIA = gql`
  mutation UpdateBlockMedia($media: Media, $itemId: String) {
    updateBlockMedia(media: $media, itemId: $itemId) @client
  }
`

export const DELETE_BLOCK_MEDIA = gql`
  mutation DeleteBlockMedia($itemId: String) {
    deleteBlockMedia(itemId: $itemId) @client
  }
`

export const UPDATE_BOX = gql`
  mutation UpdateBox($name: String, $value: String, $itemId: String) {
    updateBox(name: $name, value: $value, itemId: $itemId) @client
  }
`

export const UPDATE_BOX_MEDIA = gql`
  mutation UpdateBoxMedia($media: Media, $itemId: String) {
    updateBoxMedia(media: $media, itemId: $itemId) @client
  }
`

export const DELETE_BOX_MEDIA = gql`
  mutation DeleteBoxMedia($itemId: String) {
    deleteBoxMedia(itemId: $itemId) @client
  }
`

export const UPDATE_ALERT_BOX = gql`
  mutation UpdateAlertBox($name: String, $value: String, $itemId: String) {
    updateAlertBox(name: $name, value: $value, itemId: $itemId) @client
  }
`

export const UPDATE_QUICK_TIP = gql`
  mutation UpdateQuickTip($name: String, $value: String, $itemId: String) {
    updateQuickTip(name: $name, value: $value, itemId: $itemId) @client
  }
`
export const UPDATE_QUICK_TIP_MEDIA = gql`
  mutation UpdateQuickTip($media: Media, $itemId: String) {
    updateQuickTipMedia(media: $media, itemId: $itemId) @client
  }
`

export const DELETE_QUICK_TIP_MEDIA = gql`
  mutation DeleteQuickTipMedia($itemId: String) {
    deleteQuickTipMedia(itemId: $itemId) @client
  }
`

export const UPDATE_PROS_AND_CONS = gql`
  mutation UpdateProsAndCons(
    $name: String
    $value: String
    $itemId: String
    $prosId: ID
    $consId: ID
  ) {
    updateProsAndCons(
      name: $name
      value: $value
      itemId: $itemId
      prosId: $prosId
      consId: $consId
    ) @client
  }
`

export const ADD_PROS_OR_CONS = gql`
  mutation AddProsOrCons($itemId: String, $prosOrCons: String) {
    addProsOrCons(itemId: $itemId, prosOrCons: $prosOrCons) @client
  }
`

export const REMOVE_PROS_OR_CONS = gql`
  mutation RemoveProsOrCons($itemId: String, $prosOrConsId: Id) {
    removeProsOrCons(itemId: $itemId, prosOrConsId: $prosOrConsId) @client
  }
`

export const ADD_PAGE_ITEM = gql`
  mutation AddPageItem($type: String!) {
    addPageItem(type: $type) @client
  }
`

export const REMOVE_PAGE_ITEM = gql`
  mutation RemovePageItem($itemId: ID, $type: String) {
    removePageItem(itemId: $itemId, type: $type) @client
  }
`

export const ORDER_PAGE_ITEMS = gql`
  mutation OrderPageItems($itemIds: [String]!) {
    orderPageItems(itemIds: $itemIds) @client
  }
`

export const REPLACE_PAGE_ITEMS_ID = gql`
  mutation ReplacePageItemsId($itemId: String!, $newItemId: String!) {
    replacePageItemsId(itemId: $itemId, newItemId: $newItemId) @client
  }
`

export const UPSERT_PAGE_TO_DB = gql`
  mutation UPSERT_PAGE(
    $id: ID!
    $title: String!
    $media: ID
    $slug: String!
    $type: PageType!
    $vertical: String
    $status: PageStatus!
  ) {
    upsertPage(
      id: $id
      media: $media
      title: $title
      slug: $slug
      type: $type
      vertical: $vertical
      status: $status
    ) {
      id
      title
      slug
      type
      vertical
      status
    }
  }
`

export const UPSERT_BLOCK_TO_DB = gql`
  mutation UPSERT_BLOCK(
    $id: ID!
    $page: ID!
    $media: ID
    $title: String!
    $video: String
    $style: String
    $content: String
    $order: Int
  ) {
    upsertBlock(
      id: $id
      page: $page
      media: $media
      title: $title
      video: $video
      style: $style
      content: $content
      order: $order
    ) {
      id
      title
      video
      style
      content
      order
    }
  }
`

export const DELETE_BLOCK_TO_DB = gql`
  mutation DELETE_BLOCK($id: ID!) {
    deleteBlock(id: $id) {
      id
    }
  }
`

export const UPSERT_BOX_TO_DB = gql`
  mutation UPSERT_BOX(
    $id: ID!
    $page: ID!
    $media: ID
    $title: String!
    $video: String
    $style: String
    $content: String
    $order: Int
  ) {
    upsertBox(
      id: $id
      page: $page
      media: $media
      title: $title
      video: $video
      style: $style
      content: $content
      order: $order
    ) {
      id
      title
      video
      style
      content
      order
    }
  }
`

export const DELETE_BOX_TO_DB = gql`
  mutation DELETE_BOX($id: ID!) {
    deleteBox(id: $id) {
      id
    }
  }
`

export const UPSERT_ALERT_BOX_TO_DB = gql`
  mutation UPSERT_ALERT_BOX(
    $id: ID!
    $page: ID!
    $title: String!
    $content: String
    $prefix: String
    $style: String
    $order: Int
  ) {
    upsertAlertBox(
      id: $id
      page: $page
      title: $title
      content: $content
      prefix: $prefix
      order: $order
      style: $style
    ) {
      id
      title
      content
      prefix
      style
      order
    }
  }
`

export const DELETE_ALERT_BOX_TO_DB = gql`
  mutation DELETE_ALERT_BOX($id: ID!) {
    deleteAlertBox(id: $id) {
      id
    }
  }
`

export const UPSERT_QUICK_TIP_TO_DB = gql`
  mutation UPSERT_QUICK_TIP(
    $id: ID!
    $page: ID!
    $media: ID
    $title: String!
    $content: String
    $buttonText: String
    $buttonLink: String
    $order: Int
  ) {
    upsertQuickTip(
      id: $id
      page: $page
      media: $media
      title: $title
      content: $content
      buttonText: $buttonText
      buttonLink: $buttonLink
      order: $order
    ) {
      id
      title
      content
      buttonText
      buttonLink
      order
    }
  }
`

export const DELETE_QUICK_TIP_TO_DB = gql`
  mutation DELETE_QUICK_TIP($id: ID!) {
    deleteQuickTip(id: $id) {
      id
    }
  }
`

export const UPSERT_PROS_AND_CONS_TO_DB = gql`
  mutation UPSERT_PROS_AND_CONS(
    $id: ID!
    $page: ID!
    $title: String
    $pros: [ProConInput]
    $cons: [ProConInput]
    $order: Int
  ) {
    upsertProsAndCons(
      id: $id
      page: $page
      title: $title
      pros: $pros
      cons: $cons
      order: $order
    ) {
      id
      title
      order
    }
  }
`

export const DELETE_PROS_AND_CONS_TO_DB = gql`
  mutation DELETE_PROS_AND_CONS($id: ID!) {
    deleteProsAndCons(id: $id) {
      id
    }
  }
`

export const UPDATE_SECTIONS_ORDER_TO_DB = gql`
  mutation UPDATE_SECTIONS_ORDER($sectionsOrder: [SectionsOrder]!) {
    updateSectionsOrder(sectionsOrder: $sectionsOrder) {
      id
    }
  }
`
