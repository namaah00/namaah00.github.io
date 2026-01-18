/**
 * PDF Generator Module
 * 
 * Główny punkt wejścia dla modułu generowania PDF.
 * Eksportuje funkcję generatePDF zachowując backward compatibility.
 */

export { generatePDF } from './pdfCore.js';

// Opcjonalnie eksportuj utility functions dla zaawansowanego użycia
export { encodeText, formatDate, formatShortDate } from './pdfTextUtils.js';
export { getImageDimensions, calculateImageSize, embedImage } from './pdfImageUtils.js';
export { checkRadarDataCompleteness, prepareRadarChartData } from './pdfChartGenerator.js';
export { hasCommentContent } from './pdfCommentRenderer.js';
