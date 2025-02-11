import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ShowFlashcard = ({ question, answer, onDelete }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full h-64">
      <div
        className={`relative w-full h-full text-white flex items-center justify-center mt-14
            text-xl font-bold rounded-xl cursor-pointer transition-transform
            whitespace-pre-wrap text-center overflow-visible p-4 duration-1000 ease-in-out transform-style-3d
            transform-style-preserve-3d transform-gpu 
            ${flipped ? "rotate-y-180" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="absolute top-2 right-2 cursor-pointer text-white hover:text-red-500 z-20 shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FaTrashAlt size={20} />
        </div>
        <div
          className={`absolute top-0 left-0 right-0 text-sm text-center py-2 font-semibold bg-gray-800 bg-opacity-75 z-10 rounded-t-xl rounded-b-none shadow-lg ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {flipped ? "Antwort" : "Frage"}
        </div>

        <div
          className="absolute w-full h-full bg-gray-400 flex items-center justify-center 
                    rounded-xl  p-4 whitespace-pre-wrap overflow-auto border-2 border-stone-700 backface-hidden "
        >
          {question}
        </div>
        <div
          className="absolute w-full h-full bg-gray-400 flex items-center justify-center
                 rounded-xl p-4 whitespace-pre-wrap overflow-auto border-2 border-stone-700 backface-hidden rotate-y-180"
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

export default ShowFlashcard;
