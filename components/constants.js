// Klucze localStorage
export const STORAGE_KEYS = {
  COMMENTS: 'matrix-comments',
  SOURCES: 'pe004-sources',
  LANGUAGE: 'app-language',
  THEME: 'app-theme'
};

// Domyślne wartości
export const DEFAULT_VALUES = {
  LANGUAGE: 'pl',
  THEME: 'light',
  COMMENTS: {},
  SOURCES: []
};

// Wersja formatu eksportu
export const EXPORT_VERSION = '2.0';

// Czas wyświetlania toastu (ms)
export const TOAST_DURATION = 3000;

// Limity
export const LIMITS = {
  IMAGE_SIZE_MB: 2,
  IMAGE_SIZE_BYTES: 2 * 1024 * 1024
};
