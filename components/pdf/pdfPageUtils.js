import jsPDF from 'jspdf';
import { PDF_CONFIG } from './pdfConstants.js';
import { encodeText, formatShortDate, getTranslation } from './pdfTextUtils.js';

/**
 * Tworzenei nowej instancji jsPDF
 * @returns {jsPDF} - nowa instancja PDF
 */
export const createPDF = () => {
  return new jsPDF(
    PDF_CONFIG.orientation, //orientacja strony
    PDF_CONFIG.unit, //jednostka miary
    PDF_CONFIG.pageFormat //format
  );
};

/**
 * pobieranie wymiarów strony PDF
 * @param {jsPDF} pdf - instancja PDF
 * @returns {{width: number, height: number, margin: number}} - wymiary strony
 */
export const getPageDimensions = (pdf) => {
  return {
    width: pdf.internal.pageSize.getWidth(),
    height: pdf.internal.pageSize.getHeight(),
    margin: PDF_CONFIG.margin
  };
};

/**
 *oblicza szerokość zawartości (pomijając marginesy)
 * @param {jsPDF} pdf - instancja PDF
 * @returns {number} - szerokość zawartości w mm
 */

//obliczanie szerokości dostępnej przestrzeni między marginesami
export const getContentWidth = (pdf) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  return pageWidth - (2 * PDF_CONFIG.margin);
};

/**
 * dodaje nagłówek strony (dla raportów z tytułem i autorem)
 * @param {jsPDF} pdf - instancja PDF
 * @param {string} title - tytuł raportu
 * @param {string} author - autor raportu
 * @param {number} yPosition - aktualna pozycja Y
 * @returns {number} - nowa pozycja Y po nagłówku
 */
//rysuje nagłówek strony z tytułem, autorem i datą, daje ich pozycję
export const addHeader = (pdf, title, author, yPosition) => {
  const { width } = getPageDimensions(pdf);
  const margin = PDF_CONFIG.margin;
  
  pdf.setFontSize(PDF_CONFIG.fontSize.footer);
  pdf.setTextColor(...PDF_CONFIG.colors.muted);
  pdf.setFont('helvetica', 'italic');
  
  //tytuł po lewej (skrócony jeśli za długi)
  const encodedTitle = encodeText(title);
  const shortTitle = encodedTitle.length > 60 
    ? encodedTitle.substring(0, 57) + '...' 
    : encodedTitle;
  pdf.text(shortTitle, margin, yPosition);
  
  // Autor na środku
  pdf.text(encodeText(author), width / 2, yPosition, { align: 'center' });
  
  //data po prawej (format DD.MM.YYYY)
  const dateStr = formatShortDate(new Date());
  pdf.text(dateStr, width - margin, yPosition, { align: 'right' });
  
  yPosition += 3;
  
  //linia pozioma
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(PDF_CONFIG.lineWidth.border);
  pdf.line(margin, yPosition, width - margin, yPosition);
  
  yPosition += 10;
  
  //reset koloru tekstu na  czarny
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  
  return yPosition;
};

/**
 *dodaje standardowy nagłówek (dla raportów bez tytułu)
 * @param {jsPDF} pdf - instancja PDF
 * @param {string} language - język
 * @param {number} commentsCount - liczba komentarzy
 * @param {number} yPosition - aktualna pozycja Y
 * @returns {number} - nowa pozycja Y po nagłówku
 */
export const addStandardHeader = (pdf, language, commentsCount, yPosition) => {
  const margin = PDF_CONFIG.margin;
  const t = (key) => getTranslation(key, language);
  
  //tytuł raportu
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(encodeText(t('pdfTitle')), margin, yPosition);
  yPosition += 10;
  
  //data generowania
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
  
  //liczba komentarzy
  const commentCountStr = `${t('comments')}: ${commentsCount}`;
  pdf.text(encodeText(commentCountStr), margin, yPosition);
  yPosition += 10;
  
  return yPosition;
};

/**
 *sprawdza czy potrzebna jest nowa strona i dodaje ją jeśli tak
 * @param {jsPDF} pdf - instancja PDF
 * @param {number} currentY - aktualna pozycja Y
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
    let yPosition = margin + 5; //start trochę niżej
    
    //dodaje nagłówek na nowej stronie
    if (title && author) {
      //używa podanego tytułu i autora
      yPosition = addHeader(pdf, title, author, yPosition);
    } else {
      //użwa domyślnego tytułu z tłumaczeń
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
 * @param {jsPDF} pdf - instancja PDF
 * @param {string} title - tytuł raportu
 * @param {string} language - język
 */
export const addPageNumbers = (pdf, title, language) => {
  const pageCount = pdf.internal.getNumberOfPages();
  const { width, height, margin } = getPageDimensions(pdf);
  const t = (key) => getTranslation(key, language);
  
  //używa podanego tytułu lub domyślnego
  const footerTitle = title || t('pdfTitle');
  
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    
    //pozycja stopki
    const footerY = height - margin + 5;
    
    //linia pozioma nad stopką
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(PDF_CONFIG.lineWidth.border);
    pdf.line(margin, footerY - 3, width - margin, footerY - 3);
    
    //tytul
    pdf.setFontSize(PDF_CONFIG.fontSize.footer);
    pdf.setTextColor(...PDF_CONFIG.colors.muted);
    pdf.setFont('helvetica', 'italic');
    
    const encodedFooterTitle = encodeText(footerTitle);
    const shortTitle = encodedFooterTitle.length > 60 
      ? encodedFooterTitle.substring(0, 57) + '...' 
      : encodedFooterTitle;
    pdf.text(shortTitle, margin, footerY);
    
    //numer strony po prawej
    const pageLabel = encodeText(language === 'pl' ? 'Strona' : 'Page');
    pdf.text(`${pageLabel} ${i}/${pageCount}`, width - margin, footerY, { align: 'right' });
  }
  
  //reset koloru
  pdf.setTextColor(...PDF_CONFIG.colors.text);
};

/**
 * zapisanie PDF do pliku
 * @param {jsPDF} pdf - instancja PDF
 * @param {string} title - tytuł raportu (dla nazwy pliku)
 * @param {string} language - język
 */
export const savePDF = (pdf, title, language) => {
  const t = (key) => getTranslation(key, language);
  const timestamp = new Date().getTime();
  
  const filename = title 
    ? `${title.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.pdf`
    : `report-${timestamp}.pdf`;
  
  pdf.save(filename);
};