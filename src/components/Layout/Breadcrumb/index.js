import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb as BC } from 'antd'
import { withRouter } from 'react-router-dom'
import split from 'lodash/split'
import tail from 'lodash/tail'
import map from 'lodash/map'
import changeCase from 'change-case'

class Breadcrumb extends Component {
  render() {
    const {
      location: { pathname },
    } = this.props

    const renderBreadcrumbItems = map(
      tail(split(pathname, '/')),
      (elem, idx) => (
        <BC.Item key={idx}>{changeCase.sentenceCase(elem)}</BC.Item>
      )
    )
    return <BC style={{ margin: '16px 0' }}>{renderBreadcrumbItems}</BC>
  }
}

Breadcrumb.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(Breadcrumb)
