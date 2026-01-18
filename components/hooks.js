import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from './utils/storage.js';
import { STORAGE_KEYS, DEFAULT_VALUES, TOAST_DURATION } from './utils/constants.js';

/**
 * Hook do zarządzania localStorage z automatyczną persystencją
 * @param {string} key - Klucz localStorage
 * @param {any} defaultValue - Wartość domyślna
 * @param {Function} onQuotaExceeded - Callback gdy przekroczono limit
 * @returns {[any, Function]} - [value, setValue]
 */
export function useLocalStorage(key, defaultValue, onQuotaExceeded = null) {
  const [value, setValue] = useState(() => 
    loadFromStorage(key, defaultValue)
  );

  useEffect(() => {
    const result = saveToStorage(key, value);
    
    if (!result.success && result.error === 'QUOTA_EXCEEDED') {
      if (onQuotaExceeded) {
        onQuotaExceeded();
      }
    }
  }, [key, value, onQuotaExceeded]);

  return [value, setValue];
}

/**
 * Hook do zarządzania językiem aplikacji
 * @returns {[string, Function, Function]} - [language, setLanguage, toggleLanguage]
 */
export function useLanguage() {
  const [language, setLanguage] = useLocalStorage(
    STORAGE_KEYS.LANGUAGE, 
    DEFAULT_VALUES.LANGUAGE
  );

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pl' ? 'en' : 'pl');
  };

  return [language, setLanguage, toggleLanguage];
}

/**
 * Hook do zarządzania motywem (dark/light)
 * @returns {[boolean, Function]} - [isDarkMode, toggleDarkMode]
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage(
    STORAGE_KEYS.THEME, 
    DEFAULT_VALUES.THEME
  );

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return [isDarkMode, toggleDarkMode];
}

/**
 * Hook do zarządzania toast notifications
 * @returns {[Object|null, Function]} - [toast, showToast]
 */
export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), TOAST_DURATION);
  };

  return [toast, showToast];
}

/**
 * Hook do zarządzania komentarzami z localStorage
 * @param {Function} showToast - Funkcja do wyświetlania powiadomień
 * @returns {[Object, Function]} - [comments, setComments]
 */
export function useComments(showToast) {
  const onQuotaExceeded = showToast 
    ? () => showToast('Przekroczono limit pamięci. Usuń stare komentarze.', 'error')
    : null;
    
  return useLocalStorage(
    STORAGE_KEYS.COMMENTS, 
    DEFAULT_VALUES.COMMENTS,
    onQuotaExceeded
  );
}

/**
 * Hook do zarządzania źródłami z localStorage
 * @returns {[Array, Function]} - [sources, setSources]
 */
export function useSources() {
  return useLocalStorage(STORAGE_KEYS.SOURCES, DEFAULT_VALUES.SOURCES);
}