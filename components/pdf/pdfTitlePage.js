import { PDF_CONFIG } from './pdfConstants.js';
import { encodeText, formatDate, getTranslation } from './pdfTextUtils.js';
import { addHeader } from './pdfPageUtils.js';

/**
 * renderowanie strony tytułowej raportu PDF
 * @param {jsPDF} pdf - instancja PDF
 * @param {Object} params - parametry strony tytułowej
 * @param {string} params.title - tytuł raportu
 * @param {string} params.author - autor raportu
 * @param {string} params.language - język
 * @param {Object} params.comments - obiekt z komentarzami
 * @param {Array} params.sources - tablica źródeł
 * @returns {number} - pozycja Y po zakończeniu (pozycja po nagłówku nowej strony)
 */
export const renderTitlePage = (pdf, { title, author, language, comments, sources }) => {
  const pageWidth = pdf.internal.pageSize.getWidth(); //pobiera szerokość strony z instancji jsPDF
  const margin = PDF_CONFIG.margin;
  const t = (key) => getTranslation(key, language);
  
  let titleY = 40; //początkowa pozycja pionowa, od której zacznie rysować tytuł
  
  //tytuł
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  pdf.setFontSize(PDF_CONFIG.fontSize.title);
  pdf.setFont('helvetica', 'bold');
  
  const encodedTitle = encodeText(title);
  const titleLines = pdf.splitTextToSize(encodedTitle, pageWidth - 40); //dzieli tekst na linie, żeby mieścił się w szerokości strony minus 40 mm
  
  titleLines.forEach(line => {
    pdf.text(line, pageWidth / 2, titleY, { align: 'center' });
    titleY += 10;
  });
  
  //linia separująca
  pdf.setDrawColor(...PDF_CONFIG.colors.separator);
  pdf.setLineWidth(PDF_CONFIG.lineWidth.separator);
  pdf.line(margin, titleY + 10, pageWidth - margin, titleY + 10); //Rysuje poziomą linię od lewego do prawego marginesu 10 mm poniżej tytułu
  
  //autor
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  pdf.setFontSize(PDF_CONFIG.fontSize.subtitle);
  pdf.setFont('helvetica', 'bold');
  
  const authorLabel = language === 'pl' ? 'Autor:' : 'Author:'; //rysuje etykietę „Autor:” lub „Author:”
  pdf.text(encodeText(authorLabel), pageWidth / 2, titleY + 25, { align: 'center' }); 
  
  pdf.setFont('helvetica', 'normal');
  pdf.text(encodeText(author), pageWidth / 2, titleY + 33, { align: 'center' }); //właściwe imię autora
  
  //data generowania pdf
  pdf.setFontSize(PDF_CONFIG.fontSize.normal);
  pdf.setTextColor(...PDF_CONFIG.colors.muted);
  
  const titleDateStr = formatDate(new Date(), language, true); //pobiera aktualną datę i formatuje ją w pełnej formie
  pdf.text(encodeText(titleDateStr), pageWidth / 2, titleY + 45, { align: 'center' }); //wyświetla datę na środku pod autorem
  
  //liczba komentarzy i źródeł
  pdf.setFontSize(12);
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  
  const commentsCount = Object.keys(comments).length;
  const commentsText = `${encodeText(t('comments'))}: ${commentsCount}`; //wyświetla w raporcie informacje ile komentarzy zostało użytych
  const sourcesLabel = language === 'pl' ? 'Źródła' : 'Sources';
  const sourcesText = `${encodeText(sourcesLabel)}: ${sources.length}`;//wyświetla w raporcie informacje ile źródeł zostało użytych
  
  pdf.text(commentsText, pageWidth / 2 - 30, titleY + 70, { align: 'left' });
  pdf.text(sourcesText, pageWidth / 2 + 10, titleY + 70, { align: 'left' });
  
  //reset koloru na czarny
  pdf.setTextColor(...PDF_CONFIG.colors.text);
  
  //dodanie nowej strony
  pdf.addPage();
  
  //nagłówek na stronach z treścią
  let yPosition = margin + 5;
  yPosition = addHeader(pdf, title, author, yPosition);
  
  //zwraca pozycję na tekst po nagłowku
  return yPosition;
};