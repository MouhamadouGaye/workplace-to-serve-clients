import React, { useState } from "react";

const HoverSelect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      <button style={{ padding: "10px", cursor: "pointer" }}>Select</button>
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            margin: 0,
            padding: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            listStyle: "none",
          }}
        >
          <li style={{ padding: "5px 10px", cursor: "pointer" }}>Option 1</li>
          <li style={{ padding: "5px 10px", cursor: "pointer" }}>Option 2</li>
          <li style={{ padding: "5px 10px", cursor: "pointer" }}>Option 3</li>
        </ul>
      )}
    </div>
  );
};

export default HoverSelect;
