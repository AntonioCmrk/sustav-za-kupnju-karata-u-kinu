import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Seat {
  row: number;
  column: number;
}

interface ReservationState {
  userName: string;
  movieName: string;
  cinemaName: string;
  auditoriumName: string;
  seats: Seat[];
  projectionDateTime: number;
}

const initialState: ReservationState = {
  userName: "",
  movieName: "",
  cinemaName: "",
  auditoriumName: "",
  seats: [],
  projectionDateTime: 0,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservationDetails: (state, action: PayloadAction<ReservationState>) => {
      state.userName = action.payload.userName;
      state.movieName = action.payload.movieName;
      state.cinemaName = action.payload.cinemaName;
      state.auditoriumName = action.payload.auditoriumName;
      state.seats = action.payload.seats;
      state.projectionDateTime = action.payload.projectionDateTime;
    },
    clearReservationDetails: (state) => {
      state.userName = "";
      state.movieName = "";
      state.cinemaName = "";
      state.auditoriumName = "";
      state.seats = [];
      state.projectionDateTime = 0;
    },
  },
});

export const { setReservationDetails, clearReservationDetails } =
  reservationSlice.actions;
export default reservationSlice.reducer;
