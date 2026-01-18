import { PDF_CONFIG } from './pdfConstants.js';
import { encodeText, getTranslation } from './pdfTextUtils.js';
import { embedImage } from './pdfImageUtils.js';
import { getRatingDescription } from '../matrixData.js';

/**
 * Sprawdza czy komentarz ma jakąkolwiek treść
 * @param {Object} comment - Obiekt komentarza
 * @returns {boolean} - True jeśli komentarz ma tytuł, treść, obrazy lub ocenę
 */
export const hasCommentContent = (comment) => {
  return comment && (
    (comment.title && comment.title.trim()) || 
    (comment.content && comment.content.trim()) || 
    (comment.images && comment.images.length > 0) ||
    (comment.rating !== null && comment.rating !== undefined)
  );
};

/**
 * Renderuje pojedynczy komentarz w PDF
 * @param {jsPDF} pdf - Instancja PDF
 * @param {Object} item - Obiekt z danymi elementu i komentarza
 * @param {string} item.seId - ID Secondary Element
 * @param {string} item.seName - Nazwa Secondary Element
 * @param {Object} item.comment - Obiekt komentarza
 * @param {string} language - Język
 * @param {number} yPosition - Aktualna pozycja Y
 * @param {Function} checkPageBreakFn - Funkcja sprawdzająca łamanie stron
 * @param {number} indentLevel - Poziom wcięcia (domyślnie 5mm)
 * @returns {Promise<number>} - Nowa pozycja Y po renderowaniu
 */
