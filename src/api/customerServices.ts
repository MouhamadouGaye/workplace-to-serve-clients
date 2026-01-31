import { Customer } from "../types";

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await fetch("http://localhost:3001/api/customers", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }

  return response.json();
};
