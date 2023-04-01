import React from 'react'
import cx from 'classnames'
import Toolbar from './Toolbar'
import EditorView from './editor/EditorView'
import { EditorProvider } from './editor/EditorContext'
import { Link, Album, Emphasis, LetterH, Quote, Italic, Bold, List, ListNumbers } from 'tabler-icons-react'

import {
  ToolbarButtonCode,
  ToolbarButtonBold,
  ToolbarButtonLink,
  ToolbarButtonQuote,
  ToolbarButtonImage,
  ToolbarButtonItalic,
  ToolbarButtonHeader,
  ToolbarButtonDivider,
  ToolbarButtonOrderedList,
  ToolbarButtonUnorderedList,
  ToolbarButtonEmphasis
} from '../buttons/components'

const CodeSVG = () => (
  <svg
    aria-hidden='true'
    fill='currentColor'
    viewBox='0 0 20 20'
    className='w-[16px]'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z'
    />
  </svg>
)

export default function SimpleRT ({ value, onChange, name, editorStyles, className, enabledButtons = {}, children }) {
  return (
    <div className={cx(className)}>
      <EditorProvider
        name={name}
        editorStyles={editorStyles}
        value={value}
        onChange={onChange}
      >

        <Toolbar addMarkdownButton={enabledButtons.markdown}>

          {enabledButtons?.bold && (
            <ToolbarButtonBold>
              <Bold size='16' />
            </ToolbarButtonBold>
          )}

          {enabledButtons?.italic && (
            <ToolbarButtonItalic>
              <Italic size='16' />
            </ToolbarButtonItalic>
          )}

          {enabledButtons?.header && (
            <ToolbarButtonHeader>
              <LetterH size='16' />
            </ToolbarButtonHeader>
          )}

          {enabledButtons?.quote && (
            <ToolbarButtonQuote>
              <Quote size='16' />
            </ToolbarButtonQuote>
          )}

          {enabledButtons?.link && (
            <ToolbarButtonLink>
              <Link size='16' />
            </ToolbarButtonLink>
          )}

          {(enabledButtons?.code || enabledButtons?.emphasis) && (<ToolbarButtonDivider />)}

          {enabledButtons?.code && (
            <ToolbarButtonCode>
              <CodeSVG />
            </ToolbarButtonCode>
          )}

          {enabledButtons?.emphasis && (
            <ToolbarButtonEmphasis>
              <Emphasis size='16' />
            </ToolbarButtonEmphasis>
          )}

          {(enabledButtons?.unordered || enabledButtons?.ordered || enabledButtons?.image) && (<ToolbarButtonDivider />)}

          {enabledButtons?.unordered && (
            <ToolbarButtonUnorderedList>
              <List size='16' />
            </ToolbarButtonUnorderedList>
          )}

          {enabledButtons?.ordered && (
            <ToolbarButtonOrderedList>
              <ListNumbers size='16' />
            </ToolbarButtonOrderedList>
          )}

          {enabledButtons?.image && (
            <ToolbarButtonImage>
              <Album size='16' />
            </ToolbarButtonImage>
          )}

          {children}

        </Toolbar>
        <EditorView />
      </EditorProvider>

    </div>
  )
}
