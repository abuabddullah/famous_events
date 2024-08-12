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

import React5Star from "@/components/eventDetails/React5Star/React5Star";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ApiResponseType } from "@/types/ApiResponseTypes";
import axios, { AxiosError } from "axios";
import { AngryIcon, ArrowBigDownIcon, Clock, HeartIcon } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const EventDetails = ({ params }: { params: { _id: string } }) => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = async (id: string) => {
    try {
      const response = await axios.get(`/api/events/event/${id}`);
      setEvent(response.data.event);
    } catch (error) {
      console.error("Error fetching event:", error);
      setError("Failed to fetch event details.");
    } finally {
      setLoading(false);
    }
  };

  const { data: session } = useSession();
  const user: User = session?.user as User;
  const initRating =
    event?.ratings?.find((rating: any) => rating.username == user?.username) ||
    event?.avgRating;
  const [rating, setRating] = useState<number | undefined>(
    initRating || event?.avgRating
  );

  const handleRatingClick = async (rtg: number) => {
    setRating(rtg);
    const data = {
      username: user?.username,
      avatar: user?.avatar,
      rating: rtg,
    };
    console.log(data);
    try {
      // for submitting form with data
      const response = await axios.patch<ApiResponseType>(
        `/api/events/event/${params?._id}`,
        data
      );

      toast({
        title: "Success",
        description: response.data.message,
      });

      fetchEvent(params?._id);
    } catch (error) {
      // if any error submitting form
      console.error("Error during editing event:", error);

      const axiosError = error as AxiosError<ApiResponseType>; // ??? returns axiosError-object= {res,req,message}

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your rating event. Please try again."); // ???

      toast({
        title: "rating Event Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEvent(params?._id);
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
            {event?.images?.map((img: string, index: number) => (
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
              <strong>Rating:</strong> {Math.floor(event?.avgRating) || 0} / 5
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Category:</strong> {event?.category}{" "}
            </p>
            <p className="text-gray-400 mb-2">
              <strong>Ticket Price:</strong> {event?.ticketPrice}
            </p>
            <div className="md:flex justify-around items-end my-4">
              <Button>Register Event </Button>
              <div className="mt-4 md:mt-0">
                <h2 className="mb-2">Give rating :</h2>
                <React5Star
                  rating={rating || event?.avgRating}
                  handleRatingClick={handleRatingClick}
                  ratingCardStyle={
                    "flex gap-2 items-center p-4 rounded-lg text-slate-600 bg-slate-100"
                  }
                  ratingStyleOnSelect={"text-orange-400"}
                  isDisabled={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* card ends */}

        <Carousel
          plugins={[Autoplay({ delay: 3000 })]} // plugins from embla-autoplay
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {event?.ratings?.map((rating: any, index: number) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <Avatar>
                      <AvatarImage src={rating?.avatar} alt="@shadcn" />
                      <AvatarFallback>{rating?.username}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{rating?.username}</CardTitle>
                  </CardHeader>
                  <CardContent className=" flex justify-center items-center">
                    <React5Star
                      rating={rating?.rating}
                      handleRatingClick={() => {}}
                      isDisabled={true}
                      ratingCardStyle="flex gap-2 items-center p-4 rounded-lg text-slate-600 bg-slate-100"
                      ratingStyleOnSelect="text-orange-400"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

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
          {event?.comments?.map((cmnt: any) => (
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
                    cmnt?.replies?.map((reply: any) => (
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
