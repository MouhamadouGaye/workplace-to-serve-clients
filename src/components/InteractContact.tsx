// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const InteractContact = () => {
//   const { id } = useParams();
//   const [contact, setContact] = useState(null);

//   useEffect(() => {
//     const fetchContact = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/api/contacts/${id}`
//         );
//         setContact(response.data);
//       } catch (error) {
//         console.error("Failed to fetch contact:", error);
//       }
//     };

//     fetchContact();
//   }, [id]);

//   if (!contact) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{contact.name}</h1>
//       <p className="text-gray-600">{contact.position}</p>
//       <p className="text-gray-600">{contact.email}</p>
//       <p className="text-gray-600">{contact.phone}</p>
//       <div className="mt-4 flex gap-4">
//         {/* Interaction Buttons */}
//         {contact.phone && (
//           <button
//             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             onClick={() => window.open(`tel:${contact.phone}`)}
//           >
//             Call
//           </button>
//         )}
//         {contact.email && (
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={() => window.open(`mailto:${contact.email}`)}
//           >
//             Email
//           </button>
//         )}
//         <button
//           className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//           onClick={() => alert(`Starting chat with ${contact.name}`)}
//         >
//           Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InteractContact;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Contact } from "../types"; // Importing the Contact type

const InteractContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get<Contact>(
          `http://localhost:3001/api/contacts/${id}`
        );
        setContact(response.data);
      } catch (error) {
        console.error("Failed to fetch contact:", error);
      }
    };

    fetchContact();
  }, [id]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  if (!contact) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen p-6 transition-colors duration-300`}
    >
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contact Interaction</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Contact Details */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">{contact.name}</h2>
        <p className="text-gray-700 dark:text-gray-300">{contact.position}</p>
        <p className="text-gray-700 dark:text-gray-300">{contact.email}</p>
        <p className="text-gray-700 dark:text-gray-300">{contact.phone}</p>
      </div>

      {/* Interaction Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        {contact.phone && (
          <button
            className="interaction-btn bg-green-500 hover:bg-green-600"
            onClick={() => window.open(`tel:${contact.phone}`)}
          >
            Call
          </button>
        )}
        {contact.email && (
          <button
            className="interaction-btn bg-blue-500 hover:bg-blue-600"
            onClick={() => window.open(`mailto:${contact.email}`)}
          >
            Email
          </button>
        )}
        <button
          className="interaction-btn bg-purple-500 hover:bg-purple-600"
          onClick={() => alert(`Starting chat with ${contact.name}`)}
        >
          Chat
        </button>
      </div>
    </div>
  );
};

export default InteractContact;
