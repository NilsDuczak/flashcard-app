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

  return (
    <div className="flex">
      <Sidebar
        sets={sets}
        selectedSet={selectedSet}
        setSelectedSet={setSelectedSet}
        onAddSet={handleAddSet}
      />
      <div className="flex flex-col flex-1 ml-64">
        <Header setId={selectedSet?.id} onAdd={handleAddFlashCard} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-4 mt-32 px-4">
          {selectedSet && (
            <>
              {flashcards.length > 0 ? (
                flashcards.map((card) => (
                  <Flashcard
                    key={card.id}
                    question={card.question}
                    answer={card.answer}
                  />
                ))
              ) : (
                <p>Lade Fragen...</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
