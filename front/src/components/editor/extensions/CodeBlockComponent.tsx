import React from "react";
import { NodeViewContent, NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const language = (node?.attrs as CodeBlockAttributes)?.language;
  const languages = (
    extension as CodeComponentProps["extension"]
  ).options.lowlight.listLanguages();

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
          <SelectItem value="separator" disabled className="font-bold">
            ───────────
          </SelectItem>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <pre className="bg-neutral-50 pt-8 px-4 rounded-lg">
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeComponent;
