"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MicVocalIcon, PresentationIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";

const EventDetails = ({ params }: { params: { _id: string } }) => {
  const [event, setEvent] = useState({
    title: "Tech Expo 2024",
    description:
      "Join us for the Tech Expo 2024 showcasing the latest in tech innovations and startup pitches.",
    date: "2024-10-20",
    time: "10:00 AM",
    location: "Tech City",
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
    seatsAvailable: 10,
    seatsBooked: 5,
  });

  return (
    <>
      <div className="w-full lg:w-1/2">
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Edit Event : {params?._id}
            </legend>
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="title here ..."
                defaultValue={event?.title}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="describe event here ..."
                className="min-h-[9.5rem]"
                name="description"
                defaultValue={event?.description}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={event?.category}>
                <SelectTrigger
                  id="category"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conferences">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <PresentationIcon className="size-5" />
                      <div className="grid gap-0.5">
                        <p>Conferences</p>
                        <p className="text-xs" data-description>
                          Our fastest model for general use cases.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Workshops">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <SettingsIcon className="size-5" />
                      <div className="grid gap-0.5">
                        <p>Workshops</p>
                        <p className="text-xs" data-description>
                          Performance and speed for efficiency.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Concerts">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MicVocalIcon className="size-5" />
                      <div className="grid gap-0.5">
                        <p>Concerts</p>
                        <p className="text-xs" data-description>
                          The most powerful model for complex computations.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Select defaultValue={event?.location}>
                <SelectTrigger
                  id="location"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech City">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <div className="grid gap-0.5">
                        <p>Tech City</p>
                        <p className="text-xs" data-description>
                          Our fastest model for general use cases.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Art Town">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <div className="grid gap-0.5">
                        <p>Art Town</p>
                        <p className="text-xs" data-description>
                          Performance and speed for efficiency.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Music City">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <div className="grid gap-0.5">
                        <p>Music City</p>
                        <p className="text-xs" data-description>
                          The most powerful model for complex computations.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="ticketPrice">Ticket Price</Label>
              <Input
                className="hide-spinner"
                id="ticketPrice"
                type="number"
                name="ticketPrice"
                placeholder="0"
                defaultValue={event?.ticketPrice}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="seats">Available seats</Label>
              <Input
                className="hide-spinner"
                id="seats"
                type="number"
                name="seats"
                placeholder="0"
                defaultValue={event?.seatsAvailable}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  defaultValue={event?.date}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="time">time</Label>
                <Input
                  id="time"
                  type="time"
                  name="time"
                  defaultValue={event?.time}
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Button type="submit" size="sm" className="w-full">
                Confirm Edit
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default EventDetails;
