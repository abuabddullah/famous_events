import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleEventAction = createAsyncThunk(
  "event/fetchSingleEventAction",
  async (id) => {
    const { response } = await axios.get(`/api/events/event/${id}`);
    return response.data;
  }
);

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Event } from "./eventsAction";

// export interface FetchSingleEventResposType {
//   event?: Event;
//   success: boolean;
//   message?: string | null;
// }

// export const fetchEventById = createAsyncThunk<FetchSingleEventResposType>(
//   "event/fetchEventById",
//   async (id) => {
//     const response = await axios.get(`/api/events/event/${id}`);
//     return response.data as FetchSingleEventResposType;
//   }
// );
