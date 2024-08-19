import { AppDispatch, RootState } from "@/rtk/app/store";
import { Event, fetchEventsAction } from "@/rtk/reducers/eventsAction";
import { clearEventsErrors } from "@/rtk/reducers/eventsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

export const categories: string[] = [
  "All",
  "Conferences",
  "Workshops",
  "Concerts",
];

const HomeFeaturedEvents = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, eventsData, error } = useSelector(
    (store: RootState) => store.events
  );
  const { toast } = useToast();
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
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(
    eventsData || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const filterEvents = () => {
      let result = eventsData;

      if (searchQuery) {
        result = result.filter(
          (event) =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory !== "All") {
        result = result.filter((event) => event.category === selectedCategory);
      }

      setFilteredEvents(result);
    };

    filterEvents();
  }, [searchQuery, selectedCategory, eventsData]);

  return (
    <section
      className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white"
      style={{
        backgroundImage: "url('/assets/event as bg.jpg')",
      }}
    >
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          Dive into the World of Wonderfull Feedback
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Famous Events - Where your memory remains a safe.
        </p>
      </div>
      <div className="p-6 w-full mx-auto">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search events..."
            className="p-2 border rounded w-full text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`m-2 px-4 py-2 rounded ${
                selectedCategory === category
                  ? "bg-slate-800 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-6 lg:h-[78vh] overflow-hidden overflow-y-auto no-scrollbar">
          {filteredEvents?.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg shadow-md bg-[#161711] bg-opacity-50 hover:bg-opacity-85 delay-150 transition-opacity"
              >
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-300 mb-2">{event.description}</p>
                <p className="text-gray-400 mb-2">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Price:</strong> {event.ticketPrice}
                </p>
                <Link href={`events/${event?._id}`}>
                  <button>See details</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedEvents;
