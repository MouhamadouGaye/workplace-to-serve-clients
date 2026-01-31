import React, { useState } from "react";
import { createAppointment } from "../api/dealServices";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentCreated: () => void; // Callback to refresh appointments
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onAppointmentCreated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async () => {
    if (!title || !date || !time) {
      alert("Please fill all the required fields.");
      return;
    }

    try {
      await createAppointment({ title, description, date, time });
      onAppointmentCreated(); // Refresh appointments
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create the appointment. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Appointment</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full border rounded px-2 py-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Time</label>
          <input
            type="time"
            className="w-full border rounded px-2 py-1"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
