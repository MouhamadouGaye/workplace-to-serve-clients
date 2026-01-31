// import React, { useState } from "react";
// import { Deal } from "../types"; // Import Deal type

// interface CalendarProps {
//   deals: Deal[];
// }

// const Calendar: React.FC<CalendarProps> = ({ deals }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const startOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     1
//   );
//   const endOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//     0
//   );

//   const daysInMonth = Array.from(
//     { length: endOfMonth.getDate() },
//     (_, i) => i + 1
//   );

//   const prevMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//     );
//   };

//   const nextMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//     );
//   };

//   const formatDate = (date: Date): string => {
//     return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
//   };

//   const dealsByDate = deals.reduce((acc, deal) => {
//     const date = deal.expected_close_date;
//     if (date) {
//       acc[date] = acc[date] || [];
//       acc[date].push(deal);
//     }
//     return acc;
//   }, {} as Record<string, Deal[]>);

//   return (
//     <div className="p-4 bg-gray-100 rounded shadow-md">
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={prevMonth}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Previous
//         </button>
//         <h2 className="text-xl font-bold">
//           {currentDate.toLocaleString("default", { month: "long" })}{" "}
//           {currentDate.getFullYear()}
//         </h2>
//         <button
//           onClick={nextMonth}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Next
//         </button>
//       </div>
//       <div className="grid grid-cols-7 gap-2">
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//           <div key={day} className="font-bold text-center">
//             {day}
//           </div>
//         ))}
//       </div>
//       <div className="grid grid-cols-7 gap-2 mt-2">
//         {Array.from({ length: startOfMonth.getDay() }, (_, i) => (
//           <div key={`empty-start-${i}`} />
//         ))}
//         {daysInMonth.map((day) => {
//           const date = formatDate(
//             new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
//           );
//           const dayDeals = dealsByDate[date] || [];

//           return (
//             <div
//               key={day}
//               className="p-2 border rounded bg-white text-center flex flex-col items-center"
//             >
//               <div>{day}</div>
//               {dayDeals.length > 0 && (
//                 <div className="mt-1">
//                   {dayDeals.map((deal) => (
//                     <span
//                       key={deal.id}
//                       className="block text-xs bg-green-200 text-green-800 rounded px-1 py-0.5 mb-1"
//                       title={deal.title}
//                     >
//                       {deal.title}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Calendar;

// import React, { useState } from "react";
// import { Deal } from "../api/dealServices";
// import { createEvent, deleteEvent, fetchEvents, updateEvent } from "../api/eventServices";

// interface CalendarModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   deals: Deal[];
// }

// const CalendarModal: React.FC<CalendarModalProps> = ({
//   isOpen,
//   onClose,
//   deals,
// }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [isCalendarVisible, setIsCalendarVisible] = useState(true);
//   const [events, setEvents] = useState<Event[]>([]);

//   const startOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     1
//   );
//   const endOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//     0
//   );
//   const daysInMonth = Array.from(
//     { length: endOfMonth.getDate() },
//     (_, i) => i + 1
//   );

//   const prevMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//     );
//   };

//   const nextMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//     );
//   };

//   const formatDate = (date: Date): string => {
//     return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
//   };

//   const dealsByDate = deals.reduce((acc, deal) => {
//     const date = deal.expected_close_date;
//     if (date) {
//       acc[date] = acc[date] || [];
//       acc[date].push(deal);
//     }
//     return acc;
//   }, {} as Record<string, Deal[]>);

//   useEffect(() => {
//     // Fetch events when the component mounts
//     fetchEvents(userId).then(setEvents);
//   }, [userId]);

//   const handleCreateEvent = async (event: Omit<Event, 'id'>) => {
//     const newEvent = await createEvent(event);
//     setEvents((prev) => [...prev, newEvent]);
//   };

//   const handleUpdateEvent = async (id: number, event: Event) => {
//     const updatedEvent = await updateEvent(id, event);
//     setEvents((prev) => prev.map((e) => (e.id === id ? updatedEvent : e)));
//   };

//   const handleDeleteEvent = async (id: number) => {
//     await deleteEvent(id);
//     setEvents((prev) => prev.filter((e) => e.id !== id));
//   };

