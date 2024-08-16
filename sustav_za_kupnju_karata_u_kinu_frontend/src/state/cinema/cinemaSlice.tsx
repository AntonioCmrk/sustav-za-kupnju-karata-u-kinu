import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cinema } from "../../types";

interface CinemaState {
  selectedCinema: Cinema | null;
}

const initialState: CinemaState = {
  selectedCinema: null,
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    selectCinema: (state, action: PayloadAction<Cinema>) => {
      state.selectedCinema = action.payload;
    },
  },
});

export const { selectCinema } = cinemaSlice.actions;
export default cinemaSlice.reducer;
