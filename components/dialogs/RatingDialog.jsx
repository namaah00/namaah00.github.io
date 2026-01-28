import { useState, useEffect } from 'react'; //przechowywanie, synchronizacja oceny
import { Trash2 } from 'lucide-react'; //emoji
import { translations } from '../translations.js'; 
import { getSEName, getRatingDescription } from '../matrixData.js'; //pobiera nazwę i opis oceny SE

export default function RatingDialog({
  isOpen, //czy okno jest otwarte
  onClose, //funkcja zamykająca okno
  onSave, //funkcja zapisująca ocenę
  onDelete, //funkcja usuwająca ocenę
  initialRating = null, //aktualna ocena lub null
  cellId, 
  hasRating, //czy już istnieje ocena
  language
}) {
  const t = (key) => translations[language][key] || key;
  const [rating, setRating] = useState(initialRating); //stan oceny

  useEffect(() => {
    setRating(initialRating); //gdy zmienia się initialRating, aktualizacja lokalnego rating
  }, [initialRating]);

  //wywołuje funkcję onSave, przekazuje aktualną rating
  const handleSave = () => {
    if (onSave && typeof onSave === 'function') {
      onSave(rating);
    }
  };
//zamknięcie po kliknięciu w tło
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
//jeśli dialog nie jest otwarty, nic nie renderuje
  if (!isOpen) return null;

  //wyciągnięcie tylko ID elementu (bez warstwy) - to pojawia się w nagłówku
  const elementId = cellId.split('-')[1];
  const elementName = getSEName(elementId, language);
  const displayName = `${elementId} - ${elementName}`;

  //widok
  return (
    <div className="dialog-backdrop" onClick={handleBackdropClick}>
      <div className="dialog rating-dialog">
        <div className="dialog-header">
          <h3> {t('ratingLabel')} - {displayName}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="dialog-body">
          <div className="form-group">
            <label htmlFor="rating">{t('ratingLabel')} (0-5)</label>
            {/**wybór oceny, jeśli rating null to pokazuje pustą opcję */}
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
              {/**lista opcji */}
              {[0, 1, 2, 3, 4, 5].map(val => (
                <option key={val} value={val}>
                  {val}/5  {getRatingDescription(elementId, val, language)}
                </option>
              ))}
            </select>
            {/**opis wybranej oceny */}
            {rating !== null && (
              <div className="rating-description">
                 <strong>{rating}/5:</strong> {getRatingDescription(elementId, rating, language)}
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
