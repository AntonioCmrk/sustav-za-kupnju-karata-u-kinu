import axios from "axios";
import { API_URL } from "../constants";

export const getSeatReservations = (projectionId: number) => {
  return axios.get(`${API_URL}/Projection/reservations/${projectionId}`);
};
