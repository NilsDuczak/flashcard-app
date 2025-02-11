const ShowCurrentSet = ({ selectedSet }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-left pt-10 overflow-auto ">
        <span className="font-extrabold">Aktuelles Set:</span>
        <hr className="border-t-2 border-gray-200 pb-2" />
        {selectedSet
          ? `${selectedSet.name}`
          : "Bitte Set auswählen oder erstellen"}
      </h2>
    </div>
  );
};
export default ShowCurrentSet;
