// Plik: src/components/Tabs.jsx
import React from "react";
import { useMatrix } from "../context/MatrixContext";

const Tabs = () => {
  const { tabs, activeTabId, setActiveTabId, addTab } = useMatrix();

  return (
    <div className="flex mb-4 space-x-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTabId(tab.id)}
          className={`px-4 py-2 rounded ${
            tab.id === activeTabId ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {tab.name}
        </button>
      ))}
      <button onClick={addTab} className="px-4 py-2 bg-green-500 text-white rounded">
        + Nowa zakładka
      </button>
    </div>
  );
};

export default Tabs;
