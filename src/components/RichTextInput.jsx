import React from 'react'
import cx from 'classnames'

const TextInput = ({ name, value, onChange, placeholder, className }) => {
  return (
    <input
      type='text'
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cx('w-full p-2 rounded text-black', className)}
    />
  )
}

export default TextInput
