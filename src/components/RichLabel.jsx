import React from 'react'

const Label = ({ value, className }) => {
  return (
    <label className={className}>
      {value}
    </label>
  )
}

export default Label
