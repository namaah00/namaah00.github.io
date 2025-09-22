// Plik: src/context/MatrixContext.jsx
import React, { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const MatrixContext = createContext();

export const useMatrix = () => useContext(MatrixContext);

export const MatrixProvider = ({ children }) => {
  const [tabs, setTabs] = useState([
    {
      id: uuidv4(),
      name: "Zakładka 1",
      columns: [
        { id: uuidv4(), cells: [] }
      ]
    }
  ]);

  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const addTab = () => {
    const newTab = {
      id: uuidv4(),
      name: `Zakładka ${tabs.length + 1}`,
      columns: [{ id: uuidv4(), cells: [] }]
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const addCell = (columnId, content = "") => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === activeTabId
          ? {
              ...tab,
              columns: tab.columns.map((col) =>
                col.id === columnId
                  ? {
                      ...col,
                      cells: [...col.cells, { id: uuidv4(), title: "Nowa komórka", note: content }]
                    }
                  : col
              )
            }
          : tab
      )
    );
  };

  const updateCellNote = (columnId, cellId, note) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === activeTabId
          ? {
              ...tab,
              columns: tab.columns.map((col) =>
                col.id === columnId
                  ? {
                      ...col,
                      cells: col.cells.map((cell) =>
                        cell.id === cellId ? { ...cell, note } : cell
                      )
                    }
                  : col
              )
            }
          : tab
      )
    );
  };

  return (
    <MatrixContext.Provider
      value={{ tabs, activeTabId, setActiveTabId, addTab, addCell, updateCellNote }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
