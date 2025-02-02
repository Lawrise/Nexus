import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import React from "react";
import { SidebarMenuItem } from "@/components/ui/sidebar"; // Import SidebarMenuItem if not already

interface MenuItemWithModalProps {
  title: string;
  icon: React.ElementType;
  children?: React.ReactNode;
}

/*
  Navbar menu item that open a modal that can be used for settings or search
*/
const MenuItemWithModal: React.FC<MenuItemWithModalProps> = ({ title, icon: Icon, children }) => {
  return (
    <SidebarMenuItem
      key={title}
      className="hover:bg-zinc-100 dark:hover:bg-primary rounded-lg flex items-center justify-between p-1"
    >
      {/* Button that triggers the dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center space-x-2 w-full h-full text-text_primary dark:text-text_dark">
            <Icon className="w-4 h-4 text-text_primary dark:text-zinc-400" />
            <span className="text-sm ">{title}</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{children}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </SidebarMenuItem>
  );
};

export default MenuItemWithModal;
