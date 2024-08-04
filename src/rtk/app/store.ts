import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./../reducers/eventsSlice";
import usersReducer from "./../reducers/usersSlice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
    users: usersReducer,
  },
});

export default store;
