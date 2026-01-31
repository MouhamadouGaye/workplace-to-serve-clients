// src/api/emailServices.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/emails";

export const sendEmail = async (email: {
  to: string;
  subject: string;
  body: string;
}): Promise<void> => {
  await axios.post(`${API_BASE_URL}`, email);
};
