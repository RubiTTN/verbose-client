import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query, withApollo } from 'react-apollo'
import slugify from 'slugify'
import get from 'lodash/get'

import SelectMedia from '../../Generic/SelectMedia'
import SelectBox from '../../Generic/SelectBox'
import InputBox from '../../Generic/InputBox'
import { GET_PAGE, GENERATE_PAGE_URL } from '../queries'
import { UPDATE_PAGE, UPDATE_PAGE_MEDIA, DELETE_PAGE_MEDIA } from '../mutaitons'
import {
  VERTICAL_OPTIONS,
  PAGE_TYPE_OPTIONS,
  PAGE_TEMPLATE_OPTIONS,
  PAGE_STATUS_OPTIONS,
} from '../../../constants/common'
import { PageFormWrapper } from './styles'
import EditorBox from '../../Generic/EditorBox';

class PageForm extends Component {
  handleInputChange = (pageId, e, name, value) => {
    const { client } = this.props
    client.mutate({
      mutation: UPDATE_PAGE,
      variables: {
        name: name || get(e, 'target.name', ''),
        value: value || get(e, 'target.value', ''),
        pageId,
      },
    })
  }

  generateUpdateSlug = ({ pageId, currentSlug, type, title, vertical }) => {
    let slug = currentSlug
    // only generate if there is no slug value and
    // the page type is news / article
    if (currentSlug === '' && (type === 'ARTICLE' || type === 'NEWS')) {
      slug = `/${slugify(title, { lower: true })}`
      this.handleInputChange(pageId, null, 'slug', slug)
    }
    this.updateUrl({ pageId, slug, type, vertical })
  }

  updateUrl = async ({ pageId, slug, type, vertical }) => {
    const { client } = this.props
    const {
      data: { generatePageUrl },
    } = await client.query({
      query: GENERATE_PAGE_URL,
      variables: { slug, type, vertical },
    })
    const { url } = generatePageUrl

    this.handleInputChange(pageId, null, 'url', url)
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
            url,
            vertical,
            template,
            type,
            content,
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
              <SelectBox
                label="Type"
                options={PAGE_TYPE_OPTIONS}
                name="type"
                value={type}
                onChange={(e, name, value) => {
                  this.handleInputChange(id, null, name, value)
                  this.generateUpdateSlug({
                    pageId: id,
                    type: value,
                    currentSlug: slug,
                    title,
                    vertical,
                  })
                }}
              />
              <SelectBox
                label="Vertical"
                options={VERTICAL_OPTIONS}
                name="vertical"
                value={vertical}
                onChange={(e, name, value) => {
                  this.handleInputChange(id, null, name, value)
                  this.generateUpdateSlug({
                    pageId: id,
                    type,
                    currentSlug: slug,
                    title,
                    vertical: value,
                  })
                }}
              />
              <InputBox
                label="Slug"
                name="slug"
                type="text"
                placeholder="Slug"
                value={slug}
                onChange={e => {
                  this.handleInputChange(id, e)
                  this.updateUrl({
                    pageId: id,
                    slug: e.target.value,
                    type,
                    vertical,
                  })
                }}
              />
              <InputBox
                label="URL"
                name="url"
                type="text"
                placeholder="URL"
                value={url}
                disabled
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
              <SelectMedia
                updateMediaMutation={UPDATE_PAGE_MEDIA}
                deleteMediaMutation={DELETE_PAGE_MEDIA}
                variables={{
                  pageId: id,
                  media: 'selectedMediaValue',
                }}
                currentMedia={media}
              />
              <EditorBox
                label="Content"
                name="content"
                value={content}
                id={id}
                onChange={(e, name, value) => this.handleInputChange(id, null, name, value)}
              />
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
