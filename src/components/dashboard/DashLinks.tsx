"use client";

import ActiveLink from "../shared/ActiveLink";

const DashLinks = () => {
  return (
    <ul className="overflow-y-auto lg:overflow-hidden flex lg:block">
      <li className="lg:mb-4 text-center lg:text-left">
        <ul className="flex lg:block gap-2 text-xs lg:text-base">
          <li>
            <ActiveLink href="/dashboard">Profile</ActiveLink>
          </li>
        </ul>
      </li>
      <li className="lg:mb-4 text-center lg:text-left">
        <span className="hidden lg:block">Manage Users</span>
        <ul className="ps-4 flex lg:block gap-2 text-xs lg:text-base">
          <li>
            <ActiveLink href="/dashboard/all-users">All Users</ActiveLink>
          </li>
        </ul>
      </li>
      <li className="lg:mb-4 text-center lg:text-left">
        <span className="hidden lg:block">Manage Events</span>
        <ul className="ps-4 flex lg:block gap-2 text-xs lg:text-base">
          <li>
            <ActiveLink href="/dashboard/allEvents">All Events</ActiveLink>
          </li>
        </ul>
      </li>
      <li className="lg:mb-4 text-center lg:text-left">
        <span className="hidden lg:block">Manage Comments</span>
        <ul className="ps-4 flex lg:block gap-2 text-xs lg:text-base">
          <li>
            <ActiveLink href="/dashboard/allComments">All Comments</ActiveLink>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default DashLinks;
