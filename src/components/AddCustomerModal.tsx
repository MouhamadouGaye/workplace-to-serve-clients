// // import React from "react";
// // import { X } from "lucide-react";
// // import { CustomerRequestBody } from "../types";
// // import { addCustomer } from "../api/service";

// // interface Props {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   users: { id: number; name: string }[];
// // }

// // export default function AddCustomerModal({ isOpen, onClose, users }: Props) {
// //   const [formData, setFormData] = React.useState<CustomerRequestBody>({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     company: "",
// //     status: "new",
// //     assigned_to: undefined,
// //   });

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     await addCustomer(formData);
// //     onClose();
// //     setFormData({
// //       name: "",
// //       email: "",
// //       phone: "",
// //       company: "",
// //       status: "new",
// //       assigned_to: undefined,
// //     });
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg p-6 w-full max-w-md">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl font-semibold">Add New Customer</h2>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-500 hover:text-gray-700"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit}>
// //           <div className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Name *
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={formData.name}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, name: e.target.value })
// //                 }
// //                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 value={formData.email || ""}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, email: e.target.value })
// //                 }
// //                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Phone
// //               </label>
// //               <input
// //                 type="tel"
// //                 value={formData.phone || ""}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, phone: e.target.value })
// //                 }
// //                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Company
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.company || ""}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, company: e.target.value })
// //                 }
// //                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Status
// //               </label>
// //               <select
// //                 value={formData.status}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, status: e.target.value })
// //                 }
// //                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
// //               >
// //                 <option value="new">New</option>
// //                 <option value="active">Active</option>
// //                 <option value="inactive">Inactive</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Assign To
// //               </label>
// //               <select
// //                 value={formData.assigned_to || ""}
// //                 onChange={(e) =>
// //                   setFormData({
// //                     ...formData,
// //                     assigned_to: e.target.value
// //                       ? parseInt(e.target.value)
// //                       : undefined,
// //                   })
// //                 }
// //                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
// //               >
// //                 <option value="">Unassigned</option>
// //                 {users.map((user) => (
// //                   <option key={user.id} value={user.id}>
// //                     {user.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div className="mt-6 flex justify-end space-x-3">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// //               onClick={handleSubmit}
// //             >
// //               Add Customer
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect } from "react";
// import { addCustomer } from "../api/service";
// import { CustomerRequestBody } from "../types";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddCustomer: (newCustomer: any) => void; // Add this prop
//   users: { id: number; name: string }[];
//   initialData?: CustomerRequestBody; // For editing existing customers
// }

// export default function AddCustomerModal({
//   isOpen,
//   onClose,
//   onAddCustomer, // Receive the callback
//   users,
//   initialData,
// }: Props) {
//   const [formData, setFormData] = React.useState({
//     name: "",
//     email: "",
//     phone: "",
//     company: "",
//     status: "new",
//     assigned_to: undefined,
//   });

//   // Reset or initialize form data when modal is opened or initialData changes
//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         name: initialData.name || "",
//         email: initialData.email || "",
//         company: initialData.company || "",
//         status: initialData.status || "active",
//         assigned_to: initialData.assigned_to || null,
//       });
//     } else {
//       setFormData({
//         name: "",
//         email: "",
//         company: "",
//         status: "active",
//         assigned_to: null,
//       });
//     }
//   }, [initialData, isOpen]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const newCustomer = await addCustomer(formData); // API should return the created customer
//       onAddCustomer(newCustomer); // Pass the new customer to the parent
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         company: "",
//         status: "new",
//         assigned_to: undefined,
//       });
//       onClose();
//     } catch (error) {
//       console.error("Failed to add customer", error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name *
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={formData.email || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 value={formData.phone || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, phone: e.target.value })
//                 }
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Company
//               </label>
//               <input
//                 type="text"
//                 value={formData.company || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, company: e.target.value })
//                 }
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Status
//               </label>
//               <select
//                 value={formData.status}
//                 onChange={(e) =>
//                   setFormData({ ...formData, status: e.target.value })
//                 }
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="new">New</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Assign To
//               </label>
//               <select
//                 value={formData.assigned_to || ""}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     assigned_to: e.target.value
//                       ? parseInt(e.target.value)
//                       : undefined,
//                   })
//                 }
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="">Unassigned</option>
//                 {users.map((user) => (
//                   <option key={user.id} value={user.id}>
//                     {user.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Add Customer
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { CustomerRequestBody } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customer: CustomerRequestBody) => void;
  users: { id: number; name: string }[];
  initialData?: CustomerRequestBody;
}

const AddCustomerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  users,
  initialData,
}) => {
  const [formData, setFormData] = React.useState<CustomerRequestBody>({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "new",
    assigned_to: undefined,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "new",
        assigned_to: undefined,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit(formData);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Customer" : "Add Customer"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, company: e.target.value }))
              }
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Assigned To
            </label>
            <select
              value={formData.assigned_to}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  assigned_to: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                }))
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
