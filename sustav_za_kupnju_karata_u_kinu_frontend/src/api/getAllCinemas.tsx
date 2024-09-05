import axios from "axios";
import { API_URL } from "../constants";
export const getAllCinemas = async () => {
  return axios.get(`${API_URL}/Cinema`);
};
