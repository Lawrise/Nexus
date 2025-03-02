import React, { useState, useEffect } from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

const ToggleContainerComponent = ({ node, updateAttributes }) => {
  // Get the open state from the node attributes
  const [isOpen, setIsOpen] = useState(node.attrs.open)
  
  useEffect(() => {
    if (isOpen !== node.attrs.open) {
      setIsOpen(node.attrs.open)
    }
  }, [node.attrs.open])
  
 
  return (
    <NodeViewWrapper className="toggle-container">
      <NodeViewContent className="toggle-container-content" />
    </NodeViewWrapper>
  )
}

export default ToggleContainerComponent