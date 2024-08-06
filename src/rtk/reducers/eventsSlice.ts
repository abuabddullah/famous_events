import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event, fetchEventsAction, FetchEventsResponse } from "./eventsAction";

interface InitEventState {
  eventsData: Event[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InitEventState = {
  eventsData: [],
  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearEventsErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEventsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchEventsAction.fulfilled,
      (state, action: PayloadAction<FetchEventsResponse>) => {
        state.isLoading = false;
        state.eventsData = action.payload.events || [];
        state.error = null;
      }
    );
    builder.addCase(fetchEventsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.eventsData = [];
      state.error = action.error.message || "Failed to fetch events";
    });
  },
});

export const { clearEventsErrors } = eventsSlice.actions;
export default eventsSlice.reducer;
