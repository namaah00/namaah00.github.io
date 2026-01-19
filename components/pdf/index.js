//główna funkcja tworzenia plików pdf
export { generatePDF } from './pdfCore.js';

//opcjonalny eksport
export { encodeText, formatDate, formatShortDate } from './pdfTextUtils.js'; //kodowanie tekstu, formatowanie dat
export { getImageDimensions, calculateImageSize, embedImage } from './pdfImageUtils.js'; //wymiary obrazów
export { checkRadarDataCompleteness, prepareRadarChartData } from './pdfChartGenerator.js'; //sprawdza kompletność danych do wykresu radarowego
export { hasCommentContent } from './pdfCommentRenderer.js'; //sprawdza czy pdf ma komentarze, które trzeba wyrenderować
