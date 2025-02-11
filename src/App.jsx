import "./App.css";
import { useEffect, useState } from "react";
import supabase from "./components/supabaseClient";
import Sidebar from "./components/Sidebar";
import AddFlashcardModal from "./components/AddFlashcardModal";
import ShowFlashcard from "./components/ShowFlashCard";

function App() {
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [showAddFlashcardModal, setShowAddFlashcardModal] = useState(false);

  useEffect(() => {
    const fetchSets = async () => {
      const { data, error } = await supabase.from("sets").select("*");
      if (error) {
        console.log("Error fetching sets:", error);
      } else {
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
      console.log("Fehler beim Löschen der Karte", error);
    } else {
      setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
    }
  };

  const handleDeleteSet = async (setId) => {
    const { error: deleteCardsError } = await supabase
      .from("flashcards")
      .delete()
      .eq("set_id", setId);
    if (deleteCardsError) {
      console.log("Fehler beim Löschen der Karten:", deleteCardsError);
      return;
    }

    const { error: deleteSetError } = await supabase
      .from("sets")
      .delete()
      .eq("id", setId);
    if (deleteSetError) {
      console.log("Fehler beim Löschen des Sets", deleteSetError);
    } else {
      setSets(sets.filter((set) => set.id !== setId));
      if (selectedSet?.id === setId) {
        setSelectedSet(null);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar
        sets={sets}
        selectedSet={selectedSet}
        setSelectedSet={setSelectedSet}
        onAddSet={handleAddSet}
        onDeleteSet={handleDeleteSet}
        onOpenAddFlashcard={() => setShowAddFlashcardModal(true)}
      />

      <main className="flex flex-col flex-1 ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-4 px-4">
          {selectedSet && (
            <>
              {flashcards.length > 0 ? (
                flashcards.map((card) => (
                  <ShowFlashcard
                    key={card.id}
                    question={card.question}
                    answer={card.answer}
                    onDelete={() => handleDelete(card.id)}
                  />
                ))
              ) : (
                <div className="col-span-4 md:col-span-4 lg:col-span-4 xlg:col-span-4 flex justify-center items-center h-24 text-gray-50 bg-gray-600 text-2xl mt-96 text-center rounded-xl ">
                  <p className="">
                    Füge Karten hinzu oder wähle ein anderes Set aus.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {showAddFlashcardModal && (
        <AddFlashcardModal
          setId={selectedSet?.id}
          onAdd={handleAddFlashCard}
          onClose={() => setShowAddFlashcardModal(false)}
        />
      )}
    </div>
  );
}

export default App;
