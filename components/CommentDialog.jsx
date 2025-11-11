import { useState, useEffect } from 'react';
import { translations } from './translations.js';
import { getSEName } from './matrixData.js';

export default function CommentDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialTitle = '',
  initialContent = '',
  cellId,
  hasComment,
  language
}) {
  const t = (key) => translations[language][key] || key;
  
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave(title, content);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Wyciągnij tylko ID elementu (bez warstwy)
  const elementId = cellId.split('-')[1];
  const elementName = getSEName(elementId, language);
  const displayName = `${elementId} - ${elementName}`;

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
