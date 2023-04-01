import React, { useState } from 'react'
import { html2mdx } from '../utils'
import { useEditor } from '../editor/EditorContext'
import ToolbarButton from './ToolbarButton'
import { Button, TextInput, Label, Modal } from '../components/components'

export default function ToolbarButtonLink ({ children, ...props }) {
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState('')
  const [text, setText] = useState('')
  const { editor, name, onChange } = useEditor()

  function handleCancel () {
    setLink('')
    setShowModal(false)
  }

  function handleClick () {
    setShowModal(true)
    const selection = editor.getSelection()
    const parent = selection?.focusNode?.parentNode

    if (parent?.localName === 'a') {
      setText(selection?.focusNode?.nodeValue)
      setLink(parent?.href)
    } else {
      setText(editor?.getSelection()?.toString())
      setLink('')
    }
  }

  function handleSubmit (e) {
    e.preventDefault()
    const selection = editor.getSelection()
    const parent = selection?.focusNode?.parentNode
    if (parent?.localName === 'a') {
      parent.textContent = text
      parent.href = link
    } else {
      editor.execCommand('createLink', false, link)
    }
    html2mdx(editor.body.innerHTML, { name }).then(r => {
      onChange(r)
      setShowModal(false)
      setText('')
      setLink('')
    })
  }

  return (
    <div>
      {showModal && (
        <Modal show onClose={() => setShowModal(false)}>
          <Modal.Header onClose={() => setShowModal(false)}>
            New Link
          </Modal.Header>
          <Modal.Body>
            <div className='mb-2 block'>
              <Label value='Text' />
            </div>
            <TextInput
              type='text'
              value={text}
              onChange={e => setText(e.target.value)}
              required
            />
            <div className='mb-2 block'>
              <Label value='Link' />
            </div>
            <TextInput
              type='text'
              value={link}
              onChange={e => setLink(e.target.value)}
              required
            />
          </Modal.Body>
          <Modal.Footer className='flex justify-end gap-2 dark:bg-gray-800 '>
            <Button color='gray' onClick={handleCancel}>
              Cancel
            </Button>
            <Button disabled={!link} onClick={e => handleSubmit(e)}>
              Ok
            </Button>
          </Modal.Footer>

        </Modal>
      )}
      <ToolbarButton
        name='link'
        onClick={handleClick}
        {...props}
      >
        {children}
      </ToolbarButton>
    </div>
  )
}
