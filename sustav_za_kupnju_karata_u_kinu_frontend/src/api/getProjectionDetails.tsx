import axios from "axios";
import { API_URL } from "../constants";

export const getProjectionDetailsByProjectionId = (projectionId: number) => {
  return axios.get(`${API_URL}/Projection/${projectionId}/details`);
};