export const renderComment = async (
  pdf, 
  item, 
  language, 
  yPosition, 
  checkPageBreakFn, 
  indentLevel = 5
) => {
  const { margin } = PDF_CONFIG;
  const indent = margin + indentLevel;
  const contentWidth = pdf.internal.pageSize.getWidth() - (2 * margin);
  const t = (key) => getTranslation(key, language);
  
  let currentY = yPosition;
  
  // === NAGŁÓWEK: ID i nazwa elementu ===
  const result1 = checkPageBreakFn(pdf, currentY, 20);
  currentY = result1.yPosition;
  
  const seDisplayName = `${encodeText(t('pdfSecondaryElement'))} ${item.seId} - ${encodeText(item.seName)}`;
  
  pdf.setFontSize(PDF_CONFIG.fontSize.normal);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...PDF_CONFIG.colors.text); // Czarny kolor dla nagłówka
  const splitSeName = pdf.splitTextToSize(seDisplayName, contentWidth - indentLevel);
  
  for (let line of splitSeName) {
    const result2 = checkPageBreakFn(pdf, currentY, 6);
    currentY = result2.yPosition;
    pdf.text(line, indent, currentY);
    currentY += 6;
  }
  
  // Reset koloru na czarny
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  
  // === OCENA (jeśli istnieje) ===
  if (item.comment.rating !== null && item.comment.rating !== undefined) {
    pdf.setFontSize(PDF_CONFIG.fontSize.small);
    pdf.setFont('helvetica', 'bold');
    
    const ratingLabel = encodeText(t('ratingLabel'));
    const ratingDesc = encodeText(getRatingDescription(item.seId, item.comment.rating, language));
    const ratingText = `${ratingLabel}: ${item.comment.rating}/5 - ${ratingDesc}`;
    const splitRating = pdf.splitTextToSize(ratingText, contentWidth - indentLevel - 10);
    
    for (let i = 0; i < splitRating.length; i++) {
      const result3 = checkPageBreakFn(pdf, currentY, 5);
      currentY = result3.yPosition;
      pdf.text(splitRating[i], indent + 5, currentY);
      currentY += 5;
    }
    currentY += 2;
  }
  
  // === TYTUŁ KOMENTARZA (tylko jeśli istnieje) ===
  if (item.comment.title) {
    pdf.setFontSize(PDF_CONFIG.fontSize.small);
    pdf.setFont('helvetica', 'bold');
    
    const titleLabel = encodeText(t('titleLabel'));
    const titleText = `${titleLabel}: ${encodeText(item.comment.title)}`;
    const splitTitle = pdf.splitTextToSize(titleText, contentWidth - indentLevel - 10);
    
    for (let line of splitTitle) {
      const result4 = checkPageBreakFn(pdf, currentY, 5);
      currentY = result4.yPosition;
      pdf.text(line, indent + 5, currentY);
      currentY += 5;
    }
  }
  
  // === TREŚĆ KOMENTARZA (tylko jeśli istnieje) ===
  if (item.comment.content) {
    pdf.setFont('helvetica', 'normal');
    
    const contentLabel = encodeText(t('contentLabel'));
    const contentText = `${contentLabel}: ${encodeText(item.comment.content)}`;
    const splitContent = pdf.splitTextToSize(contentText, contentWidth - indentLevel - 10);
    
    for (let i = 0; i < splitContent.length; i++) {
      const result5 = checkPageBreakFn(pdf, currentY, 5);
      currentY = result5.yPosition;
      pdf.text(splitContent[i], indent + 5, currentY);
      currentY += 5;
    }
  }
  
  // === OBRAZY (jeśli istnieją) ===
  if (item.comment.images && item.comment.images.length > 0) {
    currentY += 3;
    
    pdf.setFontSize(PDF_CONFIG.fontSize.small);
    pdf.setFont('helvetica', 'bold');
    const imagesText = encodeText(language === 'pl' ? 'Obrazy' : 'Images');
    pdf.text(imagesText + ':', indent + 5, currentY);
    currentY += 5;
    
    for (const img of item.comment.images) {
      try {
        // Maksymalne wymiary obrazu w PDF (w mm)
        const maxWidth = contentWidth - indentLevel - 10;
        const maxHeight = 100; // Maksymalna wysokość obrazu
        
        const result6 = checkPageBreakFn(pdf, currentY, maxHeight + 10);
        currentY = result6.yPosition;
        
        const dimensions = await embedImage(pdf, img.data, indent + 5, currentY, maxWidth, maxHeight);
        currentY += dimensions.height + 3;
        
        // Nazwa pliku pod obrazem
        pdf.setFontSize(PDF_CONFIG.fontSize.footer);
        pdf.setFont('helvetica', 'italic');
        pdf.text(encodeText(img.name), indent + 5, currentY);
        currentY += 5;
      } catch (imgErr) {
        console.error('Error adding image to PDF:', imgErr);
        
        pdf.setFontSize(PDF_CONFIG.fontSize.footer);
        pdf.setFont('helvetica', 'italic');
        const errorMsg = `[${encodeText(language === 'pl' ? 'Błąd wczytywania obrazu' : 'Error loading image')}: ${encodeText(img.name)}]`;
        pdf.text(errorMsg, indent + 5, currentY);
        currentY += 5;
      }
    }
  }
  
  currentY += 6; // Odstęp po komentarzu
  
  return currentY;
};

/**
 * Renderuje listę komentarzy
 * @param {jsPDF} pdf - Instancja PDF
 * @param {Array} items - Tablica obiektów z komentarzami
 * @param {string} language - Język
 * @param {number} yPosition - Pozycja Y startowa
 * @param {Function} checkPageBreakFn - Funkcja łamania stron
 * @param {number} indentLevel - Poziom wcięcia
 * @returns {Promise<number>} - Nowa pozycja Y
 */
export const renderCommentsList = async (
  pdf, 
  items, 
  language, 
  yPosition, 
  checkPageBreakFn, 
  indentLevel = 5
) => {
  let currentY = yPosition;
  
  for (const item of items) {
    if (hasCommentContent(item.comment)) {
      currentY = await renderComment(
        pdf, 
        item, 
        language, 
        currentY, 
        checkPageBreakFn, 
        indentLevel
      );
    }
  }
  
  return currentY;
};