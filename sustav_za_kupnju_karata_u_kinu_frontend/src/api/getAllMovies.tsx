import axios from "axios";
import { API_URL } from "../constants";

export const getAllMovies = async () => {
  const response = await axios.get(`${API_URL}/movie`);
  return response.data;
};
