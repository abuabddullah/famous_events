import { createSlice } from "@reduxjs/toolkit";
import { fetchEventsAction } from "./eventsAction";

interface InitEventState {
  eventsData: Event[];
  isLoading: boolean;
  error: any;
}

const eventsSlice = createSlice({
  name: "events",
  initialState: <InitEventState>{
    eventsData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearEventsErrors: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEventsAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEventsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.eventsData = action.payload;
      state.error = null;
    });
    builder.addCase(fetchEventsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.eventsData = [];
      state.error = action.error.message;
    });
  },
});

export const { clearEventsErrors } = eventsSlice.actions;
export default eventsSlice.reducer;
