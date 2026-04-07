import { useState } from 'react'; //przechowywanie tekstu wpisanego przez użytkownika
import { getTranslation } from '../translations.js';

export default function SourceDialog({ onClose, onSave, language }) {
  const [sourceTitle, setSourceTitle] = useState(''); //nazwa źródła
  const [accessDate, setAccessDate] = useState(''); //data dostępu
  const [accessLink, setAccessLink] = useState(''); //link dostępu
  const [character, setCharacter] = useState(''); //charakter źródła
  const [status, setStatus] = useState(''); //status źródła

  //obsługa wysłania formularza
  const handleSubmit = (e) => {
    e.preventDefault(); //zapobiega przeładowaniu strony
    if (sourceTitle.trim()) { //sprawdza, czy użytkownik wpisał nazwę
      const sourceData = {
        title: sourceTitle.trim(),
        accessDate: accessDate.trim(),
        accessLink: accessLink.trim(),
        character: character,
        status: status
      };
      onSave(sourceData); //przekazuje dane źródła do rodzica
      onClose(); //zamyka dialog
    }
  };

  const t = (key) => getTranslation(language, key);

  //opcje charakteru źródła
  const characterOptions = [
    { value: 'sourceCharacterOfficial1', label: t('sourceCharacterOfficial1') },
    { value: 'sourceCharacterOfficial2', label: t('sourceCharacterOfficial2') },
    { value: 'sourceCharacterMedia1', label: t('sourceCharacterMedia1') },
    { value: 'sourceCharacterMedia2', label: t('sourceCharacterMedia2') },
    { value: 'sourceCharacterMedia3', label: t('sourceCharacterMedia3') },
    { value: 'sourceCharacterSocial', label: t('sourceCharacterSocial') },
    { value: 'sourceCharacterAnonymous', label: t('sourceCharacterAnonymous') },
    { value: 'sourceCharacterPrimary', label: t('sourceCharacterPrimary') },
    { value: 'sourceCharacterScientific', label: t('sourceCharacterScientific') },
    { value: 'sourceCharacterOther', label: t('sourceCharacterOther') }
  ];

  //opcje statusu źródła
  const statusOptions = [
    { value: 'sourceStatusOfficial', label: t('sourceStatusOfficial') },
    { value: 'sourceStatusJournalistic', label: t('sourceStatusJournalistic') },
    { value: 'sourceStatusOpinion', label: t('sourceStatusOpinion') },
    { value: 'sourceStatusUnofficial', label: t('sourceStatusUnofficial') },
    { value: 'sourceStatusStatistical', label: t('sourceStatusStatistical') },
    { value: 'sourceStatusExpert', label: t('sourceStatusExpert') },
    { value: 'sourceStatusFieldReport', label: t('sourceStatusFieldReport') },
    { value: 'sourceStatusOther', label: t('sourceStatusOther') }
  ];

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
              <label htmlFor="source-title">{t('sourceDialogNameLabel')} *</label>
              <input
                id="source-title"
                type="text"
                className="form-input"
                value={sourceTitle}
                onChange={(e) => setSourceTitle(e.target.value)}
                placeholder={t('sourceDialogNamePlaceholder')}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="access-date">{t('sourceDialogAccessDateLabel')}</label>
              <input
                id="access-date"
                type="date"
                className="form-input"
                value={accessDate}
                onChange={(e) => setAccessDate(e.target.value)}
                placeholder={t('sourceDialogAccessDatePlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="access-link">{t('sourceDialogAccessLinkLabel')}</label>
              <input
                id="access-link"
                type="url"
                className="form-input"
                value={accessLink}
                onChange={(e) => setAccessLink(e.target.value)}
                placeholder={t('sourceDialogAccessLinkPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="character">{t('sourceDialogCharacterLabel')}</label>
              <select
                id="character"
                className="form-input"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
              >
                <option value="">{t('sourceDialogCharacterPlaceholder')}</option>
                {characterOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">{t('sourceDialogStatusLabel')}</label>
              <select
                id="status"
                className="form-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">{t('sourceDialogStatusPlaceholder')}</option>
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
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