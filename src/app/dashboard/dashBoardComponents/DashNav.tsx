import ActiveLink from "@/components/shared/ActiveLink";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LineChart, Package, Plus, User, Users } from "lucide-react";
import DashBoaradIcon from "./DashBoaradIcon";
const DashNav = () => {
  return (
    <>
      <ActiveLink
        href="/dashboard"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <DashBoaradIcon tailwindClass={"h-4 w-4"} />
        Dashboard
      </ActiveLink>
      <ActiveLink
        href="/dashboard/profile"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <User className="h-4 w-4" />
        Profile
      </ActiveLink>

      <Separator className="my-4" />
      <>
        <ActiveLink
          href="/dashboard/allEvents"
          className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
        >
          <Package className="h-4 w-4" />
          Events{" "}
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge>
        </ActiveLink>
        <ActiveLink
          href="/dashboard/add-events"
          className="ms-4 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Plus className="h-4 w-4" />
          Add Events
        </ActiveLink>
      </>
      <>
        <ActiveLink
          href="/dashboard/all-users"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Users className="h-4 w-4" />
          Users
        </ActiveLink>
      </>
      <Separator className="my-4" />

      <ActiveLink
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <LineChart className="h-4 w-4" />
        Analytics
      </ActiveLink>
    </>
  );
};

export default DashNav;
