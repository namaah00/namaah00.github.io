/**
 * Odczyt danych z localStorage z obsługą błędów
 * @param {string} key - Klucz localStorage
 * @param {any} defaultValue - Wartość domyślna jeśli brak danych
 * @returns {any} Odczytane dane lub wartość domyślna
 */
export function loadFromStorage(key, defaultValue = null) {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
    return defaultValue;
  } catch (err) {
    console.error(`Error loading ${key} from localStorage:`, err);
    return defaultValue;
  }
}

/**
 * Zapis danych do localStorage z obsługą błędów
 * @param {string} key - Klucz localStorage
 * @param {any} value - Wartość do zapisania
 * @returns {Object} { success: boolean, error?: string }
 */
export function saveToStorage(key, value) {
  try {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
    return { success: true };
  } catch (err) {
    if (err.name === 'QuotaExceededError') {
      return { 
        success: false, 
        error: 'QUOTA_EXCEEDED' 
      };
    }
    return { 
      success: false, 
      error: err.message 
    };
  }
}

/**
 * Usunięcie klucza z localStorage
 * @param {string} key - Klucz do usunięcia
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
