import { useState } from 'react';

export default function SourceDialog({ onClose, onSave, language }) {
  const [sourceTitle, setSourceTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sourceTitle.trim()) {
      onSave(sourceTitle.trim());
      onClose();
    }
  };

  const t = (key) => {
    const translations = {
      pl: {
        addSource: 'Dodaj nowe źródło',
        sourceTitle: 'Nazwa źródła',
        sourceTitlePlaceholder: 'Wpisz nazwę źródła (np. "Reuters", "TVN24", "BBC News")',
        cancel: 'Anuluj',
        add: 'Dodaj źródło'
      },
      en: {
        addSource: 'Add new source',
        sourceTitle: 'Source name',
        sourceTitlePlaceholder: 'Enter source name (e.g., "Reuters", "TVN24", "BBC News")',
        cancel: 'Cancel',
        add: 'Add source'
      }
    };
    return translations[language]?.[key] || key;
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog source-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>{t('addSource')}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="dialog-body">
            <div className="form-group">
              <label htmlFor="source-title">{t('sourceTitle')}</label>
              <input
                id="source-title"
                type="text"
                className="form-input"
                value={sourceTitle}
                onChange={(e) => setSourceTitle(e.target.value)}
                placeholder={t('sourceTitlePlaceholder')}
                autoFocus
                required
              />
            </div>
          </div>
          <div className="dialog-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {t('cancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              {t('add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
