import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "../constants";
export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    // contentType: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // withCredentials: true,
  },
});
