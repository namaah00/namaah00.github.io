// Plik: src/utils/imageExport.js
import html2canvas from "html2canvas";

export const exportAsJPG = () => {
  const element = document.getElementById("matrix");
  if (!element) return;

  html2canvas(element, { scale: 2 }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "matrix.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  });
};
