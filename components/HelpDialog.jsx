import { useState, useEffect } from 'react';
import { MATRIX_DATA, SE_NAMES } from './matrixData.js';

export default function HelpDialog({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    // Scroll to top when changing sections
    const mainContent = document.querySelector('.help-main');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sections = {
    intro: {
      title: '📖 Wprowadzenie',
      content: (
        <div>
          <h4>System Analizy Taktyk i Technik Cyberbezpieczeństwa</h4>
          <p>
            Aplikacja pozwala na systematyczną analizę informacji w trzech warstwach hierarchicznych:
          </p>
          <ul>
            <li><strong>L1 - Jakość Informacji:</strong> Ocena treści i źródła informacji</li>
            <li><strong>L2 - Szersze tło:</strong> Analiza kontekstu społecznego i geopolitycznego</li>
            <li><strong>L3 - Zestawienie źródeł:</strong> Porównanie różnych źródeł informacji</li>
          </ul>
          <h4>Jak używać aplikacji:</h4>
          <ol>
            <li>Kliknij na dowolny <strong>Secondary Element</strong> (SE) z przyciskiem "+"</li>
            <li>Dodaj tytuł i treść komentarza</li>
            <li>Zapisz komentarz - zostanie oznaczony ikoną 💬</li>
            <li>Eksportuj analizę do PDF lub JSON</li>
            <li>Importuj wcześniej zapisane analizy z JSON</li>
          </ol>
          <p>
            <strong>Uwaga:</strong> Tylko Secondary Elements (SE) są klikalne i mogą zawierać komentarze. 
            Primary Elements (PE) służą jako nagłówki kategorii.
          </p>
        </div>
      )
    },
    l1: {
      title: 'L1 - Jakość Informacji',
      content: (
        <div>
          <p>Warstwa podstawowa oceniająca fundamentalne aspekty informacji.</p>
          
          <div className="help-pe-section">
            <h4>001 - Ocena treści</h4>
            <p>Analiza samej treści przekazu pod kątem jakości i rzetelności.</p>
            <div className="help-se-list">
              <div className="help-se-item">
                <strong>001.1 - {SE_NAMES['001.1']}</strong>
                <p>Weryfikacja logicznej spójności argumentów i brak wewnętrznych sprzeczności.</p>
              </div>
              <div className="help-se-item">
                <strong>001.2 - {SE_NAMES['001.2']}</strong>
                <p>Ocena sposobu prezentacji informacji (tekst, wideo, grafika).</p>
              </div>
              <div className="help-se-item">
                <strong>001.3 - {SE_NAMES['001.3']}</strong>
                <p>Jawność źródeł, metod pozyskania danych i ewentualnych ograniczeń.</p>
              </div>
              <div className="help-se-item">
                <strong>001.4 - {SE_NAMES['001.4']}</strong>
                <p>Dokładność faktów, weryfikowalność danych i solidność podstaw.</p>
              </div>
              <div className="help-se-item">
                <strong>001.5 - {SE_NAMES['001.5']}</strong>
                <p>Bezstronność prezentacji, brak manipulacji i tendencyjności.</p>
              </div>
              <div className="help-se-item">
                <strong>001.6 - {SE_NAMES['001.6']}</strong>
                <p>Weryfikacja autentyczności dokumentów cyfrowych, brak manipulacji technicznych.</p>
              </div>
            </div>
          </div>

          <div className="help-pe-section">
            <h4>002 - Ocena Źródła</h4>
            <p>Analiza wiarygodności i reputacji źródła informacji.</p>
            <div className="help-se-list">
              <div className="help-se-item">
                <strong>002.1 - {SE_NAMES['002.1']}</strong>
                <p>Poziom kompetencji i uznania w danej dziedzinie.</p>
              </div>
              <div className="help-se-item">
                <strong>002.2 - {SE_NAMES['002.2']}</strong>
                <p>Historia publikacji, oceny społeczne i opinie ekspertów.</p>
              </div>
              <div className="help-se-item">
                <strong>002.3 - {SE_NAMES['002.3']}</strong>
                <p>Powiązania organizacyjne, finansowe i polityczne źródła.</p>
              </div>
              <div className="help-se-item">
                <strong>002.4 - {SE_NAMES['002.4']}</strong>
                <p>Wcześniejsze publikacje, ich trafność i korekty błędów.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    l2: {
      title: 'L2 - Szersze tło',
      content: (
        <div>
          <p>Warstwa kontekstowa analizująca szerszy obraz sytuacji.</p>
          
          <div className="help-pe-section">
            <h4>003 - Ocena kontekstu</h4>
            <p>Kompleksowa analiza okoliczności powstania i funkcjonowania informacji.</p>
            <div className="help-se-list">
              <div className="help-se-item">
                <strong>003.1 - {SE_NAMES['003.1']}</strong>
                <p>Czy informacja jest aktualna, jej data publikacji i ewentualne uaktualnienia.</p>
              </div>
              <div className="help-se-item">
                <strong>003.2 - {SE_NAMES['003.2']}</strong>
                <p>Intencje autora: informować, przekonywać, manipulować czy bawić.</p>
              </div>
              <div className="help-se-item">
                <strong>003.3 - {SE_NAMES['003.3']}</strong>
                <p>Grupa docelowa przekazu i dostosowanie treści do odbiorcy.</p>
              </div>
              <div className="help-se-item">
                <strong>003.4 - {SE_NAMES['003.4']}</strong>
                <p>Kontekst społeczny, kulturowy i ekonomiczny w momencie publikacji.</p>
              </div>
              <div className="help-se-item">
                <strong>003.5 - {SE_NAMES['003.5']}</strong>
                <p>Interesy finansowe, polityczne lub osobiste związane z przekazem.</p>
              </div>
              <div className="help-se-item">
                <strong>003.6 - {SE_NAMES['003.6']}</strong>
                <p>Warunki i okoliczności powstania informacji.</p>
              </div>
              <div className="help-se-item">
                <strong>003.7 - {SE_NAMES['003.7']}</strong>
                <p>Zmienność sytuacji, tempo wydarzeń i ewolucja informacji.</p>
              </div>
              <div className="help-se-item">
                <strong>003.8 - {SE_NAMES['003.8']}</strong>
                <p>Międzynarodowe aspekty sytuacji, relacje między państwami.</p>
              </div>
              <div className="help-se-item">
                <strong>003.9 - {SE_NAMES['003.9']}</strong>
                <p>Skala rozpowszechnienia informacji i jej wpływ.</p>
              </div>
              <div className="help-se-item">
                <strong>003.10 - {SE_NAMES['003.10']}</strong>
                <p>Techniczne aspekty przekazu: format, jakość, kanały dystrybucji.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    l3: {
      title: 'L3 - Zestawienie źródeł',
      content: (
        <div>
          <p>Warstwa porównawcza analizująca różnice i zgodności między źródłami.</p>
          
          <div className="help-pe-section">
            <h4>004 - Ocena kontrastu</h4>
            <p>Porównanie i weryfikacja informacji z różnych źródeł.</p>
            <div className="help-se-list">
              <div className="help-se-item">
                <strong>004.1 - {SE_NAMES['004.1']}</strong>
                <p>Punkty wspólne między różnymi źródłami, potwierdzenie faktów.</p>
              </div>
              <div className="help-se-item">
                <strong>004.2 - {SE_NAMES['004.2']}</strong>
                <p>Różnice w relacjach, sprzeczne informacje wymagające wyjaśnienia.</p>
              </div>
              <div className="help-se-item">
                <strong>004.3 - {SE_NAMES['004.3']}</strong>
                <p>Zróżnicowanie typów źródeł: media, eksperci, dokumenty, świadkowie.</p>
              </div>
              <div className="help-se-item">
                <strong>004.4 - {SE_NAMES['004.4']}</strong>
                <p>Międzynarodowy wymiar źródeł, perspektywy różnych krajów.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    usage: {
      title: '🔧 Funkcje aplikacji',
      content: (
        <div>
          <h4>Dodawanie komentarzy</h4>
          <ol>
            <li>Znajdź Secondary Element (SE), który chcesz przeanalizować</li>
            <li>Kliknij na kartę SE z przyciskiem "+"</li>
            <li>W oknie dialogowym wprowadź:
              <ul>
                <li><strong>Tytuł:</strong> Krótkie podsumowanie (np. "Źródło niezweryfikowane")</li>
                <li><strong>Treść:</strong> Szczegółowa analiza i wnioski</li>
              </ul>
            </li>
            <li>Kliknij "💾 Zapisz"</li>
          </ol>

          <h4>Edycja i usuwanie</h4>
          <ul>
            <li>Kliknij na SE z ikoną 💬 aby edytować komentarz</li>
            <li>W oknie dialogowym możesz zmienić tytuł i treść</li>
            <li>Użyj przycisku "🗑️ Usuń" aby usunąć komentarz</li>
          </ul>

          <h4>Eksport do PDF</h4>
          <ol>
            <li>Kliknij przycisk "📄 Eksportuj PDF"</li>
            <li>Aplikacja wygeneruje wizualizację matrycy + wszystkie komentarze</li>
            <li>PDF zawiera:
              <ul>
                <li>Pełną matrycę z zaznaczonymi komentarzami</li>
                <li>Listę wszystkich komentarzy pogrupowanych wg warstw</li>
                <li>Datę i godzinę generowania raportu</li>
              </ul>
            </li>
          </ol>

          <h4>Eksport/Import JSON</h4>
          <p><strong>Eksport:</strong></p>
          <ol>
            <li>Kliknij "💾 Eksportuj JSON"</li>
            <li>Zapisz plik na dysku</li>
          </ol>
          
          <p><strong>Import:</strong></p>
          <ol>
            <li>Kliknij "📥 Importuj JSON"</li>
            <li>Wybierz wcześniej zapisany plik</li>
            <li>Wszystkie komentarze zostaną wczytane</li>
          </ol>

          <h4>Czyszczenie danych</h4>
          <ul>
            <li>Kliknij "🗑️ Wyczyść wszystko" aby usunąć wszystkie komentarze</li>
            <li>Pojawi się potwierdzenie przed usunięciem</li>
          </ul>
        </div>
      )
    },
    tips: {
      title: '💡 Wskazówki',
      content: (
        <div>
          <h4>Efektywna analiza</h4>
          <ul>
            <li><strong>Rozpocznij od L1:</strong> Najpierw oceń jakość samej informacji</li>
            <li><strong>Przejdź do L2:</strong> Zrozum szerszy kontekst sytuacji</li>
            <li><strong>Zakończ na L3:</strong> Porównaj z innymi źródłami</li>
          </ul>

          <h4>Tworzenie komentarzy</h4>
          <ul>
            <li><strong>Tytuł:</strong> Powinien być krótki i opisowy (2-5 słów)</li>
            <li><strong>Treść:</strong> Zawieraj konkretne fakty, obserwacje i wnioski</li>
            <li><strong>Cytuj:</strong> Jeśli możliwe, odnoś się do konkretnych źródeł</li>
            <li><strong>Data:</strong> Uwzględnij daty wydarzeń i publikacji</li>
          </ul>

          <h4>Organizacja pracy</h4>
          <ul>
            <li>Regularnie eksportuj JSON jako backup</li>
            <li>Używaj spójnej konwencji nazewnictwa w tytułach</li>
            <li>Generuj PDF po zakończeniu analizy jako raport końcowy</li>
            <li>Dla złożonych analiz twórz osobne pliki JSON dla różnych tematów</li>
          </ul>

          <h4>Najlepsze praktyki</h4>
          <ul>
            <li><strong>Obiektywność:</strong> Oddzielaj fakty od opinii</li>
            <li><strong>Weryfikacja:</strong> Sprawdzaj informacje w wielu źródłach</li>
            <li><strong>Dokumentacja:</strong> Zapisuj źródła i linki w treści komentarzy</li>
            <li><strong>Regularność:</strong> Aktualizuj analizę w miarę napływu nowych informacji</li>
          </ul>

          <h4>Skróty klawiszowe</h4>
          <ul>
            <li><strong>ESC:</strong> Zamknij otwarty dialog</li>
            <li><strong>Kliknięcie poza dialog:</strong> Zamknij bez zapisywania</li>
          </ul>
        </div>
      )
    }
  };

  return (
    <div className="dialog-backdrop help-backdrop" onClick={handleBackdropClick}>
      <div className="dialog help-dialog">
        <div className="dialog-header">
          <h3>❓ Samouczek</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="help-content">
          <div className="help-sidebar">
            <nav className="help-nav">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  className={`help-nav-btn ${activeSection === key ? 'active' : ''}`}
                  onClick={() => handleSectionChange(key)}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          <div className="help-main">
            <div className="help-section-content">
              <h3>{sections[activeSection].title}</h3>
              {sections[activeSection].content}
            </div>
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            ✓ Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
