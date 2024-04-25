"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, LayoutDashboard, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AvatarProfile() {
  const { data: session, status } = useSession();

  const CheckAuthenticated = () => {
    return status === "authenticated" ? (
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="w-8 h-8">
            <AvatarImage src={session?.user?.image} alt="profile" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link className="flex" href={"#"}>
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex" href={"/dashboard/stores"}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                signOut();
              }}
            >
              <p className="flex">
                <LogOut className="mr-2 h-4 w-4" />
                <span>LogOut</span>
              </p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Link
        href={"/signin"}
        className="bg-yellow-700 px-3 py-1 rounded-lg text-white hover:opacity-90"
      >
        SignIn
      </Link>
    );
  };

  return <CheckAuthenticated />;
}
