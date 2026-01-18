import { PDF_CONFIG } from './pdfConstants.js';
import { encodeText, getTranslation } from './pdfTextUtils.js';
import { getSEName, getPEName, getLayerName } from '../matrixData.js';
import { generateRadarChartImage } from './pdfChartGenerator.js';
import { hasCommentContent, renderComment } from './pdfCommentRenderer.js';

/**
 * Renderuje nagłówek warstwy (L1, L2, L3)
 * @param {jsPDF} pdf - Instancja PDF
 * @param {string} layerId - ID warstwy
 * @param {string} language - Język
 * @param {number} yPosition - Aktualna pozycja Y
 * @param {Function} checkPageBreakFn - Funkcja łamania stron
 * @returns {number} - Nowa pozycja Y
 */
const renderLayerHeader = (pdf, layerId, language, yPosition, checkPageBreakFn) => {
  const { margin } = PDF_CONFIG;
  const pageWidth = pdf.internal.pageSize.getWidth();
  
  let currentY = yPosition;
  const result = checkPageBreakFn(pdf, currentY, 15);
  currentY = result.yPosition;
  
  // Nazwa warstwy
  pdf.setFontSize(PDF_CONFIG.fontSize.sectionHeader);
  pdf.setFont('helvetica', 'bold');
  const layerName = getLayerName(layerId, language);
  pdf.text(encodeText(layerName), margin, currentY);
  currentY += 8;
  
  // Linia pod nagłówkiem
  pdf.setDrawColor(...PDF_CONFIG.colors.muted);
  pdf.setLineWidth(PDF_CONFIG.lineWidth.normal);
  pdf.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 8;
  
  return currentY;
};

/**
 * Renderuje wykresy radarowe dla warstwy L1
 * @param {jsPDF} pdf - Instancja PDF
 * @param {Object} comments - Obiekt z komentarzami
 * @param {string} language - Język
 * @param {number} yPosition - Aktualna pozycja Y
 * @param {Function} checkPageBreakFn - Funkcja łamania stron
 * @returns {Promise<number>} - Nowa pozycja Y
 */
const renderL1RadarCharts = async (pdf, comments, language, yPosition, checkPageBreakFn) => {
  const { margin } = PDF_CONFIG;
  const contentWidth = pdf.internal.pageSize.getWidth() - (2 * margin);
  
  console.log('Generating radar charts for L1...');
  
  const chart001 = await generateRadarChartImage('001', comments, language);
  const chart002 = await generateRadarChartImage('002', comments, language);
  
  console.log('Chart 001 result:', chart001 ? 'SUCCESS' : 'NULL');
  console.log('Chart 002 result:', chart002 ? 'SUCCESS' : 'NULL');
  
  let currentY = yPosition;
  
  if (!chart001 && !chart002) {
    return currentY; // Brak wykresów
  }
  
  if (chart001 && chart002) {
    // Oba wykresy - renderuj obok siebie
    const result = checkPageBreakFn(pdf, currentY, 110);
    currentY = result.yPosition;
    
    const chartWidth = 80;
    const chartHeight = 80;
    const spacing = 10;
    const totalWidth = 2 * chartWidth + spacing;
    const startX = margin + (contentWidth - totalWidth) / 2;
    
    pdf.addImage(chart001, 'PNG', startX, currentY, chartWidth, chartHeight);
    pdf.addImage(chart002, 'PNG', startX + chartWidth + spacing, currentY, chartWidth, chartHeight);
    currentY += chartHeight + 10;
  } else if (chart001) {
    // Tylko PE 001
    const result = checkPageBreakFn(pdf, currentY, 140);
    currentY = result.yPosition;
    
    const chartWidth = 120;
    const chartHeight = 120;
    const centerX = margin + (contentWidth - chartWidth) / 2;
    pdf.addImage(chart001, 'PNG', centerX, currentY, chartWidth, chartHeight);
    currentY += chartHeight + 10;
  } else if (chart002) {
    // Tylko PE 002
    const result = checkPageBreakFn(pdf, currentY, 140);
    currentY = result.yPosition;
    
    const chartWidth = 120;
    const chartHeight = 120;
    const centerX = margin + (contentWidth - chartWidth) / 2;
    pdf.addImage(chart002, 'PNG', centerX, currentY, chartWidth, chartHeight);
    currentY += chartHeight + 10;
  }
  
  return currentY;
};

