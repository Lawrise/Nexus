import React, { useState } from "react";
import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockAttributes {
  language: string;
}

const SUPPORTED_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "html",
  "css",
  "json",
  "markdown",
  // Add more languages as needed
] as const;

interface CodeComponentProps extends Omit<NodeViewProps, "node" | "extension"> {
  node: {
    attrs: CodeBlockAttributes;
  };
  extension: {
    options: {
      lowlight: {
        listLanguages: () => string[];
      };
    };
  };
}

const CodeComponent: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  extension,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const language = (node?.attrs as CodeBlockAttributes)?.language;
  const languages = (
    extension as CodeComponentProps["extension"]
  ).options.lowlight.listLanguages();

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(node.textContent);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <NodeViewWrapper className="code-block relative">
      <Select
        value={language || "auto"}
        onValueChange={(value) => updateAttributes({ language: value })}
      >
        <SelectTrigger className="w-fit absolute left-2 top-2 p-none h-5 text-sm text-zinc-500 outline-none border-none ring-0 hover:ring-0 hover:border-none shadow-none focus:border-none focus:ring-0 focus:shadow-none">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">Auto</SelectItem>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        className="flex items-center absolute top-2 right-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded focus:border-none focus-visible:border-none focus:ring-0 focus-visible:ring-0"
        onClick={(e) => {
          e.stopPropagation();
          copyToClipboard();
        }}
        type="button"
        variant="ghost"
      >
        {isCopied ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" />
            <span>Copy</span>
          </>
        )}
      </Button>
      <pre className="bg-neutral-50 pt-8 px-4 rounded-lg">
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeComponent;
