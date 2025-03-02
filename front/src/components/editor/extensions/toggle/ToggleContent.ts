import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ToggleContentComponent from './ToggleContentComponent'

export default Node.create({
  name: 'toggleContent',
  
  group: 'block',
  
  content: 'block*',
  
  defining: true,
  
  parseHTML() {
    return [
      {
        tag: 'div[data-type="toggle-content"]',
      },
    ]
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'toggle-content' }), 0]
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(ToggleContentComponent)
  },
})