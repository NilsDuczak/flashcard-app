import { useState } from "react";
import AddSetModal from "./AddSetModal";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ShowCurrentSet from "./ShowCurrentSet";
import ToggleAddSetButton from "./ToggleAddSetButton";
const Sidebar = ({
  sets,
  selectedSet,
  setSelectedSet,
  onAddSet,
  onDeleteSet,
  onOpenAddFlashcard,
}) => {
  const [showAddSetForm, setShowAddSetForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setToDelete, setSetToDelete] = useState(null);

  const openModal = (setId) => {
    setSetToDelete(setId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSetToDelete(null);
  };

  return (
    <aside className="fixed top-0 bottom-0 left-0 w-64 bg-gray-600 text-stone-50 p-4 rounded-tr-3xl overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-left">Deine Sets</h2>
        <ToggleAddSetButton
          showAddSetForm={showAddSetForm}
          setShowAddSetForm={setShowAddSetForm}
        />
      </div>
      <hr className="border-t-2 border-gray-200 pb-2" />
      {showAddSetForm && <AddSetModal onAdd={onAddSet} />}

      <ul>
        {sets.map((set) => (
          <li
            key={set.id}
            className={`p-2 cursor-pointer text-center rounded-lg flex items-center justify-between mt-2 overflow-hidden ${
              selectedSet && selectedSet.id === set.id
                ? "text-white bg-gray-400"
                : "bg-gray-500"
            }`}
            onClick={() => setSelectedSet(set)}
          >
            <span className="flex-1 text-left truncate">{set.name}</span>
            <button
              className="hover:text-red-500"
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
        onConfirm={
          onDeleteSet ||
          (() => {
            setIsModalOpen(false);
          })
        }
        setId={setToDelete}
      />

      <ShowCurrentSet selectedSet={selectedSet} />

      {selectedSet && (
        <button
          className="bg-gray-800 text-stone-100 px-4 py-2 rounded-lg hover:bg-gray-900 w-full mt-4"
          onClick={onOpenAddFlashcard}
        >
          Lernkarte hinzufügen
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
