/**
 * odczyt danych z localStorage z obsługą błędów
 * @param {string} key - klucz localStorage
 * @param {any} defaultValue -wartość domyślna jeśli brak danych
 * @returns {any} odczytane dane lub wartość domyślna
 */
export function loadFromStorage(key, defaultValue = null) {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved); //jeśli dane istnieją parsuje json i zwraca wynik
    }
    return defaultValue; //jesli brak danych, zwraca defaultValue
  } catch (err) {
    console.error(`Error loading ${key} from localStorage:`, err); //błędy są w konsoli
    return defaultValue;
  }
}

/**
 * zapis danych do localStorage z obsługą błędów
 * @param {string} key - klucz localStorage
 * @param {any} value - wartość do zapisania
 * @returns {Object} { success: boolean, error?: string }
 */
export function saveToStorage(key, value) { 
  try {
    const jsonString = JSON.stringify(value); 
    localStorage.setItem(key, jsonString); //zapisanie wartosci jako json pod kluczem key
    return { success: true }; //udany zapis
  } catch (err) {
    if (err.name === 'QuotaExceededError') { //przekroczenie limitu pamięci
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
 * usunięcie klucza z localStorage
 * @param {string} key - klucz do usunięcia
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
