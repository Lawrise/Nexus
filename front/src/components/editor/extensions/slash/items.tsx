import { Editor } from "@tiptap/core";
import { JSX } from "react";
import React from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Text,
  List,
  ListOrdered,
  SquareCheck,
  Minus,
  Code,
} from "lucide-react";

interface CommandItem {
  title: string;
  element?: JSX.Element;
  icon?: JSX.Element;
  command: (props: { editor: Editor; range: any }) => void;
}

interface GetSuggestionItemsProps {
  editor: Editor;
  range: any;
}

const getSuggestionItems = (
  query: string | null | undefined
): CommandItem[] => {
  const normalizedQuery = typeof query === "string" ? query.toLowerCase() : "";

  return [
    {
      title: "Text",
      icon: <Text className="w-4 h-4" />,
      command: ({ editor, range }: GetSuggestionItemsProps) => {
        editor.chain().focus().deleteRange(range).setNode("paragraph").run();
      },
    },
    {
      title: "Heading 1",
      icon: <Heading1 className="w-4 h-4" />,
      command: ({ editor, range }: GetSuggestionItemsProps) => {
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
      icon: <Heading2 className="w-4 h-4" />,
      command: ({ editor, range }: GetSuggestionItemsProps) => {
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
      icon: <Heading3 className="w-4 h-4" />,
      command: ({ editor, range }: GetSuggestionItemsProps) => {
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
      icon: <List className="w-4 h-4" />,
      command: ({ editor, range }: GetSuggestionItemsProps) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "Ordered List",
      icon: <ListOrdered className="w-4 h-4" />,
      command: ({ editor, range }: GetSuggestionItemsProps) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: "Task List",
      icon: <SquareCheck className="w-4 h-4" />,
      command: ({ editor, range }: GetSuggestionItemsProps) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: "Code Block",
      icon: <Code className="w-4 h-4" />,
      command: ({ editor, range }: GetSuggestionItemsProps) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
    {
      title: "Divider",
      icon: <Minus className="w-4 h-4" />,
      command: ({ editor, range }: GetSuggestionItemsProps) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
  ]
    .filter((item) => item.title.toLowerCase().startsWith(normalizedQuery))
    .slice(0, 10);
};

export default getSuggestionItems;
