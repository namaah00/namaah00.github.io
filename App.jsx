import { useState, useRef, useEffect } from 'react';
import MatrixView from './components/MatrixView.jsx';
import Toast from './components/Toast.jsx';
import HelpDialog from './components/HelpDialog.jsx';
import { translations } from './components/translations.js';
import { MATRIX_DATA, getSEName, getLayerName, getRatingDescription } from './components/matrixData.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Version: Separated rating system v2
export default function App() {
  // Language management
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app-language') || 'pl';
  });
  
  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pl' ? 'en' : 'pl');
  };
  
  const t = (key) => translations[language][key] || key;
  
  // Inicjalizuj komentarze z localStorage
  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem('matrix-comments');
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('🔄 Loading from localStorage:', Object.keys(parsed).length, 'comments');
        return parsed;
      }
      console.log('📭 No saved comments in localStorage');
      return {};
    } catch (err) {
      console.error('❌ Błąd ładowania komentarzy:', err);
      return {};
    }
  });
  
  const [toast, setToast] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
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
      console.log('💿 Saved to localStorage:', Object.keys(comments).length, 'comments, size:', (jsonString.length / 1024).toFixed(2), 'KB');
      
      // Debug: Sprawdź czy localStorage faktycznie zawiera dane
      const saved = localStorage.getItem('matrix-comments');
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('✅ Verified in localStorage:', Object.keys(parsed).length, 'comments');
        
        // Sprawdź obrazy w każdym komentarzu
        Object.keys(parsed).forEach(key => {
          if (parsed[key].images && parsed[key].images.length > 0) {
            console.log(`  📸 ${key}: ${parsed[key].images.length} images`);
          }
        });
      }
    } catch (err) {
      console.error('❌ Błąd zapisywania komentarzy:', err);
      // Jeśli localStorage jest pełny, pokaż ostrzeżenie
      if (err.name === 'QuotaExceededError') {
        showToast('Przekroczono limit pamięci. Usuń stare komentarze.', 'error');
      }
    }
  }, [comments]);

  const handleSaveComment = (id, title, content, images = []) => {
    console.log('💾 App.handleSaveComment called:', { id, title, content, imagesCount: images.length, images });
    setComments(prev => {
      const existingRating = prev[id]?.rating ?? null;
      const updated = {
        ...prev,
        [id]: { title, content, images, rating: existingRating }
      };
      console.log('💾 Updated comment:', updated[id]);
      return updated;
    });
    showToast(t('commentSaved'));
  };

  const handleSaveRating = (id, rating) => {
    console.log('⭐ App.handleSaveRating called:', { id, rating });
    setComments(prev => {
      const existing = prev[id] || { title: '', content: '' };
      const updated = {
        ...prev,
        [id]: { ...existing, rating }
      };
      console.log('⭐ Updated comments:', updated[id]);
      return updated;
    });
    showToast(t('ratingSaved'));
  };

  const handleDeleteRating = (id) => {
    console.log('⭐ App.handleDeleteRating called:', id);
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
  
  console.log('🔄 App render - handleSaveRating exists:', typeof handleSaveRating);

  const handleDeleteComment = (id) => {
    setComments(prev => {
      const newComments = { ...prev };
      delete newComments[id];
      return newComments;
    });
    showToast(t('commentDeleted'));
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(comments, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'comments.json';
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
        setComments(imported);
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
      showToast(t('clearSuccess'));
    }
  };

  const handleGeneratePDF = async () => {
    try {
      console.log('📄 Starting PDF generation...');
      console.log('📊 Comments data:', comments);
      console.log('📊 Number of comments:', Object.keys(comments).length);
      
      showToast(t('generatePDF') + '...', 'info');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;

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

      // Dodaj zawartość komentarzy
      let hasComments = false;
      
      for (const [layerId, layer] of Object.entries(MATRIX_DATA)) {
        let layerHasComments = false;
        const layerComments = [];

        // Zbierz komentarze dla tej warstwy
        layer.primary.forEach((pe) => {
          pe.secondary.forEach((seId) => {
            const cellId = `${layerId}-${seId}`;
            const seComment = comments[cellId];

            if (seComment) {
              console.log(`📝 Found comment for ${cellId}:`, seComment);
              hasComments = true;
              layerHasComments = true;
              const seName = getSEName(seId, language);
              layerComments.push({
                seId,
                seName,
                comment: seComment
              });
            }
          });
        });

        if (layerHasComments) {
          console.log(`📋 Adding layer ${layerId} with ${layerComments.length} comments`);
          // Nagłówek warstwy
          checkPageBreak(15);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          const layerName = encodeText(getLayerName(layerId, language));
          console.log(`  Layer name: ${layerName} at position ${yPosition}`);
          pdf.text(layerName, margin, yPosition);
          yPosition += 8;
          
          // Linia pod nagłówkiem
          pdf.setDrawColor(100, 100, 100);
          pdf.setLineWidth(0.5);
          pdf.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 8;

          // Komentarze w tej warstwie
          for (const item of layerComments) {
            const seDisplayName = `${item.seId} - ${item.seName}`;
            
            checkPageBreak(20);

            // ID i nazwa elementu
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.text(encodeText(seDisplayName), margin + 5, yPosition);
            yPosition += 6;

            // Ocena (jeśli istnieje)
            if (item.comment.rating !== null && item.comment.rating !== undefined) {
              pdf.setFontSize(9);
              pdf.setFont('helvetica', 'bold');
              const ratingText = `${t('ratingLabel')}: ${item.comment.rating}/5 - ${getRatingDescription(item.seId, item.comment.rating, language)}`;
              const splitRating = pdf.splitTextToSize(encodeText(ratingText), contentWidth - 15);
              for (let i = 0; i < splitRating.length; i++) {
                checkPageBreak(5);
                pdf.text(splitRating[i], margin + 10, yPosition);
                yPosition += 5;
              }
              yPosition += 2;
            }

            // Tytuł komentarza (tylko jeśli istnieje)
            if (item.comment.title) {
              pdf.setFontSize(9);
              pdf.setFont('helvetica', 'bold');
              const titleText = `${t('titleLabel')}: ${item.comment.title}`;
              pdf.text(encodeText(titleText), margin + 10, yPosition);
              yPosition += 5;
            }

            // Treść komentarza (tylko jeśli istnieje)
            if (item.comment.content) {
              pdf.setFont('helvetica', 'normal');
              const contentText = `${t('contentLabel')}: ${item.comment.content}`;
              const splitContent = pdf.splitTextToSize(encodeText(contentText), contentWidth - 15);
              
              for (let i = 0; i < splitContent.length; i++) {
                checkPageBreak(5);
                pdf.text(splitContent[i], margin + 10, yPosition);
                yPosition += 5;
              }
            }

            // Obrazy (jeśli istnieją)
            if (item.comment.images && item.comment.images.length > 0) {
              yPosition += 3;
              pdf.setFontSize(9);
              pdf.setFont('helvetica', 'bold');
              // Użyj prostego tekstu bez emoji dla PDF
              const imagesText = language === 'pl' ? 'Obrazy' : 'Images';
              pdf.text(encodeText(imagesText) + ':', margin + 10, yPosition);
              yPosition += 5;

              for (const img of item.comment.images) {
                const imgWidth = 60;
                const imgHeight = 40;
                
                checkPageBreak(imgHeight + 10);
                
                try {
                  pdf.addImage(img.data, 'JPEG', margin + 10, yPosition, imgWidth, imgHeight);
                  yPosition += imgHeight + 3;
                  
                  // Nazwa pliku pod obrazem
                  pdf.setFontSize(8);
                  pdf.setFont('helvetica', 'italic');
                  pdf.text(encodeText(img.name), margin + 10, yPosition);
                  yPosition += 5;
                } catch (imgErr) {
                  console.error('Error adding image to PDF:', imgErr);
                  pdf.setFontSize(8);
                  pdf.setFont('helvetica', 'italic');
                  pdf.text(encodeText('[Błąd wczytywania obrazu: ' + img.name + ']'), margin + 10, yPosition);
                  yPosition += 5;
                }
              }
            }
            
            yPosition += 8;
          }
        }
      }

      // Jeśli brak komentarzy
      if (!hasComments) {
        console.log('⚠️ No comments found in PDF generation');
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'italic');
        pdf.text(encodeText(t('pdfNoComments')), margin, yPosition);
      } else {
        console.log('✅ PDF generated with comments');
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
        <h1>{t('appTitle')}</h1>
        <div className="header-info">
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
        />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
      
      <HelpDialog 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)}
        language={language}
      />
    </div>
  );
}
