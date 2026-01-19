import { EXPORT_VERSION } from './constants.js';

/**
 * eksportuje dane jako JSON
 * @param {Object} comments - komentarze
 * @param {Array} sources - źródła
 */
export function exportJSON(comments, sources) {
  const exportData = {
    comments: comments, //wszytskie komentarze
    sources: sources, //źródła w Pe004
    version: EXPORT_VERSION, //wersja formatu
    exportDate: new Date().toISOString() //data i godzina eksportu
  };
  
  const dataStr = JSON.stringify(exportData, null, 2); //zamiana obiektu exportData na string json
  const blob = new Blob([dataStr], { type: 'application/json' }); //tworzy plik w pamięci przeglądarki (Blob)
  const url = URL.createObjectURL(blob); //generuje URL
  const link = document.createElement('a'); //tworzy tymczasowy link
  link.href = url;
  link.download = 'matrix-data.json'; //nazwa domyślna pliku 
  link.click(); //symuluje kliknięcie 
  URL.revokeObjectURL(url); //po pobraniu usuwa URL z pamięci
}

/**
 * wczytuje dane z pliku (obsługa FileReader)
 * @param {File} file - plik do wczytania
 * @returns {Promise<Object>} - { success, data, error }
 */
export function readImportFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result); //parsowanie json i sprawdzenie formatu
        
        //nowy format ze źródłami
        if (imported.version === '2.0' && imported.comments) {
          resolve({
            success: true,
            data: {
              comments: imported.comments || {},
              sources: imported.sources || []
            }
          });
        } 
        //stary format - same komentarze
        else {
          resolve({
            success: true,
            data: {
              comments: imported,
              sources: []
            }
          });
        }
      } catch (err) {
        resolve({ success: false, error: 'PARSE_ERROR' });
      }
    };
    
    reader.onerror = () => {
      resolve({ success: false, error: 'READ_ERROR' });
    };
    
    reader.readAsText(file);
  });
}
