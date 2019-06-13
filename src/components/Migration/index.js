import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Icon, message } from 'antd'
import { withApollo } from 'react-apollo'

import { REINGEST_PAGES, MIGRATE_RC_PAGES } from './mutations'

class Migration extends Component {
  state = { loading: false }

  static propTypes = {
    client: PropTypes.object.isRequired,
  }

  reingestPages = () => {
    const { client } = this.props
    this.setState({ loading: true })
    client
      .mutate({
        mutation: REINGEST_PAGES,
      })
      .then(({ data: { reingestPages } }) => {
        if (reingestPages.status) {
          message.success('Pages Ingested Successfully')
        } else message.error('Failed to ingest pages')

        this.setState({ loading: false })
      })
  }

  migrateRcPages = () => {
    const { client } = this.props
    this.setState({ loading: true })
    client
      .mutate({
        mutation: MIGRATE_RC_PAGES,
      })
      .then(({ data: { migrateRcPages } }) => {
        if (migrateRcPages.status) {
          message.success('RC-Pages Migrated Successfully')
        } else message.error('Failed to migrate RC-Pages')

        this.setState({ loading: false })
      })
  }

  render() {
    const { loading } = this.state
    return loading ? (
      <Icon type="loading" />
    ) : (
      <div>
        <Button type="primary" onClick={this.reingestPages}>
          ReIngest Pages to ElasticSearch
        </Button>
        <br />
        <br />
        <Button onClick={this.migrateRcPages}>
          Migrate RC-Pages to verbose
        </Button>
      </div>
    )
  }
}

export default withApollo(Migration)
