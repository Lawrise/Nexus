import React from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough, Underline } from "lucide-react";
import { Level } from "@tiptap/extension-heading";

interface MenuProps {
  editor: Editor;
}

interface HeadingSelectorProps {
  editor: Editor;
}

interface HeadingItem {
  label: string;
  value: string;
}

const HeadingSelector: React.FC<HeadingSelectorProps> = ({ editor }) => {
  const items: HeadingItem[] = [
    { label: "T", value: "p" },
    { label: "H1", value: "h1" },
    { label: "H2", value: "h2" },
    { label: "H3", value: "h3" },
  ];

  const setHeading = (value: string): void => {
    if (value === "p") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(value.charAt(1)) as Level })
        .run();
    }
  };

  return (
    <div className="flex space-x-0.5">
      {items.map((item) => (
        <button
          key={item.value}
          onMouseDown={(e) => {
            e.preventDefault();
            setHeading(item.value);
          }}
          className={`px-2 h-9 rounded-md transition-colors hover:bg-neutral-100 
            hover:dark:bg-neutral-700 ${
              (item.value === "p" && editor.isActive("paragraph")) ||
              (item.value !== "p" &&
                editor.isActive("heading", {
                  level: parseInt(item.value.charAt(1)),
                }))
                ? "text-blue-500 font-bold"
                : ""
            }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

// interface BubbleMenuParams {
//   editor: Editor;
//   view: EditorView;
//   state: EditorState;
//   oldState: EditorState;
//   from: number;
//   to: number;
// }

const Menu: React.FC<MenuProps> = ({ editor }) => {
  const getButtonClass = (isActive: boolean): string => {
    const baseClass =
      "p-2 rounded-md transition-colors hover:bg-neutral-100 hover:dark:bg-neutral-700";
    const activeClass = "text-blue-500 text-bold";

    return `${baseClass} ${isActive ? activeClass : ""}`;
  };

  const getIconProps = (isActive: boolean) => ({
    size: 16,
    strokeWidth: isActive ? 4 : 2,
  });
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        placement: "top",
        interactive: true,
        hideOnClick: false,
        // trigger: "mousedown",
        showOnCreate: true,
        appendTo: () => document.body,
      }}
    >
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm flex p-1 space-x-0.5">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={getButtonClass(editor.isActive("bold"))}
        >
          <Bold {...getIconProps(editor.isActive("bold"))} />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={getButtonClass(editor.isActive("italic"))}
        >
          <Italic {...getIconProps(editor.isActive("italic"))} />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={getButtonClass(editor.isActive("strike"))}
        >
          <Strikethrough {...getIconProps(editor.isActive("strike"))} />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={getButtonClass(editor.isActive("underline"))}
        >
          <Underline {...getIconProps(editor.isActive("underline"))} />
        </button>
        <HeadingSelector editor={editor} />
      </div>
    </BubbleMenu>
  );
};

export default Menu;