//   return (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
//         isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-96 max-w-full transition-transform transform scale-95 hover:scale-100">
//         <div className="flex justify-between items-center">
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 p-2"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//           <h2 className="text-lg font-semibold">
//             {currentDate.toLocaleString("default", { month: "long" })}{" "}
//             {currentDate.getFullYear()}
//           </h2>
//           <button onClick={prevMonth} className="text-blue-500">
//             Prev
//           </button>
//           <button onClick={nextMonth} className="text-blue-500">
//             Next
//           </button>
//         </div>

//         <div className="grid grid-cols-7 gap-1 mt-4 text-center">
//           {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//             <div key={day} className="font-semibold">
//               {day}
//             </div>
//           ))}
//           {Array.from({ length: startOfMonth.getDay() }, (_, i) => (
//             <div key={`empty-start-${i}`} />
//           ))}
//           {daysInMonth.map((day) => {
//             const date = formatDate(
//               new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
//             );
//             const dayDeals = dealsByDate[date] || [];

//             return (
//               <div
//                 key={day}
//                 className="p-2 bg-gray-100 rounded-md hover:bg-blue-200 cursor-pointer"
//               >
//                 <div>{day}</div>
//                 {dayDeals.length > 0 && (
//                   <div className="mt-1 text-xs">
//                     {dayDeals.map((deal) => (
//                       <span
//                         key={deal.id}
//                         className="bg-blue-200 text-blue-700 rounded px-1 py-0.5 mb-1 block"
//                         title={deal.title}
//                       >
//                         {deal.title}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarModal;

import React, { useEffect, useState } from "react";
import { Deal } from "../api/dealServices";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  updateEvent,
} from "../api/eventServices";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  deals: Deal[];
  userId: number; // Pass userId from the parent component
}

const Calendar: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  deals,
  userId,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    // Fetch events for the user when the component mounts
    fetchEvents(userId).then(setEvents);
  }, [userId]);

  // Calculate the start and end of the month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => i + 1
  );

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const dealsByDate = deals.reduce((acc, deal) => {
    const date = formatDate(new Date(deal.expected_close_date)); // Ensure it's formatted correctly
    if (date) {
      acc[date] = acc[date] || [];
      acc[date].push(deal);
    }
    return acc;
  }, {} as Record<string, Deal[]>);

  const handleCreateEvent = async (event: Omit<Event, "id">) => {
    const newEvent = await createEvent(event);
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleUpdateEvent = async (id: number, updatedEvent: Event) => {
    const event = await updateEvent(id, updatedEvent);
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...event } : e))
    );
  };

  const handleDeleteEvent = async (id: number) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(selectedDate);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-96 max-w-full transition-transform transform scale-95 hover:scale-100">
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>
          <button onClick={prevMonth} className="text-blue-500">
            Prev
          </button>
          <button onClick={nextMonth} className="text-blue-500">
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mt-4 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-semibold">
              {day}
            </div>
          ))}
          {Array.from({ length: startOfMonth.getDay() }, (_, i) => (
            <div key={`empty-start-${i}`} />
          ))}
          {daysInMonth.map((day) => {
            const date = formatDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            );
            const dayDeals = dealsByDate[date] || [];

            return (
              <div
                key={day}
                className="p-2 bg-gray-100 rounded-md hover:bg-blue-200 cursor-pointer"
                onClick={() => handleDateClick(day)}
              >
                <div>{day}</div>
                {dayDeals.length > 0 && (
                  <div className="mt-1 text-xs">
                    {dayDeals.map((deal) => (
                      <span
                        key={deal.id}
                        className="bg-blue-200 text-blue-700 rounded px-1 py-0.5 mb-1 block"
                        title={deal.title}
                      >
                        {deal.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal for creating or editing events */}
        {selectedDate && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              Create Event for {selectedDate.toLocaleDateString()}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const event = {
                  user_id: userId,
                  title: "New Event",
                  description: "Meeting with contact",
                  start_time: selectedDate.toISOString(),
                  end_time: new Date(
                    selectedDate.getTime() + 60 * 60 * 1000
                  ).toISOString(),
                  location: "Online",
                  reminder_time: new Date(
                    selectedDate.getTime() - 15 * 60 * 1000
                  ).toISOString(), // 15 minutes before
                };
                handleCreateEvent(event);
                setSelectedDate(null); // Close modal after event is created
              }}
            >
              <input
                type="submit"
                value="Create Event"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
