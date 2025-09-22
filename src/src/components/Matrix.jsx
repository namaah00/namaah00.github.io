// Plik: src/components/Matrix.jsx
import React from "react";
import { useMatrix } from "../context/MatrixContext";
import Column from "./Column";

const Matrix = () => {
  const { tabs, activeTabId } = useMatrix();
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div
      id="matrix"
      className="flex space-x-4 overflow-x-auto border p-4 rounded"
    >
      {activeTab?.columns.map((col) => (
        <Column key={col.id} column={col} />
      ))}
    </div>
  );
};

export default Matrix;
