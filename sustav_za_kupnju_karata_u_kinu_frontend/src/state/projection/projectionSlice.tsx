import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Projection } from "../../types";

interface ProjectionState {
  selectedProjection: Projection | null;
}

const initialState: ProjectionState = {
  selectedProjection: null,
};

const ProjectionSlice = createSlice({
  name: "projection",
  initialState,
  reducers: {
    selectProjection: (state, action: PayloadAction<Projection>) => {
      state.selectedProjection = action.payload;
    },
  },
});

export const { selectProjection } = ProjectionSlice.actions;
export default ProjectionSlice.reducer;