/**
 * Renderuje Primary Element (PE) i jego Secondary Elements (SE)
 * @param {jsPDF} pdf - Instancja PDF
 * @param {Object} pe - Obiekt Primary Element
 * @param {string} layerId - ID warstwy
 * @param {Object} comments - Obiekt z komentarzami
 * @param {string} language - Język
 * @param {number} yPosition - Aktualna pozycja Y
 * @param {Function} checkPageBreakFn - Funkcja łamania stron
 * @returns {Promise<number>} - Nowa pozycja Y
 */
const renderPrimaryElement = async (pdf, pe, layerId, comments, language, yPosition, checkPageBreakFn) => {
  const { margin } = PDF_CONFIG;
  const t = (key) => getTranslation(key, language);
  
  let currentY = yPosition;
  
  // Sprawdź czy PE ma komentarze
  let peHasComments = false;
  for (const seId of pe.secondary) {
    const cellId = `${layerId}-${seId}`;
    if (hasCommentContent(comments[cellId])) {
      peHasComments = true;
      break;
    }
  }
  
  if (!peHasComments) {
    return currentY; // Brak komentarzy - pomiń PE
  }
  
  // Nagłówek PE
  const result = checkPageBreakFn(pdf, currentY, 12);
  currentY = result.yPosition;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  const peName = `${t('pdfPrimaryElement')} ${pe.id} - ${getPEName(pe.id, language)}`;
  pdf.text(encodeText(peName), margin + 3, currentY);
  currentY += 8;
  
  // Renderuj komentarze dla SE
  for (const seId of pe.secondary) {
    const cellId = `${layerId}-${seId}`;
    const comment = comments[cellId];
    
    if (hasCommentContent(comment)) {
      const seName = getSEName(seId, language);
      const item = { seId, seName, comment };
      
      currentY = await renderComment(
        pdf,
        item,
        language,
        currentY,
        checkPageBreakFn,
        5 // indent level
      );
    }
  }
  
  return currentY;
};

/**
 * Renderuje warstwę L1 (PE 001, 002 z wykresami)
 * @param {jsPDF} pdf - Instancja PDF
 * @param {Object} layer - Obiekt warstwy
 * @param {Object} comments - Obiekt z komentarzami
 * @param {string} language - Język
 * @param {number} yPosition - Aktualna pozycja Y
 * @param {Function} checkPageBreakFn - Funkcja łamania stron
 * @returns {Promise<number>} - Nowa pozycja Y
 */
export const renderL1Layer = async (pdf, layer, comments, language, yPosition, checkPageBreakFn) => {
  let currentY = yPosition;
  
  // Nagłówek warstwy
  currentY = renderLayerHeader(pdf, 'L1', language, currentY, checkPageBreakFn);
  
  // Wykresy radarowe
  currentY = await renderL1RadarCharts(pdf, comments, language, currentY, checkPageBreakFn);
  
  // Renderuj PE (001, 002)
  for (const pe of layer.primary) {
    currentY = await renderPrimaryElement(pdf, pe, 'L1', comments, language, currentY, checkPageBreakFn);
  }
  
  return currentY;
};

/**
 * Renderuje warstwę L2 (PE 003)
 * @param {jsPDF} pdf - Instancja PDF
 * @param {Object} layer - Obiekt warstwy
 * @param {Object} comments - Obiekt z komentarzami
 * @param {string} language - Język
 * @param {number} yPosition - Aktualna pozycja Y
 * @param {Function} checkPageBreakFn - Funkcja łamania stron
 * @returns {Promise<number>} - Nowa pozycja Y
 */
export const renderL2Layer = async (pdf, layer, comments, language, yPosition, checkPageBreakFn) => {
  let currentY = yPosition;
  
  // Nagłówek warstwy
  currentY = renderLayerHeader(pdf, 'L2', language, currentY, checkPageBreakFn);
  
  // Renderuj PE (003)
  for (const pe of layer.primary) {
    currentY = await renderPrimaryElement(pdf, pe, 'L2', comments, language, currentY, checkPageBreakFn);
  }
  
  return currentY;
};

/**
 * Renderuje warstwę L3 (PE 004 z dynamicznymi źródłami)
 * @param {jsPDF} pdf - Instancja PDF
 * @param {Object} layer - Obiekt warstwy
 * @param {Array} sources - Tablica źródeł
 * @param {Object} comments - Obiekt z komentarzami
 * @param {string} language - Język
 * @param {number} yPosition - Aktualna pozycja Y
 * @param {Function} checkPageBreakFn - Funkcja łamania stron
 * @returns {Promise<number>} - Nowa pozycja Y
 */
