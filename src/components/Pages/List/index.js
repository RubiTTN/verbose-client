import React from 'react'
import ListPage from '../../Generic/FormPage/List'
import { GET_PAGES_DB } from '../queries'

const editUrl = '/dashboard/pages/edit'
const attributes = ['title', 'slug', 'type', 'vertical', 'status']

export default function PageList({ history }) {
  console.log('')
  return (
    <ListPage
      getListQuery={GET_PAGES_DB}
      editUrl={editUrl}
      attributes={attributes}
      history={history}
    />
  )
}
