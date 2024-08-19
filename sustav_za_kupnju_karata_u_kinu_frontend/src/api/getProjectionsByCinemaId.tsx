import axios from "axios";
import { API_URL } from "../constants";
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};
export const getProjectionsByCinemaId = (cinemaId: number) => {
  return axios.get(`${API_URL}/Projection/${cinemaId}/projections`, config);
};
