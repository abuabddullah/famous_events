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
import eventSchema from "@/schemas/eventSchema";
import { ApiResponseType } from "@/types/ApiResponseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { format, isBefore, startOfToday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const AddEvents = () => {
  const { toast } = useToast();
  const router = useRouter();
  // zod validation and form handling
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      images: [
        "https://i.ibb.co/n8BKWG2/event2.jpg",
        "https://i.ibb.co/2S6hGJw/event-as-bg.jpg",
        "https://i.ibb.co/nbmvQhm/abstract-blur-wedding-hall.jpg",
      ],
    },
  });

  const onSubmit = async (data: z.infer<typeof eventSchema>) => {
    console.log("data", data);

    try {
      // for submitting form with data
      const response = await axios.post<ApiResponseType>(
        "/api/events/post-event",
        data
      );

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace(`/dashboard/allEvents`);
    } catch (error) {
      // if any error submitting form
      console.error("Error during posting event:", error);

      const axiosError = error as AxiosError<ApiResponseType>; // ??? returns axiosError-object= {res,req,message}

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your posting event. Please try again."); // ???

      toast({
        title: "Post Event Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
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
                        placeholder="title here ..."
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
                        placeholder="describe event here ..."
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
                        defaultValue={0}
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
                        defaultValue={0}
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

              {/* <div className="grid gap-3">
                <FormField
                  name="date"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <Input
                        type="date"
                        {...field}
                        name="date"
                        // defaultValue={}
                      />

                      <FormDescription className="text-xs">
                        picked date must be of future.
                      </FormDescription>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div> */}

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

export default AddEvents;
