import { useState } from 'react'; //przechowywanie tekstu wpisanego przez użytkownika
import { getTranslation } from '../translations.js';

export default function SourceDialog({ onClose, onSave, language }) {
  const [sourceTitle, setSourceTitle] = useState(''); //przechowuje co użytkownik wpisuje w polu

  //obsługa wysłania formularza
  const handleSubmit = (e) => {
    e.preventDefault(); //zapobiega przeładowaniu strony
    if (sourceTitle.trim()) { //sprawdza, czy użytkownik coś wpisał
      onSave(sourceTitle.trim()); //przekazuje nazwę źródła do rodzica
      onClose(); //zamyka dialog
    }
  };

  const t = (key) => getTranslation(language, key);

  //widok
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog source-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>{t('sourceDialogTitle')}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        {/**formularz*/}
        <form onSubmit={handleSubmit}>
          <div className="dialog-body">
            <div className="form-group">
              <label htmlFor="source-title">{t('sourceDialogNameLabel')}</label>
              <input
                id="source-title"
                type="text"
                className="form-input"
                value={sourceTitle}
                onChange={(e) => setSourceTitle(e.target.value)} //wpisywanie tekstu
                placeholder={t('sourceDialogNamePlaceholder')}
                autoFocus
                required
              />
            </div>
          </div>
          <div className="dialog-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {t('sourceDialogCancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              {t('sourceDialogAdd')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
