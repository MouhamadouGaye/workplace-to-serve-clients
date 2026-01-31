// services/eventService.ts

import axios from "axios";

export interface Event {
  id: number;
  user_id: number;
  contact_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
  reminder_time: string;
  status: string;
}

const API_BASE_URL = "http://localhost:3001/api/events"; // Adjust the URL if needed

// Fetch events for a specific user
export const fetchEvents = async (userId: number): Promise<Event[]> => {
  const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
  return response.data;
};

// Create an event
export const createEvent = async (event: Omit<Event, "id">): Promise<Event> => {
  const response = await axios.post(API_BASE_URL, event);
  return response.data;
};

// Update an event
export const updateEvent = async (id: number, event: Event): Promise<Event> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, event);
  return response.data;
};

// Delete an event
export const deleteEvent = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
