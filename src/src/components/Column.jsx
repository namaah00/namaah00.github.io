// Plik: src/components/Column.jsx
import React from "react";
import { useMatrix } from "../context/MatrixContext";
import Cell from "./Cell";

const Column = ({ column }) => {
  const { addCell } = useMatrix();

  return (
    <div className="flex flex-col space-y-2 min-w-[200px] border p-2 rounded bg-gray-50">
      {column.cells.map((cell) => (
        <Cell key={cell.id} cell={cell} columnId={column.id} />
      ))}
      <button
        onClick={() => addCell(column.id)}
        className="mt-2 px-2 py-1 bg-green-500 text-white rounded"
      >
        + Nowa komórka
      </button>
    </div>
  );
};

export default Column;
