import { useState, useRef } from 'react';
import { Sun, Moon, FileText, Save, Download, Trash2, Home, HelpCircle, BarChart3, Globe, MessageSquareText } from 'lucide-react';
import LandingPage from './components/LandingPage.jsx';
import MatrixView from './components/MatrixView.jsx';
import Toast from './components/Toast.jsx';
import HelpDialog from './components/HelpDialog.jsx';
import RadarChartDialog from './components/RadarChartDialog.jsx';
import PDFConfigDialog from './components/PDFConfigDialog.jsx';
import { translations } from './components/translations.js';
import { MATRIX_DATA } from './components/matrixData.js';
import { generatePDF } from './components/pdfGenerator.js';

// 🆕 Nowe importy - utility functions i custom hooks
import { useLanguage, useTheme, useToast, useComments, useSources } from './components/hooks.js';
import { exportJSON, readImportFile } from './components/exportUtils.js';
import { saveComment, deleteComment, saveRating, deleteRating, countComments } from './components/commentUtils.js';
import { removeFromStorage } from './components/storageUtils.js';
import { STORAGE_KEYS } from './components/constants.js';

//logika aplikacji
export default function App() {
  //stan czy aktywny jest landing page czy matrix(domyślnie landing page)
  const [currentView, setCurrentView] = useState('landing');
  
  //stan czy okno konfiguracji pdf jest otwarte
  const [showPDFConfig, setShowPDFConfig] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isRadarChartOpen, setIsRadarChartOpen] = useState(false);
  const matrixRef = useRef(null);

  // 🆕 Custom hooks zamiast useState + useEffect
  const [language, setLanguage, toggleLanguage] = useLanguage();
  const [isDarkMode, toggleDarkMode] = useTheme();
  const [toast, showToast] = useToast();
  const [comments, setComments] = useComments(showToast);
  const [sources, setSources] = useSources();
  
  //pobiera tłumaczenia do odpowiedniego jezyka
  const t = (key) => translations[language][key] || key;

  // 🆕 Handlery dla komentarzy używają utility functions
  const handleSaveComment = (id, title, content, images = []) => {
    setComments(prev => saveComment(prev, id, title, content, images));
    showToast(t('commentSaved'));
  };

  const handleDeleteComment = (id) => {
    setComments(prev => deleteComment(prev, id));
    showToast(t('commentDeleted'));
  };

  const handleSaveRating = (id, rating) => {
    setComments(prev => saveRating(prev, id, rating));
    showToast(t('ratingSaved'));
  };

  const handleDeleteRating = (id) => {
    setComments(prev => deleteRating(prev, id));
    showToast(t('ratingDeleted'));
  };

  //zarządza 004
  //dodawanie źródeł, generuje unikalne Id
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

  //usuwanie źrodła 
  const handleDeleteSource = (sourceId) => {
    setSources(prev => {
      const filtered = prev.filter(s => s.id !== sourceId);
      // Przenumeruj źródła, tak żeby numeracja się zgadzała
      return filtered.map((source, index) => ({
        ...source,
        id: `004.${index + 1}`
      }));
    });

    // Usuń komentarze powiazane z usuwanym źródłem
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

  //eksport json, tworzy plik z komentarzami i zrodlami
  const handleExportJSON = () => {
    exportJSON(comments, sources);
    showToast(t('exportSuccess'));
  };

  //import json, wczytuje plik json (obsluguje wersję ze źródłami oraz bez)
  const handleImportJSON = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const result = await readImportFile(file);
    
    if (result.success) {
      setComments(result.data.comments);
      setSources(result.data.sources);
      showToast(t('importSuccess'));
    } else {
      showToast(t('importError'), 'error');
    }
    
    e.target.value = '';
  };

  //usuwa komentarze, zrodła i czyści local storage po potwierdzeniu od użytkownika
  const handleClearAll = () => {
    if (window.confirm(t('confirmClear'))) {
      setComments({});
      setSources([]);
      removeFromStorage(STORAGE_KEYS.COMMENTS);
      removeFromStorage(STORAGE_KEYS.SOURCES);
      showToast(t('clearSuccess'));
    }
  };

  //generowanie raportu pdf (z funkcji generatePDF)
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

  const commentCount = countComments(comments);

  //czyści wszytskie dane i przechodzi do widoku macierzy
  const handleNewProject = () => {
    setComments({});
    setSources([]);
    removeFromStorage(STORAGE_KEYS.COMMENTS);
    removeFromStorage(STORAGE_KEYS.SOURCES);
    setCurrentView('matrix');
    showToast(language === 'pl' ? 'Nowy projekt utworzony' : 'New project created');
  };

  //powrót na Landing Page
  const handleBackToHome = () => {
    setCurrentView('landing');
  };

  //import json z Landing Page
  const handleImportFromLanding = (data) => {
    try {
      //nowy format ze żródłami
      if (data.version === '2.0' && data.comments) {
        setComments(data.comments || {});
        setSources(data.sources || []);
      } 
      //stary format, same komentarze
      else {
        setComments(data);
      }
      setCurrentView('matrix');
      showToast(t('importSuccess'));
    } catch (err) {
      showToast(t('importError'), 'error');
    }
  };

  //widok strony startowej
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

  //widok strony z macierzą
  //naglowek i przyciski
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