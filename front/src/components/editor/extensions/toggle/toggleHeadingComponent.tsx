// src/components/editor/extensions/toggle-heading-component.tsx
import React, { useState, useEffect } from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { ChevronRight, ChevronDown } from 'lucide-react'

const ToggleHeadingComponent = ({ node, updateAttributes }) => {
  const [isOpen, setIsOpen] = useState(node.attrs.open)
  const level = node.attrs.level || 1
  
  useEffect(() => {
    updateAttributes({ open: isOpen })
  }, [isOpen, updateAttributes])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  
  return (
    <NodeViewWrapper className="flex flex-col">
      <div className="flex h-8 w-full" onClick={toggleOpen}>
        <button className="toggle-button">
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {/* <div className={`h${level}`}>
          <NodeViewContent className="toggle-title-content" />
        </div> */}
      </div>
      
      {isOpen && (
        <div className="toggle-content pl-6">
          <NodeViewContent className="content" />
        </div>
      )}
    </NodeViewWrapper>
  )
}

export default ToggleHeadingComponent