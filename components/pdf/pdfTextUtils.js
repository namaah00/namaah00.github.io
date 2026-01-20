import { POLISH_CHARS_MAP } from './pdfConstants.js';
import { translations } from '../translations.js';

/**
 * Konwertuje polskie znaki na bezpieczne odpowiedniki dla jsPDF
 * jsPDF standard fonts nie obsługują UTF-8
 * @param {string} text - tekst do zakodowania
 * @returns {string} - tekst bez polskich znaków
 */
export const encodeText = (text) => {
  if (!text) return '';
  return text.split('').map(char => POLISH_CHARS_MAP[char] || char).join('');
};

/**
 *pobiera tłumaczenie dla podanego klucza
 * @param {string} key - klucz tłumaczenia
 * @param {string} language - język ('pl' lub 'en')
 * @returns {string} - przetłumaczony tekst
 */
export const getTranslation = (key, language) => {
  const safeLanguage = (language === 'pl' || language === 'en') ? language : 'pl';
  const translation = translations[safeLanguage]?.[key];
  
  if (!translation) {
    console.warn(`Missing translation for key: ${key} in language: ${safeLanguage}`);
    return key;
  }
  
  return translation;
};

/**
 * Skraca tekst do określonej długości i dodaje "..."
 * @param {string} text - Tekst do skrócenia
 * @param {number} maxLength - Maksymalna długość
 * @returns {string} - Skrócony tekst
 */
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Formatuje datę dla PDF
 * @param {Date} date - Data do sformatowania
 * @param {string} language - Język (pl lub en)
 * @param {boolean} includeTime - Czy dołączyć godzinę
 * @returns {string} - Sformatowana data
 */
export const formatDate = (date, language, includeTime = false) => {
  const locale = language === 'pl' ? 'pl-PL' : 'en-US'; //ustawia lokalizację (pl-PL lub en-US)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(includeTime && { hour: '2-digit', minute: '2-digit' })
  };
  
  return date.toLocaleDateString(locale, options); //zwraca sformatowaną datę w postaci tekstu
};

/**
 *formatuje datę w formacie krótkim (DD.MM.YYYY)
 * @param {Date} date - data do sformatowania
 * @returns {string} - sformatowana data
 */
export const formatShortDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`; //zwraca datę w formacie DD.MM.YYYY
};
