import { Contact } from "../types";

export const fetchContacts = async (): Promise<Contact[]> => {
  const response = await fetch("http://localhost:3001/api/contacts", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }

  return response.json();
};
