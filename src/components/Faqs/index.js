import React from 'react'

import CreateFormPage from '../Generic/FormPage/Create'
import EditFormPage from '../Generic/FormPage/Edit'
import ListPage from '../Generic/FormPage/List'
import SelectBox from '../Generic/SelectBox'
import EditorBox from '../Generic/EditorBox'
import { VERTICAL_OPTIONS, VARIANT_OPTIONS } from '../../constants/common'
import { UPDATE_FAQ_TO_DB, SAVE_FAQ_TO_DB, DELETE_FAQ } from './mutations'
import { GET_FAQ_DB, GET_FAQS_DB, GET_USERS, GET_FAQ_CATEGORIES } from './queries'

const faqFormFields = [
    { attribute: 'title' },
    { attribute: 'description', Component: EditorBox, id: 'faq' },
    { attribute: 'short_description', type:'textarea' },
    { attribute: 'slug' },
    { attribute: 'vertical', Component: SelectBox, options: VERTICAL_OPTIONS },
    { attribute: 'variant', Component: SelectBox, mode:'multiple', options: VARIANT_OPTIONS },
    { attribute: 'tag', label:"Tags", Component: SelectBox, mode:'tags' },
    { attribute: 'authors', Component: SelectBox, mode: 'multiple',
        optionsQuery: { QUERY: GET_USERS, nameKey: 'email', valueKey: 'id' }
    },
    { attribute: 'category', label: 'FAQ Category', Component: SelectBox, mode: 'multiple',
        optionsQuery: { QUERY: GET_FAQ_CATEGORIES, nameKey: 'name', valueKey: 'id' }
    },
    { attribute: 'order', type: 'number' },
]
const attributes = ['title', 'short_description', 'slug', 'vertical']
const editUrl="/dashboard/faqs/edit"
const addUrl="/dashboard/faqs/add"
const listPageUrl="/dashboard/faqs"

export function AddFaq ({history}) {
    return (
        <CreateFormPage
            title="Add New Faq"
            saveDataMutation={SAVE_FAQ_TO_DB}
            editUrl={editUrl}
            fields={faqFormFields}
            history={history}
        />
    )
}

export function EditFaq ({match, history}) {
    return (
        <EditFormPage
            title="Edit Faq"
            updateDataMutation={UPDATE_FAQ_TO_DB}
            getDataQuery={GET_FAQ_DB}
            deleteDataMutation={DELETE_FAQ}
            listPageUrl={listPageUrl}
            fields={faqFormFields}
            match={match}
            history={history}
        />
    )
}


export function FaqList ({history}) {
    return (
        <ListPage
            getListQuery={GET_FAQS_DB}
            editUrl={editUrl}
            addUrl={addUrl}
            attributes={attributes}
            history={history}
        />
    )
}