"use client";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User as UserIcon,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import ActiveLink from "./ActiveLink";

function Navbar() {
  const { data: session } = useSession(); // এখানে type "session" ???
  // const user : User = session?.user; //
  const user: User = session?.user as User; // why এখানে asertion লাগবে ???
  console.log(user);

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
          Famous Events
        </Link>
        <ul className="list-none flex gap-6 items-center">
          <li>
            <ActiveLink href="/">Home</ActiveLink>
          </li>
          <li>
            <ActiveLink href="/events">Events</ActiveLink>
          </li>
          <>
            <Command className="rounded-lg border shadow-md">
              <CommandInput placeholder="search..." />
            </Command>
          </>
        </ul>
        {session ? (
          <>
            <span className="mr-4 flex gap-4 items-center">
              <ActiveLink href="/dashboard">Dashboard</ActiveLink>

              <Button
                onClick={() => signOut()}
                className="w-full md:w-auto bg-slate-100 text-black"
                variant="outline"
              >
                Logout
              </Button>

              <Avatar>
                <AvatarImage src={user?.avatar} alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </span>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
