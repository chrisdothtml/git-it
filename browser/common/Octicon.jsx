// https://octicons.github.com/
import octicons from 'octicons'
import React from 'react'

export default function Octicon (props) {
  const { options, path } = octicons[props.name]
  const pathHTML = { __html: path }

  delete options.class
  delete options.height
  delete options.width

  return (
    <svg className="octicon" dangerouslySetInnerHTML={ pathHTML } { ...options }></svg>
  )
}
