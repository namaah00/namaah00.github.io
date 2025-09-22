// Plik: src/utils/pdfExport.js
import jsPDF from "jspdf";
import { useMatrix } from "../context/MatrixContext";

// Funkcja generująca PDF – używamy do prostego eksportu
export const exportPDF = () => {
  // Używamy hooka tylko w komponencie, więc tutaj trzeba mały workaround
  // Prosty sposób: korzystamy z DOM
  const matrixElement = document.getElementById("matrix");
  if (!matrixElement) return;

  const doc = new jsPDF("p", "pt", "a4");
  const margin = 20;
  let y = margin;

  const columns = Array.from(matrixElement.children);
  columns.forEach((col, i) => {
    const cells = Array.from(col.children).filter(c => c.tagName === "DIV");
    cells.forEach((cell) => {
      const title = cell.querySelector(".font-bold")?.innerText || "";
      const note = cell.querySelector("textarea")?.value || "";
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(title, margin, y);
      y += 14;
      doc.setFont(undefined, "normal");
      doc.text(note, margin + 10, y);
      y += 30;
      if (y > 800) { // nowa strona
        doc.addPage();
        y = margin;
      }
    });
  });

  doc.save("matrix_report.pdf");
};
