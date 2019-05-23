import React from 'react'
import ListPage from '../../Generic/FormPage/List'
import { GET_PAGES_DB } from '../queries'

const editUrl = '/dashboard/pages/edit'
const addUrl = '/dashboard/pages/add'
const attributes = ['title', 'slug', 'type', 'vertical', 'status']

export default function PageList({ history }) {
  return (
    <ListPage
      getListQuery={GET_PAGES_DB}
      editUrl={editUrl}
      addUrl={addUrl}
      attributes={attributes}
      history={history}
    />
  )
}