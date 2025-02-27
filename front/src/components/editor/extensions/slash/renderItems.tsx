import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import CommandsList from "@/components/editor/extensions/slash/CommandList";
import { Editor } from "@tiptap/core";

interface RenderItemsProps {
  editor: Editor;
  clientRect: () => DOMRect;
  event: KeyboardEvent;
}

const renderItems = (): {
  onStart: (props: RenderItemsProps) => void;
  onUpdate: (props: RenderItemsProps) => void;
  onKeyDown: (props: RenderItemsProps) => boolean | undefined;
  onExit: () => void;
} => {
  let component: ReactRenderer;
  let popup: Instance[];

  return {
    onStart: (props: RenderItemsProps) => {
      component = new ReactRenderer(CommandsList, {
        props,
        editor: props.editor,
      });

      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate(props: RenderItemsProps) {
      component.updateProps(props);

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },
    onKeyDown(props: RenderItemsProps) {
      if (
        component.ref &&
        typeof (component.ref as any).onKeyDown === "function"
      ) {
        return (component.ref as any).onKeyDown(props);
      }

      // The following code was unreachable in your original implementation
      // If you want to hide the popup when there's no onKeyDown method, uncomment this
      // popup[0].hide();
      // return true;

      return false;
    },
    onExit() {
      popup[0].destroy();
      component.destroy();
    },
  };
};

export default renderItems;
