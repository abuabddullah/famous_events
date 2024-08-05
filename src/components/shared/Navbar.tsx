"use client";

import { Command, CommandInput } from "@/components/ui/command";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import ActiveLink from "./ActiveLink";

function Navbar() {
  const pathName = usePathname();
  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Events",
      path: "/events",
    },
  ];

  const { data: session } = useSession(); // এখানে type "session" ???
  // const user : User = session?.user; //
  const user: User = session?.user as User; // why এখানে asertion লাগবে ???

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          href="/"
          className="hidden md:block text-xl font-bold mb-4 md:mb-0"
        >
          Famous Events
        </Link>
        <div className="list-none flex gap-6 items-center">
          {navLinks?.map((navLink, index) => (
            <Link
              className={`${
                navLink?.path == pathName && "text-red-600 underline"
              } hover:text-red-300`}
              key={index}
              href={navLink?.path}
            >
              {navLink?.title}
            </Link>
          ))}

          <Command className="rounded-lg border shadow-md hidden md:block">
            <CommandInput placeholder="search..." />
          </Command>
          {session ? (
            <>
              <ActiveLink className="" href="/dashboard">
                Dashboard
              </ActiveLink>

              <Button
                onClick={() => signOut()}
                className="w-full md:w-auto bg-slate-100 text-black px-0 py-"
                variant="outline"
              >
                Logout
              </Button>

              <Avatar className="hidden md:block">
                <AvatarImage src={user?.avatar} alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <Link href="/sign-in">
              <Button
                className="w-full md:w-auto bg-slate-100 text-black px-0 py-"
                variant={"outline"}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
