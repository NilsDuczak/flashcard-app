// src/components/ToggleAddSetButton.jsx
import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const ToggleAddSetButton = ({ showAddSetForm, setShowAddSetForm }) => {
  return (
    <button
      className="bg-gray-700 text-white p-1 rounded-lg mb-1"
      onClick={() => setShowAddSetForm(!showAddSetForm)}
    >
      {showAddSetForm ? (
        <FaMinus size={24} className="hover:text-red-300" />
      ) : (
        <FaPlus size={24} className="hover:text-green-400" />
      )}
    </button>
  );
};

export default ToggleAddSetButton;
