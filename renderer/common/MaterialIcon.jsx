import React from 'react'
import * as icons from '@material-ui/icons'
import { camelCase } from 'lodash-es'

export default function MaterialIcon (props) {
  const camelCaseName = camelCase(props.name)
  const classCaseName = camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)
  const Component = icons[classCaseName]
  const iconProps = Object.assign({}, props, {
    className: `material-icon icon-${props.name}`
  })

  delete iconProps.name
  return <Component { ...iconProps } />
}
