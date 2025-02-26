import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const languages = [
  { value: "plain", label: "Plain Text" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
];

export const CodeBlockComponent = ({
  node,
  updateAttributes,
}: NodeViewProps) => {
  const codeRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    // Use setTimeout to ensure the code is fully rendered before highlighting
    if (codeRef.current) {
      codeRef.current.removeAttribute("data-highlighted");

      hljs.highlightElement(codeRef.current);
    }
    // console.log("Language:", node.attrs.language);
    // console.log("Text content:", node.textContent);
  }, [node.attrs.language, node.textContent, codeRef.current?.textContent]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(node.textContent);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <NodeViewWrapper className="relative group py-2">
      <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-t-lg py-2">
        <div className="flex items-center justify-between">
          <Select
            value={node.attrs.language}
            onValueChange={(value) => updateAttributes({ language: value })}
          >
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <pre className="!mt-0 !rounded-t-none">
          <code ref={codeRef} className={`language-${node.attrs.language}`}>
            <NodeViewContent />
          </code>
        </pre>
      </div>
    </NodeViewWrapper>
  );
};
