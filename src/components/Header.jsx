import { useState } from "react";
import AddFlashCard from "./AddFlashcard";
import Modal from "./Modal";

const Header = ({ setId, onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <header className="bg-stone-500 text-white p-4 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      <h1 className="text-2xl font-bold">Lernkarten</h1>
      <button
        className="bg-stone-700 text-white px-4 py-2 rounded"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Schließen" : "Lernkarte hinzufügen"}
      </button>
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <AddFlashCard setId={setId} onAdd={onAdd} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
