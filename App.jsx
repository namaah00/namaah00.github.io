import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Camera, FileText, Save, Download, Trash2, Home, HelpCircle, BarChart3, Globe, MessageSquareText } from 'lucide-react';
import LandingPage from './components/LandingPage.jsx';
import MatrixView from './components/MatrixView.jsx';
import Toast from './components/Toast.jsx';
import HelpDialog from './components/HelpDialog.jsx';
import RadarChartDialog from './components/RadarChartDialog.jsx';
import PDFConfigDialog from './components/PDFConfigDialog.jsx';
import { translations } from './components/translations.js';
import { MATRIX_DATA, getSEName, getLayerName, getRatingDescription, getPEName } from './components/matrixData.js';
import { generatePDF } from './components/pdfGenerator.js';
import html2canvas from 'html2canvas';

// Version: Separated rating system v2 + Sources + PDF L3 FIX v3 + Landing Page + Enhanced PDF
export default function App() {
  // View state: 'landing' or 'matrix'
  const [currentView, setCurrentView] = useState('landing');

  // Language management
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app-language') || 'pl';
  });
  
  // Dark mode management
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('app-theme') === 'dark';
  });
  
  // PDF Config Dialog
  const [showPDFConfig, setShowPDFConfig] = useState(false);
  
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
      // Ignore storage errors for sources
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
      localStorage.removeItem('matrix-comments');
      localStorage.removeItem('pe004-sources');
      showToast(t('clearSuccess'));
    }
  };

  const handleGeneratePDF = async (title = '', author = '') => {
    try {
      showToast(t('generatePDF') + '...', 'info');
      
      await generatePDF({
        comments,
        sources,
        MATRIX_DATA,
        language,
        title,
        author
      });
      
      showToast(t('pdfGenerated'));
    } catch (err) {
      console.error(err);
      showToast(t('pdfGenerateError'), 'error');
    }
  };

  const commentCount = Object.keys(comments).length;

  // Handler for new project - clears all data and shows matrix
  const handleNewProject = () => {
    setComments({});
    setSources([]);
    localStorage.removeItem('matrix-comments');
    localStorage.removeItem('pe004-sources');
    setCurrentView('matrix');
    showToast(language === 'pl' ? 'Nowy projekt utworzony' : 'New project created');
  };

  // Handler for going back to landing page
  const handleBackToHome = () => {
    setCurrentView('landing');
  };

  // Handler for import project from landing page
  const handleImportFromLanding = (data) => {
    try {
      // New format with sources
      if (data.version === '2.0' && data.comments) {
        setComments(data.comments || {});
        setSources(data.sources || []);
      } 
      // Old format - only comments
      else {
        setComments(data);
      }
      setCurrentView('matrix');
      showToast(t('importSuccess'));
    } catch (err) {
      showToast(t('importError'), 'error');
    }
  };

  // Show landing page
  if (currentView === 'landing') {
    return (
      <LandingPage
        onNewProject={handleNewProject}
        onImportProject={handleImportFromLanding}
        language={language}
        toggleLanguage={toggleLanguage}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        t={t}
      />
    );
  }

  // Show matrix view
  return (
    <div className="app">
      <header className="header">
        <div className="header-title">
          <h1>{t('appTitle')}</h1>
          <p className="header-subtitle">{t('appSubtitle')}</p>
        </div>
        <div className="header-info">
          <button className="btn btn-theme" onClick={toggleDarkMode} title={isDarkMode ? 'Jasny motyw' : 'Ciemny motyw'}>
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
          <button className="btn btn-language" onClick={toggleLanguage}>
            <Globe /> {language === 'pl' ? 'EN' : 'PL'}
          </button>
          <button className="btn btn-help" onClick={() => setIsHelpOpen(true)}>
            <HelpCircle /> {t('help')}
          </button>
          <span className="comment-count">
            <MessageSquareText /> {t('comments')}: {commentCount}
          </span>
          <button className="btn btn-secondary" onClick={handleBackToHome}>
            <Home /> {t('backToHome')}
          </button>
        </div>
      </header>

      <div className="toolbar">
        <button className="btn btn-primary" onClick={() => setIsRadarChartOpen(true)}>
          <BarChart3 /> {t('radarChart')}
        </button>
        <button className="btn btn-primary" onClick={handleExportImage}>
          <Camera /> {t('exportJPEG')}
        </button>
        <button className="btn btn-primary" onClick={() => setShowPDFConfig(true)}>
          <FileText /> {t('generatePDF')}
        </button>
        <button className="btn btn-secondary" onClick={handleExportJSON}>
          <Save /> {t('exportJSON')}
        </button>
        <label className="btn btn-secondary">
          <Download /> {t('importJSON')}
          <input
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            style={{ display: 'none' }}
          />
        </label>
        {commentCount > 0 && (
          <button className="btn btn-danger" onClick={handleClearAll}>
            <Trash2 /> {t('clearAll')}
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
      
      <PDFConfigDialog
        isOpen={showPDFConfig}
        onClose={() => setShowPDFConfig(false)}
        onGenerate={(config) => {
          setShowPDFConfig(false);
          handleGeneratePDF(config.title, config.author);
        }}
        language={language}
      />
    </div>
  );
}