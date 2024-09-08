import axios from "axios";
import { API_URL } from "../constants";

export const uploadImage = async (formData: FormData) => {
  return await axios.post(`${API_URL}/Image/Upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
