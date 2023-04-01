import React from 'react'
import cx from 'classnames'
import { FiX } from 'react-icons/fi'

const Modal = ({ show, children, onClose }) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={cx({ hidden: !show }, 'text-white modal flex justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0')}>
      <div onClick={handleBackdropClick} className='modal-overlay absolute w-full h-full bg-gray-900 opacity-80' />
      <div className='relative w-full h-1/2 max-w-2xl m-auto '>
        {children}
      </div>
    </div>
  )
}

const Header = ({ children, className, onClose }) => {
  return (
    <div className={cx('modal-header flex items-start justify-between p-4 border-b border-gray-400 rounded-t bg-gray-800', className)}>
      {children}
      <button onClick={onClose} type='button' className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'>
        <FiX />
      </button>
    </div>
  )
}

const Body = ({ children, className }) => {
  return (
    <div className={cx('modal-body p-4 py-6 space-y-4 bg-gray-800', className)}>
      {children}
    </div>
  )
}

const Footer = ({ children, className }) => {
  return (
    <div className={cx('modal-footer border-t border-gray-400 rounded-b p-4 bg-gray-800', className)}>
      {children}
    </div>
  )
}

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal
