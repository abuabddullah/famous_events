import DashLinks from "@/components/dashboard/DashLinks";
import { Separator } from "@/components/ui/separator";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:flex h-screen bg-gray-100">
      {/* DashboardSidebar starts */}
      <div className="lg:w-1/6 lg:bg-gray-800 lg:text-white p-8">
        <Link href="/">
          <ArrowBigLeft className="inline-block" /> Back to Home{" "}
          <Separator className="my-2" />
        </Link>
        <nav className="my-4">
          <DashLinks />
        </nav>
      </div>
      <div className="lg:w-5/6 p-8 bg-slate-100 min-h-svh">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
