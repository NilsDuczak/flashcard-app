const Header = ({ selectedSet }) => {
  return (
    <header className="bg-stone-500 text-stone-100 p-4 rounded-b-3xl w-fit absolute  left-1/2 -translate-x-1/2 ">
      <h1 className="text-3xl font-bold">
        {selectedSet
          ? `Aktuelles Set: ${selectedSet.name}`
          : "Bitte ein Set auswählen / hinzufügen"}
      </h1>
    </header>
  );
};

export default Header;
