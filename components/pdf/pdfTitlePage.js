import { PDF_CONFIG } from './pdfConstants.js';
import { encodeText, formatDate, getTranslation } from './pdfTextUtils.js';
import { addHeader } from './pdfPageUtils.js';

/**
 * Renderuje stronę tytułową raportu PDF
 * @param {jsPDF} pdf - Instancja PDF
 * @param {Object} params - Parametry strony tytułowej
 * @param {string} params.title - Tytuł raportu
 * @param {string} params.author - Autor raportu
 * @param {string} params.language - Język
 * @param {Object} params.comments - Obiekt z komentarzami
 * @param {Array} params.sources - Tablica źródeł
 * @returns {number} - Pozycja Y po zakończeniu (pozycja po nagłówku nowej strony)
 */
export const renderTitlePage = (pdf, { title, author, language, comments, sources }) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = PDF_CONFIG.margin;
  const t = (key) => getTranslation(key, language);
  
  let titleY = 40; // Pozycja startowa dla tytułu
  
  // === TYTUŁ RAPORTU ===
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  pdf.setFontSize(PDF_CONFIG.fontSize.title);
  pdf.setFont('helvetica', 'bold');
  
  const encodedTitle = encodeText(title);
  const titleLines = pdf.splitTextToSize(encodedTitle, pageWidth - 40);
  
  titleLines.forEach(line => {
    pdf.text(line, pageWidth / 2, titleY, { align: 'center' });
    titleY += 10;
  });
  
  // === LINIA SEPARUJĄCA ===
  pdf.setDrawColor(...PDF_CONFIG.colors.separator);
  pdf.setLineWidth(PDF_CONFIG.lineWidth.separator);
  pdf.line(margin, titleY + 10, pageWidth - margin, titleY + 10);
  
  // === AUTOR ===
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  pdf.setFontSize(PDF_CONFIG.fontSize.subtitle);
  pdf.setFont('helvetica', 'bold');
  
  const authorLabel = language === 'pl' ? 'Autor:' : 'Author:';
  pdf.text(encodeText(authorLabel), pageWidth / 2, titleY + 25, { align: 'center' });
  
  pdf.setFont('helvetica', 'normal');
  pdf.text(encodeText(author), pageWidth / 2, titleY + 33, { align: 'center' });
  
  // === DATA GENEROWANIA ===
  pdf.setFontSize(PDF_CONFIG.fontSize.normal);
  pdf.setTextColor(...PDF_CONFIG.colors.muted);
  
  const titleDateStr = formatDate(new Date(), language, true);
  pdf.text(encodeText(titleDateStr), pageWidth / 2, titleY + 45, { align: 'center' });
  
  // === METRYKI (KOMENTARZE I ŹRÓDŁA) ===
  pdf.setFontSize(12);
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  
  const commentsCount = Object.keys(comments).length;
  const commentsText = `${encodeText(t('comments'))}: ${commentsCount}`;
  const sourcesLabel = language === 'pl' ? 'Źródła' : 'Sources';
  const sourcesText = `${encodeText(sourcesLabel)}: ${sources.length}`;
  
  pdf.text(commentsText, pageWidth / 2 - 30, titleY + 70, { align: 'left' });
  pdf.text(sourcesText, pageWidth / 2 + 10, titleY + 70, { align: 'left' });
  
  // === RESET KOLORU ===
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  
  // Dodaj nową stronę dla treści
  pdf.addPage();
  
  // Dodaj nagłówek na stronie 2
  let yPosition = margin + 5;
  yPosition = addHeader(pdf, title, author, yPosition);
  
  // Zwróć pozycję Y po nagłówku
  return yPosition;
};