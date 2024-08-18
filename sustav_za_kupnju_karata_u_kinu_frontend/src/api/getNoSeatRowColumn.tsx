import axios from "axios";
import { API_URL } from "../constants";

export const getNoSeatRowColumn = (auditoriumId: number) => {
  return axios.get(`${API_URL}/Auditorium/noSeatsColumns/${auditoriumId}`);
};
