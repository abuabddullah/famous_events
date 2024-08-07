import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleEventAction } from "./singleEventAction";

const initialState = {
  event: {},
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearSingleEventErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleEventAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleEventAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.event = action.payload.event || {};
      state.error = null;
    });
    builder.addCase(fetchSingleEventAction.rejected, (state, action) => {
      state.isLoading = false;
      state.event = {};
      state.error = action.error.message || "Failed to fetch event";
    });
  },
});

export const { clearSingleEventErrors } = eventSlice.actions;
export default eventSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {
//   fetchSingleEventAction,
//   FetchSingleEventResposType,
// } from "./singleEventAction";

// interface EventState {
//   event: any | null;
//   isLoading: boolean;
//   error: string | null;
// }
// const initialState: EventState = {
//   event: {},
//   isLoading: false,
//   error: null,
// };

// const eventSlice = createSlice({
//   name: "event",
//   initialState,
//   reducers: {
//     clearSingleEventErrors: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchSingleEventAction.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(
//       fetchSingleEventAction.fulfilled,
//       (state, action: PayloadAction<FetchSingleEventResposType>) => {
//         state.isLoading = false;
//         state.event = action.payload.event || {};
//         state.error = null;
//       }
//     );
//     builder.addCase(fetchSingleEventAction.rejected, (state, action) => {
//       state.isLoading = false;
//       state.event = {};
//       state.error = action.error.message || "Failed to fetch event";
//     });
//   },
// });

// export const { clearSingleEventErrors } = eventSlice.actions;
// export default eventSlice.reducer;
