import React, { useRef, useState } from 'react';

export default function LandingPage({ onNewProject, onImportProject, language, toggleLanguage, isDarkMode, toggleDarkMode, t }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    if (file.type !== 'application/json') {
      alert(t('invalidFileType'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        onImportProject(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert(t('invalidJSON'));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={`landing-page ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="landing-header">
        <h1>{t('appTitle')}</h1>
        <div className="landing-header-buttons">
          <button
            onClick={toggleLanguage}
            className="btn btn-language"
            title={t('changeLanguage')}
          >
            🌐 {language === 'pl' ? 'EN' : 'PL'}
          </button>
          <button
            onClick={toggleDarkMode}
            className="btn btn-theme"
            title={t('toggleTheme')}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="landing-main">
        <div className="landing-content">
          {/* Title */}
          <div className="landing-title">
            <h2>{t('welcomeTitle')}</h2>
            <p>{t('welcomeSubtitle')}</p>
          </div>

          {/* Options Grid */}
          <div className="landing-options">
            {/* New Project Card */}
            <button onClick={onNewProject} className="landing-card">
              <div className="landing-card-icon landing-card-icon-blue">
                📄
              </div>
              <h3>{t('newProject')}</h3>
              <p>{t('newProjectDescription')}</p>
            </button>

            {/* Import Project Card */}
            <div
              className={`landing-card landing-import ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <button
                onClick={() => fileInputRef.current?.click()}
                className="landing-card-button"
              >
                <div className="landing-card-icon landing-card-icon-green">
                  📥
                </div>
                <h3>{t('importProject')}</h3>
                <p>{t('importProjectDescription')}</p>
                <p className="landing-drag-hint">{t('dragDropHint')}</p>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="landing-info">
            <h4>{t('aboutSystem')}</h4>
            <ul>
              <li>{t('feature1')}</li>
              <li>{t('feature2')}</li>
              <li>{t('feature3')}</li>
              <li>{t('feature4')}</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <p>{t('footerText')}</p>
      </footer>
    </div>
  );
}