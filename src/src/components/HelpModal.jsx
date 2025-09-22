// Plik: src/components/HelpModal.jsx
import React, { useState } from "react";

const HelpModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-400 text-white rounded mb-4"
      >
        Help
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Samouczek</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Kliknij + Nowa zakładka, aby dodać zakładkę</li>
              <li>Kliknij + Nowa komórka, aby dodać komórkę do kolumny</li>
              <li>Dodawaj notatki w komórkach</li>
              <li>Użyj przycisków eksportu, aby wygenerować PDF lub JPG</li>
            </ul>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpModal;
