// import React from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { PlusCircle, Search } from "lucide-react";
// import type { Customer, CustomerRequestBody } from "../types";
// import AddCustomerModal from "./AddCustomerModal";

// export default function Customers() {
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
//   const queryClient = useQueryClient();

//   const { data: customers, isLoading } = useQuery<Customer[]>({
//     queryKey: ["customers"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:3001/api/customers");
//       if (!response.ok) throw new Error("Failed to fetch customers");
//       return response.json();
//     },
//   });

//   const { data: users } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:3001/api/users");
//       if (!response.ok) throw new Error("Failed to fetch users");
//       return response.json();
//     },
//   });

//   const addCustomerMutation = useMutation({
//     mutationFn: async (newCustomer: CustomerRequestBody) => {
//       const response = await fetch("http://localhost:3001/api/customers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCustomer),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to add customer");
//       }
//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["customers"] });
//     },
//   });

//   const handleAddCustomer = async (customer: CustomerRequestBody) => {
//     try {
//       await addCustomerMutation.mutateAsync(customer);
//     } catch (error) {
//       console.error("Failed to add customer:", error);
//       // Handle error (show toast notification, etc.)
//     }
//   };

//   const filteredCustomers = React.useMemo(() => {
//     if (!customers) return [];
//     return customers.filter(
//       (customer) =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [customers, searchTerm]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
//         <button
//           onClick={() => setIsAddModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
//         >
//           <PlusCircle className="w-5 h-5 mr-2" />
//           Add Customer
//         </button>
//       </div>

