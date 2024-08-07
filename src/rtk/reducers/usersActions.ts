import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  _id?: string | any;
  username: string;
  avatar: string;
  role: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  bookedEvents: any[];
}

export interface FetchUsersResponse {
  success?: boolean;
  users?: User[];
  message?: string;
}

export const fetchUsersAction = createAsyncThunk<FetchUsersResponse>(
  "users/fetchUsersAction",
  async () => {
    const response = await axios.get("/api/users/all-users");
    return response.data as FetchUsersResponse;
  }
);
