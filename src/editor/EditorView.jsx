import cx from 'classnames'
import React, { useRef, useEffect } from 'react'
import { mdx2html, html2mdx } from '../utils'
import { useEditor } from './EditorContext'

export default function EditorView () {
  const iframeRef = useRef(null)
  const { setEditor, markdownMode, setButtonStatus, styleString, name, value, onChange } = useEditor()

  useEffect(() => {
    iframeRef.current.contentDocument.designMode = 'on'
    iframeRef.current.contentDocument.head.innerHTML = styleString

    mdx2html(value, { name }).then(html => {
      iframeRef.current.contentDocument.body.innerHTML = `${html}`
    })

    setEditor(iframeRef.current.contentDocument)
    checkCommandStates()
  }, [iframeRef])

  useEffect(() => {
    const doc = iframeRef?.current.contentDocument
    doc.addEventListener('keydown', boundsChecker, false)
    doc.addEventListener('keyup', onChangeReal, false)
    doc.addEventListener('mouseup', onChangeReal, false)
    return () => {
      doc.removeEventListener('keydown', boundsChecker)
      doc.removeEventListener('keyup', onChangeReal)
      doc.removeEventListener('mouseup', onChangeReal)
    }
  }, [markdownMode])

  function checkCommandStates () {
    const headers = ['h1', 'h2', 'h3', 'h4', 'h5']
    const doc = iframeRef.current.contentDocument
    if (doc) {
      const selection = doc.getSelection()
      const parent = selection?.focusNode?.parentNode?.localName
      const header = headers.some(v => parent?.includes(v))
      const quote = parent === 'blockquote' || selection?.focusNode?.parentNode?.parentNode?.localName === 'blockquote'
      const commandStates = {
        ...activeStates,
        insertUnorderedList: doc.queryCommandState('insertUnorderedList'),
        insertOrderedList: doc.queryCommandState('insertOrderedList'),
        italic: !quote && doc.queryCommandState('italic'),
        code: selection?.focusNode?.parentNode.localName === 'pre' || selection?.focusNode?.parentNode.parentNode.localName === 'pre' || selection?.focusNode?.localName === 'pre',
        emphasis: parent === 'code' && selection?.focusNode?.parentNode.parentNode.localName !== 'pre',
        bold: parent === 'strong' || parent === 'b',
        link: parent === 'a',
        image: parent === 'img',
        header,
        quote
      }
      setButtonStatus(commandStates)
    }
  }

  function boundsChecker (event) {
    const doc = iframeRef?.current.contentDocument
  }

  function onChangeReal () {
    checkCommandStates()
    markdownMode
      ? onChange(iframeRef?.current.contentDocument.body.innerText)
      : html2mdx(iframeRef?.current.contentDocument.body.innerHTML, { name }).then(r => {
        onChange(r)
      })
  }

  return (
    <iframe
      ref={iframeRef}
      style={{ height: '100%', resize: 'vertical', overflow: 'auto' }}
      className={cx('border border-gray-300 border-t-0 dark:border-gray-600 rounded-b-lg w-full px-0 text-sm text-gray-800 bg-white dark:bg-gray-200 focus:ring-0 dark:text-white')}
    />
  )
}
