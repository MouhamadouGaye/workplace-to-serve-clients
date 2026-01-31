// components/ActionDropdown.js
import { useState } from "react";
import { SlOptions } from "react-icons/sl"; // Adjust the import based on your setup

// utils/actions.js

const handleAction = (action, contact) => {
  if (action === "call") {
    window.open(`tel:${contact.phone}`);
  } else if (action === "email") {
    window.open(`mailto:${contact.email}`);
  } else if (action === "chat") {
    console.log("Open chat with:", contact.name);
  }
};

const ActionDropdown = ({ contact }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <SlOptions />
      </button>
      {isOpen && (
        <ul className="absolute bg-white border rounded shadow-md z-10">
          {contact.phone && (
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAction("call", contact)}
            >
              Call
            </li>
          )}
          {contact.email && (
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAction("email", contact)}
            >
              Email
            </li>
          )}
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleAction("chat", contact)}
          >
            Chat
          </li>
        </ul>
      )}
    </div>
  );
};

export default ActionDropdown;
