export interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "manager" | "user";
  password?: string;
}
