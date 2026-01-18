import { EXPORT_VERSION } from './constants.js';

/**
 * Eksportuj dane jako JSON
 * @param {Object} comments - Komentarze
 * @param {Array} sources - Źródła
 */
export function exportJSON(comments, sources) {
  const exportData = {
    comments: comments,
    sources: sources,
    version: EXPORT_VERSION,
    exportDate: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'matrix-data.json';
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Wczytaj dane z pliku (obsługa FileReader)
 * @param {File} file - Plik do wczytania
 * @returns {Promise<Object>} - { success, data, error }
 */
export function readImportFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        
        // Nowy format (v2.0) ze źródłami
        if (imported.version === '2.0' && imported.comments) {
          resolve({
            success: true,
            data: {
              comments: imported.comments || {},
              sources: imported.sources || []
            }
          });
        } 
        // Stary format - same komentarze
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
