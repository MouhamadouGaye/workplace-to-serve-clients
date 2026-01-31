const API_URL = "http://localhost:3001/api"; // Change this to your Express backend URL

export interface Interaction {
  id: number;
  customer_id: number;
  user_id: number;
  type: string;
  notes: string;
  created_at: string;
}

// export const fetchInteractions = async (
//   customerId: number
// ): Promise<Interaction[]> => {
//   const response = await fetch(
//     `${API_URL}/interactions/customer/${customerId}`
//   );
//   console.log("Error fetching: ", response.json());
//   return response.json();
// };

export const fetchInteractions = async (
  customerId: number
): Promise<Interaction[]> => {
  const response = await fetch(
    `${API_URL}/interactions/customer/${customerId}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch interactions: ${response.statusText}`);
  }
  return response.json();
};

export const createInteraction = async (
  interaction: Omit<Interaction, "id" | "created_at">
): Promise<Interaction> => {
  const response = await fetch(`${API_URL}/interactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(interaction),
  });
  console.log("Datas :", response.json());
  return await response.json();
};

export const updateInteraction = async (
  id: number,
  updates: Partial<Omit<Interaction, "id" | "created_at">>
): Promise<Interaction> => {
  const response = await fetch(`${API_URL}/interactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteInteraction = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/interactions/${id}`, {
    method: "DELETE",
  });
};
