// import React, { useEffect, useState } from "react";
// import {
//   Interaction,
//   fetchInteractions,
//   createInteraction,
//   updateInteraction,
//   deleteInteraction,
// } from "../api/interactionServices"; // Adjust path accordingly

// interface InteractionsProps {
//   customerId: number;
// }

// const Interactions: React.FC<InteractionsProps> = ({ customerId }) => {
//   const [interactions, setInteractions] = useState<Interaction[]>([]);
//   const [form, setForm] = useState({ type: "", notes: "" });
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const loadInteractions = async () => {
//     const data = await fetchInteractions(customerId);
//     setInteractions(data);
//   };

//   useEffect(() => {
//     loadInteractions();
//   }, [customerId]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editingId) {
//       await updateInteraction(editingId, form);
//       setEditingId(null);
//     } else {
//       await createInteraction({ ...form, customer_id: customerId, user_id: 1 }); // Replace `1` with actual user ID
//     }
//     setForm({ type: "", notes: "" });
//     loadInteractions();
//   };

//   const handleEdit = (interaction: Interaction) => {
//     setForm({ type: interaction.type, notes: interaction.notes });
//     setEditingId(interaction.id);
//   };

//   const handleDelete = async (id: number) => {
//     await deleteInteraction(id);
//     loadInteractions();
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Interactions</h2>
//       <form onSubmit={handleSubmit} className="mb-4 space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Type</label>
//           <input
//             type="text"
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Notes</label>
//           <textarea
//             name="notes"
//             value={form.notes}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           {editingId ? "Update" : "Add"} Interaction
//         </button>
//       </form>
//       <ul className="space-y-4">
//         {interactions.map((interaction) => (
//           <li
//             key={interaction.id}
//             className="border p-4 rounded flex justify-between"
//           >
//             <div>
//               <p className="font-bold">{interaction.type}</p>
//               <p>{interaction.notes}</p>
//               <p className="text-sm text-gray-500">
//                 Created: {new Date(interaction.created_at).toLocaleString()}
//               </p>
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => handleEdit(interaction)}
//                 className="px-4 py-2 bg-yellow-500 text-white rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(interaction.id)}
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Interactions;

// import React, { useEffect, useState } from "react";
// import {
//   Interaction,
//   fetchInteractions,
//   createInteraction,
//   updateInteraction,
//   deleteInteraction,
// } from "../api/interactionServices"; // Adjust path accordingly
// import User from "./User";
// import { useAuth } from "../hooks/AuthContext";

// interface InteractionsProps {
//   customerId: number;
// }

// const Interactions: React.FC<InteractionsProps> = ({ customerId }) => {
//   const { user } = useAuth();
//   const [interactions, setInteractions] = useState<Interaction[]>([]);
//   const [form, setForm] = useState({ type: "", notes: "" });
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const userId = user.id;

//   const loadInteractions = async () => {
//     const data = await fetchInteractions(customerId);
//     console.log(data);
//     setInteractions(data);
//   };

//   useEffect(() => {
//     loadInteractions();
//   }, [customerId]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editingId) {
//       await updateInteraction(editingId, form);
//       setEditingId(null);
//     } else {
//       await createInteraction(customerId, userId); // Replace `1` with actual user ID
//     }
//     setForm({ type: "", notes: "" });
//     loadInteractions();
//   };

//   const handleEdit = (interaction: Interaction) => {
//     setForm({ type: interaction.type, notes: interaction.notes });
//     setEditingId(interaction.id);
//   };

//   const handleDelete = async (id: number) => {
//     await deleteInteraction(id);
//     loadInteractions();
//   };

