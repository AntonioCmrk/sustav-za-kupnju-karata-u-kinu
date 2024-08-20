import axios from "axios";
import { API_URL } from "../constants";
import { config } from "../lib/axios";

export const reserveSeats = async ({
  projectionId,
  seatIds,
}: {
  projectionId: number;
  seatIds: number[];
}) => {
  const response = await axios.post(
    `${API_URL}/Projection/reserve`,
    {
      projectionId,
      seatIds,
    },
    config
  );
  return response.data;
};
