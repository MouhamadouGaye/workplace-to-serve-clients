// import React, { createContext, useState, useContext } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email: string, password: string) => {
//     // Call backend API to login and fetch user data
//     const response = await fetch("/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) throw new Error("Login failed");
//     const data = await response.json();
//     setUser(data.user);
//   };

//   const signup = async (email: string, password: string, role: string) => {
//     // Call backend API to register
//     const response = await fetch("/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password, role }),
//     });

//     if (!response.ok) throw new Error("Signup failed");
//     const data = await response.json();
//     setUser(data.user);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token"); // Clear token
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useState } from "react";

// type User = {
//   email: string;
//   role: string;
// };

// type AuthContextType = {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (email: string, password: string, role: string) => Promise<void>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = async (email: string, password: string) => {
//     // Simulated API call
//     const fakeUser = { email, role: "user" }; // Replace with API response
//     setUser(fakeUser);
//   };

//   const signup = async (email: string, password: string, role: string) => {
//     // Simulated API call
//     const fakeUser = { email, role }; // Replace with API response
//     setUser(fakeUser);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

//   const signup = async (
//     email: string,
//     password: string,
//     name: string,
//     role: string,
//     managerId?: number
//   ) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/users/auth/register",
//         {
//           email,
//           password,
//           name,
//           role,
//           manager_id: managerId,
//         }
//       );

//       const registeredUser = response.data;

//       // Optionally, log the user in immediately after signup
//       setUser(registeredUser);
//     } catch (error: any) {
//       console.error("Signup failed:", error.response?.data || error.message);
//       throw new Error(error.response?.data.error || "Signup failed");
//     }
//   };

// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// type Role = "admin" | "manager" | "user";

// interface User {
//   email: string;
//   password: string;
//   name: string;
//   role: Role; // Explicitly typed
//   managerId?: number; // Optional
// }

// type AuthContextType = {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (
//     email: string,
//     password: string,
//     name: string,
//     role: string,
//     managerId?: number
//   ) => Promise<void>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   //   const [user, setUser] = useState<User | null>(null);
//   const [user, setUser] = React.useState(() => {
//     // Retrieve user data from localStorage if available
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/users/auth/login",
//         {
//           email,
//           password,
//         }
//       );
//       const { token, user } = response.data;

//       // Store token in localStorage or cookies for subsequent requests
//       localStorage.setItem("user", JSON.stringify(user)); // Persist user
//       localStorage.setItem("token", token);

//       // Update the user state
//       setUser(user);
//     } catch (error: any) {
//       console.error("Login failed:", error.response?.data || error.message);
//       throw new Error(error.response?.data.error || "Login failed");
//     }
//   };

//   const logout = () => {
//     // Clear the token and user data
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   //   const signup = async (
//   //     email: string,
//   //     password: string,
//   //     name: string,
//   //     role: Role, // Explicitly typed
//   //     managerId?: number
//   //   ) => {
//   //     try {
//   //       console.log("Signup payload:", {
//   //         email,
//   //         password,
//   //         name,
//   //         role,
//   //         manager_id: managerId,
//   //       }); // Debugging log

//   //       const response = await axios.post(
//   //         "http://localhost:3001/api/users/auth/register",
//   //         {
//   //           email,
//   //           password,
//   //           name,
//   //           role,
//   //           manager_id: managerId,
//   //         }
//   //       );

//   //       const registeredUser = response.data;

//   //       // Optionally, log the user in immediately after signup
//   //       setUser(registeredUser);
//   //     } catch (error: any) {
//   //       console.error("Signup failed:", error.response?.data || error.message); // Log the error response
//   //       throw new Error(error.response?.data.error || "Signup failed");
//   //     }
//   //   };

//   const signup = async (
//     email: string,
//     password: string,
//     name: string,
//     role: Role,
//     managerId?: number
//   ) => {
//     try {
//       console.log("Signup payload:", {
//         email,
//         password,
//         name,
//         role,
//         manager_id: managerId,
//       });
//       const response = await axios.post(
//         "http://localhost:3001/api/users/auth/register",
//         {
//           email,
//           password,
//           name,
//           role,
//           manager_id: managerId,
//         }
//       );
//       console.log("Backend response:", response.data); // Log backend response
//       const registeredUser = response.data;

//       setUser(registeredUser);
//     } catch (error: any) {
//       console.error("Signup failed:", error.response?.data || error.message);
//       throw new Error(error.response?.data.error || "Signup failed");
//     }
//   };
//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type Role = "admin" | "manager" | "user";

interface User {
  email: string;
  password: string;
  name: string;
  role: Role; // Explicitly typed
  managerId?: number; // Optional
}

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    role: string,
    managerId?: number
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean; // Added authentication check
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Checks if the user is authenticated by verifying the presence of a token
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if the token exists, false otherwise
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/auth/login",
        { email, password }
      );
      const { token, user } = response.data;

      localStorage.setItem("user", JSON.stringify(user)); // Persist user
      localStorage.setItem("token", token); // Persist token

      setUser(user);
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.error || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: Role,
    managerId?: number
  ) => {
    try {
      console.log("Signup payload:", {
        email,
        password,
        name,
        role,
        manager_id: managerId,
      });
      const response = await axios.post(
        "http://localhost:3001/api/users/auth/register",
        {
          email,
          password,
          name,
          role,
          manager_id: managerId,
        }
      );
      console.log("Backend response:", response.data);
      const registeredUser = response.data;

      setUser(registeredUser);
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.error || "Signup failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
