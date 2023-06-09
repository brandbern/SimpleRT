import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { useEditor } from '../editor/EditorContext'

export default function ToolbarButton ({ name, children, className, ...props }) {
  const { buttonStatus, editor } = useEditor()
  const [highlighted, setHighlighted] = useState(false)

  useEffect(() => {
    buttonStatus[name]
      ? setHighlighted(true)
      : setHighlighted(false)
  }, [buttonStatus, name])

  function handleFormat () {
    editor.execCommand(name)
  }

  return (
    <button
      color='gray'
      size='md'
      type='button'
      onClick={handleFormat}
      className={cx(className, 'px-2 h-8 rounded dark:bg-transparent dark:border-transparent dark:text-sm dark:focus:text-neutral-100 dark:focus:bg-gray-600 dark:bg-gray-600 dark:text-gray-400 dark:hover:dark:bg-gray-500 dark:focus:ring-yellow-500', {
        'dark:text-neutral-100 dark:bg-gray-500': highlighted
      })}
      {...props}
    >
      <div className='flex items-center h-5'>
        {children}
      </div>
    </button>
  )
}
