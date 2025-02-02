"use client";
import { Calendar, Home, Search, Settings, Network } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import CustomTrigger from "./customTriger";
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Graph",
    url: "#",
    icon: Network,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
import MenuItemWithModal from "./menuItemModal";

/*
  The notion inspiered sidebar based on the shad/cn ui sidebar.
  All the navigation in the app is done with this sidebar and it will always been displayed.
*/
export function AppSidebar() {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="bg-zinc-50 dark:bg-dark_background_light dark:text-white"
    >
      <SidebarHeader className="flex-row items-center justify-between py-2 px-6">
        <p>Jembe Boisne</p>
        <CustomTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <MenuItemWithModal
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
