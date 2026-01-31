import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fetchCustomers } from "../../api/customerServices";
import { Customer } from "../../types";

interface CustomerDropdownProps {
  onContactSelect: (contactId: number) => void;
}

const CustomerDropdown: React.FC<CustomerDropdownProps> = ({
  onContactSelect,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  useEffect(() => {
    // Fetch contacts from API
    fetchCustomers().then(setCustomers);
  }, []);

  const handleCustomerChange = (
    selected: { value: number; label: string } | null
  ) => {
    const customer = selected
      ? { id: selected.value, name: selected.label }
      : null;
    setSelectedCustomer(customer);
    if (customer) {
      onContactSelect(customer.id); // Trigger callback with selected contact ID
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Assign Customer</h2>
      <Select
        options={customers.map((customer) => ({
          value: customer.id,
          label: `${customer.name} (${customer.email})`,
        }))}
        value={
          selectedCustomer
            ? { value: selectedCustomer.id, label: selectedCustomer.name }
            : null
        }
        onChange={handleCustomerChange}
        placeholder="Select a contact..."
        isSearchable
        className="mt-2"
      />
    </div>
  );
};

export default CustomerDropdown;
