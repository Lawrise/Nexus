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
import SidebarProfile from "./sidebarProfile";
import { useAuth } from "@/context/authContext";

/*
  The notion inspiered sidebar based on the shad/cn ui sidebar.
  All the navigation in the app is done with this sidebar and it will always been displayed.
*/
export function AppSidebar() {
  const { user, logout } = useAuth();
  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="z-20 bg-zinc-50 dark:bg-[#202020] dark:text-white border-r-none"
    >
      <SidebarHeader className="flex-row items-center justify-between py-2">
        <SidebarProfile user={user} logout={logout} />
        <CustomTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu >
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
