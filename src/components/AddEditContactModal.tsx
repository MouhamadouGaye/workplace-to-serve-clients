// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface Props {
//   contact: any;
//   onClose: () => void;
// }

// const AddEditContactModal: React.FC<Props> = ({ contact, onClose }) => {
//   const [formData, setFormData] = useState({
//     customer_id: "",
//     name: "",
//     email: "",
//     phone: "",
//     position: "",
//     is_primary: false,
//   });

//   useEffect(() => {
//     if (contact) {
//       setFormData(contact);
//     }
//   }, [contact]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (contact) {
//         // Update contact
//         await axios.put(
//           `http:localhost:3001/api/contacts/${contact.id}`,
//           formData
//         );
//       } else {
//         // Create new contact
//         await axios.post("http:localhost:3001/api/contacts", formData);
//       }
//       onClose();
//     } catch (error) {
//       console.error("Failed to save contact:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">
//           {contact ? "Edit Contact" : "Add Contact"}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">
//               Customer ID
//             </label>
//             <input
//               type="text"
//               name="customer_id"
//               value={formData.customer_id}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Phone</label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Position</label>
//             <input
//               type="text"
//               name="position"
//               value={formData.position}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               name="is_primary"
//               checked={formData.is_primary}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="text-sm font-medium">Primary Contact</label>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEditContactModal;

import React, { useState } from "react";
import axios from "axios";

interface AddEditContactModalProps {
  contact?: any; // The contact to edit (if any)
  onClose: () => void; // Function to close the modal
}

const AddEditContactModal: React.FC<AddEditContactModalProps> = ({
  contact = null,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: contact?.name || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    position: contact?.position || "",
    customer_id: contact?.customer_id || "",
    is_primary: contact?.is_primary || false,
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "is_primary" ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (contact) {
        // Update existing contact
        response = await axios.put(
          `http://localhost:3001/api/contacts/${contact.id}`,
          formData
        );
      } else {
        // Add new contact
        response = await axios.post(
          "http://localhost:3001/api/contacts",
          formData
        );
      }
      console.log("Contact saved: ", formData, response.data);
      onClose(); // Close modal and refresh list
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to save contact");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {contact ? "Edit Contact" : "Add Contact"}
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Customer ID
            </label>
            <input
              type="number"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_primary"
                checked={formData.is_primary}
                onChange={handleChange}
              />
              <span>Primary Contact</span>
            </label>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditContactModal;
