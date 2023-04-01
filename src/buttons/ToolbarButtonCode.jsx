import { html2mdx } from '../utils'
import React, { useState } from 'react'
import ToolbarButton from './ToolbarButton'
import { useEditor } from '../editor/EditorContext'
import { Button, TextInput, Label, Modal } from '../components/components'

function convertSelectedToCode (editor, codeLang) {
  const selection = editor.getSelection()
  const divEl = editor.createElement('div')
  const brEl = editor.createElement('br')
  divEl.appendChild(brEl)

  const pEl = editor.createElement('p')
  const preEl = editor.createElement('pre')
  const codeEl = editor.createElement('code')
  codeEl.classList.add(`language-${codeLang}`)
  codeEl.innerText = selection.toString()
  pEl.appendChild(preEl)
  preEl.appendChild(codeEl)

  selection.deleteFromDocument()
  selection.getRangeAt(0).insertNode(pEl)

  const range = editor.createRange()
  range.setStartAfter(preEl)
  range.setEndAfter(preEl)

  selection.removeAllRanges()
  selection.addRange(range)

  selection.focusNode.parentNode.appendChild(divEl)
}

function convertSelectedToText (editor) {
  const selection = editor.getSelection()
  const range = selection.getRangeAt(0)
  const preEl = range.commonAncestorContainer?.parentElement.closest('pre') || range.commonAncestorContainer.closest('pre')
  const codeEl = preEl.querySelector('code')
  const textNode = document.createElement('p')

  textNode.innerHTML = codeEl?.innerHTML || '&nbsp;'

  preEl.parentNode.insertBefore(textNode, preEl)
  preEl.remove()
}

// Converts editor selected text/code into code/text
export default function ToolbarButtonCode ({ children, ...props }) {
  const [showModal, setShowModal] = useState(false)
  const [codeLang, setCodeLang] = useState('')
  const { editor, onChange, name } = useEditor()

  function handleCancel () {
    setCodeLang('')
    setShowModal(false)
  }

  function handleSubmit (e) {
    e.preventDefault()
    convertSelectedToCode(editor, codeLang)
    html2mdx(editor.body.innerHTML, { name }).then(r => {
      onChange(r)
      setShowModal(false)
      setCodeLang('')
    })
  }

  function handleClick () {
    const selection = editor.getSelection()
    const lang = selection.focusNode.parentNode.firstElementChild?.className.split('-')[1] || selection.focusNode.parentNode.className.split('-')[1]

    if (!selection.toString()) {
      convertSelectedToText(editor)
      html2mdx(editor.body.innerHTML, { name }).then(r => {
        onChange(r)
        setCodeLang('')
        setShowModal(false)
      })
    } else if (!lang) {
      setShowModal(true)
    } else {
      convertSelectedToText(editor)
      html2mdx(editor.body.innerHTML, { name }).then(r => {
        onChange(r)
        setCodeLang('')
        setShowModal(false)
      })
    }
  }

  return (
    <>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header onClose={() => setShowModal(false)}>
          New Link
        </Modal.Header>
        <Modal.Body>
          <div className='mb-2 block'>
            <Label value='Code language' />
          </div>
          <TextInput
            type='text'
            value={codeLang}
            onChange={e => setCodeLang(e.target.value)}
            required
          />
        </Modal.Body>
        <Modal.Footer className='flex justify-end gap-2'>
          <Button color='gray' onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={!codeLang} onClick={e => handleSubmit(e)}>
            Ok
          </Button>
        </Modal.Footer>

      </Modal>
      <ToolbarButton
        name='code'
        onClick={handleClick}
        {...props}
      >
        {children}
      </ToolbarButton>
    </>
  )
}
