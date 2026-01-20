import { PDF_CONFIG } from './pdfConstants.js';
import { encodeText, getTranslation } from './pdfTextUtils.js';
import { embedImage } from './pdfImageUtils.js';
import { getRatingDescription } from '../matrixData.js';

/**
 *sprawdza czy komentarz ma jakąkolwiek treść
 * @param {Object} comment - obiekt komentarza
 * @returns {boolean} - true jeśli komentarz ma tytuł, treść, obrazy lub ocenę
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
 * renderuje pojedynczy komentarz w PDF
 * @param {jsPDF} pdf - instancja PDF
 * @param {Object} item - obiekt z danymi elementu i komentarza
 * @param {string} item.seId - ID Secondary Element
 * @param {string} item.seName - nazwa Secondary Element
 * @param {Object} item.comment - obiekt komentarza
 * @param {string} language - język
 * @param {number} yPosition - aktualna pozycja Y
 * @param {Function} checkPageBreakFn - Funkcja sprawdzająca łamanie stron
 * @param {number} indentLevel - poziom wcięcia (domyślnie 5mm)
 * @returns {Promise<number>} - nowa pozycja Y po renderowaniu
 */

//funkcja renderuje pojedynczy komentarz w PDF
export const renderComment = async (
  pdf, 
  item, 
  language, 
  yPosition, 
  checkPageBreakFn,  
  indentLevel = 5 //wcięcie dla komentarzy w mm
) => {
  const { margin } = PDF_CONFIG;
  const indent = margin + indentLevel;
  const contentWidth = pdf.internal.pageSize.getWidth() - (2 * margin);
  const t = (key) => getTranslation(key, language);
  
  let currentY = yPosition;
  
  //funkcja sprawdzająca, czy trzeba zrobić łamanie strony.
  const result1 = checkPageBreakFn(pdf, currentY, 20); //currentY - pozycja Y, czyli wysokość w mm od górnej krawędzi strony
  currentY = result1.yPosition;  //yPosition to nowa pozycja Y po sprawdzeniu strony
  
  //nagłówek elementu, wyświetla ID i nazwę
  const seDisplayName = `${encodeText(t('pdfSecondaryElement'))} ${item.seId} - ${encodeText(item.seName)}`;
  
  pdf.setFontSize(PDF_CONFIG.fontSize.normal);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...PDF_CONFIG.colors.text); //czarny kolor dla nagłówka
  const splitSeName = pdf.splitTextToSize(seDisplayName, contentWidth - indentLevel);
  
  for (let line of splitSeName) {
    const result2 = checkPageBreakFn(pdf, currentY, 6);
    currentY = result2.yPosition;
    pdf.text(line, indent, currentY);
    currentY += 6;
  }
  
  //reset koloru na czarny (ubezpieczająco)
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  
  //oceny
  if (item.comment.rating !== null && item.comment.rating !== undefined) { //Warunek sprawdzający, czy jest ocena
    pdf.setFontSize(PDF_CONFIG.fontSize.small);
    pdf.setFont('helvetica', 'bold');
    
    const ratingLabel = encodeText(t('ratingLabel'));
    const ratingDesc = encodeText(getRatingDescription(item.seId, item.comment.rating, language)); //opis oceny, pobrany z funkcji getRatingDescription
    const ratingText = `${ratingLabel}: ${item.comment.rating}/5 - ${ratingDesc}`;
    const splitRating = pdf.splitTextToSize(ratingText, contentWidth - indentLevel - 10); //splitTextToSize dzieli tekst na kilka linii, jeśli jest za długi, żeby nie wychodził poza marginesy
    
    for (let i = 0; i < splitRating.length; i++) {  //pętla przechodzi po każdej linii splitRating
      const result3 = checkPageBreakFn(pdf, currentY, 5); //sprawdza, czy wystarczy miejsca na stronie PDF; jeśli nie, wstawia page break i zwraca nową pozycję Y
      currentY = result3.yPosition;
      pdf.text(splitRating[i], indent + 5, currentY); 
      currentY += 5; //przesuwa pozycję w dół o 5 mm na kolejną linię
    }
    currentY += 2; //tworzy małą przerwę między oceną a kolejnymi elementami komentarza
  }
  
  // tytuł komentarza
  if (item.comment.title) {
    pdf.setFontSize(PDF_CONFIG.fontSize.small); 
    pdf.setFont('helvetica', 'bold'); //wyświetla tytuł komentarza w pogrubionej czcionce
    
    const titleLabel = encodeText(t('titleLabel'));
    const titleText = `${titleLabel}: ${encodeText(item.comment.title)}`;
    const splitTitle = pdf.splitTextToSize(titleText, contentWidth - indentLevel - 10); //tekst jest łamany (splitTextToSize) w zależności od szerokości strony PDF
    
    for (let line of splitTitle) {
      const result4 = checkPageBreakFn(pdf, currentY, 5);
      currentY = result4.yPosition;
      pdf.text(line, indent + 5, currentY);
      currentY += 5;
    }
  }
  
  //tresc
  if (item.comment.content) {
    pdf.setFont('helvetica', 'normal');
    
    const contentLabel = encodeText(t('contentLabel'));
    const contentText = `${contentLabel}: ${encodeText(item.comment.content)}`;
    const splitContent = pdf.splitTextToSize(contentText, contentWidth - indentLevel - 10); //tekst jest dzielony na linie, żeby nie wychodził poza margines
    
    for (let i = 0; i < splitContent.length; i++) {
      const result5 = checkPageBreakFn(pdf, currentY, 5);
      currentY = result5.yPosition;
      pdf.text(splitContent[i], indent + 5, currentY);
      currentY += 5;
    }
  }
  
  //obrazy
  if (item.comment.images && item.comment.images.length > 0) {
    currentY += 3;
    
    pdf.setFontSize(PDF_CONFIG.fontSize.small);
    pdf.setFont('helvetica', 'bold');
    const imagesText = encodeText(language === 'pl' ? 'Obrazy' : 'Images');
    pdf.text(imagesText + ':', indent + 5, currentY); //sprawdzenie czy trzeba przejść na nową stronę
    currentY += 5;
    
    for (const img of item.comment.images) {
      try {
        //maksymalne wymiary obrazu w PDF w mm
        const maxWidth = contentWidth - indentLevel - 10; 
        const maxHeight = 100; //maksymalna wysokość obrazu
        
        const result6 = checkPageBreakFn(pdf, currentY, maxHeight + 10);
        currentY = result6.yPosition;
        
        const dimensions = await embedImage(pdf, img.data, indent + 5, currentY, maxWidth, maxHeight);
        currentY += dimensions.height + 3;
        
        // Nazwa pliku pod obrazem w kursywie
        pdf.setFontSize(PDF_CONFIG.fontSize.footer);
        pdf.setFont('helvetica', 'italic');
        pdf.text(encodeText(img.name), indent + 5, currentY);
        currentY += 5;
      } catch (imgErr) {
        console.error('Error adding image to PDF:', imgErr); //błędy ładowania obrazu w konsoli
        
        pdf.setFontSize(PDF_CONFIG.fontSize.footer);
        pdf.setFont('helvetica', 'italic');
        const errorMsg = `[${encodeText(language === 'pl' ? 'Błąd wczytywania obrazu' : 'Error loading image')}: ${encodeText(img.name)}]`;
        pdf.text(errorMsg, indent + 5, currentY);
        currentY += 5;
      }
    }
  }
  
  currentY += 6; //odstęp końcowy po komentarzu
  
  return currentY;
};

/**
 * renderowanie listy komentarzy
 * @param {jsPDF} pdf - instancja PDF
 * @param {Array} items - tablica obiektów z komentarzami
 * @param {string} language - język
 * @param {number} yPosition - pozycja Y startowa
 * @param {Function} checkPageBreakFn - funkcja łamania stron
 * @param {number} indentLevel - poziom wcięcia
 * @returns {Promise<number>} - nowa pozycja Y
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