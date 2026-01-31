import React from "react";
import { useAuth } from "../hooks/AuthContext";

const User = () => {
  const { user } = useAuth();
  return (
    <h2 className="text-sm font-bold text-white right-4 top-0 absolute bg-slate-400 px-3 rounded ">
      <span className="p-1 bg-green-200 text-green-600 rounded/lg border border-green-900 rounded-full">
        {user?.role.charAt(0).toLocaleUpperCase()}
      </span>{" "}
      {user?.name || "Guest"}
    </h2>
  );
};

export default User;
