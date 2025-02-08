import { useState } from "react";
import AddSet from "./AddSet";

const Sidebar = ({ sets, selectedSet, setSelectedSet, onAddSet }) => {
  const [showAddSetForm, setShowAddSetForm] = useState(false);

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-stone-500 text-stone-50 p-4 ">
      <h2 className="text-xl font-bold mb-4">Deine Sets</h2>
      <button
        className="bg-stone-700 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowAddSetForm(!showAddSetForm)}
      >
        {showAddSetForm ? "Schließen" : "Neues Set hinzufügen"}
      </button>
      {showAddSetForm && <AddSet onAdd={onAddSet} />}
      <ul>
        {sets.map((set) => (
          <li
            key={set.id}
            className={`p-2 cursor-pointer ${
              selectedSet && selectedSet.id === set.id
                ? " text-white bg-stone-400"
                : "bg-stone-500"
            }`}
            onClick={() => setSelectedSet(set)}
          >
            {set.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
