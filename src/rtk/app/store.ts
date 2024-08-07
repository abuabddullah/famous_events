import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./../reducers/eventsSlice";
import usersReducer from "./../reducers/usersSlice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
    users: usersReducer,
    // event: eventReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
