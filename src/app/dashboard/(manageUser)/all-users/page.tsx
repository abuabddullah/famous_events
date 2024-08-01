"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PenIcon, X } from "lucide-react";

const users = [
  {
    username: "asifaowadud",
    avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
    role: "admin",
    email: "asifaowadud@gmail.com",
    password: "$2a$10$UKG/Mk5xJ1rv4IFCX91h9OwJ5zYP4W/6w3jhlxxYTI/4GEwTn27s6",
    verifyCode: "579458",
    verifyCodeExpiry: {
      $date: "2024-07-31T17:56:11.780Z",
    },
    isVerified: true,
    events: [
      {
        eventId: "sdfsdfsdfsdfsdf",
        title: "Good Event",
        date: "10/25/30",
        time: "09:00 pm",
      },
    ],
  },
  {
    username: "aowadud",
    avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
    role: "admin",
    email: "aowadud@gmail.com",
    password: "$2a$10$UKG/Mk5xJ1rv4IFCX91h9OwJ5zYP4W/6w3jhlxxYTI/4GEwTn27s6",
    verifyCode: "579458",
    verifyCodeExpiry: {
      $date: "2024-07-31T17:56:11.780Z",
    },
    isVerified: true,
    events: [
      {
        eventId: "sdfsdfsdfsdfsdf",
        title: "Good Event",
        date: "10/25/30",
        time: "09:00 pm",
      },
    ],
  },
  {
    username: "asif",
    avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
    role: "admin",
    email: "asif@gmail.com",
    password: "$2a$10$UKG/Mk5xJ1rv4IFCX91h9OwJ5zYP4W/6w3jhlxxYTI/4GEwTn27s6",
    verifyCode: "579458",
    verifyCodeExpiry: {
      $date: "2024-07-31T17:56:11.780Z",
    },
    isVerified: true,
    events: [
      {
        eventId: "sdfsdfsdfsdfsdf",
        title: "Good Event",
        date: "10/25/30",
        time: "09:00 pm",
      },
    ],
  },
  {
    username: "a.sif",
    avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
    role: "admin",
    email: "a.sif@gmail.com",
    password: "$2a$10$UKG/Mk5xJ1rv4IFCX91h9OwJ5zYP4W/6w3jhlxxYTI/4GEwTn27s6",
    verifyCode: "579458",
    verifyCodeExpiry: {
      $date: "2024-07-31T17:56:11.780Z",
    },
    isVerified: true,
    events: [
      {
        eventId: "sdfsdfsdfsdfsdf",
        title: "Good Event",
        date: "10/25/30",
        time: "09:00 pm",
      },
    ],
  },
  {
    username: "a.owadud",
    avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
    role: "admin",
    email: "a.owadud@gmail.com",
    password: "$2a$10$UKG/Mk5xJ1rv4IFCX91h9OwJ5zYP4W/6w3jhlxxYTI/4GEwTn27s6",
    verifyCode: "579458",
    verifyCodeExpiry: {
      $date: "2024-07-31T17:56:11.780Z",
    },
    isVerified: true,
    events: [
      {
        eventId: "sdfsdfsdfsdfsdf",
        title: "Good Event",
        date: "10/25/30",
        time: "09:00 pm",
      },
    ],
  },
];

const AllUsers = () => {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <small className="text-green-100 md:hidden">
          enable Desktop mode for full exp
        </small>
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          All Users
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="py-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                User
              </h5>
            </div>
            <div className="hidden py-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="py-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Role
              </h5>
            </div>
            <div className="py-2.5 text-center sm:block xl:p-5 border bg-slate-700 text-white md:col-span-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>

          {users.map((user, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === users.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 py-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {user?.username}
                </p>
              </div>

              <div className="hidden flex items-center justify-center py-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user?.email}</p>
              </div>

              <div className="flex items-center justify-center py-2.5 xl:p-5">
                <p className="text-meta-3">${user?.role}</p>
              </div>

              <div className="hidden items-center justify-center py-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">
                  <Button className="bg-green-600">
                    <PenIcon />
                  </Button>
                </p>
              </div>

              <div className="items-center justify-center py-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  <Button className="bg-red-600">
                    <X />
                  </Button>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
