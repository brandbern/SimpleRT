import React from 'react'

const Button = ({ children, onClick, disabled, color, backgroundColor }) => {
  const buttonStyle = `
    text-white
    bg-black
    text-lg font-bold
    rounded-md
    py-2 px-4
    ${disabled ? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer'}
  `

  return (
    <button className={buttonStyle} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
