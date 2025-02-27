import CodeBlockView from "../editor/extensions/CodeBlockComponent";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // or any other theme you prefer
import { textblockTypeInputRule } from '@tiptap/core'

// interface CodeBlockProps extends NodeViewProps {
//   node: NodeViewProps["node"] & {
//     attrs: {
//       language: string;
//       content: string;
//     };
//   };
//   updateAttributes: (attrs: Record<string, any>) => void;
// }

// const SUPPORTED_LANGUAGES = [
//   "plain",
//   "typescript",
//   "javascript",
//   "python",
//   "java",
//   "cpp",
//   "ruby",
//   "php",
//   "html",
//   "css",
//   "sql",
// ];

// Tiptap Extension Configuration
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

export interface CodeBlockOptions {
  HTMLAttributes?: Record<string, any>;
}

/**
 * Matches a code block with backticks.
 */
const backtickInputRegex = /^```([a-z]+)?[\s\n]$/

/**
 * Matches a code block with tildes.
 */
const tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    codeBlock: {
      setCodeBlock: (attributes?: { language: string }) => ReturnType;
      toggleCodeBlock: (attributes?: { language: string }) => ReturnType;
    };
  }
}

export const CustomCodeBlock = Node.create<CodeBlockOptions>({
  name: "codeBlock",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: "text*",

  marks: "",

  group: "block",

  code: true,

  defining: true,

  addAttributes() {
    return {
      language: {
        default: "plain",
        parseHTML: (element) =>
          element.getAttribute("data-language") || "plain",
        renderHTML: (attributes) => {
          return {
            "data-language": attributes.language,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "pre",
      mergeAttributes(this.options.HTMLAttributes || {}, HTMLAttributes, {
        class: `language-${HTMLAttributes.language || "plain"}`,
      }),
      ["code", { class: `language-${HTMLAttributes.language || "plain"}` }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView);
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: backtickInputRegex,
        type: this.type,
        getAttributes: match => ({
          language: match[1],
        }),
      }),
      textblockTypeInputRule({
        find: tildeInputRegex,
        type: this.type,
        getAttributes: match => ({
          language: match[1],
        }),
      }),
    ]
  },

  addCommands() {
    return {
      setCodeBlock:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes);
        },
      toggleCodeBlock:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph", attributes);
        },
    };
  },
});
