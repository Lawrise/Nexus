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
      <Link href="/login" className="w-full  group-data-[collapsible=icon]:p-0">
        <span className="group-data-[collapsible=icon]:hidden">Connexion</span>
        <span className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center">
          <User className="size-4" />
        </span>
      </Link>
    );
  }

  const userInitials = user.email.substring(0, 1).toUpperCase();
  const username = user.email.split("@")[0];

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger className="w-full flex items-center space-x-4 rounded-md outline-none">
            <Avatar className="size-6 shrink-0 rounded-sm">
              <AvatarImage alt={username} />
              <AvatarFallback className="bg-amber-600 text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <p className="truncate text-sm font-medium t">{username}</p>
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
