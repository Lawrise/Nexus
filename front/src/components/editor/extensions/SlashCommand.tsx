// src/components/editor/extensions/SlashCommand.tsx
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import tippy from "tippy.js";
// Ensure you have tippy.js CSS imported somewhere in your project
// import 'tippy.js/dist/tippy.css';
import { Command } from "@/components/ui/command";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Code,
  Image,
} from "lucide-react";
import "tippy.js/dist/tippy.css";

// Add interfaces for your props
interface CommandItemProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  command: (props: { editor: any; range: any }) => void;
}

interface CommandListProps {
  items: CommandItemProps[];
  command: (item: CommandItemProps) => void;
}

interface CommandListRef {
  onKeyDown: ({ event }: { event: KeyboardEvent }) => boolean;
}

const CommandList = forwardRef<CommandListRef, CommandListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index) => {
      const item = props.items[index];
      if (item) {
        props.command(item);
      }
    };

    console.log("CommandList props:", props);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowUp") {
          setSelectedIndex(
            (selectedIndex + props.items.length - 1) % props.items.length
          );
          return true;
        }

        if (event.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % props.items.length);
          return true;
        }

        if (event.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }

        return false;
      },
    }));

    useEffect(() => setSelectedIndex(0), [props.items]);

    return (
      <Command className="rounded-md border border-neutral-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-950">
        <div className="px-2 py-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          Editor commands
        </div>
        <div className="max-h-80 overflow-y-auto p-1">
          {props.items.map((item, index) => (
            <button
              key={index}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm ${
                index === selectedIndex
                  ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                  : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
              onClick={() => selectItem(index)}
            >
              {item.icon}
              <div>
                <div className="font-medium">{item.title}</div>
                {item.description && (
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {item.description}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </Command>
    );
  }
);

CommandList.displayName = "CommandList";

export const slashCommands = [
  {
    title: "Text",
    description: "Just start writing with plain text",
    icon: <span className="text-neutral-500">Aa</span>,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "Heading 1",
    description: "Large section heading",
    icon: <Heading1 className="h-4 w-4 text-neutral-500" />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: <Heading2 className="h-4 w-4 text-neutral-500" />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    icon: <Heading3 className="h-4 w-4 text-neutral-500" />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list",
    icon: <List className="h-4 w-4 text-neutral-500" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a numbered list",
    icon: <ListOrdered className="h-4 w-4 text-neutral-500" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Task List",
    description: "Track tasks with a to-do list",
    icon: <CheckSquare className="h-4 w-4 text-neutral-500" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Code Block",
    description: "Add a block of code",
    icon: <Code className="h-4 w-4 text-neutral-500" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: "Bold",
    description: "Make text bold",
    icon: <Bold className="h-4 w-4 text-neutral-500" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBold().run();
    },
  },
  {
    title: "Italic",
    description: "Make text italic",
    icon: <Italic className="h-4 w-4 text-neutral-500" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleItalic().run();
    },
  },
];

// Replace your renderItems object with this function
export const renderSuggestion = () => {
  return {
    onStart: (props) => {
      const { editor, clientRect } = props;

      // Create a new ReactRenderer with the CommandList component
      const component = new ReactRenderer(CommandList, {
        props,
        editor,
      });

      // Create the tippy tooltip
      const tippyInstance = tippy(document.body, {
        getReferenceClientRect: clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
        arrow: false,
      })[0];

      // Store the component and tippy instances
      component.update(props);

      // Return an object with cleanup and update functions
      return {
        destroy() {
          tippyInstance.destroy();
          component.destroy();
        },
        update(updatedProps) {
          component.update(updatedProps);
          tippyInstance.setProps({
            getReferenceClientRect: updatedProps.clientRect,
          });
        },
      };
    },

    items: ({ query }) => {
      console.log("Query:", query);
      const filteredItems = slashCommands.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      console.log("Filtered items count:", filteredItems.length);
      return filteredItems;
    },

    command: ({ editor, range, props }) => {
      props.command({ editor, range });
    },
  };
};

// Modify the SlashCommand extension
export const SlashCommand = Extension.create({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false, // Allow slash commands anywhere, not just at line start
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        ...renderSuggestion(),
      }),
    ];
  },
});
