import React from 'react'
import { useEditor } from '../editor/EditorContext'
import ToolbarButton from './ToolbarButton'
import { html2mdx, mdx2html } from '../utils'
import { Markdown, MarkdownOff } from 'tabler-icons-react'

export default function ToolbarButtonSwitchEditor ({ ...props }) {
  const { value, editor, markdownMode, setMarkdownMode, name } = useEditor()

  function handleChange () {
    setMarkdownMode(!markdownMode)
    markdownMode
      ? mdx2html(value, { name }).then(html => {
        editor.body.innerHTML = `${html}`
      })
      : html2mdx(editor.body.innerHTML).then(markdown => {
        editor.body.innerText = markdown
      })
  }

  return (
    <ToolbarButton
      onClick={handleChange}
      {...props}
    >
      {!markdownMode
        ? <Markdown size='16' />
        : <MarkdownOff size='16' />}

    </ToolbarButton>
  )
}
