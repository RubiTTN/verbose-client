import React from 'react'
import { Form, Select } from 'antd'
import { Query } from 'react-apollo'
import keys from 'lodash/keys'
import { string, oneOfType, array, func, shape, object, arrayOf } from 'prop-types';

const { Option } = Select

export default class SelectBox extends React.Component {

  static propTypes = {
    label: string,
    name: string.isRequired,
    value: oneOfType([string, array]),
    onChange: func.isRequired,
    options: arrayOf(oneOfType([shape({
      name: string.isRequired,
      value: string.isRequired,
    }), string])),
    optionsQuery: shape({
      QUERY: object.isRequired,
      nameKey: string.isRequired,
      valueKey: string.isRequired,
    })
  }
  render () {
    let { label, name, value, optionsQuery, options = [], onChange, ...rest } = this.props
    const renderSelectBox = () => {
      return (
        <Form.Item label={label}>
          <Select
            {...rest}
            optionFilterProp="title"
            optionLabelProp="title"
            defaultValue={value}
            onChange={value => onChange(null, name, value)}
          >
            { 
              options.map(option => (
                <Option key={option.value || option} title={option.name || option}>{option.name || option}</Option>
              )
            )}
          </Select>
        </Form.Item>
      )
    }
    if (optionsQuery) {
      return <Query query={optionsQuery.QUERY}>
        {({ data, loading }) => {
          if (loading) return null
          let queryData = data[keys(data)[0]]
          options = queryData.map(qd => ({
            name: qd[optionsQuery.nameKey],
            value: qd[optionsQuery.valueKey]
          }))
          return renderSelectBox()
        }}
      </Query>
    }
    return renderSelectBox() 
  }
}