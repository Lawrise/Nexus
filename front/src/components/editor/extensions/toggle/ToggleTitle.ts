import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ToggleTitleComponent from './ToggleTitleComponent'

export default Node.create({
  name: 'toggleTitle',
  
  group: 'block',
  
  content: 'inline*',
  
  defining: true,
  
  parseHTML() {
    return [
      {
        tag: 'div[data-type="toggle-title"]',
      },
    ]
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'toggle-title' }), 0]
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(ToggleTitleComponent)
  },
})