import { useState } from "react";
import supabase from "./supabaseClient";

const AddFlashCard = ({ setId, onAdd }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) {
      alert("Bitte Frage und Antwort eingeben!");
      return;
    }

    setLoading(true);

    console.log("Submitting:", { question, answer });

    const { data, error } = await supabase
      .from("flashcards")
      .insert([{ question, answer, set_id: setId }])
      .select();

    setLoading(false);

    if (error) {
      console.error("Error inserting flashcard:", error);
      alert(`Fehler beim Hinzufügen der Lernkarte: ${error.message}`);
    } else if (data && data.length > 0) {
      console.log("Inserted flashcard:", data);
      onAdd(data[0]);
      setQuestion("");
      setAnswer("");
    } else {
      alert("Keine Daten von Supabase zurückgegeben!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded bg-stone-400 w-96 flex flex-col justify-between h-full"
    >
      <div className="mb-2">
        <label className="block font-bold">Frage:</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 rounded w-full text-black "
          rows="4"
        />
      </div>
      <div className="mb-2">
        <label className="block font-bold">Antwort:</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 rounded w-full text-black"
          rows="4"
        />
      </div>
      <div className="mt-auto flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-stone-700 text-stone-100 px-4 py-2 rounded mt-2 "
        >
          {loading ? "Lädt..." : "Lernkarte hinzufügen"}
        </button>
      </div>
    </form>
  );
};

export default AddFlashCard;
