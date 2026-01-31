const API_URL = "http://localhost:3001/api"; // Change this to your Express backend URL

// Utility function to handle responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Something went wrong");
  }
  return response.json();
};

interface CustomerRequestBody {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status: string;
  assigned_to?: number;
}

// Service to add a new customer
export const addCustomer = async (
  customer: CustomerRequestBody
): Promise<void> => {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  console.log(response);
  return handleResponse(response);
};

export const updateCustomer = async (id: Number, customer: any) => {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update customer");
  }

  return response.json(); // Return updated customer
};

export const deleteCustomer = async (id: Number) => {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete customer");
  }

  return response.json(); // Optionally return success message
};
