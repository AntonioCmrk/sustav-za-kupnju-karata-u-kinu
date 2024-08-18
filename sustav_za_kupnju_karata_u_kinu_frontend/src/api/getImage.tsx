import axios from "axios";
import { API_URL } from "../constants";
export const getAllCinemas = (imageName: string) => {
  return axios.get(`${API_URL}/Image/${imageName}`);
};