//       <div className="relative mb-6">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//         <input
//           type="text"
//           placeholder="Search customers..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden flex-1">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Company
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Assigned To
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredCustomers.map((customer) => (
//               <tr key={customer.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">
//                     {customer.name}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-500">
//                     {customer.company || "-"}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-500">
//                     {customer.email || "-"}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                     ${
//                       customer.status === "active"
//                         ? "bg-green-100 text-green-800"
//                         : customer.status === "inactive"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {customer.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.assigned_to_name || "Unassigned"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AddCustomerModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onSubmit={handleAddCustomer}
//         users={users || []}
//       />
//     </div>
//   );
// }

// import React from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
// import type { Customer, CustomerRequestBody } from "../types";
// import AddCustomerModal from "./AddCustomerModal";

// export default function Customers() {
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
//   const [selectedCustomer, setSelectedCustomer] =
//     React.useState<Customer | null>(null);

//   const queryClient = useQueryClient();

//   const { data: customers, isLoading } = useQuery<Customer[]>({
//     queryKey: ["customers"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:3001/api/customers");
//       if (!response.ok) throw new Error("Failed to fetch customers");
//       return response.json();
//     },
//   });

//   const { data: users } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:3001/api/users");
//       if (!response.ok) throw new Error("Failed to fetch users");
//       return response.json();
//     },
//   });

//   const addCustomerMutation = useMutation({
//     mutationFn: async (newCustomer: CustomerRequestBody) => {
//       const response = await fetch("http://localhost:3001/api/customers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCustomer),
//       });
//       if (!response.ok) throw new Error("Failed to add customer");
//       return response.json();
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
//   });

//   const updateCustomerMutation = useMutation({
//     mutationFn: async (updatedCustomer: Customer) => {
//       const response = await fetch(
//         `http://localhost:3001/api/customers/${updatedCustomer.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedCustomer),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to update customer");
//       return response.json();
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
//   });

//   const deleteCustomerMutation = useMutation({
//     mutationFn: async (id: number) => {
//       const response = await fetch(
//         `http://localhost:3001/api/customers/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (!response.ok) throw new Error("Failed to delete customer");
//       return response.json();
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
//   });

//   const handleAddCustomer = async (customer: CustomerRequestBody) => {
//     try {
//       await addCustomerMutation.mutateAsync(customer);
//     } catch (error) {
//       console.error("Failed to add customer:", error);
//     }
//   };

//   // const handleEditCustomer = async (customer: Customer) => {
//   //   try {
//   //     await updateCustomerMutation.mutateAsync(customer);
//   //     setIsEditModalOpen(false);
//   //     setSelectedCustomer(null);
//   //   } catch (error) {
//   //     console.error("Failed to update customer:", error);
//   //   }
//   // };
//   const handleEditCustomer = async (customer: Customer) => {
//     try {
//       const updatedCustomer = await updateCustomerMutation.mutateAsync(
//         customer
//       );
//       setCustomers((prevCustomers) =>
//         prevCustomers.map((c) =>
//           c.id === updatedCustomer.id ? updatedCustomer : c
//         )
//       );
//       setIsEditModalOpen(false);
//       setSelectedCustomer(null);
//     } catch (error) {
//       console.error("Failed to update customer:", error);
//     }
//   };

//   const handleDeleteCustomer = async (id: number) => {
//     if (confirm("Are you sure you want to delete this customer?")) {
//       try {
//         await deleteCustomerMutation.mutateAsync(id);
//       } catch (error) {
//         console.error("Failed to delete customer:", error);
//       }
//     }
//   };

//   const filteredCustomers = React.useMemo(() => {
//     if (!customers) return [];
//     return customers.filter(
//       (customer) =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [customers, searchTerm]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
//         <button
//           onClick={() => setIsAddModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
//         >
//           <PlusCircle className="w-5 h-5 mr-2" />
//           Add Customer
//         </button>
//       </div>

//       <div className="relative mb-6">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//         <input
//           type="text"
//           placeholder="Search customers..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden flex-1">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Company
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Assigned To
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredCustomers.map((customer) => (
//               <tr key={customer.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {customer.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.company || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.email || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                     ${
//                       customer.status === "active"
//                         ? "bg-green-100 text-green-800"
//                         : customer.status === "inactive"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {customer.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.assigned_to_name || "Unassigned"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <button
//                     onClick={() => {
//                       setSelectedCustomer(customer);
//                       setIsEditModalOpen(true);
//                     }}
//                     className="text-blue-600 hover:text-blue-900 mr-4"
//                   >
//                     <Edit className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteCustomer(customer.id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* <AddCustomerModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onSubmit={handleAddCustomer} // Pass `onSubmit` correctly
//         users={users || []}
//       /> */}
//       <AddCustomerModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSubmit={(customerData) => {
//           handleEditCustomer({ ...selectedCustomer, ...customerData });
//           setIsEditModalOpen(false);
//         }}
//         users={users || []}
//         initialData={selectedCustomer}
//       />

//       {isEditModalOpen && selectedCustomer && (
//         <AddCustomerModal
//           isOpen={isEditModalOpen}
//           onClose={() => setIsEditModalOpen(false)}
//           onSubmit={(updatedCustomer) =>
//             handleEditCustomer({ ...selectedCustomer, ...updatedCustomer })
//           }
//           onAddCustomer={(updatedCustomer) =>
//             handleEditCustomer({ ...selectedCustomer, ...updatedCustomer })
//           }
//           users={users || []}
//           initialData={selectedCustomer}
//         />
//       )}
//     </div>
//   );
// }

// import React from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
// import type { Customer, CustomerRequestBody } from "../types";
// import AddCustomerModal from "./AddCustomerModal";

// export default function Customers() {
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [isModalOpen, setIsModalOpen] = React.useState(false);
//   const [selectedCustomer, setSelectedCustomer] =
//     React.useState<Customer | null>(null);

//   const queryClient = useQueryClient();

//   const { data: customers, isLoading } = useQuery<Customer[]>({
//     queryKey: ["customers"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:3001/api/customers");
//       if (!response.ok) throw new Error("Failed to fetch customers");
//       return response.json();
//     },
//   });

//   const { data: users } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:3001/api/users");
//       if (!response.ok) throw new Error("Failed to fetch users");
//       return response.json();
//     },
//   });

//   const addCustomerMutation = useMutation({
//     mutationFn: async (newCustomer: CustomerRequestBody) => {
//       const response = await fetch("http://localhost:3001/api/customers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCustomer),
//       });
//       if (!response.ok) throw new Error("Failed to add customer");
//       return response.json();
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
//   });

//   // const updateCustomerMutation = useMutation({
//   //   mutationFn: async (updatedCustomer: Customer) => {
//   //     const response = await fetch(
//   //       `http://localhost:3001/api/customers/${updatedCustomer.id}`,
//   //       {
//   //         method: "PUT",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify(updatedCustomer),
//   //       }
//   //     );
//   //     if (!response.ok) throw new Error("Failed to update customer");
//   //     return response.json();
//   //   },
//   //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
//   // });

//   const updateCustomerMutation = useMutation({
//     mutationFn: async (updatedCustomer: Customer) => {
//       console.log("Making PUT request to API with:", updatedCustomer);

//       const response = await fetch(
//         `http://localhost:3001/api/customers/${updatedCustomer.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedCustomer),
//         }
//       );

//       // Log the status and response body for debugging
//       console.log("API response status:", response.status);
//       const responseBody = await response.text();
//       console.log("API response body:", responseBody);

//       if (!response.ok) {
//         throw new Error("Failed to update customer");
//       }

//       return JSON.parse(responseBody);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["customers"] });
//     },
//   });

//   const deleteCustomerMutation = useMutation({
//     mutationFn: async (id: number) => {
//       const response = await fetch(
//         `http://localhost:3001/api/customers/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (!response.ok) throw new Error("Failed to delete customer");
//       return response.json();
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
//   });

//   const handleAddCustomer = async (customer: CustomerRequestBody) => {
//     try {
//       await addCustomerMutation.mutateAsync(customer);
//       setIsModalOpen(false); // Close the modal
//     } catch (error) {
//       console.error("Failed to add customer:", error);
//     }
//   };

//   const handleEditCustomer = async (customer: Customer) => {
//     try {
//       await updateCustomerMutation.mutateAsync(customer);
//       setIsModalOpen(false); // Close the modal
//       setSelectedCustomer(null); // Reset the selected customer
//     } catch (error) {
//       console.error("Failed to update customer:", error);
//     }
//   };

//   const handleDeleteCustomer = async (id: number) => {
//     if (confirm("Are you sure you want to delete this customer?")) {
//       try {
//         await deleteCustomerMutation.mutateAsync(id);
//       } catch (error) {
//         console.error("Failed to delete customer:", error);
//       }
//     }
//   };

//   const filteredCustomers = React.useMemo(() => {
//     if (!customers) return [];
//     return customers.filter(
//       (customer) =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [customers, searchTerm]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
//         <button
//           onClick={() => {
//             setSelectedCustomer(null); // Ensure no customer is selected
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
//         >
//           <PlusCircle className="w-5 h-5 mr-2" />
//           Add Customer
//         </button>
//       </div>

//       <div className="relative mb-6">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//         <input
//           type="text"
//           placeholder="Search customers..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden flex-1">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Company
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Assigned To
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredCustomers.map((customer) => (
//               <tr key={customer.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {customer.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.company || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.email || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                     ${
//                       customer.status === "active"
//                         ? "bg-green-100 text-green-800"
//                         : customer.status === "inactive"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {customer.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.assigned_to_name || "Unassigned"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <button
//                     onClick={() => {
//                       setSelectedCustomer(customer);
//                       setIsModalOpen(true);
//                     }}
//                     className="text-blue-600 hover:text-blue-900 mr-4"
//                   >
//                     <Edit className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteCustomer(customer.id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AddCustomerModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedCustomer(null);
//         }}
//         onSubmit={(data) => {
//           if (selectedCustomer) {
//             console.log("Updating customer:", { ...selectedCustomer, ...data });
//             handleEditCustomer({ ...selectedCustomer, ...data });
//           } else {
//             console.log("Adding new customer:", data);
//             handleAddCustomer(data);
//           }
//         }}
//         users={users || []}
//         initialData={selectedCustomer || undefined}
//       />
//     </div>
//   );
// }

// import React, { useState, useEffect, useMemo } from "react";
// import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
// import type { Customer, CustomerRequestBody } from "../types";
// import AddCustomerModal from "./AddCustomerModal";
// import { useAuth } from "../hooks/AuthContext";
// import User from "./User";
// import { Link } from "react-router-dom";

// export default function Customers() {
//   const { user } = useAuth(); // Get the logged-in user from AuthContext

//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
//     null
//   );

//   const [customers, setCustomers] = useState<Customer[] | null>(null);
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch customers
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("http://localhost:3001/api/customers");
//         if (!response.ok) throw new Error("Failed to fetch customers");
//         const data = await response.json();
//         setCustomers(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/api/users");
//         if (!response.ok) throw new Error("Failed to fetch users");
//         const data = await response.json();
//         setUsers(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // const handleAddCustomer = async (customer: CustomerRequestBody) => {
//   //   try {
//   //     const response = await fetch("http://localhost:3001/api/customers", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(customer),
//   //     });
//   //     if (!response.ok) throw new Error("Failed to add customer");
//   //     const newCustomer = await response.json();
//   //     setCustomers((prev) => (prev ? [...prev, newCustomer] : [newCustomer]));
//   //     setIsModalOpen(false); // Close modal
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   const handleAddCustomer = async (customer: CustomerRequestBody) => {
//     try {
//       const response = await fetch("http://localhost:3001/api/customers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(customer),
//       });
//       if (!response.ok) throw new Error("Failed to add customer");
//       const newCustomer = await response.json();

//       // Update the state with the newly added customer
//       setCustomers((prev) => (prev ? [...prev, newCustomer] : [newCustomer]));

//       setIsModalOpen(false); // Close modal
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEditCustomer = async (customer: Customer) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/customers/${customer.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(customer),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to update customer");
//       const updatedCustomer = await response.json();
//       setCustomers((prev) =>
//         prev
//           ? prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
//           : []
//       );

//       setIsModalOpen(false);
//       setSelectedCustomer(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDeleteCustomer = async (id: number) => {
//     if (confirm("Are you sure you want to delete this customer?")) {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/customers/${id}`,
//           {
//             method: "DELETE",
//           }
//         );
//         if (!response.ok) throw new Error("Failed to delete customer");
//         setCustomers((prev) => (prev ? prev.filter((c) => c.id !== id) : []));
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const handleStatusChange = async (id: number, newStatus: string) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/customers/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to update status");
//       const updatedCustomer = await response.json();
//       setCustomers((prev) =>
//         prev ? prev.map((c) => (c.id === id ? updatedCustomer : c)) : []
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredCustomers = useMemo(() => {
//     if (!customers) return [];
//     return customers.filter(
//       (customer) =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [customers, searchTerm]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="h-full flex flex-col">
//       <User />
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
//         <button
//           onClick={() => {
//             setSelectedCustomer(null);
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
//         >
//           <PlusCircle className="w-5 h-5 mr-2" />
//           Add Customer
//         </button>
//       </div>

//       <div className="relative mb-6">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//         <input
//           type="text"
//           placeholder="Search customers..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden flex-1 overflow-y-auto">
//         <table className="min-w-full divide-y divide-gray-200 ">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Company
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Assigned To
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
//             {filteredCustomers.map((customer) => (
//               <tr key={customer.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   <Link
//                     to={`/customers/${customer.id}`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     {customer.name}
//                   </Link>
//                   {/* {customer.name} */}
//                 </td>

//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.email || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {/* <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                     ${
//                       customer.status === "active"
//                         ? "bg-green-100 text-green-800"
//                         : customer.status === "inactive"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {customer.status}
//                   </span> */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <select
//                       className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full
//                         ${
//                           customer.status === "active"
//                             ? "bg-green-100 text-green-800"
//                             : customer.status === "inactive"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-yellow-100 text-yellow-800"
//                         }`}
//                       value={customer.status}
//                       onChange={(e) =>
//                         handleStatusChange(customer.id, e.target.value)
//                       }
//                     >
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                       <option value="pending">Pending</option>
//                     </select>
//                   </td>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.assigned_to_name || "Unassigned"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <button
//                     onClick={() => {
//                       setSelectedCustomer(customer);
//                       setIsModalOpen(true);
//                     }}
//                     className="text-blue-600 hover:text-blue-900 mr-4"
//                   >
//                     <Edit className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteCustomer(customer.id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AddCustomerModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedCustomer(null);
//         }}
//         onSubmit={(data) => {
//           if (selectedCustomer) {
//             handleEditCustomer({ ...selectedCustomer, ...data });
//           } else {
//             handleAddCustomer(data);
//           }
//         }}
//         users={users}
//         initialData={selectedCustomer || undefined}
//       />
//     </div>
//   );
// }

// import React, { useState, useEffect, useMemo } from "react";
// import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
// import type { Customer, CustomerRequestBody } from "../types";
// import AddCustomerModal from "./AddCustomerModal";
// import { useAuth } from "../hooks/AuthContext";
// import User from "./User";
// import { Link } from "react-router-dom";

// export default function Customers() {
//   const { user } = useAuth(); // Get the logged-in user from AuthContext

//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
//     null
//   );

//   const [customers, setCustomers] = useState<Customer[] | null>(null);
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const customersPerPage = 10;

//   const filteredCustomers = useMemo(() => {
//     if (!customers) return [];
//     return customers.filter(
//       (customer) =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [customers, searchTerm]);

//   const indexOfLastCustomer = currentPage * customersPerPage;
//   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
//   const currentCustomers = filteredCustomers.slice(
//     indexOfFirstCustomer,
//     indexOfLastCustomer
//   );

//   const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

//   const handlePageChange = (page: number) => setCurrentPage(page);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("http://localhost:3001/api/customers");
//         if (!response.ok) throw new Error("Failed to fetch customers");
//         const data = await response.json();
//         setCustomers(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/api/users");
//         if (!response.ok) throw new Error("Failed to fetch users");
//         const data = await response.json();
//         setUsers(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleAddCustomer = async (customer: CustomerRequestBody) => {
//     try {
//       const response = await fetch("http://localhost:3001/api/customers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(customer),
//       });
//       if (!response.ok) throw new Error("Failed to add customer");
//       const newCustomer = await response.json();
//       setCustomers((prev) => (prev ? [...prev, newCustomer] : [newCustomer]));
//       setIsModalOpen(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEditCustomer = async (customer: Customer) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/customers/${customer.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(customer),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to update customer");
//       const updatedCustomer = await response.json();
//       setCustomers((prev) =>
//         prev
//           ? prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
//           : []
//       );
//       setIsModalOpen(false);
//       setSelectedCustomer(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDeleteCustomer = async (id: number) => {
//     if (confirm("Are you sure you want to delete this customer?")) {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/customers/${id}`,
//           {
//             method: "DELETE",
//           }
//         );
//         if (!response.ok) throw new Error("Failed to delete customer");
//         setCustomers((prev) => (prev ? prev.filter((c) => c.id !== id) : []));
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const handleStatusChange = async (id: number, newStatus: string) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/customers/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to update status");
//       const updatedCustomer = await response.json();
//       setCustomers((prev) =>
//         prev ? prev.map((c) => (c.id === id ? updatedCustomer : c)) : []
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-600">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col space-y-4 bg-gray-100 p-6">
//       <User />
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-bold text-gray-800">Customers</h2>
//         <button
//           onClick={() => {
//             setSelectedCustomer(null);
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center shadow-md hover:bg-blue-700 transition-all"
//         >
//           <PlusCircle className="w-5 h-5 mr-2" />
//           Add Customer
//         </button>
//       </div>

//       <div className="relative">
//         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//         <input
//           type="text"
//           placeholder="Search customers..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden flex-1">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {["Name", "Email", "Status", "Assigned To", "Actions"].map(
//                 (header) => (
//                   <th
//                     key={header}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     {header}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentCustomers.map((customer) => (
//               <tr key={customer.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   <Link
//                     to={`/customers/${customer.id}`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     {customer.name}
//                   </Link>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.email || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <select
//                     className={`px-3 py-1 text-sm font-medium rounded-full ${
//                       customer.status === "active"
//                         ? "bg-green-100 text-green-800"
//                         : customer.status === "inactive"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                     value={customer.status}
//                     onChange={(e) =>
//                       handleStatusChange(customer.id, e.target.value)
//                     }
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                     <option value="pending">Pending</option>
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {customer.assigned_to_name || "Unassigned"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
//                   <button
//                     onClick={() => {
//                       setSelectedCustomer(customer);
//                       setIsModalOpen(true);
//                     }}
//                     className="text-blue-600 hover:text-blue-900 mr-2"
//                   >
//                     <Edit className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteCustomer(customer.id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>

//       <AddCustomerModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedCustomer(null);
//         }}
//         onSubmit={(data) => {
//           if (selectedCustomer) {
//             handleEditCustomer({ ...selectedCustomer, ...data });
//           } else {
//             handleAddCustomer(data);
//           }
//         }}
//         users={users}
//         initialData={selectedCustomer || undefined}
//       />
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo } from "react";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
import type { Customer, CustomerRequestBody } from "../types";
import AddCustomerModal from "./AddCustomerModal";
import { useAuth } from "../hooks/AuthContext";
import User from "./User";
import { Link } from "react-router-dom";

type Props = {};

const Customers: React.FC<Props> = ({ isDarkMode }) => {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const customersPerPage = 10;

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     setTimeout(() => {
  //       setLoading(true);
  //     }, 1000);

  //     setError(null);
  //     try {
  //       const response = await fetch("http://localhost:3001/api/customers");
  //       if (!response.ok) throw new Error("Failed to fetch customers");
  //       const data = await response.json();
  //       setCustomers(data);
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCustomers();
  // }, []);
  useEffect(() => {
    const fetchCustomers = async () => {
      setError(null);
      setLoading(true);

      const start = Date.now(); // Track the start time
      try {
        const response = await fetch("http://localhost:3001/api/customers");
        if (!response.ok) throw new Error("Failed to fetch customers");
        const data = await response.json();

        const elapsedTime = Date.now() - start; // Calculate elapsed time
        const remainingTime = Math.max(1000 - elapsedTime, 0); // Calculate remaining time to 1 second
        await new Promise((resolve) => setTimeout(resolve, remainingTime)); // Ensure at least 1 second

        setCustomers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleAddCustomer = async (customer: CustomerRequestBody) => {
    try {
      const response = await fetch("http://localhost:3001/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      if (!response.ok) throw new Error("Failed to add customer");
      const newCustomer = await response.json();
      setCustomers((prev) => (prev ? [...prev, newCustomer] : [newCustomer]));
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditCustomer = async (customer: Customer) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/customers/${customer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        }
      );
      if (!response.ok) throw new Error("Failed to update customer");
      const updatedCustomer = await response.json();
      setCustomers((prev) =>
        prev
          ? prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
          : []
      );
      setIsModalOpen(false);
      setSelectedCustomer(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/customers/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete customer");
        setCustomers((prev) => (prev ? prev.filter((c) => c.id !== id) : []));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/customers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) throw new Error("Failed to update status");
      const updatedCustomer = await response.json();
      setCustomers((prev) =>
        prev ? prev.map((c) => (c.id === id ? updatedCustomer : c)) : []
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div
      className={`h-full flex flex-col space-y-4  p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "text-slate-500"
      }`}
    >
      <User />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Customers</h2>
        <button
          onClick={() => {
            setSelectedCustomer(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center shadow-md hover:bg-blue-700 transition-all"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden flex-1">
        <table className="min-w-full divide-y divide-gray-200 border-b border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Status", "Assigned To", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link
                    to={`/customers/${customer.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {customer.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.email || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      customer.status === "active"
                        ? "bg-green-100 text-green-800"
                        : customer.status === "inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                    value={customer.status}
                    onChange={(e) =>
                      handleStatusChange(customer.id, e.target.value)
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.assigned_to_name || "Unassigned"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <select
                    className="bg-gray-200 p-2 rounded-md"
                    onChange={(e) => {
                      const action = e.target.value;
                      if (action === "edit") {
                        setSelectedCustomer(customer);
                        setIsModalOpen(true);
                      } else if (action === "delete") {
                        handleDeleteCustomer(customer.id);
                      }
                    }}
                  >
                    <option value=""></option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={(data) => {
          if (selectedCustomer) {
            handleEditCustomer({ ...selectedCustomer, ...data });
          } else {
            handleAddCustomer(data);
          }
        }}
        users={users}
        initialData={selectedCustomer || undefined}
      />
    </div>
  );
};

export default Customers;
