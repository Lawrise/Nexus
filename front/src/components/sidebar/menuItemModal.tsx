import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"; // Import SidebarMenuItem if not already

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
      className="hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg flex items-center justify-center p-1"
    >
      {/* Button that triggers the dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <SidebarMenuButton className="flex items-center space-x-3 w-full h-full text-text_primary dark:text-text_dark p-[2px]">
            <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{title}</span>
          </SidebarMenuButton>
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
