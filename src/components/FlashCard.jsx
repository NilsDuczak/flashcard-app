import { useState } from "react";

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="perspective-1000">
      <div
        className={`relative w-full h-56 text-white flex items-center justify-center
            text-xl font-bold rounded-xl cursor-pointer transition-transform 
            whitespace-pre-wrap text-center overflow-visible p-4 duration-500 transform-style-3d
            ${flipped ? "rotate-y-180" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="absolute w-full h-full bg-stone-500 flex items-center justify-center 
                    rounded-xl backface-hidden p-4 whitespace-pre-wrap overflow-auto"
        >
          {question}
        </div>
        <div
          className="absolute w-full h-full bg-stone-500 flex items-center justify-center
                 rounded-xl backface-hidden  p-2 rotate-y-180 whitespace-pre-wrap overflow-auto"
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
