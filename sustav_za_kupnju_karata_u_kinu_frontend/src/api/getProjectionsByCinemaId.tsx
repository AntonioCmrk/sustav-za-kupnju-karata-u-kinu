import axios from "axios";
import { API_URL } from "../constants";
import { config } from "../lib/axios";

export const getProjectionsByCinemaId = (cinemaId: number) => {
  return axios.get(`${API_URL}/Projection/${cinemaId}/projections`, config);
};
