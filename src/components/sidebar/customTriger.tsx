import { useSidebar } from "@/components/ui/sidebar";
import { ChevronsRight, ChevronsLeft, Menu } from "lucide-react";
import React, { useState } from "react";

interface TriggerProps {
  hideWhenOpen?: boolean;
}

/*
  trigger the opening of the sidebar.
  hook useSidebar allow it to be in any part of the app as long as it is inide the sidebar provider that
  is wrap arround the entire app.
*/
const CustomTrigger: React.FC<TriggerProps> = ({ hideWhenOpen }) => {
  const { toggleSidebar, open } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  const buttonClasses = `p-1 hover:bg-zinc-200 dark:hover:bg-primary rounded-md ${
    hideWhenOpen && open ? "hidden" : "visible"
  }`;

  return (
    <button
      onClick={toggleSidebar}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {open ? (
        isHovered ? (
          <ChevronsLeft className={buttonClasses} />
        ) : (
          <Menu className={buttonClasses} />
        )
      ) : isHovered ? (
        <ChevronsRight className={buttonClasses} />
      ) : (
        <Menu className={buttonClasses} />
      )}
    </button>
  );
};

export default CustomTrigger;
