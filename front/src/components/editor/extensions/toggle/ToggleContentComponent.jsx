import React, { useState, useEffect } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const ToggleContentComponent = ({ node, getPos, editor }) => {
  // Find parent toggle container
  const toggleContainer = editor.state.doc.resolve(getPos()).before(1);
  const toggleContainerNode =
    toggleContainer !== undefined
      ? editor.state.doc.nodeAt(toggleContainer)
      : null;

  // Use React state for local status
  const [isOpen, setIsOpen] = useState(
    toggleContainerNode?.attrs.open || false
  );

  // Update local state when document model changes
  useEffect(() => {
    const newIsOpen = toggleContainerNode?.attrs.open || false;
    if (isOpen !== newIsOpen) {
      setIsOpen(newIsOpen);
    }
  }, [toggleContainerNode?.attrs.open]);

  console.log("ToggleContentComponent", { isOpen });

 
  return (
    <NodeViewWrapper
      className={`toggle-content pl-7 mt-1 ${isOpen ? "block" : "hidden"}`}
    >
      <NodeViewContent />
    </NodeViewWrapper>
  );
};

export default ToggleContentComponent;
