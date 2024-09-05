import axios from "axios";
import { API_URL } from "../constants";

export const getAuditoriumsByCinemaId = async (cinemaId: number) => {
  const response = await axios.get(`${API_URL}/Auditorium/cinema/${cinemaId}`);
  return response.data;
};
