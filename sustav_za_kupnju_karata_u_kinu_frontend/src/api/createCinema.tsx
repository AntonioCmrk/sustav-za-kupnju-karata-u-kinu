import axios from "axios";
import { API_URL } from "../constants";
import { CreateCinemaRequestDto } from "../types";

export const createCinema = (cinema: CreateCinemaRequestDto) => {
  return axios.post(`${API_URL}/cinema`, cinema);
};
