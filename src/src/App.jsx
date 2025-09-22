// Plik: src/App.jsx
import React from "react";
import { MatrixProvider } from "./context/MatrixContext";
import Tabs from "./components/Tabs";
import Matrix from "./components/Matrix";
import HelpModal from "./components/HelpModal";
import ExportButtons from "./components/ExportButtons";

const App = () => {
  return (
    <MatrixProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Moja Matryca</h1>
        <Tabs />
        <ExportButtons />
        <Matrix />
        <HelpModal />
      </div>
    </MatrixProvider>
  );
};

export default App;
