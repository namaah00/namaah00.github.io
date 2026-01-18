import { useState } from 'react';
import { FileText } from 'lucide-react';
import { translations } from './translations.js';

export default function PDFConfigDialog({ isOpen, onGenerate, onClose, language }) {
  const [reportTitle, setReportTitle] = useState('');
  const [authorName, setAuthorName] = useState('');

  const t = (key) => translations[language][key];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reportTitle.trim() || !authorName.trim()) {
      alert(t('pdfValidationError'));
      return;
    }
    onGenerate({ title: reportTitle.trim(), author: authorName.trim() });
    onClose();
  };

  if (!isOpen) return null;

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
