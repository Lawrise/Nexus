import React, { useState, useEffect } from "react";
import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";



interface CalloutAttributes {
  emoji: string;
}

// Define the emoji data structure that comes from Emoji Mart
interface EmojiData {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}

// Default emojis for each callout type
const DEFAULT_EMOJIS = {
  info: "ℹ️",
  warning: "⚠️",
  success: "✅",
  error: "❌",
  star: "⭐",
  bookmark: "🔖",
  help: "❓",
  tip: "💡",
  note: "📝",
};

const CalloutComponent: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
}) => {
  const [emoji, setEmoji] = useState<string>(
    (node?.attrs as CalloutAttributes)?.emoji || DEFAULT_EMOJIS.info
  );
  const [isOpen, setIsOpen] = useState(false);

  // Update internal state when node attrs change
  useEffect(() => {
    setEmoji((node?.attrs as CalloutAttributes)?.emoji || DEFAULT_EMOJIS.info);
  }, [node?.attrs]);

  const handleEmojiSelect = (emojiData: EmojiData) => {
    setEmoji(emojiData.native);
    updateAttributes({ emoji: emojiData.native });
    setIsOpen(false);
  };

  return (
    <NodeViewWrapper className="flex p-4 mb-4 rounded-r-md items-center space-x-4 bg-zinc-100 rounded-md">
      <div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="p-1 hover:bg-transparent focus-visible:ring-0"
            >
              <span className="text-lg">{emoji}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </PopoverContent>
        </Popover>
      </div>

      <NodeViewContent className="callout-content" />
    </NodeViewWrapper>
  );
};

export default CalloutComponent;