export const renderL3Layer = async (pdf, layer, sources, comments, language, yPosition, checkPageBreakFn) => {
  const { margin } = PDF_CONFIG;
  const t = (key) => getTranslation(key, language);
  
  if (sources.length === 0) {
    return yPosition; // Brak źródeł
  }
  
  let currentY = yPosition;
  
  // Sprawdź czy PE 004 ma jakiekolwiek komentarze
  let peHasComments = false;
  for (const source of sources) {
    for (let i = 1; i <= 4; i++) {
      const cellId = `${source.id}.${i}`;
      if (hasCommentContent(comments[cellId])) {
        peHasComments = true;
        break;
      }
    }
    if (peHasComments) break;
  }
  
  if (!peHasComments) {
    return currentY; // Brak komentarzy
  }
  
  // Nagłówek warstwy
  currentY = renderLayerHeader(pdf, 'L3', language, currentY, checkPageBreakFn);
  
  // Nagłówek PE 004
  const result = checkPageBreakFn(pdf, currentY, 12);
  currentY = result.yPosition;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...PDF_CONFIG.colors.text); // Czarny kolor dla nagłówka PE 004
  const peName = `${t('pdfPrimaryElement')} 004 - ${getPEName('004', language)}`;
  pdf.text(encodeText(peName), margin + 3, currentY);
  currentY += 8;
  
  // Iteruj przez każde źródło
  for (const source of sources) {
    let sourceHasComments = false;
    const sourceComments = [];
    
    // Zbierz komentarze dla tego źródła
    for (let i = 1; i <= 4; i++) {
      const seId = `${source.id}.${i}`;
      const seComment = comments[seId];
      
      if (hasCommentContent(seComment)) {
        sourceHasComments = true;
        const seName = getSEName(seId, language);
        sourceComments.push({ seId, seName, comment: seComment });
      }
    }
    
    // Renderuj źródło jeśli ma komentarze
    if (sourceHasComments) {
      const result2 = checkPageBreakFn(pdf, currentY, 10);
      currentY = result2.yPosition;
      
      // Tytuł źródła
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...PDF_CONFIG.colors.text); // Czarny kolor dla tytułu źródła
      
      const sourceTitle = `${source.id} - ${encodeText(source.title)}`;
      const contentWidth = pdf.internal.pageSize.getWidth() - (2 * margin);
      const splitSourceTitle = pdf.splitTextToSize(sourceTitle, contentWidth - 13);
      
      for (let line of splitSourceTitle) {
        const result3 = checkPageBreakFn(pdf, currentY, 6);
        currentY = result3.yPosition;
        pdf.text(line, margin + 8, currentY);
        currentY += 6;
      }
      
      // Kolor już jest czarny, nie trzeba resetować
      currentY += 2;
      
      // Renderuj komentarze dla tego źródła
      for (const item of sourceComments) {
        currentY = await renderComment(
          pdf,
          item,
          language,
          currentY,
          checkPageBreakFn,
          10 // większe wcięcie dla źródeł
        );
      }
    }
  }
  
  return currentY;
};

/**
 * Renderuje warstwę (dispatch function)
 * @param {jsPDF} pdf - Instancja PDF
 * @param {string} layerId - ID warstwy
 * @param {Object} layer - Obiekt warstwy
 * @param {Object} comments - Obiekt z komentarzami
 * @param {Array} sources - Tablica źródeł
 * @param {string} language - Język
 * @param {number} yPosition - Aktualna pozycja Y
 * @param {Function} checkPageBreakFn - Funkcja łamania stron
 * @returns {Promise<number>} - Nowa pozycja Y
 */
export const renderLayer = async (pdf, layerId, layer, comments, sources, language, yPosition, checkPageBreakFn) => {
  if (layerId === 'L1') {
    return await renderL1Layer(pdf, layer, comments, language, yPosition, checkPageBreakFn);
  } else if (layerId === 'L2') {
    return await renderL2Layer(pdf, layer, comments, language, yPosition, checkPageBreakFn);
  } else if (layerId === 'L3') {
    return await renderL3Layer(pdf, layer, sources, comments, language, yPosition, checkPageBreakFn);
  }
  
  return yPosition;
};