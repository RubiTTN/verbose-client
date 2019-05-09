import React from 'react'
import ReactDOM from 'react-dom'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import shortid from 'shortid'

import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { resolvers } from './resolvers'

const cache = new InMemoryCache()
const link = createUploadLink({
  uri: 'http://localhost:4400/',
  credentials: 'include',
})

const client = new ApolloClient({
  cache,
  link,
  resolvers,
})

const blockId = shortid.generate()
const pageId = shortid.generate()

const data = {
  page: {
    id: pageId,
    title: '',
    slug: '',
    vertical: 'home-loans',
    type: 'NEWS',
    status: 'DRAFT',
    media: {
      id: null,
      url: null,
      __typename: 'Media',
    },
    __typename: 'Page',
  },
  pageItems: [{ type: 'Block', itemId: blockId, __typename: 'PageItem' }],
  blocks: [
    {
      id: blockId,
      title: '',
      content: '<p></p>',
      video: '',
      style: 'full-width',
      order: 0,
      media: {
        id: null,
        url: null,
        __typename: 'Media',
      },
      __typename: 'Block',
    },
  ],
  boxes: [],
  alertBoxes: [],
  prosAndCons: [],
  quickTips: [],
}
cache.writeData({
  data,
})

client.replaceStore = data => cache.writeData(data)
client.onResetStore(() => cache.writeData({ data }))

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
