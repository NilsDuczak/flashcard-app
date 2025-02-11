import React, { useRef, useState } from "react";
import supabase from "./supabaseClient";

const AddFlashcardModal = ({ setId, onAdd, onClose }) => {
  const modalRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) {
      alert("Bitte Frage und Antwort eingeben!");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("flashcards")
      .insert([{ question, answer, set_id: setId }])
      .select();

    setLoading(false);

    if (error) {
      console.error("Error inserting flashcard:", error);
      alert(`Fehler beim Hinzufügen der Lernkarte: ${error.message}`);
    } else if (data && data.length > 0) {
      onAdd(data[0]);
      setQuestion("");
      setAnswer("");
      onClose();
    } else {
      alert("Keine Daten von Supabase erhalten!");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-lg relative z-60 w-96"
      >
        <button
          className="absolute top-2 right-2 text-stone-900 text-2xl hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Neue Lernkarte hinzufügen</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="font-bold">Frage:</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-2 rounded w-full text-black mb-2"
            rows="4"
          />

          <label className="font-bold">Antwort:</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border p-2 rounded w-full text-black mb-4"
            rows="4"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            {loading ? "Lädt..." : "Lernkarte hinzufügen"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFlashcardModal;
