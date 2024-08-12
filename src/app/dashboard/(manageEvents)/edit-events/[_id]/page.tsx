"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Event } from "@/rtk/reducers/eventsAction";
import eventSchema from "@/schemas/eventSchema";
import { ApiResponseType } from "@/types/ApiResponseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { format, isBefore, startOfToday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EventDetails = ({ params }: { params: { _id: string } }) => {
  const { toast } = useToast();
  const router = useRouter();
  // zod validation and form handling
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  });

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // format date from "2024-10-20T00:00:00.000Z" to
  const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const defaultDateValue = formatDate(event?.date);

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

  const onSubmit = async (data: z.infer<typeof eventSchema>) => {
    console.log("data", data);

    try {
      // for submitting form with data
      const response = await axios.put<ApiResponseType>(
        `/api/events/event/${params?._id}`,
        data
      );

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace(`/dashboard/allEvents`);
    } catch (error) {
      // if any error submitting form
      console.error("Error during editing event:", error);

      const axiosError = error as AxiosError<ApiResponseType>; // ??? returns axiosError-object= {res,req,message}

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your editing event. Please try again."); // ???

      toast({
        title: "edit Event Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="w-full lg:w-2/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-start gap-6"
          >
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Add Events
              </legend>
              <div className="grid gap-3">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <Input
                        type="text"
                        {...field}
                        name="title"
                        defaultValue={event?.title}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        {...field}
                        name="description"
                        defaultValue={event?.description}
                        className="min-h-[9.5rem]"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>location</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        // defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Music City">Music City</SelectItem>
                          <SelectItem value="Art Town">Art Town</SelectItem>
                          <SelectItem value="Tech City">Tech City</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs">
                        You can manage localtion in{" "}
                        <Link className="underline" href="/dashboard/allEvents">
                          All Events
                        </Link>{" "}
                        section.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        // defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Concerts">Concerts</SelectItem>
                          <SelectItem value="Workshops">Workshops</SelectItem>
                          <SelectItem value="Conferences">
                            Conferences
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs">
                        You can manage category in{" "}
                        <Link className="underline" href="/dashboard/allEvents">
                          All Events
                        </Link>{" "}
                        section.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  name="ticketPrice"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ticketPrice</FormLabel>
                      <Input
                        type="number"
                        className="hide-spinner"
                        {...field}
                        name="ticketPrice"
                        defaultValue={event?.ticketPrice}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <FormField
                  name="seatsAvailable"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available seats</FormLabel>
                      <Input
                        type="number"
                        className="hide-spinner"
                        {...field}
                        name="seatsAvailable"
                        defaultValue={event?.seatsAvailable}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event&apos;s Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            // selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => isBefore(date, startOfToday())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="text-xs">
                        picked date calculates Remaining times.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <FormField
                  name="time"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Input
                        type="time"
                        {...field}
                        name="time"
                        // defaultValue={}
                      />

                      <FormDescription className="text-xs">
                        picked time must be of future.
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>
            <Button type="submit" className="w-full">
              Add Event
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EventDetails;