//   return (
//     <div className="p-4">
//       <User />
//       <h2 className="text-2xl font-bold mb-4">Interactions</h2>
//       <form onSubmit={handleSubmit} className="mb-4 space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Type</label>
//           <input
//             type="text"
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Notes</label>
//           <textarea
//             name="notes"
//             value={form.notes}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           {editingId ? "Update" : "Add"} Interaction
//         </button>
//       </form>
//       {interactions && interactions.length === 0 ? (
//         <div className="text-center text-gray-500">
//           <p>No interactions yet.</p>
//           <p>Use the form above to add the first interaction.</p>
//         </div>
//       ) : (
//         <ul className="space-y-4">
//           {interactions.map((interaction) => (
//             <li
//               key={interaction.id}
//               className="border p-4 rounded flex justify-between"
//             >
//               <div>
//                 <p className="font-bold">{interaction.type}</p>
//                 <p>{interaction.notes}</p>
//                 <p className="text-sm text-gray-500">
//                   Created: {new Date(interaction.created_at).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(interaction)}
//                   className="px-4 py-2 bg-yellow-500 text-white rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(interaction.id)}
//                   className="px-4 py-2 bg-red-500 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Interactions;

// import React, { useEffect, useState } from "react";
// import {
//   Interaction,
//   fetchInteractions,
//   createInteraction,
//   updateInteraction,
//   deleteInteraction,
// } from "../api/interactionServices";
// import { useAuth } from "../hooks/AuthContext";
// import { useParams } from "react-router-dom";
// import User from "./User";

// const Interactions: React.FC = () => {
//   const { user } = useAuth();
//   const { customerId } = useParams<{ customerId: string }>();
//   const [interactions, setInteractions] = useState<Interaction[]>([]);
//   const [form, setForm] = useState({ type: "", notes: "" });
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const userId = user.id;

//   // const loadInteractions = async () => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);
//   //     const data = await fetchInteractions(Number(customerId));
//   //     setInteractions(data);
//   //   } catch (err) {
//   //     console.error("Error fetching interactions:", err);
//   //     setError("Failed to load interactions. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   useEffect(() => {
//     console.log("useEffect triggered with customerId:", customerId);
//     if (customerId) {
//       loadInteractions();
//     } else {
//       setError("Customer ID is missing.");
//       setLoading(false);
//     }
//   }, [customerId]);

//   const loadInteractions = async () => {
//     try {
//       console.log("Fetching interactions for customerId:", customerId);
//       setLoading(true);
//       setError(null);
//       const data = await fetchInteractions(Number(customerId));
//       console.log("Fetched interactions:", data);
//       setInteractions(data);
//     } catch (err) {
//       console.error("Error fetching interactions:", err);
//       setError("Failed to load interactions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (customerId) {
//       loadInteractions();
//     }
//   }, [customerId]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setError(null);
//       if (editingId) {
//         await updateInteraction(editingId, form);
//         setEditingId(null);
//       } else {
//         await createInteraction({
//           ...form,
//           customer_id: Number(customerId),
//           user_id: userId,
//         });
//       }
//       setForm({ type: "", notes: "" });
//       loadInteractions();
//     } catch (err) {
//       console.error("Error submitting interaction:", err);
//       setError("Failed to save interaction. Please try again.");
//     }
//   };

//   const handleEdit = (interaction: Interaction) => {
//     setForm({ type: interaction.type, notes: interaction.notes });
//     setEditingId(interaction.id);
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       setError(null);
//       await deleteInteraction(id);
//       loadInteractions();
//     } catch (err) {
//       console.error("Error deleting interaction:", err);
//       setError("Failed to delete interaction. Please try again.");
//     }
//   };

