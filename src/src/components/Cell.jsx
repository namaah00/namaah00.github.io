// Plik: src/components/Cell.jsx
import React from "react";
import { useMatrix } from "../context/MatrixContext";

const Cell = ({ cell, columnId }) => {
  const { updateCellNote } = useMatrix();

  return (
    <div className="border p-2 rounded bg-white">
      <div className="font-bold">{cell.title}</div>
      <textarea
        value={cell.note}
        onChange={(e) => updateCellNote(columnId, cell.id, e.target.value)}
        placeholder="Dodaj notatkę..."
        className="w-full mt-1 p-1 border rounded"
      />
    </div>
  );
};

export default Cell;
