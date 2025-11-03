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
    if (!matrixRef.current) return;

    try {
      showToast('Generowanie PDF...', 'info');
      const canvas = await html2canvas(matrixRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save('raport.pdf');
      showToast('PDF wygenerowany!');
    } catch (err) {
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
