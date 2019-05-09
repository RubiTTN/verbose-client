import React from 'react'

import CreateFormPage from '../../Generic/FormPage/Create'
import EditFormPage from '../../Generic/FormPage/Edit'
import ListPage from '../../Generic/FormPage/List'
import EditorBox from '../../Generic/EditorBox'
import { SAVE_FAQ_CATEGORY_TO_DB, UPDATE_FAQ_CATEGORY_TO_DB, DELETE_FAQ_CATEGORY } from './mutations'
import { GET_FAQ_CATEGORY_DB, GET_FAQ_CATEGORIES_DB } from './queries'

const renderCountOfFaqs = (record) => <span>{record.faqs.length}</span>

const faqCategoriesFormFields = [
    { attribute: 'name' },
    { attribute: 'description', Component: EditorBox, id: 'faqCategory' },
    { attribute: 'slug' },
]

const attributes = ['name', 'description', 'slug']

const listPageUrl="/dashboard/faqs/categories"
const editUrl=`${listPageUrl}/edit`
const addUrl=`${listPageUrl}/add`

const customColumns = [{attribute: 'count', render: renderCountOfFaqs}]

export function AddFaqCategory ({history}) {
    return (
        <CreateFormPage
            title="Add New Faq Category"
            saveDataMutation={SAVE_FAQ_CATEGORY_TO_DB}
            editUrl={editUrl}
            fields={faqCategoriesFormFields}
            history={history}
        />
    )
}

export function EditFaqCategory ({match, history}) {
    return (
        <EditFormPage
            title="Edit Faq Category"
            updateDataMutation={UPDATE_FAQ_CATEGORY_TO_DB}
            getDataQuery={GET_FAQ_CATEGORY_DB}
            deleteDataMutation={DELETE_FAQ_CATEGORY}
            listPageUrl={listPageUrl}
            fields={faqCategoriesFormFields}
            match={match}
            history={history}
        />
    )
}


export function FaqCategoryList ({history}) {
    return (
        <ListPage
            customColumns={customColumns}
            getListQuery={GET_FAQ_CATEGORIES_DB}
            editUrl={editUrl}
            addUrl={addUrl}
            attributes={attributes}
            history={history}
        />
    )
}