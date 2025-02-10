import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, setId }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Bestätigung"
      className="modal bg-stone-500 p-6 rounded-lg w-1/3 mx-auto text-center border border-2xl border-stone-100"
      overlayClassName="overlay bg-black bg-opacity-40 fixed inset-0 flex items-center justify-center "
    >
      <h2 className="text-xl text-white mb-6  ">
        Möchtest du dieses Set wirklich löschen? <br />
        Alle dazugehörigen Karten gehen dabei verloren.
      </h2>
      <div className="flex justify-center space-x-4">
        <button
          className="px-7 py-2 bg-stone-600 text-white rounded-lg hover:bg-red-600 transition-all border border-stone-100"
          onClick={() => onConfirm(setId)}
        >
          Ja
        </button>
        <button
          className="px-6 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-500 transition-all border border-stone-100"
          onClick={onClose}
        >
          Nein
        </button>
      </div>
    </Modal>
  );
};
export default ConfirmDeleteModal;