//   if (loading) return <p>Loading interactions...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-4">
//       <User />
//       <h2 className="text-2xl font-bold mb-4">Customer Interactions</h2>
//       <form onSubmit={handleSubmit} className="mb-4 space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Type</label>
//           <input
//             type="text"
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Notes</label>
//           <textarea
//             name="notes"
//             value={form.notes}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           {editingId ? "Update" : "Add"} Interaction
//         </button>
//       </form>
//       {interactions.length === 0 ? (
//         <p>No interactions yet. Use the form above to add one.</p>
//       ) : (
//         <ul className="space-y-4">
//           {interactions.map((interaction) => (
//             <li
//               key={interaction.id}
//               className="border p-4 rounded flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-bold">{interaction.type}</p>
//                 <p>{interaction.notes}</p>
//                 <p className="text-sm text-gray-500">
//                   Created: {new Date(interaction.created_at).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(interaction)}
//                   className="px-4 py-2 bg-yellow-500 text-white rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(interaction.id)}
//                   className="px-4 py-2 bg-red-500 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Interactions;

// import React, { useEffect, useState } from "react";
// import {
//   fetchInteractions,
//   createInteraction,
//   updateInteraction,
//   deleteInteraction,
// } from "../api/interactionServices";
// import { useAuth } from "../hooks/AuthContext";
// import { useParams } from "react-router-dom";
// import User from "./User";

// const Interactions: React.FC = () => {
//   const { user } = useAuth();
//   const { customerId } = useParams<{ customerId: string }>();
//   const [interactions, setInteractions] = useState([]);
//   const [form, setForm] = useState({
//     type: "Call",
//     notes: "",
//     attachment: null,
//   });
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const interactionsPerPage = 10;

//   const userId = user.id;

//   const loadInteractions = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await fetchInteractions(Number(customerId));
//       setInteractions(data);
//     } catch (err) {
//       console.error("Error fetching interactions:", err);
//       setError("Failed to load interactions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (customerId) {
//       loadInteractions();
//     }
//   }, [customerId]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setError(null);
//       const payload = {
//         ...form,
//         customer_id: Number(customerId),
//         user_id: userId,
//       };
//       if (editingId) {
//         await updateInteraction(editingId, payload);
//         setEditingId(null);
//       } else {
//         await createInteraction(payload);
//       }
//       setForm({ type: "Call", notes: "", attachment: null });
//       loadInteractions();
//     } catch (err) {
//       console.error("Error submitting interaction:", err);
//       setError("Failed to save interaction. Please try again.");
//     }
//   };

//   const handleEdit = (interaction) => {
//     setForm({
//       type: interaction.type,
//       notes: interaction.notes,
//       attachment: null,
//     });
//     setEditingId(interaction.id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       setError(null);
//       await deleteInteraction(id);
//       loadInteractions();
//     } catch (err) {
//       console.error("Error deleting interaction:", err);
//       setError("Failed to delete interaction. Please try again.");
//     }
//   };

//   const filteredInteractions = interactions.filter(
//     (interaction) =>
//       interaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       interaction.notes.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const paginatedInteractions = filteredInteractions.slice(
//     (currentPage - 1) * interactionsPerPage,
//     currentPage * interactionsPerPage
//   );

//   return (
//     <div className="p-4">
//       <User />
//       <h2 className="text-2xl font-bold mb-4">Customer Interactions</h2>
//       <form onSubmit={handleSubmit} className="mb-4 space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Type</label>
//           <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded"
//           >
//             <option value="Call">Call</option>
//             <option value="Email">Email</option>
//             <option value="Chat">Chat</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Notes</label>
//           <textarea
//             name="notes"
//             value={form.notes}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           {editingId ? "Update" : "Add"} Interaction
//         </button>
//       </form>

//       <input
//         type="text"
//         placeholder="Search interactions..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="w-full px-4 py-2 mb-4 border rounded"
//       />

