import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Flashcard = ({ question, answer, onDelete }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="perspective-1000">
      <div
        className={`relative w-full h-56 text-white flex items-center justify-center
            text-xl font-bold rounded-xl cursor-pointer transition-transform 
            whitespace-pre-wrap text-center overflow-visible p-4 duration-700 transform-style-3d
            ${flipped ? "rotate-y-180" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="absolute top-2 right-2 cursor-pointer text-white z-20 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FaTrashAlt size={20} />
        </div>
        <div
          className={`absolute top-0 left-0 right-0 text-sm text-center py-2 font-semibold bg-stone-600 bg-opacity-75 z-10 rounded-t-xl rounded-b-none ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {flipped ? "Antwort" : "Frage"}
        </div>

        <div
          className="absolute w-full h-full bg-stone-400 flex items-center justify-center 
                    rounded-xl backface-hidden p-4 whitespace-pre-wrap overflow-auto border-2 border-stone-700"
        >
          {question}
        </div>
        <div
          className="absolute w-full h-full bg-stone-400 flex items-center justify-center
                 rounded-xl backface-hidden  p-2 rotate-y-180 whitespace-pre-wrap overflow-auto border-2 border-stone-700"
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
