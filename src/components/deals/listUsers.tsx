import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchUsers } from "../../api/"; // API to fetch users

interface User {
  id: number;
  name: string;
}

interface DealPageProps {
  onUserAssign: (userId: number) => void;
}

const DealPage: React.FC<DealPageProps> = ({ onUserAssign }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch users from API when the component mounts
    fetchUsers().then(setUsers);
  }, []);

  const handleUserChange = (selected: User | null) => {
    setSelectedUser(selected);
    if (selected) {
      onUserAssign(selected.id); // Pass selected user ID to parent or API
    }
  };

  return (
    <div className="deal-page">
      <h2 className="text-lg font-semibold">Assign User to Deal</h2>
      <Select
        options={users.map((user) => ({ value: user.id, label: user.name }))}
        value={selectedUser ? { value: selectedUser.id, label: selectedUser.name } : null}
        onChange={(option) =>
          handleUserChange(option ? { id: option.value, name: option.label } : null)
        }
        placeholder="Select a user..."
        isSearchable
        className="mt-2"
      />
    </div>
  );
};

export default DealPage;
