import axios from "axios";
import { API_URL } from "../constants";
export const deleteProjectionReservation = (projectionReservationId: any) => {
  return axios.delete(
    `${API_URL}/ProjectionReservation/${projectionReservationId}`
  );
};
