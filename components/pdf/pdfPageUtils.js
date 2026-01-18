import jsPDF from 'jspdf';
import { PDF_CONFIG } from './pdfConstants.js';
import { encodeText, formatShortDate, getTranslation } from './pdfTextUtils.js';

/**
 * Tworzy nową instancję jsPDF
 * @returns {jsPDF} - Nowa instancja PDF
 */
export const createPDF = () => {
  return new jsPDF(
    PDF_CONFIG.orientation,
    PDF_CONFIG.unit,
    PDF_CONFIG.pageFormat
  );
};

/**
 * Pobiera wymiary strony PDF
 * @param {jsPDF} pdf - Instancja PDF
 * @returns {{width: number, height: number, margin: number}} - Wymiary strony
 */
export const getPageDimensions = (pdf) => {
  return {
    width: pdf.internal.pageSize.getWidth(),
    height: pdf.internal.pageSize.getHeight(),
    margin: PDF_CONFIG.margin
  };
};

/**
 * Oblicza szerokość zawartości (pomijając marginesy)
 * @param {jsPDF} pdf - Instancja PDF
 * @returns {number} - Szerokość zawartości w mm
 */
export const getContentWidth = (pdf) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  return pageWidth - (2 * PDF_CONFIG.margin);
};

/**
 * Dodaje nagłówek strony (dla raportów z tytułem i autorem)
 * @param {jsPDF} pdf - Instancja PDF
 * @param {string} title - Tytuł raportu
 * @param {string} author - Autor raportu
 * @param {number} yPosition - Aktualna pozycja Y
 * @returns {number} - Nowa pozycja Y po nagłówku
 */
export const addHeader = (pdf, title, author, yPosition) => {
  const { width } = getPageDimensions(pdf);
  const margin = PDF_CONFIG.margin;
  
  pdf.setFontSize(PDF_CONFIG.fontSize.footer);
  pdf.setTextColor(...PDF_CONFIG.colors.muted);
  pdf.setFont('helvetica', 'italic');
  
  // Tytuł po lewej (skrócony jeśli za długi)
  const encodedTitle = encodeText(title);
  const shortTitle = encodedTitle.length > 60 
    ? encodedTitle.substring(0, 57) + '...' 
    : encodedTitle;
  pdf.text(shortTitle, margin, yPosition);
  
  // Autor na środku
  pdf.text(encodeText(author), width / 2, yPosition, { align: 'center' });
  
  // Data po prawej (format DD.MM.YYYY)
  const dateStr = formatShortDate(new Date());
  pdf.text(dateStr, width - margin, yPosition, { align: 'right' });
  
  yPosition += 3;
  
  // Linia pozioma
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(PDF_CONFIG.lineWidth.border);
  pdf.line(margin, yPosition, width - margin, yPosition);
  
  yPosition += 10;
  
  // Reset koloru tekstu
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  
  return yPosition;
};

/**
 * Dodaje standardowy nagłówek (dla raportów bez tytułu)
 * @param {jsPDF} pdf - Instancja PDF
 * @param {string} language - Język
 * @param {number} commentsCount - Liczba komentarzy
 * @param {number} yPosition - Aktualna pozycja Y
 * @returns {number} - Nowa pozycja Y po nagłówku
 */
export const addStandardHeader = (pdf, language, commentsCount, yPosition) => {
  const margin = PDF_CONFIG.margin;
  const t = (key) => getTranslation(key, language);
  
  // Tytuł raportu
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(encodeText(t('pdfTitle')), margin, yPosition);
  yPosition += 10;
  
  // Data generowania
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const locale = language === 'pl' ? 'pl-PL' : 'en-US';
  const dateStr = `${t('pdfGenerated')}: ${new Date().toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`;
  pdf.text(encodeText(dateStr), margin, yPosition);
  yPosition += 7;
  
  // Liczba komentarzy
  const commentCountStr = `${t('comments')}: ${commentsCount}`;
  pdf.text(encodeText(commentCountStr), margin, yPosition);
  yPosition += 10;
  
  return yPosition;
};

