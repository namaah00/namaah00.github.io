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

  const handleGeneratePDF = async () => {
    try {
      showToast('Generowanie PDF...', 'info');
      
      // Tworzymy tymczasowy kontener z treścią raportu
      const reportContainer = document.createElement('div');
      reportContainer.style.position = 'absolute';
      reportContainer.style.left = '-9999px';
      reportContainer.style.width = '800px';
      reportContainer.style.padding = '40px';
      reportContainer.style.backgroundColor = '#ffffff';
      reportContainer.style.fontFamily = 'Arial, sans-serif';
      reportContainer.style.color = '#000000';
      
      // Nagłówek
      const header = document.createElement('div');
      header.innerHTML = `
        <h1 style="font-size: 24px; margin: 0 0 10px 0; font-weight: bold; color: #000;">
          Raport: System Analizy Informacji
        </h1>
        <p style="font-size: 12px; color: #666; margin: 0 0 5px 0;">
          Data generacji: ${new Date().toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        <p style="font-size: 12px; color: #666; margin: 0 0 30px 0;">
          Liczba komentarzy: ${Object.keys(comments).length}
        </p>
      `;
      reportContainer.appendChild(header);

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

      // Dodaj zawartość komentarzy
      let hasComments = false;
      Object.entries(MATRIX_DATA).forEach(([layerId, layer]) => {
        const layerDiv = document.createElement('div');
        layerDiv.style.marginTop = '20px';
        
        const layerTitle = document.createElement('h2');
        layerTitle.textContent = `${layerId}: ${layer.name}`;
        layerTitle.style.fontSize = '18px';
        layerTitle.style.fontWeight = 'bold';
        layerTitle.style.marginBottom = '15px';
        layerTitle.style.color = '#000';
        layerTitle.style.borderBottom = '2px solid #333';
        layerTitle.style.paddingBottom = '5px';
        
        let layerHasComments = false;

        const commentsDiv = document.createElement('div');

        layer.primary.forEach((pe) => {
          // Tylko Secondary Elements mogą mieć komentarze
          pe.secondary.forEach((seId) => {
            const cellId = `${layerId}-${seId}`;
            const seComment = comments[cellId];

            if (seComment) {
              hasComments = true;
              layerHasComments = true;
              
              const commentBlock = document.createElement('div');
              commentBlock.style.marginBottom = '12px';
              commentBlock.style.paddingLeft = '20px';
              
              commentBlock.innerHTML = `
                <div style="font-size: 13px; font-weight: bold; color: #000; margin-bottom: 4px;">
                  ${seId}
                </div>
                <div style="font-size: 11px; font-weight: bold; color: #333; margin-bottom: 3px; padding-left: 10px;">
                  Tytuł: ${seComment.title}
                </div>
                <div style="font-size: 10px; color: #555; padding-left: 10px; line-height: 1.5;">
                  Treść: ${seComment.content}
                </div>
              `;
              
              commentsDiv.appendChild(commentBlock);
            }
          });
        });

        if (layerHasComments) {
          layerDiv.appendChild(layerTitle);
          layerDiv.appendChild(commentsDiv);
          reportContainer.appendChild(layerDiv);
        }
      });

      // Jeśli brak komentarzy
      if (!hasComments) {
        const noComments = document.createElement('p');
        noComments.textContent = 'Brak komentarzy do wyświetlenia.';
        noComments.style.fontSize = '14px';
        noComments.style.fontStyle = 'italic';
        noComments.style.color = '#666';
        reportContainer.appendChild(noComments);
      }

      // Dodaj do DOM
      document.body.appendChild(reportContainer);
      
      // Poczekaj na renderowanie
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generuj canvas z html2canvas
      const canvas = await html2canvas(reportContainer, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });

      // Usuń tymczasowy kontener
      document.body.removeChild(reportContainer);

      // Utwórz PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Dodaj pierwszą stronę
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Dodaj kolejne strony jeśli trzeba
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('raport.pdf');
      showToast('PDF wygenerowany!');
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
