import React, { Component, JSX } from "react";
import { Editor } from "@tiptap/core";

interface CommandItem {
  title: string;
  element?: JSX.Element;
  icon?: JSX.Element;
  command: (props: { editor: Editor; range: any }) => void;
}

interface CommandsListProps {
  items: CommandItem[];
  command: (item: CommandItem) => void;
}

interface CommandsListState {
  selectedIndex: number;
}

class CommandsList extends Component<CommandsListProps, CommandsListState> {
  state = {
    selectedIndex: 0,
  };

  componentDidUpdate(oldProps: CommandsListProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown({ event }: { event: KeyboardEvent }): boolean {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    console.log("Up handler called");
    const newIndex =
      (this.state.selectedIndex + this.props.items.length - 1) %
      this.props.items.length;
    console.log("New index:", newIndex);

    this.setState({ selectedIndex: newIndex }, () => {
      console.log("State updated to:", this.state.selectedIndex);
    });
  }

  downHandler() {
    console.log("Down handler called");
    const newIndex = (this.state.selectedIndex + 1) % this.props.items.length;
    console.log("New index:", newIndex);

    this.setState({ selectedIndex: newIndex }, () => {
      console.log("State updated to:", this.state.selectedIndex);
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index: number) {
    const item = this.props.items[index];

    if (item) {
      this.props.command(item);
    }
  }

  render() {
    const { items } = this.props;
    return (
      <div className="flex flex-col w-[180px] bg-white shadow-sm border border-gray-200 rounded-md items-start p-2">
        {items.map((_item: CommandItem, index: number) => (
          <button
            className={`flex items-center w-full text-left px-2 py-1.5 rounded ${
              index === this.state.selectedIndex
                ? "bg-zinc-100"
                : "hover:bg-gray-50"
            }`}
            key={index}
            onClick={() => this.selectItem(index)}
          >
            {_item.icon && (
              <span className="mr-2 flex-shrink-0">{_item.icon}</span>
            )}
            <span>{_item.element || _item.title}</span>
          </button>
        ))}
      </div>
    );
  }
}

export default CommandsList;
