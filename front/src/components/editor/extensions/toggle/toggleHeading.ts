import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ToggleHeadingComponent from './toggleHeadingComponent'

export default Node.create({
  name: 'toggleHeading',
  
  group: 'block',
  
  content: 'block+',
  
  defining: true,
  
  addAttributes() {
    return {
      open: {
        default: true,
        parseHTML: element => element.getAttribute('data-open') === 'true',
        renderHTML: attributes => {
          return {
            'data-open': attributes.open,
          }
        },
      },
      level: {
        default: 1,
        parseHTML: element => parseInt(element.getAttribute('data-level') || '1', 10),
        renderHTML: attributes => {
          return {
            'data-level': attributes.level,
          }
        },
      }
    }
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-type="toggle-heading"]',
      },
    ]
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'toggle-heading' }), 0]
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(ToggleHeadingComponent)
  },
})