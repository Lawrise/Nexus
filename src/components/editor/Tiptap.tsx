import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Bold_t from "@tiptap/extension-bold";
import Italic_t from "@tiptap/extension-italic";
import Strike_t from "@tiptap/extension-strike";
import Underline_t from "@tiptap/extension-underline";

import "@/style/editor.css";

import { all, createLowlight } from "lowlight";
import Menu from "./menu";

const Tiptap = () => {
  const lowlight = createLowlight(all);
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-gray-300 p-4 bg-gray-50",
        },
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-4",
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "my-4",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "list-none my-2",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: `
      flex items-center gap-3 ml-4
      [&[data-checked='true']_p]:line-through
      [&[data-checked='true']_p]:accent-pink-500
      [&>label]:flex
      [&>label]:items-center-
      [&>label>input]:w-4
      [&>label>input]:h-4
      [&>label>input]:accent-blue-500
      [&>div]:flex
      [&>div]:items-center
    `,
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-neutral-50 p-4 text-black",
        },
      }),
      Bold_t,
      Italic_t,
      Strike_t,
      Underline_t,
    ],
    content: `
    <h1>Hello World! 🌎️</h1>
    <h2>Titre 2</h2>
    <h3>Titre 3</h3>

    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>

    <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>

    <p>Just a simple text to test the bubble menu</p>
    `,
    editorProps: {
      attributes: {
        class: "h-full focus:outline-none",
      },
    },
  });

  return (
    <>
      {editor && <Menu editor={editor} />}
      <EditorContent editor={editor} className="h-full focus:border-none" />
    </>
  );
};

export default Tiptap;