//       {loading ? (
//         <p>Loading interactions...</p>
//       ) : filteredInteractions.length === 0 ? (
//         <p>No interactions found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {paginatedInteractions.map((interaction) => (
//             <li
//               key={interaction.id}
//               className="border p-4 rounded flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-bold">{interaction.type}</p>
//                 <p>{interaction.notes}</p>
//                 <p className="text-sm text-gray-500">
//                   Created: {new Date(interaction.created_at).toLocaleString()}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   By: {interaction.user?.name || "Unknown"}
//                 </p>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(interaction)}
//                   className="px-4 py-2 bg-yellow-500 text-white rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(interaction.id)}
//                   className="px-4 py-2 bg-red-500 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <div className="mt-4 flex justify-between">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-gray-300 rounded"
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of{" "}
//           {Math.ceil(filteredInteractions.length / interactionsPerPage)}
//         </span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) =>
//               Math.min(
//                 prev + 1,
//                 Math.ceil(filteredInteractions.length / interactionsPerPage)
//               )
//             )
//           }
//           disabled={
//             currentPage ===
//             Math.ceil(filteredInteractions.length / interactionsPerPage)
//           }
//           className="px-4 py-2 bg-gray-300 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Interactions;

import React, { useEffect, useState } from "react";
import {
  fetchInteractions,
  createInteraction,
  updateInteraction,
  deleteInteraction,
} from "../api/interactionServices";
import { useAuth } from "../hooks/AuthContext";
import { useParams } from "react-router-dom";
import User from "./User";

interface Interaction {
  id: number;
  type: string;
  notes: string;
  created_at: string;
  user?: {
    name: string;
  };
}

interface FormState {
  type: string;
  notes: string;
  attachment: File | null;
}

const Interactions: React.FC = () => {
  const { user } = useAuth();
  const { customerId } = useParams<{ customerId: string }>();
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [form, setForm] = useState<FormState>({
    type: "Call",
    notes: "",
    attachment: null,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const interactionsPerPage = 10;

  const userId = user.id;

  const loadInteractions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchInteractions(Number(customerId));
      setInteractions(data);
    } catch (err) {
      console.error("Error fetching interactions:", err);
      setError("Failed to load interactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customerId) {
      loadInteractions();
    }
  }, [customerId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const payload = {
        ...form,
        customer_id: Number(customerId),
        user_id: userId,
      };
      if (editingId) {
        await updateInteraction(editingId, payload);
        setEditingId(null);
      } else {
        await createInteraction(payload);
      }
      setForm({ type: "Call", notes: "", attachment: null });
      loadInteractions();
    } catch (err) {
      console.error("Error submitting interaction:", err);
      setError("Failed to save interaction. Please try again.");
    }
  };

  const handleEdit = (interaction: Interaction) => {
    setForm({
      type: interaction.type,
      notes: interaction.notes,
      attachment: null,
    });
    setEditingId(interaction.id);
  };

  const handleDelete = async (id: number) => {
    try {
      setError(null);
      await deleteInteraction(id);
      loadInteractions();
    } catch (err) {
      console.error("Error deleting interaction:", err);
      setError("Failed to delete interaction. Please try again.");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const filteredInteractions = interactions.filter(
    (interaction) =>
      interaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interaction.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedInteractions = filteredInteractions.slice(
    (currentPage - 1) * interactionsPerPage,
    currentPage * interactionsPerPage
  );

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-colors duration-300 p-4`}
    >
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Customer Interactions</h2>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <User />

      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Chat">Chat</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editingId ? "Update" : "Add"} Interaction
        </button>
      </form>

      <input
        type="text"
        placeholder="Search interactions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded"
      />

      {loading ? (
        <p>Loading interactions...</p>
      ) : filteredInteractions.length === 0 ? (
        <p>No interactions found.</p>
      ) : (
        <ul className="space-y-4">
          {paginatedInteractions.map((interaction) => (
            <li
              key={interaction.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{interaction.type}</p>
                <p>{interaction.notes}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(interaction.created_at).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  By: {interaction.user?.name || "Unknown"}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(interaction)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(interaction.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of{" "}
          {Math.ceil(filteredInteractions.length / interactionsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(filteredInteractions.length / interactionsPerPage)
              )
            )
          }
          disabled={
            currentPage ===
            Math.ceil(filteredInteractions.length / interactionsPerPage)
          }
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Interactions;
