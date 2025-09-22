// Plik: src/components/ExportButtons.jsx
import React from "react";
import { exportPDF } from "../utils/pdfExport";
import { exportAsJPG } from "../utils/imageExport";

const ExportButtons = () => {
  return (
    <div className="mb-4 flex space-x-2">
      <button
        onClick={exportPDF}
        className="px-4 py-2 bg-yellow-500 text-white rounded"
      >
        Eksportuj PDF
      </button>
      <button
        onClick={exportAsJPG}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        Eksportuj JPG
      </button>
    </div>
  );
};

export default ExportButtons;
