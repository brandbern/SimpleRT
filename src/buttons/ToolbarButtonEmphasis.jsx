import React from 'react'
import ToolbarButton from './ToolbarButton'
import { useEditor } from '../editor/EditorContext'

export default function ToolbarButtonEmphasis ({ children, ...props }) {
  const { editor } = useEditor()
  const selection = editor.getSelection()
  const parent = selection?.focusNode?.parentNode
  const parent2 = selection?.focusNode?.parentNode?.parentNode

  function turnToText () {
    const textNode = editor.createTextNode(parent?.innerHTML || '&nbsp;')
    const range = selection.getRangeAt(0)
    range.deleteContents()
    parent2.replaceChild(textNode, parent)
  }

  function toToEmphasis () {
    const codeElement = document.createElement('code')
    codeElement.innerHTML = selection
    selection.focusNode.parentNode.appendChild(codeElement)
    const range = selection.getRangeAt(0)
    range.deleteContents()
    range.insertNode(codeElement)
    selection.addRange(range)
    selection.focusNode.innerHTML += '&nbsp;'
  }

  const handleClick = () => {
    /*
      IF: we are in emphasized section and not in a pre element turn back to text
      ELSE IF: we are in a pre element do nothing
      ELSE: emphasize section
    */
    if (parent.localName === 'code' && parent2.localName !== 'pre') {
      turnToText()
    } else if (parent.localName === 'pre' || parent2.localName === 'pre' || selection?.focusNode?.localName === 'pre') {
      console.log('in code block')
    } else {
      toToEmphasis()
    }
  }

  return (
    <ToolbarButton onClick={handleClick} name='emphasis' {...props}>
      {children}
    </ToolbarButton>
  )
}
