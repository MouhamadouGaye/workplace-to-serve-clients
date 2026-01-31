// import React from "react";
// import { useAuth } from "../hooks/AuthContext";

// const Deals = () => {
//   const { user } = useAuth();
//   return (
//     <div>
//       <h2 className="text-sm font-bold text-white right-4 top-0 absolute bg-slate-400 px-3 rounded ">
//         <span className="p-1 bg-green-200 text-green-600 rounded/lg border border-green-900">
//           {user?.role.charAt(0).toLocaleUpperCase()}
//         </span>{" "}
//         {user?.name || "Guest"}
//       </h2>

//       <h1>Deals !</h1>
//     </div>
//   );
// };

// export default Deals;

// import React, { useEffect, useState } from "react";
// import { fetchDeals, Deal } from "../api/dealServices";
// import Calendar from "./Calendar";

// const Deals: React.FC = () => {
//   const [deals, setDeals] = useState<Deal[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const loadDeals = async () => {
//       try {
//         setLoading(true);
//         const fetchedDeals = await fetchDeals();
//         setDeals(fetchedDeals);
//       } catch (error) {
//         console.error("Error fetching deals:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDeals();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Deals</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Deals List</h2>
//             <table className="min-w-full border-collapse border border-gray-200">
//               <thead>
//                 <tr>
//                   <th className="border border-gray-300 px-4 py-2">Title</th>
//                   <th className="border border-gray-300 px-4 py-2">Amount</th>
//                   <th className="border border-gray-300 px-4 py-2">
//                     Expected Close Date
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {deals.map((deal) => (
//                   <tr key={deal.id}>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {deal.title}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       ${deal.amount}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {deal.expected_close_date}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <Calendar deals={deals} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Deals;

// import React, { useEffect, useState } from "react";
// import { fetchDeals, Deal } from "../api/dealServices";
// import CalendarModal from "./Calendar";
// import ContactDropdown from "./deals/ListContact";
// import { useAuth } from "../hooks/AuthContext";

// const Deals: React.FC = () => {
//   const { user } = useAuth();

//   const [deals, setDeals] = useState<Deal[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isCalendarModalOpen, setIsCalendarModalOpen] =
//     useState<boolean>(false);
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   useEffect(() => {
//     const loadDeals = async () => {
//       try {
//         setLoading(true);
//         const fetchedDeals = await fetchDeals();
//         setDeals(fetchedDeals);
//       } catch (error) {
//         console.error("Error fetching deals:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDeals();
//   }, []);

//   const openCalendarModal = () => {
//     setIsCalendarModalOpen(true);
//   };

//   const closeCalendarModal = () => {
//     setIsCalendarModalOpen(false);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-sm font-bold text-white right-4 top-0 absolute bg-slate-400 px-3 rounded ">
//         <span className="p-1 bg-green-200 text-green-600 rounded/lg border border-green-900">
//           {user?.role.charAt(0).toLocaleUpperCase()}
//         </span>{" "}
//         {user?.name || "Guest"}
//       </h2>
//       <h1 className="text-2xl font-bold mb-4">Deals</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <button
//             onClick={openCalendarModal}
//             className="px-4 py-2 border-cyan-500 border-2 text-cyan-500 hover:bg-cyan-200 hover:text-cyan-800 rounded mb-4 mx-2"
//           >
//             Calendar
//           </button>
//           <button
//             onClick={() => setIsOpen((prev) => !prev)}
//             className="px-4 py-2 border-cyan-500 border-2 text-cyan-500 hover:bg-cyan-200 hover:text-cyan-800 rounded mb-4"
//           >
//             {isOpen ? "- Contacts" : " + Contacts"}
//           </button>

//           <table className="min-w-full border-collapse border border-gray-200 mb-8">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2">Title</th>
//                 <th className="border border-gray-300 px-4 py-2">Amount</th>
//                 <th className="border border-gray-300 px-4 py-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {deals.map((deal) => (
//                 <tr key={deal.id}>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {deal.title}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     ${deal.amount}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {deal.status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {isOpen && <ContactDropdown />}

//           <CalendarModal
//             isOpen={isCalendarModalOpen}
//             onClose={closeCalendarModal}
//             deals={deals}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Deals;

import React, { useEffect, useState } from "react";
import { fetchDeals, Deal, createDeal } from "../api/dealServices";
import { sendEmail } from "../api/emailServices";
import { createAppointment, Appointment } from "../api/appointmentServices";
import CalendarModal from "./Calendar";
import ContactDropdown from "./deals/ListContact";
import CustomerDropdown from "./deals/ListCustomers";
import { useAuth } from "../hooks/AuthContext";

const Deals: React.FC = ({ isDarkMode }) => {
  const { user } = useAuth();

  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [isCalendarModalOpen, setIsCalendarModalOpen] =
    useState<boolean>(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] =
    useState<boolean>(false);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] =
    useState<boolean>(false);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [appointmentDate, setAppointmentDate] = useState<string>("");

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        const fetchedDeals = await fetchDeals();
        setDeals(fetchedDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  const handleCreateDeal = async () => {
    if (!selectedCustomerId) {
      alert("Please select a contact.");
      return;
    }
    try {
      const newDeal = await createDeal({
        customer_id: selectedCustomerId,
        user_id: user?.id,
        title: "New Deal",
        amount: 1000,
        status: "Pending",
        stage: "Prospecting",
        expected_close_date: new Date().toISOString(),
      });
      setDeals((prev) => [...prev, newDeal]);
      alert("Deal created successfully!");
    } catch (error) {
      console.error("Error creating deal:", error);
    }
  };

  const handleScheduleAppointment = async () => {
    if (!appointmentDate || !selectedCustomerId) {
      alert("Please select a contact and date for the appointment.");
      return;
    }
    try {
      const appointment: Partial<Appointment> = {
        contact_id: selectedCustomerId,
        user_id: user?.id,
        date: appointmentDate,
        notes: "Follow-up appointment.",
      };
      await createAppointment(appointment);
      alert("Appointment scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling appointment:", error);
    }
  };

  const handleSendEmail = async () => {
    if (!selectedCustomertId) {
      alert("Please select a contact to send the email.");
      return;
    }
    try {
      await sendEmail({
        to: "contact@example.com", // Replace with dynamic email address
        subject: "Follow-up on Deal",
        body: "This is a follow-up email regarding your recent deal.",
      });
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div
      className={`p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-sm font-bold text-white right-4 top-0 absolute bg-slate-400 px-3 rounded ">
        <span className="p-1 bg-green-200 text-green-600 rounded/lg border border-green-900">
          {user?.role.charAt(0).toLocaleUpperCase()}
        </span>{" "}
        {user?.name || "Guest"}
      </h2>
      <h1 className="text-2xl font-bold mb-4">Deals</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="//all buttons that I got at the top">
          <button
            onClick={() => setIsCalendarModalOpen(true)}
            className="px-4 py-2 border-cyan-500 border-2 text-cyan-500 hover:bg-cyan-200 hover:text-cyan-800 rounded mb-4 mx-2"
          >
            Calendar
          </button>
          <button
            onClick={() => setIsContactDropdownOpen((prev) => !prev)}
            className="px-4 py-2 border-cyan-500 border-2 text-cyan-500 hover:bg-cyan-200 hover:text-cyan-800 rounded mb-4"
          >
            {isContactDropdownOpen ? "- Contacts" : " + Contacts"}
          </button>

          <button
            onClick={() => setIsCustomerDropdownOpen((prev) => !prev)}
            className="px-4 py-2 border-cyan-500 border-2 text-cyan-500 hover:bg-cyan-200 hover:text-cyan-800 rounded mb-4"
          >
            {isCustomerDropdownOpen ? "- Customers" : " + Customers"}
          </button>

          <button
            onClick={handleCreateDeal}
            className="px-4 py-2 border-cyan-500 border-2 text-cyan-500 hover:bg-cyan-200 hover:text-cyan-800 rounded mb-4"
          >
            Create Deal
          </button>

          <button
            onClick={handleScheduleAppointment}
            className="px-4 py-2 border-cyan-500 border-2 text-cyan-500 hover:bg-cyan-200 hover:text-cyan-800 rounded mb-4"
          >
            Schedule Appointment
          </button>

          <button
            onClick={handleSendEmail}
            className="px-4 py-2 border-cyan-500 border-2 text-cyan-500 hover:bg-cyan-200 hover:text-cyan-800 rounded mb-4"
          >
            Send Email
          </button>

          {isContactDropdownOpen && (
            <div className="mt-4">
              <ContactDropdown
                onContactSelect={(id) => setSelectedContactId(id)}
              />
            </div>
          )}
          {isCustomerDropdownOpen && (
            <div className="mt-4">
              <CustomerDropdown
                onContactSelect={(id) => setSelectedCustomertId(id)}
              />
            </div>
          )}

          <table className="min-w-full border-collapse border border-gray-200 mb-8 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => (
                <tr key={deal.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {deal.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${deal.amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {deal.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <CalendarModal
            isOpen={isCalendarModalOpen}
            onClose={() => setIsCalendarModalOpen(false)}
            deals={deals}
          />
        </div>
      )}
    </div>
  );
};

export default Deals;

// import React, { useEffect, useState } from "react";
// import { fetchDeals, Deal, createDeal } from "../api/dealServices";
// import { sendEmail } from "../api/emailServices";
// import { createAppointment, Appointment } from "../api/appointmentServices";
// import CalendarModal from "./Calendar";
// import ContactDropdown from "./deals/ListContact";
// import CustomerDropdown from "./deals/ListCustomers";
// import { useAuth } from "../hooks/AuthContext";

// const Deals: React.FC = () => {
//   const { user } = useAuth();

//   const [deals, setDeals] = useState<Deal[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isCalendarModalOpen, setIsCalendarModalOpen] =
//     useState<boolean>(false);
//   const [isContactDropdownOpen, setIsContactDropdownOpen] =
//     useState<boolean>(false);
//   const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] =
//     useState<boolean>(false);
//   const [selectedContactId, setSelectedContactId] = useState<number | null>(
//     null
//   );
//   const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
//     null
//   );
//   const [appointmentDate, setAppointmentDate] = useState<string>("");

//   useEffect(() => {
//     const loadDeals = async () => {
//       try {
//         setLoading(true);
//         const fetchedDeals = await fetchDeals();
//         setDeals(fetchedDeals);
//       } catch (error) {
//         console.error("Error fetching deals:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDeals();
//   }, []);

//   const handleCreateDeal = async () => {
//     if (!selectedCustomerId) {
//       alert("Please select a customer.");
//       return;
//     }
//     try {
//       const newDeal = await createDeal({
//         customer_id: selectedCustomerId,
//         user_id: user?.id,
//         title: "New Deal",
//         amount: 1000,
//         status: "Pending",
//         stage: "Prospecting",
//         expected_close_date: new Date().toISOString(),
//       });
//       setDeals((prev) => [...prev, newDeal]);
//       alert("Deal created successfully!");
//     } catch (error) {
//       console.error("Error creating deal:", error);
//     }
//   };

//   const handleScheduleAppointment = async () => {
//     if (!appointmentDate || !selectedContactId) {
//       alert("Please select a contact and date for the appointment.");
//       return;
//     }
//     try {
//       const appointment: Partial<Appointment> = {
//         contact_id: selectedContactId,
//         date: appointmentDate,
//         notes: "Follow-up appointment.",
//       };
//       await createAppointment(appointment);
//       alert("Appointment scheduled successfully!");
//     } catch (error) {
//       console.error("Error scheduling appointment:", error);
//     }
//   };

//   const handleSendEmail = async () => {
//     if (!selectedContactId) {
//       alert("Please select a contact to send the email.");
//       return;
//     }
//     try {
//       await sendEmail({
//         recipient: "contact@example.com", // Replace with actual contact email
//         subject: "Follow-up on Deal",
//         message: "This is a follow-up email regarding your recent deal.",
//       });
//       alert("Email sent successfully!");
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
//       {/* User Info */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Deals</h1>
//         <div className="text-sm font-bold text-white bg-gray-500 px-3 py-1 rounded">
//           <span className="bg-green-200 text-green-600 px-2 py-1 rounded">
//             {user?.role.charAt(0).toUpperCase()}
//           </span>{" "}
//           {user?.name || "Guest"}
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="flex flex-wrap gap-4 mb-4">
//         <button
//           onClick={() => setIsCalendarModalOpen(true)}
//           className="btn-primary"
//         >
//           Calendar
//         </button>
//         <button
//           onClick={() => setIsContactDropdownOpen((prev) => !prev)}
//           className="btn-primary"
//         >
//           {isContactDropdownOpen ? "Hide Contacts" : "Show Contacts"}
//         </button>
//         <button
//           onClick={() => setIsCustomerDropdownOpen((prev) => !prev)}
//           className="btn-primary"
//         >
//           {isCustomerDropdownOpen ? "Hide Customers" : "Show Customers"}
//         </button>
//         <button onClick={handleCreateDeal} className="btn-primary">
//           Create Deal
//         </button>
//         <button onClick={handleScheduleAppointment} className="btn-primary">
//           Schedule Appointment
//         </button>
//         <button onClick={handleSendEmail} className="btn-primary">
//           Send Email
//         </button>
//       </div>

//       {/* Dropdowns */}
//       {isContactDropdownOpen && (
//         <ContactDropdown onContactSelect={(id) => setSelectedContactId(id)} />
//       )}
//       {isCustomerDropdownOpen && (
//         <CustomerDropdown onContactSelect={(id) => setSelectedCustomerId(id)} />
//       )}

//       {/* Deals Table */}
//       {loading ? (
//         <p>Loading deals...</p>
//       ) : (
//         <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Title</th>
//               <th className="border px-4 py-2">Amount</th>
//               <th className="border px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {deals.map((deal) => (
//               <tr key={deal.id}>
//                 <td className="border px-4 py-2">{deal.title}</td>
//                 <td className="border px-4 py-2">${deal.amount}</td>
//                 <td className="border px-4 py-2">{deal.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Calendar Modal */}
//       <CalendarModal
//         isOpen={isCalendarModalOpen}
//         onClose={() => setIsCalendarModalOpen(false)}
//         deals={deals}
//       />
//     </div>
//   );
// };

// export default Deals;
