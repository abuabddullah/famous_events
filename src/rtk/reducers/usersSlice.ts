import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersAction } from "./usersActions";

interface InitUserState {
  usersData: any[];
  isLoading: boolean;
  error: any;
}

const usersSlice = createSlice({
  name: "users",
  initialState: <InitUserState>{
    usersData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearUsersErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersData = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.isLoading = false;
      state.usersData = [];
      state.error = action.error.message;
    });
  },
});

export const { clearUsersErrors } = usersSlice.actions;
export default usersSlice.reducer;
