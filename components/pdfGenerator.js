import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';
import { getSEName, getLayerName, getRatingDescription, getPEName } from './matrixData.js';
import { translations } from './translations.js';

/**
 * Generuje raport PDF z komentarzami
 * @param {Object} params - Parametry generowania PDF
 * @param {Object} params.comments - Obiekt z komentarzami
 * @param {Array} params.sources - Lista źródeł
 * @param {Object} params.MATRIX_DATA - Dane matrycy
 * @param {string} params.language - Język ('pl' lub 'en')
 * @param {string} params.title - Tytuł raportu (opcjonalny)
 * @param {string} params.author - Autor raportu (opcjonalny)
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
  
  // Lokalna funkcja tłumaczenia - używa zaimportowanego translations
  const t = (key) => {
    const translation = translations[safeLanguage]?.[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key} in language: ${safeLanguage}`);
      return key;
    }
    return translation;
  };
  
  // Funkcja konwertująca polskie znaki na bezpieczne odpowiedniki dla jsPDF
  const encodeText = (text) => {
    if (!text) return '';
    // Mapa polskich znaków - jsPDF standard fonts nie obsługują UTF-8
    const polishChars = {
      'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
      'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
    };
    return text.split('').map(char => polishChars[char] || char).join('');
  };
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // === JEŚLI PODANO TYTUŁ I AUTORA - STRONA TYTUŁOWA ===
  if (title && author) {
    // Tytuł raportu
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    const encodedTitle = encodeText(title); // Koduj tytuł
    const titleLines = pdf.splitTextToSize(encodedTitle, pageWidth - 40);
    let titleY = 40;
    titleLines.forEach(line => {
      pdf.text(line, pageWidth / 2, titleY, { align: 'center' });
      titleY += 10;
    });
    
    // Separator line
    pdf.setDrawColor(102, 126, 234);
    pdf.setLineWidth(1);
    pdf.line(margin, titleY + 10, pageWidth - margin, titleY + 10);
    
    // Autor (czarny, normalny font)
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(encodeText(safeLanguage === 'pl' ? 'Autor:' : 'Author:'), pageWidth / 2, titleY + 25, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    pdf.text(encodeText(author), pageWidth / 2, titleY + 33, { align: 'center' }); // Koduj autora
    
    // Data generowania
    pdf.setFontSize(11);
    pdf.setTextColor(100, 100, 100);
    const locale = safeLanguage === 'pl' ? 'pl-PL' : 'en-US';
    const titleDateStr = new Date().toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    pdf.text(encodeText(titleDateStr), pageWidth / 2, titleY + 45, { align: 'center' }); // Koduj datę
    
    // Model info
    pdf.setFontSize(10);
    pdf.setTextColor(120, 120, 120);
    const modelText = safeLanguage === 'pl' 
      ? 'Model weryfikacji informacji OSINT' 
      : 'OSINT Information Verification Model';
    pdf.text(encodeText(modelText), pageWidth / 2, titleY + 55, { align: 'center' });
    
    // Liczba komentarzy (metryki)
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    const commentsCount = Object.keys(comments).length;
    const commentsText = `${encodeText(t('comments'))}: ${commentsCount}`;
    const sourcesText = `${encodeText(safeLanguage === 'pl' ? 'Źródła' : 'Sources')}: ${sources.length}`;
    pdf.text(commentsText, pageWidth / 2 - 30, titleY + 70, { align: 'left' });
    pdf.text(sourcesText, pageWidth / 2 + 10, titleY + 70, { align: 'left' });
    
    // Resetuj kolor tekstu
    pdf.setTextColor(0, 0, 0);
    
    // Nowa strona dla treści
    pdf.addPage();
    yPosition = margin;
  }

  // Funkcja generująca wykres radarowy jako obraz
  const generateRadarChartImage = async (peId) => {
    return new Promise(async (resolve) => {
      try {
        // Sprawdź kompletność danych
        const seCount = peId === '001' ? 6 : 4;
        let complete = true;
        
        for (let i = 1; i <= seCount; i++) {
          const seId = `${peId}.${i}`;
          const rating = comments[`L1-${seId}`]?.rating;
          if (rating === undefined || rating === null) {
            complete = false;
            break;
          }
        }
        
        if (!complete) {
          resolve(null);
          return;
        }
        
        // Przygotuj dane
        const chartData = [];
        const seNames = {
          '001': {
            1: safeLanguage === 'pl' ? 'Spójność\\nlogiczna' : 'Logical\\nConsistency',
            2: safeLanguage === 'pl' ? 'Forma\\nprzekazu' : 'Message\\nFormat',
            3: safeLanguage === 'pl' ? 'Transparentność' : 'Transparency',
            4: safeLanguage === 'pl' ? 'Rzetelność' : 'Reliability',
            5: safeLanguage === 'pl' ? 'Obiektywność' : 'Objectivity',
            6: safeLanguage === 'pl' ? 'Autentyczność\\ncyfrowa' : 'Digital\\nAuthenticity',
          },
          '002': {
            1: safeLanguage === 'pl' ? 'Autorytet' : 'Authority',
            2: safeLanguage === 'pl' ? 'Reputacja' : 'Reputation',
            3: safeLanguage === 'pl' ? 'Afiliacja' : 'Affiliation',
            4: safeLanguage === 'pl' ? 'Historia\\nwiarygodności' : 'Credibility\\nHistory',
          }
        };
        
        for (let i = 1; i <= seCount; i++) {
          const seId = `${peId}.${i}`;
          const rating = comments[`L1-${seId}`]?.rating || 0;
          chartData.push({
            subject: seNames[peId][i],
            value: Number(rating), // Upewnij się, że to liczba
          });
        }
        
        // Debug - wypisz dane do konsoli
        console.log('Radar chart data for PE', peId, ':', chartData);
        
        // Stwórz tymczasowy kontener
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.width = '900px';
        container.style.height = '900px';
        container.style.background = 'white';
        container.style.padding = '50px';
        document.body.appendChild(container);
        
        // Import dynamiczny Recharts
        const { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } = await import('recharts');
        const { createRoot } = await import('react-dom/client');
        
        // Renderuj wykres
        const root = createRoot(container);
        const peTitle = peId === '001' 
          ? `${t('pdfPrimaryElement')} 001 - ${t('pe001')}`
          : `${t('pdfPrimaryElement')} 002 - ${t('pe002')}`;
        
        root.render(
          React.createElement('div', { style: { width: '100%', height: '100%', background: 'white' } },
            React.createElement('h4', { style: { textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' } }, peTitle),
            React.createElement('div', { style: { width: '800px', height: '750px' } },
              React.createElement(RadarChart, { 
                width: 800, 
                height: 750, 
                data: chartData, 
                margin: { top: 40, right: 80, bottom: 40, left: 80 },
                cx: 400,
                cy: 375,
                outerRadius: 250
              },
                React.createElement(PolarGrid, { 
                  stroke: '#cbd5e1', 
                  strokeWidth: 2,
                  gridType: 'polygon'
                }),
                React.createElement(PolarAngleAxis, { 
                  dataKey: 'subject',
                  tick: { fill: '#000', fontSize: 14, fontWeight: 500 },
                  stroke: '#cbd5e1'
                }),
                React.createElement(PolarRadiusAxis, { 
                  angle: 90,
                  domain: [0, 5],
                  tick: { fill: '#666', fontSize: 14 },
                  stroke: '#cbd5e1',
                  tickCount: 6,
                  axisLine: false
                }),
                React.createElement(Radar, {
                  dataKey: 'value',
                  stroke: '#667eea',
                  fill: '#667eea',
                  fillOpacity: 0.5,
                  strokeWidth: 3,
                  dot: { fill: '#667eea', r: 6, strokeWidth: 0 }
                })
              )
            )
          )
        );
        
        // Czekaj na renderowanie
        await new Promise(r => setTimeout(r, 2000)); // Zwiększone z 1000ms na 2000ms
        
        // Dodatkowe oczekiwanie na pełne renderowanie SVG
        await new Promise(r => {
          const checkSvg = setInterval(() => {
            const svg = container.querySelector('svg');
            if (svg && svg.querySelector('.recharts-surface')) {
              clearInterval(checkSvg);
              setTimeout(r, 500); // Dodatkowe 500ms po renderowaniu SVG
            }
          }, 100);
          
          // Timeout zabezpieczający
          setTimeout(() => {
            clearInterval(checkSvg);
            r();
          }, 3000);
        });
        
        // Zrzut do canvas
        const canvas = await html2canvas(container, {
          backgroundColor: '#ffffff',
          scale: 2,
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        // Usuń kontener
        root.unmount();
        document.body.removeChild(container);
        
        resolve(imgData);
      } catch (error) {
        console.error('Error generating radar chart:', error);
        resolve(null);
      }
    });
  };

  // Funkcja do obliczania wymiarów obrazu z zachowaniem proporcji
  const getImageDimensions = (imgData) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 80; // Maksymalna szerokość w mm
        const aspectRatio = img.height / img.width;
        
        let finalWidth = maxWidth;
        let finalHeight = maxWidth * aspectRatio;
        
        // Jeśli obraz jest bardzo wysoki, ogranicz wysokość
        const maxHeight = 100;
        if (finalHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = maxHeight / aspectRatio;
        }
        
        resolve({ width: finalWidth, height: finalHeight });
      };
      img.onerror = () => {
        // W razie błędu użyj domyślnych wymiarów
        resolve({ width: 60, height: 40 });
      };
      img.src = imgData;
    });
  };

  // Funkcja dodająca nową stronę jeśli potrzeba
  const checkPageBreak = (requiredHeight) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Nagłówek
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(encodeText(t('pdfTitle')), margin, yPosition);
  yPosition += 10;

  // Data generowania
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const locale = safeLanguage === 'pl' ? 'pl-PL' : 'en-US';
  const dateStr = `${t('pdfGenerated')}: ${new Date().toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`;
  pdf.text(encodeText(dateStr), margin, yPosition);
  yPosition += 6;

  // Liczba komentarzy
  const commentCountStr = `${t('comments')}: ${Object.keys(comments).length}`;
  pdf.text(encodeText(commentCountStr), margin, yPosition);
  yPosition += 15;

  // Funkcja sprawdzająca czy komentarz ma treść
  const hasCommentContent = (comment) => {
    return comment && (
      (comment.title && comment.title.trim()) || 
      (comment.content && comment.content.trim()) || 
      (comment.images && comment.images.length > 0) ||
      (comment.rating !== null && comment.rating !== undefined)
    );
  };

  // Funkcja renderująca pojedynczy komentarz
  const renderComment = async (item, indentLevel = 5) => {
    const indent = margin + indentLevel;
    const seDisplayName = `${encodeText(t('pdfSecondaryElement'))} ${item.seId} - ${encodeText(item.seName)}`; // Koduj WSZYSTKO
    
    checkPageBreak(20);

    // ID i nazwa elementu - użyj splitTextToSize na wypadek długich nazw
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    const splitSeName = pdf.splitTextToSize(seDisplayName, contentWidth - indentLevel);
    for (let line of splitSeName) {
      checkPageBreak(6);
      pdf.text(line, indent, yPosition);
      yPosition += 6;
    }

    // Ocena (jeśli istnieje)
    if (item.comment.rating !== null && item.comment.rating !== undefined) {
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      const ratingLabel = encodeText(t('ratingLabel'));
      const ratingDesc = encodeText(getRatingDescription(item.seId, item.comment.rating, language)); // Koduj też opis
      const ratingText = `${ratingLabel}: ${item.comment.rating}/5 - ${ratingDesc}`;
      const splitRating = pdf.splitTextToSize(ratingText, contentWidth - indentLevel - 10);
      for (let i = 0; i < splitRating.length; i++) {
        checkPageBreak(5);
        pdf.text(splitRating[i], indent + 5, yPosition);
        yPosition += 5;
      }
      yPosition += 2;
    }

    // Tytuł komentarza (tylko jeśli istnieje)
    if (item.comment.title) {
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      const titleLabel = encodeText(t('titleLabel'));
      const titleText = `${titleLabel}: ${encodeText(item.comment.title)}`; // Koduj WSZYSTKO
      const splitTitle = pdf.splitTextToSize(titleText, contentWidth - indentLevel - 10);
      for (let line of splitTitle) {
        checkPageBreak(5);
        pdf.text(line, indent + 5, yPosition);
        yPosition += 5;
      }
    }

    // Treść komentarza (tylko jeśli istnieje)
    if (item.comment.content) {
      pdf.setFont('helvetica', 'normal');
      const contentLabel = encodeText(t('contentLabel'));
      const contentText = `${contentLabel}: ${encodeText(item.comment.content)}`; // Koduj WSZYSTKO
      const splitContent = pdf.splitTextToSize(contentText, contentWidth - indentLevel - 10);
      
      for (let i = 0; i < splitContent.length; i++) {
        checkPageBreak(5);
        pdf.text(splitContent[i], indent + 5, yPosition);
        yPosition += 5;
      }
    }

    // Obrazy (jeśli istnieją)
    if (item.comment.images && item.comment.images.length > 0) {
      yPosition += 3;
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      const imagesText = encodeText(safeLanguage === 'pl' ? 'Obrazy' : 'Images');
      pdf.text(imagesText + ':', indent + 5, yPosition);
      yPosition += 5;

      for (const img of item.comment.images) {
        try {
          const dimensions = await getImageDimensions(img.data);
          const imgWidth = dimensions.width;
          const imgHeight = dimensions.height;
          
          checkPageBreak(imgHeight + 10);
          
          pdf.addImage(img.data, 'JPEG', indent + 5, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 3;
          
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'italic');
          pdf.text(encodeText(img.name), indent + 5, yPosition); // Koduj nazwę pliku
          yPosition += 5;
        } catch (imgErr) {
          console.error('Error adding image to PDF:', imgErr);
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'italic');
          const errorMsg = `[${encodeText(safeLanguage === 'pl' ? 'Błąd wczytywania obrazu' : 'Error loading image')}: ${encodeText(img.name)}]`;
          pdf.text(errorMsg, indent + 5, yPosition);
          yPosition += 5;
        }
      }
    }
    
    yPosition += 6;
  };

  // Dodaj zawartość komentarzy
  let hasComments = false;
  
  for (const [layerId, layer] of Object.entries(MATRIX_DATA)) {
    let layerHasComments = false;

    // Sprawdź czy warstwa ma komentarze z treścią
    for (const pe of layer.primary) {
      // Specjalna obsługa dla PE 004 - pomiń sprawdzanie pe.secondary
      if (pe.id === '004') {
        // PE 004 będzie sprawdzone poniżej w sekcji dynamicznych źródeł
        continue;
      }
      
      for (const seId of pe.secondary) {
        const cellId = `${layerId}-${seId}`;
        if (hasCommentContent(comments[cellId])) {
          layerHasComments = true;
          break;
        }
      }
      if (layerHasComments) break;
    }

    // Sprawdź dynamiczne źródła dla PE 004 w L3
    if (layerId === 'L3' && sources.length > 0) {
      for (const source of sources) {
        for (let i = 1; i <= 4; i++) {
          const cellId = `${source.id}.${i}`;  // Format: 004.1.1 (bez prefiksu L3-)
          const comment = comments[cellId];
          if (hasCommentContent(comment)) {
            layerHasComments = true;
            break;
          }
        }
        if (layerHasComments) break;
      }
    }
    
    if (layerHasComments) {
      hasComments = true;
      
      // Nagłówek warstwy
      checkPageBreak(15);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      const layerName = getLayerName(layerId, language);
      pdf.text(encodeText(layerName), margin, yPosition);
      yPosition += 8;
      
      // Linia pod nagłówkiem
      pdf.setDrawColor(100, 100, 100);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      // Dodaj wykresy radarowe dla L1
      if (layerId === 'L1') {
        console.log('Generating radar charts for L1...');
        console.log('Comments object:', comments);
        
        const chart001 = await generateRadarChartImage('001');
        const chart002 = await generateRadarChartImage('002');
        
        console.log('Chart 001 result:', chart001 ? 'SUCCESS' : 'NULL');
        console.log('Chart 002 result:', chart002 ? 'SUCCESS' : 'NULL');
        
        if (chart001 || chart002) {
          
          if (chart001 && chart002) {
            // Oba wykresy - renderuj obok siebie, większy rozmiar
            checkPageBreak(110);
            const chartWidth = 80; // szerokość wykresu w mm (zwiększone z 70)
            const chartHeight = 80; // wysokość wykresu w mm (zwiększone z 70)
            const spacing = 10;
            const totalWidth = 2 * chartWidth + spacing;
            const startX = margin + (contentWidth - totalWidth) / 2;
            
            pdf.addImage(chart001, 'PNG', startX, yPosition, chartWidth, chartHeight);
            pdf.addImage(chart002, 'PNG', startX + chartWidth + spacing, yPosition, chartWidth, chartHeight);
            yPosition += chartHeight + 10;
          } else if (chart001) {
            // Tylko PE 001 - większy wykres (jeden na stronę)
            checkPageBreak(140);
            const chartWidth = 120; // szerokość wykresu w mm (zwiększone z 70)
            const chartHeight = 120; // wysokość wykresu w mm (zwiększone z 70)
            const centerX = margin + (contentWidth - chartWidth) / 2;
            pdf.addImage(chart001, 'PNG', centerX, yPosition, chartWidth, chartHeight);
            yPosition += chartHeight + 10;
          } else if (chart002) {
            // Tylko PE 002 - większy wykres (jeden na stronę)
            checkPageBreak(140);
            const chartWidth = 120; // szerokość wykresu w mm (zwiększone z 70)
            const chartHeight = 120; // wysokość wykresu w mm (zwiększone z 70)
            const centerX = margin + (contentWidth - chartWidth) / 2;
            pdf.addImage(chart002, 'PNG', centerX, yPosition, chartWidth, chartHeight);
            yPosition += chartHeight + 10;
          }
        }
      }

      // Przetwarzaj każdy PE w warstwie
      for (const pe of layer.primary) {
        // Specjalna obsługa dla PE 004 z dynamicznymi źródłami
        if (pe.id === '004' && sources.length > 0) {
          let peHasComments = false;

          // Sprawdź czy PE 004 ma jakiekolwiek komentarze z treścią
          for (const source of sources) {
            for (let i = 1; i <= 4; i++) {
              const cellId = `${source.id}.${i}`;  // Format: 004.1.1 (bez prefiksu L3-)
              if (hasCommentContent(comments[cellId])) {
                peHasComments = true;
                break;
              }
            }
            if (peHasComments) break;
          }
          
          if (peHasComments) {
            // Nagłówek PE 004
            checkPageBreak(12);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            const peName = `${t('pdfPrimaryElement')} ${pe.id} - ${getPEName(pe.id, language)}`;
            pdf.text(encodeText(peName), margin + 3, yPosition);
            yPosition += 8;

            // Iteruj przez każde źródło
            for (const source of sources) {
              let sourceHasComments = false;
              const sourceComments = [];

              // Zbierz komentarze dla tego źródła
              for (let i = 1; i <= 4; i++) {
                const seId = `${source.id}.${i}`;  // Format: 004.1.1 (bez prefiksu L3-)
                const seComment = comments[seId];

                if (hasCommentContent(seComment)) {
                  sourceHasComments = true;
                  const seName = getSEName(seId, language);
                  sourceComments.push({
                    seId,
                    seName,
                    comment: seComment
                  });
                }
              }

              if (sourceHasComments) {
                // Nagłówek źródła
                checkPageBreak(10);
                pdf.setFontSize(11);
                pdf.setFont('helvetica', 'bold');
                const sourceTitle = `${source.id} - ${encodeText(source.title)}`; // Koduj nazwę źródła
                const splitSourceTitle = pdf.splitTextToSize(sourceTitle, contentWidth - 13); // Zawijanie tekstu
                for (let line of splitSourceTitle) {
                  checkPageBreak(7);
                  pdf.text(line, margin + 8, yPosition);
                  yPosition += 7;
                }

                // Komentarze dla SE w tym źródle
                for (const item of sourceComments) {
                  await renderComment(item, 13);
                }
              }
            }
          }
        } else {
          // Standardowe PE (nie 004)
          const peComments = [];

          // Zbierz komentarze dla standardowych SE
          for (const seId of pe.secondary) {
            const cellId = `${layerId}-${seId}`;
            const seComment = comments[cellId];

            if (hasCommentContent(seComment)) {
              const seName = getSEName(seId, language);
              peComments.push({
                seId,
                seName,
                comment: seComment
              });
            }
          }
          
          if (peComments.length > 0) {
            // Nagłówek PE
            checkPageBreak(12);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            const peName = `${t('pdfPrimaryElement')} ${pe.id} - ${getPEName(pe.id, language)}`;
            pdf.text(encodeText(peName), margin + 3, yPosition);
            yPosition += 8;

            // Komentarze w tym PE
            for (const item of peComments) {
              await renderComment(item, 8);
            }
          }
        }
      }

      yPosition += 5;
    }
  }

  // Jeśli brak komentarzy
  if (!hasComments) {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'italic');
    pdf.text(encodeText(t('pdfNoComments')), margin, yPosition);
  }

  // === NUMERACJA STRON I STOPKA ===
  const pageCount = pdf.internal.getNumberOfPages();
  const footerTitle = title || t('pdfTitle'); // Użyj podanego tytułu lub domyślnego (jeśli title pusty, użyj tłumaczenia)

  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    
    // Linia nad stopką
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    
    // Stopka - lewa strona (skrócony tytuł)
    pdf.setFontSize(8);
    pdf.setTextColor(120, 120, 120);
    pdf.setFont('helvetica', 'italic');
    const encodedFooterTitle = encodeText(footerTitle); // Koduj tytuł
    const shortTitle = encodedFooterTitle.length > 60 ? encodedFooterTitle.substring(0, 57) + '...' : encodedFooterTitle;
    pdf.text(shortTitle, margin, pageHeight - 10);
    
    // Stopka - środek (autor jeśli podano)
    if (author) {
      pdf.text(encodeText(author), pageWidth / 2, pageHeight - 10, { align: 'center' }); // Koduj autora
    }
    
    // Stopka - prawa strona (numer strony)
    pdf.setFont('helvetica', 'normal');
    const pageLabel = encodeText(safeLanguage === 'pl' ? 'Strona' : 'Page');
    pdf.text(
      `${pageLabel} ${i}/${pageCount}`, 
      pageWidth - margin, 
      pageHeight - 10, 
      { align: 'right' }
    );
  }

  // Resetuj kolor
  pdf.setTextColor(0, 0, 0);

  pdf.save('raport.pdf');
};