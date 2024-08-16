import axios from "axios";
import { API_URL } from "../constants";

export const getProjectionsByCinemaId = (cinemaId: number) => {
  return axios.get(`${API_URL}/Projection/${cinemaId}/projections`);
};
