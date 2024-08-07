"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AngryIcon, ArrowBigDownIcon, Clock, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Event } from "@/rtk/reducers/eventsAction";
import axios from "axios";

const EventDetails = ({ params }: { params: { _id: string } }) => {
  console.log(params._id);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/event/${params?._id}`);
        setEvent(response.data.event);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params?._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-slate-700 text-white">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Checkout our Event in Depth ...
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            EventID: {params?._id}
          </p>
        </div>

        {/* Carousel for Messages starts */}
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]} // plugins from embla-autoplay
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {event?.images?.map((img, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{event?.title}</CardTitle>
                  </CardHeader>
                  <Image
                    src={img}
                    alt={`Event image`}
                    width={500} // Set appropriate width
                    height={300} // Set appropriate height
                    className="w-full h-auto object-cover rounded-md mb-4"
                  />
                  <CardContent className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                    <Clock className="flex-shrink-0" />
                    <div>
                      <p>{event?.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {event?.time}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Carousel for Messages starts */}

        {/* card starts */}
        <div className="p-6 max-w-4xl mx-auto">
          <div className="border border-gray-300 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{event?.title}</h2>
            <p className="text-gray-300 mb-2">{event?.description}</p>
            <p className="text-gray-400 mb-2">
              <strong>Date:</strong> {event?.date}
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Time:</strong> {event?.time}
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Location:</strong> {event?.location}
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Price:</strong> {event?.ticketPrice}
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Rating:</strong> {event?.ratings[0]?.rating || 0} / 5
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Category:</strong> {event?.category}{" "}
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Ticket Price:</strong> {event?.ticketPrice}
            </p>
            <Button>Register Event </Button>
          </div>
        </div>

        {/* card ends */}

        <div className="w-full my-8">
          <div className="grid w-full gap-2">
            <Textarea
              className="text-black"
              placeholder="Type your comment here."
            />
            <Button>Comment Now</Button>
          </div>
        </div>
        <small className="border p-4 rounded-sm">
          <strong className="flex items-center gap-2">
            Check commnets <ArrowBigDownIcon />
          </strong>
        </small>
        <div className="w-full my-8">
          {event?.comments?.map((cmnt, index) => (
            <>
              <div>
                <Card className="mb-2">
                  <CardHeader>
                    <CardTitle>{cmnt?.username}</CardTitle>
                    <CardDescription>{cmnt?.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{cmnt?.commentText}</p>
                  </CardContent>
                  <CardFooter>
                    <p className="flex gap-2 me-8">
                      <HeartIcon className="text-red-700 cursor-pointer" />
                      {cmnt?.likes}
                    </p>
                    <p className="flex gap-2 me-8">
                      <AngryIcon className="text-slate-700 cursor-pointer" />
                      {cmnt?.dislikes}
                    </p>
                  </CardFooter>
                </Card>
                <>
                  {cmnt?.replies.length &&
                    cmnt?.replies?.map((reply: any, index: number) => (
                      <>
                        <Card className="mb-2 ms-10">
                          <CardHeader>
                            <CardTitle>{reply?.username}</CardTitle>
                            <CardDescription>{reply?.date}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>{reply?.commentText}</p>
                          </CardContent>
                          <CardFooter>
                            <p className="flex gap-2 me-8">
                              <HeartIcon className="text-red-700 cursor-pointer" />
                              {reply?.likes}
                            </p>
                            <p className="flex gap-2 me-8">
                              <AngryIcon className="text-slate-700 cursor-pointer" />
                              {reply?.dislikes}
                            </p>
                          </CardFooter>
                        </Card>
                      </>
                    ))}
                </>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default EventDetails;
