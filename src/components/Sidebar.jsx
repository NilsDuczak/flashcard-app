import { useState } from "react";
import AddSet from "./AddSet";
import Logo from "../assets/logo.png";

const Sidebar = ({ sets, selectedSet, setSelectedSet, onAddSet }) => {
  const [showAddSetForm, setShowAddSetForm] = useState(false);

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-stone-500 text-stone-50 p-4 ">
      <div className="mb-4 flex justify-center items-center w-full h-32">
        <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
      </div>

      <button
        className="bg-stone-700 text-white px-8 py-2 rounded-lg mb-4 hover:bg-stone-600 w-full"
        onClick={() => setShowAddSetForm(!showAddSetForm)}
      >
        {showAddSetForm ? "Schließen" : "Neues Set hinzufügen"}
      </button>
      {showAddSetForm && <AddSet onAdd={onAddSet} />}
      <h2 className="text-xl font-bold mb-4 pt-5 text-center border-b-2">
        Deine Sets
      </h2>
      <ul>
        {sets.map((set) => (
          <li
            key={set.id}
            className={`p-2 cursor-pointer text-center rounded-lg mt-2 ${
              selectedSet && selectedSet.id === set.id
                ? " text-white bg-stone-400 "
                : "bg-stone-500 "
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
