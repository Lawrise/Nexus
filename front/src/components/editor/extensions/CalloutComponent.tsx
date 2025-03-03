import React, { useState, useEffect } from "react";
import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Info,
  AlertTriangle,
  CheckCircle,
  X,
  Star,
  Bookmark,
  HelpCircle,
  Lightbulb,
  Coffee,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalloutAttributes {
  type: CalloutType;
}

type CalloutType =
  | "info"
  | "warning"
  | "success"
  | "error"
  | "star"
  | "bookmark"
  | "help"
  | "tip"
  | "note";

interface CalloutComponentProps extends Omit<NodeViewProps, "node"> {
  node: {
    attrs: CalloutAttributes;
  };
}

const CALLOUT_ICONS = {
  info: <Info className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  success: <CheckCircle className="h-5 w-5" />,
  error: <X className="h-5 w-5" />,
  star: <Star className="h-5 w-5" />,
  bookmark: <Bookmark className="h-5 w-5" />,
  help: <HelpCircle className="h-5 w-5" />,
  tip: <Lightbulb className="h-5 w-5" />,
  note: <Coffee className="h-5 w-5" />,
};

const CALLOUT_COLORS = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  star: "bg-purple-50 border-purple-200 text-purple-800",
  bookmark: "bg-indigo-50 border-indigo-200 text-indigo-800",
  help: "bg-cyan-50 border-cyan-200 text-cyan-800",
  tip: "bg-amber-50 border-amber-200 text-amber-800",
  note: "bg-gray-50 border-gray-200 text-gray-800",
};

const CalloutComponent: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
}) => {
  const [calloutType, setCalloutType] = useState<CalloutType>(
    (node?.attrs as CalloutAttributes)?.type || "info"
  );
  const [isOpen, setIsOpen] = useState(false);

  // Update internal state when node attrs change
  useEffect(() => {
    setCalloutType((node?.attrs as CalloutAttributes)?.type || "info");
  }, [node?.attrs]);

  const handleTypeChange = (type: CalloutType) => {
    // Update both local state and node attributes
    setCalloutType(type);
    updateAttributes({ type });
    setIsOpen(false);
  };

  return (
    <NodeViewWrapper
      className={cn(
        "flex p-4 mb-4 border-l-4 rounded-r-md items-center space-x-4",
        CALLOUT_COLORS[calloutType]
      )}
    >
      <div className="">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className=" p-1 hover:bg-transparent focus-visible:ring-0 "
            >
              {CALLOUT_ICONS[calloutType]}
			  <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2" align="start">
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(CALLOUT_ICONS).map(([key, icon]) => (
                <Button
                  key={key}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex flex-col items-center justify-center h-16 gap-1 hover:bg-gray-100",
                    calloutType === key ? "bg-gray-100" : ""
                  )}
                  onClick={() => handleTypeChange(key as CalloutType)}
                >
                  {icon}
                  <span className="text-xs capitalize">{key}</span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <NodeViewContent className="callout-content" />
    </NodeViewWrapper>
  );
};

export default CalloutComponent;
