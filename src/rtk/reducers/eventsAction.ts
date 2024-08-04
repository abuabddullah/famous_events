import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEventsAction = createAsyncThunk(
  "events/fetchEventsAction",
  async () => {
    const { data } = await axios.get("/api/events/all-events");
    return data;
  }
);
