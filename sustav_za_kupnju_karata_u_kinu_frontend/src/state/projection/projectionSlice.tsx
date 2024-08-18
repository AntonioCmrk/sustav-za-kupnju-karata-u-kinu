import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Projection } from "../../types";

interface ProjectionState {
  selectedProjection: Projection | null;
  projectionId: number | null;
}

const initialState: ProjectionState = {
  selectedProjection: null,
  projectionId: null,
};

const ProjectionSlice = createSlice({
  name: "projection",
  initialState,
  reducers: {
    selectProjection: (state, action: PayloadAction<Projection>) => {
      state.selectedProjection = action.payload;
    },
    setProjectionId: (state, action: PayloadAction<number>) => {
      state.projectionId = action.payload;
    },
  },
});

export const { selectProjection, setProjectionId } = ProjectionSlice.actions;
export default ProjectionSlice.reducer;
