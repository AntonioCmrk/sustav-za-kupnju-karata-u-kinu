import axios from "axios";
import { API_URL } from "../constants";

export const getProjectionsByCinemaId = (cinemaId: string) => {
  return axios.get(`${API_URL}/Projection/${cinemaId}/projections`);
};
