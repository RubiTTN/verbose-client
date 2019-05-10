import React, { Fragment } from 'react'
import { Query, withApollo } from 'react-apollo'
import { Form, Button, Modal, message } from 'antd'
import gql from 'graphql-tag'

import { QuestionsWrapper, BoxSaveButtonWrapper } from './styles'
import SelectBox from '../../../../Generic/SelectBox'
import { GET_FAQ_CATEGORIES_DB } from '../../../../Faqs/Categories/queries'
import { GET_PAGE, GET_PAGE_FAQ_ACCORDIAN } from '../../../queries';
import { UPDATE_PAGE_FAQ_ACCORDIAN, UPSERT_PAGE_FAQ_ACCORDIAN_TO_DB, REPLACE_PAGE_ITEMS_ID, DELETE_PAGE_FAQ_ACCORDIAN_TO_DB } from '../../../mutaitons';

const GET_FAQ_CATEGORY_DB = gql`
query faqCategory($id: ID){
  faqCategory(id: $id) {
    faqs {
      title
    }
  }
}
`

function FaqAccordion({client, itemId, rerenderSortable, removeItem}) {
  const onCategoryChange = (noOP, name, value) => {
    client.mutate({
      mutation: UPDATE_PAGE_FAQ_ACCORDIAN,
      variables: {
        name,
        value,
        itemId,
      },
    })
  }

  const upsertFaqAccordion = async () => {
    const { page } = await client.readQuery({
      query: GET_PAGE,
    })

    const { pageFaqAccordion } = await client.readQuery({
      query: GET_PAGE_FAQ_ACCORDIAN,
      variables: {
        itemId,
      },
    })

    const {
      data: { upsertPageFaqAccordion },
    } = await client.mutate({
      mutation: UPSERT_PAGE_FAQ_ACCORDIAN_TO_DB,
      variables: {
        id: pageFaqAccordion.id,
        page: page.id,
        faqCategory: pageFaqAccordion.faqCategory,
        order: pageFaqAccordion.order,
      },
    })
    message.success("FAQ Accordian Successfully saved!")
    if (upsertPageFaqAccordion.id !== pageFaqAccordion.id) {
      client.mutate({
        mutation: UPDATE_PAGE_FAQ_ACCORDIAN,
        variables: {
          name: 'id',
          value: upsertPageFaqAccordion.id,
          itemId: pageFaqAccordion.id,
        },
        refetchQueries: [
          {
            query: GET_PAGE_FAQ_ACCORDIAN,
          },
        ],
      })
      client
        .mutate({
          mutation: REPLACE_PAGE_ITEMS_ID,
          variables: {
            itemId: pageFaqAccordion.id,
            newItemId: upsertPageFaqAccordion.id,
          },
        })
        .then(() => {
          rerenderSortable()
        })
    }
  }

  const deleteFaqAccordion = () => {
    Modal.confirm({
      title: 'Are you sure wan to delete this Faq Accordian?',
      content: "Once deleted, it can't be undone!!",
      async onOk() {
        try {
          const {
            data: { deletePageFaqAccordion },
          } = await client.mutate({
            mutation: DELETE_PAGE_FAQ_ACCORDIAN_TO_DB,
            variables: {
              id: itemId,
            },
          })
          if (deletePageFaqAccordion.id) {
            message.success('Faq Accordian deleted successfully')
            removeItem(itemId, 'PageFaqAccordion')
          } else message.error('Error! Faq Accordian delete failed')
        } catch (e) {
          removeItem(itemId, 'PageFaqAccordion')
          message.success('Faq Accordian deleted successfully')
        }
      },
      onCancel() {},
    })
  }

  return (
    <Query query={GET_PAGE_FAQ_ACCORDIAN} variables={{itemId}}>
    {
      ({ data: { pageFaqAccordion }, loading } ) => {
        if (loading) return null
        const { faqCategory } = pageFaqAccordion
        let renderFaqsTitle = faqCategory ? <Query query={GET_FAQ_CATEGORY_DB} variables={{id: faqCategory}}>
          {({data: { faqCategory }, loading}) => {
            let returnData = loading ? null
              : <ol>
                  {faqCategory.faqs.map((faq,i) => <li key={i}>{faq.title}</li>)}
                </ol>

            return returnData
          }}
        </Query> : null

        return (
          <Fragment>
            <Form>
              <SelectBox name="faqCategory" label="Select From Categories" value={faqCategory}
                onChange={onCategoryChange}
                optionsQuery={{QUERY: GET_FAQ_CATEGORIES_DB, nameKey:'name', valueKey:'id'}} />
            </Form>
            <QuestionsWrapper>
              {renderFaqsTitle}
            </QuestionsWrapper>
            <BoxSaveButtonWrapper>
              <Button type="danger" onClick={deleteFaqAccordion}>
                Delete
              </Button>
              <Button type="default" onClick={upsertFaqAccordion}>
                Save
              </Button>
            </BoxSaveButtonWrapper>
          </Fragment>
        )
      }
    }
    </Query>
  )
}

export default withApollo(FaqAccordion)