/**
 * Sprawdza czy potrzebna jest nowa strona i dodaje ją jeśli tak
 * @param {jsPDF} pdf - Instancja PDF
 * @param {number} currentY - Aktualna pozycja Y
 * @param {number} requiredHeight - Wymagana wysokość dla następnej zawartości
 * @param {string} title - Tytuł raportu (opcjonalny)
 * @param {string} author - Autor raportu (opcjonalny)
 * @param {string} language - Język (opcjonalny)
 * @returns {{yPosition: number, pageBreak: boolean}} - Nowa pozycja Y i info czy była nowa strona
 */
export const checkPageBreak = (pdf, currentY, requiredHeight, title = '', author = '', language = 'pl') => {
  const { height, margin } = getPageDimensions(pdf);
  
  if (currentY + requiredHeight > height - margin) {
    pdf.addPage();
    let yPosition = margin + 5; // Start trochę niżej
    
    // Zawsze dodaj nagłówek na nowej stronie
    if (title && author) {
      // Użyj podanego tytułu i autora
      yPosition = addHeader(pdf, title, author, yPosition);
    } else {
      // Użyj domyślnego tytułu z tłumaczeń
      const defaultTitle = getTranslation('pdfTitle', language);
      const defaultAuthor = getTranslation('pdfGenerated', language).split(':')[0] || 'Report';
      yPosition = addHeader(pdf, defaultTitle, defaultAuthor, yPosition);
    }
    
    return { yPosition, pageBreak: true };
  }
  
  return { yPosition: currentY, pageBreak: false };
};

/**
 * Dodaje numery stron (stopki) do wszystkich stron w dokumencie
 * @param {jsPDF} pdf - Instancja PDF
 * @param {string} title - Tytuł raportu
 * @param {string} language - Język
 */
export const addPageNumbers = (pdf, title, language) => {
  const pageCount = pdf.internal.getNumberOfPages();
  const { width, height, margin } = getPageDimensions(pdf);
  const t = (key) => getTranslation(key, language);
  
  // Użyj podanego tytułu lub domyślnego
  const footerTitle = title || t('pdfTitle');
  
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    
    // Pozycja stopki
    const footerY = height - margin + 5;
    
    // Linia pozioma nad stopką
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(PDF_CONFIG.lineWidth.border);
    pdf.line(margin, footerY - 3, width - margin, footerY - 3);
    
    // Tytuł po lewej
    pdf.setFontSize(PDF_CONFIG.fontSize.footer);
    pdf.setTextColor(...PDF_CONFIG.colors.muted);
    pdf.setFont('helvetica', 'italic');
    
    const encodedFooterTitle = encodeText(footerTitle);
    const shortTitle = encodedFooterTitle.length > 60 
      ? encodedFooterTitle.substring(0, 57) + '...' 
      : encodedFooterTitle;
    pdf.text(shortTitle, margin, footerY);
    
    // Numer strony po prawej
    const pageLabel = encodeText(language === 'pl' ? 'Strona' : 'Page');
    pdf.text(`${pageLabel} ${i}/${pageCount}`, width - margin, footerY, { align: 'right' });
  }
  
  // Reset koloru
  pdf.setTextColor(...PDF_CONFIG.colors.text);
};

/**
 * Zapisuje PDF do pliku
 * @param {jsPDF} pdf - Instancja PDF
 * @param {string} title - Tytuł raportu (dla nazwy pliku)
 * @param {string} language - Język
 */
export const savePDF = (pdf, title, language) => {
  const t = (key) => getTranslation(key, language);
  const timestamp = new Date().getTime();
  
  const filename = title 
    ? `${title.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.pdf`
    : `report-${timestamp}.pdf`;
  
  pdf.save(filename);
};