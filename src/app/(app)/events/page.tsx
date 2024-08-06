"use client";

import { categories } from "@/components/homepage/HomeFeaturedEvents";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AppDispatch, RootState } from "@/rtk/app/store";
import { Event, fetchEventsAction } from "@/rtk/reducers/eventsAction";
import { clearEventsErrors } from "@/rtk/reducers/eventsSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const locations: string[] = ["All", "Tech City", "Art Town", "Music City"];

const EventsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, eventsData, error } = useSelector(
    (store: RootState) => store.events
  );

  const { toast } = useToast();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(
    eventsData || []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("date");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventsPerPage = 4;

  // // Example usage in a component or function
  // const loadEvents = () => async (dispatch: AppDispatch) => {
  //   dispatch(fetchEventsAction());
  // };

  useEffect(() => {
    if (error) {
      toast({
        title: "Events Getting Failed",
        description: error,
        variant: "destructive",
      });
      dispatch(clearEventsErrors());
    }
    dispatch(fetchEventsAction());
  }, [dispatch, error, toast]);

  useEffect(() => {
    let result = Array.isArray(eventsData) ? [...eventsData] : [];

    if (selectedCategory !== "All") {
      result = result.filter((event) => event?.category === selectedCategory);
    }

    if (selectedLocation !== "All") {
      result = result.filter((event) =>
        event?.location.includes(selectedLocation)
      );
    }

    if (selectedCategory == "All" || selectedCategory == "All") {
      let result = Array.isArray(eventsData) ? [...eventsData] : [];
    }

    if (sortOption === "date") {
      result.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortOption === "rating") {
      // এখানে ratings[] কে .reduce() method দিয়ে avg rating বের করে এনে কাজ করতে হবে
      result.sort((a, b) => b.ratings[0].rating - a.ratings[0].rating);
    }

    setFilteredEvents(result);
  }, [selectedCategory, selectedLocation, sortOption, eventsData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:justify-between">
          <div className="mb-4 md:mb-0 flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded ${
                  selectedCategory === category
                    ? "bg-slate-800 text-white"
                    : "bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mb-4 md:mb-0 flex space-x-4">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`px-4 py-2 rounded ${
                  selectedLocation === location
                    ? "bg-slate-800 text-white"
                    : "bg-gray-200"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
          <div className="mb-4 md:mb-0">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((event, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg shadow-md"
              >
                {event?.images.length > 0 && (
                  <Image
                    src={event?.images[0]}
                    alt={`Event image`}
                    width={500} // Set appropriate width
                    height={300} // Set appropriate height
                    className="w-full h-auto object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-bold mb-2">{event?.title}</h2>
                <p className="text-gray-700 mb-2">{event?.date}</p>
                <p className="text-gray-500 mb-2">{event?.location}</p>
                <p className="text-gray-500 mb-2">
                  Rating: {event?.ratings[0]?.rating || 0} / 5
                </p>
                <Link href={`events/_id`}>
                  <Button>See Details ...</Button>
                </Link>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded bg-slate-800 text-white disabled:bg-gray-400"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded bg-slate-800 text-white disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
