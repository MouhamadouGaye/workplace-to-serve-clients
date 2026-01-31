import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/deals"; // Update with your backend URL if deployed

export interface Deal {
  id: number;
  customer_id: number;
  user_id: number;
  title: string;
  amount: number;
  status: string;
  stage: string;
  expected_close_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    contact_id: number;
    deal_id: number | null; // Optional linkage to a deal
  }

export interface Contact {
id: number;
name: string;
email: string;
}


// Fetch all deals
export const fetchDeals = async (): Promise<Deal[]> => {
  const response = await axios.get<Deal[]>(API_BASE_URL);
  return response.data;
};

// Fetch a single deal by ID
export const fetchDealById = async (id: number): Promise<Deal> => {
  const response = await axios.get<Deal>(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Create a new deal
export const createDeal = async (deal: Partial<Deal>): Promise<Deal> => {
  const response = await axios.post<Deal>(API_BASE_URL, deal);
  return response.data;
};

// Update an existing deal
export const updateDeal = async (
  id: number,
  deal: Partial<Deal>
): Promise<Deal> => {
  const response = await axios.put<Deal>(`${API_BASE_URL}/${id}`, deal);
  return response.data;
};

// Delete a deal
export const deleteDeal = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};


// Create a new appointment
export const createAppointment = async (
  appointment: Partial<Appointment>
): Promise<Appointment> => {
  const response = await axios.post<Appointment>(
    `${API_BASE_URL}/appointments`,
    appointment
  );
  return response.data;
};

// Send an email
export const sendEmail = async (
  recipient: string,
  subject: string,
  message: string
): Promise<void> => {
  await axios.post(`${API_BASE_URL}/email/send`, {
    recipient,
    subject,
    message,
  });
};

