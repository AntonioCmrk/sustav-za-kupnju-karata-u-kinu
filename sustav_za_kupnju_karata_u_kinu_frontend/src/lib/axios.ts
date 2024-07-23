import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const axios = Axios.create({
  baseURL: "",
  headers: {
    // contentType: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // withCredentials: true,
  },
});
