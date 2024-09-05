import axios from "axios";
import { CreateMovieRequestDto } from "../types";
import { API_URL } from "../constants";

export const createMovie = async (movieData: CreateMovieRequestDto) => {
  return axios.post(`${API_URL}/Movie`, movieData);
};
