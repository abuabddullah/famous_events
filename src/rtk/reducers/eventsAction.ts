import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Event {
  _id: any;
  title: string;
  description: string;
  date: any;
  time: any;
  location: string;
  category: string;
  ticketPrice: number;
  avgRating: number;
  ratings: any[];
  images: string[];
  comments: any[];
  attendees: any[];
  seatsAvailable: number;
  seatsBooked: number;
}

export interface FetchEventsResponse {
  success?: boolean;
  events?: Event[];
  message?: string;
}

export const fetchEventsAction = createAsyncThunk<FetchEventsResponse>(
  "events/fetchEventsAction",
  async () => {
    const response = await axios.get("/api/events/all-events");
    return response.data as FetchEventsResponse;
  }
);
