// src/api/appointmentServices.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/appointments";

export interface Appointment {
  id: number;
  contact_id: number;
  user_id: number;
  date: string;
  notes: string;
}

export const createAppointment = async (
  appointment: Partial<Appointment>
): Promise<Appointment> => {
  const response = await axios.post<Appointment>(API_BASE_URL, appointment);
  return response.data;
};
