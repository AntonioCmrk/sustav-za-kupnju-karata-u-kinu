import axios from "axios";
import { API_URL } from "../constants";

export const reserveSeats = async ({
  projectionId,
  seatIds,
}: {
  projectionId: number;
  seatIds: number[];
}) => {
  const response = await axios.post(`${API_URL}/reservations/reserve`, {
    projectionId,
    seatIds,
  });
  return response.data;
};
