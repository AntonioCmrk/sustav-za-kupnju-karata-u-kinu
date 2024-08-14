import axios from "axios";
import { API_URL } from "../constants";
export const getAllCinemas = () => {
  return axios.post(`${API_URL}/Account/register`, {
    email: "email",
    username: "username",
    password: "password",
  });
};
