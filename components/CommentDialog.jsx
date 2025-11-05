import { useState, useEffect } from 'react'; //do stanu i synchronizacji
import { translations } from './translations.js'; //obiekt z tłumaczeniami
import { getSEName } from './matrixData.js'; //funkcja zwracająca nazwę elementu na podstawie ID i języka

export default function CommentDialog({
  isOpen, //boolean; czy dialog ma być widoczny
  onClose, //funkcja; wywoływana, gdy dialog ma się zamknąć
  onSave, //funkcja; wywoływana, gdy użytkownik zapisuje komentarz; dostaje tytuł i treść
  onDelete, //funkcja; wywoływana przy usuwaniu komentarza
  initialTitle = '', //string; początkowy tytuł (domyślnie '')
  initialContent = '', //string; początkowa treść (domyślnie '')
  cellId, //string; identyfikator komórki (np. zawierający warstwę i id rozdzielone myślnikiem)
  hasComment, //boolean; czy komentarz już istnieje (używane do pokazania przycisku usuń)
  language //klucz języka (np. 'pl', 'en'), używany do tłumaczeń
}) 

//funcja tłumaczenia pl en
{
  //t(key) zwraca tłumaczenie dla bieżącego języka; jeśli brak tłumaczenia, zwraca sam klucz (fallback)
  const t = (key) => translations[language][key] || key;
  
  //title i content przechowują aktualne wartości pól formularza
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  //Jeżeli initialTitle lub initialContent się zmienią z zewnątrz, stan formularza zostanie 
  //zaktualizowany tak, aby odzwierciedlać nowe wartości. Zapobiega to rozjechaniu wartości pól i propów
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  //handleSave wywołuje onSave(title, content) tylko wtedy, gdy przynajmniej jedno z pól zawiera 
  // niepusty tekst (po trim). Pozwala to uniknąć zapisu pustego komentarza
  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave(title, content);
    }
  };

  //Kliknięcie w warstwę tła (poza samym dialogiem) zamyka dialog. Sprawdzenie 
  // e.target === e.currentTarget zapobiega zamknięciu przy kliknięciu elementów wewnątrz dialogu
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  //Jeśli isOpen jest false, komponent nic nie renderuje (zwraca null)
  if (!isOpen) return null;

  // Wyciągnij tylko ID elementu (bez warstwy)
  const elementId = cellId.split('-')[1];
  const elementName = getSEName(elementId, language);
  const displayName = `${elementId} - ${elementName}`;

  //render okna dialogowego
  //dialog: główny kontener okna dialogowego
  //dialog-header: tytuł okna dialogowego
  //dialog-body: tytuł i treść komentarza
  //dialog-footer: przyciski na dole okna dialogowego
  
  return (
    <div className="dialog-backdrop" onClick={handleBackdropClick}>
      <div className="dialog"> 

        <div className="dialog-header">
          <h3>{t('commentTitle')} - {displayName}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="dialog-body">
          <div className="form-group">
            <label htmlFor="title">{t('titleLabel')}</label>
            <input
              id="title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('titlePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">{t('contentLabel')}</label>
            <textarea
              id="content"
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('contentPlaceholder')}
              rows={6}
            />
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn btn-primary" onClick={handleSave}>
            💾 {t('save')}
          </button>
          {hasComment && (
            <button className="btn btn-danger" onClick={onDelete}>
              🗑️ {t('delete')}
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>
            ✕ {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
