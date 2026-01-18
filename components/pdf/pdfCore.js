/**
 * Główny moduł generowania PDF - orkestracja wszystkich komponentów
 */

import { createPDF, getPageDimensions, addStandardHeader, addPageNumbers, checkPageBreak, savePDF } from './pdfPageUtils.js';
import { renderTitlePage } from './pdfTitlePage.js';
import { renderLayer } from './pdfLayerRenderers.js';

/**
 * Generuje raport PDF z komentarzami
 * @param {Object} params - Parametry generowania PDF
 * @param {Object} params.comments - Obiekt z komentarzami
 * @param {Array} params.sources - Lista źródeł
 * @param {Object} params.MATRIX_DATA - Dane matrycy
 * @param {string} params.language - Język ('pl' lub 'en')
 * @param {string} params.title - Tytuł raportu (opcjonalny)
 * @param {string} params.author - Autor raportu (opcjonalny)
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
  // Zabezpieczenie - upewnij się że language jest poprawny
  const safeLanguage = (language === 'pl' || language === 'en') ? language : 'pl';
  
  // Stwórz instancję PDF
  const pdf = createPDF();
  const { margin } = getPageDimensions(pdf);
  
  let yPosition = margin;
  
  // === STRONA TYTUŁOWA (jeśli podano tytuł i autora) ===
  if (title && author) {
    yPosition = renderTitlePage(pdf, {
      title,
      author,
      language: safeLanguage,
      comments,
      sources
    });
  } else {
    // === STANDARDOWY NAGŁÓWEK (bez strony tytułowej) ===
    const commentsCount = Object.keys(comments).length;
    yPosition = addStandardHeader(pdf, safeLanguage, commentsCount, yPosition);
  }
  
  // === FUNKCJA POMOCNICZA: Sprawdzanie łamania stron ===
  // Przekazujemy title, author i language dla nagłówków na nowych stronach
  const checkPageBreakFn = (pdfInstance, currentY, requiredHeight) => {
    return checkPageBreak(pdfInstance, currentY, requiredHeight, title, author, safeLanguage);
  };
  
  // === RENDEROWANIE WARSTW ===
  // Sprawdź czy są jakiekolwiek komentarze
  let hasAnyComments = false;
  
  for (const [layerId, layer] of Object.entries(MATRIX_DATA)) {
    // Renderuj warstwę
    const newYPosition = await renderLayer(
      pdf,
      layerId,
      layer,
      comments,
      sources,
      safeLanguage,
      yPosition,
      checkPageBreakFn
    );
    
    // Jeśli pozycja Y się zmieniła, oznacza to że warstwa miała komentarze
    if (newYPosition !== yPosition) {
      hasAnyComments = true;
      yPosition = newYPosition;
    }
  }
  
  // === NUMERACJA STRON (stopki) ===
  addPageNumbers(pdf, title, safeLanguage);
  
  // === ZAPIS PLIKU ===
  savePDF(pdf, title, safeLanguage);
};