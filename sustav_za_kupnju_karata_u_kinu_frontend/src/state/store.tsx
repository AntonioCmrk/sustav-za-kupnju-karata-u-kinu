import { Action, configureStore, Store, ThunkAction } from "@reduxjs/toolkit";
import cinemaReducer from "./cinema/cinemaSlice";
import projectionReducer from "./projection/projectionSlice";
import authReducer from "./auth/authSlice";
import reservationReducer from "./reservation/reservationSlice";

export const store: Store = configureStore({
  reducer: {
    cinema: cinemaReducer,
    projection: projectionReducer,
    auth: authReducer,
    reservation: reservationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
