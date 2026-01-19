//klucze localStorage (nazwy pod którymi dane są przechowywane w przeglądarce)
export const STORAGE_KEYS = {
  COMMENTS: 'matrix-comments', //wszystkie komentarze matrycy
  SOURCES: 'pe004-sources', //źródła dynamiczne 004
  LANGUAGE: 'app-language', //aktualny język
  THEME: 'app-theme' //aktualny motyw
};

//domyślne wartości (używane przy inicjacji hooków localStorage)
export const DEFAULT_VALUES = {
  LANGUAGE: 'pl', //domyślny język
  THEME: 'light', //domyślny motyw
  COMMENTS: {}, //początkowo brak komentarzy
  SOURCES: [] //początkowo brak źródeł
};

//wersja formatu eksportu json (dla kompatybilności)
export const EXPORT_VERSION = '2.0';

//czas wyświetlania powiadomień (ms) = 3s
export const TOAST_DURATION = 3000;

//limity wielkości dla obrazów w komentarzach
export const LIMITS = {
  IMAGE_SIZE_MB: 2,
  IMAGE_SIZE_BYTES: 2 * 1024 * 1024
};
