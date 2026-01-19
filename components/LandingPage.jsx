import { useRef } from 'react';
import { Sun, Moon, FileText, Download, Globe } from 'lucide-react';

export default function LandingPage({ 
  onNewProject, //uruchomienie nowego projektu
  onImportProject, //wczytywanie json
  language, //aktualny język
  toggleLanguage, //zmiana języka
  isDarkMode, //sprawdzanie czy tryb jest ciemny
  toggleDarkMode, //zmiana trybu
  t //funkcja tlumaczeń
}) {
  const fileInputRef = useRef(null);
//przekazanie wybranego pliku do processFile
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };
//jesli plik nie jest json to wyskakuje błąd
  const processFile = (file) => {
    if (file.type !== 'application/json') {
      alert(t('invalidFileType'));
      return;
    }
//zamiana pliku na obiekt JS (JSON.parse)
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
//otwarcie okna wyboru pliku
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };
//render UI
  return (
    <div className={`landing-page ${isDarkMode ? 'dark' : ''}`}>
      {/*nagłowek  i buttony do zmiany języka i trybu*/}
      <header className="landing-header">
        <h1>{t('appTitle')}</h1>
        <div className="landing-header-buttons">
          <button
            onClick={toggleLanguage}
            className="btn btn-language"
            title={t('changeLanguage')}
          >
            <Globe size={16} /> {language === 'pl' ? 'EN' : 'PL'}
          </button>
          <button
            onClick={toggleDarkMode}
            className="btn btn-theme"
            title={t('toggleTheme')}
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </header>

      {/*główna część strony*/}
      <main className="landing-main">
        <div className="landing-content">
          {/*tytuł pobierany z tlumaczeń w zaleznosci od języka*/}
          <div className="landing-title">
            <h2>{t('welcomeTitle')}</h2>
            <p>{t('welcomeSubtitle')}</p>
          </div>

          {/*opcje wyboru */}
          <div className="landing-cards">
            {/*wybór karty nowego projektu, przejście do widoku modelu*/}
            <div
              className="landing-card"
              onClick={onNewProject}
              role="button"
              tabIndex={0}
            >
              <div className="landing-card-icon landing-card-icon-blue">
                <FileText size={32} />
              </div>
              <h3>{t('newProject')}</h3>
              <p>{t('newProjectDescription')}</p>
            </div>

            {/*wybór karty importu projektu, otwiera okno wyboru pliku*/}
            <div
              className="landing-card"
              onClick={handleImportClick}
              role="button"
              tabIndex={0}
            >
              <div className="landing-card-icon landing-card-icon-green">
                <Download size={32} />
              </div>
              <h3>{t('importProject')}</h3>
              <p>{t('importProjectDescription')}</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </main>

      {/*stopka strony*/}
      <footer className="landing-footer">
        <p>{t('footerText')}</p>
      </footer>
    </div>
  );
}