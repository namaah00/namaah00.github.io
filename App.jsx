import { useState, useRef, useEffect } from 'react';
import MatrixView from './components/MatrixView.jsx';
import Toast from './components/Toast.jsx';
import HelpDialog from './components/HelpDialog.jsx';
import RadarChartDialog from './components/RadarChartDialog.jsx';
import { translations } from './components/translations.js';
import { MATRIX_DATA, getSEName, getLayerName, getRatingDescription, getPEName } from './components/matrixData.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

// Version: Separated rating system v2 + Sources + PDF L3 FIX v3
export default function App() {
  // Language management
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app-language') || 'pl';
  });
  
  // Dark mode management
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('app-theme') === 'dark';
  });
  
  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);
  
  useEffect(() => {
    localStorage.setItem('app-theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pl' ? 'en' : 'pl');
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const t = (key) => translations[language][key] || key;
  
  // Inicjalizuj komentarze z localStorage
  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem('matrix-comments');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed;
      }
      return {};
    } catch (err) {
      console.error('Błąd ładowania komentarzy:', err);
      return {};
    }
  });

  // Inicjalizuj źródła dla PE 004 z localStorage
  const [sources, setSources] = useState(() => {
    try {
      const saved = localStorage.getItem('pe004-sources');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed;
      }
      return [];
    } catch (err) {
      console.error('Błąd ładowania źródeł:', err);
      return [];
    }
  });
  
  const [toast, setToast] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isRadarChartOpen, setIsRadarChartOpen] = useState(false);
  const matrixRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  
  // Zapisuj komentarze do localStorage przy każdej zmianie
  useEffect(() => {
    try {
      const jsonString = JSON.stringify(comments);
      localStorage.setItem('matrix-comments', jsonString);
    } catch (err) {
      console.error('Błąd zapisywania komentarzy:', err);
      // Jeśli localStorage jest pełny, pokaż ostrzeżenie
      if (err.name === 'QuotaExceededError') {
        showToast('Przekroczono limit pamięci. Usuń stare komentarze.', 'error');
      }
    }
  }, [comments]);

  // Zapisuj źródła do localStorage przy każdej zmianie
  useEffect(() => {
    try {
      localStorage.setItem('pe004-sources', JSON.stringify(sources));
    } catch (err) {
      console.error('Błąd zapisywania źródeł:', err);
    }
  }, [sources]);

  const handleSaveComment = (id, title, content, images = []) => {
    setComments(prev => {
      const existingRating = prev[id]?.rating ?? null;
      const updated = {
        ...prev,
        [id]: { title, content, images, rating: existingRating }
      };
      return updated;
    });
    showToast(t('commentSaved'));
  };

  const handleSaveRating = (id, rating) => {
    setComments(prev => {
      const existing = prev[id] || { title: '', content: '' };
      const updated = {
        ...prev,
        [id]: { ...existing, rating }
      };
      return updated;
    });
    showToast(t('ratingSaved'));
  };

  const handleDeleteRating = (id) => {
    setComments(prev => {
      if (!prev[id]) return prev;
      const { rating, ...rest } = prev[id];
      return {
        ...prev,
        [id]: { ...rest, rating: null }
      };
    });
    showToast(t('ratingDeleted'));
  };

  const handleDeleteComment = (id) => {
    setComments(prev => {
      const newComments = { ...prev };
      delete newComments[id];
      return newComments;
    });
    showToast(t('commentDeleted'));
  };

  // Obsługa źródeł dla PE 004
  const handleAddSource = (title) => {
    setSources(prev => {
      const nextNumber = prev.length + 1;
      const newSource = {
        id: `004.${nextNumber}`,
        title: title,
        createdAt: new Date().toISOString()
      };
      return [...prev, newSource];
    });
    showToast(language === 'pl' ? 'Źródło dodane' : 'Source added');
  };

  const handleDeleteSource = (sourceId) => {
    // Usuń źródło
    setSources(prev => {
      const filtered = prev.filter(s => s.id !== sourceId);
      // Przenumeruj źródła
      return filtered.map((source, index) => ({
        ...source,
        id: `004.${index + 1}`
      }));
    });

    // Usuń wszystkie komentarze powiązane ze źródłem
    setComments(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        if (key.startsWith(sourceId + '.')) {
          delete updated[key];
        }
      });
      return updated;
    });

    showToast(language === 'pl' ? 'Źródło usunięte' : 'Source deleted');
  };

  const handleExportJSON = () => {
    const exportData = {
      comments: comments,
      sources: sources,
      version: '2.0',
      exportDate: new Date().toISOString()
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'matrix-data.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast(t('exportSuccess'));
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        
        // Nowy format z sources
        if (imported.version === '2.0' && imported.comments) {
          setComments(imported.comments || {});
          setSources(imported.sources || []);
        } 
        // Stary format - tylko komentarze
        else {
          setComments(imported);
        }
        
        showToast(t('importSuccess'));
      } catch (err) {
        showToast(t('importError'), 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportImage = async () => {
    if (!matrixRef.current) return;
    
    try {
      showToast('Generowanie obrazu...', 'info');
      const canvas = await html2canvas(matrixRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      });
      
      const link = document.createElement('a');
      link.download = 'matryca.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
      showToast('Obraz zapisany jako JPEG!');
    } catch (err) {
      showToast('Błąd eksportu obrazu!', 'error');
    }
  };

  const handleClearAll = () => {
    if (window.confirm(t('confirmClear'))) {
      setComments({});
      setSources([]);
      showToast(t('clearSuccess'));
    }
  };

  const handleGeneratePDF = async () => {
    try {
      showToast(t('generatePDF') + '...', 'info');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;

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
                1: language === 'pl' ? 'Spójność logiczna' : 'Logical Consistency',
                2: language === 'pl' ? 'Forma przekazu' : 'Message Format',
                3: language === 'pl' ? 'Transparentność' : 'Transparency',
                4: language === 'pl' ? 'Rzetelność' : 'Reliability',
                5: language === 'pl' ? 'Obiektywność' : 'Objectivity',
                6: language === 'pl' ? 'Autentyczność cyfrowa' : 'Digital Authenticity',
              },
              '002': {
                1: language === 'pl' ? 'Autorytet' : 'Authority',
                2: language === 'pl' ? 'Reputacja' : 'Reputation',
                3: language === 'pl' ? 'Afiliacja' : 'Affiliation',
                4: language === 'pl' ? 'Historia Wiarygodności' : 'Credibility History',
              }
            };
            
            for (let i = 1; i <= seCount; i++) {
              const seId = `${peId}.${i}`;
              const rating = comments[`L1-${seId}`]?.rating || 0;
              chartData.push({
                subject: seNames[peId][i],
                value: rating,
              });
            }
            
            // Stwórz tymczasowy kontener
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.left = '-9999px';
            container.style.width = '400px';
            container.style.height = '400px';
            container.style.background = 'white';
            container.style.padding = '20px';
            document.body.appendChild(container);
            
            // Import dynamiczny Recharts
            const { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } = await import('recharts');
            const { createRoot } = await import('react-dom/client');
            
            // Renderuj wykres
            const root = createRoot(container);
            const peTitle = peId === '001' 
              ? (language === 'pl' ? 'PE 001 - Ocena treści' : 'PE 001 - Content Assessment')
              : (language === 'pl' ? 'PE 002 - Ocena źródła' : 'PE 002 - Source Assessment');
            
            root.render(
              React.createElement('div', { style: { width: '100%', height: '100%', background: 'white' } },
                React.createElement('h4', { style: { textAlign: 'center', marginBottom: '10px', fontSize: '14px' } }, peTitle),
                React.createElement('div', { style: { width: '400px', height: '350px' } },
                  React.createElement(RadarChart, { width: 400, height: 350, data: chartData },
                    React.createElement(PolarGrid, { stroke: '#cbd5e1', strokeWidth: 1.5 }),
                    React.createElement(PolarAngleAxis, { 
                      dataKey: 'subject',
                      tick: { fill: '#000', fontSize: 11, fontWeight: 500 },
                      stroke: '#cbd5e1'
                    }),
                    React.createElement(PolarRadiusAxis, { 
                      angle: 90,
                      domain: [0, 5],
                      tick: { fill: '#666', fontSize: 10 },
                      stroke: '#cbd5e1',
                      tickCount: 6
                    }),
                    React.createElement(Radar, {
                      dataKey: 'value',
                      stroke: '#667eea',
                      fill: '#667eea',
                      fillOpacity: 0.5,
                      strokeWidth: 2,
                      dot: { fill: '#667eea', r: 4 }
                    })
                  )
                )
              )
            );
            
            // Czekaj na renderowanie
            await new Promise(r => setTimeout(r, 500));
            
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

      // Funkcja konwertująca tekst z polskimi znakami
      const encodeText = (text) => {
        if (!text) return '';
        // Mapa polskich znaków na bezpieczne odpowiedniki
        const polishChars = {
          'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
          'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
        };
        return text.split('').map(char => polishChars[char] || char).join('');
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
      const locale = language === 'pl' ? 'pl-PL' : 'en-US';
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
        const seDisplayName = `${item.seId} - ${item.seName}`;
        
        checkPageBreak(20);

        // ID i nazwa elementu
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text(encodeText(seDisplayName), indent, yPosition);
        yPosition += 6;

        // Ocena (jeśli istnieje)
        if (item.comment.rating !== null && item.comment.rating !== undefined) {
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'bold');
          const ratingText = `${t('ratingLabel')}: ${item.comment.rating}/5 - ${getRatingDescription(item.seId, item.comment.rating, language)}`;
          const splitRating = pdf.splitTextToSize(encodeText(ratingText), contentWidth - indentLevel - 10);
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
          const titleText = `${t('titleLabel')}: ${item.comment.title}`;
          pdf.text(encodeText(titleText), indent + 5, yPosition);
          yPosition += 5;
        }

        // Treść komentarza (tylko jeśli istnieje)
        if (item.comment.content) {
          pdf.setFont('helvetica', 'normal');
          const contentText = `${t('contentLabel')}: ${item.comment.content}`;
          const splitContent = pdf.splitTextToSize(encodeText(contentText), contentWidth - indentLevel - 10);
          
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
          const imagesText = language === 'pl' ? 'Obrazy' : 'Images';
          pdf.text(encodeText(imagesText) + ':', indent + 5, yPosition);
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
              pdf.text(encodeText(img.name), indent + 5, yPosition);
              yPosition += 5;
            } catch (imgErr) {
              console.error('Error adding image to PDF:', imgErr);
              pdf.setFontSize(8);
              pdf.setFont('helvetica', 'italic');
              pdf.text(encodeText('[Błąd wczytywania obrazu: ' + img.name + ']'), indent + 5, yPosition);
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
          const layerName = encodeText(getLayerName(layerId, language));
          pdf.text(layerName, margin, yPosition);
          yPosition += 8;
          
          // Linia pod nagłówkiem
          pdf.setDrawColor(100, 100, 100);
          pdf.setLineWidth(0.5);
          pdf.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 8;

          // Dodaj wykresy radarowe dla L1
          if (layerId === 'L1') {
            const chart001 = await generateRadarChartImage('001');
            const chart002 = await generateRadarChartImage('002');
            
            if (chart001 || chart002) {
              checkPageBreak(80);
              
              const chartWidth = 70; // szerokość wykresu w mm
              const chartHeight = 70; // wysokość wykresu w mm
              
              if (chart001 && chart002) {
                // Oba wykresy - renderuj obok siebie
                const spacing = 10;
                const totalWidth = 2 * chartWidth + spacing;
                const startX = margin + (contentWidth - totalWidth) / 2;
                
                pdf.addImage(chart001, 'PNG', startX, yPosition, chartWidth, chartHeight);
                pdf.addImage(chart002, 'PNG', startX + chartWidth + spacing, yPosition, chartWidth, chartHeight);
                yPosition += chartHeight + 10;
              } else if (chart001) {
                // Tylko PE 001
                const centerX = margin + (contentWidth - chartWidth) / 2;
                pdf.addImage(chart001, 'PNG', centerX, yPosition, chartWidth, chartHeight);
                yPosition += chartHeight + 10;
              } else if (chart002) {
                // Tylko PE 002
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
                const peName = encodeText(`PE ${pe.id} - ${getPEName(pe.id, language)}`);
                pdf.text(peName, margin + 3, yPosition);
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
                    const sourceTitle = encodeText(`${source.id} - ${source.title}`);
                    pdf.text(sourceTitle, margin + 8, yPosition);
                    yPosition += 7;

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
                const peName = encodeText(`PE ${pe.id} - ${getPEName(pe.id, language)}`);
                pdf.text(peName, margin + 3, yPosition);
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

      pdf.save('raport.pdf');
      showToast(t('generatePDF') + ' ✓');
    } catch (err) {
      console.error(err);
      showToast(t('generatePDF') + ' - błąd!', 'error');
    }
  };

  const commentCount = Object.keys(comments).length;

  return (
    <div className="app">
      <header className="header">
        <div className="header-title">
          <h1>{t('appTitle')}</h1>
          <p className="header-subtitle">{t('appSubtitle')}</p>
        </div>
        <div className="header-info">
          <button className="btn btn-theme" onClick={toggleDarkMode} title={isDarkMode ? 'Jasny motyw' : 'Ciemny motyw'}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="btn btn-language" onClick={toggleLanguage}>
            🌐 {language === 'pl' ? 'EN' : 'PL'}
          </button>
          <button className="btn btn-help" onClick={() => setIsHelpOpen(true)}>
            ❓ {t('help')}
          </button>
          <span className="comment-count">
            📝 {t('comments')}: {commentCount}
          </span>
        </div>
      </header>

      <div className="toolbar">
        <button className="btn btn-primary" onClick={() => setIsRadarChartOpen(true)}>
          📊 {t('radarChart')}
        </button>
        <button className="btn btn-primary" onClick={handleExportImage}>
          📷 {t('exportJPEG')}
        </button>
        <button className="btn btn-primary" onClick={handleGeneratePDF}>
          📄 {t('generatePDF')}
        </button>
        <button className="btn btn-secondary" onClick={handleExportJSON}>
          💾 {t('exportJSON')}
        </button>
        <label className="btn btn-secondary">
          📥 {t('importJSON')}
          <input
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            style={{ display: 'none' }}
          />
        </label>
        {commentCount > 0 && (
          <button className="btn btn-danger" onClick={handleClearAll}>
            🗑️ {t('clearAll')}
          </button>
        )}
      </div>

      <div className="content" ref={matrixRef}>
        <MatrixView
          comments={comments}
          onSave={handleSaveComment}
          onDelete={handleDeleteComment}
          onSaveRating={handleSaveRating}
          onDeleteRating={handleDeleteRating}
          language={language}
          sources={sources}
          onAddSource={handleAddSource}
          onDeleteSource={handleDeleteSource}
        />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
      
      <HelpDialog 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)}
        language={language}
      />
      
      <RadarChartDialog 
        isOpen={isRadarChartOpen} 
        onClose={() => setIsRadarChartOpen(false)}
        language={language}
        ratings={comments}
        showToast={showToast}
      />
    </div>
  );
}