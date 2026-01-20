import { createPDF, getPageDimensions, addStandardHeader, addPageNumbers, checkPageBreak, savePDF } from './pdfPageUtils.js';
import { renderTitlePage } from './pdfTitlePage.js';
import { renderLayer } from './pdfLayerRenderers.js';

/**
 * generuje raport PDF z komentarzami
 * @param {Object} params - parametry generowania PDF
 * @param {Object} params.comments - obiekt z komentarzami
 * @param {Array} params.sources - lista źródeł
 * @param {Object} params.MATRIX_DATA - dane matrycy
 * @param {string} params.language - język (pl lub en)
 * @param {string} params.title - tytuł raportu
 * @param {string} params.author - autor raportu
 * @returns {Promise<void>}
 */
export const generatePDF = async ({
  comments,
  sources,
  MATRIX_DATA,
  language,
  title = '',
  author = ''
}) => {
  //upewnienie się, że język jest poprawny, domyślnie polski
  const safeLanguage = (language === 'pl' || language === 'en') ? language : 'pl';
  
  //stworzenie instancji PDF
  const pdf = createPDF(); //tworzy nowy obiekt PDF
  const { margin } = getPageDimensions(pdf); //pobiera marginesy i wymiary strony
  let yPosition = margin; //śledzi aktualną wysokość w PDF
  
  //strona tytułowa jesli podano tytul i autora
  if (title && author) {
    yPosition = renderTitlePage(pdf, {
      title,
      author,
      language: safeLanguage,
      comments,
      sources
    });
  } else {
    //jesli nie podano tytulu i autora, bez strony tytułowej
    const commentsCount = Object.keys(comments).length;
    yPosition = addStandardHeader(pdf, safeLanguage, commentsCount, yPosition);
  }
  
  //łamanie stron
  // Przekazujemy title, author i language dla nagłówków na nowych stronach
  const checkPageBreakFn = (pdfInstance, currentY, requiredHeight) => {
    return checkPageBreak(pdfInstance, currentY, requiredHeight, title, author, safeLanguage);
  };
  
  //renderowanie warstw
  //sprawdzenie czy są jakiekolwiek komentarze
  let hasAnyComments = false;
  
  for (const [layerId, layer] of Object.entries(MATRIX_DATA)) { //MATRIX_DATA zawiera wszystkie warstwy L1, L2, L3
    //renderowanie warstwy
    const newYPosition = await renderLayer( //renderuje nagłówek warstwy, przechodzi po wszystkich elementach i komentarzach
    // rysuje oceny, treści i obrazy, obsługuje łamanie stron dzięki checkPageBreakFn
      pdf,
      layerId,
      layer,
      comments,
      sources,
      safeLanguage,
      yPosition,
      checkPageBreakFn
    );
    
    //jeśli pozycja Y się zmieniła, oznacza to że warstwa miała komentarze
    if (newYPosition !== yPosition) {
      hasAnyComments = true;
      yPosition = newYPosition;
    }
  }
  
  //stopki (numeracja stron)
  addPageNumbers(pdf, title, safeLanguage);
  
  //zapis pdf
  savePDF(pdf, title, safeLanguage);
};