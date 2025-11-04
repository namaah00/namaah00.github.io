import { useState, useRef } from 'react';
import MatrixView from './components/MatrixView.jsx';
import Toast from './components/Toast.jsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function App() {
  const [comments, setComments] = useState({});
  const [toast, setToast] = useState(null);
  const matrixRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveComment = (id, title, content) => {
    setComments(prev => ({
      ...prev,
      [id]: { title, content }
    }));
    showToast('Komentarz zapisany!');
  };

  const handleDeleteComment = (id) => {
    setComments(prev => {
      const newComments = { ...prev };
      delete newComments[id];
      return newComments;
    });
    showToast('Komentarz usunięty!');
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(comments, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'komentarze.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('JSON wyeksportowany!');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        setComments(imported);
        showToast('JSON zaimportowany!');
      } catch (err) {
        showToast('Błąd importu JSON!', 'error');
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

  const handleGeneratePDF = () => {
    try {
      showToast('Generowanie PDF...', 'info');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      let yPos = margin;

      // Tytuł raportu
      pdf.setFontSize(20);
      pdf.setFont(undefined, 'bold');
      pdf.text('Raport: System Analizy Informacji', margin, yPos);
      yPos += 15;

      // Data generacji
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      const date = new Date().toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      pdf.text(`Data generacji: ${date}`, margin, yPos);
      yPos += 10;

      // Liczba komentarzy
      pdf.text(`Liczba komentarzy: ${Object.keys(comments).length}`, margin, yPos);
      yPos += 15;

      // Struktura danych matrycy
      const MATRIX_DATA = {
        L1: {
          name: 'Jakość Informacji',
          primary: [
            { id: 'PE1', name: 'Wiarygodność źródła', secondary: ['SE1.1', 'SE1.2', 'SE1.3'] },
            { id: 'PE2', name: 'Spójność informacji', secondary: ['SE2.1', 'SE2.2'] },
            { id: 'PE3', name: 'Kompletność danych', secondary: ['SE3.1', 'SE3.2', 'SE3.3'] }
          ]
        },
        L2: {
          name: 'Szersze Tło',
          primary: [
            { id: 'PE4', name: 'Kontekst historyczny', secondary: ['SE4.1', 'SE4.2'] },
            { id: 'PE5', name: 'Powiązania geograficzne', secondary: ['SE5.1', 'SE5.2', 'SE5.3'] },
            { id: 'PE6', name: 'Analiza czasowa', secondary: ['SE6.1', 'SE6.2'] }
          ]
        },
        L3: {
          name: 'Zestawienie Źródeł',
          primary: [
            { id: 'PE7', name: 'Źródła otwarte', secondary: ['SE7.1', 'SE7.2', 'SE7.3'] },
            { id: 'PE8', name: 'Źródła zamknięte', secondary: ['SE8.1', 'SE8.2'] },
            { id: 'PE9', name: 'Weryfikacja krzyżowa', secondary: ['SE9.1', 'SE9.2', 'SE9.3'] }
          ]
        }
      };

      // Funkcja do dodawania nowej strony jeśli potrzeba
      const checkPageBreak = (neededSpace) => {
        if (yPos + neededSpace > pageHeight - margin) {
          pdf.addPage();
          yPos = margin;
          return true;
        }
        return false;
      };

      // Iteruj po warstwach i elementach
      Object.entries(MATRIX_DATA).forEach(([layerId, layer]) => {
        // Nagłówek warstwy
        checkPageBreak(20);
        pdf.setFontSize(16);
        pdf.setFont(undefined, 'bold');
        pdf.text(`${layerId}: ${layer.name}`, margin, yPos);
        yPos += 10;

        // Primary Elements
        layer.primary.forEach((pe) => {
          const peId = `${layerId}-${pe.id}`;
          const peComment = comments[peId];

          if (peComment) {
            checkPageBreak(30);
            
            // Primary Element header
            pdf.setFontSize(12);
            pdf.setFont(undefined, 'bold');
            pdf.text(`${pe.id}: ${pe.name}`, margin + 5, yPos);
            yPos += 7;

            // Tytuł komentarza
            pdf.setFontSize(11);
            pdf.setFont(undefined, 'bold');
            const titleLines = pdf.splitTextToSize(`Tytuł: ${peComment.title}`, maxWidth - 10);
            titleLines.forEach(line => {
              checkPageBreak(7);
              pdf.text(line, margin + 10, yPos);
              yPos += 7;
            });

            // Treść komentarza
            pdf.setFontSize(10);
            pdf.setFont(undefined, 'normal');
            const contentLines = pdf.splitTextToSize(`Treść: ${peComment.content}`, maxWidth - 10);
            contentLines.forEach(line => {
              checkPageBreak(6);
              pdf.text(line, margin + 10, yPos);
              yPos += 6;
            });

            yPos += 5;
          }

          // Secondary Elements
          pe.secondary.forEach((seId) => {
            const cellId = `${layerId}-${seId}`;
            const seComment = comments[cellId];

            if (seComment) {
              checkPageBreak(25);
              
              // Secondary Element header
              pdf.setFontSize(11);
              pdf.setFont(undefined, 'bold');
              pdf.text(`  ${seId}`, margin + 10, yPos);
              yPos += 7;

              // Tytuł komentarza
              pdf.setFontSize(10);
              pdf.setFont(undefined, 'bold');
              const titleLines = pdf.splitTextToSize(`Tytuł: ${seComment.title}`, maxWidth - 15);
              titleLines.forEach(line => {
                checkPageBreak(6);
                pdf.text(line, margin + 15, yPos);
                yPos += 6;
              });

              // Treść komentarza
              pdf.setFontSize(9);
              pdf.setFont(undefined, 'normal');
              const contentLines = pdf.splitTextToSize(`Treść: ${seComment.content}`, maxWidth - 15);
              contentLines.forEach(line => {
                checkPageBreak(5);
                pdf.text(line, margin + 15, yPos);
                yPos += 5;
              });

              yPos += 4;
            }
          });
        });

        yPos += 5;
      });

      // Jeśli nie ma komentarzy
      if (Object.keys(comments).length === 0) {
        pdf.setFontSize(12);
        pdf.setFont(undefined, 'italic');
        pdf.text('Brak komentarzy do wyświetlenia.', margin, yPos);
      }

      pdf.save('raport.pdf');
      showToast('PDF wygenerowany z tekstem!');
    } catch (err) {
      console.error(err);
      showToast('Błąd generowania PDF!', 'error');
    }
  };

  const commentCount = Object.keys(comments).length;

  return (
    <div className="app">
      <header className="header">
        <h1>System Analizy Informacji</h1>
        <div className="header-info">
          <span className="comment-count">
            📝 Komentarzy: {commentCount}
          </span>
        </div>
      </header>

      <div className="toolbar">
        <button className="btn btn-primary" onClick={handleExportImage}>
          📷 Eksport JPEG
        </button>
        <button className="btn btn-primary" onClick={handleGeneratePDF}>
          📄 Generuj PDF
        </button>
        <button className="btn btn-secondary" onClick={handleExportJSON}>
          ⬇️ Eksport JSON
        </button>
        <label className="btn btn-secondary">
          ⬆️ Import JSON
          <input
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div className="content" ref={matrixRef}>
        <MatrixView
          comments={comments}
          onSave={handleSaveComment}
          onDelete={handleDeleteComment}
        />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
