import { Event } from "@/model/Event.model";
import { fetchEventsAction } from "@/rtk/reducers/eventsAction";
import { clearEventsErrors } from "@/rtk/reducers/eventsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";

/* export interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  ticketPrice: number;
  ratings: any[];
  images: string[];
  comments: any[];
  attendees: any[];
}

export const eventsData: Event[] = [
  {
    title: "Tech Expo 2024",
    description:
      "Join us for the Tech Expo 2024 showcasing the latest in tech innovations and startup pitches.",
    date: "2024-10-20",
    time: "10:00 AM",
    location: "Innovation Hub, 456 Tech Avenue, Tech City",
    category: "Conferences",
    ticketPrice: 199,
    ratings: [
      {
        username: "techlover2024",
        avatar: "https://i.ibb.co/n8BKWG2/event2.jpg",
        rating: 5,
      },
      {
        username: "codingninja",
        avatar: "https://i.ibb.co/2S6hGJw/event-as-bg.jpg",
        rating: 4,
      },
    ],
    images: [
      "https://i.ibb.co/n8BKWG2/event2.jpg",
      "https://i.ibb.co/2S6hGJw/event-as-bg.jpg",
      "https://i.ibb.co/nbmvQhm/abstract-blur-wedding-hall.jpg",
    ],
    comments: [
      {
        username: "techlover2024",
        avatar: "https://i.ibb.co/n8BKWG2/event2.jpg",
        date: "2024-08-01",
        commentText: "Exciting event! Can't wait to see the startups.",
        likes: 5,
        dislikes: 0,
        replies: [
          {
            username: "startup_enthusiast",
            avatar: "https://i.ibb.co/nbmvQhm/abstract-blur-wedding-hall.jpg",
            date: "2024-08-02",
            commentText: "Same here! Hoping to discover some hidden gems.",
            likes: 3,
            dislikes: 0,
          },
        ],
      },
    ],
    attendees: [],
  },
  {
    title: "Future Tech Summit 2024",
    description:
      "Explore the future of technology at the 2024 Summit featuring talks on AI, robotics, and quantum computing.",
    date: "2024-11-15",
    time: "08:30 AM",
    location: "Tech Innovation Center, 789 Future Road, Techopolis",
    category: "Workshops",
    ticketPrice: 349,
    ratings: [
      {
        username: "futuretechfanatic",
        avatar: "https://i.ibb.co/2S6hGJw/event-as-bg.jpg",
        rating: 4,
      },
      {
        username: "techgeek2023",
        avatar: "https://i.ibb.co/n8BKWG2/event2.jpg",
        rating: 5,
      },
    ],
    images: [
      "https://i.ibb.co/2S6hGJw/event-as-bg.jpg",
      "https://i.ibb.co/nbmvQhm/abstract-blur-wedding-hall.jpg",
      "https://i.ibb.co/2S6hGJw/event-as-bg.jpg",
    ],
    comments: [
      {
        username: "futuretechfanatic",
        avatar: "https://i.ibb.co/2S6hGJw/event-as-bg.jpg",
        date: "2024-08-02",
        commentText: "The lineup looks incredible! Can't wait to attend.",
        likes: 12,
        dislikes: 0,
        replies: [
          {
            username: "quantum_enthusiast",
            avatar: "https://i.ibb.co/n8BKWG2/event2.jpg",
            date: "2024-08-03",
            commentText:
              "I'm particularly interested in the quantum computing sessions.",
            likes: 8,
            dislikes: 1,
          },
        ],
      },
    ],
    attendees: [],
  },
  {
    title: "AI & Robotics Symposium 2024",
    description:
      "Join us for a deep dive into AI and robotics technologies at our annual symposium.",
    date: "2024-09-30",
    time: "11:00 AM",
    location: "RoboTech Center, 101 Robotics Avenue, Innovate City",
    category: "Concerts",
    ticketPrice: 249,
    ratings: [
      {
        username: "aitechenthusiast",
        avatar: "https://i.ibb.co/2S6hGJw/event-as-bg.jpg",
        rating: 4,
      },
      {
        username: "robo2024",
        avatar: "https://i.ibb.co/nbmvQhm/abstract-blur-wedding-hall.jpg",
        rating: 4,
      },
    ],
    images: [
      "https://i.ibb.co/n8BKWG2/event2.jpg",
      "https://i.ibb.co/2S6hGJw/event-as-bg.jpg",
      "https://i.ibb.co/nbmvQhm/abstract-blur-wedding-hall.jpg",
    ],
    comments: [
      {
        username: "aitechenthusiast",
        avatar: "https://i.ibb.co/2S6hGJw/event-as-bg.jpg",
        date: "2024-08-01",
        commentText:
          "Exciting lineup of speakers! Looking forward to the discussions.",
        likes: 6,
        dislikes: 0,
        replies: [
          {
            username: "robotics_researcher",
            avatar: "https://i.ibb.co/nbmvQhm/abstract-blur-wedding-hall.jpg",
            date: "2024-08-02",
            commentText: "Hope to see advancements in humanoid robotics.",
            likes: 2,
            dislikes: 0,
          },
        ],
      },
    ],
    attendees: [],
  },
]; */

export const categories: string[] = [
  "All",
  "Conferences",
  "Workshops",
  "Concerts",
];

const HomeFeaturedEvents = () => {
  const { isLoading, eventsData, error } = useSelector((store) => store.events);
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
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(
    eventsData?.events || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const filterEvents = () => {
      let result = eventsData.events;

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
