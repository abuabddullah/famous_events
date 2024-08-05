"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { fetchEventsAction } from "@/rtk/reducers/eventsAction";
import { clearEventsErrors } from "@/rtk/reducers/eventsSlice";
import { PenIcon, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllEvents = () => {
  const {
    isLoading,
    eventsData: { events = [] },
    error,
  } = useSelector((store: any) => store.events);
  const dispatch = useDispatch();
  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      toast({
        title: "Events Getting Failed",
        description: error.message,
        variant: "destructive",
      });
      dispatch(clearEventsErrors());
    }
    dispatch(fetchEventsAction());
  }, [dispatch, error, toast]);
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Events
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Title</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Category</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Price</p>
          </div>
          <div className="col-span-1 hidden lg:flex items-center">
            <p className="font-medium">Location</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {events?.map((event, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-3 flex items-center lg:p-4 py-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <Image
                    src={event?.images[0]}
                    width={60}
                    height={50}
                    alt="Product"
                  />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {event?.title}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex lg:p-4 py-2">
              <p className="text-sm text-black dark:text-white">
                {event?.category}
              </p>
            </div>
            <div className="col-span-1 flex items-center lg:p-4 py-2">
              <p className="text-sm text-black dark:text-white">
                ${event?.ticketPrice}
              </p>
            </div>
            <div className="hidden col-span-1 lg:flex items-center lg:p-4 py-2">
              <p className="text-sm text-black dark:text-white">
                {event?.location}
              </p>
            </div>
            <div className="col-span-1 flex items-center gap-2 lg:p-4 py-2">
              <Link href="/dashboard/edit-events/${_id}">
                <Button className="p-2 lg:p-4 bg-green-600 hover:text-white">
                  <PenIcon />
                </Button>
              </Link>
              <Button className="p-2 lg:p-4 bg-red-600 hover:text-white">
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllEvents;
