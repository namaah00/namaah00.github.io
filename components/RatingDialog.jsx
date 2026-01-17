import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { translations } from './translations.js';
import { getSEName, getRatingDescription } from './matrixData.js';

export default function RatingDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialRating = null,
  cellId,
  hasRating,
  language
}) {
  const t = (key) => translations[language][key] || key;
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleSave = () => {
    if (onSave && typeof onSave === 'function') {
      onSave(rating);
    } else {
      console.error('RatingDialog: onSave is not a function!', onSave);
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
      <div className="dialog rating-dialog">
        <div className="dialog-header">
          <h3>⭐ {t('ratingLabel')} - {displayName}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="dialog-body">
          <div className="form-group">
            <label htmlFor="rating">{t('ratingLabel')} (0-5)</label>
            <select
              id="rating"
              className="form-input rating-select"
              value={rating === null ? '' : rating}
              onChange={(e) => {
                const newRating = e.target.value === '' ? null : parseInt(e.target.value);
                setRating(newRating);
              }}
              autoFocus
            >
              <option value="">{t('noRating')}</option>
              {[0, 1, 2, 3, 4, 5].map(val => (
                <option key={val} value={val}>
                  {val}/5 — {getRatingDescription(elementId, val, language)}
                </option>
              ))}
            </select>
            {rating !== null && (
              <div className="rating-description">
                ⭐ <strong>{rating}/5:</strong> {getRatingDescription(elementId, rating, language)}
              </div>
            )}
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn btn-primary" onClick={handleSave}>
            {t('save')}
          </button>
          {hasRating && (
            <button className="btn btn-danger" onClick={onDelete}>
              <Trash2 size={16} style={{ marginRight: '5px' }} /> {t('delete')}
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