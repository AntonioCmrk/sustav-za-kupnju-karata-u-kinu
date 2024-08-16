import { configureStore, Store } from "@reduxjs/toolkit";
import cinemaReducer from "./cinema/cinemaSlice";
import projectionReducer from "./projection/projectionSlice";

export const store: Store = configureStore({
  reducer: {
    cinema: cinemaReducer,
    projection: projectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
