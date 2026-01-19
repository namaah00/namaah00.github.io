import { useState } from 'react';
import { FileText } from 'lucide-react';
import { translations } from '../translations.js';

export default function PDFConfigDialog({ isOpen, onGenerate, onClose, language }) {
  const [reportTitle, setReportTitle] = useState(''); //tytuł raportu, który podaje użytkownik
  const [authorName, setAuthorName] = useState(''); //autor (również wypełniany przez użytkownika)

  //pobiera odpowiednią wartość z pliku translations w zalżności od wybranego języka
  const t = (key) => translations[language][key];

  //
  const handleSubmit = (e) => {
    e.preventDefault(); //zapobiega przeładowaniu strony przy submit
    if (!reportTitle.trim() || !authorName.trim()) { //sprawdza czy oba pola są wypełnione
      alert(t('pdfValidationError'));
      return;
    }
    onGenerate({ title: reportTitle.trim(), author: authorName.trim() }); //przekazuje obiekt { title, author }
    onClose();
  };

  if (!isOpen) return null; //dialog pojawia się tylko gdy isOpen jest true

  //widok, pola tekstowe dla tytułu i autora
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog pdf-config-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>{t('pdfDialogTitle')}</h3>
          <button className="dialog-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="dialog-content pdf-config-form">
          <div className="form-group">
            <label htmlFor="report-title">
              {t('pdfReportTitleLabel')} <span className="required">*</span>
            </label>
            <input
              type="text"
              id="report-title"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              placeholder={t('pdfReportTitlePlaceholder')}
              maxLength={200}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="author-name">
              {t('pdfAuthorLabel')} <span className="required">*</span>
            </label>
            <input
              type="text"
              id="author-name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder={t('pdfAuthorPlaceholder')}
              maxLength={100}
            />
          </div>

          <div className="dialog-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {t('pdfCancelButton')}
            </button>
            <button type="submit" className="btn btn-primary">
              <FileText size={16} style={{ marginRight: '5px' }} />
              {t('pdfGenerateButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
