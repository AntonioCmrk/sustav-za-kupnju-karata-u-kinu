import axios from "axios";
import { API_URL } from "../constants";
export const getAllCinemas = () => {
  return axios.post(`${API_URL}/Account/login`, {
    username: "username",
    password: "password",
  });
};
