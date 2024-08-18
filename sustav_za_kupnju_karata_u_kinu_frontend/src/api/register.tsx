import axios from "axios";
import { API_URL } from "../constants";
export const register = (email: string, username: string, password: string) => {
  return axios.post(`${API_URL}/Account/register`, {
    email: email,
    username: username,
    password: password,
  });
};
