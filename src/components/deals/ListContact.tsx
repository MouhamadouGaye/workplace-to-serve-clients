import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fetchContacts } from "../../api/contactServices"; // API to fetch contacts
import { Contact } from "../../types";

interface ContactDropdownProps {
  onContactSelect: (contactId: number) => void;
}

const ContactDropdown: React.FC<ContactDropdownProps> = ({
  onContactSelect,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    // Fetch contacts from API
    fetchContacts().then(setContacts);
  }, []);

  const handleContactChange = (
    selected: { value: number; label: string } | null
  ) => {
    const contact = selected
      ? { id: selected.value, name: selected.label }
      : null;
    setSelectedContact(contact);
    if (contact) {
      onContactSelect(contact.id); // Trigger callback with selected contact ID
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Assign Contact</h2>
      <Select
        options={contacts.map((contact) => ({
          value: contact.id,
          label: `${contact.name} (${contact.email})`,
        }))}
        value={
          selectedContact
            ? { value: selectedContact.id, label: selectedContact.name }
            : null
        }
        onChange={handleContactChange}
        placeholder="Select a contact..."
        isSearchable
        className="mt-2"
      />
    </div>
  );
};

export default ContactDropdown;
