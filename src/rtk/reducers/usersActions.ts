import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsersAction = createAsyncThunk(
  "users/fetchUsersAction",
  async () => {
    const { data } = await axios.get("/api/users/all-users");
    console.log(data);
    return data;
  }
);
