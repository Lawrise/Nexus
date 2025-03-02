import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ToggleContainerComponent from "./ToggleContainerComponent";

export default Node.create({
  name: "toggleContainer",

  group: "block",

  content: "toggleTitle toggleContent",

  defining: true,

  addAttributes() {
    return {
      open: {
        default: true,
        parseHTML: (element) => element.getAttribute("data-open") === "true",
        renderHTML: (attributes) => {
          return {
            "data-open": attributes.open,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="toggle-container"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "toggle-container",
        class: "toggle-container",
      }),
      0,
    ];
  },

  // Add a ReactNodeViewRenderer for the container too
  addNodeView() {
    return ReactNodeViewRenderer(ToggleContainerComponent);
  },
});
