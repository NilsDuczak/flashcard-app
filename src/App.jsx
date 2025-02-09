import "./App.css";
import { useEffect, useState } from "react";
import supabase from "./components/supabaseClient";
import Flashcard from "./components/FlashCard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchSets = async () => {
      const { data, error } = await supabase.from("sets").select("*");
      if (error) {
        console.log("Error fetching sets:", error);
      } else {
        console.log("Fetched sets:", data);
        setSets(data);
      }
    };
    fetchSets();
  }, []);

  useEffect(() => {
    if (selectedSet) {
      const fetchFlashcards = async () => {
        const { data, error } = await supabase
          .from("flashcards")
          .select("*")
          .eq("set_id", selectedSet.id);
        if (error) {
          console.log("Error fetching flashcards:", error);
        } else {
          console.log("Fetched flashcards:", data);
          setFlashcards(data);
        }
      };
      fetchFlashcards();
    }
  }, [selectedSet]);

  const handleAddSet = (newSet) => {
    setSets([...sets, newSet]);
  };

  const handleAddFlashCard = (newCard) => {
    setFlashcards([...flashcards, newCard]);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("flashcards").delete().eq("id", id);

    if (error) {
      console.log("Fehler beim löschen der Karte", error);
    } else {
      setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
    }
  };

  const handleDeleteSet = async (setId) => {
    const { error: deleteCardsError } = await supabase
      .from("sets")
      .delete()
      .eq("id", setId);

    if (deleteCardsError) {
      console.log("Fehler beim löschen der Karten:", deleteCardsError);
      return;
    }
    const { error: deleteSetError } = await supabase
      .from("sets")
      .delete()
      .eq("id", setId);

    if (deleteSetError) {
      console.log("Fehler beim löschen des Sets", deleteSetError);
    } else {
      setSets(sets.filter((set) => set.id !== setId));

      if (selectedSet?.id === setId) {
        setSelectedSet(null);
      }
    }
  };

  return (
    <div className="flex bg-stone-100">
      <Sidebar
        sets={sets}
        selectedSet={selectedSet}
        setSelectedSet={setSelectedSet}
        onAddSet={handleAddSet}
        onDeleteSet={handleDeleteSet}
      />
      <div className="flex flex-col flex-1 ml-64 bg-stone-100">
        <Header
          selectedSet={selectedSet}
          setId={selectedSet?.id}
          onAdd={handleAddFlashCard}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-4 mt-32 px-4 bg-stone-100">
          {selectedSet && (
            <>
              {flashcards.length > 0 ? (
                flashcards.map((card) => (
                  <Flashcard
                    key={card.id}
                    question={card.question}
                    answer={card.answer}
                    onDelete={() => handleDelete(card.id)}
                  />
                ))
              ) : (
                <p className="text-stone-900 text-xl bg-stone-100">
                  Noch keine Karten vorhanden.
                  <br /> Füge Karten hinzu oder wähle ein anderes Lernset aus.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
