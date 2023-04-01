import React, { useState } from 'react'
import ToolbarButton from './ToolbarButton'
import { useEditor } from '../editor/EditorContext'
import { Button, TextInput, Label, Modal } from '../components/components'

export default function ToolbarButtonImage ({ children, ...props }) {
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState('')
  const { editor } = useEditor()

  function handleShowModal () {
    const image = editor.getSelection().focusNode.querySelector('img')

    if (image) {
      setLink(image.src)
    } else {
      setLink('')
    }
    setShowModal(true)
  }

  function handleCancel () {
    setLink('')
    setShowModal(false)
  }

  function handleSubmit (e) {
    e.preventDefault()

    const image = editor.getSelection().focusNode.querySelector('img')
    if (image) {
      image.src = link
    } else {
      editor.execCommand('insertImage', false, link)
    }
    setShowModal(false)
  }

  return (
    <div>
      {showModal && (
        <Modal show onClose={() => setShowModal(false)}>
          <Modal.Header onClose={() => setShowModal(false)}>
            New Image Link
          </Modal.Header>
          <Modal.Body>
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
          <Modal.Footer className='flex justify-end gap-2'>
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
        name='image'
        onClick={handleShowModal}
        {...props}
      >
        {children}
      </ToolbarButton>
    </div>
  )
}
