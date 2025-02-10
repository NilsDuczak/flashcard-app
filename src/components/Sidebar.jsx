import { useState } from "react";
import AddSet from "./AddSet";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AddFlashCard from "./AddFlashcard";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Sidebar = ({
  sets,
  selectedSet,
  setSelectedSet,
  onAddSet,
  onDeleteSet,
  setId,
  onAdd,
}) => {
  {
    /*States */
  }
  const [showAddSetForm, setShowAddSetForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setToDelete, setSetToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);

  {
    /*Modal Functions */
  }
  const openModal = (setId) => {
    setSetToDelete(setId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSetToDelete(null);
  };

  const handleDeleteSet = async (setId) => {
    await onDeleteSet(setId);
    closeModal();
  };

  return (
    <aside className="fixed top-0 bottom-0 left-0 w-64 bg-stone-500 text-stone-50 p-4 border-r rounded-r-3xl overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-left ">Deine Sets</h2>
        <button
          className="bg-stone-700 text-white p-1 rounded-lg  mb-1"
          onClick={() => setShowAddSetForm(!showAddSetForm)}
        >
          {showAddSetForm ? (
            <FaMinus size={24} className="hover:text-red-300" />
          ) : (
            <FaPlus size={24} className="hover:text-green-400" />
          )}
        </button>
      </div>
      <hr className="border-t-2 border-gray-300 pb-2" />
      {showAddSetForm && <AddSet onAdd={onAddSet} />}
      <ul>
        {sets.map((set) => (
          <li
            key={set.id}
            className={`p-2 cursor-pointer text-center rounded-lg flex items-center justify-between mt-2 overflow-hidden${
              selectedSet && selectedSet.id === set.id
                ? " text-white bg-stone-400 "
                : "bg-stone-500 "
            } `}
            onClick={() => setSelectedSet(set)}
          >
            <span className="flex-1 text-left truncate">{set.name}</span>
            <button
              className="hover:text-red-500 "
              onClick={(e) => {
                e.stopPropagation();
                openModal(set.id);
              }}
            >
              <FaTrashAlt size={20} />
            </button>
          </li>
        ))}
      </ul>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteSet}
        setId={setToDelete}
      />

      <h2 className="text-xl font-bold text-left pt-10 truncate">
        <hr className="border-t-2 border-gray-300 pb-2 " />
        {selectedSet
          ? `Aktuelles Set: ${selectedSet.name}`
          : "Bitte wähl ein Set aus oder erstell ein neues"}
      </h2>
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <AddFlashCard setId={setId} onAdd={onAdd} />
        </Modal>
      )}
      {selectedSet && (
        <button
          className="bg-stone-700 text-stone-100 px-4 py-2 rounded-lg hover:bg-stone-600 w-full mt-4"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "" : "Lernkarte hinzufügen"}
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
