import axios from "axios";
import { CreateProjectionRequestDto } from "../types";
import { API_URL } from "../constants";

export const createProjection = async (
  projectionData: CreateProjectionRequestDto
) => {
  return axios.post(`${API_URL}/projection`, projectionData);
};
