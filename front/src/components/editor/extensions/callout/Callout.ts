import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CalloutComponent from "./CalloutComponent";
import { wrappingInputRule } from "@tiptap/core";

export interface CalloutOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      /**
       * Set a callout node
       */
      setCallout: (type: string) => ReturnType;
      /**
       * Toggle a callout node
       */
      toggleCallout: (type: string) => ReturnType;
    };
  }
}

export const Callout = Node.create<CalloutOptions>({
  name: "callout",

  group: "block",

  content: "block+",

  defining: true,

  addAttributes() {
    return {
      type: {
        default: "info",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="callout"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "callout",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setCallout:
        (type) =>
        ({ commands }) => {
          return commands.setNode(this.name, { type });
        },
      toggleCallout:
        (type) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph", { type });
        },
    };
  },

  addInputRules() {
    // This is where you use the regex pattern
    return [
      wrappingInputRule({
        find: /^:::(\s*)$/,
        type: this.type,
        getAttributes: () => {
          return { type: "info" }; // Default to info type
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },
});
