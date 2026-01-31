// import React, { useState } from "react";
// import { useAuth } from "../hooks/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Signup: React.FC = () => {
//   const { signup } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Signup data:", { name, email, password, role }); // Log the data
//     try {
//       await signup(name, email, password, role);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       alert("Signup failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-50">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white p-6 rounded shadow-md space-y-4 w-80"
//       >
//         <h1 className="text-2xl font-bold text-center">Signup</h1>
//         <input
//           type="name"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-2 border rounded "
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="user">User</option>
//           <option value="manager">Manager</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded"
//         >
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [managerId, setManagerId] = useState<number | undefined>();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, name, role, managerId);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      alert(`Signup failed: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md space-y-4 w-80"
      >
        <h1 className="text-2xl font-bold text-center">Signup</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        {role === "manager" && (
          <input
            type="number"
            placeholder="Manager ID (Optional)"
            value={managerId || ""}
            onChange={(e) =>
              setManagerId(
                e.target.value ? parseInt(e.target.value, 10) : undefined
              )
            }
            className="w-full p-2 border rounded"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
