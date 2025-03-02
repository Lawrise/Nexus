import React, { useState, useEffect } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { ChevronRight, ChevronDown } from "lucide-react";

const ToggleTitleComponent = ({ node, getPos, editor, updateAttributes }) => {
  // Find parent toggle container
  const toggleContainer = editor.state.doc.resolve(getPos()).before(1);
  const toggleContainerNode =
    toggleContainer !== undefined
      ? editor.state.doc.nodeAt(toggleContainer)
      : null;

  // Use React state to track open/closed status
  const [isOpen, setIsOpen] = useState(
    toggleContainerNode?.attrs.open || false
  );

  // Watch for external changes to the toggle state
  useEffect(() => {
    const newIsOpen = toggleContainerNode?.attrs.open || false;
    if (isOpen !== newIsOpen) {
      setIsOpen(newIsOpen);
    }
  }, [toggleContainerNode?.attrs.open]);

  const toggleOpen = (e) => {
	e.stopPropagation();
	e.preventDefault(); // Add this to fully prevent default behavior
	
	// Update local state immediately for responsive UI
	const newIsOpen = !isOpen;
	setIsOpen(newIsOpen);
	
	// Update document model using the editor commands API
	const pos = toggleContainer;
	if (pos !== undefined) {
	  editor.chain().focus().command(({ tr }) => {
		// Set the attribute directly on the node at position
		tr.setNodeAttribute(pos, "open", newIsOpen);
		return true;
	  }).run();
	}
  };

  return (
    <NodeViewWrapper className="toggle-title flex items-start py-1">
      <button
        className="toggle-button flex-shrink-0 flex items-center justify-center w-6 h-6 mr-1 rounded hover:bg-gray-100"
        onClick={toggleOpen}
        contentEditable={false}
        type="button" // Specify button type to prevent form submission
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      <div className="title-content font-bold text-lg">
        <NodeViewContent as="span" />
      </div>
    </NodeViewWrapper>
  );
};

export default ToggleTitleComponent;
