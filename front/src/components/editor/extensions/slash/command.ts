import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

interface CommandsOptions {
  suggestion: {
    char: string;
    startOfLine: boolean;
    command: ({ editor, range, props }: any) => void;
  };
}

const Commands = Extension.create<CommandsOptions>({
  name: "mention",

  defaultOptions: {
    suggestion: {
      char: "/",
      startOfLine: false,
      command: ({ editor, range, props }) => {
        props.command({ editor, range, props });
      }
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
});

export default Commands;