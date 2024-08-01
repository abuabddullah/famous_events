import { Event } from "@/model/Event.model";
import { useEffect, useState } from "react";

export const eventsData: Event[] = [
  {
    title: "Innovators 2024",
    description:
      "Join us for the Tech Innovators Conference 2024, a premier event featuring keynote speakers from leading tech companies, panel discussions on emerging technologies, and networking opportunities with industry leaders.",
    date: "2024-09-15",
    time: "09:00 AM",
    location: "Tech City Convention Center, 123 Innovation Drive, Tech City",
    category: "Conferences",
    ticketPrice: 299.0,
    ratings: [
      {
        username: "JaneDoe42",
        avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
        rating: 4.7,
      },
    ],
    images: [
      "/assets/event as bg.jpg",
      "/assets/event2.jpg",
      "/assets/abstract-blur-wedding-hall.jpg",
    ],
    comments: [
      {
        username: "JaneDoe42",
        date: "2024-08-01",
        commentText:
          "Amazing lineup of speakers and very well-organized event!",
        likes: 12,
        dislikes: 1,
      },
      {
        username: "TechieJoe",
        date: "2024-08-02",
        commentText:
          "Looking forward to the sessions on AI and blockchain. Hope the venue is as good as last year!",
        likes: 8,
        dislikes: 0,
      },
    ],
    visitors: [],
  },
  {
    title: "Tech Innovators Conference 2024",
    description:
      "Join us for the Tech Innovators Conference 2024, a premier event featuring keynote speakers from leading tech companies, panel discussions on emerging technologies, and networking opportunities with industry leaders.",
    date: "2024-09-15",
    time: "09:00 AM",
    location: "Tech City Convention Center, 123 Innovation Drive, Tech City",
    category: "Conferences",
    ticketPrice: 299.0,

    ratings: [
      {
        username: "Doe42",
        avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
        rating: 4.7,
      },
    ],
    images: [
      "/assets/event as bg.jpg",
      "/assets/event2.jpg",
      "/assets/abstract-blur-wedding-hall.jpg",
    ],
    comments: [
      {
        username: "JaneDoe42",
        date: "2024-08-01",
        commentText:
          "Amazing lineup of speakers and very well-organized event!",
        likes: 12,
        dislikes: 1,
      },
      {
        username: "TechieJoe",
        date: "2024-08-02",
        commentText:
          "Looking forward to the sessions on AI and blockchain. Hope the venue is as good as last year!",
        likes: 8,
        dislikes: 0,
      },
    ],
    visitors: [],
  },
  {
    title: "Art & Creativity Workshop",
    description:
      "A hands-on workshop aimed at artists of all levels. Explore new techniques in painting, sculpture, and digital art. All materials are provided, and participants will have the opportunity to showcase their work in a final exhibit.",
    date: "2024-10-05",
    time: "10:00 AM",
    location: "Creative Arts Studio, 456 Art Lane, Art Town",
    category: "Workshops",
    ticketPrice: 150.0,

    ratings: [
      {
        username: "JaneDoe42",
        avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
        rating: 4.7,
      },
    ],
    images: [
      "/assets/event2.jpg",
      "/assets/abstract-blur-wedding-hall.jpg",
      "/assets/event as bg.jpg",
    ],
    comments: [
      {
        username: "ArtLover88",
        date: "2024-07-30",
        commentText:
          "Fantastic workshop with great instructors! Learned so much!",
        likes: 20,
        dislikes: 0,
      },
      {
        username: "CreativeSoul",
        date: "2024-08-03",
        commentText:
          "Excited for this event. Hope there’s a focus on digital art as well.",
        likes: 5,
        dislikes: 2,
      },
    ],
    visitors: [],
  },
  {
    title: "Creativity Workshop",
    description:
      "A hands-on workshop aimed at artists of all levels. Explore new techniques in painting, sculpture, and digital art. All materials are provided, and participants will have the opportunity to showcase their work in a final exhibit.",
    date: "2024-10-05",
    time: "10:00 AM",
    location: "Creative Arts Studio, 456 Art Lane, Art Town",
    category: "Workshops",
    ticketPrice: 150.0,

    ratings: [
      {
        username: "JaneDoe42",
        avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
        rating: 4.7,
      },
    ],
    images: [
      "/assets/event2.jpg",
      "/assets/abstract-blur-wedding-hall.jpg",
      "/assets/event as bg.jpg",
    ],
    comments: [
      {
        username: "ArtLover88",
        date: "2024-07-30",
        commentText:
          "Fantastic workshop with great instructors! Learned so much!",
        likes: 20,
        dislikes: 0,
      },
      {
        username: "CreativeSoul",
        date: "2024-08-03",
        commentText:
          "Excited for this event. Hope there’s a focus on digital art as well.",
        likes: 5,
        dislikes: 2,
      },
    ],
    visitors: [],
  },
  {
    title: "Summer Jazz",
    description:
      "Enjoy a day of smooth jazz with performances from renowned artists, food stalls, and a lively atmosphere. Perfect for jazz enthusiasts and casual listeners alike.",
    date: "2024-08-20",
    time: "12:00 PM",
    location: "Central Park, 789 Festival Road, Music City",
    category: "Concerts",
    ticketPrice: 75.0,

    ratings: [
      {
        username: "JaneDoe42",
        avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
        rating: 4.7,
      },
    ],
    images: [
      "/assets/abstract-blur-wedding-hall.jpg",
      "/assets/event2.jpg",
      "/assets/event as bg.jpg",
    ],
    comments: [
      {
        username: "JazzFan123",
        date: "2024-07-29",
        commentText:
          "Great lineup this year! Can’t wait to see my favorite bands live.",
        likes: 15,
        dislikes: 1,
      },
      {
        username: "MusicLover",
        date: "2024-08-01",
        commentText: "Awesome event last year. Hope this year is even better!",
        likes: 10,
        dislikes: 0,
      },
    ],
    visitors: [],
  },
  {
    title: "Summer Jazz Festival",
    description:
      "Enjoy a day of smooth jazz with performances from renowned artists, food stalls, and a lively atmosphere. Perfect for jazz enthusiasts and casual listeners alike.",
    date: "2024-08-20",
    time: "12:00 PM",
    location: "Central Park, 789 Festival Road, Music City",
    category: "Concerts",
    ticketPrice: 75.0,

    ratings: [
      {
        username: "JaneDoe42",
        avatar: "https://i.ibb.co/bNj02BN/proavatar.png",
        rating: 4.7,
      },
    ],
    images: [
      "/assets/abstract-blur-wedding-hall.jpg",
      "/assets/event2.jpg",
      "/assets/event as bg.jpg",
    ],
    comments: [
      {
        username: "JazzFan123",
        date: "2024-07-29",
        commentText:
          "Great lineup this year! Can’t wait to see my favorite bands live.",
        likes: 15,
        dislikes: 1,
      },
      {
        username: "MusicLover",
        date: "2024-08-01",
        commentText: "Awesome event last year. Hope this year is even better!",
        likes: 10,
        dislikes: 0,
      },
    ],
    visitors: [],
  },
];

export const categories: string[] = [
  "All",
  "Conferences",
  "Workshops",
  "Concerts",
];

const HomeFeaturedEvents = () => {
  const [events, setEvents] = useState<Event[]>(eventsData);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const filterEvents = () => {
      let result = events;

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
  }, [searchQuery, selectedCategory, events]);

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
          {filteredEvents.length > 0 ? (
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
