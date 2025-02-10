import React, { useRef } from "react";

const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-lg relative z-50"
      >
        <button
          ref={modalRef}
          className="absolute top-2 right-2 text-stone-900 text-2xl hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
