import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "lucide-react";
import Link from "next/link";

interface UserType {
  email: string;
  // Add other user properties as needed
}

interface SidebarHeaderProfileProps {
  user: UserType | null;
  logout: () => void;
}

const SidebarProfile: React.FC<SidebarHeaderProfileProps> = ({
  user,
  logout,
}) => {
  if (!user) {
    return (
      <Link
        href="/login"
        className="w-full  group-data-[collapsible=icon]:p-0"
      >
        <span className="group-data-[collapsible=icon]:hidden">Connexion</span>
        <span className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center">
          <User className="size-4" />
        </span>
      </Link>
    );
  }

  const userInitials = user.email.substring(0, 2).toUpperCase();
  const username = user.email.split("@")[0];

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger className="w-full flex items-center space-x-4 p-2 rounded-md hover:bg-sidebar-accent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:space-x-0 outline-none">
            <Avatar className="size-8 shrink-0">
              <AvatarImage alt={username} />
              <AvatarFallback className="bg-emerald-100">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <p className="truncate group-data-[collapsible=icon]:hidden">
              {username}
            </p>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="hidden group-data-[collapsible=icon]:block"
        >
          {username}
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarProfile;
