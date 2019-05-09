import shortid from 'shortid'
import gql from 'graphql-tag'
import remove from 'lodash/remove'
import { sentenceCase } from 'change-case'

import {
  GET_PAGE_ITEMS,
  GET_BLOCKS,
  GET_BOXES,
  GET_ALERT_BOXES,
  GET_PROS_AND_CONS,
  GET_QUICK_TIPS,
} from './components/Pages/queries'

export const resolvers = {
  Query: {
    pageItems: (_root, variables, { cache }) => {
      const { pageItems } = cache.readQuery({ query: GET_PAGE_ITEMS })
      return pageItems
    },
    block: (_root, variables, { cache }) => {
      const { itemId } = variables
      const { blocks } = cache.readQuery({ query: GET_BLOCKS })
      const block = blocks.filter(item => item.id === itemId)[0]
      return block
    },
    box: (_root, variables, { cache }) => {
      const { itemId } = variables

      const { boxes } = cache.readQuery({ query: GET_BOXES })
      const box = boxes.filter(item => item.id === itemId)[0]

      return box
    },
    alertBox: (_root, variables, { cache }) => {
      const { itemId } = variables
      const { alertBoxes } = cache.readQuery({ query: GET_ALERT_BOXES })
      const alertBox = alertBoxes.filter(item => item.id === itemId)[0]
      return alertBox
    },
    quickTip: (_root, variables, { cache }) => {
      const { itemId } = variables
      const { quickTips } = cache.readQuery({ query: GET_QUICK_TIPS })

      const quickTip = quickTips.filter(item => item.id === itemId)[0]

      return quickTip
    },
    prosAndConsById: (_root, variables, { cache }) => {
      const { itemId } = variables

      const { prosAndCons } = cache.readQuery({ query: GET_PROS_AND_CONS })
      const prosAndConsDoc = prosAndCons.filter(item => item.id === itemId)[0]

      return prosAndConsDoc
    },
  },
  Mutation: {
    updatePage: (_root, variables, { cache, getCacheKey }) => {
      const { name, value, pageId } = variables

      const id = getCacheKey({ __typename: 'Page', id: pageId })
      const fragment = gql`
        fragment updatePage on Page {
          ${name}
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, [`${name}`]: value }
      cache.writeData({ id, data })
    },
    updatePageMedia: (_root, variables, { cache, getCacheKey }) => {
      const { media, pageId } = variables

      const id = getCacheKey({ __typename: 'Page', id: pageId })
      const fragment = gql`
        fragment updatePage on Page {
          media {
            id
            url
          }
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, media }
      cache.writeData({ id, data })
    },
    deletePageMedia: (_root, variables, { cache, getCacheKey }) => {
      const { pageId } = variables

      const id = getCacheKey({ __typename: 'Page', id: pageId })
      const fragment = gql`
        fragment updatePage on Page {
          media {
            id
            url
          }
        }
      `
      const previous = cache.readFragment({ fragment, id })
      previous.media = null
      cache.writeData({ id, data: previous })
    },
    orderPageItems: (_root, variables, { cache }) => {
      const { itemIds } = variables
      const { pageItems } = cache.readQuery({ query: GET_PAGE_ITEMS })

      const data = {
        pageItems: [],
      }

      itemIds.forEach(itemId => {
        pageItems.forEach(item => {
          if (item.itemId === itemId) data.pageItems.push(item)
        })
      })

      cache.writeQuery({ query: GET_PAGE_ITEMS, data })

      return data
    },
    addPageItem: (_root, variables, { cache }) => {
      const { type } = variables
      const { pageItems } = cache.readQuery({ query: GET_PAGE_ITEMS })

      const newPageItem = {
        type,
        itemId: shortid.generate(),
        __typename: 'PageItem',
      }

      let data = {
        pageItems: [...pageItems, newPageItem],
      }
      cache.writeQuery({ query: GET_PAGE_ITEMS, data })

      const order = pageItems.length

      // blocks
      if (type === 'Block') {
        const { blocks } = cache.readQuery({ query: GET_BLOCKS })
        const newBlock = {
          id: newPageItem.itemId,
          title: '',
          content: '<p></p>',
          video: '',
          style: 'full-width',
          order,
          media: {
            id: null,
            url: null,
            __typename: 'Media',
          },
          __typename: 'Block',
        }
        data = {
          blocks: [...blocks, newBlock],
        }
        cache.writeQuery({ query: GET_BLOCKS, data })
      } else if (type === 'Box') {
        const { boxes } = cache.readQuery({ query: GET_BOXES })
        const newBox = {
          id: newPageItem.itemId,
          title: '',
          content: '<p></p>',
          video: '',
          style: 'white',
          order,
          media: {
            id: null,
            url: null,
            __typename: 'Media',
          },
          __typename: 'Box',
        }
        data = {
          boxes: [...boxes, newBox],
        }
        cache.writeQuery({ query: GET_BOXES, data })
      } else if (type === 'AlertBox') {
        const { alertBoxes } = cache.readQuery({ query: GET_ALERT_BOXES })
        const newAlertBox = {
          id: newPageItem.itemId,
          title: '',
          content: '<p></p>',
          prefix: '',
          style: 'tip',
          order,
          __typename: 'AlertBox',
        }
        data = {
          alertBoxes: [...alertBoxes, newAlertBox],
        }
        cache.writeQuery({ query: GET_ALERT_BOXES, data })
      } else if (type === 'QuickTip') {
        const { quickTips } = cache.readQuery({ query: GET_QUICK_TIPS })
        const newquickTip = {
          id: newPageItem.itemId,
          title: '',
          content: '<p></p>',
          buttonText: '',
          buttonLink: '',
          media: {
            id: null,
            url: null,
            __typename: 'Media',
          },
          order,
          __typename: 'QuickTip',
        }
        data = {
          quickTips: [...quickTips, newquickTip],
        }
        cache.writeQuery({ query: GET_QUICK_TIPS, data })
      } else if (type === 'ProsAndCons') {
        const { prosAndCons } = cache.readQuery({ query: GET_PROS_AND_CONS })
        const newProsAndCons = {
          id: newPageItem.itemId,
          title: '',
          pros: [
            {
              id: shortid.generate(),
              content: '',
              __typename: 'Pros',
            },
          ],
          cons: [
            {
              id: shortid.generate(),
              content: '',
              __typename: 'Cons',
            },
          ],
          order,
          __typename: 'ProsAndCons',
        }
        data = {
          prosAndCons: [...prosAndCons, newProsAndCons],
        }
        cache.writeQuery({ query: GET_PROS_AND_CONS, data })
      }

      return data
    },
    removePageItem: (_root, variables, { cache }) => {
      const { itemId, type } = variables

      const { pageItems } = cache.readQuery({ query: GET_PAGE_ITEMS })
      remove(pageItems, pageItem => pageItem.itemId === itemId)

      let data = {
        pageItems,
      }

      cache.writeQuery({ query: GET_PAGE_ITEMS, data })

      if (type === 'Block') {
        const { blocks } = cache.readQuery({ query: GET_BLOCKS })
        remove(blocks, block => block.id === itemId)
        data = {
          blocks,
        }
        cache.writeQuery({ query: GET_BLOCKS, data })
      } else if (type === 'Box') {
        const { boxes } = cache.readQuery({ query: GET_BOXES })
        remove(boxes, box => box.id === itemId)
        data = {
          boxes,
        }
        cache.writeQuery({ query: GET_BLOCKS, data })
      } else if (type === 'ProsAndCons') {
        const { prosAndCons } = cache.readQuery({ query: GET_PROS_AND_CONS })
        remove(prosAndCons, elem => elem.id === itemId)
        data = {
          prosAndCons,
        }
        cache.writeQuery({ query: GET_PROS_AND_CONS, data })
      }

      return data
    },
    replacePageItemsId: (_root, variables, { cache, getCacheKey }) => {
      const { itemId, newItemId } = variables

      let { pageItems } = cache.readQuery({ query: GET_PAGE_ITEMS })
      pageItems = pageItems.map(pageItem => {
        if (pageItem.itemId === itemId) pageItem.itemId = newItemId
        return pageItem
      })
      const data = {
        pageItems,
      }

      cache.writeQuery({ query: GET_PAGE_ITEMS, data })
    },
    updateBlock: (_root, variables, { cache, getCacheKey }) => {
      const { name, value, itemId } = variables

      const id = getCacheKey({ __typename: 'Block', id: itemId })
      const fragment = gql`
        fragment updateBlock on Block {
          ${name}
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, [`${name}`]: value }
      cache.writeData({ id, data })
    },
    updateBlockMedia: (_root, variables, { cache, getCacheKey }) => {
      const { media, itemId } = variables

      const id = getCacheKey({ __typename: 'Block', id: itemId })
      const fragment = gql`
        fragment updateBlock on Block {
          media {
            id
            url
          }
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, media }
      cache.writeData({ id, data })
    },
    deleteBlockMedia: (_root, variables, { cache, getCacheKey }) => {
      const { itemId } = variables

      const id = getCacheKey({ __typename: 'Block', id: itemId })
      const fragment = gql`
        fragment updateBlock on Block {
          media {
            id
            url
          }
        }
      `
      const previous = cache.readFragment({ fragment, id })
      previous.media = null
      cache.writeData({ id, data: previous })
    },
    updateBox: (_root, variables, { cache, getCacheKey }) => {
      const { name, value, itemId } = variables

      const id = getCacheKey({ __typename: 'Box', id: itemId })
      const fragment = gql`
        fragment updateBox on Box {
          ${name}
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, [`${name}`]: value }
      cache.writeData({ id, data })
    },
    updateBoxMedia: (_root, variables, { cache, getCacheKey }) => {
      const { media, itemId } = variables

      const id = getCacheKey({ __typename: 'Box', id: itemId })
      const fragment = gql`
        fragment updateBox on Box {
          media {
            id
            url
          }
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, media }
      cache.writeData({ id, data })
    },
    deleteBoxMedia: (_root, variables, { cache, getCacheKey }) => {
      const { itemId } = variables

      const id = getCacheKey({ __typename: 'Box', id: itemId })
      const fragment = gql`
        fragment updateBox on Box {
          media {
            id
            url
          }
        }
      `
      const previous = cache.readFragment({ fragment, id })
      previous.media = null
      cache.writeData({ id, data: previous })
    },
    updateAlertBox: (_root, variables, { cache, getCacheKey }) => {
      const { name, value, itemId } = variables

      const id = getCacheKey({ __typename: 'AlertBox', id: itemId })
      const fragment = gql`
        fragment updateAlertBox on AlertBox {
          ${name}
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, [`${name}`]: value }
      cache.writeData({ id, data })
    },
    updateQuickTip: (_root, variables, { cache, getCacheKey }) => {
      const { name, value, itemId } = variables

      const id = getCacheKey({ __typename: 'QuickTip', id: itemId })
      const fragment = gql`
        fragment updateQuickTip on QuickTip {
          ${name}
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, [`${name}`]: value }
      cache.writeData({ id, data })
    },
    updateQuickTipMedia: (_root, variables, { cache, getCacheKey }) => {
      const { media, itemId } = variables

      const id = getCacheKey({ __typename: 'QuickTip', id: itemId })
      const fragment = gql`
        fragment updateQuickTip on QuickTip {
          media {
            id
            url
          }
        }
      `
      const previous = cache.readFragment({ fragment, id })

      const data = { ...previous, media }
      cache.writeData({ id, data })
    },
    deleteQuickTipMedia: (_root, variables, { cache, getCacheKey }) => {
      const { itemId } = variables

      const id = getCacheKey({ __typename: 'QuickTip', id: itemId })
      const fragment = gql`
        fragment updateQuickTip on QuickTip {
          media {
            id
            url
          }
        }
      `
      const previous = cache.readFragment({ fragment, id })
      previous.media = null
      cache.writeData({ id, data: previous })
    },
    updateProsAndCons: (_root, variables, { cache, getCacheKey }) => {
      const { name, value, itemId, prosId, consId } = variables

      if (!prosId && !consId) {
        const id = getCacheKey({ __typename: 'ProsAndCons', id: itemId })
        const fragment = gql`
          fragment updateProsAndCons on ProsAndCons {
            ${name}
          }
        `
        const previous = cache.readFragment({ fragment, id })
        const data = { ...previous, [`${name}`]: value }
        cache.writeData({ id, data })
      } else if (prosId) {
        const id = getCacheKey({ __typename: 'Pros', id: prosId })
        const fragment = gql`
          fragment updatePros on Pros {
            ${name}
          }
        `
        const previous = cache.readFragment({ fragment, id })
        const data = { ...previous, [`${name}`]: value }
        cache.writeData({ id, data })
      } else if (consId) {
        const id = getCacheKey({ __typename: 'Cons', id: consId })
        const fragment = gql`
          fragment updateCons on Cons {
            ${name}
          }
        `
        const previous = cache.readFragment({ fragment, id })
        const data = { ...previous, [`${name}`]: value }
        cache.writeData({ id, data })
      }
    },
    addProsOrCons: (_root, variables, { cache }) => {
      const { itemId, prosOrCons } = variables

      const { prosAndCons } = cache.readQuery({ query: GET_PROS_AND_CONS })

      const prosAndConsDoc = prosAndCons.filter(item => item.id === itemId)[0]
      prosAndConsDoc[prosOrCons].push({
        id: shortid.generate(),
        content: '',
        __typename: sentenceCase(prosOrCons),
      })

      const data = {
        prosAndCons: prosAndCons.map(elem => {
          if (elem.id === itemId) return prosAndConsDoc
          return elem
        }),
      }

      cache.writeQuery({ query: GET_PAGE_ITEMS, data })
    },
    removeProsOrCons: (_root, variables, { cache }) => {
      const { itemId, prosOrConsId } = variables
      const { prosAndCons } = cache.readQuery({ query: GET_PROS_AND_CONS })
      const prosAndConsDoc = prosAndCons.filter(item => item.id === itemId)[0]
      if (prosAndConsDoc.pros.length > 1)
        remove(prosAndConsDoc.pros, pros => pros.id === prosOrConsId)
      if (prosAndConsDoc.cons.length > 1)
        remove(prosAndConsDoc.cons, cons => cons.id === prosOrConsId)
    },
  },
}
