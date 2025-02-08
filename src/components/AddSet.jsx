import { useState } from "react";
import supabase from "./supabaseClient";

const AddSet = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Bitte einen Namen für das Set eingeben!");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("sets")
      .insert([{ name }])
      .select();

    setLoading(false);

    if (error) {
      console.error("Error inserting set:", error);
      alert(`Fehler beim Hinzufügen des Sets: ${error.message}`);
    } else if (data && data.length > 0) {
      onAdd(data[0]);
      setName("");
    } else {
      alert("Keine Daten von Supabase zurückgegeben!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-2">
        <label className="block font-bold">Set Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full text-black"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        {loading ? "Lädt..." : "Set hinzufügen"}
      </button>
    </form>
  );
};

export default AddSet;
