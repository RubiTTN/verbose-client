import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query, withApollo } from 'react-apollo'

import SelectMedia from '../../Generic/SelectMedia'
import SelectBox from '../../Generic/SelectBox'
import InputBox from '../../Generic/InputBox'
import { GET_PAGE } from '../queries'
import { UPDATE_PAGE, UPDATE_PAGE_MEDIA, DELETE_PAGE_MEDIA } from '../mutaitons'
import {
  VERTICAL_OPTIONS,
  PAGE_TYPE_OPTIONS,
  PAGE_TEMPLATE_OPTIONS,
  PAGE_STATUS_OPTIONS,
} from '../../../constants/common'
import { PageFormWrapper } from './styles'

class PageForm extends Component {
  handleInputChange = (pageId, e, name, value) => {
    const { client } = this.props
    client.mutate({
      mutation: UPDATE_PAGE,
      variables: {
        name: name || e.target.name,
        value: value || e.target.value,
        pageId,
      },
    })
  }

  render() {
    return (
      <Query query={GET_PAGE}>
        {({ data: { page }, loading }) => {
          if (loading) return null
          const {
            id,
            title,
            slug,
            vertical,
            template,
            type,
            status,
            media,
          } = page
          const { upsertPage } = this.props

          return (
            <PageFormWrapper>
              <InputBox
                label="Title"
                name="title"
                type="text"
                value={title}
                onChange={e => this.handleInputChange(id, e)}
                onBlur={upsertPage}
              />
              <SelectMedia
                updateMediaMutation={UPDATE_PAGE_MEDIA}
                deleteMediaMutation={DELETE_PAGE_MEDIA}
                variables={{
                  pageId: id,
                  media: 'selectedMediaValue',
                }}
                currentMedia={media}
              />
              <SelectBox
                label="Type"
                options={PAGE_TYPE_OPTIONS}
                name="type"
                value={type}
                onChange={(e, name, value) =>
                  this.handleInputChange(id, null, name, value)
                }
              />
              <InputBox
                label="Slug"
                name="slug"
                type="text"
                placeholder="Slug"
                value={slug}
                onChange={e => this.handleInputChange(id, e)}
              />
              <SelectBox
                label="Vertical"
                options={VERTICAL_OPTIONS}
                name="vertical"
                value={vertical}
                onChange={(e, name, value) =>
                  this.handleInputChange(id, null, name, value)
                }
              />
              <SelectBox
                label="Template"
                options={PAGE_TEMPLATE_OPTIONS}
                name="template"
                value={template}
                onChange={(e, name, value) =>
                  this.handleInputChange(id, null, name, value)
                }
              />

              {/* PAGE_STATUS_OPTIONS */}
              <SelectBox
                label="Status"
                options={PAGE_STATUS_OPTIONS}
                name="status"
                value={status}
                onChange={(e, name, value) =>
                  this.handleInputChange(id, null, name, value)
                }
              />
            </PageFormWrapper>
          )
        }}
      </Query>
    )
  }
}

PageForm.propTypes = {
  client: PropTypes.object.isRequired,
  upsertPage: PropTypes.func.isRequired,
}

export default withApollo(PageForm)
